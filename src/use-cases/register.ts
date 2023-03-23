import { hash } from 'bcryptjs';

import { prisma } from '~/lib/prisma';

interface RegisterUseCaseRequest {
	name: string;
	email: string;
	password: string;
}

export async function registerUseCase({
	email,
	name,
	password,
}: RegisterUseCaseRequest): Promise<void> {
	const userWithSameEmail = await prisma.user.findUnique({
		where: {
			email,
		},
	});

	if (userWithSameEmail) {
		throw new Error('E-mail already exists');
	}

	const passwordHash = await hash(password, 6);

	await prisma.user.create({
		data: {
			name,
			email,
			passwordHash,
		},
	});
}
