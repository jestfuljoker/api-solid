import type { CheckIn } from '@prisma/client';

import type { CheckInsRepository } from '~/repositories';
import type { GymsRepository } from '~/repositories/gyms-repository';
import { getDistanceBetweenCoordinates } from '~/utils';

import {
	MaxDistanceError,
	MaxNumberCheckInsError,
	ResourceNotFound,
} from './errors';

const MAX_DISTANCE_IN_KILOMETERS = 0.1;

interface CheckInUseCaseRequest {
	userId: string;
	gymId: string;
	latitude: number;
	longitude: number;
}

interface CheckInUseCaseResponse {
	checkIn: CheckIn;
}

export class CheckInUseCase {
	constructor(
		private checkInsRepository: CheckInsRepository,
		private gymsRepository: GymsRepository,
	) {}

	async handle({
		gymId,
		userId,
		latitude,
		longitude,
	}: CheckInUseCaseRequest): Promise<CheckInUseCaseResponse> {
		const gym = await this.gymsRepository.findById(gymId);

		if (!gym) {
			throw new ResourceNotFound();
		}

		const distance = getDistanceBetweenCoordinates(
			{
				latitude,
				longitude,
			},
			{
				latitude: gym.latitude.toNumber(),
				longitude: gym.longitude.toNumber(),
			},
		);

		if (distance > MAX_DISTANCE_IN_KILOMETERS) {
			throw new MaxDistanceError();
		}

		const checkInOnSameDate = await this.checkInsRepository.findByUserIdOnDate(
			userId,
			new Date(),
		);

		if (checkInOnSameDate) {
			throw new MaxNumberCheckInsError();
		}

		const checkIn = await this.checkInsRepository.create({
			gymId,
			userId,
		});

		return {
			checkIn,
		};
	}
}
