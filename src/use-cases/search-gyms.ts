import type { Gym } from '@prisma/client';

import type { GymsRepository } from '~/repositories';

interface SearchGymsUseCaseRequest {
	query: string;
	page: number;
}

interface RegisteUseCaseResponse {
	gyms: Gym[];
}

export class SearchGymsUseCase {
	constructor(private gymsRepository: GymsRepository) {}

	async handle({
		query,
		page,
	}: SearchGymsUseCaseRequest): Promise<RegisteUseCaseResponse> {
		const gyms = await this.gymsRepository.searchMany(query, page);

		return {
			gyms,
		};
	}
}
