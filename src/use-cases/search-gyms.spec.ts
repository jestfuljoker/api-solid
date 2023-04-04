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

	it('should be able to fetch paginated gym search', async () => {
		const { sut, inMemoryGymsRepository } = makeSut();

		const promises = [];

		for (let index = 1; index <= 22; index += 1) {
			promises.push(
				inMemoryGymsRepository.create({
					title: `Javascript Gym ${index}`,
					latitude: 0,
					longitude: 0,
					description: faker.random.words(),
					phone: faker.phone.number(),
				}),
			);
		}

		await Promise.all(promises);

		const { gyms } = await sut.handle({
			page: 2,
			query: 'Javascript',
		});

		expect(gyms).toHaveLength(2);
		expect(gyms).toEqual([
			expect.objectContaining({ title: 'Javascript Gym 21' }),
			expect.objectContaining({ title: 'Javascript Gym 22' }),
		]);
	});
});
