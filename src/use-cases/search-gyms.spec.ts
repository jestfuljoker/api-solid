import { faker } from '@faker-js/faker';
import { describe, expect, it } from 'vitest';

import { InMemoryGymsRepository } from '~/repositories';

import { SearchGymsUseCase } from './search-gyms';

interface SutTypes {
	sut: SearchGymsUseCase;
	inMemoryGymsRepository: InMemoryGymsRepository;
}

function makeSut(): SutTypes {
	const inMemoryGymsRepository = new InMemoryGymsRepository();

	const sut = new SearchGymsUseCase(inMemoryGymsRepository);

	return { sut, inMemoryGymsRepository };
}

describe('Search gyms Use Case', () => {
	it('should be able to search for gyms', async () => {
		const { sut, inMemoryGymsRepository } = makeSut();

		await inMemoryGymsRepository.create({
			title: 'Javascript Gym',
			latitude: 0,
			longitude: 0,
			description: faker.random.words(),
			phone: faker.phone.number(),
		});

		await inMemoryGymsRepository.create({
			title: 'Typescript Gym',
			latitude: 0,
			longitude: 0,
			description: faker.random.words(),
			phone: faker.phone.number(),
		});

		const { gyms } = await sut.handle({
			page: 1,
			query: 'Javascript',
		});

		expect(gyms).toHaveLength(1);
		expect(gyms).toEqual([
			expect.objectContaining({ title: 'Javascript Gym' }),
		]);
	});
});
