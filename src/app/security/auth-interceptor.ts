import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {Injectable, Injector} from "@angular/core";
import {LoginService} from "./login/login.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private injector: Injector) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const loginService: LoginService = this.injector.get(LoginService);
    if (loginService.isUserLogged()) {
      const authRequest = req.clone(
        {setHeaders: {"Authorization": `Bearer ${loginService.getLoggedUser().access_token}`}});

      return next.handle(authRequest);
    } else {
      return next.handle(req);
    }
  }
}
