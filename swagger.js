const swaggerAutogen = require("swagger-autogen")();

const doc = {
  openapi: "3.0.0",
  info: {
    title: "My API",
    description: "API documentation",
  },
  servers: [
    {
      url: "http://localhost:3000",
    },
  ],
};
const outputFile = "./swagger.json";
const endpointsFiles = ["./routes/index.js"]; // adjust if needed

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  require("./server"); // or app entry file
});