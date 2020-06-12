import { celebrate, Joi, Segments } from 'celebrate';

export const CreateUserValidator = celebrate({
	[Segments.BODY]: Joi.object().keys({
		username: Joi.string().required(),
		name: Joi.string().required(),
		email: Joi.string().required().email(),
		password: Joi.string().required(),
		phone: Joi.string().required(),
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
		phone: Joi.string().required()
	}),
	[Segments.HEADERS]: Joi.object({
    authorization: Joi.string().required()
  }).unknown(),
}, {
	abortEarly: false
});
