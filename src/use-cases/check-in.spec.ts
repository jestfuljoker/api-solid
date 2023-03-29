import { faker } from '@faker-js/faker';
import type { Gym } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';
import { beforeEach, afterEach, describe, expect, it, vi } from 'vitest';

import {
	InMemoryCheckInsRepository,
	InMemoryGymsRepository,
} from '~/repositories';

import { CheckInUseCase } from './check-in';
import { MaxDistanceError, MaxNumberCheckInsError } from './errors';

interface SutTypes {
	sut: CheckInUseCase;
	inMemoryCheckInsRepository: InMemoryCheckInsRepository;
	inMemoryGymsRepository: InMemoryGymsRepository;
}

interface CheckInInput {
	gymId: string;
	userId: string;
	latitude: number;
	longitude: number;
}

function makeSut(): SutTypes {
	const inMemoryCheckInsRepository = new InMemoryCheckInsRepository();
	const inMemoryGymsRepository = new InMemoryGymsRepository();

	const sut = new CheckInUseCase(
		inMemoryCheckInsRepository,
		inMemoryGymsRepository,
	);

	return { sut, inMemoryCheckInsRepository, inMemoryGymsRepository };
}

function makeCheckInInputData(gymId?: string): CheckInInput {
	return {
		gymId: gymId || 'gym-01',
		userId: 'user-01',
		latitude: -25.0776373,
		longitude: -50.2054339,
	};
}

function createGym(gymsRepository: InMemoryGymsRepository, gym?: Gym): void {
	gymsRepository.create(
		gym || {
			id: 'gym-01',
			title: faker.company.name(),
			description: faker.random.words(),
			latitude: -25.0776373,
			longitude: -50.2054339,
			phone: faker.phone.number(),
		},
	);
}

describe('CheckIn Use Case', () => {
	beforeEach(() => {
		vi.useFakeTimers();
	});

	afterEach(() => {
		vi.useRealTimers();
	});

	it('should be able to check in', async () => {
		const { sut, inMemoryGymsRepository } = makeSut();

		createGym(inMemoryGymsRepository);

		const { checkIn } = await sut.handle(makeCheckInInputData());

		expect(checkIn.id).toEqual(expect.any(String));
	});

	it('should not be able to check in twice in the same day', async () => {
		vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0));

		const { sut, inMemoryGymsRepository } = makeSut();

		createGym(inMemoryGymsRepository);

		await sut.handle(makeCheckInInputData());

		await expect(() =>
			sut.handle(makeCheckInInputData()),
		).rejects.toBeInstanceOf(MaxNumberCheckInsError);
	});

	it('should not able to check in twice but in different days', async () => {
		vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0));

		const input = makeCheckInInputData();

		const { sut, inMemoryGymsRepository } = makeSut();

		createGym(inMemoryGymsRepository);

		await sut.handle(input);

		vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0));

		const { checkIn } = await sut.handle(input);

		expect(checkIn.id).toEqual(expect.any(String));
	});

	it('should not be able to check in on distant gym', async () => {
		const { sut, inMemoryGymsRepository } = makeSut();

		createGym(inMemoryGymsRepository, {
			id: 'gym-02',
			title: faker.company.name(),
			description: faker.random.words(),
			phone: faker.phone.number(),
			latitude: new Decimal(-25.0726307),
			longitude: new Decimal(-50.1980634),
		});

		createGym(inMemoryGymsRepository);

		await expect(
			sut.handle(makeCheckInInputData('gym-02')),
		).rejects.toBeInstanceOf(MaxDistanceError);
	});
});
