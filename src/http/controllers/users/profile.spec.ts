import { faker } from '@faker-js/faker';
import request from 'supertest';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

import { app } from '~/app';

describe('Profile (E2E)', () => {
	beforeAll(async () => {
		await app.ready();
	});

	afterAll(async () => {
		await app.close();
	});

	it('should be able to get user profile', async () => {
		const newUser = {
			name: faker.name.fullName(),
			email: faker.internet.email(),
			password: faker.internet.password(),
		};

		await request(app.server).post('/users').send(newUser);

		const authResponse = await request(app.server).post('/sessions').send({
			email: newUser.email,
			password: newUser.password,
		});

		const { token } = authResponse.body;

		const profileResponse = await request(app.server)
			.get('/me')
			.set('Authorization', `Bearer ${token}`)
			.send();

		expect(profileResponse.statusCode).toBe(200);
		expect(profileResponse.body.user).toEqual(
			expect.objectContaining({ email: newUser.email }),
		);
	});
});
