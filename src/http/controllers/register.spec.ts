import { faker } from '@faker-js/faker';
import request from 'supertest';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

import { app } from '~/app';

describe('Register (E2E)', () => {
	beforeAll(async () => {
		await app.ready();
	});

	afterAll(async () => {
		await app.close();
	});

	it('should be able to register', async () => {
		const response = await request(app.server).post('/users').send({
			name: faker.name.fullName(),
			email: faker.internet.email(),
			password: faker.internet.password(),
		});

		expect(response.statusCode).toBe(201);
	});
});
