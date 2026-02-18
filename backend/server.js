const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://mongo:27017/todo");

const TodoSchema = new mongoose.Schema({
  title: String
});

const Todo = mongoose.model("Todo", TodoSchema);

// CREATE
app.post("/todos", async (req, res) => {
  const todo = await Todo.create(req.body);
  res.json(todo);
});

// READ
app.get("/todos", async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
});

// DELETE
app.delete("/todos/:id", async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id);
  res.send("Deleted");
});

app.listen(5000, () => console.log("Server running"));

