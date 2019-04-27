import {HttpErrorResponse} from "@angular/common/http";
import {ErrorHandler, Injectable, Injector} from "@angular/core";
import {MSG_ERROR} from "./constants-messages";
import {NotificationsService} from "./notifications/notifications.service";
import {LoginService} from "../security/login/login.service";
import {Router} from "@angular/router";

@Injectable()
export class HandlerErrorMessage extends ErrorHandler {

  constructor(private notificationsService: NotificationsService,
              private injector: Injector) {
    super();
  }

  public handleError(errorResponse: HttpErrorResponse | any) {
    console.log("handleError");
    this.notificationsService.notify("error", MSG_ERROR, this.getErrorMessage(errorResponse));
    super.handleError(errorResponse);
  }

  public getErrorMessage(error: any): string {

    console.log(error);

    switch (error.status) {
      case 401:
        this.injector.get(LoginService).logout();
        this.injector.get(LoginService).handleLogin(this.injector.get(Router).url);
        break;
    }

    let errorMessage: string = "";
    if (error instanceof HttpErrorResponse) {
      if (error.error) {
        if (error.error[0])
          errorMessage = error.error[0].msgUser;
        else if (error.error) {
          const errorDescription = error.error.error_description;
          if (errorDescription === "Bad credentials")
            errorMessage = "Dados de Login inválidos";
          else
            errorMessage = errorDescription;
        } else
          errorMessage = error.message;
      }
    }

    if (errorMessage === undefined || errorMessage.length === 0)
      errorMessage = "Ocorreu um erro de acesso ao sistema";

    return errorMessage;
  }
  
}
