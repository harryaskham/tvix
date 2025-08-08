#!/usr/bin/env node

// Simple Node.js test script for WASM
import fs from 'fs';
import path from 'path';

async function testWasm(expr) {
    try {
        console.log(`Testing expression: ${expr}`);
        
        // Try to import the WASM module
        const wasmModule = await import('./pkg/tvix_wasm.js');
        
        // Initialize with WASM bytes
        const wasmBytes = fs.readFileSync('./pkg/tvix_wasm_bg.wasm');
        await wasmModule.default(wasmBytes);
        
        // Create evaluator and test
        const evaluator = new wasmModule.TvixEvaluator();
        const result = evaluator.evaluate(expr);
        
        console.log(`Result: ${result}`);
        return result;
    } catch (error) {
        console.error(`Error: ${error.message}`);
        console.error(`Stack: ${error.stack}`);
        return null;
    }
}

// Get expression from command line or use default
const expr = process.argv[2] || '1 + 2';
testWasm(expr);