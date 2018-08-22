import {Component, OnInit} from '@angular/core';
import {ISubscription} from "../../../../node_modules/rxjs/Subscription";
import {NotificationsService} from "./notifications.service";
import {Message} from "primeng/primeng";

@Component({
  selector: 'app-notifications',
  template: `<p-growl [value]="msgs"></p-growl>`,
  styles: []
})
export class NotificationsComponent implements OnInit {

  msgs: Message[] = [];
  private sub: ISubscription;

  constructor(private notificationsService: NotificationsService) { }

  ngOnInit() {
    this.sub = this.notificationsService.notificationChange.subscribe(notification => {
      this.msgs = [];
      this.msgs.push(notification);
    });
  }

}
