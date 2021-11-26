import { Joi, celebrate, Segments } from "celebrate";

const cinema = Joi.object().keys({
  name: Joi.string().min(5).required(),
  address: Joi.string().min(5).required(),
})

const user = Joi.object().keys({
  name: Joi.string().min(5).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
});

const createCinemaSchema = Joi.object().keys({
  cinema,
  user
});

const updateCinemaSchema = cinema;

export default {
  createCinemaValidator: celebrate({ [Segments.BODY]: createCinemaSchema }),
  updateCinemaValidator: celebrate({ [Segments.BODY]: updateCinemaSchema }),
};
