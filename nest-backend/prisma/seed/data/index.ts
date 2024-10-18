import * as bcrypt from 'bcrypt';
import { Prisma } from '@prisma/client';
import { Seed } from './types';

const { ADMIN_USER, ADMIN_SHORTCUT, ADMIN_PASSWORD, CRYPT_SALT } = process.env;

export const Roles: Prisma.RoleCreateInput[] = [
  { name: Seed.RolesEnum.USER, description: Seed.RolesNameEnum.USER },
  { name: Seed.RolesEnum.MANAGER, description: Seed.RolesNameEnum.MANAGER },
  { name: Seed.RolesEnum.ADMIN, description: Seed.RolesNameEnum.ADMIN },
];

export const Genders: Prisma.GenderCreateInput[] = [
  { name: Seed.GenderEnum.MALE, description: Seed.GenderNameEnum.MALE },
  { name: Seed.GenderEnum.FEMALE, description: Seed.GenderNameEnum.FEMALE },
];

export const AccountsUser: Seed.AccountsUser[] = [
  {
    roles: [Seed.RolesEnum.ADMIN],
    account: {
      email: ADMIN_USER!,
      hash: bcrypt.hashSync(ADMIN_PASSWORD!, +CRYPT_SALT!),
      shortcut: ADMIN_SHORTCUT!,
    },
    user: {
      name: 'ЕСЭД',
      surname: Seed.RolesNameEnum.ADMIN,
      patronymic: '',
      fullName: `${Seed.RolesNameEnum.ADMIN} ЕСЭД`,
      birthday: new Date(),
      gender: {
        connect: {
          name: Seed.GenderEnum.MALE,
        },
      },
    },
  },
];
