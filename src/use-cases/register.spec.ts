import { faker } from '@faker-js/faker';
import { compare } from 'bcryptjs';
import { describe, expect, it } from 'vitest';

import { InMemoryUsersRepository } from '~/repositories';

import { UserAlreadyExistsError } from './errors';
import { RegisterUseCase } from './register';

interface SutTypes {
	sut: RegisterUseCase;
}

interface User {
	name: string;
	email: string;
	password: string;
}

interface CreateUserParams {
	email?: string;
	password?: string;
}

function createUser({
	email = faker.internet.email(),
	password = faker.internet.password(),
}: CreateUserParams): User {
	return {
		name: faker.name.fullName(),
		email,
		password,
	};
}

function makeSut(): SutTypes {
	const inMemoryUsersRepository = new InMemoryUsersRepository();
	const sut = new RegisterUseCase(inMemoryUsersRepository);

	return {
		sut,
	};
}

describe('Register Use Case', () => {
	it('should hash user password upon registration', async () => {
		const { sut } = makeSut();
		const password = faker.internet.password();

		const { user } = await sut.handle(createUser({ password }));

		const isPasswordCorrectlyHashed = await compare(
			password,
			user.passwordHash,
		);

		expect(isPasswordCorrectlyHashed).toBe(true);
	});

	it('should not be able to register with same email twice', async () => {
		const { sut } = makeSut();
		const email = faker.internet.email();
		const user = createUser({ email });

		await sut.handle(user);

		await expect(() => sut.handle(user)).rejects.toBeInstanceOf(
			UserAlreadyExistsError,
		);
	});

	it('should be able to register ', async () => {
		const { sut } = makeSut();

		const { user } = await sut.handle(createUser({}));

		expect(user.id).toEqual(expect.any(String));
	});
});
