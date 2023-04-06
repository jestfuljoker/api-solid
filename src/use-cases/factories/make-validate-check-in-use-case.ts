import { PrismaCheckInsRepository } from '~/repositories';

import { ValidateCheckInUseCase } from '../validate-check-in';

export function makeValidateCheckInUseCase(): ValidateCheckInUseCase {
	const prismaCheckInsRepository = new PrismaCheckInsRepository();
	const useCase = new ValidateCheckInUseCase(prismaCheckInsRepository);

	return useCase;
}
