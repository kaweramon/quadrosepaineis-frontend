import {MSG_COMPONENT_ERROR, MSG_COMPONENT_PRODUCT_CONFIRM_DELETE} from './../../util/constants-messages';
import {ProductService} from './../product.service';
import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ConfirmationService} from 'primeng/api';
import {Product} from '../product';

@Component({
  selector: 'app-modal-delete-product',
  templateUrl: './modal-delete-product.component.html',
  styleUrls: ['./modal-delete-product.component.css']
})
export class ModalDeleteProductComponent implements OnInit {

  @Output()
  public notify: EventEmitter<any> = new EventEmitter<any>();

  @Input()
  public product: Product;

  constructor(private service: ProductService, private confirmationService: ConfirmationService) { }

  ngOnInit() {
  }

  public showModal(product: Product): void {
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
        this.notify.emit({msg: MSG_COMPONENT_PRODUCT_CONFIRM_DELETE});
      });
    }
  }

}
