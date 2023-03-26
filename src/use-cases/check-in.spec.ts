import { beforeEach, afterEach, describe, expect, it, vi } from 'vitest';

import { InMemoryCheckInsRepository } from '~/repositories';

import { CheckInUseCase } from './check-in';

interface SutTypes {
	sut: CheckInUseCase;
	inMemoryCheckInsRepository: InMemoryCheckInsRepository;
}

function makeSut(): SutTypes {
	const inMemoryCheckInsRepository = new InMemoryCheckInsRepository();

	const sut = new CheckInUseCase(inMemoryCheckInsRepository);

	return { sut, inMemoryCheckInsRepository };
}

describe('CheckIn Use Case', () => {
	beforeEach(() => {
		vi.useFakeTimers();
	});

	afterEach(() => {
		vi.useRealTimers();
	});

	it('should be able to check in', async () => {
		const { sut } = makeSut();

		const { checkIn } = await sut.handle({
			gymId: 'gym-1',
			userId: 'user-1',
		});

		expect(checkIn.id).toEqual(expect.any(String));
	});

	it('should not be able to check in twice in the same day', async () => {
		vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0));

		const { sut } = makeSut();

		await sut.handle({
			gymId: 'gym-1',
			userId: 'user-1',
		});

		await expect(() =>
			sut.handle({
				gymId: 'gym-1',
				userId: 'user-1',
			}),
		).rejects.toBeInstanceOf(Error);
	});
});
