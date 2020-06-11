import { celebrate, Joi, Segments } from 'celebrate';
const phoneJoi = Joi.extend(require('joi-phone-number'));

export const CreateUserValidator = celebrate({
	[Segments.BODY]: Joi.object().keys({
		username: Joi.string().required(),
		name: Joi.string().required(),
		email: Joi.string().required().email(),
		password: Joi.string().required(),
		phone: phoneJoi.string().required().phoneNumber().validate('+5511111111111'),
	})
}, {
	abortEarly: false
});

export const UpdateUserValidator = celebrate({
	[Segments.BODY]: Joi.object().keys({
		id: Joi.string().required(),
		username: Joi.string().required(),
		name: Joi.string().required(),
		email: Joi.string().required().email(),
		password: Joi.string().required(),
		phone: phoneJoi.string().required().phoneNumber().validate('+5511111111111'),
	}),
	[Segments.HEADERS]: Joi.object({
    token: Joi.string().required()
  }).unknown(),
}, {
	abortEarly: false
});

export const LoginValidator = celebrate({
	[Segments.BODY]: Joi.object().keys({
		username: Joi.string(),
		email: Joi.string().required().email(),
		password: phoneJoi.string().required(),
	})
}, {
	abortEarly: false
});
