import Joi from "joi";

export const newAdminValidation = (req, res, next) => {
  try {
    ///define schema

    const schema = Joi.object({
      fName: Joi.string().required().min(3).max(30),
      lName: Joi.string().required().min(3).max(30),
      email: Joi.string().email({ minDomainSegments: 2 }).required(),
      phone: Joi.string().required(),
      address: Joi.string().allow(""),
      password: Joi.string().required().min(6),
    });

    const { values, error } = schema.validate(req.body);

    //check data against the rule

    error
      ? res.json({
          status: "error",
          message: error.message,
        })
      : next();
  } catch (error) {
    next(error);
  }
};

export const newAdminVerificationValidation = (req, res, next) => {
  try {
    ///define schema

    const schema = Joi.object({
      e: Joi.string().email({ minDomainSegments: 2 }).required(),
      c: Joi.string().min(3).max(100).required(),
    });

    const { values, error } = schema.validate(req.body);

    console.log(values, error);

    //check data against the rule

    error
      ? res.json({
          status: "error",
          message: error.message,
        })
      : next();
  } catch (error) {
    next(error);
  }
};

export const updateCatValidation = (req, res, next) => {
  try {
    //define the schema
    const schema = Joi.object({
      _id: Joi.string().min(3).max(100).required(),
      title: Joi.string().min(3).max(100).required(),
      status: Joi.string().min(3).max(100).required(),
    });

    const { error } = schema.validate(req.body);

    error
      ? res.json({
          status: "error",
          message: error.message,
        })
      : next();
  } catch (error) {
    next(error);
  }
};

export const loginValidation = (req, res, next) => {
  try {
    //define the schema
    const schema = Joi.object({
      email: Joi.string().email({ minDomainSegments: 2 }).required(),
      password: Joi.string().min(3).max(100).required(),
    });

    const { error } = schema.validate(req.body);

    error
      ? res.json({
          status: "error",
          message: error.message,
        })
      : next();
  } catch (error) {
    next(error);
  }
};

////payment option vbalidation///

export const NewPaymentValidation = (req, res, next) => {
  try {
    //define the schema
    const schema = Joi.object({
      title: Joi.string().min(3).max(100).required(),
      status: Joi.string().min(3).max(100).required(),
      description: Joi.string().min(3).max(100).required(),
    });

    const { error } = schema.validate(req.body);

    error
      ? res.json({
          status: "error",
          message: error.message,
        })
      : next();
  } catch (error) {
    next(error);
  }
};
