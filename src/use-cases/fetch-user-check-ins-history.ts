import type { CheckIn } from '@prisma/client';

import type { CheckInsRepository } from '~/repositories';

interface FetchUserCheckInsHistoryRequest {
	userId: string;
	page: number;
}

interface FetchUserCheckInsHistoryResponse {
	checkIns: CheckIn[];
}

export class FetchUserCheckInsHistoryUseCase {
	constructor(private checkInsRepository: CheckInsRepository) {}

	async handle({
		userId,
		page,
	}: FetchUserCheckInsHistoryRequest): Promise<FetchUserCheckInsHistoryResponse> {
		const checkIns = await this.checkInsRepository.findManyByUserId(
			userId,
			page,
		);

		return {
			checkIns,
		};
	}
}
