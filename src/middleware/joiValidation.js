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

export const updateAdminValidation = (req, res, next) => {
  try {
    ///define schema

    const schema = Joi.object({
      fName: Joi.string().required().min(3).max(30),
      lName: Joi.string().required().min(3).max(30),
      email: Joi.string().email({ minDomainSegments: 2 }).required(),
      phone: Joi.string().required(),
      address: Joi.string().allow(""),
      password: Joi.string().required().min(5),
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

export const updatePaymentValidation = (req, res, next) => {
  try {
    //define the schema
    const schema = Joi.object({
      _id: Joi.string().min(3).max(100).required(),
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

export const NewProductValidation = (req, res, next) => {
  try {
    req.body.salesPrice = req.body.salesPrice || 0;

    //define the schema
    const schema = Joi.object({
      status: Joi.string().required(),
      name: Joi.string().min(3).max(100).required(),
      parentCat: Joi.string().min(3).max(100).required(),
      sku: Joi.string().min(3).max(100).required(),
      price: Joi.number().required(),
      qty: Joi.number().required(),
      salesPrice: Joi.number(),
      description: Joi.string().min(3).max(10000).required(),
      salesStartDate: Joi.string().allow("", null),
      salesEndDate: Joi.string().allow("", null),
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

export const UpdateProductValidation = (req, res, next) => {
  try {
    req.body.salesPrice = req.body.salesPrice || 0;
    req.body.salesStartDate =
      req.body.salesStartDate === "null" || !req.body.salesStartDate
        ? null
        : req.body.salesStartDate;

    req.body.salesEndDate =
      req.body.salesEndDate === "null" || !req.body.salesEndDate
        ? null
        : req.body.salesEndDate;

    //define the schema
    const schema = Joi.object({
      _id: Joi.string().required(),
      status: Joi.string().required(),
      name: Joi.string().min(3).max(100).required(),
      parentCat: Joi.string().min(3).max(100).required(),

      price: Joi.number().required(),
      qty: Joi.number().required(),
      salesPrice: Joi.number(),
      description: Joi.string().min(3).max(10000).required(),
      salesStartDate: Joi.string().allow("", null),
      salesEndDate: Joi.string().allow("", null),
      images: Joi.string().min(3).max(10000).allow(""),
      thumbnail: Joi.string().min(3).max(10000).allow(""),
    });

    const { error } = schema.validate(req.body);

    req.body.images = req.body.images.split(",");

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
