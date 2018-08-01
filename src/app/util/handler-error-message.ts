export class HandlerErrorMessage {

  
  public getErrorMessage(error: any): string {
    let errorMessage: string = "";
    let errorJson;
    if (typeof(error.json) !== "undefined")
      errorJson = error.json();
    if (typeof(errorJson) !== "undefined") {
      if (errorJson[0] !== null && errorJson[0].msgUser !== null) {
        errorMessage = errorJson[0].msgUser;
      } else if (errorJson.message) {
        errorMessage = errorJson.message;
      }
    } else if (typeof(error.error) !== "undefined") {
      if (error.error[0] !== null && error.error[0] !== undefined) {
        errorMessage = error.error[0].msgUser;
      } else if (error.error.error_description) {
        errorMessage = error.error.error_description;
      }
    }

    if (errorMessage === undefined || errorMessage.length === 0)
      errorMessage = "Ocorreu um erro de acesso ao sistema";
    
    return errorMessage;
  }
  
}
