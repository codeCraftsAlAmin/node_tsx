import app from "./app";
import config from "./config";
const port = config.port;

// * localhost runner
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
