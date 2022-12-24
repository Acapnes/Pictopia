export class MultiFuncs {
  public static ParamController(params: any[]) {
    for (let i = 0; i < params.length; i++) {
      if (
        params[i] === null ||
        params[i] === "" ||
        params[i] === " " ||
        params[i] === undefined
      )
        return false;
    }
    return true;
  }
}
