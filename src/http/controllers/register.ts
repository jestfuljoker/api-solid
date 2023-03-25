import type { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

import { PrismaUsersRepository } from '~/repositories';
import { UserAlreadyExistsError, RegisterUseCase } from '~/use-cases';

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
		if (error instanceof UserAlreadyExistsError) {
			return reply.status(409).send({
				message: error.message,
			});
		}

		throw error;
	}

	return reply.status(201).send();
}
