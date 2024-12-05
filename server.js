// import express
const express = require('express');
const cors = require('cors');

// create an instance of express
const app = express();

// use cors
app.use(cors());

// define the port
const PORT = 8080;

// GET - /api/health - returns a string that says "Hello World!"
app.get("/api/health", (req, res) => {
    try {
        res.send("Hello World!");
    } catch (error) {
        console.log(error);
    }
})

let groceries = [
    {
        id: 1,
        name: "Milk",
        price: 2.99
    },
    {
        id: 2,
        name: "Bacon",
        price: 3.99
    },
    {
        id: 3,
        name: "Eggs",
        price: 1.99
    }
]

// GET - /api/groceries - return all groceries
app.get("/api/groceries", (req, res) => {
    try {
        res.json(groceries);
    } catch (error) {
        console.log(error);
    }
})

// GET - /api/groceries/:id - return a single grocery item by id
app.get("/api/groceries/:id", (req, res) => {
    try {
        // get the id from the request
        const id = req.params.id;

        // find the grocery item by id
        const grocery = groceries.find(
            (grocery) => grocery.id === parseInt(id)
        )

        // if the grocery item is not found
        if (!grocery) {
            res.status(404).send("Grocery item not found");
        }

        // return the grocery item
        res.status(200).json(grocery);
    } catch (error) {
        console.log(error);
    }
})

// route 404 not found
app.use((req, res) => {
    res.status(404).send("404 Not Found");
})

// make it listen on the port
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});