import type { CheckIn, Prisma } from '@prisma/client';
import dayjs from 'dayjs';
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

	async save(checkIn: CheckIn): Promise<CheckIn> {
		const checkInIndex = this.checkIns.findIndex(
			item => item.id === checkIn.id,
		);

		if (checkInIndex >= 0) {
			this.checkIns[checkInIndex] = checkIn;
		}

		return checkIn;
	}

	async findByUserIdOnDate(
		userId: string,
		date: Date,
	): Promise<CheckIn | null> {
		const startOfTheDay = dayjs(date).startOf('date');
		const endOfTheDay = dayjs(date).endOf('date');

		const checkInOnSameDate = this.checkIns.find(checkIn => {
			const checkInDate = dayjs(checkIn.createdAt);

			const isOnSameDate =
				checkInDate.isAfter(startOfTheDay) && checkInDate.isBefore(endOfTheDay);

			return checkIn.userId === userId && isOnSameDate;
		});

		if (!checkInOnSameDate) {
			return null;
		}

		return checkInOnSameDate;
	}

	async findManyByUserId(userId: string, page: number): Promise<CheckIn[]> {
		return this.checkIns
			.filter(checkIn => checkIn.userId === userId)
			.slice((page - 1) * 20, page * 20);
	}

	async countByUserId(userId: string): Promise<number> {
		return this.checkIns.filter(checkIn => checkIn.userId === userId).length;
	}

	async findById(id: string): Promise<CheckIn | null> {
		const checkIn = this.checkIns.find(checkIn => checkIn.id === id);

		if (!checkIn) {
			return null;
		}

		return checkIn;
	}
}
