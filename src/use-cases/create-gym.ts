import type { Gym } from '@prisma/client';

import type { GymsRepository } from '~/repositories';

interface CreateGymUseCaseRequest {
	title: string;
	description: string | null;
	latitude: number;
	longitude: number;
	phone: string | null;
}

interface RegisteUseCaseResponse {
	gym: Gym;
}

export class CreateGymUseCase {
	constructor(private gymsRepository: GymsRepository) {}

	async handle({
		description,
		latitude,
		longitude,
		phone,
		title,
	}: CreateGymUseCaseRequest): Promise<RegisteUseCaseResponse> {
		const gym = await this.gymsRepository.create({
			latitude,
			longitude,
			title,
			description,
			phone,
		});

		return {
			gym,
		};
	}
}
