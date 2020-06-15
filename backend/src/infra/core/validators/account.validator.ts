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

export const ResetPasswordValidator = celebrate({
	[Segments.BODY]: Joi.object().keys({
		email: Joi.string().required().email(),
		password: Joi.string().required(),
		newpassword: Joi.string().required(),
	})
}, {
	abortEarly: false
});