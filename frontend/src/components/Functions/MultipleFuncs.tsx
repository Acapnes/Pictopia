export class MultiFuncs {
  public static async AlertTimer(objectId: string, hidden?: boolean) {
    document.getElementById(objectId)!.className = "opacity-100";
    setTimeout(() => {
      document.getElementById(objectId)!.className = "duration-500 opacity-0";
    }, 2000);
    if (hidden) {
      setTimeout(() => {
        document.getElementById(objectId)!.className = "hidden";
      }, 2500);
    }
  }

  public static async TabChange(
    currentTabId: string,
    targetTabId: string,
    direction: boolean
  ) {
    direction
      ? (document.getElementById(currentTabId)!.className =
          "transform -translate-x-8 transition opacity-0 duration-300 ease-in-out")
      : (document.getElementById(currentTabId)!.className =
          "transform translate-x-8 transition duration-300 opacity-0 ease-in-out");
    setTimeout(() => {
      document.getElementById(targetTabId)!.className = "block";
      document.getElementById(currentTabId)!.className = "hidden";
    }, 300);
  }

  public static async GetAccessToken() {
    if (window.localStorage.getItem("access_token")) {
      return window.localStorage.getItem("access_token");
    }
  }

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
