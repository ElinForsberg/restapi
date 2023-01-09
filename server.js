
const express = require('express');
const app = express();
const port = 3000
const cors = require("cors");
const fs = require("fs");

app.use(express.json())

app.use(
  cors({
origin:"*",
}))


app.get('/objects', function(req,res){
  
   fs.readFile("objekt.json", function(err,data){
    if(err){
      console.log(err);
      res.status(404).send("Filen kan inte hittas!")
    }
    const objekt = JSON.parse(data)
    res.send(objekt)
}) 
})



app.post('/objects', function(req,res)  {
   
const data = fs.readFileSync("objekt.json");
const myObject = JSON.parse(data);
  
let newData = req.body;
  
myObject.push(newData);

fs.writeFile("objekt.json", JSON.stringify(myObject,null,2), (err) => {
  if(err){
    console.log(err);
    res.status(404).send("Objektet gick inte att lägga till!")
  }
  console.log("New data added");
});
       
    res.status(201).json(req.body)
})


app.get('/objects/byid/:id', (req,res) =>{

  fs.readFile("objekt.json", function(err,data){
    if(err){
      console.log(err);
      res.status(404).send("Filen kan inte hittas!")
    }
    let myObject = JSON.parse(data)
    const { id } = req.params;
    const findObject = myObject.find((object)=>object.id=== id);
    if(!findObject) res.status(404).send("Huset finns inte");
    
    res.send(findObject);
  });
});

app.put('/objects/:id', function(req,res){

  fs.readFile("objekt.json", function(err,data){
  if(err){
    console.log(err);
    res.status(404).send("Objektet hittas inte!")
  }
    let myObject = JSON.parse(data);
    const {id}= req.params;
   
    
    const { type, location, bedrooms, price} = req.body;
    
    const findObject = myObject.find((object) => object.id ===id);
   if(!myObject) res.status(404).send("Objektet gick ite att ändra!");
    if(type) findObject.type = type;
    if(location) findObject.location = location;
    if(bedrooms) findObject.bedrooms = bedrooms;
    if(price) findObject.price = price;


fs.writeFile("objekt.json", JSON.stringify(myObject,null,2), (err) => {
  if(err){
    console.log(err);
  }
  
});
    console.log("data changed");
    res.status(200).send(myObject)
   
});
});

app.delete('/objects/byid/:id', (req, res) => {

  fs.readFile("objekt.json", function (err, data){
    if(err) {
      console.log(err);
      res.status(404).send("objektet hittas inte!")
    }
    let myObjects = JSON.parse(data)
    const { id } = req.params;
    const objects = myObjects.find((object) => object.id === id);

    if(!objects){
    res.status(404).send("Objektet gick inte att radera!");
    } else {
      myObjects = myObjects.filter((object) => object.id !== id);
      fs.writeFile("objekt.json",JSON.stringify(myObjects, null, 2), function(err){
        if(err){
          console.log(err);
        }
      });
      res.send(myObjects);
      
    }
  });
});
  
app.listen(port, () => console.log("servern är igång"))


    
