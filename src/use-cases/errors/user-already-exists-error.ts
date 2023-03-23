export class UserAlreadyExistsError extends Error {
	constructor() {
		super();
		this.name = 'UserAlreadyExistsError';
		this.message = 'E-mail already exists.';
	}
}
