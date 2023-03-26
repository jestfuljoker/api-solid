export class ResourceNotFound extends Error {
	constructor() {
		super();
		this.name = 'ResourceNotFound';
		this.message = 'Resource not found.';
	}
}
