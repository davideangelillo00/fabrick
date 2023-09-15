import { FormControl } from '@angular/forms';
import { UserGenderEnum } from 'src/app/shared/enums/user.enum';

export interface RegisterForm {
  name: FormControl<string>;
  email: FormControl<string>;
  gender: FormControl<UserGenderEnum | null>;
}
