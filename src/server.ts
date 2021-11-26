import "reflect-metadata";

import app from "./app";
import "./db/connect";

const port = process.env.PORT || 80;
const url = process.env.BASE_URL || "localhost";

app.listen(port, () => console.log(`🔥 Server started at http://${url}:${port}`));
