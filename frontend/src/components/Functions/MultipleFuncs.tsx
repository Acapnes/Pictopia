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

  
}
