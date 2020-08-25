interface IResult {
	successed: boolean;
	failed: boolean;
	message?: string;
}

export default class Result implements IResult {

	constructor(successed: boolean, data?: any, message?: string) {
		this.successed = successed;
		this.failed = !successed;
		this.message = message;
		this.data = data;
	}

	successed: boolean;
	failed: boolean;
	message?: string | undefined;
	data?: any;

	static Success(data?: any, message?: string): IResult {
		const result = new Result(true, data, message);

		if (!result.message) {
			delete result.message;
		}

		if (!result.data) {
			delete result.data;
		}

		return result;
	}

	static Fail(message?: string): IResult {
		const result = new Result(false, null, message);

		if (!result.message) {
			delete result.message;
		}

		if (!result.data) {
			delete result.data;
		}

		return result;
	}
}