# nixos-unstable. Find the current hash at https://status.nixos.org/.
{ nixpkgs ? import (fetchTarball "https://github.com/NixOS/nixpkgs/archive/33d42ad7cf2769ce6364ed4e52afa8e9d1439d58.tar.gz") {config.allowUnfree = true;}
}:

let
  pkgs = [
    nixpkgs.docker
    nixpkgs.docker-compose
    nixpkgs.git
    nixpkgs.nodejs-14_x
    nixpkgs.openssh
    nixpkgs.which
  ];

in
  nixpkgs.stdenv.mkDerivation {
    name = "gambit-dev";
    buildInputs = pkgs;
  }
