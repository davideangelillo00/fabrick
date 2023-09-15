import { Injectable } from '@angular/core';
import { SharedModule } from '../shared.module';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ModalData } from '../interfaces/moda-data';

const onHiddenBackdropEvent = 'backdrop-click';

@Injectable({
  providedIn: SharedModule
})
export class ModalsService {
  private openedModal?: BsModalRef;

  constructor(private bsModalService: BsModalService) { }

  /**
   * Opens the specified modal
   * @param modal Modal component to show inside popup
   * @param modalData Input data injected inside the given modal, including callbacks
   */
  openModal(modal: any, modalData: ModalData): void {
    this.openedModal?.hide();
    this.openedModal = this.bsModalService.show(modal, {initialState: modalData, ariaDescribedby: 'modal-title', backdrop: 'static'});
  }
}
