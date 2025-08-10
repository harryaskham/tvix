let
  strict = x: builtins.deepSeq x x;

  try = x: y:
    let r = builtins.tryEval (strict x);
    in if r.success or false then r.value else y;

  nuke = { state = "armed"; defuseCode = 5555; };

  assertDefuse = code: nuke:
    nuke // {
      state =
        assert code == nuke.defuseCode;
        "defused";
    };

  launch = nuke: reason: nuke // {
    state = "launched";
    inherit reason;
  };

  defuse = code: nuke:
    try
      (assertDefuse code nuke)
      (launch nuke "incorrect defuse code ${toString code}; launching!");

in defuse 0000 nuke
