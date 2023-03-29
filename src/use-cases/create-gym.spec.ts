import { faker } from '@faker-js/faker';
import { describe, expect, it } from 'vitest';

import { InMemoryGymsRepository } from '~/repositories';

import { CreateGymUseCase } from './create-gym';

interface SutTypes {
	sut: CreateGymUseCase;
}

function makeSut(): SutTypes {
	const inMemoryGymsRepository = new InMemoryGymsRepository();
	const sut = new CreateGymUseCase(inMemoryGymsRepository);

	return {
		sut,
	};
}

describe('Create Gym Use Case', () => {
	it('should create a gym', async () => {
		const { sut } = makeSut();

		const { gym } = await sut.handle({
			description: faker.random.words(),
			latitude: -25.0776373,
			longitude: -50.2054339,
			phone: faker.phone.number(),
			title: faker.name.firstName(),
		});

		expect(gym.id).toEqual(expect.any(String));
	});
});
