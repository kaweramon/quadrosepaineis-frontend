import {Component, Input} from '@angular/core';
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-validation-message',
  templateUrl: './validation-message.component.html',
  styleUrls: ['./validation-message.component.css']
})
export class ValidationMessageComponent {

  @Input()
  public control: FormControl;

  @Input()
  public message: string;

  @Input()
  public errorType: string;

  public hasError(): boolean {
    return this.control.hasError(this.errorType) && this.control.dirty;
  }

}
