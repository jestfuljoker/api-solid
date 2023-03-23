import type { Prisma } from '@prisma/client';

export class InMemoryUsersRepository {
	users: any[] = [];

	async create(data: Prisma.UserCreateInput): Promise<void> {
		this.users.push(data);
	}
}
