import type { FastifyInstance } from 'fastify';

import { register, authenticate } from './controllers';

export async function appRoutes(app: FastifyInstance): Promise<void> {
	app.post('/users', register);

	app.post('/sessions', authenticate);
}
