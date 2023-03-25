export class InvalidCredentialsError extends Error {
	constructor() {
		super();
		this.name = 'InvalidCredentialsError';
		this.message = 'Invalid credentials';
	}
}
