const express = require("express");

const db = require("../data/db-config.js");
const users = require("./users-models");
const { json } = require("express");

const router = express.Router();

router.get("/", async(req, res) => {
  try {
    user = await users.find()
    .then (user => {
      if (user) {
        res.json(user)
      }
    })
   
  }
   catch (err){
    console.log(err);
    res.json(500).json({ message: "problem with db", error: err });
    }
});



router.get('/:id', async (req, res) => {
  try {
      const  {id}  = req.params;
      const user = await users.findById(id)
     
          .then(user => { 
              if (user) {
                res.status(200).json(user)}
              else { 
                 res.status(404).json({message: "id not found"})
                  
              }
               })
  } catch (err) {
      console.log(err);
      res.json(500).json({ message: "problem with db", error: err });
  }
});

router.get("/:id/posts", async (req, res) => {
  
  try {
    const {id} =req.params;
    const posts = await users.findPosts(id)
    .then(posts => {
      if (posts) {
        console.log(posts)
        res.status(200).json(posts)
      }
     else {
      res.status(404).json({message: "Posts not found"})
    } 
    })
    
  }
  catch (err) {
    res.status(500).json({message: "problem with the db", error: err});
  }
})



router.post("/" , async (req, res) => {
   const userData = req.body;
  try {
   
    const newUser = await users.add(userData)
    .then(newUser => {
     if (newUser){
       res.status(201).json(newUser)
     }
     else { res.status(404).json({ message: "id not found" })} 
      
    } )
  }
  catch (err){
    res.status(500).json({message: "problem with the db", error: err});
  }
})



router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const changes = req.body;
    try {
      const count = await users.update(changes, id)
      .then (user => {
        if (user) {
          res.json(user)
        }
        else {
          res.status(404).json({ message: "Could not find user with given id" });
        }
      })
     
    }
    catch (err) {
      res.status(500).json({message: "problem with the db", error: err});
    }
})

// router.delete("/:id", (req, res) => {
//   const { id } = req.params;

//   db("users")
//     .where({ id })
//     .del()
//     .then(count => {
//       if (count) {
//         res.json({ removed: count });
//       } else {
//         res.status(404).json({ message: "Could not find user with given id" });
//       }
//     })
//     .catch(err => {
//       res.status(500).json({ message: "Failed to delete user" });
//     });
// });

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const count = await users.remove(id)
    .then(count => {
      if (count) 
      res.json({removed: count});
      else {
        res.status(404).json({ message: "Could not find user with given id" });
      }
    })
  }
  catch (err) {
    res.status(500).json({ message: "Failed to delete user" });
  }
})
module.exports = router;
