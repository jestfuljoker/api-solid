import type { User, Prisma } from '@prisma/client';
import { randomUUID } from 'node:crypto';

import type { UsersRepository } from '../users-repository';

export class InMemoryUsersRepository implements UsersRepository {
	users: User[] = [];

	async create(data: Prisma.UserCreateInput): Promise<User> {
		const user = {
			id: randomUUID(),
			name: data.name,
			email: data.email,
			passwordHash: data.passwordHash,
			createdAt: new Date(),
		};

		this.users.push(user);

		return user;
	}

	async findByEmail(email: string): Promise<User | null> {
		const user = this.users.find(user => user.email === email);

		return user || null;
	}

	async findById(id: string): Promise<User | null> {
		const user = this.users.find(user => user.id === id);

		return user || null;
	}
}
