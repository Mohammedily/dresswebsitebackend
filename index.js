const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const ClientRouter = require("./routes/Client");
const AdminRouter = require("./routes/Admin");
const dotenv = require("dotenv");
const AdminProductRouter = require("./routes/AdminProduct");
const CartRouter = require("./routes/Cart");
const orderrouter = require("./routes/Order");
const adminorder = require("./routes/adminOrders");


dotenv.config();

mongoose.connect(process.env.MONGO)
.then(()=> console.log(`mongodb is connected`))
.catch((error) => console.log(error));

// middlewares
app.use(express.json());
app.use(cors());

// routes
app.use(ClientRouter);
app.use(AdminRouter);
app.use(AdminProductRouter);
app.use(CartRouter);
app.use(orderrouter);
app.use(adminorder);

const port = process.env.PORT;
app.listen(port, console.log(`https://localhost:${port}/`));

