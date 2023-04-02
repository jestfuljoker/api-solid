import { describe, expect, it } from 'vitest';

import { InMemoryCheckInsRepository } from '~/repositories';

import { FetchUserCheckInsHistoryUseCase } from './fetch-user-check-ins-history';

interface SutTypes {
	sut: FetchUserCheckInsHistoryUseCase;
	inMemoryCheckInsRepository: InMemoryCheckInsRepository;
}

function makeSut(): SutTypes {
	const inMemoryCheckInsRepository = new InMemoryCheckInsRepository();

	const sut = new FetchUserCheckInsHistoryUseCase(inMemoryCheckInsRepository);

	return { sut, inMemoryCheckInsRepository };
}

describe('Fetch user check-in history Use Case', () => {
	it('should be able to fetch check-in history', async () => {
		const { sut, inMemoryCheckInsRepository } = makeSut();

		await inMemoryCheckInsRepository.create({
			gymId: 'gym-01',
			userId: 'user-01',
		});

		await inMemoryCheckInsRepository.create({
			gymId: 'gym-02',
			userId: 'user-01',
		});

		const { checkIns } = await sut.handle({
			userId: 'user-01',
			page: 1,
		});

		expect(checkIns).toHaveLength(2);
		expect(checkIns).toEqual([
			expect.objectContaining({ gymId: 'gym-01' }),
			expect.objectContaining({ gymId: 'gym-02' }),
		]);
	});

	it('should be able to fetch paginated check-in history', async () => {
		const { sut, inMemoryCheckInsRepository } = makeSut();

		const promises = [];

		for (let index = 1; index <= 22; index += 1) {
			promises.push(
				inMemoryCheckInsRepository.create({
					gymId: `gym-${index}`,
					userId: 'user-01',
				}),
			);
		}

		await Promise.all(promises);

		const { checkIns } = await sut.handle({
			userId: 'user-01',
			page: 2,
		});

		expect(checkIns).toHaveLength(2);
		expect(checkIns).toEqual([
			expect.objectContaining({ gymId: 'gym-21' }),
			expect.objectContaining({ gymId: 'gym-22' }),
		]);
	});
});
