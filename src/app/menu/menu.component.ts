import {Component, OnInit} from '@angular/core';
import * as $ from "jquery";
import {LoginService} from "../security/login/login.service";
import {User} from "../security/login/user.model";
import {LOGGED_USER, USER} from "../util/constants";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(private loginService: LoginService) { }

  public user: User;

  ngOnInit() {
    $(".navbar-nav > li").click(function () {
      $("#navbarNav").removeClass("show");
    });
    this.user = JSON.parse(localStorage.getItem(LOGGED_USER));
  }

  public hideIconMenu(): void {
    $("#navbarNav").removeClass("show");
  }

  public tootleMenu(): void {
    const menu = $("#navbarNav");
    if (menu.hasClass("show"))
      menu.removeClass("show");
    else
      menu.addClass("show");
  }

  public isLoggedIn(): boolean {
    return this.loginService.isUserLogged();
  }

}
