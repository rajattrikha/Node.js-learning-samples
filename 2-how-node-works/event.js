const EventEmitter = require("events");
const http = require("http");
class PurchaseRequest extends EventEmitter {
  constructor() {
    super();
  }
}

const myEmitter = new PurchaseRequest();

myEmitter.on("purchaseRequest", () => {
  console.log("There is a new purchase request");
});

myEmitter.on("purchaseRequest", () => {
  console.log("Customer name is Rajat Sharma.");
});

myEmitter.on("purchaseRequest", (stock) => {
  console.log(`There are now ${stock} items left in stock.`);
});

myEmitter.emit("purchaseRequest", 9);

/********************************************************** */
const server = http.createServer();

server.on("request", (req, res) => {
  console.log(req.url);
  console.log("Request Received!");
  res.end("Request Received");
});

server.on("request", (req, res) => {
  console.log("Another Request 🙂");
});

server.on("close", (req, res) => {
  console.log("server closed!");
});

server.listen(8000, "127.0.0.1", () => {
  console.log("server is waiting for requests...");
});
