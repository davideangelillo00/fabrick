export interface ModalData {
  callback?: (value?: any) => void;
  callbackCancel?: () => void;
  [attr: string]: any;
}
