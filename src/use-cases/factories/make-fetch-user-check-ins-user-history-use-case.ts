import { PrismaCheckInsRepository } from '~/repositories';

import { FetchUserCheckInsHistoryUseCase } from '../fetch-user-check-ins-history';

export function makeFetchUserCheckInsHistoryUseCase(): FetchUserCheckInsHistoryUseCase {
	const prismaCheckInsRepository = new PrismaCheckInsRepository();
	const useCase = new FetchUserCheckInsHistoryUseCase(prismaCheckInsRepository);

	return useCase;
}
