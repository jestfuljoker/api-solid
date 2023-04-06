import { PrismaGymsRepository } from '~/repositories';

import { CreateGymUseCase } from '../create-gym';

export function makeCreateGymUseCase(): CreateGymUseCase {
	const prismaGymsRepository = new PrismaGymsRepository();
	const useCase = new CreateGymUseCase(prismaGymsRepository);

	return useCase;
}
