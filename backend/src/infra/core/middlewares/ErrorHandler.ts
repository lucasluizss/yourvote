import { Request, Response, NextFunction } from 'express';
import Result from '../factories/result.factory';

export const errorHandler = (error: any, request: Request, response: Response, next: NextFunction) => {
	switch (true) {
		case typeof error === 'string':
			const is404 = error.toLowerCase().endsWith('not found');
			const statusCode = is404 ? 404 : 400;
			return response.status(statusCode).json(Result.Fail(error.message));
		case error.name === 'ValidationError':
			return response.status(400).json(Result.Fail(error.message));
		case error.name === 'UnauthorizedError':
			return response.status(401).json(Result.Fail('Unauthorized'));
		default:
			return response.status(500).json(Result.Fail(error.message));
	}
}