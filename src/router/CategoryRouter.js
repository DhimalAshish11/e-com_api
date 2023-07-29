import express from "express";
import {
  deleteCategoryById,
  getCategories,
  insertCategory,
  updateCategoryById,
} from "../model/category/categoryModel.js";
import slugify from "slugify";
import { updateCatValidation } from "../middleware/joiValidation.js";
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
    console.log(title);
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

router.put("/", async (req, res, next) => {
  try {
    const { _id, ...rest } = req.body;
    const result = await updateCategoryById(_id, rest);

    result?._id
      ? res.json({
          status: "success",
          message: "The category has been updated",
        })
      : res.json({
          status: "error",
          message: "Error, Unable to udpate new category.",
        });
  } catch (error) {
    next(error);
  }
});
router.delete("/:_id", async (req, res, next) => {
  const { _id } = req.params;
  try {
    if (_id) {
      const result = await deleteCategoryById(_id);
      result?._id &&
        res.json({
          status: "success",
          message: "The category has been deleted",
        });

      return;
    }

    res.json({
      status: "error",
      message: "Error, Unable to process your request.",
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

export default router;
