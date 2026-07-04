const express = require("express");
const router = express.Router();

const postController = require("../controllers/postController");

router.post("/", (req, res) => postController.create(req, res));
router.get("/", (req, res) => postController.findAll(req, res));
router.get("/:id", (req, res) => postController.findById(req, res));
router.put("/:id", (req, res) => postController.update(req, res));
router.delete("/:id", (req, res) => postController.delete(req, res));
router.get("/search", (req, res) => postController.search(req, res));

module.exports = router;