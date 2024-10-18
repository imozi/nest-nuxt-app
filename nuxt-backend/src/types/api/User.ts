export interface User {
  name: string;
  surname: string;
  patronymic: string;
  fullName: string | null;
  age: string | null;
  gender: Gender;
  birthday: Date | null;
  avatar: string | null;
}
