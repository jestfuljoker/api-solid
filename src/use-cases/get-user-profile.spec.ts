import { faker } from '@faker-js/faker';
import type { User } from '@prisma/client';
import { hash } from 'bcryptjs';
import { describe, expect, it } from 'vitest';

import { InMemoryUsersRepository } from '~/repositories';

import { ResourceNotFound } from './errors';
import { GetUserProfileUseCase } from './get-user-profile';

interface SutTypes {
	sut: GetUserProfileUseCase;
	inMemoryUsersRepository: InMemoryUsersRepository;
}

function makeSut(): SutTypes {
	const inMemoryUsersRepository = new InMemoryUsersRepository();

	const sut = new GetUserProfileUseCase(inMemoryUsersRepository);

	return { sut, inMemoryUsersRepository };
}

async function createUser(
	inMemoryUsersRepository: InMemoryUsersRepository,
): Promise<User> {
	const user = await inMemoryUsersRepository.create({
		name: faker.name.fullName(),
		email: faker.internet.email(),
		passwordHash: await hash(faker.internet.password(), 6),
	});

	return user;
}

describe('GetUserProfileUseCase Use Case', () => {
	it('should be able to get user profile', async () => {
		const { sut, inMemoryUsersRepository } = makeSut();

		const newUser = await createUser(inMemoryUsersRepository);

		const { user } = await sut.handle({
			userId: newUser.id,
		});

		expect(user.name).toBe(newUser.name);
	});

	it('should not be able to get user profile with wrong id', async () => {
		const { sut } = makeSut();

		await expect(() =>
			sut.handle({
				userId: faker.random.word(),
			}),
		).rejects.toBeInstanceOf(ResourceNotFound);
	});
});
