import { Component, OnInit } from '@angular/core';
import * as $ from "jquery";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    this.router.events.subscribe(event => {
      $("#navbarNav").removeClass("show");
      if (event instanceof NavigationEnd) {
        if (event.url.indexOf("products") !== -1)
          this.changeMenu("PRODUCTS");
        else if (event.url.indexOf("categories") !== -1)
          this.changeMenu("CATEGORIES");
      }
    }, error => {
      console.log(error);
    });
  }

  public changeMenu(menu: string): void {
    $(".navbar-nav > li").removeClass("active");
    console.log($("#menu-item-" + menu));
    $("#menu-item-" + menu).addClass("active");
  }

  public tootleMenu(): void {
    const menu = $("#navbarNav");
    if (menu.hasClass("show"))
      menu.removeClass("show");
    else
      menu.addClass("show");
  }

}
