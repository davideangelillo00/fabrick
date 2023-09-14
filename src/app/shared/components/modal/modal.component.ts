import { Component, Input } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal'

@Component({
  selector: 'fb-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
  @Input() title!: string;
  @Input() text?: string;
  @Input() buttonText?: string;
  @Input() buttonTextCancel?: string;
  @Input() callback?: () => void;
  @Input() callbackCancel?: () => void;

  constructor(
    public bsModalRef: BsModalRef
  ) {}

  confirm() {
    if (!!this.callback) {
      this.callback();
    }
    this.bsModalRef.hide();
  }

  cancel() {
    if (!!this.callbackCancel) {
      this.callbackCancel();
    }
    this.bsModalRef.hide();
  }
}
