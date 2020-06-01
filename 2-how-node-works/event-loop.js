const fs = require("fs");
const crypto = require("crypto");

const start = Date.now();
process.env.UV_THREADPOOL_SIZE = 6;

setTimeout(() => console.log("Timer 1 finished!"), 0);

setImmediate(() => console.log("Immediate 1 finished!"));

fs.readFile("test-file.txt", () => {
  console.log("IO Finished!");
  console.log("--------------------------");

  setTimeout(() => console.log("Timer 2 finished!"), 0);
  setTimeout(() => console.log("Timer 3 finished!"), 3000);
  setImmediate(() => console.log("Immediate 2 finished!"));
  process.nextTick(() => console.log("process.nextTick"));

  crypto.pbkdf2("Password", "salt", 100000, 1024, "sha512", () => {
    console.log(`Password Encrypted in ${Date.now() - start}`);
  });

  crypto.pbkdf2("Password", "salt", 100000, 1024, "sha512", () => {
    console.log(`Password Encrypted in ${Date.now() - start}`);
  });
  crypto.pbkdf2("Password", "salt", 100000, 1024, "sha512", () => {
    console.log(`Password Encrypted in ${Date.now() - start}`);
  });
  crypto.pbkdf2("Password", "salt", 100000, 1024, "sha512", () => {
    console.log(`Password Encrypted in ${Date.now() - start}`);
  });
  crypto.pbkdf2("Password", "salt", 100000, 1024, "sha512", () => {
    console.log(`Password Encrypted in ${Date.now() - start}`);
  });
  crypto.pbkdf2("Password", "salt", 100000, 1024, "sha512", () => {
    console.log(`Password Encrypted in ${Date.now() - start}`);
  });
});

console.log("Hello from the top-level code!");
