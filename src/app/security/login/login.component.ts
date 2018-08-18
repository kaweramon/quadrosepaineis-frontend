import { Component, OnInit } from '@angular/core';
import {LoginService} from "./login.service";
import {HandlerErrorMessage} from "../../util/handler-error-message";
import {MessageService} from "primeng/components/common/messageservice";
import {MSG_ERROR, MSG_SUCCESS} from "../../util/constants-messages";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public name: string;
  public password: string;
  public navigateTo: string;
  public errorHandler: HandlerErrorMessage = new HandlerErrorMessage();
  public loginForm: FormGroup;

  constructor(private loginService: LoginService,
              private messageService: MessageService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.navigateTo = this.activatedRoute.snapshot.params['to'] || '/';
    this.loginForm = this.formBuilder.group({
      "name": [this.name, [Validators.required]],
      "password": [this.password, [Validators.required]]
    });
  }

  public login(): void {
    this.loginService.login(this.name, this.password).subscribe(result => {
      this.messageService.add({severity: 'success', summary: MSG_SUCCESS,
        detail: "Login efetuado com sucesso!"});
    }, error => {
      this.messageService.add({severity: 'error', summary: MSG_ERROR,
        detail: this.errorHandler.getErrorMessage(error)});
    }, () => {
      this.router.navigate([this.navigateTo]);
    });
  }

}
