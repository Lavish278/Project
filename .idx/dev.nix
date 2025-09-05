{ pkgs, ... }: {
  # Which nixpkgs channel to use.
  channel = "stable-23.11"; # Or "unstable"

  # Use https://search.nixos.org/packages to find packages
  packages = [
    pkgs.nodejs_20 # Pinned to a specific major version
    pkgs.npm
  ];

  # Sets environment variables in the workspace
  env = {};

  # Search for the starship package in the nixpkgs channel and install it
  init = {
    # This script will be run when the workspace is first created, and when it's restarted.
    # It can be used to install dependencies, initialize a database, etc.
  };

  # The terminal prompt for the workspace
  prompt = '''
    \[\033[38;5;214m\][\[\e[0m\] \w \[\033[38;5;214m\]]\[\e[0m\] \[\033[38;5;75m\]$\[\e[0m\]
  ''';
}
