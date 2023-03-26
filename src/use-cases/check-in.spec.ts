import { describe, expect, it } from 'vitest';

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
	it('should be able to check in', async () => {
		const { sut } = makeSut();

		const { checkIn } = await sut.handle({
			gymId: 'gym-1',
			userId: 'user-1',
		});

		expect(checkIn.id).toEqual(expect.any(String));
	});
});
