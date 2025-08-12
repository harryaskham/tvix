let
  name = "Tvix";
  version = "0.1.0";
in
{
  greeting = "Hello from ${name} ${version}!";
  numbers = [ 1 2 3 4 5 ];
  config = {
    debug = true;
    timeout = 30;
  };
}