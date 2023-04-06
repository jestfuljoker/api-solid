import type { FastifyInstance } from 'fastify';

import { gymsRoutes } from './gyms/routes';
import { usersRoutes } from './users/routes';

export async function appRoutes(app: FastifyInstance): Promise<void> {
	app.register(gymsRoutes);
	app.register(usersRoutes);
}
