export default interface Result<T> {
	successed: boolean;
	failed: boolean;
	data: T;
}
