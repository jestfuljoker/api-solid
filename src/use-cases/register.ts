import { hash } from 'bcryptjs';

interface RegisterUseCaseRequest {
	name: string;
	email: string;
	password: string;
}

export class RegisterUseCase {
	constructor(private usersRepository: any) {}

	async handle({
		email,
		name,
		password,
	}: RegisterUseCaseRequest): Promise<void> {
		const userWithSameEmail = await this.usersRepository.findUnique(email);

		if (userWithSameEmail) {
			throw new Error('E-mail already exists');
		}

		const passwordHash = await hash(password, 6);

		await this.usersRepository.create({
			email,
			name,
			passwordHash,
		});
	}
}
