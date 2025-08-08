import init, { TvixEvaluator } from './pkg/tvix_wasm.js';

async function test() {
    await init();
    
    const evaluator = new TvixEvaluator();
    
    console.log('Testing <nixpkgs> resolution...');
    
    try {
        const result = evaluator.evaluate('<nixpkgs>');
        console.log('Success:', result);
    } catch (error) {
        console.log('Error:', error.toString());
    }
    
    console.log('\nTesting import ./default.nix...');
    try {
        const result = evaluator.evaluate('import ./default.nix');
        console.log('Success:', result);
    } catch (error) {
        console.log('Error:', error.toString());
    }
    
    console.log('\nTesting basic expression...');
    try {
        const result = evaluator.evaluate('1 + 1');
        console.log('Success:', result);
    } catch (error) {
        console.log('Error:', error.toString());
    }
}

test();