import { faker } from '@faker-js/faker';
import request from 'supertest';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

import { app } from '~/app';

describe('Authenticate (E2E)', () => {
	beforeAll(async () => {
		await app.ready();
	});

	afterAll(async () => {
		await app.close();
	});

	it('should be able to authenticate', async () => {
		const newUser = {
			name: faker.name.fullName(),
			email: faker.internet.email(),
			password: faker.internet.password(),
		};

		await request(app.server).post('/users').send(newUser);

		const response = await request(app.server).post('/sessions').send({
			email: newUser.email,
			password: newUser.password,
		});

		expect(response.statusCode).toBe(200);
		expect(response.body).toEqual({
			token: expect.any(String),
		});
	});
});
