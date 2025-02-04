// backend.js
import express from "express";
import cors from "cors";

const app = express();
const port = 8000;
const users = {
  users_list: [
    {
      id: "xyz789",
      name: "Charlie",
      job: "Janitor"
    },
    {
      id: "abc123",
      name: "Mac",
      job: "Bouncer"
    },
    {
      id: "ppp222",
      name: "Mac",
      job: "Professor"
    },
    {
      id: "yat999",
      name: "Dee",
      job: "Aspring actress"
    },
    {
      id: "zap555",
      name: "Dennis",
      job: "Bartender"
    }
  ]
};
// Math.random()
//genetate id on server
const generateID = () => {
  return Math.random().toString();
}

const findUserById = (id) =>
  users["users_list"].find((user) => user["id"] === id);

const findUserByName = (name) => {
  return users["users_list"].filter(
    (user) => user["name"] === name
  );
};

//edited add user to push id
const addUser = (user) => {
  const id = generateID();
  const UserwithID = {id, ... user}
  users["users_list"].push(UserwithID);
  return user;
};


//cors app
app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Behold, the God of Thunder! Behold, Dark Child! LE-GEN-DARY! FEAR MAGNETO! PURE CHAOS! ARMED AND DANGEROUS! AGAIN");
});

app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );
});

app.get("/users", (req, res) => {
  const name = req.query.name;
  if (name != undefined) {
    let result = findUserByName(name);
    result = { users_list: result };
    res.send(result);
  } else {
    res.send(users);
  }
});

app.get("/users", (req, res) => {
  res.send(users);
});

app.get("/users/:id", (req, res) => {
  const id = req.params["id"]; //or req.params.id
  let result = findUserById(id);
  if (result === undefined) {
    res.status(404).send("Resource not found.");
  } else {
    res.send(result);
  }
});

app.post("/users", (req, res) => {
  const userToAdd = req.body;
  addUser(userToAdd);
  res.send();
});

//app for delete
app.delete("/users/:id", (req, res) => {
  const id = req.params["id"]; //or req.params.id
  let result = findUserById(id);
  if (result == undefined){
    res.status(404).send("Resource not found")
  }
  else 
  {
    const loc = users.users_list.findIndex(user => user.id == id);
    users.users_list.splice(loc, 1);
  }
}) 
//const to find user by job
const findUserJob = (job) => {
  return users["users_list"].filter(
    (user) => user["job"] === job
  );
};

//const to find user by name and job
const findUserNameJob = (name, job) => {
  return users["users_list"].filter(
    (user) => user["name"] === name && user["job"] === job
  );
};

//app to get users and job

app.get("/users", (req, res) => {
  const name = req.query.name;
  const job = req.query.job;
  if (name != undefined && job != undefined){
    let result = findUserNameJob(name, job);
    result = { users_list: result };
    res.send(result);
  }
  else {
    res.send(users);
  }

})

//Use 201 Content Created
app.post("/users", (req, res) => {
  const userToAdd = req.body;
  const user = addUser(userToAdd);
  res.status(201).send(user);
})




// app.get("users/job", (req, res) => {
//   const name = req.query.name;
//   const job = req.query.job;
//   if (name != undefined && job != undefined){
//     let result = findUserNameJob(name, job);
//     result = { users_list: result };
//     res.send(result);
//   }
//   else {
//     res.send(users);
//   }

// })



// app.post("/users", (req, res) => {
//   const userToAdd = req.body;
//   addUser(userToAdd);
//   res.send();
// });

// //app for delete
// app.delete("users/:id", (req, res) => {
//   const id = req.params["id"]; //or req.params.id
//   let result = findUserById(id);
//   if (result == undefined){
//     res.status(404).send("Resource not found")
//   }
//   else 
//   {
//     const loc = users.users_list.findIndex(user => user.id == id);
//     users.users_list.splice(loc, 1);
//   }
// }) 