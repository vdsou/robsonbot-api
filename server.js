require("dotenv").config();
const { app, connectDB, client } = require("./src/app");
const PORT = process.env.PORT | 3000;

async function main() {
  await connectDB();
  await app.listen(PORT, async () => {
    console.log("Connected to port: ", PORT);
  });
  await client.on("ready", async () => {
    console.log("Logged in as", client.user.tag);
  });
}
// start
main();