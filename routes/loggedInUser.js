const express = require("express");

const router = express.Router();

//Displays information tailored according to the logged in user
router.get("/profile", async (req, res, next) => {
  try {
    const user = req.user;
    const token = req.query.secret_token;
    res.json({ user, token });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
