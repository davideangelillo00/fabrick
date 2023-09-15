import { UserGenderEnum, UserStatusEnum } from "../enums/user.enum";

export interface User {
  id?: number;
  name: string;
  email: string;
  gender: UserGenderEnum;
  status: UserStatusEnum;
}
