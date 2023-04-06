import { PrismaGymsRepository } from '~/repositories';

import { SearchGymsUseCase } from '../search-gyms';

export function makeSearchGymsUseCase(): SearchGymsUseCase {
	const prismaGymsRepository = new PrismaGymsRepository();
	const useCase = new SearchGymsUseCase(prismaGymsRepository);

	return useCase;
}
