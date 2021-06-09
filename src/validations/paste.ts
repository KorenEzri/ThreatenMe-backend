import Joi from 'joi';
export const pasteSchema = Joi.object({
  source: Joi.string().required(),
  title: Joi.string().required(),
  language: Joi.string().required(),
  posted_by: Joi.string().required(),
  body: Joi.string().required(),
});
