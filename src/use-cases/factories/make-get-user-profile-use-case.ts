import { PrismaUsersRepository } from '~/repositories';

import { GetUserProfileUseCase } from '../get-user-profile';

export function makeGetUserProfileUseCase(): GetUserProfileUseCase {
	const prismaUsersRepository = new PrismaUsersRepository();
	const useCase = new GetUserProfileUseCase(prismaUsersRepository);

	return useCase;
}
