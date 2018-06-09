import { MSG_SUCCESS, MSG_PRODUCT_DELETED, MSG_COMPONENT_PRODUCT_CONFIRM_DELETE } from './../../util/constants-messages';
import { ProductService } from './../product.service';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ConfirmationService, Message } from 'primeng/api';
import { Product } from '../product';

@Component({
  selector: 'app-modal-delete-product',
  templateUrl: './modal-delete-product.component.html',
  styleUrls: ['./modal-delete-product.component.css']
})
export class ModalDeleteProductComponent implements OnInit {

  public msgs: Message[] = [];

  @Output()
  public notify: EventEmitter<any> = new EventEmitter<any>();

  @Input()
  public product: Product;

  constructor(private service: ProductService, private confirmationService: ConfirmationService) { }

  ngOnInit() {
  }

  public showModal(product: Product): void {
    this.msgs = [];
    const messageDelete = product === undefined ? "Tem certeza deseja deletar ?" :
      'Tem certeza que deseja deletar o produto "' + product.name + '"';
    this.confirmationService.confirm({
      message: messageDelete.toString(),
      header: 'Confirmação (Deletar Produto)',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.remove(product);
      }
    });
  }

  public remove(product: Product): void {
    if (product) {
      this.service.updateIsActiveProperty(product.id, false).subscribe(() => {
        console.log("ok");
        this.notify.emit({msg: MSG_COMPONENT_PRODUCT_CONFIRM_DELETE});
      }, error => {
        console.log(error);
      });
    }
  }

}
