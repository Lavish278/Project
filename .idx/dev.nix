{ pkgs, ... }: {
  # Which nixpkgs channel to use.
  channel = "stable-23.11"; # or "unstable"
  # Use https://search.nixos.org/packages to find packages
  packages = [
    pkgs.nodejs_20
  ];
  # Sets environment variables in the workspace
  env = {};
  services.mysql.enable = true;
  # Eg: to start a web server, add a service like this
  # services.caddy.enable = true;
  # services.caddy.virtualHosts."localhost:3000".extraConfig = ''
  #   reverse_proxy 127.0.0.1:8080
  # '';
  # and add a process to run the web server
  # processes.my-web-server.exec = "npm run start";

  # Useful for dev environments that are not supported by the built-in extensions
  # For example, to run a command that starts a LSP, you can use
  # processes.my-lsp.exec = "npm run lsp";
  # and then configure your editor to connect to the LSP via a socket.
}
