const router = require("express").Router();

router.get("/", (req, res) => {
    res.send("yoyo auth");
});

module.exports = router