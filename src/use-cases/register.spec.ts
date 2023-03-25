import { compare } from 'bcryptjs';
import { beforeEach, describe, expect, it } from 'vitest';

import { InMemoryUsersRepository } from '~/repositories';

import { UserAlreadyExistsError } from './errors';
import { RegisterUseCase } from './register';

let inMemoryUsersRepository: InMemoryUsersRepository;
let registerUseCase: RegisterUseCase;

describe('Register Use Case', () => {
	beforeEach(() => {
		inMemoryUsersRepository = new InMemoryUsersRepository();
		registerUseCase = new RegisterUseCase(inMemoryUsersRepository);
	});

	it('should hash user password upon registration', async () => {
		const { user } = await registerUseCase.handle({
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
		const email = 'jon.doe@mail.com';

		await registerUseCase.handle({
			name: 'Jon Doe',
			email,
			password: '123456',
		});

		expect(() =>
			registerUseCase.handle({
				name: 'Jon Doe',
				email,
				password: '123456',
			}),
		).rejects.toBeInstanceOf(UserAlreadyExistsError);
	});

	it('should be able to register ', async () => {
		const { user } = await registerUseCase.handle({
			name: 'Jon Doe',
			email: 'jon.doe@mail.com',
			password: '123456',
		});

		expect(user.id).toEqual(expect.any(String));
	});
});
