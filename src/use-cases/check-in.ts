import type { CheckIn } from '@prisma/client';

import type { CheckInsRepository } from '~/repositories';

interface CheckInUseCaseRequest {
	userId: string;
	gymId: string;
}

interface CheckInUseCaseResponse {
	checkIn: CheckIn;
}

export class CheckInUseCase {
	constructor(private checkInsRepository: CheckInsRepository) {}

	async handle({
		gymId,
		userId,
	}: CheckInUseCaseRequest): Promise<CheckInUseCaseResponse> {
		const checkIn = await this.checkInsRepository.create({
			gymId,
			userId,
		});

		return {
			checkIn,
		};
	}
}
