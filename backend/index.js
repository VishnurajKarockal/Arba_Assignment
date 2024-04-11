const express = require("express");
const { connection } = require("./config/db");
const { userRouter } = require("./routes/user.routes");
const { auth } = require("./middlewares/auth.middleware");
const { categoryRouter } = require("./routes/category.routes");
const { productRouter } = require("./routes/product.routes");
const app = express();
require("dotenv").config();
const port = process.env.port;

app.use("/users", userRouter);
app.use("/category", categoryRouter);
app.use("/products", productRouter);
// app.get("/", auth, (req, res) => {
//   res.send("This is the Home route");
// });

app.listen(port, async () => {
  try {
    await connection;
    console.log(`Server is running at port ${port}`);
  } catch (error) {
    console.log({ msg: error.message });
  }
});
