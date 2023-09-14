export type UserGender = 'male' | 'female' | 'other';
export type UserStatus = 'active' | 'inactive';

export interface User {
  id?: string;
  name: string;
  email: string;
  gender: UserGender;
  status: UserStatus
}
