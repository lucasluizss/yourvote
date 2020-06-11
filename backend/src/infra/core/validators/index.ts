import { celebrate, Joi } from 'celebrate';
const phoneJoi = Joi.extend(require('joi-phone-number'));

export const UserValidator = celebrate({
	body: Joi.object().keys({
		username: Joi.string().required(),
		name: Joi.string().required(),
		email: Joi.string().required().email(),
		phone: phoneJoi.string().required().phoneNumber().validate('+5511111111111'),
	})
}, {
	abortEarly: false
});

export const ItemValidator = celebrate({
	body: Joi.object().keys({
		title: Joi.string().required()
	})
}, {
	abortEarly: false
});