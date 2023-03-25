import { faker } from '@faker-js/faker';
import { hash } from 'bcryptjs';
import { describe, expect, it } from 'vitest';

import { InMemoryUsersRepository } from '~/repositories';

import { AuthenticateUseCase } from './authenticate';
import { InvalidCredentialsError } from './errors';

interface SutTypes {
	sut: AuthenticateUseCase;
	inMemoryUsersRepository: InMemoryUsersRepository;
}

function makeSut(): SutTypes {
	const inMemoryUsersRepository = new InMemoryUsersRepository();

	const sut = new AuthenticateUseCase(inMemoryUsersRepository);

	return { sut, inMemoryUsersRepository };
}

describe('Authenticate Use Case', () => {
	it('should be able to authenticate', async () => {
		const { sut, inMemoryUsersRepository } = makeSut();
		const email = faker.internet.email();
		const password = faker.internet.password();

		await inMemoryUsersRepository.create({
			name: faker.name.fullName(),
			email,
			passwordHash: await hash(password, 6),
		});

		const { user } = await sut.handle({
			email,
			password,
		});

		expect(user.id).toEqual(expect.any(String));
	});

	it('should not be able to authenticate with wrong email', async () => {
		const { sut } = makeSut();

		await expect(() =>
			sut.handle({
				email: faker.internet.email(),
				password: faker.internet.password(),
			}),
		).rejects.toBeInstanceOf(InvalidCredentialsError);
	});
});
