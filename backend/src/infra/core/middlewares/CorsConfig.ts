import { Request, Response, NextFunction } from 'express';

export default {
	undefinedOriginValidator: (
		request: Request,
		response: Response,
		next: NextFunction,
	) => {
		const origin = request.headers.origin || request.headers.host;

		if (!origin) {
			return response.json({
				message: `Hi you are visiting the service locally. If this was a CORS the origin header should not be ${origin}`,
			});
		}

		return next();
	},
	corsConfiguration: {
		origin: (_: any, cb: any) => cb(null, true),
		optionsSuccessStatus: 200,
	},
};