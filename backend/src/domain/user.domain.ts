import Email from "../infra/core/valueObjects/email";

class UserDomain {
	constructor(username: string, name: string, email: string) {
		this.username = username;
		this.name = name;
		this.email = new Email(email);
	}

	private username: string;
	private name: string;
	private email: Email;

	public getName = () => this.name;
	public getEmail = () => this.email.value;
	public getUsername = () => this.username;
}

export default UserDomain;