import { PrismaGymsRepository } from '~/repositories';

import { FetchNearbyGymsUseCase } from '../fetch-nearby-gyms';

export function makeFetchNearbyGymsUseCase(): FetchNearbyGymsUseCase {
	const prismaGymsRepository = new PrismaGymsRepository();
	const useCase = new FetchNearbyGymsUseCase(prismaGymsRepository);

	return useCase;
}
