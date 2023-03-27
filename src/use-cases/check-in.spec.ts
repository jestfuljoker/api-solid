import { Decimal } from '@prisma/client/runtime/library';
import { beforeEach, afterEach, describe, expect, it, vi } from 'vitest';

import {
	InMemoryCheckInsRepository,
	InMemoryGymsRepository,
} from '~/repositories';

import { CheckInUseCase } from './check-in';

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

function makeCheckInInputData(): CheckInInput {
	return {
		gymId: 'gym-01',
		userId: 'user-01',
		latitude: -25.0776373,
		longitude: -50.2054339,
	};
}

function createGym(gymsRepository: InMemoryGymsRepository): void {
	gymsRepository.gyms.push({
		id: 'gym-01',
		title: "Javascript's Gym",
		description: null,
		latitude: new Decimal(0),
		longitude: new Decimal(0),
		phone: '123456',
	});
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
		).rejects.toBeInstanceOf(Error);
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
});
