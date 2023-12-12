FROM nixos/nix
COPY default.nix /default.nix
RUN nix-shell --run "echo hello"
CMD nix-shell /default.nix
