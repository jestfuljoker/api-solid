import type { CheckIn } from '@prisma/client';

import type { CheckInsRepository } from '~/repositories';

import { ResourceNotFound } from './errors';

interface ValidateCheckInUseCaseRequest {
	checkInId: string;
}

interface ValidateCheckInUseCaseResponse {
	checkIn: CheckIn;
}

export class ValidateCheckInUseCase {
	constructor(private checkInsRepository: CheckInsRepository) {}

	async handle({
		checkInId,
	}: ValidateCheckInUseCaseRequest): Promise<ValidateCheckInUseCaseResponse> {
		const checkIn = await this.checkInsRepository.findById(checkInId);

		if (!checkIn) {
			throw new ResourceNotFound();
		}

		checkIn.validatedAt = new Date();

		await this.checkInsRepository.save(checkIn);

		return {
			checkIn,
		};
	}
}
