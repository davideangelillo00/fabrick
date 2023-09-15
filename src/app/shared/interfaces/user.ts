export type UserGender = 'male' | 'female';
export type UserStatus = 'active' | 'inactive';

export interface User {
  id?: number;
  name: string;
  email: string;
  gender: UserGender;
  status: UserStatus
}
