// Quick test to verify WASM loading works
import init, { TvixEvaluator } from './www/tvix_wasm.js';

try {
    console.log('Testing WASM module...');
    await init();
    console.log('WASM initialized successfully');
    
    const evaluator = new TvixEvaluator();
    console.log('TvixEvaluator created');
    
    const result = evaluator.evaluate('1 + 2');
    console.log('Evaluation result:', result);
    
    console.log('✅ WASM test successful!');
} catch (error) {
    console.error('❌ WASM test failed:', error);
}