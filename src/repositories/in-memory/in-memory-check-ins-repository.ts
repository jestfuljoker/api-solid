import type { CheckIn, Prisma } from '@prisma/client';
import { randomUUID } from 'node:crypto';

import type { CheckInsRepository } from '../check-ins-repository';

export class InMemoryCheckInsRepository implements CheckInsRepository {
	checkIns: CheckIn[] = [];

	async create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn> {
		const checkIn = {
			id: randomUUID(),
			gymId: data.gymId,
			userId: data.userId,
			createdAt: new Date(),
			validatedAt: data.validatedAt ? new Date(data.validatedAt) : null,
		};

		this.checkIns.push(checkIn);

		return checkIn;
	}
}
