import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {URL_API} from "../../util/url-api";
import {Observable} from "rxjs";
import 'rxjs/add/operator/do';
import {Router} from "@angular/router";
import {LOGGED_USER} from "../../util/constants";
import {User} from "./user.model";
import {JwtHelperService} from "@auth0/angular-jwt";

@Injectable()
export class LoginService {

  private loginUrl: string = `${URL_API}oauth/token`;

  private userUrl: string = `${URL_API}users/`;

  private deleteTokenUrl: string = `${URL_API}tokens/revoke`;

  jwtHelper: JwtHelperService = new JwtHelperService();

  private headers: HttpHeaders = new HttpHeaders(
    {"Content-Type": "application/x-www-form-urlencoded",
            "Authorization": "Basic " + btoa('angular' + ':' + '@ngul@r0')});

  constructor(private http: HttpClient, private router: Router) { }

  public isUserLogged(): boolean {
    return localStorage.getItem(LOGGED_USER) !== null;
  }

  public login(name: string, password: string): Observable<any> {
    const body: HttpParams = new HttpParams()
      .set("username", name).set("password", password).set("client", "angular").set("grant_type", "password");
    return this.http.post<any>(this.loginUrl, body.toString(), {headers: this.headers})
      .do(userLoggedIn => {
        const user = userLoggedIn;
        const decodedToken = this.jwtHelper.decodeToken(userLoggedIn.access_token);
        console.log(decodedToken);
        user.name = decodedToken.user_name;
        user.permissions = decodedToken.authorities;
        localStorage.setItem(LOGGED_USER, JSON.stringify(user));
      });
  }

  public getUser(username: string): Observable<User> {
    return this.http.get<User>(`${this.userUrl}${username}`);
  }

  public handleLogin(path?: string) {
    if (path)
      this.router.navigate(['/login', path]);
    else
      this.router.navigate(['/login']);
  }

  public logout(): Observable<any> {
    console.log("logout");
    localStorage.clear();
    return this.http.delete(this.deleteTokenUrl);
  }

  public getLoggedUser(): User {
    return JSON.parse(localStorage.getItem(LOGGED_USER));
  }

}
