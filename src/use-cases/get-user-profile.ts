import type { User } from '@prisma/client';

import type { UsersRepository } from '~/repositories';

import { ResourceNotFound } from './errors';

interface GetUserProfileUseCaseRequest {
	userId: string;
}

interface GetUserProfileUseCaseResponse {
	user: User;
}

export class GetUserProfileUseCase {
	constructor(private usersRepository: UsersRepository) {}

	async handle({
		userId,
	}: GetUserProfileUseCaseRequest): Promise<GetUserProfileUseCaseResponse> {
		const user = await this.usersRepository.findById(userId);

		if (!user) {
			throw new ResourceNotFound();
		}

		return {
			user,
		};
	}
}
