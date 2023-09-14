import { FormControl } from '@angular/forms';
import { UserGender } from 'src/app/shared/interfaces/user';

export interface RegisterForm {
  name: FormControl<string>;
  email: FormControl<string>;
  gender: FormControl<UserGender>;
}
