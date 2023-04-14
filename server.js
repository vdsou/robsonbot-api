require("dotenv").config();
const { app, connectDB } = require("./src/app");
const PORT = process.env.PORT || 3000;

async function main() {
  await connectDB();
  await app.listen(PORT, async () => {
    console.log("Connected to port: ", PORT);
  });
}
// start
main();
