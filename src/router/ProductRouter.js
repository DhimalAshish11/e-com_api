import express from "express";
import slugify from "slugify";
import multer from "multer";

import {
  deleteProductById,
  getProduct,
  getProductById,
  insertProduct,
  updateProductById,
} from "../model/product/ProductModel.js";
import {
  NewProductValidation,
  UpdateProductValidation,
} from "../middleware/joiValidation.js";
const router = express.Router();
const imgFolderPath = "public/imgs/product";
//setup multer middleware

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let error = null;

    ///validation check
    cb(error, imgFolderPath);
  },
  filename: (req, file, cb) => {
    let error = null;
    ///construct rename file
    const fullFileName = Date.now() + "-" + file.originalname;

    cb(error, fullFileName);
  },
});

const upload = multer({ storage });

//////where do you want to store your file

//what name you want to give itjoi

router.get("/:_id?", async (req, res, next) => {
  try {
    const { _id } = req.params;

    const products = _id ? await getProductById(_id) : await getProduct();

    res.json({
      status: "success",
      message: "Here are the product",
      products,
    });
  } catch (error) {
    next(error);
  }
});

router.post(
  "/",
  upload.array("images", 5),
  NewProductValidation,
  async (req, res, next) => {
    try {
      console.log(req.files);

      if (req.files.length) {
        req.body.images = req.files.map((item) => item.path);
        req.body.thumbnail = req.body.images[0];
      }

      req.body.slug = slugify(req.body.name, { trim: true, lower: true });

      const result = await insertProduct(req.body);
      result?._id
        ? res.json({
            status: "success",
            message: "Herre are product",
          })
        : res.json({
            status: "error",
            message: "Error, order cannot be added.",
          });
    } catch (error) {
      let msg = error.message;

      if (msg.includes("E11000 duplicate key error")) {
        error.statusCode = 400;

        error.message =
          "The product slug or sku alread related to another product, change name and sku and try agin later.";
      }

      next(error);
    }
  }
);

router.put(
  "/",
  upload.array("images", 5),
  UpdateProductValidation,
  async (req, res, next) => {
    try {
      console.log(req.files);

      if (req.files.length) {
        const newImgs = req.files.map((item) => item.path);
        req.body.images = [...req.body.images, ...newImgs];

        /*   req.body.thumbnail = req.body.images[0]; */
      }

      req.body.slug = slugify(req.body.name, { trim: true, lower: true });

      const result = await updateProductById(req.body);
      result?._id
        ? res.json({
            status: "success",
            message: "Product has been updated sucessfully",
          })
        : res.json({
            status: "error",
            message: "Error, unable to update.",
          });
    } catch (error) {
      next(error);
    }
  }
);

router.delete("/:_id", async (req, res, next) => {
  try {
    const { _id } = req.params;

    const result = await deleteProductById(_id);

    result?._id
      ? res.json({
          status: "success",
          message: "The  product has been deleted successfully",
        })
      : res.json({
          status: "error",
          message: "Unable to delete the product, try again later",
        });
  } catch (error) {
    next(error);
  }
});

export default router;
