import {HttpErrorResponse} from "@angular/common/http";

export class HandlerErrorMessage {

  
  public getErrorMessage(error: any): string {
    console.log(error);
    let errorMessage: string = "";
    if (error instanceof HttpErrorResponse) {
      if (error.error) {
        if (error.error[0])
          errorMessage = error.error[0].msgUser;
        else if (error.error && error.error.error_description === "Bad credentials")
          errorMessage = "Dados de Login inválidos";
        else
          errorMessage = error.message;
      }
    }
    /*let errorJson;
    if (typeof(error.json) !== "undefined")
      errorJson = error.json();
    if (typeof(errorJson) !== "undefined") {
      console.log(errorJson.length);
      if (errorJson.length && typeof(errorJson[0]) !== undefined && typeof(errorJson[0].msgUser) !== undefined) {
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
    }*/

    if (errorMessage === undefined || errorMessage.length === 0)
      errorMessage = "Ocorreu um erro de acesso ao sistema";
    
    return errorMessage;
  }
  
}
