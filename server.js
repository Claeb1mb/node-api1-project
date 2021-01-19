const express = require("express");

const User = require("./data")

const server = express()

server.use(express.json());



server.get('/', (req, res) => {
    res.json({ message: "Calebs Server"});
});

//Post - Create 

//
server.post('/api/users', async (req, res) => {
const users = req.body;

// If the body is missing name or bio respond with status 400
if ( !users.name || !users.bio ){

    res.status(400).json({message: "Please provide name and bio for the user."})
} else {
    try {
        const newUser = await User.create(users);

        res.status(201).json(newUser);

    } catch (err) {

        res.status(500).json({ error: "There was an error while saving the user to the database"});

    }

}


})


// Get - Read
server.get('/api/users', async(req, res) => {

    try{
        const users = await User.getUsers();
        res.status(200).json(users)

    } catch (err) {
        res.status(500).json({message: "The user with the specified ID does not exist."})
    }

});

server.get('/api/users/:id', async (req, res) => {
    const { id } = req.params;

    try {
  const users = await USER.getUserById(id);

  // if the user is not found is why i use
  if(!users) {
      res.status(200).json(users)
      
  } else {
    res.status(404).json({message: "The user with the specified ID does not exist."})
  }

    } catch (err) {
        res.status(500).json({errorMessage: "The user information could not be retrieved."})
        
    }

});
 
// Delete - Delete 

server.delete('/api/users/:id', async(req, res) => {
    const { id } = req.params
    
    try{
        const users = await USER.deleteUser(id)

        if(users) {

            res.status(200).json(users)
        } else {
            res.status(404).json({ message: "The user with the specified ID does not exist."})
        }

    } catch (err) {
        res.status(500).json({ errorMessage: "The user could not be removed"})
    }

});


//Put - Update

server.put('/api/users/:id', async(req, res) => {
    const {id} = req.params

    try {
        const users = await Users.updateUser(id)

        if(users) {
            res.status(404).json({ message: "The user with the specified ID does not exist."})
            res.send(200)
        } else if (!req.name && !req.bio) {
            res.status(400).json({ errorMessage: "Please provide name and bio for the user."})
        }
    } catch (err) {
        res.status(500).json({ errorMessage: "The user information could not be modified."})

    }

    

});







// same as export default in react module.export will export the file for use 

module.exports = server;