import { hash } from 'bcryptjs';
import { describe, expect, it } from 'vitest';

import { InMemoryUsersRepository } from '~/repositories';

import { AuthenticateUseCase } from './authenticate';

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

		await inMemoryUsersRepository.create({
			name: 'jon Doe',
			email: 'jon.doe@mail.com',
			passwordHash: await hash('123456', 6),
		});

		const { user } = await sut.handle({
			email: 'jon.doe@mail.com',
			password: '123456',
		});

		expect(user.id).toEqual(expect.any(String));
	});
});
