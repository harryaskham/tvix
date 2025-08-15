# Tvix WebAssembly Build System
.PHONY: all build clean eval generate-src help logs release restart run serve start stop cltv cltv-unexpected-keyboard cltv-parse-eval notebook cltv-repl

# Default optimization level for wasm-pack
WASM_PACK_FLAGS ?= --dev

# Default EMBED_NIX_PATH - dynamically resolved nixpkgs path
#EMBED_NIX_PATH ?= nixpkgs=$$(nix eval --impure --expr '<nixpkgs>')
EXTRA_NIX_PATH ?= ""
#EMBED_NIX_PATH ?= nixpkgs/lib=$$(nix eval --impure --expr '<nixpkgs/lib>'):$(EXTRA_NIX_PATH)
EMBED_NIX_PATH ?= nixpkgs=/tmp/nixpkgs:$(EXTRA_NIX_PATH)
CLTV_DIR ?= /home/harry/collective
CLTV ?= collective=/home/harry/collective
NIX_PARSEC ?= nix-parsec=$$(nix eval --raw "$(CLTV_DIR)\#inputs.nix-parsec.outPath")
NIX_REFLECT ?= nix-reflect=$$(nix eval --raw github:harryaskham/collective-public\#inputs.nix-reflect.outPath)
CLTV_NIX_PATH ?= $(CLTV):$(NIX_PARSEC):$(NIX_REFLECT)

copy-nixpkgs-lib:
	mkdir -p /tmp/nixpkgs
	sudo chown -R $(USER) /tmp/nixpkgs
	sudo chmod -R 777 /tmp/nixpkgs
	cp -r $$(nix eval --impure --expr '<nixpkgs/lib>') /tmp/nixpkgs/
	sudo chown -R $(USER) /tmp/nixpkgs
	sudo chmod -R 777 /tmp/nixpkgs

# Default target
all: generate-src build copy-files
	@echo "Build complete! Files copied to www/"

# Optimised wasm
release:
	$(MAKE) WASM_PACK_FLAGS="--release" all

# Generate the src/generated directory with embedded Nix files
generate-src: copy-nixpkgs-lib
	@echo "Writing out Rust library with static embedded paths"
	./generate-embedded-lib.sh "$(EMBED_NIX_PATH)"

# Build the WebAssembly module with wasm-pack
build:
	@echo "Building WebAssembly module..."
	@if command -v wasm-pack >/dev/null 2>&1; then \
		wasm-pack build --target web --out-dir pkg $(WASM_PACK_FLAGS); \
	elif command -v nix-shell >/dev/null 2>&1; then \
		echo "Using nix-shell to run wasm-pack..."; \
		nix-shell --command 'wasm-pack build --target web --out-dir pkg $(WASM_PACK_FLAGS)'; \
	else \
		echo "Error: Neither wasm-pack nor nix-shell found."; \
		echo "Please install wasm-pack: cargo install wasm-pack"; \
		echo "Or ensure nix-shell is available."; \
		exit 1; \
	fi
	@echo "Creating stub for __wbindgen_placeholder__ module..."
	@if [ -f pkg/tvix_wasm.js ]; then \
		sed -i "1i\\/* Auto-generated stub for __wbindgen_placeholder__ */" pkg/tvix_wasm.js; \
		sed -i "s/import \* as __wbg_star0 from '__wbindgen_placeholder__';/const __wbg_star0 = { __wbindgen_describe: function() { return 0; } };/" pkg/tvix_wasm.js; \
		echo "Created placeholder module stub"; \
	fi

# Copy built files to www directory
copy-files: build
	@echo "Copying built files to www directory..."
	cp pkg/tvix_wasm.js www/
	cp pkg/tvix_wasm_bg.wasm www/
	cp pkg/tvix_wasm_bg.wasm.d.ts www/
	cp pkg/tvix_wasm.d.ts www/
	@echo "Creating initial expression if EXPR is provided..."
	@if [ -n "$(EXPR)" ] && [ -f "$(EXPR)" ]; then \
		echo "Reading expression from file: $(EXPR)"; \
		./create-initial-expression.sh "$(EXPR)"; \
	elif [ -n "$(EXPR)" ]; then \
		echo "Using expression directly: $(EXPR)"; \
		./create-initial-expression.sh - "$(EXPR)"; \
	else \
		echo "No EXPR provided - using localStorage behavior"; \
		./create-initial-expression.sh; \
	fi

# Start the server in background
start:
	@echo "Starting development server on http://localhost:8089"
	@if [ -f .server.pid ]; then \
		if kill -0 `cat .server.pid` 2>/dev/null; then \
			echo "Server already running (PID: `cat .server.pid`)"; \
			exit 0; \
		else \
			rm -f .server.pid; \
		fi; \
	fi
	@cd www && { nohup python3 -m http.server 8089 > ../.server.log 2>&1 & echo $$! > ../.server.pid; }
	@sleep 0.2
	@echo "Server started in background (PID: `cat .server.pid`)"
	@echo "View logs with: make logs"

logs:
	@echo "Tailing server logs..."
	tail -f .server.log

# Stop the development server
stop:
	@if [ -f .server.pid ]; then \
		if kill -0 `cat .server.pid` 2>/dev/null; then \
			kill `cat .server.pid`; \
			rm -f .server.pid; \
			echo "Server stopped"; \
		else \
			echo "Server not running"; \
			rm -f .server.pid; \
		fi; \
	else \
		echo "No server PID file found"; \
	fi

# Restart the development server
restart: stop serve

# Evaluate a Nix expression using Node.js (usage: make EXPR='1 + 2' eval)
eval:
	@if [ -z "$(EXPR)" ]; then \
		echo "Usage: make EXPR='your expression here' eval"; \
		echo "Example: make EXPR='1 + 2' eval"; \
		exit 1; \
	fi
	@echo "Evaluating Nix expression: $(EXPR)"
	@if [ ! -f pkg/tvix_wasm.js ]; then \
		echo "WASM not built. Building first..."; \
		$(MAKE) build; \
	fi
	@cd pkg && node -e " \
		import('fs').then(fs => { \
			return import('./tvix_wasm.js').then(tvix => { \
				const wasmBytes = fs.readFileSync('./tvix_wasm_bg.wasm'); \
				return tvix.default(wasmBytes); \
			}); \
		}) \
		.then((tvix) => { \
			const evaluator = new tvix.TvixEvaluator(); \
			try { \
				const result = evaluator.evaluate('$(EXPR)'); \
				console.log('Result:', result); \
			} catch (err) { \
				console.error('Evaluation error:', err.message); \
			} \
		}) \
		.catch(err => console.error('WASM loading error:', err.message)); \
	"

# Start the development server in foreground
serve: start logs

# Combined dev + serve
run: all restart

repl:
	../target/release/tvix -I "$(EMBED_NIX_PATH)"

cltv-repl:
	$(MAKE) "EXTRA_NIX_PATH=$(CLTV_NIX_PATH)" repl

cltv:
	$(MAKE) "EXTRA_NIX_PATH=$(CLTV_NIX_PATH)" run

cltv-unexpected-keyboard:
	$(MAKE) "EXTRA_NIX_PATH=$(CLTV_NIX_PATH)" "EXPR=exprs/unexpected-keyboard.nix" run

cltv-parse-eval:
	$(MAKE) "EXTRA_NIX_PATH=$(CLTV_NIX_PATH)" "EXPR=exprs/parse-eval.nix" run

# Clean build artifacts
clean:
	@echo "Cleaning build artifacts..."
	rm -rf pkg/
	rm -rf target/
	rm -f www/tvix_wasm.js
	rm -f www/tvix_wasm_bg.wasm
	rm -f www/tvix_wasm_bg.wasm.d.ts
	rm -f www/tvix_wasm.d.ts
	rm -f .server.pid
	rm -f .server.log

	@echo "Cleaning generated source files..."
	rm -rf src/generated/ || true

# Help target
help:
	@echo "Tvix WebAssembly Build System"
	@echo ""
	@echo "Prerequisites:"
	@echo "  - wasm-pack (install with: cargo install wasm-pack OR use nix-shell)"
	@echo "  - Rust with wasm32-unknown-unknown target"
	@echo ""
	@echo "Available targets:"
	@echo "  all              - Build everything and copy files"
	@echo "  build            - Build WebAssembly module with wasm-pack"
	@echo "  generate-src     - Embed Nix files (EMBED_NIX_PATH configurable)"
	@echo "  copy-files       - Copy built files to www directory"
	@echo "  run              - Full dev build + start server in foreground"
	@echo "  serve            - Start development server in foreground"
	@echo "  start            - Start development server in background"
	@echo "  stop             - Stop background development server"
	@echo "  restart          - Restart background development server"
	@echo "  eval             - Evaluate Nix expression with Node.js (usage: make EXPR='1+2' eval)"
	@echo "  notebook         - Create .nixnb file from expressions (usage: make EXPRS='exprs/*.nix' notebook)"
	@echo "  clean            - Clean everything"
	@echo "  help             - Show this help message"
	@echo ""
	@echo "Environment Variables:"
	@echo "  EXPR             - Path to .nix file for initial editor content (usage: make EXPR=file.nix release)"
	@echo "                     or direct expression string (usage: make EXPR='1 + 2' release)"
	@echo "  EXPRS            - Glob pattern for .nix files to create notebook (usage: make EXPRS='exprs/*.nix' notebook)"
	@echo "  EMBED_NIX_PATH   - Nix search path for embedded VFS (default: nixpkgs/lib=...)"
	@echo "  EXTRA_NIX_PATH   - Additional paths for embedded VFS"

# Create a Nix notebook from expression files
notebook:
	@if [ -z "$(EXPRS)" ]; then \
		echo "Usage: make EXPRS='exprs/*.nix' notebook"; \
		echo "Example: make EXPRS='exprs/parse-eval.nix exprs/basic.nix' notebook"; \
		exit 1; \
	fi
	@echo "Creating notebook from expressions: $(EXPRS)"
	@./create-notebook.sh $(EXPRS)
