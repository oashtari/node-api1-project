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
    },
    {
        id: shortid.generate(),
        name: "person 10",
        bio: "person talks"
    },
    {
        id: shortid.generate(),
        name: "person 20",
        bio: "person speaks"
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


// GET to api/user/:id

server.get('/api/users/:id', (req, res) => {
    const user = users.find(user => user.id === req.params.id);

    if (user) {
        res
            .status(200)
            .json(user)
    } else if (!user) {
        res
            .status(404)
            .json({ message: "The user with the specified ID does not exist." })
    } else {
        res
            .status(500)
            .json({ message: "The user information could not be retrieved." })
    }
})

// DELETE

server.delete('/api/users/:id', (req, res) => {
    const { id } = req.params;

    const deleted = users.find(user => JSON.stringify(user.id) === `${id}`)

    if (deleted) {
        users = users.filter(user => user.id !== id)

        res
            .status(200)
            .json(deleted)

    } else if (!deleted) {
        res
            .status(404)
            .json({ message: "The user with the specified ID does not exist." })
    } else {
        res
            .status(500)
            .json({ message: "The user could not be removed." })
    }
})

// PUT

server.put('/api/users/:id', (req, res) => {

    const { id } = req.params;

    const changes = req.body;

    console.log('changes:', changes)
    console.log('id', id)

    let index = users.findIndex(user => JSON.stringify(user.id) === JSON.stringify(id));

    if (!changes.name || !changes.bio) {
        res
            .status(400)
            .json({ message: 'Please provide name and bio for the user.' })
    } else if (index === -1) {
        res
            .status(404)
            .json({ message: "The user with the specified ID does not exist." })
    } else if (index !== -1) {
        users[index] = changes;
        res
            .status(200)
            .json(users[index]);
    } else {
        res
            .status(500)
            .json({ message: "The user information could not be modified." })
    }
})
