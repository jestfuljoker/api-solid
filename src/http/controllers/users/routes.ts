import type { FastifyInstance } from 'fastify';

import { verifyJwt } from '../../middlewares/verify-jwt';
import { authenticate } from './authenticate';
import { profile } from './profile';
import { register } from './register';

export async function usersRoutes(app: FastifyInstance): Promise<void> {
	app.post('/users', register);

	app.post('/sessions', authenticate);

	app.get('/me', { onRequest: [verifyJwt] }, profile);
}
