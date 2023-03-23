import type { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

import { prisma } from '~/lib/prisma';

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

	await prisma.user.create({
		data: {
			name,
			email,
			passwordHash: password,
		},
	});

	return reply.status(201).send();
}
