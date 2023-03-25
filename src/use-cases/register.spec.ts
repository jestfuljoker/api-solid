import { compare } from 'bcryptjs';
import { describe, expect, it } from 'vitest';

import { InMemoryUsersRepository } from '~/repositories';

import { UserAlreadyExistsError } from './errors';
import { RegisterUseCase } from './register';

interface SutTypes {
	sut: RegisterUseCase;
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

		const { user } = await sut.handle({
			name: 'Jon Doe',
			email: 'jon.doe@mail.com',
			password: '123456',
		});

		const isPasswordCorrectlyHashed = await compare(
			'123456',
			user.passwordHash,
		);

		expect(isPasswordCorrectlyHashed).toBe(true);
	});

	it('should not be able to register with same email twice', async () => {
		const { sut } = makeSut();
		const email = 'jon.doe@mail.com';

		await sut.handle({
			name: 'Jon Doe',
			email,
			password: '123456',
		});

		await expect(() =>
			sut.handle({
				name: 'Jon Doe',
				email,
				password: '123456',
			}),
		).rejects.toBeInstanceOf(UserAlreadyExistsError);
	});

	it('should be able to register ', async () => {
		const { sut } = makeSut();

		const { user } = await sut.handle({
			name: 'Jon Doe',
			email: 'jon.doe@mail.com',
			password: '123456',
		});

		expect(user.id).toEqual(expect.any(String));
	});
});
