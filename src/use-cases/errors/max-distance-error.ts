export class MaxDistanceError extends Error {
	constructor() {
		super();
		this.name = 'MaxDistanceError';
		this.message = 'Max. distance reached.';
	}
}
