import type { Prisma, User } from '@prisma/client';

import { prisma } from '~/lib/prisma';

export class PrismaUsersRepository {
	async create(data: Prisma.UserCreateInput): Promise<User> {
		const user = await prisma.user.create({
			data,
		});

		return user;
	}
}
