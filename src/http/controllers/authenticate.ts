import type { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

import { InvalidCredentialsError } from '~/use-cases';
import { makeAuthenticateUseCase } from '~/use-cases/factories';

export async function authenticate(
	request: FastifyRequest,
	reply: FastifyReply,
): Promise<FastifyReply> {
	const authenticateBodySchema = z.object({
		email: z.string().email(),
		password: z.string().min(6),
	});

	const { email, password } = authenticateBodySchema.parse(request.body);

	try {
		const authenticateUseCase = makeAuthenticateUseCase();

		const { user } = await authenticateUseCase.handle({
			email,
			password,
		});

		const token = await reply.jwtSign(
			{},
			{
				sign: {
					sub: user.id,
				},
			},
		);

		return reply.status(200).send({
			token,
		});
	} catch (error) {
		if (error instanceof InvalidCredentialsError) {
			return reply.status(400).send({
				message: error.message,
			});
		}

		throw error;
	}
}
