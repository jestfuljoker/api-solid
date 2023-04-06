import type { FastifyReply, FastifyRequest } from 'fastify';

import { makeGetUserProfileUseCase } from '~/use-cases/factories/make-get-user-profile-use-case';

export async function profile(
	request: FastifyRequest,
	reply: FastifyReply,
): Promise<FastifyReply> {
	const getUserProfile = makeGetUserProfileUseCase();

	const { user } = await getUserProfile.handle({
		userId: request.user.sub,
	});

	return reply.status(200).send({
		user: {
			...user,
			passwordHash: undefined,
		},
	});
}
