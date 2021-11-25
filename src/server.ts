import "reflect-metadata";

import app from "./app";
import "./db/connect";

const port = process.env.PORT || 80;

app.listen(port, () => console.log(`🔥 Server started at http://localhost:${port}`));
