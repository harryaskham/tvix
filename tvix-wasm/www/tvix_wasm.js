/* Auto-generated stub for __wbindgen_placeholder__ */
const __wbg_star0 = { __wbindgen_describe: function() { return 0; } };

let wasm;

function logError(f, args) {
    try {
        return f.apply(this, args);
    } catch (e) {
        let error = (function () {
            try {
                return e instanceof Error ? `${e.message}\n\nStack:\n${e.stack}` : e.toString();
            } catch(_) {
                return "<failed to stringify thrown value>";
            }
        }());
        console.error("wasm-bindgen: imported JS function that was not marked as `catch` threw an error:", error);
        throw e;
    }
}

function addToExternrefTable0(obj) {
    const idx = wasm.__externref_table_alloc();
    wasm.__wbindgen_export_2.set(idx, obj);
    return idx;
}

function handleError(f, args) {
    try {
        return f.apply(this, args);
    } catch (e) {
        const idx = addToExternrefTable0(e);
        wasm.__wbindgen_exn_store(idx);
    }
}

function _assertBigInt(n) {
    if (typeof(n) !== 'bigint') throw new Error(`expected a bigint argument, found ${typeof(n)}`);
}

function _assertNum(n) {
    if (typeof(n) !== 'number') throw new Error(`expected a number argument, found ${typeof(n)}`);
}

function isLikeNone(x) {
    return x === undefined || x === null;
}

let cachedDataViewMemory0 = null;

function getDataViewMemory0() {
    if (cachedDataViewMemory0 === null || cachedDataViewMemory0.buffer.detached === true || (cachedDataViewMemory0.buffer.detached === undefined && cachedDataViewMemory0.buffer !== wasm.memory.buffer)) {
        cachedDataViewMemory0 = new DataView(wasm.memory.buffer);
    }
    return cachedDataViewMemory0;
}

const cachedTextDecoder = (typeof TextDecoder !== 'undefined' ? new TextDecoder('utf-8', { ignoreBOM: true, fatal: true }) : { decode: () => { throw Error('TextDecoder not available') } } );

if (typeof TextDecoder !== 'undefined') { cachedTextDecoder.decode(); };

let cachedUint8ArrayMemory0 = null;

function getUint8ArrayMemory0() {
    if (cachedUint8ArrayMemory0 === null || cachedUint8ArrayMemory0.byteLength === 0) {
        cachedUint8ArrayMemory0 = new Uint8Array(wasm.memory.buffer);
    }
    return cachedUint8ArrayMemory0;
}

function getStringFromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return cachedTextDecoder.decode(getUint8ArrayMemory0().subarray(ptr, ptr + len));
}

function _assertBoolean(n) {
    if (typeof(n) !== 'boolean') {
        throw new Error(`expected a boolean argument, found ${typeof(n)}`);
    }
}

let cachedUint16ArrayMemory0 = null;

function getUint16ArrayMemory0() {
    if (cachedUint16ArrayMemory0 === null || cachedUint16ArrayMemory0.byteLength === 0) {
        cachedUint16ArrayMemory0 = new Uint16Array(wasm.memory.buffer);
    }
    return cachedUint16ArrayMemory0;
}

function getArrayU16FromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return getUint16ArrayMemory0().subarray(ptr / 2, ptr / 2 + len);
}

let cachedUint32ArrayMemory0 = null;

function getUint32ArrayMemory0() {
    if (cachedUint32ArrayMemory0 === null || cachedUint32ArrayMemory0.byteLength === 0) {
        cachedUint32ArrayMemory0 = new Uint32Array(wasm.memory.buffer);
    }
    return cachedUint32ArrayMemory0;
}

function getArrayU32FromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return getUint32ArrayMemory0().subarray(ptr / 4, ptr / 4 + len);
}

function getArrayU8FromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return getUint8ArrayMemory0().subarray(ptr / 1, ptr / 1 + len);
}

let WASM_VECTOR_LEN = 0;

const cachedTextEncoder = (typeof TextEncoder !== 'undefined' ? new TextEncoder('utf-8') : { encode: () => { throw Error('TextEncoder not available') } } );

const encodeString = (typeof cachedTextEncoder.encodeInto === 'function'
    ? function (arg, view) {
    return cachedTextEncoder.encodeInto(arg, view);
}
    : function (arg, view) {
    const buf = cachedTextEncoder.encode(arg);
    view.set(buf);
    return {
        read: arg.length,
        written: buf.length
    };
});

function passStringToWasm0(arg, malloc, realloc) {

    if (typeof(arg) !== 'string') throw new Error(`expected a string argument, found ${typeof(arg)}`);

    if (realloc === undefined) {
        const buf = cachedTextEncoder.encode(arg);
        const ptr = malloc(buf.length, 1) >>> 0;
        getUint8ArrayMemory0().subarray(ptr, ptr + buf.length).set(buf);
        WASM_VECTOR_LEN = buf.length;
        return ptr;
    }

    let len = arg.length;
    let ptr = malloc(len, 1) >>> 0;

    const mem = getUint8ArrayMemory0();

    let offset = 0;

    for (; offset < len; offset++) {
        const code = arg.charCodeAt(offset);
        if (code > 0x7F) break;
        mem[ptr + offset] = code;
    }

    if (offset !== len) {
        if (offset !== 0) {
            arg = arg.slice(offset);
        }
        ptr = realloc(ptr, len, len = offset + arg.length * 3, 1) >>> 0;
        const view = getUint8ArrayMemory0().subarray(ptr + offset, ptr + len);
        const ret = encodeString(arg, view);
        if (ret.read !== arg.length) throw new Error('failed to pass whole string');
        offset += ret.written;
        ptr = realloc(ptr, len, offset, 1) >>> 0;
    }

    WASM_VECTOR_LEN = offset;
    return ptr;
}

let cachedBigInt64ArrayMemory0 = null;

function getBigInt64ArrayMemory0() {
    if (cachedBigInt64ArrayMemory0 === null || cachedBigInt64ArrayMemory0.byteLength === 0) {
        cachedBigInt64ArrayMemory0 = new BigInt64Array(wasm.memory.buffer);
    }
    return cachedBigInt64ArrayMemory0;
}

function getArrayI64FromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return getBigInt64ArrayMemory0().subarray(ptr / 8, ptr / 8 + len);
}

let cachedBigUint64ArrayMemory0 = null;

function getBigUint64ArrayMemory0() {
    if (cachedBigUint64ArrayMemory0 === null || cachedBigUint64ArrayMemory0.byteLength === 0) {
        cachedBigUint64ArrayMemory0 = new BigUint64Array(wasm.memory.buffer);
    }
    return cachedBigUint64ArrayMemory0;
}

function getArrayU64FromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return getBigUint64ArrayMemory0().subarray(ptr / 8, ptr / 8 + len);
}

function debugString(val) {
    // primitive types
    const type = typeof val;
    if (type == 'number' || type == 'boolean' || val == null) {
        return  `${val}`;
    }
    if (type == 'string') {
        return `"${val}"`;
    }
    if (type == 'symbol') {
        const description = val.description;
        if (description == null) {
            return 'Symbol';
        } else {
            return `Symbol(${description})`;
        }
    }
    if (type == 'function') {
        const name = val.name;
        if (typeof name == 'string' && name.length > 0) {
            return `Function(${name})`;
        } else {
            return 'Function';
        }
    }
    // objects
    if (Array.isArray(val)) {
        const length = val.length;
        let debug = '[';
        if (length > 0) {
            debug += debugString(val[0]);
        }
        for(let i = 1; i < length; i++) {
            debug += ', ' + debugString(val[i]);
        }
        debug += ']';
        return debug;
    }
    // Test for built-in
    const builtInMatches = /\[object ([^\]]+)\]/.exec(toString.call(val));
    let className;
    if (builtInMatches && builtInMatches.length > 1) {
        className = builtInMatches[1];
    } else {
        // Failed to match the standard '[object ClassName]'
        return toString.call(val);
    }
    if (className == 'Object') {
        // we're a user defined class or Object
        // JSON.stringify avoids problems with cycles, and is generally much
        // easier than looping through ownProperties of `val`.
        try {
            return 'Object(' + JSON.stringify(val) + ')';
        } catch (_) {
            return 'Object';
        }
    }
    // errors
    if (val instanceof Error) {
        return `${val.name}: ${val.message}\n${val.stack}`;
    }
    // TODO we could test for more things here, like `Set`s and `Map`s.
    return className;
}

let cachedFloat32ArrayMemory0 = null;

function getFloat32ArrayMemory0() {
    if (cachedFloat32ArrayMemory0 === null || cachedFloat32ArrayMemory0.byteLength === 0) {
        cachedFloat32ArrayMemory0 = new Float32Array(wasm.memory.buffer);
    }
    return cachedFloat32ArrayMemory0;
}

function getArrayF32FromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return getFloat32ArrayMemory0().subarray(ptr / 4, ptr / 4 + len);
}

let cachedFloat64ArrayMemory0 = null;

function getFloat64ArrayMemory0() {
    if (cachedFloat64ArrayMemory0 === null || cachedFloat64ArrayMemory0.byteLength === 0) {
        cachedFloat64ArrayMemory0 = new Float64Array(wasm.memory.buffer);
    }
    return cachedFloat64ArrayMemory0;
}

function getArrayF64FromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return getFloat64ArrayMemory0().subarray(ptr / 8, ptr / 8 + len);
}

let cachedInt16ArrayMemory0 = null;

function getInt16ArrayMemory0() {
    if (cachedInt16ArrayMemory0 === null || cachedInt16ArrayMemory0.byteLength === 0) {
        cachedInt16ArrayMemory0 = new Int16Array(wasm.memory.buffer);
    }
    return cachedInt16ArrayMemory0;
}

function getArrayI16FromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return getInt16ArrayMemory0().subarray(ptr / 2, ptr / 2 + len);
}

let cachedInt32ArrayMemory0 = null;

function getInt32ArrayMemory0() {
    if (cachedInt32ArrayMemory0 === null || cachedInt32ArrayMemory0.byteLength === 0) {
        cachedInt32ArrayMemory0 = new Int32Array(wasm.memory.buffer);
    }
    return cachedInt32ArrayMemory0;
}

function getArrayI32FromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return getInt32ArrayMemory0().subarray(ptr / 4, ptr / 4 + len);
}

let cachedInt8ArrayMemory0 = null;

function getInt8ArrayMemory0() {
    if (cachedInt8ArrayMemory0 === null || cachedInt8ArrayMemory0.byteLength === 0) {
        cachedInt8ArrayMemory0 = new Int8Array(wasm.memory.buffer);
    }
    return cachedInt8ArrayMemory0;
}

function getArrayI8FromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return getInt8ArrayMemory0().subarray(ptr / 1, ptr / 1 + len);
}

let cachedUint8ClampedArrayMemory0 = null;

function getUint8ClampedArrayMemory0() {
    if (cachedUint8ClampedArrayMemory0 === null || cachedUint8ClampedArrayMemory0.byteLength === 0) {
        cachedUint8ClampedArrayMemory0 = new Uint8ClampedArray(wasm.memory.buffer);
    }
    return cachedUint8ClampedArrayMemory0;
}

function getClampedArrayU8FromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return getUint8ClampedArrayMemory0().subarray(ptr / 1, ptr / 1 + len);
}

function takeFromExternrefTable0(idx) {
    const value = wasm.__wbindgen_export_2.get(idx);
    wasm.__externref_table_dealloc(idx);
    return value;
}
function __wbg_adapter_122(arg0, arg1, arg2, arg3, arg4) {
    _assertNum(arg0);
    _assertNum(arg1);
    _assertNum(arg3);
    const ret = wasm.closure125_externref_shim(arg0, arg1, arg2, arg3, arg4);
    return ret !== 0;
}

function getArrayJsValueFromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    const mem = getDataViewMemory0();
    const result = [];
    for (let i = ptr; i < ptr + 4 * len; i += 4) {
        result.push(wasm.__wbindgen_export_2.get(mem.getUint32(i, true)));
    }
    wasm.__externref_drop_slice(ptr, len);
    return result;
}
function __wbg_adapter_139(arg0, arg1, arg2, arg3, arg4) {
    _assertNum(arg0);
    _assertNum(arg1);
    _assertNum(arg3);
    const ret = wasm.closure127_externref_shim_multivalue_shim(arg0, arg1, arg2, arg3, arg4);
    var v1 = getArrayJsValueFromWasm0(ret[0], ret[1]).slice();
    wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
    return v1;
}

function __wbg_adapter_142(arg0, arg1, arg2, arg3, arg4) {
    _assertNum(arg0);
    _assertNum(arg1);
    _assertNum(arg3);
    wasm.closure119_externref_shim(arg0, arg1, arg2, arg3, arg4);
}

function __wbg_adapter_159(arg0, arg1, arg2, arg3, arg4) {
    _assertNum(arg0);
    _assertNum(arg1);
    _assertNum(arg3);
    const ret = wasm.closure123_externref_shim(arg0, arg1, arg2, arg3, arg4);
    return ret;
}

function __wbg_adapter_176(arg0, arg1, arg2, arg3, arg4, arg5) {
    _assertNum(arg0);
    _assertNum(arg1);
    _assertNum(arg4);
    const ret = wasm.closure128_externref_shim(arg0, arg1, arg2, arg3, arg4, arg5);
    return ret;
}

function __wbg_adapter_187(arg0, arg1, arg2) {
    _assertNum(arg0);
    _assertNum(arg1);
    const ret = wasm.closure109_externref_shim(arg0, arg1, arg2);
    return ret !== 0;
}

function __wbg_adapter_390(arg0, arg1, arg2, arg3) {
    _assertNum(arg0);
    _assertNum(arg1);
    wasm.closure110_externref_shim(arg0, arg1, arg2, arg3);
}

function __wbg_adapter_721(arg0, arg1, arg2, arg3, arg4) {
    _assertNum(arg0);
    _assertNum(arg1);
    wasm.closure113_externref_shim(arg0, arg1, arg2, arg3, arg4);
}

function __wbg_adapter_940(arg0, arg1, arg2, arg3) {
    _assertNum(arg0);
    _assertNum(arg1);
    wasm.closure111_externref_shim(arg0, arg1, arg2, arg3);
}

function __wbg_adapter_991(arg0, arg1, arg2, arg3, arg4) {
    _assertNum(arg0);
    _assertNum(arg1);
    _assertNum(arg2);
    _assertNum(arg3);
    wasm.closure120_externref_shim(arg0, arg1, arg2, arg3, arg4);
}

function __wbg_adapter_1028(arg0, arg1, arg2, arg3, arg4) {
    _assertNum(arg0);
    _assertNum(arg1);
    _assertNum(arg2);
    _assertNum(arg3);
    wasm.closure124_externref_shim(arg0, arg1, arg2, arg3, arg4);
}

function __wbg_adapter_1065(arg0, arg1, arg2, arg3, arg4) {
    _assertNum(arg0);
    _assertNum(arg1);
    _assertNum(arg2);
    _assertNum(arg3);
    wasm.closure121_externref_shim(arg0, arg1, arg2, arg3, arg4);
}

function __wbg_adapter_1102(arg0, arg1, arg2, arg3, arg4) {
    _assertNum(arg0);
    _assertNum(arg1);
    _assertNum(arg2);
    _assertNum(arg3);
    wasm.closure122_externref_shim(arg0, arg1, arg2, arg3, arg4);
}

function __wbg_adapter_1139(arg0, arg1, arg2, arg3, arg4) {
    _assertNum(arg0);
    _assertNum(arg1);
    _assertNum(arg2);
    _assertNum(arg3);
    wasm.closure114_externref_shim(arg0, arg1, arg2, arg3, arg4);
}

function __wbg_adapter_1176(arg0, arg1, arg2, arg3, arg4) {
    _assertNum(arg0);
    _assertNum(arg1);
    _assertNum(arg2);
    _assertNum(arg3);
    wasm.closure112_externref_shim(arg0, arg1, arg2, arg3, arg4);
}

function __wbg_adapter_1213(arg0, arg1, arg2, arg3, arg4) {
    _assertNum(arg0);
    _assertNum(arg1);
    _assertNum(arg2);
    _assertNum(arg3);
    wasm.closure118_externref_shim(arg0, arg1, arg2, arg3, arg4);
}

function __wbg_adapter_1250(arg0, arg1, arg2, arg3, arg4) {
    _assertNum(arg0);
    _assertNum(arg1);
    _assertNum(arg3);
    wasm.closure116_externref_shim(arg0, arg1, arg2, arg3, arg4);
}

function __wbg_adapter_1287(arg0, arg1, arg2, arg3, arg4) {
    _assertNum(arg0);
    _assertNum(arg1);
    _assertNum(arg3);
    wasm.closure115_externref_shim(arg0, arg1, arg2, arg3, arg4);
}

function __wbg_adapter_1324(arg0, arg1, arg2, arg3, arg4) {
    _assertNum(arg0);
    _assertNum(arg1);
    _assertBigInt(arg2);
    _assertNum(arg3);
    wasm.closure117_externref_shim(arg0, arg1, arg2, arg3, arg4);
}

function __wbg_adapter_1361(arg0, arg1, arg2, arg3, arg4) {
    _assertNum(arg0);
    _assertNum(arg1);
    _assertBigInt(arg2);
    _assertNum(arg3);
    wasm.closure126_externref_shim(arg0, arg1, arg2, arg3, arg4);
}

const TvixEvaluatorFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_tvixevaluator_free(ptr >>> 0, 1));

export class TvixEvaluator {

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        TvixEvaluatorFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_tvixevaluator_free(ptr, 0);
    }
    constructor() {
        const ret = wasm.tvixevaluator_new();
        this.__wbg_ptr = ret >>> 0;
        TvixEvaluatorFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * @param {string} expression
     * @param {boolean} raw
     * @returns {string}
     */
    evaluate(expression, raw) {
        let deferred3_0;
        let deferred3_1;
        try {
            if (this.__wbg_ptr == 0) throw new Error('Attempt to use a moved value');
            _assertNum(this.__wbg_ptr);
            const ptr0 = passStringToWasm0(expression, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len0 = WASM_VECTOR_LEN;
            _assertBoolean(raw);
            const ret = wasm.tvixevaluator_evaluate(this.__wbg_ptr, ptr0, len0, raw);
            var ptr2 = ret[0];
            var len2 = ret[1];
            if (ret[3]) {
                ptr2 = 0; len2 = 0;
                throw takeFromExternrefTable0(ret[2]);
            }
            deferred3_0 = ptr2;
            deferred3_1 = len2;
            return getStringFromWasm0(ptr2, len2);
        } finally {
            wasm.__wbindgen_free(deferred3_0, deferred3_1, 1);
        }
    }
    /**
     * @param {string} expression
     * @param {boolean} raw
     * @param {boolean} pretty_print_ast
     * @param {boolean} display_ast
     * @param {boolean} dump_bytecode
     * @param {boolean} trace_runtime
     * @param {boolean} strict
     * @returns {any}
     */
    evaluate_with_debug_info(expression, raw, pretty_print_ast, display_ast, dump_bytecode, trace_runtime, strict) {
        if (this.__wbg_ptr == 0) throw new Error('Attempt to use a moved value');
        _assertNum(this.__wbg_ptr);
        const ptr0 = passStringToWasm0(expression, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        _assertBoolean(raw);
        _assertBoolean(pretty_print_ast);
        _assertBoolean(display_ast);
        _assertBoolean(dump_bytecode);
        _assertBoolean(trace_runtime);
        _assertBoolean(strict);
        const ret = wasm.tvixevaluator_evaluate_with_debug_info(this.__wbg_ptr, ptr0, len0, raw, pretty_print_ast, display_ast, dump_bytecode, trace_runtime, strict);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return takeFromExternrefTable0(ret[0]);
    }
    /**
     * @param {string} expression
     * @param {boolean} raw
     * @param {boolean} pretty_print_ast
     * @param {boolean} display_ast
     * @param {boolean} dump_bytecode
     * @param {boolean} trace_runtime
     * @param {boolean} strict
     * @returns {string}
     */
    evaluate_with_settings(expression, raw, pretty_print_ast, display_ast, dump_bytecode, trace_runtime, strict) {
        let deferred3_0;
        let deferred3_1;
        try {
            if (this.__wbg_ptr == 0) throw new Error('Attempt to use a moved value');
            _assertNum(this.__wbg_ptr);
            const ptr0 = passStringToWasm0(expression, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len0 = WASM_VECTOR_LEN;
            _assertBoolean(raw);
            _assertBoolean(pretty_print_ast);
            _assertBoolean(display_ast);
            _assertBoolean(dump_bytecode);
            _assertBoolean(trace_runtime);
            _assertBoolean(strict);
            const ret = wasm.tvixevaluator_evaluate_with_settings(this.__wbg_ptr, ptr0, len0, raw, pretty_print_ast, display_ast, dump_bytecode, trace_runtime, strict);
            var ptr2 = ret[0];
            var len2 = ret[1];
            if (ret[3]) {
                ptr2 = 0; len2 = 0;
                throw takeFromExternrefTable0(ret[2]);
            }
            deferred3_0 = ptr2;
            deferred3_1 = len2;
            return getStringFromWasm0(ptr2, len2);
        } finally {
            wasm.__wbindgen_free(deferred3_0, deferred3_1, 1);
        }
    }
}

async function __wbg_load(module, imports) {
    if (typeof Response === 'function' && module instanceof Response) {
        if (typeof WebAssembly.instantiateStreaming === 'function') {
            try {
                return await WebAssembly.instantiateStreaming(module, imports);

            } catch (e) {
                if (module.headers.get('Content-Type') != 'application/wasm') {
                    console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve Wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n", e);

                } else {
                    throw e;
                }
            }
        }

        const bytes = await module.arrayBuffer();
        return await WebAssembly.instantiate(bytes, imports);

    } else {
        const instance = await WebAssembly.instantiate(module, imports);

        if (instance instanceof WebAssembly.Instance) {
            return { instance, module };

        } else {
            return instance;
        }
    }
}

function __wbg_get_imports() {
    const imports = {};
    imports.wbg = {};
    imports.wbg.__wbg_1_7c3772a09961eb68 = function() { return logError(function () {
        const ret = RegExp.$1;
        return ret;
    }, arguments) };
    imports.wbg.__wbg_2_2ba3f2617e57ce54 = function() { return logError(function () {
        const ret = RegExp.$2;
        return ret;
    }, arguments) };
    imports.wbg.__wbg_3_8f1745159afd261e = function() { return logError(function () {
        const ret = RegExp.$3;
        return ret;
    }, arguments) };
    imports.wbg.__wbg_4_0fb07f4afb524198 = function() { return logError(function () {
        const ret = RegExp.$4;
        return ret;
    }, arguments) };
    imports.wbg.__wbg_5_297aa2c67ab78756 = function() { return logError(function () {
        const ret = RegExp.$5;
        return ret;
    }, arguments) };
    imports.wbg.__wbg_6_e87c7f0ea327f381 = function() { return logError(function () {
        const ret = RegExp.$6;
        return ret;
    }, arguments) };
    imports.wbg.__wbg_7_9f0eccaca8609471 = function() { return logError(function () {
        const ret = RegExp.$7;
        return ret;
    }, arguments) };
    imports.wbg.__wbg_8_bb2f912f04364f52 = function() { return logError(function () {
        const ret = RegExp.$8;
        return ret;
    }, arguments) };
    imports.wbg.__wbg_9_beb1a2cc062b45eb = function() { return logError(function () {
        const ret = RegExp.$9;
        return ret;
    }, arguments) };
    imports.wbg.__wbg_BigInt_83b60d3772ed53fe = function() { return logError(function (arg0) {
        const ret = BigInt(arg0);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_BigInt_d43f00cc86af8147 = function() { return handleError(function (arg0) {
        const ret = BigInt(arg0);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_UTC_91dd9543bf65d4e1 = function() { return logError(function (arg0, arg1) {
        const ret = Date.UTC(arg0, arg1);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_abs_52237c8d80ebb457 = function() { return logError(function (arg0) {
        const ret = Math.abs(arg0);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_acos_3647f0ecae43e606 = function() { return logError(function (arg0) {
        const ret = Math.acos(arg0);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_acosh_87a63ee782911988 = function() { return logError(function (arg0) {
        const ret = Math.acosh(arg0);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_add_0d9e99fb9c2d2cc5 = function() { return logError(function (arg0, arg1) {
        const ret = arg0.add(arg1);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_add_10bdf63f022accde = function() { return handleError(function (arg0, arg1, arg2) {
        const ret = Atomics.add(arg0, arg1 >>> 0, arg2);
        _assertBigInt(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_add_d609f49c3133eef1 = function() { return logError(function (arg0, arg1) {
        const ret = arg0.add(arg1);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_add_f9f72f17caf9ca67 = function() { return handleError(function (arg0, arg1, arg2) {
        const ret = Atomics.add(arg0, arg1 >>> 0, arg2);
        _assertNum(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_allSettled_c3caddb6b2e7a3f3 = function() { return logError(function (arg0) {
        const ret = Promise.allSettled(arg0);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_all_92f7863c2166cac1 = function() { return logError(function (arg0) {
        const ret = Promise.all(arg0);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_and_3052f1381df5d8f5 = function() { return handleError(function (arg0, arg1, arg2) {
        const ret = Atomics.and(arg0, arg1 >>> 0, arg2);
        _assertNum(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_and_eda9a325a22152d4 = function() { return handleError(function (arg0, arg1, arg2) {
        const ret = Atomics.and(arg0, arg1 >>> 0, arg2);
        _assertBigInt(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_any_46263cf90d64c7ba = function() { return logError(function (arg0) {
        const ret = Promise.any(arg0);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_apply_0595e14e01b58931 = function() { return handleError(function (arg0, arg1, arg2) {
        const ret = arg0.apply(arg1, arg2);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_apply_e185aee3133b64b8 = function() { return handleError(function (arg0, arg1, arg2) {
        const ret = Reflect.apply(arg0, arg1, arg2);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_asIntN_7d2ad12602f40a38 = function() { return logError(function (arg0, arg1) {
        const ret = BigInt.asIntN(arg0, arg1);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_asUintN_2a6077915775696c = function() { return logError(function (arg0, arg1) {
        const ret = BigInt.asUintN(arg0, arg1);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_asin_34b7a6d32e6c2c8a = function() { return logError(function (arg0) {
        const ret = Math.asin(arg0);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_asinh_f6dc96c4143702cb = function() { return logError(function (arg0) {
        const ret = Math.asinh(arg0);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_assign_d34c9cb35f308e81 = function() { return logError(function (arg0, arg1) {
        const ret = Object.assign(arg0, arg1);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_assign_ec92610961c67b02 = function() { return logError(function (arg0, arg1, arg2, arg3) {
        const ret = Object.assign(arg0, arg1, arg2, arg3);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_assign_f1f14f836097c948 = function() { return logError(function (arg0, arg1, arg2) {
        const ret = Object.assign(arg0, arg1, arg2);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_asyncIterator_5f23ad3a765d551b = function() { return logError(function () {
        const ret = Symbol.asyncIterator;
        return ret;
    }, arguments) };
    imports.wbg.__wbg_at_401828714a8d4cae = function() { return logError(function (arg0, arg1) {
        const ret = arg0.at(arg1);
        if (!isLikeNone(ret)) {
            _assertNum(ret);
        }
        return isLikeNone(ret) ? 0xFFFFFF : ret;
    }, arguments) };
    imports.wbg.__wbg_at_4339a6e1f856742b = function() { return logError(function (arg0, arg1) {
        const ret = arg0.at(arg1);
        if (!isLikeNone(ret)) {
            _assertNum(ret);
        }
        return isLikeNone(ret) ? 0x100000001 : (ret) >>> 0;
    }, arguments) };
    imports.wbg.__wbg_at_479807bfddde3a33 = function() { return logError(function (arg0, arg1) {
        const ret = arg0.at(arg1);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_at_6e79e46e218d6d1f = function() { return logError(function (arg0, arg1) {
        const ret = arg0.at(arg1);
        if (!isLikeNone(ret)) {
            _assertNum(ret);
        }
        return isLikeNone(ret) ? 0xFFFFFF : ret;
    }, arguments) };
    imports.wbg.__wbg_at_97e115c46046f4fa = function() { return logError(function (arg0, arg1, arg2) {
        const ret = arg1.at(arg2);
        if (!isLikeNone(ret)) {
            _assertNum(ret);
        }
        getDataViewMemory0().setFloat64(arg0 + 8 * 1, isLikeNone(ret) ? 0 : ret, true);
        getDataViewMemory0().setInt32(arg0 + 4 * 0, !isLikeNone(ret), true);
    }, arguments) };
    imports.wbg.__wbg_at_b6ea6b7a38069d98 = function() { return logError(function (arg0, arg1) {
        const ret = arg0.at(arg1);
        if (!isLikeNone(ret)) {
            _assertNum(ret);
        }
        return isLikeNone(ret) ? 0x100000001 : Math.fround(ret);
    }, arguments) };
    imports.wbg.__wbg_at_c0744f94f102e5f3 = function() { return logError(function (arg0, arg1) {
        const ret = arg0.at(arg1);
        if (!isLikeNone(ret)) {
            _assertNum(ret);
        }
        return isLikeNone(ret) ? 0xFFFFFF : ret;
    }, arguments) };
    imports.wbg.__wbg_at_c5cae62abddf7daa = function() { return logError(function (arg0, arg1) {
        const ret = arg0.at(arg1);
        return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
    }, arguments) };
    imports.wbg.__wbg_at_d5ddb8539e14bbb1 = function() { return logError(function (arg0, arg1, arg2) {
        const ret = arg1.at(arg2);
        if (!isLikeNone(ret)) {
            _assertBigInt(ret);
        }
        getDataViewMemory0().setBigInt64(arg0 + 8 * 1, isLikeNone(ret) ? BigInt(0) : ret, true);
        getDataViewMemory0().setInt32(arg0 + 4 * 0, !isLikeNone(ret), true);
    }, arguments) };
    imports.wbg.__wbg_at_e8f96348a9b2ab4e = function() { return logError(function (arg0, arg1) {
        const ret = arg0.at(arg1);
        if (!isLikeNone(ret)) {
            _assertNum(ret);
        }
        return isLikeNone(ret) ? 0x100000001 : (ret) >> 0;
    }, arguments) };
    imports.wbg.__wbg_at_eabf8eb1692c60db = function() { return logError(function (arg0, arg1, arg2) {
        const ret = arg1.at(arg2);
        if (!isLikeNone(ret)) {
            _assertBigInt(ret);
        }
        getDataViewMemory0().setBigInt64(arg0 + 8 * 1, isLikeNone(ret) ? BigInt(0) : ret, true);
        getDataViewMemory0().setInt32(arg0 + 4 * 0, !isLikeNone(ret), true);
    }, arguments) };
    imports.wbg.__wbg_at_f9bac1de543b6176 = function() { return logError(function (arg0, arg1) {
        const ret = arg0.at(arg1);
        if (!isLikeNone(ret)) {
            _assertNum(ret);
        }
        return isLikeNone(ret) ? 0xFFFFFF : ret;
    }, arguments) };
    imports.wbg.__wbg_at_fcda59dc9386a32b = function() { return logError(function (arg0, arg1) {
        const ret = arg0.at(arg1);
        if (!isLikeNone(ret)) {
            _assertNum(ret);
        }
        return isLikeNone(ret) ? 0xFFFFFF : ret;
    }, arguments) };
    imports.wbg.__wbg_atan2_8aa07d65abb23347 = function() { return logError(function (arg0, arg1) {
        const ret = Math.atan2(arg0, arg1);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_atan_b1c4d321af15b5a3 = function() { return logError(function (arg0) {
        const ret = Math.atan(arg0);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_atanh_736dc2f7f17e1eba = function() { return logError(function (arg0) {
        const ret = Math.atanh(arg0);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_bind_19501f69ee76866c = function() { return logError(function (arg0, arg1, arg2) {
        const ret = arg0.bind(arg1, arg2);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_bind_4f01d2d86b4acd85 = function() { return logError(function (arg0, arg1, arg2, arg3, arg4) {
        const ret = arg0.bind(arg1, arg2, arg3, arg4);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_bind_95ce0113cfd2324d = function() { return logError(function (arg0, arg1) {
        const ret = arg0.bind(arg1);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_bind_984a4afc04d77058 = function() { return logError(function (arg0, arg1) {
        const ret = arg0.bind(arg1);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_bind_e443b204773403b4 = function() { return logError(function (arg0, arg1, arg2, arg3) {
        const ret = arg0.bind(arg1, arg2, arg3);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_buffer_0efda5de8ecd39ca = function() { return logError(function (arg0) {
        const ret = arg0.buffer;
        return ret;
    }, arguments) };
    imports.wbg.__wbg_buffer_12be3726723c3d02 = function() { return logError(function (arg0) {
        const ret = arg0.buffer;
        return ret;
    }, arguments) };
    imports.wbg.__wbg_buffer_3838dcd65d69f2ce = function() { return logError(function (arg0) {
        const ret = arg0.buffer;
        return ret;
    }, arguments) };
    imports.wbg.__wbg_buffer_3a89e45c6b405d66 = function() { return logError(function (arg0) {
        const ret = arg0.buffer;
        return ret;
    }, arguments) };
    imports.wbg.__wbg_buffer_4b2b30f7261c4714 = function() { return logError(function (arg0) {
        const ret = arg0.buffer;
        return ret;
    }, arguments) };
    imports.wbg.__wbg_buffer_61b7ce01341d7f88 = function() { return logError(function (arg0) {
        const ret = arg0.buffer;
        return ret;
    }, arguments) };
    imports.wbg.__wbg_buffer_71e2048315ca869a = function() { return logError(function (arg0) {
        const ret = arg0.buffer;
        return ret;
    }, arguments) };
    imports.wbg.__wbg_buffer_8f412141b174e726 = function() { return logError(function (arg0) {
        const ret = arg0.buffer;
        return ret;
    }, arguments) };
    imports.wbg.__wbg_buffer_9bafab3dc1eb77d9 = function() { return logError(function (arg0) {
        const ret = arg0.buffer;
        return ret;
    }, arguments) };
    imports.wbg.__wbg_buffer_a1e3fb180d2a8775 = function() { return logError(function (arg0) {
        const ret = arg0.buffer;
        return ret;
    }, arguments) };
    imports.wbg.__wbg_buffer_d653c5ce8fb70e52 = function() { return logError(function (arg0) {
        const ret = arg0.buffer;
        return ret;
    }, arguments) };
    imports.wbg.__wbg_buffer_dc5dbfa8d5fb28cf = function() { return logError(function (arg0) {
        const ret = arg0.buffer;
        return ret;
    }, arguments) };
    imports.wbg.__wbg_buffer_f8efb23b7d3acd3f = function() { return logError(function (arg0) {
        const ret = arg0.buffer;
        return ret;
    }, arguments) };
    imports.wbg.__wbg_byteLength_1b2d953758afc500 = function() { return logError(function (arg0) {
        const ret = arg0.byteLength;
        _assertNum(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_byteLength_228bcc8920ef846e = function() { return logError(function (arg0) {
        const ret = arg0.byteLength;
        _assertNum(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_byteLength_373c7739a0e3bb7f = function() { return logError(function (arg0) {
        const ret = arg0.byteLength;
        _assertNum(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_byteLength_40ec5d0bf687dd11 = function() { return logError(function (arg0) {
        const ret = arg0.byteLength;
        _assertNum(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_byteLength_4dcad67f69497d91 = function() { return logError(function (arg0) {
        const ret = arg0.byteLength;
        _assertNum(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_byteLength_51fa828f83d94f1f = function() { return logError(function (arg0) {
        const ret = arg0.byteLength;
        _assertNum(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_byteLength_6a27d1371e55f6fd = function() { return logError(function (arg0) {
        const ret = arg0.byteLength;
        _assertNum(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_byteLength_909ee508519f14ab = function() { return logError(function (arg0) {
        const ret = arg0.byteLength;
        _assertNum(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_byteLength_92a806f567da3b8c = function() { return logError(function (arg0) {
        const ret = arg0.byteLength;
        _assertNum(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_byteLength_98ab73db61204cc6 = function() { return logError(function (arg0) {
        const ret = arg0.byteLength;
        _assertNum(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_byteLength_9a194a5b6c166f2c = function() { return logError(function (arg0) {
        const ret = arg0.byteLength;
        _assertNum(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_byteLength_ee64b81749c831e4 = function() { return logError(function (arg0) {
        const ret = arg0.byteLength;
        _assertNum(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_byteLength_f9964250eb4a86b5 = function() { return logError(function (arg0) {
        const ret = arg0.byteLength;
        _assertNum(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_byteLength_fc3024da4387238d = function() { return logError(function (arg0) {
        const ret = arg0.byteLength;
        _assertNum(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_byteOffset_1313b1ce4115d8a4 = function() { return logError(function (arg0) {
        const ret = arg0.byteOffset;
        _assertNum(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_byteOffset_13d1170099e91682 = function() { return logError(function (arg0) {
        const ret = arg0.byteOffset;
        _assertNum(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_byteOffset_2bee0fa16964b696 = function() { return logError(function (arg0) {
        const ret = arg0.byteOffset;
        _assertNum(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_byteOffset_3e077785fafef853 = function() { return logError(function (arg0) {
        const ret = arg0.byteOffset;
        _assertNum(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_byteOffset_603e8b4df6250471 = function() { return logError(function (arg0) {
        const ret = arg0.byteOffset;
        _assertNum(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_byteOffset_675f093ec47b135f = function() { return logError(function (arg0) {
        const ret = arg0.byteOffset;
        _assertNum(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_byteOffset_7ef484c6c1d473e9 = function() { return logError(function (arg0) {
        const ret = arg0.byteOffset;
        _assertNum(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_byteOffset_93e1576492654291 = function() { return logError(function (arg0) {
        const ret = arg0.byteOffset;
        _assertNum(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_byteOffset_acb0f39bdc472c3f = function() { return logError(function (arg0) {
        const ret = arg0.byteOffset;
        _assertNum(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_byteOffset_ad56e9cdd25ca7c7 = function() { return logError(function (arg0) {
        const ret = arg0.byteOffset;
        _assertNum(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_byteOffset_bcc1c9b6f1c42591 = function() { return logError(function (arg0) {
        const ret = arg0.byteOffset;
        _assertNum(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_byteOffset_dc880228c553d5b8 = function() { return logError(function (arg0) {
        const ret = arg0.byteOffset;
        _assertNum(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_call_3b770f0d6eb4720e = function() { return handleError(function (arg0, arg1, arg2, arg3) {
        const ret = arg0.call(arg1, arg2, arg3);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_call_500db948e69c7330 = function() { return handleError(function (arg0, arg1, arg2) {
        const ret = arg0.call(arg1, arg2);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_call_9bd6f269d4835e33 = function() { return handleError(function (arg0, arg1, arg2, arg3, arg4) {
        const ret = arg0.call(arg1, arg2, arg3, arg4);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_call_b0d8e36992d9900d = function() { return handleError(function (arg0, arg1) {
        const ret = arg0.call(arg1);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_catch_d0fc80129c999ab3 = function() { return logError(function (arg0, arg1) {
        const ret = arg0.catch(arg1);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_cause_40dbd25789968c1a = function() { return logError(function (arg0) {
        const ret = arg0.cause;
        return ret;
    }, arguments) };
    imports.wbg.__wbg_cbrt_9603cde41b9903ac = function() { return logError(function (arg0) {
        const ret = Math.cbrt(arg0);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_ceil_5cd004a49ac02e2f = function() { return logError(function (arg0) {
        const ret = Math.ceil(arg0);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_charAt_2d4a337c1f385c40 = function() { return logError(function (arg0, arg1) {
        const ret = arg0.charAt(arg1 >>> 0);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_charCodeAt_f90f5a110314c4fb = function() { return logError(function (arg0, arg1) {
        const ret = arg0.charCodeAt(arg1 >>> 0);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_clear_28a2ca25f891056c = function() { return logError(function (arg0) {
        arg0.clear();
    }, arguments) };
    imports.wbg.__wbg_clear_3620b8f4499d0b04 = function() { return logError(function (arg0) {
        arg0.clear();
    }, arguments) };
    imports.wbg.__wbg_clz32_adde7ba4173bd407 = function() { return logError(function (arg0) {
        const ret = Math.clz32(arg0);
        _assertNum(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_codePointAt_93f466f2352273c3 = function() { return logError(function (arg0, arg1) {
        const ret = arg0.codePointAt(arg1 >>> 0);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_compareExchange_c9cecb126b9b5ba8 = function() { return handleError(function (arg0, arg1, arg2, arg3) {
        const ret = Atomics.compareExchange(arg0, arg1 >>> 0, arg2, arg3);
        _assertBigInt(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_compareExchange_cac208e465205c29 = function() { return handleError(function (arg0, arg1, arg2, arg3) {
        const ret = Atomics.compareExchange(arg0, arg1 >>> 0, arg2, arg3);
        _assertNum(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_compare_6644ee1215a6ec74 = function() { return logError(function (arg0) {
        const ret = arg0.compare;
        return ret;
    }, arguments) };
    imports.wbg.__wbg_compileStreaming_30cb4c1dc67d9205 = function() { return logError(function (arg0) {
        const ret = WebAssembly.compileStreaming(arg0);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_compile_298f0ff268b0f689 = function() { return logError(function (arg0) {
        const ret = WebAssembly.compile(arg0);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_concat_6dffddf360b09ccd = function() { return logError(function (arg0, arg1) {
        const ret = arg0.concat(arg1);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_concat_8564170ecd8c95d6 = function() { return logError(function (arg0, arg1) {
        const ret = arg0.concat(arg1);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_construct_cff75afafdeae294 = function() { return handleError(function (arg0, arg1) {
        const ret = Reflect.construct(arg0, arg1);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_construct_dd8b7f0a7c706ae7 = function() { return handleError(function (arg0, arg1, arg2) {
        const ret = Reflect.construct(arg0, arg1, arg2);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_constructor_dbc1fa8bf53335ed = function() { return logError(function (arg0) {
        const ret = arg0.constructor;
        return ret;
    }, arguments) };
    imports.wbg.__wbg_copyWithin_13131be04d8b1d2f = function() { return logError(function (arg0, arg1, arg2, arg3) {
        const ret = arg0.copyWithin(arg1, arg2, arg3);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_copyWithin_22af380fbd3fba5f = function() { return logError(function (arg0, arg1, arg2, arg3) {
        const ret = arg0.copyWithin(arg1, arg2, arg3);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_copyWithin_28ddaf43eca34305 = function() { return logError(function (arg0, arg1, arg2, arg3) {
        const ret = arg0.copyWithin(arg1, arg2, arg3);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_copyWithin_474cb7d69c2f1c2d = function() { return logError(function (arg0, arg1, arg2, arg3) {
        const ret = arg0.copyWithin(arg1, arg2, arg3);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_copyWithin_487de84267af8c64 = function() { return logError(function (arg0, arg1, arg2, arg3) {
        const ret = arg0.copyWithin(arg1, arg2, arg3);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_copyWithin_4a41c657e2546fca = function() { return logError(function (arg0, arg1, arg2, arg3) {
        const ret = arg0.copyWithin(arg1, arg2, arg3);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_copyWithin_6628e547cc97974c = function() { return logError(function (arg0, arg1, arg2, arg3) {
        const ret = arg0.copyWithin(arg1, arg2, arg3);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_copyWithin_819792941b8e6963 = function() { return logError(function (arg0, arg1, arg2, arg3) {
        const ret = arg0.copyWithin(arg1, arg2, arg3);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_copyWithin_a716d1fd29460498 = function() { return logError(function (arg0, arg1, arg2, arg3) {
        const ret = arg0.copyWithin(arg1, arg2, arg3);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_copyWithin_c2a48d163d9b6175 = function() { return logError(function (arg0, arg1, arg2, arg3) {
        const ret = arg0.copyWithin(arg1, arg2, arg3);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_copyWithin_cdf3669e399a806c = function() { return logError(function (arg0, arg1, arg2, arg3) {
        const ret = arg0.copyWithin(arg1, arg2, arg3);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_copyWithin_e05334ac680dea4d = function() { return logError(function (arg0, arg1, arg2, arg3) {
        const ret = arg0.copyWithin(arg1, arg2, arg3);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_cos_08331b039e7419da = function() { return logError(function (arg0) {
        const ret = Math.cos(arg0);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_cosh_46f09a968354c306 = function() { return logError(function (arg0) {
        const ret = Math.cosh(arg0);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_create_861381d799b454bc = function() { return logError(function (arg0) {
        const ret = Object.create(arg0);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_customSections_80104eeb866f1ae3 = function() { return logError(function (arg0, arg1, arg2) {
        const ret = WebAssembly.Module.customSections(arg0, getStringFromWasm0(arg1, arg2));
        return ret;
    }, arguments) };
    imports.wbg.__wbg_decodeURIComponent_9b2aaf393eb2f2dd = function() { return handleError(function (arg0, arg1) {
        const ret = decodeURIComponent(getStringFromWasm0(arg0, arg1));
        return ret;
    }, arguments) };
    imports.wbg.__wbg_decodeURI_f653939d89df1e8c = function() { return handleError(function (arg0, arg1) {
        const ret = decodeURI(getStringFromWasm0(arg0, arg1));
        return ret;
    }, arguments) };
    imports.wbg.__wbg_defineProperties_5c5b628dbae9386b = function() { return logError(function (arg0, arg1) {
        const ret = Object.defineProperties(arg0, arg1);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_defineProperty_777b846f5c1335d9 = function() { return handleError(function (arg0, arg1, arg2) {
        const ret = Reflect.defineProperty(arg0, arg1, arg2);
        _assertBoolean(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_defineProperty_a829da75f398746c = function() { return logError(function (arg0, arg1, arg2) {
        const ret = Object.defineProperty(arg0, arg1, arg2);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_deleteProperty_0ccc7fae163f60ac = function() { return handleError(function (arg0, arg1) {
        const ret = Reflect.deleteProperty(arg0, arg1);
        _assertBoolean(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_delete_05c3adf0f6521f85 = function() { return logError(function (arg0, arg1) {
        const ret = arg0.delete(arg1);
        _assertBoolean(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_delete_1869426209e60a28 = function() { return logError(function (arg0, arg1) {
        const ret = arg0.delete(arg1);
        _assertBoolean(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_delete_66fc07dcf2c3afdd = function() { return logError(function (arg0, arg1) {
        const ret = arg0.delete(arg1);
        _assertBoolean(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_delete_b5e6660acf2c1e45 = function() { return logError(function (arg0, arg1) {
        const ret = arg0.delete(arg1);
        _assertBoolean(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_delete_d02bc3732e69df75 = function() { return logError(function (arg0, arg1) {
        delete arg0[arg1 >>> 0];
    }, arguments) };
    imports.wbg.__wbg_done_f22c1561fa919baa = function() { return logError(function (arg0) {
        const ret = arg0.done;
        _assertBoolean(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_encodeURIComponent_16194a9ba1693875 = function() { return logError(function (arg0, arg1) {
        const ret = encodeURIComponent(getStringFromWasm0(arg0, arg1));
        return ret;
    }, arguments) };
    imports.wbg.__wbg_encodeURI_4c1bf894187ef815 = function() { return logError(function (arg0, arg1) {
        const ret = encodeURI(getStringFromWasm0(arg0, arg1));
        return ret;
    }, arguments) };
    imports.wbg.__wbg_endsWith_f1788781734ecd9d = function() { return logError(function (arg0, arg1, arg2, arg3) {
        const ret = arg0.endsWith(getStringFromWasm0(arg1, arg2), arg3);
        _assertBoolean(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_entries_4f2bb9b0d701c0f6 = function() { return logError(function (arg0) {
        const ret = Object.entries(arg0);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_entries_5c9f56643036326f = function() { return logError(function (arg0) {
        const ret = arg0.entries();
        return ret;
    }, arguments) };
    imports.wbg.__wbg_entries_82bf0e755ef54a5f = function() { return logError(function (arg0) {
        const ret = arg0.entries();
        return ret;
    }, arguments) };
    imports.wbg.__wbg_entries_f9831ee0f0dedb67 = function() { return logError(function (arg0) {
        const ret = arg0.entries();
        return ret;
    }, arguments) };
    imports.wbg.__wbg_error_7534b8e9a36f1ab4 = function() { return logError(function (arg0, arg1) {
        let deferred0_0;
        let deferred0_1;
        try {
            deferred0_0 = arg0;
            deferred0_1 = arg1;
            console.error(getStringFromWasm0(arg0, arg1));
        } finally {
            wasm.__wbindgen_free(deferred0_0, deferred0_1, 1);
        }
    }, arguments) };
    imports.wbg.__wbg_escape_3f14147b956f1af4 = function() { return logError(function (arg0, arg1) {
        const ret = escape(getStringFromWasm0(arg0, arg1));
        return ret;
    }, arguments) };
    imports.wbg.__wbg_eval_cd0c386c3899dd07 = function() { return handleError(function (arg0, arg1) {
        const ret = eval(getStringFromWasm0(arg0, arg1));
        return ret;
    }, arguments) };
    imports.wbg.__wbg_every_1880c57bfb4d0dff = function() { return logError(function (arg0, arg1, arg2) {
        try {
            var state0 = {a: arg1, b: arg2};
            var cb0 = (arg0, arg1, arg2) => {
                const a = state0.a;
                state0.a = 0;
                try {
                    return __wbg_adapter_122(a, state0.b, arg0, arg1, arg2);
                } finally {
                    state0.a = a;
                }
            };
            const ret = arg0.every(cb0);
            _assertBoolean(ret);
            return ret;
        } finally {
            state0.a = state0.b = 0;
        }
    }, arguments) };
    imports.wbg.__wbg_exchange_0170bb1bbb4f0b3a = function() { return handleError(function (arg0, arg1, arg2) {
        const ret = Atomics.exchange(arg0, arg1 >>> 0, arg2);
        _assertNum(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_exchange_57b886cec26f79d5 = function() { return handleError(function (arg0, arg1, arg2) {
        const ret = Atomics.exchange(arg0, arg1 >>> 0, arg2);
        _assertBigInt(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_exec_2630a18b88ec1a61 = function() { return logError(function (arg0, arg1, arg2) {
        const ret = arg0.exec(getStringFromWasm0(arg1, arg2));
        return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
    }, arguments) };
    imports.wbg.__wbg_exp_e6491f6d855ff01f = function() { return logError(function (arg0) {
        const ret = Math.exp(arg0);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_expm1_4d8519692a911eea = function() { return logError(function (arg0) {
        const ret = Math.expm1(arg0);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_exports_47e00f52aac40ed0 = function() { return logError(function (arg0) {
        const ret = arg0.exports;
        return ret;
    }, arguments) };
    imports.wbg.__wbg_exports_fa88afc6fdcf5a43 = function() { return logError(function (arg0) {
        const ret = WebAssembly.Module.exports(arg0);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_fill_05ec3c9f98ced9b3 = function() { return logError(function (arg0, arg1, arg2, arg3) {
        const ret = arg0.fill(arg1, arg2 >>> 0, arg3 >>> 0);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_fill_3d5048b344b0d007 = function() { return logError(function (arg0, arg1, arg2, arg3) {
        const ret = arg0.fill(arg1, arg2 >>> 0, arg3 >>> 0);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_fill_533d03ab1fcb3fa5 = function() { return logError(function (arg0, arg1, arg2, arg3) {
        const ret = arg0.fill(arg1, arg2 >>> 0, arg3 >>> 0);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_fill_5697181b32db23a1 = function() { return logError(function (arg0, arg1, arg2, arg3) {
        const ret = arg0.fill(arg1, arg2 >>> 0, arg3 >>> 0);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_fill_57fc9d52313c1128 = function() { return logError(function (arg0, arg1, arg2, arg3) {
        const ret = arg0.fill(arg1, arg2 >>> 0, arg3 >>> 0);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_fill_8564020baa6fc4d9 = function() { return logError(function (arg0, arg1, arg2, arg3) {
        const ret = arg0.fill(arg1 >>> 0, arg2 >>> 0, arg3 >>> 0);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_fill_864961fe02214449 = function() { return logError(function (arg0, arg1, arg2, arg3) {
        const ret = arg0.fill(arg1, arg2 >>> 0, arg3 >>> 0);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_fill_8b8279454fe9ba4e = function() { return logError(function (arg0, arg1, arg2, arg3) {
        const ret = arg0.fill(arg1, arg2 >>> 0, arg3 >>> 0);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_fill_bfd553d48e5a5a42 = function() { return logError(function (arg0, arg1, arg2, arg3) {
        const ret = arg0.fill(arg1, arg2 >>> 0, arg3 >>> 0);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_fill_c54c1039ac4d4bad = function() { return logError(function (arg0, arg1, arg2, arg3) {
        const ret = arg0.fill(arg1, arg2 >>> 0, arg3 >>> 0);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_fill_db51471a4fedde9c = function() { return logError(function (arg0, arg1, arg2, arg3) {
        const ret = arg0.fill(arg1, arg2 >>> 0, arg3 >>> 0);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_fill_ee4372dc2fcc95d0 = function() { return logError(function (arg0, arg1, arg2, arg3) {
        const ret = arg0.fill(BigInt.asUintN(64, arg1), arg2 >>> 0, arg3 >>> 0);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_filter_31a1b79a7b355887 = function() { return logError(function (arg0, arg1, arg2) {
        try {
            var state0 = {a: arg1, b: arg2};
            var cb0 = (arg0, arg1, arg2) => {
                const a = state0.a;
                state0.a = 0;
                try {
                    return __wbg_adapter_122(a, state0.b, arg0, arg1, arg2);
                } finally {
                    state0.a = a;
                }
            };
            const ret = arg0.filter(cb0);
            return ret;
        } finally {
            state0.a = state0.b = 0;
        }
    }, arguments) };
    imports.wbg.__wbg_finally_c88886a3087eed2f = function() { return logError(function (arg0, arg1) {
        const ret = arg0.finally(arg1);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_findIndex_a58792602b501f0a = function() { return logError(function (arg0, arg1, arg2) {
        try {
            var state0 = {a: arg1, b: arg2};
            var cb0 = (arg0, arg1, arg2) => {
                const a = state0.a;
                state0.a = 0;
                try {
                    return __wbg_adapter_122(a, state0.b, arg0, arg1, arg2);
                } finally {
                    state0.a = a;
                }
            };
            const ret = arg0.findIndex(cb0);
            _assertNum(ret);
            return ret;
        } finally {
            state0.a = state0.b = 0;
        }
    }, arguments) };
    imports.wbg.__wbg_findLastIndex_1b05c46666a33976 = function() { return logError(function (arg0, arg1, arg2) {
        try {
            var state0 = {a: arg1, b: arg2};
            var cb0 = (arg0, arg1, arg2) => {
                const a = state0.a;
                state0.a = 0;
                try {
                    return __wbg_adapter_122(a, state0.b, arg0, arg1, arg2);
                } finally {
                    state0.a = a;
                }
            };
            const ret = arg0.findLastIndex(cb0);
            _assertNum(ret);
            return ret;
        } finally {
            state0.a = state0.b = 0;
        }
    }, arguments) };
    imports.wbg.__wbg_findLast_bf7095a4932a1bdc = function() { return logError(function (arg0, arg1, arg2) {
        try {
            var state0 = {a: arg1, b: arg2};
            var cb0 = (arg0, arg1, arg2) => {
                const a = state0.a;
                state0.a = 0;
                try {
                    return __wbg_adapter_122(a, state0.b, arg0, arg1, arg2);
                } finally {
                    state0.a = a;
                }
            };
            const ret = arg0.findLast(cb0);
            return ret;
        } finally {
            state0.a = state0.b = 0;
        }
    }, arguments) };
    imports.wbg.__wbg_find_ce2c6b78493e587b = function() { return logError(function (arg0, arg1, arg2) {
        try {
            var state0 = {a: arg1, b: arg2};
            var cb0 = (arg0, arg1, arg2) => {
                const a = state0.a;
                state0.a = 0;
                try {
                    return __wbg_adapter_122(a, state0.b, arg0, arg1, arg2);
                } finally {
                    state0.a = a;
                }
            };
            const ret = arg0.find(cb0);
            return ret;
        } finally {
            state0.a = state0.b = 0;
        }
    }, arguments) };
    imports.wbg.__wbg_flags_5a3930f5ca7572e7 = function() { return logError(function (arg0) {
        const ret = arg0.flags;
        return ret;
    }, arguments) };
    imports.wbg.__wbg_flatMap_21518d58a0b1c8ab = function() { return logError(function (arg0, arg1, arg2) {
        try {
            var state0 = {a: arg1, b: arg2};
            var cb0 = (arg0, arg1, arg2) => {
                const a = state0.a;
                state0.a = 0;
                try {
                    return __wbg_adapter_139(a, state0.b, arg0, arg1, arg2);
                } finally {
                    state0.a = a;
                }
            };
            const ret = arg0.flatMap(cb0);
            return ret;
        } finally {
            state0.a = state0.b = 0;
        }
    }, arguments) };
    imports.wbg.__wbg_flat_5a8fbff1fc6e29af = function() { return logError(function (arg0, arg1) {
        const ret = arg0.flat(arg1);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_floor_08f0124d8c77bef5 = function() { return logError(function (arg0) {
        const ret = Math.floor(arg0);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_forEach_01b24754c6969dd9 = function() { return logError(function (arg0, arg1, arg2) {
        try {
            var state0 = {a: arg1, b: arg2};
            var cb0 = (arg0, arg1, arg2) => {
                const a = state0.a;
                state0.a = 0;
                try {
                    return __wbg_adapter_1176(a, state0.b, arg0, arg1, arg2);
                } finally {
                    state0.a = a;
                }
            };
            arg0.forEach(cb0);
        } finally {
            state0.a = state0.b = 0;
        }
    }, arguments) };
    imports.wbg.__wbg_forEach_0694bbbd4d6c5433 = function() { return logError(function (arg0, arg1, arg2) {
        try {
            var state0 = {a: arg1, b: arg2};
            var cb0 = (arg0, arg1, arg2) => {
                const a = state0.a;
                state0.a = 0;
                try {
                    return __wbg_adapter_721(a, state0.b, arg0, arg1, arg2);
                } finally {
                    state0.a = a;
                }
            };
            arg0.forEach(cb0);
        } finally {
            state0.a = state0.b = 0;
        }
    }, arguments) };
    imports.wbg.__wbg_forEach_2884aacc688de4d5 = function() { return logError(function (arg0, arg1, arg2) {
        try {
            var state0 = {a: arg1, b: arg2};
            var cb0 = (arg0, arg1, arg2) => {
                const a = state0.a;
                state0.a = 0;
                try {
                    return __wbg_adapter_1028(a, state0.b, arg0, arg1, arg2);
                } finally {
                    state0.a = a;
                }
            };
            arg0.forEach(cb0);
        } finally {
            state0.a = state0.b = 0;
        }
    }, arguments) };
    imports.wbg.__wbg_forEach_3b641af1c4d9c2f6 = function() { return logError(function (arg0, arg1, arg2) {
        try {
            var state0 = {a: arg1, b: arg2};
            var cb0 = (arg0, arg1, arg2) => {
                const a = state0.a;
                state0.a = 0;
                try {
                    return __wbg_adapter_1102(a, state0.b, arg0, arg1, arg2);
                } finally {
                    state0.a = a;
                }
            };
            arg0.forEach(cb0);
        } finally {
            state0.a = state0.b = 0;
        }
    }, arguments) };
    imports.wbg.__wbg_forEach_3bb9a2b1c9fd9d2a = function() { return logError(function (arg0, arg1, arg2) {
        try {
            var state0 = {a: arg1, b: arg2};
            var cb0 = (arg0, arg1, arg2) => {
                const a = state0.a;
                state0.a = 0;
                try {
                    return __wbg_adapter_991(a, state0.b, arg0, arg1, arg2);
                } finally {
                    state0.a = a;
                }
            };
            arg0.forEach(cb0);
        } finally {
            state0.a = state0.b = 0;
        }
    }, arguments) };
    imports.wbg.__wbg_forEach_3c31562e0878530d = function() { return logError(function (arg0, arg1, arg2) {
        try {
            var state0 = {a: arg1, b: arg2};
            var cb0 = (arg0, arg1, arg2) => {
                const a = state0.a;
                state0.a = 0;
                try {
                    return __wbg_adapter_1213(a, state0.b, arg0, arg1, arg2);
                } finally {
                    state0.a = a;
                }
            };
            arg0.forEach(cb0);
        } finally {
            state0.a = state0.b = 0;
        }
    }, arguments) };
    imports.wbg.__wbg_forEach_46c55c024043978e = function() { return logError(function (arg0, arg1, arg2) {
        try {
            var state0 = {a: arg1, b: arg2};
            var cb0 = (arg0, arg1, arg2) => {
                const a = state0.a;
                state0.a = 0;
                try {
                    return __wbg_adapter_1250(a, state0.b, arg0, arg1, arg2);
                } finally {
                    state0.a = a;
                }
            };
            arg0.forEach(cb0);
        } finally {
            state0.a = state0.b = 0;
        }
    }, arguments) };
    imports.wbg.__wbg_forEach_4c83b4eaba80e07f = function() { return logError(function (arg0, arg1, arg2) {
        try {
            var state0 = {a: arg1, b: arg2};
            var cb0 = (arg0, arg1, arg2) => {
                const a = state0.a;
                state0.a = 0;
                try {
                    return __wbg_adapter_1139(a, state0.b, arg0, arg1, arg2);
                } finally {
                    state0.a = a;
                }
            };
            arg0.forEach(cb0);
        } finally {
            state0.a = state0.b = 0;
        }
    }, arguments) };
    imports.wbg.__wbg_forEach_54a622de166a6e86 = function() { return logError(function (arg0, arg1, arg2) {
        try {
            var state0 = {a: arg1, b: arg2};
            var cb0 = (arg0, arg1, arg2) => {
                const a = state0.a;
                state0.a = 0;
                try {
                    return __wbg_adapter_1361(a, state0.b, arg0, arg1, arg2);
                } finally {
                    state0.a = a;
                }
            };
            arg0.forEach(cb0);
        } finally {
            state0.a = state0.b = 0;
        }
    }, arguments) };
    imports.wbg.__wbg_forEach_8b8375d71f8b2bde = function() { return logError(function (arg0, arg1, arg2) {
        try {
            var state0 = {a: arg1, b: arg2};
            var cb0 = (arg0, arg1, arg2) => {
                const a = state0.a;
                state0.a = 0;
                try {
                    return __wbg_adapter_142(a, state0.b, arg0, arg1, arg2);
                } finally {
                    state0.a = a;
                }
            };
            arg0.forEach(cb0);
        } finally {
            state0.a = state0.b = 0;
        }
    }, arguments) };
    imports.wbg.__wbg_forEach_960fd897546c2cc7 = function() { return logError(function (arg0, arg1, arg2) {
        try {
            var state0 = {a: arg1, b: arg2};
            var cb0 = (arg0, arg1) => {
                const a = state0.a;
                state0.a = 0;
                try {
                    return __wbg_adapter_390(a, state0.b, arg0, arg1);
                } finally {
                    state0.a = a;
                }
            };
            arg0.forEach(cb0);
        } finally {
            state0.a = state0.b = 0;
        }
    }, arguments) };
    imports.wbg.__wbg_forEach_9b0295c17d42c2f0 = function() { return logError(function (arg0, arg1, arg2) {
        try {
            var state0 = {a: arg1, b: arg2};
            var cb0 = (arg0, arg1, arg2) => {
                const a = state0.a;
                state0.a = 0;
                try {
                    return __wbg_adapter_1065(a, state0.b, arg0, arg1, arg2);
                } finally {
                    state0.a = a;
                }
            };
            arg0.forEach(cb0);
        } finally {
            state0.a = state0.b = 0;
        }
    }, arguments) };
    imports.wbg.__wbg_forEach_b3fd6c95f725f3dc = function() { return logError(function (arg0, arg1, arg2) {
        try {
            var state0 = {a: arg1, b: arg2};
            var cb0 = (arg0, arg1, arg2) => {
                const a = state0.a;
                state0.a = 0;
                try {
                    return __wbg_adapter_1324(a, state0.b, arg0, arg1, arg2);
                } finally {
                    state0.a = a;
                }
            };
            arg0.forEach(cb0);
        } finally {
            state0.a = state0.b = 0;
        }
    }, arguments) };
    imports.wbg.__wbg_forEach_bb3582f5eb643dcd = function() { return logError(function (arg0, arg1, arg2) {
        try {
            var state0 = {a: arg1, b: arg2};
            var cb0 = (arg0, arg1, arg2) => {
                const a = state0.a;
                state0.a = 0;
                try {
                    return __wbg_adapter_1287(a, state0.b, arg0, arg1, arg2);
                } finally {
                    state0.a = a;
                }
            };
            arg0.forEach(cb0);
        } finally {
            state0.a = state0.b = 0;
        }
    }, arguments) };
    imports.wbg.__wbg_for_8c0b3419f42bb736 = function() { return logError(function (arg0, arg1) {
        const ret = Symbol.for(getStringFromWasm0(arg0, arg1));
        return ret;
    }, arguments) };
    imports.wbg.__wbg_formatToParts_8fd745519c7fc8f6 = function() { return logError(function (arg0, arg1) {
        const ret = arg0.formatToParts(arg1);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_formatToParts_ca373241f07d8026 = function() { return logError(function (arg0, arg1) {
        const ret = arg0.formatToParts(arg1);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_formatToParts_d812aed73a8d9c56 = function() { return logError(function (arg0, arg1, arg2, arg3) {
        const ret = arg0.formatToParts(arg1, getStringFromWasm0(arg2, arg3));
        return ret;
    }, arguments) };
    imports.wbg.__wbg_format_217d82b0e6e8b482 = function() { return logError(function (arg0, arg1, arg2, arg3) {
        const ret = arg0.format(arg1, getStringFromWasm0(arg2, arg3));
        return ret;
    }, arguments) };
    imports.wbg.__wbg_format_a44559379ac2d500 = function() { return logError(function (arg0) {
        const ret = arg0.format;
        return ret;
    }, arguments) };
    imports.wbg.__wbg_format_ba55e4ac390a6f0e = function() { return logError(function (arg0) {
        const ret = arg0.format;
        return ret;
    }, arguments) };
    imports.wbg.__wbg_freeze_b2146f5ad9f91ddc = function() { return logError(function (arg0) {
        const ret = Object.freeze(arg0);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_fromCharCode_135bc1c6198d5bc3 = function() { return logError(function (arg0, arg1, arg2) {
        const ret = String.fromCharCode(arg0 >>> 0, arg1 >>> 0, arg2 >>> 0);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_fromCharCode_13657809ea706c5c = function() { return logError(function (arg0, arg1) {
        const ret = String.fromCharCode(...getArrayU16FromWasm0(arg0, arg1));
        return ret;
    }, arguments) };
    imports.wbg.__wbg_fromCharCode_4579acfa5254ae13 = function() { return logError(function (arg0, arg1, arg2, arg3, arg4) {
        const ret = String.fromCharCode(arg0 >>> 0, arg1 >>> 0, arg2 >>> 0, arg3 >>> 0, arg4 >>> 0);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_fromCharCode_7b797273b04c2a6e = function() { return logError(function (arg0, arg1, arg2, arg3) {
        const ret = String.fromCharCode(arg0 >>> 0, arg1 >>> 0, arg2 >>> 0, arg3 >>> 0);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_fromCharCode_9f32f79ddebc0566 = function() { return logError(function (arg0) {
        const ret = String.fromCharCode(arg0 >>> 0);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_fromCharCode_f91ce9c674c23d6a = function() { return logError(function (arg0, arg1) {
        const ret = String.fromCharCode(arg0 >>> 0, arg1 >>> 0);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_fromCodePoint_3f1c3428de007168 = function() { return handleError(function (arg0, arg1) {
        const ret = String.fromCodePoint(...getArrayU32FromWasm0(arg0, arg1));
        return ret;
    }, arguments) };
    imports.wbg.__wbg_fromCodePoint_524ed3fe7c437339 = function() { return handleError(function (arg0, arg1, arg2) {
        const ret = String.fromCodePoint(arg0 >>> 0, arg1 >>> 0, arg2 >>> 0);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_fromCodePoint_5dd6f311889dcd1c = function() { return handleError(function (arg0, arg1, arg2, arg3) {
        const ret = String.fromCodePoint(arg0 >>> 0, arg1 >>> 0, arg2 >>> 0, arg3 >>> 0);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_fromCodePoint_dc5c7088a4a4640d = function() { return handleError(function (arg0, arg1) {
        const ret = String.fromCodePoint(arg0 >>> 0, arg1 >>> 0);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_fromCodePoint_ef89154c4db48bdf = function() { return handleError(function (arg0) {
        const ret = String.fromCodePoint(arg0 >>> 0);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_fromCodePoint_f5d116d66b228005 = function() { return handleError(function (arg0, arg1, arg2, arg3, arg4) {
        const ret = String.fromCodePoint(arg0 >>> 0, arg1 >>> 0, arg2 >>> 0, arg3 >>> 0, arg4 >>> 0);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_fromEntries_a7f34d6a9ddd9a23 = function() { return handleError(function (arg0) {
        const ret = Object.fromEntries(arg0);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_from_d68eaa96dba25449 = function() { return logError(function (arg0) {
        const ret = Array.from(arg0);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_fround_8aaeeb5d6b355560 = function() { return logError(function (arg0) {
        const ret = Math.fround(arg0);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_getArg_b214e8970e5f67d8 = function() { return handleError(function (arg0, arg1, arg2) {
        const ret = arg0.getArg(arg1, arg2 >>> 0);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_getCanonicalLocales_1f611dd3f65ca19b = function() { return logError(function (arg0) {
        const ret = Intl.getCanonicalLocales(arg0);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_getDate_7ea54f5c410670ac = function() { return logError(function (arg0) {
        const ret = arg0.getDate();
        _assertNum(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_getDay_84c7566d22305e70 = function() { return logError(function (arg0) {
        const ret = arg0.getDay();
        _assertNum(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_getFloat32_473eebbef480efeb = function() { return logError(function (arg0, arg1, arg2) {
        const ret = arg0.getFloat32(arg1 >>> 0, arg2 !== 0);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_getFloat32_6dec4ede62bf646d = function() { return logError(function (arg0, arg1) {
        const ret = arg0.getFloat32(arg1 >>> 0);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_getFloat64_3abbd5c805d8b6e6 = function() { return logError(function (arg0, arg1, arg2) {
        const ret = arg0.getFloat64(arg1 >>> 0, arg2 !== 0);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_getFloat64_4d10be25428cb539 = function() { return logError(function (arg0, arg1) {
        const ret = arg0.getFloat64(arg1 >>> 0);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_getFullYear_bb5d1ec3aefe381a = function() { return logError(function (arg0) {
        const ret = arg0.getFullYear();
        _assertNum(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_getHours_bfa059f36a002838 = function() { return logError(function (arg0) {
        const ret = arg0.getHours();
        _assertNum(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_getInt16_2f629a94950b6059 = function() { return logError(function (arg0, arg1, arg2) {
        const ret = arg0.getInt16(arg1 >>> 0, arg2 !== 0);
        _assertNum(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_getInt16_9fb450fec5ce56e4 = function() { return logError(function (arg0, arg1) {
        const ret = arg0.getInt16(arg1 >>> 0);
        _assertNum(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_getInt32_498f641f61ebc369 = function() { return logError(function (arg0, arg1) {
        const ret = arg0.getInt32(arg1 >>> 0);
        _assertNum(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_getInt32_5bc62d3edf97bf0f = function() { return logError(function (arg0, arg1, arg2) {
        const ret = arg0.getInt32(arg1 >>> 0, arg2 !== 0);
        _assertNum(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_getInt8_35089840272d2400 = function() { return logError(function (arg0, arg1) {
        const ret = arg0.getInt8(arg1 >>> 0);
        _assertNum(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_getMilliseconds_07d7b30db02b6a1f = function() { return logError(function (arg0) {
        const ret = arg0.getMilliseconds();
        _assertNum(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_getMinutes_36d82439dcdd3f00 = function() { return logError(function (arg0) {
        const ret = arg0.getMinutes();
        _assertNum(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_getMonth_8111ad7c93ef82d4 = function() { return logError(function (arg0) {
        const ret = arg0.getMonth();
        _assertNum(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_getOwnPropertyDescriptor_c155b37cd6b4bfae = function() { return handleError(function (arg0, arg1) {
        const ret = Reflect.getOwnPropertyDescriptor(arg0, arg1);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_getOwnPropertyDescriptor_da0bd3d3d60cf5c1 = function() { return logError(function (arg0, arg1) {
        const ret = Object.getOwnPropertyDescriptor(arg0, arg1);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_getOwnPropertyDescriptors_f4fded28fbeb96bc = function() { return logError(function (arg0) {
        const ret = Object.getOwnPropertyDescriptors(arg0);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_getOwnPropertyNames_5c17ccda51948c6c = function() { return logError(function (arg0) {
        const ret = Object.getOwnPropertyNames(arg0);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_getOwnPropertySymbols_0e72848f9ed1e069 = function() { return logError(function (arg0) {
        const ret = Object.getOwnPropertySymbols(arg0);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_getPrototypeOf_331ddadec9037c44 = function() { return handleError(function (arg0) {
        const ret = Reflect.getPrototypeOf(arg0);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_getPrototypeOf_474a3d39e7803d66 = function() { return logError(function (arg0) {
        const ret = Object.getPrototypeOf(arg0);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_getSeconds_e7ee67ebf453317d = function() { return logError(function (arg0) {
        const ret = arg0.getSeconds();
        _assertNum(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_getTime_ab8b72009983c537 = function() { return logError(function (arg0) {
        const ret = arg0.getTime();
        return ret;
    }, arguments) };
    imports.wbg.__wbg_getTimezoneOffset_ec375e661c590c7a = function() { return logError(function (arg0) {
        const ret = arg0.getTimezoneOffset();
        return ret;
    }, arguments) };
    imports.wbg.__wbg_getUTCDate_a78e2f8eea091440 = function() { return logError(function (arg0) {
        const ret = arg0.getUTCDate();
        _assertNum(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_getUTCDay_c41539ede2824f99 = function() { return logError(function (arg0) {
        const ret = arg0.getUTCDay();
        _assertNum(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_getUTCFullYear_4363cc622b5c57bc = function() { return logError(function (arg0) {
        const ret = arg0.getUTCFullYear();
        _assertNum(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_getUTCHours_d0c5ba9f68b5c320 = function() { return logError(function (arg0) {
        const ret = arg0.getUTCHours();
        _assertNum(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_getUTCMilliseconds_c08acb2ee4edf5e0 = function() { return logError(function (arg0) {
        const ret = arg0.getUTCMilliseconds();
        _assertNum(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_getUTCMinutes_ccaf321be3b0b98e = function() { return logError(function (arg0) {
        const ret = arg0.getUTCMinutes();
        _assertNum(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_getUTCMonth_7906d3535a9032b8 = function() { return logError(function (arg0) {
        const ret = arg0.getUTCMonth();
        _assertNum(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_getUTCSeconds_55980bbe47ff7d2c = function() { return logError(function (arg0) {
        const ret = arg0.getUTCSeconds();
        _assertNum(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_getUint16_4461174eb1803f42 = function() { return logError(function (arg0, arg1, arg2) {
        const ret = arg0.getUint16(arg1 >>> 0, arg2 !== 0);
        _assertNum(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_getUint16_ef28b92e127f067f = function() { return logError(function (arg0, arg1) {
        const ret = arg0.getUint16(arg1 >>> 0);
        _assertNum(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_getUint32_b5c7dbdcffbf5182 = function() { return logError(function (arg0, arg1) {
        const ret = arg0.getUint32(arg1 >>> 0);
        _assertNum(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_getUint32_f468af749b8d409f = function() { return logError(function (arg0, arg1, arg2) {
        const ret = arg0.getUint32(arg1 >>> 0, arg2 !== 0);
        _assertNum(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_getUint8_c449e5db7b3fd20f = function() { return logError(function (arg0, arg1) {
        const ret = arg0.getUint8(arg1 >>> 0);
        _assertNum(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_get_1c2a14ac0113b438 = function() { return handleError(function (arg0, arg1) {
        const ret = Reflect.get(arg0, arg1);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_get_319f9e4e020e8bc7 = function() { return handleError(function (arg0, arg1) {
        const ret = Reflect.get(arg0, arg1 >>> 0);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_get_5933bdeb54f47bcc = function() { return handleError(function (arg0, arg1) {
        const ret = arg0.get(arg1 >>> 0);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_get_9aa3dff3f0266054 = function() { return logError(function (arg0, arg1) {
        const ret = arg0[arg1 >>> 0];
        return ret;
    }, arguments) };
    imports.wbg.__wbg_get_b455e870ddbf43ba = function() { return logError(function (arg0, arg1) {
        const ret = arg0.get(arg1);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_get_bbccf8970793c087 = function() { return handleError(function (arg0, arg1) {
        const ret = Reflect.get(arg0, arg1);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_get_d014896fa1fe7b87 = function() { return logError(function (arg0, arg1) {
        const ret = arg0.get(arg1);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_getindex_26733aea78acb768 = function() { return logError(function (arg0, arg1) {
        const ret = arg0[arg1 >>> 0];
        _assertNum(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_getindex_2edebdb0905818c3 = function() { return logError(function (arg0, arg1) {
        const ret = arg0[arg1 >>> 0];
        _assertNum(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_getindex_3e10541e51a81001 = function() { return logError(function (arg0, arg1) {
        const ret = arg0[arg1 >>> 0];
        _assertNum(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_getindex_512e15589b446c7f = function() { return logError(function (arg0, arg1) {
        const ret = arg0[arg1 >>> 0];
        _assertNum(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_getindex_5bdc89cd65d639f5 = function() { return logError(function (arg0, arg1) {
        const ret = arg0[arg1 >>> 0];
        _assertBigInt(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_getindex_68e125ea4d85a616 = function() { return logError(function (arg0, arg1) {
        const ret = arg0[arg1 >>> 0];
        _assertBigInt(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_getindex_88b2bccfad45a600 = function() { return logError(function (arg0, arg1) {
        const ret = arg0[arg1 >>> 0];
        return ret;
    }, arguments) };
    imports.wbg.__wbg_getindex_a84409715bbdd284 = function() { return logError(function (arg0, arg1) {
        const ret = arg0[arg1 >>> 0];
        _assertNum(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_getindex_c7b30540fc5cfacd = function() { return logError(function (arg0, arg1) {
        const ret = arg0[arg1 >>> 0];
        return ret;
    }, arguments) };
    imports.wbg.__wbg_getindex_e2e63a8e9ece3b98 = function() { return logError(function (arg0, arg1) {
        const ret = arg0[arg1 >>> 0];
        _assertNum(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_getindex_f4af783d88ebf2c3 = function() { return logError(function (arg0, arg1) {
        const ret = arg0[arg1 >>> 0];
        _assertNum(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_global_2ca8ffc30df23db7 = function() { return logError(function (arg0) {
        const ret = arg0.global;
        _assertBoolean(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_grow_731d8bd3567afbab = function() { return logError(function (arg0, arg1) {
        const ret = arg0.grow(arg1 >>> 0);
        _assertNum(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_grow_9d7024e33a1fc998 = function() { return handleError(function (arg0, arg1) {
        const ret = arg0.grow(arg1 >>> 0);
        _assertNum(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_hasInstance_c3d1cf79c1a332f4 = function() { return logError(function () {
        const ret = Symbol.hasInstance;
        return ret;
    }, arguments) };
    imports.wbg.__wbg_hasOwnProperty_1319c2aadd2ad695 = function() { return logError(function (arg0, arg1) {
        const ret = arg0.hasOwnProperty(arg1);
        _assertBoolean(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_hasOwn_c9a6b4e87eb51cfb = function() { return logError(function (arg0, arg1) {
        const ret = Object.hasOwn(arg0, arg1);
        _assertBoolean(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_has_3fa1c72267057967 = function() { return logError(function (arg0, arg1) {
        const ret = arg0.has(arg1);
        _assertBoolean(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_has_804af1de96dfed70 = function() { return logError(function (arg0, arg1) {
        const ret = arg0.has(arg1);
        _assertBoolean(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_has_94c2fc1d261bbfe9 = function() { return handleError(function (arg0, arg1) {
        const ret = Reflect.has(arg0, arg1);
        _assertBoolean(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_has_ae4b65f3e437237b = function() { return logError(function (arg0, arg1) {
        const ret = arg0.has(arg1);
        _assertBoolean(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_has_df88f4c6ed42471d = function() { return logError(function (arg0, arg1) {
        const ret = arg0.has(arg1);
        _assertBoolean(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_hypot_83d7b3605622b253 = function() { return logError(function (arg0, arg1) {
        const ret = Math.hypot(arg0, arg1);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_ignoreCase_799a594e52ced8b1 = function() { return logError(function (arg0) {
        const ret = arg0.ignoreCase;
        _assertBoolean(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_imports_c3f52125aa13f5ce = function() { return logError(function (arg0) {
        const ret = WebAssembly.Module.imports(arg0);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_imul_12048d31ab706bef = function() { return logError(function (arg0, arg1) {
        const ret = Math.imul(arg0, arg1);
        _assertNum(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_includes_48df4cb918d24687 = function() { return logError(function (arg0, arg1, arg2) {
        const ret = arg0.includes(arg1, arg2);
        _assertBoolean(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_includes_c8da2e33f7c03dea = function() { return logError(function (arg0, arg1, arg2, arg3) {
        const ret = arg0.includes(getStringFromWasm0(arg1, arg2), arg3);
        _assertBoolean(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_indexOf_8257e38d2c04f1b5 = function() { return logError(function (arg0, arg1, arg2, arg3) {
        const ret = arg0.indexOf(getStringFromWasm0(arg1, arg2), arg3);
        _assertNum(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_indexOf_b1b13db5c3c9e2fb = function() { return logError(function (arg0, arg1, arg2) {
        const ret = arg0.indexOf(arg1, arg2);
        _assertNum(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_input_037bf0fa2943d851 = function() { return logError(function () {
        const ret = RegExp.input;
        return ret;
    }, arguments) };
    imports.wbg.__wbg_instanceof_ArrayBuffer_670ddde44cdb2602 = function() { return logError(function (arg0) {
        let result;
        try {
            result = arg0 instanceof ArrayBuffer;
        } catch (_) {
            result = false;
        }
        const ret = result;
        _assertBoolean(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_instanceof_Array_7707ae9a3c3dd458 = function() { return logError(function (arg0) {
        let result;
        try {
            result = arg0 instanceof Array;
        } catch (_) {
            result = false;
        }
        const ret = result;
        _assertBoolean(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_instanceof_AsyncIterator_ba48944fce4fe264 = function() { return logError(function (arg0) {
        let result;
        try {
            result = arg0 instanceof AsyncIterator;
        } catch (_) {
            result = false;
        }
        const ret = result;
        _assertBoolean(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_instanceof_BigInt64Array_fd32fd85a947f10b = function() { return logError(function (arg0) {
        let result;
        try {
            result = arg0 instanceof BigInt64Array;
        } catch (_) {
            result = false;
        }
        const ret = result;
        _assertBoolean(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_instanceof_BigInt_10a060750e5780e0 = function() { return logError(function (arg0) {
        let result;
        try {
            result = arg0 instanceof BigInt;
        } catch (_) {
            result = false;
        }
        const ret = result;
        _assertBoolean(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_instanceof_BigUint64Array_a03cfd803d9c0346 = function() { return logError(function (arg0) {
        let result;
        try {
            result = arg0 instanceof BigUint64Array;
        } catch (_) {
            result = false;
        }
        const ret = result;
        _assertBoolean(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_instanceof_Boolean_7af23d4773b86b1a = function() { return logError(function (arg0) {
        let result;
        try {
            result = arg0 instanceof Boolean;
        } catch (_) {
            result = false;
        }
        const ret = result;
        _assertBoolean(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_instanceof_Collator_dc537ca3fea49cf8 = function() { return logError(function (arg0) {
        let result;
        try {
            result = arg0 instanceof Intl.Collator;
        } catch (_) {
            result = false;
        }
        const ret = result;
        _assertBoolean(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_instanceof_CompileError_c1f46e5571bfff3f = function() { return logError(function (arg0) {
        let result;
        try {
            result = arg0 instanceof WebAssembly.CompileError;
        } catch (_) {
            result = false;
        }
        const ret = result;
        _assertBoolean(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_instanceof_DataView_6498c553c1c4d172 = function() { return logError(function (arg0) {
        let result;
        try {
            result = arg0 instanceof DataView;
        } catch (_) {
            result = false;
        }
        const ret = result;
        _assertBoolean(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_instanceof_DateTimeFormat_dd63e4a528a5ea55 = function() { return logError(function (arg0) {
        let result;
        try {
            result = arg0 instanceof Intl.DateTimeFormat;
        } catch (_) {
            result = false;
        }
        const ret = result;
        _assertBoolean(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_instanceof_Date_ad6cbebbdda0f77a = function() { return logError(function (arg0) {
        let result;
        try {
            result = arg0 instanceof Date;
        } catch (_) {
            result = false;
        }
        const ret = result;
        _assertBoolean(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_instanceof_Error_2b29c5b4afac4e22 = function() { return logError(function (arg0) {
        let result;
        try {
            result = arg0 instanceof Error;
        } catch (_) {
            result = false;
        }
        const ret = result;
        _assertBoolean(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_instanceof_Error_7e91bccc17ccebea = function() { return logError(function (arg0) {
        let result;
        try {
            result = arg0 instanceof Error;
        } catch (_) {
            result = false;
        }
        const ret = result;
        _assertBoolean(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_instanceof_EvalError_ef63943041f9e8e4 = function() { return logError(function (arg0) {
        let result;
        try {
            result = arg0 instanceof EvalError;
        } catch (_) {
            result = false;
        }
        const ret = result;
        _assertBoolean(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_instanceof_Exception_219a9cb02e7af744 = function() { return logError(function (arg0) {
        let result;
        try {
            result = arg0 instanceof WebAssembly.Exception;
        } catch (_) {
            result = false;
        }
        const ret = result;
        _assertBoolean(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_instanceof_Float32Array_91cf4b6c7e00f09c = function() { return logError(function (arg0) {
        let result;
        try {
            result = arg0 instanceof Float32Array;
        } catch (_) {
            result = false;
        }
        const ret = result;
        _assertBoolean(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_instanceof_Float64Array_cdb50bc53f2f5ed3 = function() { return logError(function (arg0) {
        let result;
        try {
            result = arg0 instanceof Float64Array;
        } catch (_) {
            result = false;
        }
        const ret = result;
        _assertBoolean(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_instanceof_Function_6c3d8e3611ccdf21 = function() { return logError(function (arg0) {
        let result;
        try {
            result = arg0 instanceof Function;
        } catch (_) {
            result = false;
        }
        const ret = result;
        _assertBoolean(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_instanceof_Generator_dbf21062a2b79b11 = function() { return logError(function (arg0) {
        let result;
        try {
            result = arg0 instanceof Generator;
        } catch (_) {
            result = false;
        }
        const ret = result;
        _assertBoolean(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_instanceof_Global_61519a1939b52a30 = function() { return logError(function (arg0) {
        let result;
        try {
            result = arg0 instanceof WebAssembly.Global;
        } catch (_) {
            result = false;
        }
        const ret = result;
        _assertBoolean(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_instanceof_Global_7c9052f308e387ca = function() { return logError(function (arg0) {
        let result;
        try {
            result = arg0 instanceof Global;
        } catch (_) {
            result = false;
        }
        const ret = result;
        _assertBoolean(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_instanceof_Instance_46082d3fde7ec502 = function() { return logError(function (arg0) {
        let result;
        try {
            result = arg0 instanceof WebAssembly.Instance;
        } catch (_) {
            result = false;
        }
        const ret = result;
        _assertBoolean(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_instanceof_Int16Array_fc4fdc813bc69681 = function() { return logError(function (arg0) {
        let result;
        try {
            result = arg0 instanceof Int16Array;
        } catch (_) {
            result = false;
        }
        const ret = result;
        _assertBoolean(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_instanceof_Int32Array_69e84dc3fb152389 = function() { return logError(function (arg0) {
        let result;
        try {
            result = arg0 instanceof Int32Array;
        } catch (_) {
            result = false;
        }
        const ret = result;
        _assertBoolean(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_instanceof_Int8Array_c6d2c4c78bdc718a = function() { return logError(function (arg0) {
        let result;
        try {
            result = arg0 instanceof Int8Array;
        } catch (_) {
            result = false;
        }
        const ret = result;
        _assertBoolean(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_instanceof_IteratorNext_d8cf4195332836be = function() { return logError(function (arg0) {
        let result;
        try {
            result = arg0 instanceof IteratorNext;
        } catch (_) {
            result = false;
        }
        const ret = result;
        _assertBoolean(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_instanceof_Iterator_4e94406a05ea7005 = function() { return logError(function (arg0) {
        let result;
        try {
            result = arg0 instanceof Iterator;
        } catch (_) {
            result = false;
        }
        const ret = result;
        _assertBoolean(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_instanceof_JsString_936325102ca5018d = function() { return logError(function (arg0) {
        let result;
        try {
            result = arg0 instanceof String;
        } catch (_) {
            result = false;
        }
        const ret = result;
        _assertBoolean(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_instanceof_LinkError_8d784e169cc151f8 = function() { return logError(function (arg0) {
        let result;
        try {
            result = arg0 instanceof WebAssembly.LinkError;
        } catch (_) {
            result = false;
        }
        const ret = result;
        _assertBoolean(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_instanceof_Map_98ecb30afec5acdb = function() { return logError(function (arg0) {
        let result;
        try {
            result = arg0 instanceof Map;
        } catch (_) {
            result = false;
        }
        const ret = result;
        _assertBoolean(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_instanceof_MaybeIterator_1e623a1ab569f8bd = function() { return logError(function (arg0) {
        let result;
        try {
            result = arg0 instanceof MaybeIterator;
        } catch (_) {
            result = false;
        }
        const ret = result;
        _assertBoolean(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_instanceof_Memory_26dac6caf8b9bbf1 = function() { return logError(function (arg0) {
        let result;
        try {
            result = arg0 instanceof WebAssembly.Memory;
        } catch (_) {
            result = false;
        }
        const ret = result;
        _assertBoolean(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_instanceof_Module_d71588bb9eeb2028 = function() { return logError(function (arg0) {
        let result;
        try {
            result = arg0 instanceof WebAssembly.Module;
        } catch (_) {
            result = false;
        }
        const ret = result;
        _assertBoolean(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_instanceof_NumberFormat_504fa83a5b8f4b95 = function() { return logError(function (arg0) {
        let result;
        try {
            result = arg0 instanceof Intl.NumberFormat;
        } catch (_) {
            result = false;
        }
        const ret = result;
        _assertBoolean(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_instanceof_Number_3fc8755a4f7afe92 = function() { return logError(function (arg0) {
        let result;
        try {
            result = arg0 instanceof Number;
        } catch (_) {
            result = false;
        }
        const ret = result;
        _assertBoolean(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_instanceof_Object_0d0cec232ff037c4 = function() { return logError(function (arg0) {
        let result;
        try {
            result = arg0 instanceof Object;
        } catch (_) {
            result = false;
        }
        const ret = result;
        _assertBoolean(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_instanceof_PluralRules_9b768aa61e590833 = function() { return logError(function (arg0) {
        let result;
        try {
            result = arg0 instanceof Intl.PluralRules;
        } catch (_) {
            result = false;
        }
        const ret = result;
        _assertBoolean(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_instanceof_Promise_0aa3a90cfe6672c9 = function() { return logError(function (arg0) {
        let result;
        try {
            result = arg0 instanceof Promise;
        } catch (_) {
            result = false;
        }
        const ret = result;
        _assertBoolean(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_instanceof_Proxy_5df210c8f162ca78 = function() { return logError(function (arg0) {
        let result;
        try {
            result = arg0 instanceof Proxy;
        } catch (_) {
            result = false;
        }
        const ret = result;
        _assertBoolean(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_instanceof_RangeError_83068fc6aa53fb0d = function() { return logError(function (arg0) {
        let result;
        try {
            result = arg0 instanceof RangeError;
        } catch (_) {
            result = false;
        }
        const ret = result;
        _assertBoolean(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_instanceof_ReferenceError_a34566a0b4e9f3b5 = function() { return logError(function (arg0) {
        let result;
        try {
            result = arg0 instanceof ReferenceError;
        } catch (_) {
            result = false;
        }
        const ret = result;
        _assertBoolean(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_instanceof_RegExp_9b35b1e40bbea814 = function() { return logError(function (arg0) {
        let result;
        try {
            result = arg0 instanceof RegExp;
        } catch (_) {
            result = false;
        }
        const ret = result;
        _assertBoolean(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_instanceof_RelativeTimeFormat_d324458f4526becd = function() { return logError(function (arg0) {
        let result;
        try {
            result = arg0 instanceof Intl.RelativeTimeFormat;
        } catch (_) {
            result = false;
        }
        const ret = result;
        _assertBoolean(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_instanceof_RuntimeError_915da6f71bb0d6e7 = function() { return logError(function (arg0) {
        let result;
        try {
            result = arg0 instanceof WebAssembly.RuntimeError;
        } catch (_) {
            result = false;
        }
        const ret = result;
        _assertBoolean(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_instanceof_Set_8848a8d95fcc4a29 = function() { return logError(function (arg0) {
        let result;
        try {
            result = arg0 instanceof Set;
        } catch (_) {
            result = false;
        }
        const ret = result;
        _assertBoolean(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_instanceof_SharedArrayBuffer_8b668d71ffddfdc3 = function() { return logError(function (arg0) {
        let result;
        try {
            result = arg0 instanceof SharedArrayBuffer;
        } catch (_) {
            result = false;
        }
        const ret = result;
        _assertBoolean(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_instanceof_Symbol_2b252dc4db495abf = function() { return logError(function (arg0) {
        let result;
        try {
            result = arg0 instanceof Symbol;
        } catch (_) {
            result = false;
        }
        const ret = result;
        _assertBoolean(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_instanceof_SyntaxError_f76cb8ae099d0f83 = function() { return logError(function (arg0) {
        let result;
        try {
            result = arg0 instanceof SyntaxError;
        } catch (_) {
            result = false;
        }
        const ret = result;
        _assertBoolean(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_instanceof_Table_46eb8a45ca3a827b = function() { return logError(function (arg0) {
        let result;
        try {
            result = arg0 instanceof WebAssembly.Table;
        } catch (_) {
            result = false;
        }
        const ret = result;
        _assertBoolean(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_instanceof_Tag_006d524225f554c2 = function() { return logError(function (arg0) {
        let result;
        try {
            result = arg0 instanceof WebAssembly.Tag;
        } catch (_) {
            result = false;
        }
        const ret = result;
        _assertBoolean(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_instanceof_TypeError_cbba6ac46ad5e2bb = function() { return logError(function (arg0) {
        let result;
        try {
            result = arg0 instanceof TypeError;
        } catch (_) {
            result = false;
        }
        const ret = result;
        _assertBoolean(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_instanceof_Uint16Array_acb683ac2888f3f2 = function() { return logError(function (arg0) {
        let result;
        try {
            result = arg0 instanceof Uint16Array;
        } catch (_) {
            result = false;
        }
        const ret = result;
        _assertBoolean(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_instanceof_Uint32Array_a07423dc9e049352 = function() { return logError(function (arg0) {
        let result;
        try {
            result = arg0 instanceof Uint32Array;
        } catch (_) {
            result = false;
        }
        const ret = result;
        _assertBoolean(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_instanceof_Uint8Array_28af5bc19d6acad8 = function() { return logError(function (arg0) {
        let result;
        try {
            result = arg0 instanceof Uint8Array;
        } catch (_) {
            result = false;
        }
        const ret = result;
        _assertBoolean(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_instanceof_Uint8ClampedArray_081f2c471944d7ad = function() { return logError(function (arg0) {
        let result;
        try {
            result = arg0 instanceof Uint8ClampedArray;
        } catch (_) {
            result = false;
        }
        const ret = result;
        _assertBoolean(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_instanceof_UriError_08d5e0e5f3a3a200 = function() { return logError(function (arg0) {
        let result;
        try {
            result = arg0 instanceof URIError;
        } catch (_) {
            result = false;
        }
        const ret = result;
        _assertBoolean(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_instanceof_WeakMap_af453ac047237e7d = function() { return logError(function (arg0) {
        let result;
        try {
            result = arg0 instanceof WeakMap;
        } catch (_) {
            result = false;
        }
        const ret = result;
        _assertBoolean(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_instanceof_WeakSet_a60304fe197b77fe = function() { return logError(function (arg0) {
        let result;
        try {
            result = arg0 instanceof WeakSet;
        } catch (_) {
            result = false;
        }
        const ret = result;
        _assertBoolean(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_instantiateStreaming_5ce726dc85071888 = function() { return logError(function (arg0, arg1) {
        const ret = WebAssembly.instantiateStreaming(arg0, arg1);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_instantiate_617147c2c3082d3b = function() { return logError(function (arg0, arg1) {
        const ret = WebAssembly.instantiate(arg0, arg1);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_instantiate_abfeca5a4651ef6f = function() { return logError(function (arg0, arg1, arg2) {
        const ret = WebAssembly.instantiate(getArrayU8FromWasm0(arg0, arg1), arg2);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_isArray_1ba11a930108ec51 = function() { return logError(function (arg0) {
        const ret = Array.isArray(arg0);
        _assertBoolean(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_isConcatSpreadable_601716f39f13e4e1 = function() { return logError(function () {
        const ret = Symbol.isConcatSpreadable;
        return ret;
    }, arguments) };
    imports.wbg.__wbg_isExtensible_2708ec42e3d3275e = function() { return handleError(function (arg0) {
        const ret = Reflect.isExtensible(arg0);
        _assertBoolean(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_isExtensible_2e24e79324c015fa = function() { return logError(function (arg0) {
        const ret = Object.isExtensible(arg0);
        _assertBoolean(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_isFinite_ccf507d21ee4e382 = function() { return logError(function (arg0) {
        const ret = Number.isFinite(arg0);
        _assertBoolean(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_isFinite_f7580c32705b985f = function() { return logError(function (arg0) {
        const ret = isFinite(arg0);
        _assertBoolean(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_isFrozen_e37479ecce925a1d = function() { return logError(function (arg0) {
        const ret = Object.isFrozen(arg0);
        _assertBoolean(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_isInteger_6390ac6504696c57 = function() { return logError(function (arg0) {
        const ret = Number.isInteger(arg0);
        _assertBoolean(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_isLockFree_83135688db203e13 = function() { return logError(function (arg0) {
        const ret = Atomics.isLockFree(arg0 >>> 0);
        _assertBoolean(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_isNaN_2001f766feab4f55 = function() { return logError(function (arg0) {
        const ret = Number.isNaN(arg0);
        _assertBoolean(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_isPrototypeOf_0a9707e686ef9f46 = function() { return logError(function (arg0, arg1) {
        const ret = arg0.isPrototypeOf(arg1);
        _assertBoolean(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_isSafeInteger_12f5549b2fca23f4 = function() { return logError(function (arg0) {
        const ret = Number.isSafeInteger(arg0);
        _assertBoolean(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_isSealed_fe1dee9ab6b5e59b = function() { return logError(function (arg0) {
        const ret = Object.isSealed(arg0);
        _assertBoolean(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_isView_3c5f9b758b49900f = function() { return logError(function (arg0) {
        const ret = ArrayBuffer.isView(arg0);
        _assertBoolean(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_is_e442492d1fb7967b = function() { return logError(function (arg0, arg1) {
        const ret = Object.is(arg0, arg1);
        _assertBoolean(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_is_e7776fd6ef19745f = function() { return logError(function (arg0, arg1) {
        const ret = arg0.is(arg1);
        _assertBoolean(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_iterator_23604bb983791576 = function() { return logError(function () {
        const ret = Symbol.iterator;
        return ret;
    }, arguments) };
    imports.wbg.__wbg_join_ed6ba7f4934c2d71 = function() { return logError(function (arg0, arg1, arg2) {
        const ret = arg0.join(getStringFromWasm0(arg1, arg2));
        return ret;
    }, arguments) };
    imports.wbg.__wbg_keyFor_4c80242b8b5581ce = function() { return logError(function (arg0) {
        const ret = Symbol.keyFor(arg0);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_keys_1a963e59f55e0a0a = function() { return logError(function (arg0) {
        const ret = arg0.keys();
        return ret;
    }, arguments) };
    imports.wbg.__wbg_keys_3c7ab5ef509026f8 = function() { return logError(function (arg0) {
        const ret = arg0.keys();
        return ret;
    }, arguments) };
    imports.wbg.__wbg_keys_72f37a5ac8f4f568 = function() { return logError(function (arg0) {
        const ret = Object.keys(arg0);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_keys_b13a05e6691259e8 = function() { return logError(function (arg0) {
        const ret = arg0.keys();
        return ret;
    }, arguments) };
    imports.wbg.__wbg_lastIndexOf_715a6d2ba7818646 = function() { return logError(function (arg0, arg1, arg2) {
        const ret = arg0.lastIndexOf(arg1, arg2);
        _assertNum(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_lastIndexOf_db1181c9eec8d210 = function() { return logError(function (arg0, arg1, arg2, arg3) {
        const ret = arg0.lastIndexOf(getStringFromWasm0(arg1, arg2), arg3);
        _assertNum(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_lastMatch_c9e5500a7e02890a = function() { return logError(function () {
        const ret = RegExp.lastMatch;
        return ret;
    }, arguments) };
    imports.wbg.__wbg_lastParen_0c1b1639e6477bf8 = function() { return logError(function () {
        const ret = RegExp.lastParen;
        return ret;
    }, arguments) };
    imports.wbg.__wbg_lastindex_126ed27fa6293f95 = function() { return logError(function (arg0) {
        const ret = arg0.lastIndex;
        _assertNum(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_leftContext_383b1f466ebace3d = function() { return logError(function () {
        const ret = RegExp.leftContext;
        return ret;
    }, arguments) };
    imports.wbg.__wbg_length_00ffe0e6cf3edf61 = function() { return logError(function (arg0) {
        const ret = arg0.length;
        _assertNum(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_length_109fc2552bd44dc0 = function() { return logError(function (arg0) {
        const ret = arg0.length;
        _assertNum(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_length_15aa023b16db5413 = function() { return logError(function (arg0) {
        const ret = arg0.length;
        _assertNum(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_length_305f63bde974e7c9 = function() { return logError(function (arg0) {
        const ret = arg0.length;
        _assertNum(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_length_3397118a11363a1f = function() { return logError(function (arg0) {
        const ret = arg0.length;
        _assertNum(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_length_35d81ce42ac7efa9 = function() { return logError(function (arg0) {
        const ret = arg0.length;
        _assertNum(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_length_54489bf36cde819b = function() { return logError(function (arg0) {
        const ret = arg0.length;
        _assertNum(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_length_65d1cd11729ced11 = function() { return logError(function (arg0) {
        const ret = arg0.length;
        _assertNum(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_length_6c8fd4bc685c1c1a = function() { return logError(function (arg0) {
        const ret = arg0.length;
        _assertNum(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_length_81a294bd2038fd26 = function() { return logError(function (arg0) {
        const ret = arg0.length;
        _assertNum(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_length_8547c96d59fa2e14 = function() { return logError(function (arg0) {
        const ret = arg0.length;
        _assertNum(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_length_9d7c41656543fe86 = function() { return logError(function (arg0) {
        const ret = arg0.length;
        _assertNum(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_length_b290f9b69f74148d = function() { return logError(function (arg0) {
        const ret = arg0.length;
        _assertNum(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_length_d65cf0786bfc5739 = function() { return logError(function (arg0) {
        const ret = arg0.length;
        _assertNum(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_length_f4d79409aa324811 = function() { return logError(function (arg0) {
        const ret = arg0.length;
        _assertNum(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_load_2ea24fdb3efe0488 = function() { return handleError(function (arg0, arg1) {
        const ret = Atomics.load(arg0, arg1);
        _assertBigInt(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_load_5c97e462656ea84f = function() { return handleError(function (arg0, arg1) {
        const ret = Atomics.load(arg0, arg1 >>> 0);
        _assertNum(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_localeCompare_493c1053499175ed = function() { return logError(function (arg0, arg1, arg2, arg3, arg4) {
        const ret = arg0.localeCompare(getStringFromWasm0(arg1, arg2), arg3, arg4);
        _assertNum(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_log10_f7616dbb8a819261 = function() { return logError(function (arg0) {
        const ret = Math.log10(arg0);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_log1p_472fae66c2d3dab8 = function() { return logError(function (arg0) {
        const ret = Math.log1p(arg0);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_log2_414995ee0c0e5cf8 = function() { return logError(function (arg0) {
        const ret = Math.log2(arg0);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_log_4d657f4f7e9b9b95 = function() { return logError(function (arg0, arg1) {
        console.log(getStringFromWasm0(arg0, arg1));
    }, arguments) };
    imports.wbg.__wbg_log_b8f0c395ba33f377 = function() { return logError(function (arg0) {
        const ret = Math.log(arg0);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_map_4b1a3a4e20a4c088 = function() { return logError(function (arg0, arg1, arg2) {
        try {
            var state0 = {a: arg1, b: arg2};
            var cb0 = (arg0, arg1, arg2) => {
                const a = state0.a;
                state0.a = 0;
                try {
                    return __wbg_adapter_159(a, state0.b, arg0, arg1, arg2);
                } finally {
                    state0.a = a;
                }
            };
            const ret = arg0.map(cb0);
            return ret;
        } finally {
            state0.a = state0.b = 0;
        }
    }, arguments) };
    imports.wbg.__wbg_matchAll_45ebceb789fb470e = function() { return logError(function (arg0, arg1) {
        const ret = arg0.matchAll(arg1);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_match_08c52123d17af52f = function() { return logError(function (arg0, arg1) {
        const ret = arg0.match(arg1);
        return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
    }, arguments) };
    imports.wbg.__wbg_match_a1ad8cd100df0b47 = function() { return logError(function () {
        const ret = Symbol.match;
        return ret;
    }, arguments) };
    imports.wbg.__wbg_max_3dbd0a7acda55cdb = function() { return logError(function (arg0, arg1) {
        const ret = Math.max(arg0, arg1);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_message_7bde112094278773 = function() { return logError(function (arg0) {
        const ret = arg0.message;
        return ret;
    }, arguments) };
    imports.wbg.__wbg_min_f29fdacea1de00b6 = function() { return logError(function (arg0, arg1) {
        const ret = Math.min(arg0, arg1);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_multiline_9ddcc5b9f641bfc2 = function() { return logError(function (arg0) {
        const ret = arg0.multiline;
        _assertBoolean(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_name_655efe467bd1c31e = function() { return logError(function (arg0) {
        const ret = arg0.name;
        return ret;
    }, arguments) };
    imports.wbg.__wbg_name_ae6b09babb81aa7d = function() { return logError(function (arg0) {
        const ret = arg0.name;
        return ret;
    }, arguments) };
    imports.wbg.__wbg_new0_55477545727914d9 = function() { return logError(function () {
        const ret = new Date();
        return ret;
    }, arguments) };
    imports.wbg.__wbg_new_07e67105850d6032 = function() { return logError(function (arg0) {
        const ret = new Uint16Array(arg0);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_new_089ada1cfcbe5bae = function() { return logError(function (arg0, arg1) {
        const ret = new Proxy(arg0, arg1);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_new_0ce9e1814c4eb5c2 = function() { return logError(function (arg0, arg1) {
        const ret = new WebAssembly.RuntimeError(getStringFromWasm0(arg0, arg1));
        return ret;
    }, arguments) };
    imports.wbg.__wbg_new_0f1bd659dcd47068 = function() { return logError(function (arg0) {
        const ret = new Set(arg0);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_new_12ca3cba6812a90d = function() { return handleError(function (arg0, arg1) {
        const ret = new WebAssembly.Global(arg0, arg1);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_new_1793d95979faac5f = function() { return logError(function (arg0, arg1) {
        const ret = new Intl.NumberFormat(arg0, arg1);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_new_1e600113440fba0a = function() { return logError(function () {
        const ret = new WeakSet();
        return ret;
    }, arguments) };
    imports.wbg.__wbg_new_1f40b66115057848 = function() { return logError(function (arg0, arg1) {
        const ret = new SyntaxError(getStringFromWasm0(arg0, arg1));
        return ret;
    }, arguments) };
    imports.wbg.__wbg_new_254fa9eac11932ae = function() { return logError(function () {
        const ret = new Array();
        return ret;
    }, arguments) };
    imports.wbg.__wbg_new_2c70e0196628397d = function() { return logError(function (arg0) {
        const ret = new SharedArrayBuffer(arg0 >>> 0);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_new_31cb5207e607864d = function() { return logError(function (arg0) {
        const ret = new Int32Array(arg0);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_new_37eac52f406c308d = function() { return logError(function (arg0, arg1, arg2, arg3) {
        const ret = new RegExp(getStringFromWasm0(arg0, arg1), getStringFromWasm0(arg2, arg3));
        return ret;
    }, arguments) };
    imports.wbg.__wbg_new_3ce090495a9cf3a8 = function() { return logError(function (arg0) {
        const ret = new Int8Array(arg0);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_new_3d446df9155128ef = function() { return logError(function (arg0, arg1) {
        try {
            var state0 = {a: arg0, b: arg1};
            var cb0 = (arg0, arg1) => {
                const a = state0.a;
                state0.a = 0;
                try {
                    return __wbg_adapter_940(a, state0.b, arg0, arg1);
                } finally {
                    state0.a = a;
                }
            };
            const ret = new Promise(cb0);
            return ret;
        } finally {
            state0.a = state0.b = 0;
        }
    }, arguments) };
    imports.wbg.__wbg_new_3ff5b33b1ce712df = function() { return logError(function (arg0) {
        const ret = new Uint8Array(arg0);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_new_41257536af60ed14 = function() { return logError(function (arg0) {
        const ret = new Date(arg0);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_new_49adb03935ad0d08 = function() { return handleError(function (arg0) {
        const ret = new WebAssembly.Table(arg0);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_new_5208c181cee8c940 = function() { return logError(function (arg0) {
        const ret = new ArrayBuffer(arg0 >>> 0);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_new_535fe65c1682d823 = function() { return logError(function (arg0, arg1) {
        const ret = new WebAssembly.CompileError(getStringFromWasm0(arg0, arg1));
        return ret;
    }, arguments) };
    imports.wbg.__wbg_new_53bffd7a56b12513 = function() { return logError(function (arg0, arg1) {
        const ret = new RangeError(getStringFromWasm0(arg0, arg1));
        return ret;
    }, arguments) };
    imports.wbg.__wbg_new_601f0146fb815681 = function() { return logError(function (arg0, arg1) {
        const ret = new Intl.DateTimeFormat(arg0, arg1);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_new_6345e64e36c253c5 = function() { return logError(function (arg0) {
        const ret = new Float64Array(arg0);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_new_65af22e054570c78 = function() { return logError(function () {
        const ret = new WeakMap();
        return ret;
    }, arguments) };
    imports.wbg.__wbg_new_6799ef630abee97c = function() { return logError(function (arg0, arg1) {
        const ret = new Error(getStringFromWasm0(arg0, arg1));
        return ret;
    }, arguments) };
    imports.wbg.__wbg_new_688846f374351c92 = function() { return logError(function () {
        const ret = new Object();
        return ret;
    }, arguments) };
    imports.wbg.__wbg_new_6d1effa695f4d0af = function() { return logError(function (arg0) {
        const ret = new BigUint64Array(arg0);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_new_7729773fb4887e87 = function() { return logError(function (arg0, arg1) {
        const ret = new Intl.Collator(arg0, arg1);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_new_7b12e9c2c5e06ecc = function() { return logError(function (arg0, arg1) {
        const ret = new WebAssembly.LinkError(getStringFromWasm0(arg0, arg1));
        return ret;
    }, arguments) };
    imports.wbg.__wbg_new_803172d71ba4127d = function() { return handleError(function (arg0) {
        const ret = new WebAssembly.Module(arg0);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_new_8335b3b33fdfee42 = function() { return handleError(function (arg0, arg1) {
        const ret = new WebAssembly.Instance(arg0, arg1);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_new_8a6f238a6ece86ea = function() { return logError(function () {
        const ret = new Error();
        return ret;
    }, arguments) };
    imports.wbg.__wbg_new_8d5fe79a74782290 = function() { return logError(function (arg0, arg1) {
        const ret = new EvalError(getStringFromWasm0(arg0, arg1));
        return ret;
    }, arguments) };
    imports.wbg.__wbg_new_9451f3dcb42e0e37 = function() { return logError(function (arg0) {
        const ret = new Uint8ClampedArray(arg0);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_new_a75f2babfa27c8a3 = function() { return logError(function (arg0, arg1, arg2) {
        const ret = new DataView(arg0, arg1 >>> 0, arg2 >>> 0);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_new_ae21c746e3f933ec = function() { return logError(function (arg0, arg1) {
        const ret = new Intl.PluralRules(arg0, arg1);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_new_b20abc97af0b01e6 = function() { return handleError(function (arg0, arg1) {
        const ret = new WebAssembly.Exception(arg0, arg1);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_new_b432087973c937b6 = function() { return logError(function (arg0, arg1) {
        const ret = new ReferenceError(getStringFromWasm0(arg0, arg1));
        return ret;
    }, arguments) };
    imports.wbg.__wbg_new_b9ea1588c9985b80 = function() { return logError(function (arg0) {
        const ret = new Float32Array(arg0);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_new_bc96c6a1c0786643 = function() { return logError(function () {
        const ret = new Map();
        return ret;
    }, arguments) };
    imports.wbg.__wbg_new_c5bf1750c6f470d5 = function() { return logError(function (arg0) {
        const ret = new Int16Array(arg0);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_new_d4c1d58a987433cf = function() { return logError(function (arg0) {
        const ret = new Number(arg0);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_new_d642182e8d70fdcc = function() { return logError(function (arg0, arg1) {
        const ret = new Intl.RelativeTimeFormat(arg0, arg1);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_new_d6814bbc80182d73 = function() { return logError(function (arg0) {
        const ret = new Uint32Array(arg0);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_new_dc0ef64e01778de4 = function() { return logError(function (arg0, arg1) {
        const ret = new URIError(getStringFromWasm0(arg0, arg1));
        return ret;
    }, arguments) };
    imports.wbg.__wbg_new_e04dcd3aad5daca2 = function() { return handleError(function (arg0) {
        const ret = new WebAssembly.Memory(arg0);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_new_e3ec286a573ac2ad = function() { return logError(function (arg0) {
        const ret = new Boolean(arg0);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_new_e5ca8d568d8e30cf = function() { return logError(function (arg0, arg1) {
        const ret = new TypeError(getStringFromWasm0(arg0, arg1));
        return ret;
    }, arguments) };
    imports.wbg.__wbg_new_f2f457709fadb8a5 = function() { return logError(function (arg0) {
        const ret = new BigInt64Array(arg0);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_new_fb8ecffd6edbc8e3 = function() { return handleError(function (arg0) {
        const ret = new WebAssembly.Tag(arg0);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_newfromstr_e8557c3f6153b996 = function() { return logError(function (arg0, arg1) {
        const ret = new Number(getStringFromWasm0(arg0, arg1));
        return ret;
    }, arguments) };
    imports.wbg.__wbg_newnoargs_fd9e4bf8be2bc16d = function() { return logError(function (arg0, arg1) {
        const ret = new Function(getStringFromWasm0(arg0, arg1));
        return ret;
    }, arguments) };
    imports.wbg.__wbg_newregexp_0b259f11d3f00337 = function() { return logError(function (arg0, arg1, arg2) {
        const ret = new RegExp(arg0, getStringFromWasm0(arg1, arg2));
        return ret;
    }, arguments) };
    imports.wbg.__wbg_newwithargs_308e846d06f33aa0 = function() { return logError(function (arg0, arg1, arg2, arg3) {
        const ret = new Function(getStringFromWasm0(arg0, arg1), getStringFromWasm0(arg2, arg3));
        return ret;
    }, arguments) };
    imports.wbg.__wbg_newwithbyteoffset_01e9ce39704f7b94 = function() { return logError(function (arg0, arg1) {
        const ret = new Uint16Array(arg0, arg1 >>> 0);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_newwithbyteoffset_1c083e731bca612b = function() { return logError(function (arg0, arg1) {
        const ret = new Int16Array(arg0, arg1 >>> 0);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_newwithbyteoffset_1f57c418ce334b6d = function() { return logError(function (arg0, arg1) {
        const ret = new Int8Array(arg0, arg1 >>> 0);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_newwithbyteoffset_2d7250d069fd5082 = function() { return logError(function (arg0, arg1) {
        const ret = new BigInt64Array(arg0, arg1 >>> 0);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_newwithbyteoffset_77df312fc86b3ff4 = function() { return logError(function (arg0, arg1) {
        const ret = new Uint32Array(arg0, arg1 >>> 0);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_newwithbyteoffset_8e9db7ece112bcf1 = function() { return logError(function (arg0, arg1) {
        const ret = new Float32Array(arg0, arg1 >>> 0);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_newwithbyteoffset_b75194a025acee53 = function() { return logError(function (arg0, arg1) {
        const ret = new Float64Array(arg0, arg1 >>> 0);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_newwithbyteoffset_ba78ab767425668d = function() { return logError(function (arg0, arg1) {
        const ret = new BigUint64Array(arg0, arg1 >>> 0);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_newwithbyteoffset_be3219fbee9bf05b = function() { return logError(function (arg0, arg1) {
        const ret = new Int32Array(arg0, arg1 >>> 0);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_newwithbyteoffset_c4ba798a480e64d6 = function() { return logError(function (arg0, arg1) {
        const ret = new Uint8Array(arg0, arg1 >>> 0);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_newwithbyteoffset_d5e11c49130ddc49 = function() { return logError(function (arg0, arg1) {
        const ret = new Uint8ClampedArray(arg0, arg1 >>> 0);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_newwithbyteoffsetandlength_11300648888c0ebb = function() { return logError(function (arg0, arg1, arg2) {
        const ret = new Float64Array(arg0, arg1 >>> 0, arg2 >>> 0);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_newwithbyteoffsetandlength_4b01f207bed23fc0 = function() { return logError(function (arg0, arg1, arg2) {
        const ret = new Int8Array(arg0, arg1 >>> 0, arg2 >>> 0);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_newwithbyteoffsetandlength_5910bdf845a168eb = function() { return logError(function (arg0, arg1, arg2) {
        const ret = new Uint32Array(arg0, arg1 >>> 0, arg2 >>> 0);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_newwithbyteoffsetandlength_6991ab0478cc4a43 = function() { return logError(function (arg0, arg1, arg2) {
        const ret = new Int32Array(arg0, arg1 >>> 0, arg2 >>> 0);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_newwithbyteoffsetandlength_69ec77b20853ae02 = function() { return logError(function (arg0, arg1, arg2) {
        const ret = new Uint16Array(arg0, arg1 >>> 0, arg2 >>> 0);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_newwithbyteoffsetandlength_acc93b81187af1b9 = function() { return logError(function (arg0, arg1, arg2) {
        const ret = new BigInt64Array(arg0, arg1 >>> 0, arg2 >>> 0);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_newwithbyteoffsetandlength_b0192e1adfca2df1 = function() { return logError(function (arg0, arg1, arg2) {
        const ret = new Int16Array(arg0, arg1 >>> 0, arg2 >>> 0);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_newwithbyteoffsetandlength_ba35896968751d91 = function() { return logError(function (arg0, arg1, arg2) {
        const ret = new Uint8Array(arg0, arg1 >>> 0, arg2 >>> 0);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_newwithbyteoffsetandlength_c0c90653f73c7dfb = function() { return logError(function (arg0, arg1, arg2) {
        const ret = new Uint8ClampedArray(arg0, arg1 >>> 0, arg2 >>> 0);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_newwithbyteoffsetandlength_f103ea547800738d = function() { return logError(function (arg0, arg1, arg2) {
        const ret = new BigUint64Array(arg0, arg1 >>> 0, arg2 >>> 0);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_newwithbyteoffsetandlength_f113a96374814bb2 = function() { return logError(function (arg0, arg1, arg2) {
        const ret = new Float32Array(arg0, arg1 >>> 0, arg2 >>> 0);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_newwithlength_1761a9eb039ca429 = function() { return logError(function (arg0) {
        const ret = new Uint32Array(arg0 >>> 0);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_newwithlength_19f5e809bc9fd166 = function() { return logError(function (arg0) {
        const ret = new Uint16Array(arg0 >>> 0);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_newwithlength_2aede0ef4e6e97ec = function() { return logError(function (arg0) {
        const ret = new Uint8ClampedArray(arg0 >>> 0);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_newwithlength_302783933c1f5aae = function() { return logError(function (arg0) {
        const ret = new Int16Array(arg0 >>> 0);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_newwithlength_34ce8f1051e74449 = function() { return logError(function (arg0) {
        const ret = new Uint8Array(arg0 >>> 0);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_newwithlength_3c5ee302c8806aab = function() { return logError(function (arg0) {
        const ret = new BigInt64Array(arg0 >>> 0);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_newwithlength_3ce496541bbf1c9f = function() { return logError(function (arg0) {
        const ret = new Int32Array(arg0 >>> 0);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_newwithlength_4a278c60a7e05f2a = function() { return logError(function (arg0) {
        const ret = new Float64Array(arg0 >>> 0);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_newwithlength_759c7b9d6a7a314f = function() { return logError(function (arg0) {
        const ret = new Array(arg0 >>> 0);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_newwithlength_a1a400669bde3c6f = function() { return logError(function (arg0) {
        const ret = new Int8Array(arg0 >>> 0);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_newwithlength_ea1b5442c1178c4c = function() { return logError(function (arg0) {
        const ret = new BigUint64Array(arg0 >>> 0);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_newwithlength_ed665315b76ec334 = function() { return logError(function (arg0) {
        const ret = new Float32Array(arg0 >>> 0);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_newwithoptions_13c7463459d1340b = function() { return handleError(function (arg0, arg1, arg2) {
        const ret = new WebAssembly.Exception(arg0, arg1, arg2);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_newwithoptions_a5e7981b58b527a3 = function() { return logError(function (arg0, arg1, arg2) {
        const ret = new Error(getStringFromWasm0(arg0, arg1), arg2);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_newwithsharedarraybuffer_cc9da3fa130d1809 = function() { return logError(function (arg0, arg1, arg2) {
        const ret = new DataView(arg0, arg1 >>> 0, arg2 >>> 0);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_newwithyearmonth_930fda2c715d964d = function() { return logError(function (arg0, arg1) {
        const ret = new Date(arg0 >>> 0, arg1);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_newwithyearmonthday_37adec2192673aab = function() { return logError(function (arg0, arg1, arg2) {
        const ret = new Date(arg0 >>> 0, arg1, arg2);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_newwithyearmonthdayhr_adb025003a12c11e = function() { return logError(function (arg0, arg1, arg2, arg3) {
        const ret = new Date(arg0 >>> 0, arg1, arg2, arg3);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_newwithyearmonthdayhrmin_69ee6e52ef44fdf2 = function() { return logError(function (arg0, arg1, arg2, arg3, arg4) {
        const ret = new Date(arg0 >>> 0, arg1, arg2, arg3, arg4);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_newwithyearmonthdayhrminsec_5305680918e85dbe = function() { return logError(function (arg0, arg1, arg2, arg3, arg4, arg5) {
        const ret = new Date(arg0 >>> 0, arg1, arg2, arg3, arg4, arg5);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_newwithyearmonthdayhrminsecmilli_32267738604294d5 = function() { return logError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6) {
        const ret = new Date(arg0 >>> 0, arg1, arg2, arg3, arg4, arg5, arg6);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_next_01dd9234a5bf6d05 = function() { return handleError(function (arg0) {
        const ret = arg0.next();
        return ret;
    }, arguments) };
    imports.wbg.__wbg_next_137428deb98342b0 = function() { return logError(function (arg0) {
        const ret = arg0.next;
        return ret;
    }, arguments) };
    imports.wbg.__wbg_next_97adbc0d5bb171e7 = function() { return handleError(function (arg0) {
        const ret = arg0.next();
        return ret;
    }, arguments) };
    imports.wbg.__wbg_next_9b68d4e63497981b = function() { return handleError(function (arg0, arg1) {
        const ret = arg0.next(arg1);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_normalize_f294dc2f28ffbb72 = function() { return logError(function (arg0, arg1, arg2) {
        const ret = arg0.normalize(getStringFromWasm0(arg1, arg2));
        return ret;
    }, arguments) };
    imports.wbg.__wbg_notify_b8f17ff9451901ef = function() { return handleError(function (arg0, arg1) {
        const ret = Atomics.notify(arg0, arg1 >>> 0);
        _assertNum(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_notify_bd62d970e77cd6c3 = function() { return handleError(function (arg0, arg1, arg2) {
        const ret = Atomics.notify(arg0, arg1 >>> 0, arg2 >>> 0);
        _assertNum(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_now_64d0bb151e5d3889 = function() { return logError(function () {
        const ret = Date.now();
        return ret;
    }, arguments) };
    imports.wbg.__wbg_of_34a5d739e279462a = function() { return logError(function (arg0, arg1, arg2, arg3, arg4) {
        const ret = Array.of(arg0, arg1, arg2, arg3, arg4);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_of_39b8e3338eb53ca4 = function() { return logError(function (arg0, arg1, arg2, arg3) {
        const ret = Array.of(arg0, arg1, arg2, arg3);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_of_437cdae2760f8b94 = function() { return logError(function (arg0, arg1) {
        const ret = Array.of(arg0, arg1);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_of_924412d32367b13d = function() { return logError(function (arg0) {
        const ret = Array.of(arg0);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_of_d3331a102e573656 = function() { return logError(function (arg0, arg1, arg2) {
        const ret = Array.of(arg0, arg1, arg2);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_or_002b56d2a20e1e29 = function() { return handleError(function (arg0, arg1, arg2) {
        const ret = Atomics.or(arg0, arg1 >>> 0, arg2);
        _assertNum(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_or_90e2d365710d8263 = function() { return handleError(function (arg0, arg1, arg2) {
        const ret = Atomics.or(arg0, arg1 >>> 0, arg2);
        _assertBigInt(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_ownKeys_feb8e7c1a89f0911 = function() { return handleError(function (arg0) {
        const ret = Reflect.ownKeys(arg0);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_padEnd_685566315685d7e8 = function() { return logError(function (arg0, arg1, arg2, arg3) {
        const ret = arg0.padEnd(arg1 >>> 0, getStringFromWasm0(arg2, arg3));
        return ret;
    }, arguments) };
    imports.wbg.__wbg_padStart_f056c0505a1cc9ba = function() { return logError(function (arg0, arg1, arg2, arg3) {
        const ret = arg0.padStart(arg1 >>> 0, getStringFromWasm0(arg2, arg3));
        return ret;
    }, arguments) };
    imports.wbg.__wbg_parseFloat_700c5d2f2c19b443 = function() { return logError(function (arg0, arg1) {
        const ret = parseFloat(getStringFromWasm0(arg0, arg1));
        return ret;
    }, arguments) };
    imports.wbg.__wbg_parseFloat_a16faff606dba580 = function() { return logError(function (arg0, arg1) {
        const ret = Number.parseFloat(getStringFromWasm0(arg0, arg1));
        return ret;
    }, arguments) };
    imports.wbg.__wbg_parseInt_7024e06aadf8b6a6 = function() { return logError(function (arg0, arg1, arg2) {
        const ret = Number.parseInt(getStringFromWasm0(arg0, arg1), arg2);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_parseInt_d15858d342898173 = function() { return logError(function (arg0, arg1, arg2) {
        const ret = parseInt(getStringFromWasm0(arg0, arg1), arg2);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_parse_161c68378e086ae1 = function() { return handleError(function (arg0, arg1) {
        const ret = JSON.parse(getStringFromWasm0(arg0, arg1));
        return ret;
    }, arguments) };
    imports.wbg.__wbg_parse_c949ddd4ab55e15a = function() { return logError(function (arg0, arg1) {
        const ret = Date.parse(getStringFromWasm0(arg0, arg1));
        return ret;
    }, arguments) };
    imports.wbg.__wbg_pop_ee5874616c80f874 = function() { return logError(function (arg0) {
        const ret = arg0.pop();
        return ret;
    }, arguments) };
    imports.wbg.__wbg_pow_8ec4ae0efed1d30e = function() { return logError(function (arg0, arg1) {
        const ret = Math.pow(arg0, arg1);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_preventExtensions_45e70a640bdc12e3 = function() { return handleError(function (arg0) {
        const ret = Reflect.preventExtensions(arg0);
        _assertBoolean(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_preventExtensions_bc20d0628f36c860 = function() { return logError(function (arg0) {
        Object.preventExtensions(arg0);
    }, arguments) };
    imports.wbg.__wbg_propertyIsEnumerable_18fdaf046341d949 = function() { return logError(function (arg0, arg1) {
        const ret = arg0.propertyIsEnumerable(arg1);
        _assertBoolean(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_push_6edad0df4b546b2c = function() { return logError(function (arg0, arg1) {
        const ret = arg0.push(arg1);
        _assertNum(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_race_d89b73b601a1a482 = function() { return logError(function (arg0) {
        const ret = Promise.race(arg0);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_random_a435d21390634bdf = function() { return logError(function () {
        const ret = Math.random();
        return ret;
    }, arguments) };
    imports.wbg.__wbg_raw_448b82b22c229858 = function() { return handleError(function (arg0) {
        const ret = String.raw(arg0);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_raw_5f6ef33702c05c80 = function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10) {
        const ret = String.raw(arg0, getStringFromWasm0(arg1, arg2), getStringFromWasm0(arg3, arg4), getStringFromWasm0(arg5, arg6), getStringFromWasm0(arg7, arg8), getStringFromWasm0(arg9, arg10));
        return ret;
    }, arguments) };
    imports.wbg.__wbg_raw_6848dcb1e35a3d4e = function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6) {
        const ret = String.raw(arg0, getStringFromWasm0(arg1, arg2), getStringFromWasm0(arg3, arg4), getStringFromWasm0(arg5, arg6));
        return ret;
    }, arguments) };
    imports.wbg.__wbg_raw_769267b3d74ab9a0 = function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10, arg11, arg12, arg13, arg14) {
        const ret = String.raw(arg0, getStringFromWasm0(arg1, arg2), getStringFromWasm0(arg3, arg4), getStringFromWasm0(arg5, arg6), getStringFromWasm0(arg7, arg8), getStringFromWasm0(arg9, arg10), getStringFromWasm0(arg11, arg12), getStringFromWasm0(arg13, arg14));
        return ret;
    }, arguments) };
    imports.wbg.__wbg_raw_926bdb7a9b262b1c = function() { return handleError(function (arg0, arg1, arg2, arg3, arg4) {
        const ret = String.raw(arg0, getStringFromWasm0(arg1, arg2), getStringFromWasm0(arg3, arg4));
        return ret;
    }, arguments) };
    imports.wbg.__wbg_raw_ae8b1636576c9387 = function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8) {
        const ret = String.raw(arg0, getStringFromWasm0(arg1, arg2), getStringFromWasm0(arg3, arg4), getStringFromWasm0(arg5, arg6), getStringFromWasm0(arg7, arg8));
        return ret;
    }, arguments) };
    imports.wbg.__wbg_raw_d3705bd015bc649a = function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9, arg10, arg11, arg12) {
        const ret = String.raw(arg0, getStringFromWasm0(arg1, arg2), getStringFromWasm0(arg3, arg4), getStringFromWasm0(arg5, arg6), getStringFromWasm0(arg7, arg8), getStringFromWasm0(arg9, arg10), getStringFromWasm0(arg11, arg12));
        return ret;
    }, arguments) };
    imports.wbg.__wbg_raw_df388a4d4b643a7c = function() { return handleError(function (arg0, arg1) {
        const ret = String.raw(arg0, ...arg1);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_raw_e59cf1a4e4222baa = function() { return handleError(function (arg0, arg1, arg2) {
        const ret = String.raw(arg0, getStringFromWasm0(arg1, arg2));
        return ret;
    }, arguments) };
    imports.wbg.__wbg_reduceRight_3a9620b1c73f75bf = function() { return logError(function (arg0, arg1, arg2, arg3) {
        try {
            var state0 = {a: arg1, b: arg2};
            var cb0 = (arg0, arg1, arg2, arg3) => {
                const a = state0.a;
                state0.a = 0;
                try {
                    return __wbg_adapter_176(a, state0.b, arg0, arg1, arg2, arg3);
                } finally {
                    state0.a = a;
                }
            };
            const ret = arg0.reduceRight(cb0, arg3);
            return ret;
        } finally {
            state0.a = state0.b = 0;
        }
    }, arguments) };
    imports.wbg.__wbg_reduce_26fc8746ebae0afd = function() { return logError(function (arg0, arg1, arg2, arg3) {
        try {
            var state0 = {a: arg1, b: arg2};
            var cb0 = (arg0, arg1, arg2, arg3) => {
                const a = state0.a;
                state0.a = 0;
                try {
                    return __wbg_adapter_176(a, state0.b, arg0, arg1, arg2, arg3);
                } finally {
                    state0.a = a;
                }
            };
            const ret = arg0.reduce(cb0, arg3);
            return ret;
        } finally {
            state0.a = state0.b = 0;
        }
    }, arguments) };
    imports.wbg.__wbg_reject_13f693bff0b31edf = function() { return logError(function (arg0) {
        const ret = Promise.reject(arg0);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_repeat_514dd9935264f13d = function() { return logError(function (arg0, arg1) {
        const ret = arg0.repeat(arg1);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_replaceAll_375e599121d59229 = function() { return logError(function (arg0, arg1, arg2, arg3) {
        const ret = arg0.replaceAll(arg1, getStringFromWasm0(arg2, arg3));
        return ret;
    }, arguments) };
    imports.wbg.__wbg_replaceAll_59ab7bd7a645f7de = function() { return logError(function (arg0, arg1, arg2, arg3, arg4) {
        const ret = arg0.replaceAll(getStringFromWasm0(arg1, arg2), getStringFromWasm0(arg3, arg4));
        return ret;
    }, arguments) };
    imports.wbg.__wbg_replaceAll_5a2bfc79383578b8 = function() { return logError(function (arg0, arg1, arg2, arg3) {
        const ret = arg0.replaceAll(getStringFromWasm0(arg1, arg2), arg3);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_replaceAll_617ab5e03fd59f59 = function() { return logError(function (arg0, arg1, arg2) {
        const ret = arg0.replaceAll(arg1, arg2);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_replace_239df1ec4ef53e32 = function() { return logError(function () {
        const ret = Symbol.replace;
        return ret;
    }, arguments) };
    imports.wbg.__wbg_replace_34bf66431d3c9d67 = function() { return logError(function (arg0, arg1, arg2, arg3) {
        const ret = arg0.replace(getStringFromWasm0(arg1, arg2), arg3);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_replace_8823705da0e9ae6d = function() { return logError(function (arg0, arg1, arg2) {
        const ret = arg0.replace(arg1, arg2);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_replace_c5e86408e3ffc317 = function() { return logError(function (arg0, arg1, arg2, arg3, arg4) {
        const ret = arg0.replace(getStringFromWasm0(arg1, arg2), getStringFromWasm0(arg3, arg4));
        return ret;
    }, arguments) };
    imports.wbg.__wbg_replace_c7282d79d4b7d77f = function() { return logError(function (arg0, arg1, arg2, arg3) {
        const ret = arg0.replace(arg1, getStringFromWasm0(arg2, arg3));
        return ret;
    }, arguments) };
    imports.wbg.__wbg_resolve_0bf7c44d641804f9 = function() { return logError(function (arg0) {
        const ret = Promise.resolve(arg0);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_resolvedOptions_247c12d3bb1a832d = function() { return logError(function (arg0) {
        const ret = arg0.resolvedOptions();
        return ret;
    }, arguments) };
    imports.wbg.__wbg_resolvedOptions_24e77ef7367f6b60 = function() { return logError(function (arg0) {
        const ret = arg0.resolvedOptions();
        return ret;
    }, arguments) };
    imports.wbg.__wbg_resolvedOptions_43ce83b12154d9c2 = function() { return logError(function (arg0) {
        const ret = arg0.resolvedOptions();
        return ret;
    }, arguments) };
    imports.wbg.__wbg_resolvedOptions_4e07d8917eef1f20 = function() { return logError(function (arg0) {
        const ret = arg0.resolvedOptions();
        return ret;
    }, arguments) };
    imports.wbg.__wbg_resolvedOptions_f873de777bf206e1 = function() { return logError(function (arg0) {
        const ret = arg0.resolvedOptions();
        return ret;
    }, arguments) };
    imports.wbg.__wbg_return_9248c63f6ea36d2a = function() { return logError(function (arg0, arg1) {
        const ret = arg0.return(arg1);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_reverse_4f5b2ffd8d547303 = function() { return logError(function (arg0) {
        const ret = arg0.reverse();
        return ret;
    }, arguments) };
    imports.wbg.__wbg_revocable_6afe3242fb963ddf = function() { return logError(function (arg0, arg1) {
        const ret = Proxy.revocable(arg0, arg1);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_rightContext_326578862c32809f = function() { return logError(function () {
        const ret = RegExp.rightContext;
        return ret;
    }, arguments) };
    imports.wbg.__wbg_round_84b1cbb95fed21ad = function() { return logError(function (arg0) {
        const ret = Math.round(arg0);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_seal_6a6a9217099e4b76 = function() { return logError(function (arg0) {
        const ret = Object.seal(arg0);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_search_0e16e0f836158a20 = function() { return logError(function () {
        const ret = Symbol.search;
        return ret;
    }, arguments) };
    imports.wbg.__wbg_search_de3546fc5c4f6bab = function() { return logError(function (arg0, arg1) {
        const ret = arg0.search(arg1);
        _assertNum(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_select_acc251db9c11ae64 = function() { return logError(function (arg0, arg1) {
        const ret = arg0.select(arg1);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_setDate_91b38dd42aa1805f = function() { return logError(function (arg0, arg1) {
        const ret = arg0.setDate(arg1 >>> 0);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_setFloat32_73749e6913641055 = function() { return logError(function (arg0, arg1, arg2) {
        arg0.setFloat32(arg1 >>> 0, arg2);
    }, arguments) };
    imports.wbg.__wbg_setFloat32_e79c3592057470f9 = function() { return logError(function (arg0, arg1, arg2, arg3) {
        arg0.setFloat32(arg1 >>> 0, arg2, arg3 !== 0);
    }, arguments) };
    imports.wbg.__wbg_setFloat64_0d8bf64ce939c260 = function() { return logError(function (arg0, arg1, arg2, arg3) {
        arg0.setFloat64(arg1 >>> 0, arg2, arg3 !== 0);
    }, arguments) };
    imports.wbg.__wbg_setFloat64_73700027d037758d = function() { return logError(function (arg0, arg1, arg2) {
        arg0.setFloat64(arg1 >>> 0, arg2);
    }, arguments) };
    imports.wbg.__wbg_setFullYear_896fe47b265ae36c = function() { return logError(function (arg0, arg1) {
        const ret = arg0.setFullYear(arg1 >>> 0);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_setFullYear_d15345e623922385 = function() { return logError(function (arg0, arg1, arg2, arg3) {
        const ret = arg0.setFullYear(arg1 >>> 0, arg2, arg3);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_setFullYear_f7edaeaab2ead8a2 = function() { return logError(function (arg0, arg1, arg2) {
        const ret = arg0.setFullYear(arg1 >>> 0, arg2);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_setHours_de3ef0d8ff064641 = function() { return logError(function (arg0, arg1) {
        const ret = arg0.setHours(arg1 >>> 0);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_setInt16_91b9612c001942d5 = function() { return logError(function (arg0, arg1, arg2) {
        arg0.setInt16(arg1 >>> 0, arg2);
    }, arguments) };
    imports.wbg.__wbg_setInt16_9f08f8678286d7f6 = function() { return logError(function (arg0, arg1, arg2, arg3) {
        arg0.setInt16(arg1 >>> 0, arg2, arg3 !== 0);
    }, arguments) };
    imports.wbg.__wbg_setInt32_14df78f18a871fe7 = function() { return logError(function (arg0, arg1, arg2) {
        arg0.setInt32(arg1 >>> 0, arg2);
    }, arguments) };
    imports.wbg.__wbg_setInt32_15d22a1310122574 = function() { return logError(function (arg0, arg1, arg2, arg3) {
        arg0.setInt32(arg1 >>> 0, arg2, arg3 !== 0);
    }, arguments) };
    imports.wbg.__wbg_setInt8_809e4980fded5573 = function() { return logError(function (arg0, arg1, arg2) {
        arg0.setInt8(arg1 >>> 0, arg2);
    }, arguments) };
    imports.wbg.__wbg_setMilliseconds_451a65fbca3d6e84 = function() { return logError(function (arg0, arg1) {
        const ret = arg0.setMilliseconds(arg1 >>> 0);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_setMinutes_249e25baca697679 = function() { return logError(function (arg0, arg1) {
        const ret = arg0.setMinutes(arg1 >>> 0);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_setMonth_f5a4bf1e96194cca = function() { return logError(function (arg0, arg1) {
        const ret = arg0.setMonth(arg1 >>> 0);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_setPrototypeOf_8445a51656709915 = function() { return handleError(function (arg0, arg1) {
        const ret = Reflect.setPrototypeOf(arg0, arg1);
        _assertBoolean(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_setPrototypeOf_fee02a8da0452cea = function() { return logError(function (arg0, arg1) {
        const ret = Object.setPrototypeOf(arg0, arg1);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_setSeconds_acd44ab4d2fca861 = function() { return logError(function (arg0, arg1) {
        const ret = arg0.setSeconds(arg1 >>> 0);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_setTime_4f334adb2f18bbba = function() { return logError(function (arg0, arg1) {
        const ret = arg0.setTime(arg1);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_setUTCDate_7ef43caa31066383 = function() { return logError(function (arg0, arg1) {
        const ret = arg0.setUTCDate(arg1 >>> 0);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_setUTCFullYear_130a39d61836fb88 = function() { return logError(function (arg0, arg1, arg2) {
        const ret = arg0.setUTCFullYear(arg1 >>> 0, arg2);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_setUTCFullYear_9a45dcc2ff4b5492 = function() { return logError(function (arg0, arg1, arg2, arg3) {
        const ret = arg0.setUTCFullYear(arg1 >>> 0, arg2, arg3);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_setUTCFullYear_ef7b1bf1b3cb26e1 = function() { return logError(function (arg0, arg1) {
        const ret = arg0.setUTCFullYear(arg1 >>> 0);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_setUTCHours_a6c38ef5a364dbab = function() { return logError(function (arg0, arg1) {
        const ret = arg0.setUTCHours(arg1 >>> 0);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_setUTCMilliseconds_39814d03c35c83a5 = function() { return logError(function (arg0, arg1) {
        const ret = arg0.setUTCMilliseconds(arg1 >>> 0);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_setUTCMinutes_556afa1fe7200f4d = function() { return logError(function (arg0, arg1) {
        const ret = arg0.setUTCMinutes(arg1 >>> 0);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_setUTCMonth_b6c273ddf44d7c17 = function() { return logError(function (arg0, arg1) {
        const ret = arg0.setUTCMonth(arg1 >>> 0);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_setUTCSeconds_645a205275eb6f3a = function() { return logError(function (arg0, arg1) {
        const ret = arg0.setUTCSeconds(arg1 >>> 0);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_setUint16_31005521ec26c973 = function() { return logError(function (arg0, arg1, arg2, arg3) {
        arg0.setUint16(arg1 >>> 0, arg2, arg3 !== 0);
    }, arguments) };
    imports.wbg.__wbg_setUint16_e99bd76ef9c209b5 = function() { return logError(function (arg0, arg1, arg2) {
        arg0.setUint16(arg1 >>> 0, arg2);
    }, arguments) };
    imports.wbg.__wbg_setUint32_3a1fc1a57b8fdc73 = function() { return logError(function (arg0, arg1, arg2) {
        arg0.setUint32(arg1 >>> 0, arg2 >>> 0);
    }, arguments) };
    imports.wbg.__wbg_setUint32_d22c954efbf6eab5 = function() { return logError(function (arg0, arg1, arg2, arg3) {
        arg0.setUint32(arg1 >>> 0, arg2 >>> 0, arg3 !== 0);
    }, arguments) };
    imports.wbg.__wbg_setUint8_5855d16d1e296caf = function() { return logError(function (arg0, arg1, arg2) {
        arg0.setUint8(arg1 >>> 0, arg2);
    }, arguments) };
    imports.wbg.__wbg_set_08e01d58e6cbe174 = function() { return handleError(function (arg0, arg1, arg2, arg3) {
        const ret = Reflect.set(arg0, arg1, arg2, arg3);
        _assertBoolean(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_set_16a2635045369437 = function() { return logError(function (arg0, arg1, arg2) {
        arg0.set(arg1, arg2 >>> 0);
    }, arguments) };
    imports.wbg.__wbg_set_1d80752d0d5f0b21 = function() { return logError(function (arg0, arg1, arg2) {
        arg0[arg1 >>> 0] = arg2;
    }, arguments) };
    imports.wbg.__wbg_set_23d69db4e5c66a6e = function() { return logError(function (arg0, arg1, arg2) {
        arg0.set(arg1, arg2 >>> 0);
    }, arguments) };
    imports.wbg.__wbg_set_4474fae9281eafb1 = function() { return logError(function (arg0, arg1, arg2) {
        arg0.set(arg1, arg2 >>> 0);
    }, arguments) };
    imports.wbg.__wbg_set_4e647025551483bd = function() { return handleError(function (arg0, arg1, arg2) {
        const ret = Reflect.set(arg0, arg1, arg2);
        _assertBoolean(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_set_57462d077440607a = function() { return handleError(function (arg0, arg1, arg2) {
        const ret = Reflect.set(arg0, arg1, arg2);
        _assertBoolean(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_set_626de3d66914f5f3 = function() { return logError(function (arg0, arg1, arg2) {
        arg0.set(arg1, arg2 >>> 0);
    }, arguments) };
    imports.wbg.__wbg_set_6a384834746e8eeb = function() { return logError(function (arg0, arg1, arg2) {
        arg0.set(arg1, arg2 >>> 0);
    }, arguments) };
    imports.wbg.__wbg_set_74413f840eeb801f = function() { return logError(function (arg0, arg1, arg2) {
        arg0.set(arg1, arg2 >>> 0);
    }, arguments) };
    imports.wbg.__wbg_set_76818dc3c59a63d5 = function() { return logError(function (arg0, arg1, arg2) {
        const ret = arg0.set(arg1, arg2);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_set_84ba672b563476ae = function() { return logError(function (arg0, arg1, arg2) {
        arg0.set(arg1, arg2 >>> 0);
    }, arguments) };
    imports.wbg.__wbg_set_9592f7d5b752cae3 = function() { return logError(function (arg0, arg1, arg2) {
        arg0.set(arg1, arg2 >>> 0);
    }, arguments) };
    imports.wbg.__wbg_set_9dc5bd6c9283ad36 = function() { return logError(function (arg0, arg1, arg2) {
        const ret = arg0.set(arg1, arg2);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_set_aa59c02f59f0d119 = function() { return logError(function (arg0, arg1, arg2) {
        arg0.set(arg1, arg2 >>> 0);
    }, arguments) };
    imports.wbg.__wbg_set_be48e35d4531640e = function() { return handleError(function (arg0, arg1, arg2) {
        arg0.set(arg1 >>> 0, arg2);
    }, arguments) };
    imports.wbg.__wbg_set_d07bcc1e7243e6ea = function() { return handleError(function (arg0, arg1, arg2) {
        const ret = Reflect.set(arg0, arg1 >>> 0, arg2);
        _assertBoolean(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_set_d2ca640bc040b031 = function() { return logError(function (arg0, arg1, arg2) {
        arg0.set(arg1, arg2 >>> 0);
    }, arguments) };
    imports.wbg.__wbg_set_e41520b7a6ffef89 = function() { return logError(function (arg0, arg1, arg2) {
        arg0.set(arg1, arg2 >>> 0);
    }, arguments) };
    imports.wbg.__wbg_setcause_178709cda4e8ea23 = function() { return logError(function (arg0, arg1) {
        arg0.cause = arg1;
    }, arguments) };
    imports.wbg.__wbg_setindex_134d8ddeb712398d = function() { return logError(function (arg0, arg1, arg2) {
        arg0[arg1 >>> 0] = arg2;
    }, arguments) };
    imports.wbg.__wbg_setindex_3cb3d9733b5885ba = function() { return logError(function (arg0, arg1, arg2) {
        arg0[arg1 >>> 0] = arg2;
    }, arguments) };
    imports.wbg.__wbg_setindex_4cae52fc4c0872b0 = function() { return logError(function (arg0, arg1, arg2) {
        arg0[arg1 >>> 0] = arg2;
    }, arguments) };
    imports.wbg.__wbg_setindex_4f851ff1bb1cba66 = function() { return logError(function (arg0, arg1, arg2) {
        arg0[arg1 >>> 0] = arg2;
    }, arguments) };
    imports.wbg.__wbg_setindex_7044e23fb9c307e8 = function() { return logError(function (arg0, arg1, arg2) {
        arg0[arg1 >>> 0] = arg2;
    }, arguments) };
    imports.wbg.__wbg_setindex_72acc0c73235d694 = function() { return logError(function (arg0, arg1, arg2) {
        arg0[arg1 >>> 0] = arg2;
    }, arguments) };
    imports.wbg.__wbg_setindex_837f7da494ee0c5b = function() { return logError(function (arg0, arg1, arg2) {
        arg0[arg1 >>> 0] = arg2;
    }, arguments) };
    imports.wbg.__wbg_setindex_a37683f91a5ed96f = function() { return logError(function (arg0, arg1, arg2) {
        arg0[arg1 >>> 0] = arg2;
    }, arguments) };
    imports.wbg.__wbg_setindex_cae1584df79bbc37 = function() { return logError(function (arg0, arg1, arg2) {
        arg0[arg1 >>> 0] = BigInt.asUintN(64, arg2);
    }, arguments) };
    imports.wbg.__wbg_setindex_cb37259cdaa9d774 = function() { return logError(function (arg0, arg1, arg2) {
        arg0[arg1 >>> 0] = arg2 >>> 0;
    }, arguments) };
    imports.wbg.__wbg_setindex_f243e0122d97537e = function() { return logError(function (arg0, arg1, arg2) {
        arg0[arg1 >>> 0] = arg2;
    }, arguments) };
    imports.wbg.__wbg_setlastindex_b4d05dc7ec8b3b58 = function() { return logError(function (arg0, arg1) {
        arg0.lastIndex = arg1 >>> 0;
    }, arguments) };
    imports.wbg.__wbg_setlength_a568e475eef354c4 = function() { return logError(function (arg0, arg1) {
        arg0.length = arg1 >>> 0;
    }, arguments) };
    imports.wbg.__wbg_setmessage_90fcbc895d0df812 = function() { return logError(function (arg0, arg1, arg2) {
        arg0.message = getStringFromWasm0(arg1, arg2);
    }, arguments) };
    imports.wbg.__wbg_setname_c7bd5f861cae2b0f = function() { return logError(function (arg0, arg1, arg2) {
        arg0.name = getStringFromWasm0(arg1, arg2);
    }, arguments) };
    imports.wbg.__wbg_setvalue_e780cff23e4a16dc = function() { return logError(function (arg0, arg1) {
        arg0.value = arg1;
    }, arguments) };
    imports.wbg.__wbg_shift_6b6fc2d031565463 = function() { return logError(function (arg0) {
        const ret = arg0.shift();
        return ret;
    }, arguments) };
    imports.wbg.__wbg_sign_262304023afbd064 = function() { return logError(function (arg0) {
        const ret = Math.sign(arg0);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_sin_58ce05a75c3a7862 = function() { return logError(function (arg0) {
        const ret = Math.sin(arg0);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_sinh_4a296e07412dfd62 = function() { return logError(function (arg0) {
        const ret = Math.sinh(arg0);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_size_3f124a38e8bafd22 = function() { return logError(function (arg0) {
        const ret = arg0.size;
        _assertNum(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_size_612602f0ba19b909 = function() { return logError(function (arg0) {
        const ret = arg0.size;
        _assertNum(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_slice_2ab44bc8bc59927c = function() { return logError(function (arg0, arg1, arg2) {
        const ret = arg0.slice(arg1 >>> 0, arg2 >>> 0);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_slice_2e657a66231f006f = function() { return logError(function (arg0, arg1, arg2) {
        const ret = arg0.slice(arg1 >>> 0, arg2 >>> 0);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_slice_304e816837b6c3ce = function() { return logError(function (arg0, arg1, arg2) {
        const ret = arg0.slice(arg1 >>> 0, arg2 >>> 0);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_slice_517a6d7208a32ab0 = function() { return logError(function (arg0, arg1, arg2) {
        const ret = arg0.slice(arg1 >>> 0, arg2 >>> 0);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_slice_518968fca00bb20b = function() { return logError(function (arg0, arg1, arg2) {
        const ret = arg0.slice(arg1 >>> 0, arg2 >>> 0);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_slice_61a8494974c35ed2 = function() { return logError(function (arg0, arg1, arg2) {
        const ret = arg0.slice(arg1 >>> 0, arg2 >>> 0);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_slice_70af7c04cd2464ab = function() { return logError(function (arg0, arg1, arg2) {
        const ret = arg0.slice(arg1 >>> 0, arg2 >>> 0);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_slice_7b3d4fac9af7e20a = function() { return logError(function (arg0, arg1, arg2) {
        const ret = arg0.slice(arg1 >>> 0, arg2 >>> 0);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_slice_8c6371d2514e3cb4 = function() { return logError(function (arg0, arg1, arg2) {
        const ret = arg0.slice(arg1 >>> 0, arg2 >>> 0);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_slice_943c2e18a70b8009 = function() { return logError(function (arg0, arg1, arg2) {
        const ret = arg0.slice(arg1 >>> 0, arg2 >>> 0);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_slice_96f808507cd16471 = function() { return logError(function (arg0, arg1, arg2) {
        const ret = arg0.slice(arg1 >>> 0, arg2 >>> 0);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_slice_9a9331ab72df4210 = function() { return logError(function (arg0, arg1, arg2) {
        const ret = arg0.slice(arg1 >>> 0, arg2 >>> 0);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_slice_c12e5e040b44ec14 = function() { return logError(function (arg0, arg1, arg2) {
        const ret = arg0.slice(arg1 >>> 0, arg2 >>> 0);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_slice_ca28932e946e48ea = function() { return logError(function (arg0, arg1, arg2) {
        const ret = arg0.slice(arg1 >>> 0, arg2 >>> 0);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_slice_cb43c4a705e6a8ba = function() { return logError(function (arg0, arg1, arg2) {
        const ret = arg0.slice(arg1 >>> 0, arg2 >>> 0);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_slice_eade36179296be5b = function() { return logError(function (arg0, arg1) {
        const ret = arg0.slice(arg1 >>> 0);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_slice_f1e23fa43db2d3fb = function() { return logError(function (arg0, arg1) {
        const ret = arg0.slice(arg1 >>> 0);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_some_282ea8e76aa049ca = function() { return logError(function (arg0, arg1, arg2) {
        try {
            var state0 = {a: arg1, b: arg2};
            var cb0 = (arg0) => {
                const a = state0.a;
                state0.a = 0;
                try {
                    return __wbg_adapter_187(a, state0.b, arg0);
                } finally {
                    state0.a = a;
                }
            };
            const ret = arg0.some(cb0);
            _assertBoolean(ret);
            return ret;
        } finally {
            state0.a = state0.b = 0;
        }
    }, arguments) };
    imports.wbg.__wbg_sort_57a6bf31c7a5b5d7 = function() { return logError(function (arg0) {
        const ret = arg0.sort();
        return ret;
    }, arguments) };
    imports.wbg.__wbg_source_7302326801272463 = function() { return logError(function (arg0) {
        const ret = arg0.source;
        return ret;
    }, arguments) };
    imports.wbg.__wbg_species_1cad8a06547c2a45 = function() { return logError(function () {
        const ret = Symbol.species;
        return ret;
    }, arguments) };
    imports.wbg.__wbg_splice_11d12bbf491a51e7 = function() { return logError(function (arg0, arg1, arg2, arg3) {
        const ret = arg0.splice(arg1 >>> 0, arg2 >>> 0, arg3);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_split_845ef134f6c4f210 = function() { return logError(function (arg0, arg1, arg2) {
        const ret = arg0.split(getStringFromWasm0(arg1, arg2));
        return ret;
    }, arguments) };
    imports.wbg.__wbg_split_846abbff89a9d5cb = function() { return logError(function (arg0, arg1) {
        const ret = arg0.split(arg1);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_split_c06b464a55f24d6b = function() { return logError(function (arg0, arg1, arg2, arg3) {
        const ret = arg0.split(getStringFromWasm0(arg1, arg2), arg3 >>> 0);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_split_c32115316eabde46 = function() { return logError(function () {
        const ret = Symbol.split;
        return ret;
    }, arguments) };
    imports.wbg.__wbg_split_f111f5bc93e05af1 = function() { return logError(function (arg0, arg1, arg2) {
        const ret = arg0.split(arg1, arg2 >>> 0);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_sqrt_c0c054140bc7f5fa = function() { return logError(function (arg0) {
        const ret = Math.sqrt(arg0);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_stack_0ed75d68575b0f3c = function() { return logError(function (arg0, arg1) {
        const ret = arg1.stack;
        const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
        getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
    }, arguments) };
    imports.wbg.__wbg_startsWith_7737cfe1271719ca = function() { return logError(function (arg0, arg1, arg2, arg3) {
        const ret = arg0.startsWith(getStringFromWasm0(arg1, arg2), arg3 >>> 0);
        _assertBoolean(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_static_accessor_GLOBAL_0be7472e492ad3e3 = function() { return logError(function () {
        const ret = typeof global === 'undefined' ? null : global;
        return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
    }, arguments) };
    imports.wbg.__wbg_static_accessor_GLOBAL_THIS_1a6eb482d12c9bfb = function() { return logError(function () {
        const ret = typeof globalThis === 'undefined' ? null : globalThis;
        return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
    }, arguments) };
    imports.wbg.__wbg_static_accessor_SELF_1dc398a895c82351 = function() { return logError(function () {
        const ret = typeof self === 'undefined' ? null : self;
        return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
    }, arguments) };
    imports.wbg.__wbg_static_accessor_WINDOW_ae1c80c7eea8d64a = function() { return logError(function () {
        const ret = typeof window === 'undefined' ? null : window;
        return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
    }, arguments) };
    imports.wbg.__wbg_sticky_7f4ab2750c500e2b = function() { return logError(function (arg0) {
        const ret = arg0.sticky;
        _assertBoolean(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_store_2e4c360c4ab8a634 = function() { return handleError(function (arg0, arg1, arg2) {
        const ret = Atomics.store(arg0, arg1 >>> 0, arg2);
        _assertBigInt(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_store_6bffd3a52dfd4b3b = function() { return handleError(function (arg0, arg1, arg2) {
        const ret = Atomics.store(arg0, arg1 >>> 0, arg2);
        _assertNum(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_stringify_87f970204be8ec22 = function() { return handleError(function (arg0, arg1, arg2) {
        const ret = JSON.stringify(arg0, arg1, arg2);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_stringify_a8308e064240b26d = function() { return handleError(function (arg0, arg1) {
        const ret = JSON.stringify(arg0, arg1);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_stringify_f4f701bc34ceda61 = function() { return handleError(function (arg0) {
        const ret = JSON.stringify(arg0);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_sub_6567cd6529f0dfe0 = function() { return handleError(function (arg0, arg1, arg2) {
        const ret = Atomics.sub(arg0, arg1 >>> 0, arg2);
        _assertBigInt(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_sub_6b25c4066c3b62fa = function() { return handleError(function (arg0, arg1, arg2) {
        const ret = Atomics.sub(arg0, arg1 >>> 0, arg2);
        _assertNum(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_subarray_0b1c911f4c449489 = function() { return logError(function (arg0, arg1, arg2) {
        const ret = arg0.subarray(arg1 >>> 0, arg2 >>> 0);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_subarray_21879f5e545c60d6 = function() { return logError(function (arg0, arg1, arg2) {
        const ret = arg0.subarray(arg1 >>> 0, arg2 >>> 0);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_subarray_46adeb9b86949d12 = function() { return logError(function (arg0, arg1, arg2) {
        const ret = arg0.subarray(arg1 >>> 0, arg2 >>> 0);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_subarray_4a92bc93318be691 = function() { return logError(function (arg0, arg1, arg2) {
        const ret = arg0.subarray(arg1 >>> 0, arg2 >>> 0);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_subarray_5be48d0e4998184c = function() { return logError(function (arg0, arg1, arg2) {
        const ret = arg0.subarray(arg1 >>> 0, arg2 >>> 0);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_subarray_61ec827dee1ab580 = function() { return logError(function (arg0, arg1, arg2) {
        const ret = arg0.subarray(arg1 >>> 0, arg2 >>> 0);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_subarray_84d94068064ec2f0 = function() { return logError(function (arg0, arg1, arg2) {
        const ret = arg0.subarray(arg1 >>> 0, arg2 >>> 0);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_subarray_8e4fd061b8d96dc6 = function() { return logError(function (arg0, arg1, arg2) {
        const ret = arg0.subarray(arg1 >>> 0, arg2 >>> 0);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_subarray_8f3c0b91acf6ae9f = function() { return logError(function (arg0, arg1, arg2) {
        const ret = arg0.subarray(arg1 >>> 0, arg2 >>> 0);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_subarray_a676f50e5cd69fd8 = function() { return logError(function (arg0, arg1, arg2) {
        const ret = arg0.subarray(arg1 >>> 0, arg2 >>> 0);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_subarray_af17fe4c019028ac = function() { return logError(function (arg0, arg1, arg2) {
        const ret = arg0.subarray(arg1 >>> 0, arg2 >>> 0);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_substr_ccc8600c761f30ec = function() { return logError(function (arg0, arg1, arg2) {
        const ret = arg0.substr(arg1, arg2);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_substring_170aaa01c1f05da4 = function() { return logError(function (arg0, arg1, arg2) {
        const ret = arg0.substring(arg1 >>> 0, arg2 >>> 0);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_supportedLocalesOf_1c1c6fefb1c64384 = function() { return logError(function (arg0, arg1) {
        const ret = Intl.PluralRules.supportedLocalesOf(arg0, arg1);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_supportedLocalesOf_41d90f33944854cd = function() { return logError(function (arg0, arg1) {
        const ret = Intl.Collator.supportedLocalesOf(arg0, arg1);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_supportedLocalesOf_8d955a5c5037c734 = function() { return logError(function (arg0, arg1) {
        const ret = Intl.RelativeTimeFormat.supportedLocalesOf(arg0, arg1);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_supportedLocalesOf_bfe4540057e51af1 = function() { return logError(function (arg0, arg1) {
        const ret = Intl.DateTimeFormat.supportedLocalesOf(arg0, arg1);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_supportedLocalesOf_f0f3bf8e22c6fa25 = function() { return logError(function (arg0, arg1) {
        const ret = Intl.NumberFormat.supportedLocalesOf(arg0, arg1);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_tan_adda8c8bc185d4ae = function() { return logError(function (arg0) {
        const ret = Math.tan(arg0);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_tanh_a8b3c283f6adb4fa = function() { return logError(function (arg0) {
        const ret = Math.tanh(arg0);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_test_bf58c37531dc322b = function() { return logError(function (arg0, arg1, arg2) {
        const ret = arg0.test(getStringFromWasm0(arg1, arg2));
        _assertBoolean(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_then_0438fad860fe38e1 = function() { return logError(function (arg0, arg1) {
        const ret = arg0.then(arg1);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_then_0ffafeddf0e182a4 = function() { return logError(function (arg0, arg1, arg2) {
        const ret = arg0.then(arg1, arg2);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_throw_445c773cfc372148 = function() { return handleError(function (arg0, arg1) {
        const ret = arg0.throw(arg1);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_toDateString_5fd55ed5508081d0 = function() { return logError(function (arg0) {
        const ret = arg0.toDateString();
        return ret;
    }, arguments) };
    imports.wbg.__wbg_toExponential_fff5467cf1fdf775 = function() { return handleError(function (arg0, arg1) {
        const ret = arg0.toExponential(arg1);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_toFixed_cb3665d7f4ebbc04 = function() { return handleError(function (arg0, arg1) {
        const ret = arg0.toFixed(arg1);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_toISOString_ba8606ddf68b79de = function() { return logError(function (arg0) {
        const ret = arg0.toISOString();
        return ret;
    }, arguments) };
    imports.wbg.__wbg_toJSON_478897c6c48b821e = function() { return logError(function (arg0) {
        const ret = arg0.toJSON();
        return ret;
    }, arguments) };
    imports.wbg.__wbg_toLocaleDateString_a1047719732145c0 = function() { return logError(function (arg0, arg1, arg2, arg3) {
        const ret = arg0.toLocaleDateString(getStringFromWasm0(arg1, arg2), arg3);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_toLocaleLowerCase_2e0dd95e678c8999 = function() { return logError(function (arg0, arg1, arg2) {
        const ret = arg0.toLocaleLowerCase(arg1 === 0 ? undefined : getStringFromWasm0(arg1, arg2));
        return ret;
    }, arguments) };
    imports.wbg.__wbg_toLocaleString_30025de46ac25610 = function() { return logError(function (arg0, arg1, arg2) {
        const ret = arg0.toLocaleString(arg1, arg2);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_toLocaleString_7145d11b2818ebc2 = function() { return logError(function (arg0) {
        const ret = arg0.toLocaleString();
        return ret;
    }, arguments) };
    imports.wbg.__wbg_toLocaleString_866cebc53733237a = function() { return logError(function (arg0, arg1, arg2) {
        const ret = arg0.toLocaleString(arg1, arg2);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_toLocaleString_b6603cc3bd00f650 = function() { return logError(function (arg0, arg1, arg2) {
        const ret = arg0.toLocaleString(getStringFromWasm0(arg1, arg2));
        return ret;
    }, arguments) };
    imports.wbg.__wbg_toLocaleString_cf9784b86e84952b = function() { return logError(function (arg0, arg1, arg2, arg3) {
        const ret = arg0.toLocaleString(getStringFromWasm0(arg1, arg2), arg3);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_toLocaleTimeString_951f9db247134c69 = function() { return logError(function (arg0, arg1, arg2) {
        const ret = arg0.toLocaleTimeString(getStringFromWasm0(arg1, arg2));
        return ret;
    }, arguments) };
    imports.wbg.__wbg_toLocaleUpperCase_6304d3e572dd603a = function() { return logError(function (arg0, arg1, arg2) {
        const ret = arg0.toLocaleUpperCase(arg1 === 0 ? undefined : getStringFromWasm0(arg1, arg2));
        return ret;
    }, arguments) };
    imports.wbg.__wbg_toLowerCase_fe29ddf2d4ed930a = function() { return logError(function (arg0) {
        const ret = arg0.toLowerCase();
        return ret;
    }, arguments) };
    imports.wbg.__wbg_toPrecision_fbff986430342f22 = function() { return handleError(function (arg0, arg1) {
        const ret = arg0.toPrecision(arg1);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_toPrimitive_810f8bc3133e4f13 = function() { return logError(function () {
        const ret = Symbol.toPrimitive;
        return ret;
    }, arguments) };
    imports.wbg.__wbg_toStringTag_fc48fccf9ad25689 = function() { return logError(function () {
        const ret = Symbol.toStringTag;
        return ret;
    }, arguments) };
    imports.wbg.__wbg_toString_0b4db1a5fa29719e = function() { return logError(function (arg0) {
        const ret = arg0.toString();
        return ret;
    }, arguments) };
    imports.wbg.__wbg_toString_287359a808c1b15f = function() { return handleError(function (arg0, arg1) {
        const ret = arg0.toString(arg1);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_toString_2f339c0a5005e8f3 = function() { return logError(function (arg0) {
        const ret = arg0.toString();
        return ret;
    }, arguments) };
    imports.wbg.__wbg_toString_4388a9b346ea85b2 = function() { return logError(function (arg0) {
        const ret = arg0.toString();
        return ret;
    }, arguments) };
    imports.wbg.__wbg_toString_79fda24e76e13ea6 = function() { return handleError(function (arg0, arg1) {
        const ret = arg0.toString(arg1);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_toString_9422cdd1a30bdfd6 = function() { return logError(function (arg0) {
        const ret = arg0.toString();
        return ret;
    }, arguments) };
    imports.wbg.__wbg_toString_a491ccf7be1ca5c9 = function() { return logError(function (arg0) {
        const ret = arg0.toString();
        return ret;
    }, arguments) };
    imports.wbg.__wbg_toString_cbcf95f260c441ae = function() { return logError(function (arg0) {
        const ret = arg0.toString();
        return ret;
    }, arguments) };
    imports.wbg.__wbg_toString_e262cff751e98330 = function() { return logError(function (arg0) {
        const ret = arg0.toString();
        return ret;
    }, arguments) };
    imports.wbg.__wbg_toString_e52cae46e417625f = function() { return logError(function (arg0, arg1, arg2) {
        const ret = arg1.toString(arg2);
        const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
        getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
    }, arguments) };
    imports.wbg.__wbg_toString_e7ab2de82b41f3bf = function() { return logError(function (arg0) {
        const ret = arg0.toString();
        return ret;
    }, arguments) };
    imports.wbg.__wbg_toTimeString_c739a3fa129511f0 = function() { return logError(function (arg0) {
        const ret = arg0.toTimeString();
        return ret;
    }, arguments) };
    imports.wbg.__wbg_toUTCString_45d45f45b1ac031b = function() { return logError(function (arg0) {
        const ret = arg0.toUTCString();
        return ret;
    }, arguments) };
    imports.wbg.__wbg_toUpperCase_1e033d4519599108 = function() { return logError(function (arg0) {
        const ret = arg0.toUpperCase();
        return ret;
    }, arguments) };
    imports.wbg.__wbg_trimEnd_093bcdcb5cd7bc11 = function() { return logError(function (arg0) {
        const ret = arg0.trimEnd();
        return ret;
    }, arguments) };
    imports.wbg.__wbg_trimLeft_033d6915b51cc59c = function() { return logError(function (arg0) {
        const ret = arg0.trimLeft();
        return ret;
    }, arguments) };
    imports.wbg.__wbg_trimRight_af1958470626e1b5 = function() { return logError(function (arg0) {
        const ret = arg0.trimRight();
        return ret;
    }, arguments) };
    imports.wbg.__wbg_trimStart_1b30d966459ea374 = function() { return logError(function (arg0) {
        const ret = arg0.trimStart();
        return ret;
    }, arguments) };
    imports.wbg.__wbg_trim_ad38228a76ffd79b = function() { return logError(function (arg0) {
        const ret = arg0.trim();
        return ret;
    }, arguments) };
    imports.wbg.__wbg_trunc_e23ad218ea77eb01 = function() { return logError(function (arg0) {
        const ret = Math.trunc(arg0);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_unescape_dbab6cd29abe9504 = function() { return logError(function (arg0, arg1) {
        const ret = unescape(getStringFromWasm0(arg0, arg1));
        return ret;
    }, arguments) };
    imports.wbg.__wbg_unicode_3ab981af04fb8c59 = function() { return logError(function (arg0) {
        const ret = arg0.unicode;
        _assertBoolean(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_unscopables_7b4b9963bfdaa9b8 = function() { return logError(function () {
        const ret = Symbol.unscopables;
        return ret;
    }, arguments) };
    imports.wbg.__wbg_unshift_96c5b9afa55182d1 = function() { return logError(function (arg0, arg1) {
        const ret = arg0.unshift(arg1);
        _assertNum(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_validate_5bb9e0985a63c4c6 = function() { return handleError(function (arg0) {
        const ret = WebAssembly.validate(arg0);
        _assertBoolean(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_valueOf_532f11bec0f6504d = function() { return logError(function (arg0) {
        const ret = arg0.valueOf();
        return ret;
    }, arguments) };
    imports.wbg.__wbg_valueOf_56895627e4c5c753 = function() { return logError(function (arg0) {
        const ret = arg0.valueOf();
        _assertBoolean(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_valueOf_57448ffec7706c63 = function() { return logError(function (arg0) {
        const ret = arg0.valueOf();
        return ret;
    }, arguments) };
    imports.wbg.__wbg_valueOf_5b6f2438fbd02962 = function() { return logError(function (arg0) {
        const ret = arg0.valueOf();
        return ret;
    }, arguments) };
    imports.wbg.__wbg_valueOf_70ec4eca450e3854 = function() { return logError(function (arg0) {
        const ret = arg0.valueOf();
        return ret;
    }, arguments) };
    imports.wbg.__wbg_valueOf_847a14d2ad8e7245 = function() { return logError(function (arg0, arg1) {
        const ret = arg0.valueOf(arg1);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_valueOf_d2522f2c023b5f5d = function() { return logError(function (arg0) {
        const ret = arg0.valueOf();
        return ret;
    }, arguments) };
    imports.wbg.__wbg_value_4c32fd138a88eee2 = function() { return logError(function (arg0) {
        const ret = arg0.value;
        return ret;
    }, arguments) };
    imports.wbg.__wbg_value_c09483b0fe1d5315 = function() { return logError(function (arg0) {
        const ret = arg0.value;
        return ret;
    }, arguments) };
    imports.wbg.__wbg_values_5af5439113b920a7 = function() { return logError(function (arg0) {
        const ret = Object.values(arg0);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_values_5b2662303e52c392 = function() { return logError(function (arg0) {
        const ret = arg0.values();
        return ret;
    }, arguments) };
    imports.wbg.__wbg_values_7aa03dd078978c86 = function() { return logError(function (arg0) {
        const ret = arg0.values();
        return ret;
    }, arguments) };
    imports.wbg.__wbg_values_fff504a3447f4303 = function() { return logError(function (arg0) {
        const ret = arg0.values();
        return ret;
    }, arguments) };
    imports.wbg.__wbg_waitAsync_5e9af8e6abf1280d = function() { return handleError(function (arg0, arg1, arg2, arg3) {
        const ret = Atomics.waitAsync(arg0, arg1 >>> 0, arg2, arg3);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_waitAsync_823e269c7b4fe5bb = function() { return handleError(function (arg0, arg1, arg2) {
        const ret = Atomics.waitAsync(arg0, arg1 >>> 0, arg2);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_waitAsync_8d59758efa123420 = function() { return handleError(function (arg0, arg1, arg2) {
        const ret = Atomics.waitAsync(arg0, arg1 >>> 0, arg2);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_waitAsync_a9d95dab06801290 = function() { return handleError(function (arg0, arg1, arg2, arg3) {
        const ret = Atomics.waitAsync(arg0, arg1 >>> 0, arg2, arg3);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_wait_1d6f9ec5149b7a21 = function() { return handleError(function (arg0, arg1, arg2, arg3) {
        const ret = Atomics.wait(arg0, arg1 >>> 0, arg2, arg3);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_wait_55b53e3b13cef349 = function() { return handleError(function (arg0, arg1, arg2) {
        const ret = Atomics.wait(arg0, arg1 >>> 0, arg2);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_wait_d2445a7c98dfe557 = function() { return handleError(function (arg0, arg1, arg2) {
        const ret = Atomics.wait(arg0, arg1 >>> 0, arg2);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_wait_f3fbf9b7744ce2db = function() { return handleError(function (arg0, arg1, arg2, arg3) {
        const ret = Atomics.wait(arg0, arg1 >>> 0, arg2, arg3);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_xor_95ade0b51d6e771d = function() { return handleError(function (arg0, arg1, arg2) {
        const ret = Atomics.xor(arg0, arg1 >>> 0, arg2);
        _assertBigInt(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbg_xor_da343578f9ffba0c = function() { return handleError(function (arg0, arg1, arg2) {
        const ret = Atomics.xor(arg0, arg1 >>> 0, arg2);
        _assertNum(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbindgen_array_new = function() {
        const ret = [];
        return ret;
    };
    imports.wbg.__wbindgen_array_push = function(arg0, arg1) {
        arg0.push(arg1);
    };
    imports.wbg.__wbindgen_bigint64_array_new = function(arg0, arg1) {
        var v0 = getArrayI64FromWasm0(arg0, arg1).slice();
        wasm.__wbindgen_free(arg0, arg1 * 8, 8);
        const ret = v0;
        return ret;
    };
    imports.wbg.__wbindgen_bigint_get_as_i64 = function(arg0, arg1) {
        const v = arg1;
        const ret = typeof(v) === 'bigint' ? v : undefined;
        if (!isLikeNone(ret)) {
            _assertBigInt(ret);
        }
        getDataViewMemory0().setBigInt64(arg0 + 8 * 1, isLikeNone(ret) ? BigInt(0) : ret, true);
        getDataViewMemory0().setInt32(arg0 + 4 * 0, !isLikeNone(ret), true);
    };
    imports.wbg.__wbindgen_biguint64_array_new = function(arg0, arg1) {
        var v0 = getArrayU64FromWasm0(arg0, arg1).slice();
        wasm.__wbindgen_free(arg0, arg1 * 8, 8);
        const ret = v0;
        return ret;
    };
    imports.wbg.__wbindgen_checked_div = function(arg0, arg1) {
        let result;
        try {
            result = arg0 / arg1;
        } catch (e) {
            if (e instanceof RangeError) {
                result = e;
            } else {
                throw e;
            }
        }
        const ret = result;
        return ret;
    };
    imports.wbg.__wbindgen_debug_string = function(arg0, arg1) {
        const ret = debugString(arg1);
        const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
        getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
    };
    imports.wbg.__wbindgen_exports = function() {
        const ret = wasm;
        return ret;
    };
    imports.wbg.__wbindgen_externref_heap_live_count = function() { return logError(function () {
        const ret = wasm.__externref_heap_live_count();
        _assertNum(ret);
        return ret;
    }, arguments) };
    imports.wbg.__wbindgen_float32_array_new = function(arg0, arg1) {
        var v0 = getArrayF32FromWasm0(arg0, arg1).slice();
        wasm.__wbindgen_free(arg0, arg1 * 4, 4);
        const ret = v0;
        return ret;
    };
    imports.wbg.__wbindgen_float64_array_new = function(arg0, arg1) {
        var v0 = getArrayF64FromWasm0(arg0, arg1).slice();
        wasm.__wbindgen_free(arg0, arg1 * 8, 8);
        const ret = v0;
        return ret;
    };
    imports.wbg.__wbindgen_function_table = function() {
        const ret = wasm.__wbindgen_export_7;
        return ret;
    };
    imports.wbg.__wbindgen_init_externref_table = function() {
        const table = wasm.__wbindgen_export_2;
        const offset = table.grow(4);
        table.set(0, undefined);
        table.set(offset + 0, undefined);
        table.set(offset + 1, null);
        table.set(offset + 2, true);
        table.set(offset + 3, false);
        ;
    };
    imports.wbg.__wbindgen_int16_array_new = function(arg0, arg1) {
        var v0 = getArrayI16FromWasm0(arg0, arg1).slice();
        wasm.__wbindgen_free(arg0, arg1 * 2, 2);
        const ret = v0;
        return ret;
    };
    imports.wbg.__wbindgen_int32_array_new = function(arg0, arg1) {
        var v0 = getArrayI32FromWasm0(arg0, arg1).slice();
        wasm.__wbindgen_free(arg0, arg1 * 4, 4);
        const ret = v0;
        return ret;
    };
    imports.wbg.__wbindgen_int8_array_new = function(arg0, arg1) {
        var v0 = getArrayI8FromWasm0(arg0, arg1).slice();
        wasm.__wbindgen_free(arg0, arg1 * 1, 1);
        const ret = v0;
        return ret;
    };
    imports.wbg.__wbindgen_is_function = function(arg0) {
        const ret = typeof(arg0) === 'function';
        _assertBoolean(ret);
        return ret;
    };
    imports.wbg.__wbindgen_is_object = function(arg0) {
        const val = arg0;
        const ret = typeof(val) === 'object' && val !== null;
        _assertBoolean(ret);
        return ret;
    };
    imports.wbg.__wbindgen_is_string = function(arg0) {
        const ret = typeof(arg0) === 'string';
        _assertBoolean(ret);
        return ret;
    };
    imports.wbg.__wbindgen_is_undefined = function(arg0) {
        const ret = arg0 === undefined;
        _assertBoolean(ret);
        return ret;
    };
    imports.wbg.__wbindgen_lt = function(arg0, arg1) {
        const ret = arg0 < arg1;
        _assertBoolean(ret);
        return ret;
    };
    imports.wbg.__wbindgen_memory = function() {
        const ret = wasm.memory;
        return ret;
    };
    imports.wbg.__wbindgen_module = function() {
        const ret = __wbg_init.__wbindgen_wasm_module;
        return ret;
    };
    imports.wbg.__wbindgen_neg = function(arg0) {
        const ret = -arg0;
        return ret;
    };
    imports.wbg.__wbindgen_number_get = function(arg0, arg1) {
        const obj = arg1;
        const ret = typeof(obj) === 'number' ? obj : undefined;
        if (!isLikeNone(ret)) {
            _assertNum(ret);
        }
        getDataViewMemory0().setFloat64(arg0 + 8 * 1, isLikeNone(ret) ? 0 : ret, true);
        getDataViewMemory0().setInt32(arg0 + 4 * 0, !isLikeNone(ret), true);
    };
    imports.wbg.__wbindgen_number_new = function(arg0) {
        const ret = arg0;
        return ret;
    };
    imports.wbg.__wbindgen_rethrow = function(arg0) {
        throw arg0;
    };
    imports.wbg.__wbindgen_string_get = function(arg0, arg1) {
        const obj = arg1;
        const ret = typeof(obj) === 'string' ? obj : undefined;
        var ptr1 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len1 = WASM_VECTOR_LEN;
        getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
        getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
    };
    imports.wbg.__wbindgen_string_new = function(arg0, arg1) {
        const ret = getStringFromWasm0(arg0, arg1);
        return ret;
    };
    imports.wbg.__wbindgen_symbol_anonymous_new = function() {
        const ret = Symbol();
        return ret;
    };
    imports.wbg.__wbindgen_symbol_named_new = function(arg0, arg1) {
        const ret = Symbol(getStringFromWasm0(arg0, arg1));
        return ret;
    };
    imports.wbg.__wbindgen_throw = function(arg0, arg1) {
        throw new Error(getStringFromWasm0(arg0, arg1));
    };
    imports.wbg.__wbindgen_uint16_array_new = function(arg0, arg1) {
        var v0 = getArrayU16FromWasm0(arg0, arg1).slice();
        wasm.__wbindgen_free(arg0, arg1 * 2, 2);
        const ret = v0;
        return ret;
    };
    imports.wbg.__wbindgen_uint32_array_new = function(arg0, arg1) {
        var v0 = getArrayU32FromWasm0(arg0, arg1).slice();
        wasm.__wbindgen_free(arg0, arg1 * 4, 4);
        const ret = v0;
        return ret;
    };
    imports.wbg.__wbindgen_uint8_array_new = function(arg0, arg1) {
        var v0 = getArrayU8FromWasm0(arg0, arg1).slice();
        wasm.__wbindgen_free(arg0, arg1 * 1, 1);
        const ret = v0;
        return ret;
    };
    imports.wbg.__wbindgen_uint8_clamped_array_new = function(arg0, arg1) {
        var v0 = getClampedArrayU8FromWasm0(arg0, arg1).slice();
        wasm.__wbindgen_free(arg0, arg1 * 1, 1);
        const ret = v0;
        return ret;
    };
    imports['__wbindgen_placeholder__'] = __wbg_star0;

    return imports;
}

function __wbg_init_memory(imports, memory) {

}

function __wbg_finalize_init(instance, module) {
    wasm = instance.exports;
    __wbg_init.__wbindgen_wasm_module = module;
    cachedBigInt64ArrayMemory0 = null;
    cachedBigUint64ArrayMemory0 = null;
    cachedDataViewMemory0 = null;
    cachedFloat32ArrayMemory0 = null;
    cachedFloat64ArrayMemory0 = null;
    cachedInt16ArrayMemory0 = null;
    cachedInt32ArrayMemory0 = null;
    cachedInt8ArrayMemory0 = null;
    cachedUint16ArrayMemory0 = null;
    cachedUint32ArrayMemory0 = null;
    cachedUint8ArrayMemory0 = null;
    cachedUint8ClampedArrayMemory0 = null;


    wasm.__wbindgen_start();
    return wasm;
}

function initSync(module) {
    if (wasm !== undefined) return wasm;


    if (typeof module !== 'undefined') {
        if (Object.getPrototypeOf(module) === Object.prototype) {
            ({module} = module)
        } else {
            console.warn('using deprecated parameters for `initSync()`; pass a single object instead')
        }
    }

    const imports = __wbg_get_imports();

    __wbg_init_memory(imports);

    if (!(module instanceof WebAssembly.Module)) {
        module = new WebAssembly.Module(module);
    }

    const instance = new WebAssembly.Instance(module, imports);

    return __wbg_finalize_init(instance, module);
}

async function __wbg_init(module_or_path) {
    if (wasm !== undefined) return wasm;


    if (typeof module_or_path !== 'undefined') {
        if (Object.getPrototypeOf(module_or_path) === Object.prototype) {
            ({module_or_path} = module_or_path)
        } else {
            console.warn('using deprecated parameters for the initialization function; pass a single object instead')
        }
    }

    if (typeof module_or_path === 'undefined') {
        module_or_path = new URL('tvix_wasm_bg.wasm', import.meta.url);
    }
    const imports = __wbg_get_imports();

    if (typeof module_or_path === 'string' || (typeof Request === 'function' && module_or_path instanceof Request) || (typeof URL === 'function' && module_or_path instanceof URL)) {
        module_or_path = fetch(module_or_path);
    }

    __wbg_init_memory(imports);

    const { instance, module } = await __wbg_load(await module_or_path, imports);

    return __wbg_finalize_init(instance, module);
}

export { initSync };
export default __wbg_init;
