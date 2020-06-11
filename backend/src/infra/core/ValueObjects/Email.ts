class Email {
	constructor(value: string) {
		this.validate(value);
		this.value = value;
	}

	public value: string;

	private validate(value: string) : void {
		if (!/^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i.test(value)) {
			throw new Error('Email is invalid!');
		}
	}
}

export default Email;