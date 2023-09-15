import { Component, Input } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal'

@Component({
  selector: 'fb-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
  /** Modal title, this field is **mandatory** */
  @Input() title!: string;
  /** Modal text */
  @Input() text?: string;
  /** Modal button, dispatches *callback* when clicked */
  @Input() buttonText?: string;
  /** Modal cancel button, dispatches *callbackCancel* when clicked */
  @Input() buttonTextCancel?: string;
  /** Callback dispatched on modal's *button* click */
  @Input() callback?: () => void;
  /** Callback dispatched on modal's *buttonCancel* click */
  @Input() callbackCancel?: () => void;

  constructor(
    public bsModalRef: BsModalRef
  ) {}

  confirm() {
    if (this.callback) {
      this.callback();
    }
    this.bsModalRef.hide();
  }

  cancel() {
    if (this.callbackCancel) {
      this.callbackCancel();
    }
    this.bsModalRef.hide();
  }
}
