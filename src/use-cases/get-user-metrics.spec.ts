import { describe, expect, it } from 'vitest';

import { InMemoryCheckInsRepository } from '~/repositories';

import { GetUserMetricsUseCase } from './get-user-metrics';

interface SutTypes {
	sut: GetUserMetricsUseCase;
	inMemoryCheckInsRepository: InMemoryCheckInsRepository;
}

function makeSut(): SutTypes {
	const inMemoryCheckInsRepository = new InMemoryCheckInsRepository();

	const sut = new GetUserMetricsUseCase(inMemoryCheckInsRepository);

	return { sut, inMemoryCheckInsRepository };
}

describe('Get user metrics Use Case', () => {
	it('should be able to get check-ins count from metrics', async () => {
		const { sut, inMemoryCheckInsRepository } = makeSut();

		await inMemoryCheckInsRepository.create({
			gymId: 'gym-01',
			userId: 'user-01',
		});

		await inMemoryCheckInsRepository.create({
			gymId: 'gym-02',
			userId: 'user-01',
		});

		const { checkInsCount } = await sut.handle({ userId: 'user-01' });

		expect(checkInsCount).toEqual(2);
	});
});
