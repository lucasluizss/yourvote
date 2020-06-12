import { celebrate, Joi, Segments } from 'celebrate';

export const LoginValidator = celebrate({
	[Segments.BODY]: Joi.object().keys({
		username: Joi.string(),
		email: Joi.string().required().email(),
		password: Joi.string().required(),
	})
}, {
	abortEarly: false
});