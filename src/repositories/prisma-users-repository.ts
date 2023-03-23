import type { Prisma, User } from '@prisma/client';

import { prisma } from '~/lib/prisma';

export class PrismaUsersRepository {
	async create(data: Prisma.UserCreateInput): Promise<User> {
		const user = await prisma.user.create({
			data,
		});

		return user;
	}

	async findUnique(email: string): Promise<User | null> {
		const userWithSameEmail = await prisma.user.findUnique({
			where: {
				email,
			},
		});

		return userWithSameEmail;
	}
}
