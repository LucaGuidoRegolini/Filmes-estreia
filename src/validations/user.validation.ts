import { Joi, celebrate, Segments } from "celebrate";

const localLoginScheme = Joi.object().keys({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
});

const createUserSchema = Joi.object().keys({
  name: Joi.string().min(5).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  role: Joi.valid("admin", "analyze", "register"),
});

const updateUserSchema = Joi.object().keys({
  name: Joi.string().min(5).required(),
  email: Joi.string().email().required(),
  role: Joi.valid("admin", "analyze", "register"),
});

export default {
  createUserValidator: celebrate({ [Segments.BODY]: createUserSchema }),
  updateUserValidator: celebrate({ [Segments.BODY]: updateUserSchema }),
  localLoginValidator: celebrate({ [Segments.BODY]: localLoginScheme }),
};
