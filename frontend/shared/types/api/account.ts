export interface Account extends Entity {
  email: string;
  shortcut: string;
  roles: Role[];
  user: User;
}
