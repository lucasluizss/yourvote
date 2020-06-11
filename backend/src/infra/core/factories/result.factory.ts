interface IResult {
	successed: boolean;
	failed: boolean;
	message: string;
}

export default class Result implements IResult {

	constructor(successed: boolean, data: any, message: string) {
		this.successed = successed;
		this.failed = !successed;
		this.message = message;
		this.data = data;
	}

	successed: boolean;
	failed: boolean;
	message: string;
	data: any;

	static Success(data = {}, message = ''): IResult {
		const result = new Result(true, data, message);

		if (!result.message) {
			delete result.message;
		}

		if (!result.data) {
			delete result.data;
		}

		return result;
	}

	static Fail(message = ''): IResult {
		const result = new Result(false, {}, message);

		if (!result.message) {
			delete result.message;
		}

		if (!result.data) {
			delete result.data;
		}

		return result;
	}
}