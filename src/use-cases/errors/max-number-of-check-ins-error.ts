export class MaxNumberCheckInsError extends Error {
	constructor() {
		super();
		this.name = 'MaxNumberCheckInsError';
		this.message = 'Max. number of check-ins reached';
	}
}
