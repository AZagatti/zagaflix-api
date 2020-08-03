const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();
const fs = require("fs");

function recoveryData() {
  const origin = fs.createReadStream("./backup_db.json", { flags: "r" });
  const destination = fs.createWriteStream("./db.json", { flags: "w+" });
  origin.pipe(destination);
}

setInterval(() => {
  recoveryData();
}, 108000);

const port = process.env.PORT || 3333;

server.use(middlewares);
server.use(router);
server.listen(port, () => {
  console.log(`JSON Server is running in ${port}`);
});
