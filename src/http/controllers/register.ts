import { hash } from 'bcryptjs';
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

	const userWithSameEmail = await prisma.user.findUnique({
		where: {
			email,
		},
	});

	if (userWithSameEmail) {
		return reply.status(409).send();
	}

	const passwordHash = await hash(password, 6);

	await prisma.user.create({
		data: {
			name,
			email,
			passwordHash,
		},
	});

	return reply.status(201).send();
}
