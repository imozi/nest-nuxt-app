import { PrismaClient } from '@prisma/client';
import { Roles, Genders, AccountsUser } from './data';

const prisma = new PrismaClient();

const createInitialData = async () => {
  await prisma.role.createManyAndReturn({ data: Roles });
  await prisma.gender.createManyAndReturn({ data: Genders });

  for (const accountUser of AccountsUser) {
    const account = await prisma.account.create({
      data: {
        ...accountUser.account,
        roles: {
          connect: {
            name: accountUser.roles,
          },
        },
      },
      include: {
        user: true,
      },
    });

    await prisma.user.update({
      where: {
        id: account.user?.id,
      },
      data: {
        ...accountUser.user,
      },
    });
  }
};

createInitialData()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
