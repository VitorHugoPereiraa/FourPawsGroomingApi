require("dotenv").config();
const http = require("http");

const app = require("./src/app");

const PORT = process.env.PORT || 3333;

const server = http.createServer(app);

app.listen(PORT, () => {
  console.log(`Server is running in http://localhost:${PORT}`);
});
