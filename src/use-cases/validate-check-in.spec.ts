import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { InMemoryCheckInsRepository } from '~/repositories';

import { ResourceNotFound } from './errors';
import { ValidateCheckInUseCase } from './validate-check-in';

interface SutTypes {
	sut: ValidateCheckInUseCase;
	inMemoryCheckInsRepository: InMemoryCheckInsRepository;
}
function makeSut(): SutTypes {
	const inMemoryCheckInsRepository = new InMemoryCheckInsRepository();

	const sut = new ValidateCheckInUseCase(inMemoryCheckInsRepository);

	return { sut, inMemoryCheckInsRepository };
}

describe('Validate checkIn Use Case', () => {
	beforeEach(() => {
		vi.useFakeTimers();
	});

	afterEach(() => {
		vi.useRealTimers();
	});

	it('should be able to validate the check-in', async () => {
		const { sut, inMemoryCheckInsRepository } = makeSut();

		const createdCheckIn = await inMemoryCheckInsRepository.create({
			gymId: 'gym-01',
			userId: 'user-01',
		});

		await sut.handle({
			checkInId: createdCheckIn.id,
		});

		expect(createdCheckIn.validatedAt).toEqual(expect.any(Date));
		expect(inMemoryCheckInsRepository.checkIns[0].validatedAt).toEqual(
			expect.any(Date),
		);
	});

	it('should not be able to validate an inexistent check-in', async () => {
		const { sut } = makeSut();

		await expect(() =>
			sut.handle({
				checkInId: 'any_id',
			}),
		).rejects.toBeInstanceOf(ResourceNotFound);
	});

	it("should not be able to validate the check-in after 20 minutes of it's createion", async () => {
		vi.setSystemTime(new Date(2023, 0, 1, 13, 40));

		const { sut, inMemoryCheckInsRepository } = makeSut();

		const createdCheckIn = await inMemoryCheckInsRepository.create({
			gymId: 'gym-01',
			userId: 'user-01',
		});

		const TWENTY_ONE_MINUTES_IN_MS = 1000 * 60 * 21;

		vi.advanceTimersByTime(TWENTY_ONE_MINUTES_IN_MS);

		await expect(() =>
			sut.handle({
				checkInId: createdCheckIn.id,
			}),
		).rejects.toBeInstanceOf(Error);
	});
});
