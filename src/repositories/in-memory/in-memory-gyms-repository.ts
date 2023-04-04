import type { Prisma, Gym } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';
import { randomUUID } from 'crypto';

import { getDistanceBetweenCoordinates } from '~/utils';

import type { FindManyNearbyParams, GymsRepository } from '../gyms-repository';

export class InMemoryGymsRepository implements GymsRepository {
	gyms: Gym[] = [];

	async findById(id: string): Promise<Gym | null> {
		const gym = this.gyms.find(gym => gym.id === id);

		return gym || null;
	}

	async create(data: Prisma.GymCreateInput): Promise<Gym> {
		const gym = {
			id: data.id ?? randomUUID(),
			title: data.title,
			description: data.description ?? null,
			phone: data.phone ?? null,
			latitude: new Decimal(data.latitude.toString()),
			longitude: new Decimal(data.longitude.toString()),
		};

		this.gyms.push(gym);

		return gym;
	}

	async searchMany(query: string, page: number): Promise<Gym[]> {
		return this.gyms
			.filter(gym => gym.title.includes(query))
			.slice((page - 1) * 20, page * 20);
	}

	async findManyNearby({
		latitude,
		longitude,
	}: FindManyNearbyParams): Promise<Gym[]> {
		return this.gyms.filter(gym => {
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

			return distance < 10;
		});
	}
}
