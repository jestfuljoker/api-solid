import { PrismaCheckInsRepository, PrismaGymsRepository } from '~/repositories';

import { CheckInUseCase } from '../check-in';

export function makeCheckInUseCase(): CheckInUseCase {
	const prismaCheckInsRepository = new PrismaCheckInsRepository();
	const prismaGymsRepository = new PrismaGymsRepository();

	const useCase = new CheckInUseCase(
		prismaCheckInsRepository,
		prismaGymsRepository,
	);

	return useCase;
}
