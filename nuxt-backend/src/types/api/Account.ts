export interface Account {
  id: string;
  email: string;
  shortcut: string;
  roles: Role[];
  user: User;
}
