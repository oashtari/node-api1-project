const express = require('express');

const shortid = require('shortid');

const server = express();

let users = [
    {
        id: shortid.generate(),
        name: "Mike Johnson",
        bio: "He dances"
    },
    {
        id: shortid.generate(),
        name: "Jane Matthewson",
        bio: "She writes"
    }
];

server.listen(4500, () => {
    console.log('listening on 4500')
})


server.use(express.json());


// GET TO TEST
server.get('/', (req, res) => {
    res.send('you are connected')
})

//POST 
server.post('/api/users', (req, res) => {
    const user = req.body;
    user.id = shortid.generate();

    if (!user.name || !user.bio) {
        res
            .status(400)
            .json({ message: 'Please provide name and bio for the user.' })

    } else if (user.name && user.bio) {
        users.push(user);
        res.status(201).json(user);

    } else {
        res
            .status(500)
            .json({ message: 'There was an error while saving the user to the database.' })
    }
})

// GET to api/users

server.get('/api/users', (req, res) => {
    if (req.body) {
        res
            .status(200)
            .json(users)
    } else {
        res
            .status(500)
            .json({ message: "The users information could not be retrieved." })
    }
})
