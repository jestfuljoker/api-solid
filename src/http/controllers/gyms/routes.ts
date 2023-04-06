import type { FastifyInstance } from 'fastify';

import { verifyJwt } from '~/http/middlewares/verify-jwt';

export async function gymsRoutes(app: FastifyInstance): Promise<void> {
	app.addHook('onRequest', verifyJwt);
}
