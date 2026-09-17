import app from "./src/app.js";
import { connectToDatabase } from "./src/config/database.js";
import config from "./src/config/config.js";

connectToDatabase()
  .then(() =>
    app.listen(config.PORT, () =>
      console.log(`Server is running on port ${config.PORT}`),
    ),
  )
  .catch((error) => {
    console.error("Failed to start server", error);
    process.exit(1);
  });
