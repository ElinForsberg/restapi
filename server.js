
const express = require('express');
const app = express();
const port = 3000

const fs = require("fs");

app.use(express.json())


app.get('/objects', function(req,res){

   fs.readFile("objekt.json", function(err,data){
    const objekt = JSON.parse(data)
    res.send(objekt)
}) 
})



app.post('/objects', function(req,res)  {
   
   
// Storing the JSON format data in myObject
var data = fs.readFileSync("objekt.json");
var myObject = JSON.parse(data);
  
// Defining new data to be added
let newData = req.body;
  
// Adding the new data to our object
myObject.push(newData);
  
// Writing to our JSON file
//var newData2 = JSON.stringify(myObject, null, 2);
fs.writeFile("objekt.json", JSON.stringify(myObject,null,2), (err) => {
  // Error checking
  //if (err) throw err;
  console.log("New data added");
});
       
    res.status(201).json(req.body)
   
   //res.status(201).send(myObject)
})

app.put('/objects/:id', function(req,res){
   

    const {id}= req.params.id;
    const data = fs.readFileSync("objekt.json");
    let myObject = JSON.parse(data);
    
    let newData = req.body;
    myObject.push(newData);
    const findObject = myObject.find((object) => object.id ===id);
// Writing to our JSON file
//var newData2 = JSON.stringify(myObject, null, 2);
fs.writeFile("objekt.json", JSON.stringify(myObject,null,2), (err) => {
  // Error checking
  if (err) throw err;
  console.log("data changed");
});
       
    res.status(200).json(findObject)
   
    //res.send()
})

app.delete('/objects/:id', (req, res) => {
  fs.readFile("objekt.json", function (err, data){
    if(err) {
      console.log(err);
      res.status(404).send("objektet finns inte")
    }
    let myObjects = JSON.parse(data)
    const { id } = req.params.id;
    const objects = myObjects.find((object) => object.id === id);

    if(!objects){
    res.status(404).send("objektet kan inte tas bort");
    } else {
      myObjects = myObjects.filter((object) => object.id !== id);
      fs.writeFile("objekt.json",JSON.stringify(myObjects, null, 2), function(err){
        if(err){
          console.log(err);
        }
      });
      res.send("raderad");
      
    }
  });
});

app.get('/objects/:id', (req,res) =>{
  fs.readFile("objekt.json", function(err,data){
    if(err){
      console.log(err);
      res.status(404).send("filen finns inte")
    }
    const myObject = JSON.parse(data)
    const { id } = req.params.id;
    const findObject = myObject.find((object)=>object.id===id);
    if(!findObject) res.status(404).send("Huset finns inte");
    res.send(findObject);
  });
});
  
app.listen(port, () => console.log("servern är igång"))


    
