import type { Gym } from '@prisma/client';

import type { GymsRepository } from '~/repositories';

interface FetchNearbyGymsUseCaseRequest {
	latitude: number;
	longitude: number;
}

interface FetchNearbyGymsUseCaseResponse {
	gyms: Gym[];
}

export class FetchNearbyGymsUseCase {
	constructor(private gymsRepository: GymsRepository) {}

	async handle({
		latitude,
		longitude,
	}: FetchNearbyGymsUseCaseRequest): Promise<FetchNearbyGymsUseCaseResponse> {
		const gyms = await this.gymsRepository.findManyNearby({
			latitude,
			longitude,
		});

		return {
			gyms,
		};
	}
}
