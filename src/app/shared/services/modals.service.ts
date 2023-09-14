import { Injectable } from '@angular/core';
import { SharedModule } from '../shared.module';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ModalData } from '../interfaces/moda-data';

@Injectable({
  providedIn: SharedModule
})
export class ModalsService {
  private openedModal?: BsModalRef;

  constructor(private bsModalService: BsModalService) { }

  openModal(modal: any, modalData: ModalData): void {
    this.openedModal?.hide();
    this.openedModal = this.bsModalService.show(modal, {initialState: modalData, ariaDescribedby: 'modal-title'});
  }
}
