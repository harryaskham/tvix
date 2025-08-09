mod generated;

use wasm_bindgen::prelude::*;
use std::rc::Rc;
use std::collections::HashMap;
use std::{io, path::{Path, PathBuf}};
use std::io::{Cursor, Write};
use tvix_eval::observer::{DisassemblingObserver, TracingObserver};

#[wasm_bindgen]
extern "C" {
    #[wasm_bindgen(js_namespace = console)]
    fn log(s: &str);
}

// Structure to hold debug information
struct DebugResult {
    value: String,
    ast: String,
    bytecode: String,
    trace: String,
}

// Virtual filesystem for embedded nix files
pub struct VirtualFilesystemIO {
    files: HashMap<String, String>,
    embedded_paths: Vec<String>, // Track embedded directory names for NIX_PATH
}

impl VirtualFilesystemIO {
    pub fn new() -> Self {
        let mut fs = HashMap::new();
        let mut embedded_paths = Vec::new();
        
        // Embed all directories from embedded/
        Self::embed_directory(&mut fs, &mut embedded_paths);
        
        log(&format!("VFS: VirtualFilesystemIO created with {} files", fs.len()));
        log(&format!("VFS: Embedded paths: {}", embedded_paths.join(", ")));
        log(&format!("VFS: Sample files: {}", fs.keys().take(5).cloned().collect::<Vec<_>>().join(", ")));
        
        Self { files: fs, embedded_paths }
    }
    
    // Generate NIX_PATH from embedded directories
    pub fn get_nix_path(&self) -> String {
        self.embedded_paths
            .iter()
            .map(|name| format!("{}=embedded/{}", name, name))
            .collect::<Vec<_>>()
            .join(":")
    }
    
    fn embed_directory(fs: &mut HashMap<String, String>, embedded_paths: &mut Vec<String>) {
        generated::embed_directory(fs, embedded_paths);
    }
}

impl tvix_eval::EvalIO for VirtualFilesystemIO {
    fn path_exists(&self, path: &Path) -> io::Result<bool> {
        log(&format!("VFS: *** path_exists called with: {}", path.display()));
        let path_str = path.to_string_lossy();
        let normalized_path = path_str.trim_end_matches('/');
        let without_leading_slash = path_str.trim_start_matches('/');
        
        // Also try with embedded/ prefix for absolute paths
        let with_embedded_prefix = if path_str.starts_with('/') && !path_str.starts_with("/embedded/") {
            format!("embedded{}", path_str)
        } else {
            path_str.to_string()
        };
        let embedded_without_slash = with_embedded_prefix.trim_start_matches('/');
        
        // Check if it's a file (try multiple variations)
        if self.files.contains_key(path_str.as_ref()) || 
           self.files.contains_key(normalized_path) ||
           self.files.contains_key(without_leading_slash) ||
           self.files.contains_key(&with_embedded_prefix) ||
           self.files.contains_key(embedded_without_slash) {
            return Ok(true);
        }
        
        // Check if it's a directory (try both with and without leading slash)
        let dir_prefixes = vec![
            if normalized_path.is_empty() { String::new() } else { format!("{}/", normalized_path) },
            if without_leading_slash.is_empty() { String::new() } else { format!("{}/", without_leading_slash) },
            if with_embedded_prefix.trim_end_matches('/').is_empty() { String::new() } else { format!("{}/", with_embedded_prefix.trim_end_matches('/')) },
            if embedded_without_slash.trim_end_matches('/').is_empty() { String::new() } else { format!("{}/", embedded_without_slash.trim_end_matches('/')) },
        ];
        
        let exists = dir_prefixes.iter().any(|prefix| 
            !prefix.is_empty() && self.files.keys().any(|key| key.starts_with(prefix))
        );
        
        log(&format!("VFS: path_exists({}) -> {} (tried: {:?})", path_str, exists, dir_prefixes));
        Ok(exists)
    }

    fn open(&self, path: &Path) -> io::Result<Box<dyn io::Read>> {
        let path_str = path.to_string_lossy();
        let without_leading_slash = path_str.trim_start_matches('/');
        
        // Also try with embedded/ prefix for absolute paths
        let with_embedded_prefix = if path_str.starts_with('/') && !path_str.starts_with("/embedded/") {
            format!("embedded{}", path_str)
        } else {
            path_str.to_string()
        };
        let embedded_without_slash = with_embedded_prefix.trim_start_matches('/');
        
        // Debug: Log what files are being requested  
        log(&format!("VFS: open called with: {}", path_str));
        log(&format!("VFS: Available files: {}", self.files.keys().take(3).cloned().collect::<Vec<_>>().join(", ")));
        
        // Try multiple path variations
        let path_variations = vec![
            path_str.as_ref(),
            without_leading_slash,
            &with_embedded_prefix,
            embedded_without_slash,
        ];
        
        for variant in &path_variations {
            if let Some(content) = self.files.get(*variant) {
                log(&format!("VFS: Found file with variant '{}': {}", variant, path_str));
                return Ok(Box::new(Cursor::new(content.clone().into_bytes())));
            }
        }
        
        // Try directory resolution - if this is a directory, try to find default.nix
        for variant in &path_variations {
            let default_nix_paths = vec![
                format!("{}/default.nix", variant.trim_end_matches('/')),
                format!("{}/default.nix", variant.trim_end_matches('/').trim_start_matches('/')),
            ];
            
            for default_path in &default_nix_paths {
                if let Some(content) = self.files.get(default_path) {
                    log(&format!("VFS: Found directory default.nix with path '{}' for directory '{}'", default_path, path_str));
                    return Ok(Box::new(Cursor::new(content.clone().into_bytes())));
                }
            }
        }
        
        // If the path looks malformed (contains a file.nix/other.nix pattern), try to fix it
        if path_str.contains(".nix/") {
            let corrected = path_str.replace(".nix/", ".nix/../");
            let normalized = PathBuf::from(corrected);
            if let Ok(canonical) = normalized.canonicalize().or_else(|_| {
                // Manual normalization for virtual paths
                let mut components = Vec::new();
                for component in normalized.components() {
                    match component {
                        std::path::Component::ParentDir => { components.pop(); },
                        std::path::Component::Normal(name) => components.push(name),
                        std::path::Component::RootDir => components.clear(),
                        _ => {}
                    }
                }
                Ok::<PathBuf, io::Error>(PathBuf::from("/").join(components.iter().collect::<PathBuf>()))
            }) {
                let canonical_str = canonical.to_string_lossy();
                if let Some(content) = self.files.get(canonical_str.as_ref()) {
                    return Ok(Box::new(Cursor::new(content.clone().into_bytes())));
                }
            }
        }
        
        // Try to find by filename if path resolution failed
        let filename = path.file_name().unwrap_or_default().to_string_lossy();
        for (file_path, content) in &self.files {
            if file_path.ends_with(&filename.to_string()) {
                return Ok(Box::new(Cursor::new(content.clone().into_bytes())));
            }
        }
        
        Err(io::Error::new(
            io::ErrorKind::NotFound,
            format!("File not found in virtual filesystem: {} (available files: {})", 
                   path_str, 
                   self.files.keys().take(5).cloned().collect::<Vec<_>>().join(", "))
        ))
    }

    fn file_type(&self, path: &Path) -> io::Result<tvix_eval::FileType> {
        log(&format!("VFS: file_type called with: {}", path.display()));
        let path_str = path.to_string_lossy();
        let normalized_path = path_str.trim_end_matches('/');
        let without_leading_slash = path_str.trim_start_matches('/');
        
        // Also try with embedded/ prefix for absolute paths
        let with_embedded_prefix = if path_str.starts_with('/') && !path_str.starts_with("/embedded/") {
            format!("embedded{}", path_str)
        } else {
            path_str.to_string()
        };
        let embedded_without_slash = with_embedded_prefix.trim_start_matches('/');
        
        // Check if it's a file (try multiple variations)
        let file_variations = vec![
            path_str.as_ref(),
            normalized_path,
            without_leading_slash,
            &with_embedded_prefix,
            embedded_without_slash,
        ];
        
        for variant in &file_variations {
            if self.files.contains_key(*variant) {
                return Ok(tvix_eval::FileType::Regular);
            }
        }
        
        // Check if it's a directory by seeing if we have files under this path
        let dir_prefixes = vec![
            if normalized_path.is_empty() { String::new() } else { format!("{}/", normalized_path) },
            if without_leading_slash.is_empty() { String::new() } else { format!("{}/", without_leading_slash) },
            if with_embedded_prefix.trim_end_matches('/').is_empty() { String::new() } else { format!("{}/", with_embedded_prefix.trim_end_matches('/')) },
            if embedded_without_slash.trim_end_matches('/').is_empty() { String::new() } else { format!("{}/", embedded_without_slash.trim_end_matches('/')) },
        ];
        
        let is_dir = dir_prefixes.iter().any(|prefix| 
            !prefix.is_empty() && self.files.keys().any(|key| key.starts_with(prefix))
        );
        
        if is_dir {
            Ok(tvix_eval::FileType::Directory)
        } else {
            log(&format!("VFS: Path not found for file_type: {} (tried: {:?})", path_str, dir_prefixes));
            log(&format!("VFS: Available files: {:?}", self.files.keys().take(3).collect::<Vec<_>>()));
            Err(io::Error::new(
                io::ErrorKind::NotFound,
                format!("VFS file_type: Path not found: {}", path_str)
            ))
        }
    }

    fn read_dir(&self, path: &Path) -> io::Result<Vec<(bytes::Bytes, tvix_eval::FileType)>> {
        let path_str = path.to_string_lossy();
        let normalized_path = path_str.trim_end_matches('/');
        let dir_prefix = if normalized_path.is_empty() { 
            String::new() 
        } else { 
            format!("{}/", normalized_path) 
        };
        
        log(&format!("VFS: Reading directory: {} (prefix: {})", path_str, dir_prefix));
        
        let mut entries = Vec::new();
        let mut seen = std::collections::HashSet::new();
        
        for file_path in self.files.keys() {
            if file_path.starts_with(&dir_prefix) {
                let relative = &file_path[dir_prefix.len()..];
                if !relative.is_empty() {
                    // Get the first component (either a filename or directory name)
                    let component = if let Some(slash_pos) = relative.find('/') {
                        &relative[..slash_pos]
                    } else {
                        relative
                    };
                    
                    if !component.is_empty() && !seen.contains(component) {
                        seen.insert(component.to_string());
                        let is_dir = relative.contains('/');
                        entries.push((
                            bytes::Bytes::from(component.to_string()),
                            if is_dir { tvix_eval::FileType::Directory } else { tvix_eval::FileType::Regular }
                        ));
                    }
                }
            }
        }
        
        log(&format!("VFS: Found {} entries in directory", entries.len()));
        Ok(entries)
    }

    fn import_path(&self, path: &Path) -> io::Result<PathBuf> {
        log(&format!("VFS: import_path called with: {}", path.display()));
        
        // Check if the path exists in virtual filesystem first
        if !self.path_exists(path)? {
            return Err(io::Error::new(
                io::ErrorKind::NotFound,
                format!("Import path not found in virtual filesystem: {}", path.display())
            ));
        }
        
        // Handle directory imports by looking for default.nix
        let path_str = path.to_string_lossy();
        
        // If the path is a directory, try to find default.nix in it
        if path_str.ends_with("/") || matches!(self.file_type(path), Ok(tvix_eval::FileType::Directory)) {
            let default_nix_path = format!("{}/default.nix", path_str.trim_end_matches('/'));
            if self.files.contains_key(&default_nix_path) {
                log(&format!("VFS: Directory import resolved to: {}", default_nix_path));
                return Ok(PathBuf::from(default_nix_path));
            }
        }
        
        // For file imports, return the path as-is if it exists as a file
        if self.files.contains_key(path_str.as_ref()) {
            return Ok(path.to_path_buf());
        }
        
        // Try to find a matching file in our virtual filesystem for relative imports
        for file_path in self.files.keys() {
            if file_path.ends_with(&path_str.to_string()) {
                log(&format!("VFS: Found matching file: {}", file_path));
                return Ok(PathBuf::from(file_path));
            }
        }
        
        let normalized = path.to_path_buf();
        
        log(&format!("VFS: import_path returning: {}", normalized.display()));
        Ok(normalized)
    }

    fn store_dir(&self) -> Option<String> {
        Some("/nix/store".to_string())
    }
}


#[wasm_bindgen]
pub struct TvixEvaluator {
    globals: Option<Rc<tvix_eval::GlobalsMap>>,
    source_map: Option<tvix_eval::SourceCode>,
    vfs: Rc<VirtualFilesystemIO>,
}

#[wasm_bindgen]
impl TvixEvaluator {
    #[wasm_bindgen(constructor)]
    pub fn new() -> Self {
        console_error_panic_hook::set_once();
        
        // Create VFS once and reuse it for all evaluations to enable import caching
        let vfs = VirtualFilesystemIO::new();
        log(&format!("eval: Created persistent VFS with {} embedded files", vfs.files.len()));
        
        Self { 
            globals: None,
            source_map: None,
            vfs: Rc::new(vfs),
        }
    }

    // Helper to extract the most relevant error from nested error chains
    fn extract_root_cause(error_kind: &tvix_eval::ErrorKind) -> String {
        use tvix_eval::ErrorKind;
        
        match error_kind {
            ErrorKind::BytecodeError(inner) => Self::extract_root_cause(&inner.kind),
            ErrorKind::NativeError { err, .. } => Self::extract_root_cause(&err.kind),
            ErrorKind::UnknownDynamicVariable(var) => format!("Unknown variable: {}", var),
            ErrorKind::TypeError { expected, actual } => format!("Type error: expected {}, got {}", expected, actual),
            ErrorKind::AttributeNotFound { name } => format!("Attribute not found: {}", name),
            ErrorKind::IndexOutOfBounds { index } => format!("Index out of bounds: {}", index),
            ErrorKind::InvalidAttributeName(_) => "Invalid attribute name".to_string(),
            ErrorKind::NotImplemented(_) => "Feature not implemented".to_string(),
            ErrorKind::InfiniteRecursion { .. } => "Infinite recursion detected".to_string(),
            ErrorKind::ParseErrors(_) => "Parse error".to_string(),
            ErrorKind::DuplicateAttrsKey { .. } => "Duplicate attribute key".to_string(),
            ErrorKind::DivisionByZero => "Division by zero".to_string(),
            ErrorKind::NotCoercibleToString { .. } => "Value cannot be coerced to string".to_string(),
            ErrorKind::CatchableError(catchable) => format!("Runtime error: {}", catchable),
            _ => format!("{}", error_kind),
        }
    }

    #[wasm_bindgen]
    pub fn evaluate(&mut self, expression: &str, raw: bool) -> Result<String, JsValue> {
        self.evaluate_with_settings(expression, raw, false, false, false, false, false)
    }
    
    #[wasm_bindgen]
    pub fn evaluate_with_debug_info(
        &mut self, 
        expression: &str, 
        raw: bool, 
        pretty_print_ast: bool,
        display_ast: bool, 
        dump_bytecode: bool, 
        trace_runtime: bool, 
        strict: bool
    ) -> Result<JsValue, JsValue> {
        let result = self.evaluate_with_settings_internal(
            expression, raw, pretty_print_ast, display_ast, 
            dump_bytecode, trace_runtime, strict
        )?;
        
        // Convert to JavaScript object
        let debug_result = js_sys::Object::new();
        js_sys::Reflect::set(&debug_result, &"result".into(), &result.value.into())?;
        js_sys::Reflect::set(&debug_result, &"ast".into(), &result.ast.into())?;
        js_sys::Reflect::set(&debug_result, &"bytecode".into(), &result.bytecode.into())?;
        js_sys::Reflect::set(&debug_result, &"trace".into(), &result.trace.into())?;
        
        Ok(debug_result.into())
    }

    fn evaluate_with_settings_internal(
        &mut self, 
        expression: &str, 
        raw: bool, 
        pretty_print_ast: bool,
        display_ast: bool, 
        dump_bytecode: bool, 
        trace_runtime: bool, 
        strict: bool
    ) -> Result<DebugResult, JsValue> {
        log(&format!("eval: evaluate_with_settings_internal called with flags: display_ast={}, dump_bytecode={}, trace_runtime={}, strict={}, pretty_print_ast={}", 
            display_ast, dump_bytecode, trace_runtime, strict, pretty_print_ast));

        // Reuse the persistent VFS for import caching
        let nix_path = self.vfs.get_nix_path();
        log(&format!("eval: Using persistent VFS with {} files for import caching", self.vfs.files.len()));
        log(&format!("eval: NIX_PATH: {}", nix_path));
        
        let io_handle = self.vfs.clone() as Rc<dyn tvix_eval::EvalIO>;
        let mut eval_builder = tvix_eval::Evaluation::builder(io_handle)
            .enable_import()
            .nix_path(Some(nix_path));
            
        // Apply debug settings to evaluation builder
        if strict {
            eval_builder = eval_builder.mode(tvix_eval::EvalMode::Strict);
        }
        
        log("eval: Evaluation builder configured with custom IO and NIX_PATH");
        
        if let Some(globals) = &self.globals {
            eval_builder = eval_builder.with_globals(globals.clone());
        }
        
        // Reuse source map for better import caching across evaluations
        if let Some(ref source_map) = self.source_map {
            eval_builder = eval_builder.with_source_map(source_map.clone());
        }

        // Prepare debug info capture
        let mut ast_output = String::new();
        
        // Capture the source map for preservation after evaluation
        let current_source_map = eval_builder.source_map().clone();
        
        // Create the evaluation with observers - we need to manage lifetimes carefully
        let (result, globals, bytecode_str, trace_str) = if dump_bytecode || trace_runtime {
            // We need to capture observer output, so we create buffers and observers
            let mut bytecode_buffer = Vec::new();
            let mut trace_buffer = Vec::new();
            
            // Set up observers
            let source_map = eval_builder.source_map().clone();
            
            // Create observers that will capture to our buffers
            let mut compiler_observer = if dump_bytecode {
                Some(DisassemblingObserver::new(source_map.clone(), &mut bytecode_buffer))
            } else {
                None
            };
            
            let mut runtime_observer = if trace_runtime {
                Some(TracingObserver::new(&mut trace_buffer))
            } else {
                None
            };
            
            // Set the observers on the builder
            if let Some(ref mut obs) = compiler_observer {
                eval_builder.set_compiler_observer(Some(obs));
            }
            if let Some(ref mut obs) = runtime_observer {
                eval_builder.set_runtime_observer(Some(obs));
            }

            let eval = eval_builder.build();
            let globals = eval.globals();
            let dummy_path = std::path::PathBuf::from("/embedded");
            
            log(&format!("eval: About to evaluate expression: {}", expression));
            let result = eval.evaluate(expression, Some(dummy_path));
            log(&format!("eval: Evaluation completed with {} errors", result.errors.len()));
            
            // Explicitly drop the observers to release the borrow
            drop(compiler_observer);
            drop(runtime_observer);
            
            // Now we can safely access the buffers
            let captured_bytecode = String::from_utf8_lossy(&bytecode_buffer).to_string();
            let captured_trace = String::from_utf8_lossy(&trace_buffer).to_string();
            
            (result, globals, captured_bytecode, captured_trace)
        } else {
            // No observers needed - simpler path
            let eval = eval_builder.build();
            let globals = eval.globals();
            let dummy_path = std::path::PathBuf::from("/embedded");
            
            log(&format!("eval: About to evaluate expression: {}", expression));
            let result = eval.evaluate(expression, Some(dummy_path));
            log(&format!("eval: Evaluation completed with {} errors", result.errors.len()));
            
            (result, globals, String::new(), String::new())
        };
        
        // Capture AST if requested
        if display_ast || pretty_print_ast {
            if let Some(ref expr) = result.expr {
                ast_output = tvix_eval::pretty_print_expr(expr);
            }
        }

        if !result.errors.is_empty() {
            let mut error_msg = String::new();
            for (i, error) in result.errors.iter().enumerate() {
                if i > 0 {
                    error_msg.push_str("\n\n");
                }
                // Extract the root cause from nested errors
                let root_cause = Self::extract_root_cause(&error.kind);
                let span_info = format!("Span: {:?}", error.span);
                
                error_msg.push_str(&format!("Error {}: {}\nRoot cause: {}\nLocation: {}\nCall stack: {:?}", 
                    i + 1, 
                    error.kind,
                    root_cause,
                    span_info,
                    error.contexts
                ));
            }
            return Err(JsValue::from_str(&error_msg));
        }

        if let Some(value) = result.value {
            // Preserve the evaluation state for import caching and globals
            self.globals = Some(globals);
            // Preserve the updated source map - this helps maintain import cache state
            self.source_map = Some(current_source_map);
            
            // In strict mode, the value should be fully forced, but let's ensure proper conversion
            let typed_value: Result<String, String> = Ok(format!("{} :: {}", value, value.type_of()));
            
            // Try to convert to string - handle both contextful and regular display
            let raw_value: Result<String, String> = match value.to_contextful_str() {
                Ok(contextful) => Ok(contextful.to_string()),
                Err(_) => {
                    // If contextful conversion fails, try regular display
                    // The strict mode should have forced most thunks already
                    let display_str = format!("{}", value);
                    if display_str.contains("thunk(blackhole)") {
                        log(&format!("eval: Warning - found unforced thunk in output: {}", display_str));
                        Ok(format!("(unforced thunk - try enabling strict mode)"))
                    } else {
                        Ok(display_str)
                    }
                }
            };
            let out_value = if raw { raw_value.or(typed_value) } else { typed_value };
            match out_value {
                Ok(v) => {
                    log(&format!("eval: Returning value: {}", v));
                    
                    Ok(DebugResult {
                        value: v,
                        ast: ast_output,
                        bytecode: bytecode_str,
                        trace: trace_str,
                    })
                },
                Err(e) => {
                    log(&format!("eval: Evaluation error: {}", e.to_string()));
                    Err(JsValue::from_str(&e.to_string()))
                }
            }
        } else {
            Err(JsValue::from_str("No value returned from evaluation"))
        }
    }

    #[wasm_bindgen]
    pub fn evaluate_with_settings(
        &mut self, 
        expression: &str, 
        raw: bool, 
        pretty_print_ast: bool,
        display_ast: bool, 
        dump_bytecode: bool, 
        trace_runtime: bool, 
        strict: bool
    ) -> Result<String, JsValue> {
        let result = self.evaluate_with_settings_internal(
            expression, raw, pretty_print_ast, display_ast, 
            dump_bytecode, trace_runtime, strict
        )?;
        
        Ok(result.value)
    }
}
