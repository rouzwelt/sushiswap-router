let
    pkgs = import
        (builtins.fetchTarball {
            name = "nixos-unstable-2022-09-26";
            url = "https://github.com/nixos/nixpkgs/archive/b8e83fd7e16529ee331313993508c3bf918f1d57.tar.gz";
            sha256 = "1a98pgnhdhyg66176i36rcn3rklihy36y9z4176la7pxlzm4khwf";
        })
        { };


    local-test = pkgs.writeShellScriptBin "local-test" ''
        npm test
    '';

    flush = pkgs.writeShellScriptBin "flush" ''
        rm -rf node_modules
        rm -rf dist
    '';

    lint = pkgs.writeShellScriptBin "lint" ''
        npm run lint
    '';

    lint-fix = pkgs.writeShellScriptBin "lint-fix" ''
        npm run lint:fix
    '';

    build = pkgs.writeShellScriptBin "build" ''
        npm run build
    '';

    in
    pkgs.stdenv.mkDerivation {
        name = "shell";
        buildInputs = [
            pkgs.watch
            pkgs.nixpkgs-fmt
            pkgs.nodejs-18_x
            pkgs.nodePackages.pnpm
            local-test
            flush
            lint
            lint-fix
            build
        ];

        shellHook = ''
            export PATH=$( npm bin ):$PATH
            # keep it fresh
            npm install --ignore-scripts
        '';
    }
