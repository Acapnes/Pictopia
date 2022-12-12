export class MultiFuncs {
  public static async UrlParam() {
    return await window.location.href.split("/")[
      window.location.href.split("/").length - 1
    ];
  }

  public static ParamController(params: any[]) {
    for (let i = 0; i < params.length; i++) {
      if (params[i] === null || params[i] === "" || params[i] === " " || params[i] === undefined)
        return false;
    }
    return true;
  }
}
