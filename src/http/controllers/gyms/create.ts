import type { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

import { makeCreateGymUseCase } from '~/use-cases/factories';

export async function create(
	request: FastifyRequest,
	reply: FastifyReply,
): Promise<FastifyReply> {
	const createGymBodySchema = z.object({
		title: z.string(),
		description: z.string().nullable(),
		phone: z.string().nullable(),
		latitude: z.number().refine(value => Math.abs(value) <= 90),
		longitude: z.number().refine(value => Math.abs(value) <= 180),
	});

	const { title, description, latitude, longitude, phone } =
		createGymBodySchema.parse(request.body);

	const createGymUseCase = makeCreateGymUseCase();

	const { gym } = await createGymUseCase.handle({
		description,
		latitude,
		longitude,
		phone,
		title,
	});

	return reply.status(200).send({ gym });
}
