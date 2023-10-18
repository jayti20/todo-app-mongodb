const express = require("express");
const app = express();
const { MongoClient, ObjectId } = require("mongodb");
const handlebars = require("express-handlebars").create({
  defaultLayout: "main",
});

const url =
  "mongodb+srv://user_demo:hpeafEFkboZbBy2w@cluster0.2fqvbad.mongodb.net/?retryWrites=true&w=majority";

app.engine("handlebars", handlebars.engine);
app.set("view engine", "handlebars");

app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

async function connectToMongo(action = "", req) {
  const client = new MongoClient(url);

  try {
    await client.connect();
    const db = await client.db("tasks_db");
    const tasks = await db.collection("tasks");

    switch (action) {
      case "fetch":
        const fetchQuery = await tasks.find({}).toArray();
        console.log("Data fetched successfully !");
        console.log("Fetched task is", fetchQuery);
        return fetchQuery;

      case "add":
        const task_object = { task: req.body.task, date: new Date() };
        const insertQuery = await tasks.insertOne(task_object);
        console.log("Task inserted successfully !", insertQuery);
        return insertQuery;

      case "search":
        const searchQuery = await tasks
          .find({
            task: new RegExp(req.body.search_text, "i"),
          })
          .toArray();
        console.log("Task searched successfully !", searchQuery);
        return searchQuery;

      case "delete":
        const task_object_delete = { _id: new ObjectId(req.params.id) };
        const deleteQuery = await tasks.deleteOne(task_object_delete);
        console.log("Task deleted successfully !", deleteQuery);
        return deleteQuery;

      case "edit":
        const task_object_edit = { _id: new ObjectId(req.params.id) };
        const fetchTaskToEditQuery = await tasks
          .find(task_object_edit)
          .toArray();
        console.log(
          "Task to update fetched successfully !",
          fetchTaskToEditQuery
        );
        return fetchTaskToEditQuery;

      case "update":
        const updateTaskQuery = await tasks.updateOne(
          { _id: new ObjectId(req.params.id) },
          { $set: { task: req.body.task } }
        );
        console.log("Task updated successfully !", updateTaskQuery);
        return updateTaskQuery;
    }
  } catch (err) {
    console.log("The error is", err);
    throw err;
  } finally {
    await client.close();
  }
}

app.get("/", async (req, res) => {
  const tasks = await connectToMongo("fetch", req);
  res.render("todo-ui", { tasks: tasks, taskToEdit: [], enableEditing: false });
});

app.post("/add", async (req, res) => {
  await connectToMongo("add", req);
  res.redirect("/");
});

app.post("/search", async (req, res) => {
  const searchResults = await connectToMongo("search", req);
  res.render("todo-ui", {
    tasks: searchResults,
    taskToEdit: [],
    enableEditing: false,
  });
});

app.post("/delete/:id", async (req, res) => {
  await connectToMongo("delete", req);
  res.redirect("/");
});

app.get("/edit/:id", async (req, res) => {
  const taskToEdit = await connectToMongo("edit", req);
  const tasks = await connectToMongo("fetch", req);
  res.render("todo-ui", {
    tasks: tasks,
    taskToEdit: taskToEdit[0],
    enableEditing: true,
  });
});

app.post("/update/:id", async (req, res) => {
  await connectToMongo("update", req);
  res.redirect("/");
});

app.listen(8000, () => {
  console.log("Listening to server at port 8000");
});
