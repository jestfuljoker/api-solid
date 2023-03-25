import { PrismaUsersRepository } from '~/repositories';

import { AuthenticateUseCase } from '../authenticate';

export function makeAuthenticateUseCase(): AuthenticateUseCase {
	const prismaUsersRepository = new PrismaUsersRepository();
	const authenticateUseCase = new AuthenticateUseCase(prismaUsersRepository);

	return authenticateUseCase;
}
