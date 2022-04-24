const express = require("express");
const req = require("express/lib/request");
const res = require("express/lib/response");
const app = express(); 

const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const users = [{
  id: 1,
  name: "Baba SOW",
  age : 22, },

  {
    id: 2,
    name: " SOW",
    age : 22,
  }
];

//Routes
app.post('/create', (req, res) => {
    if(!Object.keys(req.body).length){
      return res.status(400).json({
        message: "Request body cannot be empty"
      });
    }
    const {name,age} = req.body;
    if(!name || !age){
      res.status(400).json({
        message : "Ensure you sent both name and age",
      });
    }

    const newUser = {
      id: users.length + 1,
      name,
      age,
    };

    try {
      users.push(newUser);
      res.status(201).json({
        message: "Successfully created a new user",
      });
    } catch(error){
      res.status(500).json({
        message: "Failed to create user", 
      });
    }
});

app.get('/users', (req, res)=> {
  try {
    res.status(200).json({
      users
    });
  } catch(error){
    res.status(500).json({
      message : "Failed to retrieve all users "
    });
  }
});

app.get('users/:userID', (req, res)=>{
     const id = parseInt(req.params.userID);
     console.log(id);

     try {
       let user = users.find((user) =>user.id === id);
       if(user) {
         return res.status(404).json({
           message: "User not found"
         });
       }
        res.status(200).json({
          user,
        });
     } catch(error) {
       res.status(500).json({
         message : "Failed to retrieve user"
       });
     }
});

app.put('/users/:userID', (req, res)=>{
    try {
      const id = parseInt(req.params.userID);
      let user = users.find((user)=> user.id == id );
      if(!user) {
        return res.status(404).json({
          message : "User not found",
        });
      }
      const userIDX = users.indexOf(user);
      users[userIDX].name = req.body.name || userIDX[userIDX].name;
      users[userIDX].age = req.body.age || users[userIDX].age ;

      res.status(200).json({
        message : "Successfully updated user" ,
        user
      })
    }catch(error){
        res.status(500).json({
          message: "Failed to retrieve user", 
        });
    }
})
app.delete('/delete/:userID',(req,res) => {
    try {
      const id = req.params.userID;
      let userIDX = users.findIndex((user)=> user.id === id);
      if (!userIDX){
        res.status(404).json({
          message : "User not found",
        });
      }
      users.splice(userIDX,1);
      res.status(200).json({
        message: "Successfully deleted user ", 
        users,
      });
    } catch(error) {
      res.status(500).json({
        message : "Failed to delete user",
      });
    }
})

app.delete('/users', (req, res) => {
  try {
    users.splice(0, users.length);
    res.status(500).json({
      message: "Successfully deleted all users",
      users,
    });
  } catch (error) {
    res.status(500).json({
      message : "Failed to delete users",

      x,
    })
  }
});


app.listen(PORT, () =>{
  console.log('Server running on port ${ PORT}')
})