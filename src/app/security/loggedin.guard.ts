import {ActivatedRouteSnapshot, CanActivate, CanLoad, Route, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {LoginService} from "./login/login.service";
import {tokenNotExpired} from "angular2-jwt";
import {User} from "./login/user.model";

@Injectable()
export class LoggedinGuard implements CanLoad, CanActivate {

  constructor(private loginService: LoginService) {}

  private checkAuthentication(path: string): boolean {
    const isLoggedIn: boolean = this.loginService.isUserLogged();
    // const user: User = this.loginService.getLoggedUser();
    // console.log(user, !tokenNotExpired(this.loginService.getLoggedUser().access_token));
    if (!isLoggedIn) {
      this.loginService.handleLogin(`/${path}`);
    }
    return isLoggedIn;
  }

  canLoad(route: Route): Observable<boolean> | Promise<boolean> | boolean {
    return this.checkAuthentication(route.path);
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
      Observable<boolean> | Promise<boolean> | boolean {
    return this.checkAuthentication(route.routeConfig.path);
  }



}
