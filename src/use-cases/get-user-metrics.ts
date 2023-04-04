import type { CheckInsRepository } from '~/repositories';

interface GetUserMetricsHistoryRequest {
	userId: string;
}

interface GetUserMetricsHistoryResponse {
	checkInsCount: number;
}

export class GetUserMetricsUseCase {
	constructor(private checkInsRepository: CheckInsRepository) {}

	async handle({
		userId,
	}: GetUserMetricsHistoryRequest): Promise<GetUserMetricsHistoryResponse> {
		const checkInsCount = await this.checkInsRepository.countByUserId(userId);

		return {
			checkInsCount,
		};
	}
}
