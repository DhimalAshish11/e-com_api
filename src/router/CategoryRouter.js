import express from "express";
import {
  getCategories,
  insertCategory,
} from "../model/category/categoryModel.js";
import slugify from "slugify";
const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const result = await getCategories();

    res.json({
      status: "success",
      message: "New category has been added",
      result,
    });
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { title } = req.body;

    !title &&
      res.json({
        status: "error",
        message: "title is required",
      });

    const obj = {
      title,
      slug: slugify(title, { trim: true, lower: true }),
    };

    const result = await insertCategory(obj);

    result?._id
      ? res.json({
          status: "success",
          message: "New category has been added",
        })
      : res.json({
          status: "error",
          message: "Error, Category cannot be added",
        });
  } catch (error) {
    next(error);
  }
});

export default router;
