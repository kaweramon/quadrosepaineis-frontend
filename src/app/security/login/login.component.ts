import {Component, OnInit} from '@angular/core';
import {LoginService} from "./login.service";
import {MessageService} from "primeng/components/common/messageservice";
import {MSG_ERROR, MSG_SUCCESS} from "../../util/constants-messages";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HandlerErrorMessage} from "../../util/handler-error-message";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public name: string;
  public password: string;
  public navigateTo: string;
  public loginForm: FormGroup;

  public errorHandler: HandlerErrorMessage = new HandlerErrorMessage(null, null);

  constructor(private loginService: LoginService,
              private messageService: MessageService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.navigateTo = this.activatedRoute.snapshot.params['redirectTo'] || '/';
    this.loginForm = this.formBuilder.group({
      "name": [this.name, [Validators.required]],
      "password": [this.password, [Validators.required]]
    });
  }

  public login(): void {
    this.loginService.login(this.name, this.password).subscribe(() => {
      this.messageService.add({severity: 'success', summary: MSG_SUCCESS,
        detail: "Login efetuado com sucesso!"});
      this.router.navigate([this.navigateTo]);
    }, error => {
      this.messageService.add({severity: 'error', summary: MSG_ERROR,
        detail: this.errorHandler.getErrorMessage(error)});
    });
  }

}
