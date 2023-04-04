export class LateCheckInValidationError extends Error {
	constructor() {
		super();
		this.name = 'LateCheckInValidationError';
		this.message =
			"The check-in can only be validated until 20 minutes of it's creation";
	}
}
