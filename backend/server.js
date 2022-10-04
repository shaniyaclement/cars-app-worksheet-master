
/** Reference code: https://github.com/bpeddapudi/nodejs-basics-routes/blob/master/server.js 
 * import express */

let carsMockData = [
    {
        "id": 1,
        "brand": "Hyundai",
        "name": "Ioniq",
        "releaseYear": 2017,
        "color": "blue"
    },
    {
        "id": 2,
        "brand": "Toyota",
        "name": "Prius",
        "releaseYear": 2007,
        "color": "blue"
    },
    {
        "id": 3,
        "brand": "Chevrolet",
        "name": "Aveo",
        "releaseYear": 2007,
        "color": "white"
    },
    {
        "id": 4,
        "brand": "BMW",
        "name": "M5",
        "releaseYear": 2017,
        "color": "White"
    },
    {
        "id": 5,
        "brand": "Tesla",
        "name": "S",
        "releaseYear": 2019,
        "color": "Black"
    }
]

/** Create GET API. API should return const carsMockData*/

app.get("/list", (request, response) => {
    response.send(carsMockData)
})



/** Create POST API. Get the new car data from react. 
 *      Check if car with id exists. If Yes return 500. With message 'Car already exists'
 *      If there is no car with the id, add the new car to carsMockData and return carsMockData as response */

 app.post("/save", (request, response) => {
    let carWithId = carsMockData.some(car => car.id === parseInt(request.body.id))

    if(carWithId){
        response.status(500).send("Car already exists")
    }
    else{
        let id = parseInt(request.body.id);
        let brand = request.body.brand;
        let name = request.body.name;
        let releaseYear = request.body.releaseYear;
        let color = request.body.color;
        carsMockData.push({"id":id, "brand":brand, "name":name, "releaseYear": releaseYear, "color": color});
        response.send(carsMockData);
    }
})



/** Create PUT API. 
 *  Check if car with id exists. If No return 500 with error 'No car with given id exist'. 
 *  If there is car with the requested id, update that car's data in 'carsMockData' and return 'carsMockData' */

 app.put("/edit", (require, response) => {
    let CarWithId = carsMockData.some(car => car.id === parseInt(require.body.id))
    if(CarWithId){
        let id = parseInt(require.body.id);
        let brand = require.body.brand;
        let name = require.body.name;
        let releaseYear = require.body.releaseYear;
        let color = require.body.color;
        carsMockData.push({"id":id, "brand":brand, "name":name, "releaseYear": releaseYear, "color": color});
        response.send(carsMockData);
    }
    else{
        response.status(500).send('No car with given id exist')
    }
})


/** Create Delete API. 
 *  Check if car with id exists. If No return 500. With message 'No car with given id exists'
 *  If there is car with the requested id. Delete that car from 'carsMockData' and return 'carsMockData'
*/

app.delete("/delete", (request, response) => {
    let carWithId = carsMockData.some(car => car.id === parseInt(request.body.id))

    if(carWithId){
        carsMockData = carsMockData.filter((car) => car.id !== request.body.id) 
        response.send(carsMockData);
    }
    else{
        response.status(500).send('No car with given id exists')
    }
})

app.listen(8000);