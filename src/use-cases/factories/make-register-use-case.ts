import { PrismaUsersRepository } from '~/repositories';

import { RegisterUseCase } from '../register';

export function makeRegisterUseCase(): RegisterUseCase {
	const prismaUsersRepository = new PrismaUsersRepository();
	const registerUseCase = new RegisterUseCase(prismaUsersRepository);

	return registerUseCase;
}
