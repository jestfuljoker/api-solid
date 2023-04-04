import { faker } from '@faker-js/faker';
import { describe, expect, it } from 'vitest';

import { InMemoryGymsRepository } from '~/repositories';

import { FetchNearbyGymsUseCase } from './fetch-nearby-gyms';

interface SutTypes {
	sut: FetchNearbyGymsUseCase;
	inMemoryGymsRepository: InMemoryGymsRepository;
}

function makeSut(): SutTypes {
	const inMemoryGymsRepository = new InMemoryGymsRepository();

	const sut = new FetchNearbyGymsUseCase(inMemoryGymsRepository);

	return { sut, inMemoryGymsRepository };
}

describe('Fetch nearby gyms Use Case', () => {
	it('should be able to fetch nearby gyms', async () => {
		const { sut, inMemoryGymsRepository } = makeSut();

		await inMemoryGymsRepository.create({
			title: 'Near Gym',
			latitude: -25.0776373,
			longitude: -50.2054339,
			description: faker.random.words(),
			phone: faker.phone.number(),
		});

		await inMemoryGymsRepository.create({
			title: 'Far Gym',
			latitude: -25.0233744,
			longitude: -50.5818321,
			description: faker.random.words(),
			phone: faker.phone.number(),
		});

		const { gyms } = await sut.handle({
			latitude: -25.0776373,
			longitude: -50.2054339,
		});

		expect(gyms).toHaveLength(1);
		expect(gyms).toEqual([expect.objectContaining({ title: 'Near Gym' })]);
	});
});
