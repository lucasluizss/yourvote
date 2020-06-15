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

export const ConfirmEmailValidator = celebrate({
	[Segments.PARAMS]: Joi.object().keys({
		token: Joi.string().required(),
	})
}, {
	abortEarly: false
});

export const ActiveUserValidator = celebrate({
	[Segments.BODY]: Joi.object().keys({
		id: Joi.string().required(),
	})
}, {
	abortEarly: false
});

export const ForgotPasswordValidator = celebrate({
	[Segments.BODY]: Joi.object().keys({
		email: Joi.string().required().email(),
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