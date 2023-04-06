import { PrismaCheckInsRepository } from '~/repositories';

import { GetUserMetricsUseCase } from '../get-user-metrics';

export function makeGetUserMetricsUseCase(): GetUserMetricsUseCase {
	const prismaCheckInsRepository = new PrismaCheckInsRepository();
	const useCase = new GetUserMetricsUseCase(prismaCheckInsRepository);

	return useCase;
}
