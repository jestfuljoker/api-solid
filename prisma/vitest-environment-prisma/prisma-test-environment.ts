import type { Awaitable, Environment } from 'vitest';

export default <Environment>{
	name: 'prisma',
	async setup() {
		console.log('Setup');

		return {
			teardown(): Awaitable<void> {
				console.log('Teardown');
			},
		};
	},
};
