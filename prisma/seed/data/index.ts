import * as bcrypt from 'bcrypt';
import { Prisma } from '@prisma/client';
import { GenderEnum, GenderNameEnum, RolesEnum, RolesNameEnum } from '../../../src/shared/core/types';

type AccountsUser = {
  roles: RolesEnum;
  account: Prisma.AccountCreateInput;
  user: Prisma.UserCreateInput;
};

const { ADMIN_USER, ADMIN_SHORTNAME, ADMIN_PASSWORD, SALT_PASSWORD } = process.env;

export const Roles: Prisma.RoleCreateInput[] = [
  { name: RolesEnum.USER, description: RolesNameEnum.USER },
  { name: RolesEnum.MANAGER, description: RolesNameEnum.MANAGER },
  { name: RolesEnum.ADMIN, description: RolesNameEnum.ADMIN },
];

export const Genders: Prisma.GenderCreateInput[] = [
  { name: GenderEnum.MALE, description: GenderNameEnum.MALE },
  { name: GenderEnum.FEMALE, description: GenderNameEnum.FEMALE },
];

export const AccountsUser: AccountsUser[] = [
  {
    roles: RolesEnum.ADMIN,
    account: {
      email: ADMIN_USER!,
      hash: bcrypt.hashSync(ADMIN_PASSWORD!, +SALT_PASSWORD!),
      shortcut: ADMIN_SHORTNAME!,
    },
    user: {
      name: 'ЕСЭД',
      surname: RolesNameEnum.ADMIN,
      patronymic: '',
      fullName: `${RolesNameEnum.ADMIN} ЕСЭД`,
      birthday: new Date(),
      gender: {
        connect: {
          name: GenderEnum.MALE,
        },
      },
    },
  },
];
