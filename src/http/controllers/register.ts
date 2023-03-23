import type { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

import { PrismaUsersRepository } from '~/repositories/prisma/prisma-users-repository';
import { RegisterUseCase } from '~/use-cases/register';

export async function register(
	request: FastifyRequest,
	reply: FastifyReply,
): Promise<FastifyReply> {
	const registerBodySchema = z.object({
		name: z.string(),
		email: z.string().email(),
		password: z.string().min(6),
	});

	const { email, name, password } = registerBodySchema.parse(request.body);

	try {
		const prismaUsersRepository = new PrismaUsersRepository();
		const registerUseCase = new RegisterUseCase(prismaUsersRepository);

		await registerUseCase.handle({
			email,
			name,
			password,
		});
	} catch (error) {
		return reply.status(409).send();
	}

	return reply.status(201).send();
}
