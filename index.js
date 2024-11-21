import app from "./src/app.js";
import { PORT } from "./src/config/config.js";

const data = [
	{ "Server is listening port": PORT, URL: `http://localhost:${PORT}` },
];
app.listen(PORT, () => {
	console.table(data);
});
