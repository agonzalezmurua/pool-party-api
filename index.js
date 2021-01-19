require("dotenv").config();
const osuService = require("./services/osu");
const oauthService = require("./services/oauth");
const Express = require("express");
const app = Express();
const port = process.env.APP_PORT || 3000;
const router = Express.Router();

router.get("/api/beatmapsets/:id", async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const { data } = await osuService.getBeatmapsets(id);
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).send();
  }
});

app.use(router);

oauthService
  .oauthSetup()
  .then(() => {
    const server = app.listen(port);
    server.on("listening", () => {
      console.log("app is ready and listening to port", port);
    });
  })
  .catch((error) => {
    console.error(
      "Failed to configure oath service before initialization",
      error
    );
  });
