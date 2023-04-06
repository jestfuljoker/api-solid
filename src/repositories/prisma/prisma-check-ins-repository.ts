import type { Prisma, CheckIn } from '@prisma/client';
import dayjs from 'dayjs';

import { prisma } from '~/lib/prisma';

import type { CheckInsRepository } from '../check-ins-repository';

export class PrismaCheckInsRepository implements CheckInsRepository {
	async create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn> {
		const checkIn = await prisma.checkIn.create({ data });

		return checkIn;
	}

	async save(checkIn: CheckIn): Promise<CheckIn> {
		const checkInUpdated = await prisma.checkIn.update({
			where: { id: checkIn.id },
			data: checkIn,
		});

		return checkInUpdated;
	}

	async findByUserIdOnDate(
		userId: string,
		date: Date,
	): Promise<CheckIn | null> {
		const startOfTheDay = dayjs(date).startOf('date');
		const endOfTheDay = dayjs(date).endOf('date');

		const checkIn = await prisma.checkIn.findFirst({
			where: {
				userId,
				createdAt: {
					gte: startOfTheDay.toDate(),
					lte: endOfTheDay.toDate(),
				},
			},
		});

		return checkIn;
	}

	async findManyByUserId(userId: string, page: number): Promise<CheckIn[]> {
		const checkIns = await prisma.checkIn.findMany({
			where: {
				userId,
			},
			take: 20,
			skip: (page - 1) * 20,
		});

		return checkIns;
	}

	async findById(checkInId: string): Promise<CheckIn | null> {
		const checkIn = await prisma.checkIn.findUnique({
			where: {
				id: checkInId,
			},
		});

		return checkIn;
	}

	async countByUserId(userId: string): Promise<number> {
		const count = await prisma.checkIn.count({
			where: {
				id: userId,
			},
		});

		return count;
	}
}
