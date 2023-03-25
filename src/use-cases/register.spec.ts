import { compare } from 'bcryptjs';
import { beforeEach, describe, expect, it } from 'vitest';

import { InMemoryUsersRepository } from '~/repositories';

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
});
