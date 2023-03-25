import type { User } from '@prisma/client';
import { hash } from 'bcryptjs';

import type { UsersRepository } from '~/repositories';

import { UserAlreadyExistsError } from './errors';

interface RegisterUseCaseRequest {
	name: string;
	email: string;
	password: string;
}

interface RegisteUseCaseResponse {
	user: User;
}

export class RegisterUseCase {
	constructor(private usersRepository: UsersRepository) {}

	async handle({
		email,
		name,
		password,
	}: RegisterUseCaseRequest): Promise<RegisteUseCaseResponse> {
		const userWithSameEmail = await this.usersRepository.findByEmail(email);

		if (userWithSameEmail) {
			throw new UserAlreadyExistsError();
		}

		const passwordHash = await hash(password, 6);

		const user = await this.usersRepository.create({
			email,
			name,
			passwordHash,
		});

		return {
			user,
		};
	}
}
