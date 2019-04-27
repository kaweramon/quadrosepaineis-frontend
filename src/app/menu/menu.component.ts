import {AfterViewChecked, ChangeDetectorRef, Component, Injector, OnInit} from '@angular/core';
import * as $ from "jquery";
import {LoginService} from "../security/login/login.service";
import {User} from "../security/login/user.model";
import {LOGGED_USER} from "../util/constants";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit, AfterViewChecked {

  public showMenuProduct: string = "";

  constructor(private injector: Injector, private cd: ChangeDetectorRef) { }

  public user: User;

  ngOnInit() {

  }

  public hideIconMenu(): void {
    $("#navbarNav").removeClass("show");
  }

  public toogleMenuProducts(): void {
    this.showMenuProduct === "" ? this.showMenuProduct = "show" : "";
  }

  public hideMenuProduct(): void {
    this.showMenuProduct = "";
  }

  public tootleMenu(): void {
    const menu = $("#navbarNav");
    if (menu.hasClass("show"))
      menu.removeClass("show");
    else
      menu.addClass("show");
  }

  public isLoggedIn(): boolean {
    return this.injector.get(LoginService).isUserLogged();
  }

  public logout(): void {
    this.injector.get(LoginService).logout().subscribe(() => {
      localStorage.clear();
    }, error => {
      console.log(error);
    }, () => {
      this.injector.get(LoginService).handleLogin();
    });
  }

  ngAfterViewChecked(): void {
    $(".navbar-nav > li").click(function () {
      $("#navbarNav").removeClass("show");
    });
    this.user = JSON.parse(localStorage.getItem(LOGGED_USER));
    this.cd.detectChanges();
  }

}
