const router = require("express").Router();
const articleRoutes = require("./articles");
const articlesController = require("../controllers/articlesController")

router.use("/articles", articleRoutes);
// Define any API routes first
// Get saved articles
router.get("/api/saved", articlesController.find);
// Save articles
router.post("/api/saved", articlesController.insert);
// delete saved articles
router.delete("/api/saved/:id", articlesController.delete);
// Send every other request to the React app

router.get("/*", function(req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});
module.exports = router;
