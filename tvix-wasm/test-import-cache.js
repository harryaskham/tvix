const fs = require('fs');

// Read the built wasm files
const wasmModule = fs.readFileSync('./pkg/tvix_wasm_bg.wasm');

// Mock TextDecoder for Node.js
global.TextDecoder = require('util').TextDecoder;
global.TextEncoder = require('util').TextEncoder;

// Mock console.log to capture output
const logs = [];
const originalLog = console.log;
console.log = function(...args) {
    logs.push(args.join(' '));
    originalLog.apply(console, arguments);
};

async function testImportCache() {
    // Load the WASM module
    const { default: init, TvixEvaluator } = require('./pkg/tvix_wasm.js');
    
    // Initialize the WASM module
    await init(wasmModule);
    
    console.log('=== Starting Import Cache Test ===');
    
    // Create evaluator (this should create the persistent VFS)
    const evaluator = new TvixEvaluator();
    console.log('✅ TvixEvaluator created');
    
    // Test expression that imports nixpkgs
    const testExpr = 'import <nixpkgs/lib>';
    
    console.log('\n=== First evaluation (should create and populate cache) ===');
    logs.length = 0; // Clear logs
    try {
        const result1 = evaluator.evaluate(testExpr, false);
        console.log('First evaluation result length:', result1.length);
    } catch (e) {
        console.log('First evaluation error:', e);
    }
    
    // Check logs for VFS creation
    const firstEvalLogs = logs.filter(log => log.includes('VFS:') || log.includes('eval:'));
    console.log('First evaluation VFS logs:');
    firstEvalLogs.forEach(log => console.log('  ', log));
    
    console.log('\n=== Second evaluation (should reuse cache) ===');
    logs.length = 0; // Clear logs
    try {
        const result2 = evaluator.evaluate(testExpr, false);
        console.log('Second evaluation result length:', result2.length);
    } catch (e) {
        console.log('Second evaluation error:', e);
    }
    
    // Check logs for VFS reuse
    const secondEvalLogs = logs.filter(log => log.includes('VFS:') || log.includes('eval:'));
    console.log('Second evaluation VFS logs:');
    secondEvalLogs.forEach(log => console.log('  ', log));
    
    console.log('\n=== Third evaluation (should also reuse cache) ===');
    logs.length = 0; // Clear logs
    try {
        const result3 = evaluator.evaluate(testExpr, false);
        console.log('Third evaluation result length:', result3.length);
    } catch (e) {
        console.log('Third evaluation error:', e);
    }
    
    // Check logs for VFS reuse
    const thirdEvalLogs = logs.filter(log => log.includes('VFS:') || log.includes('eval:'));
    console.log('Third evaluation VFS logs:');
    thirdEvalLogs.forEach(log => console.log('  ', log));
    
    console.log('\n=== Import Cache Test Summary ===');
    console.log('✅ Test completed - check logs above to verify:');
    console.log('   1. First evaluation should show VFS creation and file loading');
    console.log('   2. Subsequent evaluations should show "Using persistent VFS" logs');
    console.log('   3. No repeated file embedding should occur after first evaluation');
}

testImportCache().catch(console.error);