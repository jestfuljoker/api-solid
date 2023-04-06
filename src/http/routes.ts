import type { FastifyInstance } from 'fastify';

import { register, authenticate, profile } from './controllers';
import { verifyJwt } from './middlewares/verify-jwt';

export async function appRoutes(app: FastifyInstance): Promise<void> {
	app.post('/users', register);

	app.post('/sessions', authenticate);

	app.get('/me', { onRequest: [verifyJwt] }, profile);
}
