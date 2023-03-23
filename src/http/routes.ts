import type { FastifyInstance } from 'fastify';

import { register } from './controllers';

export async function appRoutes(app: FastifyInstance): Promise<void> {
	app.post('/users', register);
}
