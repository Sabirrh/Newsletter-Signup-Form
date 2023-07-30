//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const app = express();
// To access our page we will use Static method for the app
app.use(express.static("Public"));

app.use(bodyParser.urlencoded({extended:true}))

app.get("/" ,function(req ,res){
  res.sendFile(__dirname + "/signup.html");
})

app.post("/" ,function(req, res){
    
    const FirstName = req.body.fName;
    const LastName = req.body.lName;
    const email = req.body.email;
    // console.log(FirstName , LastName, email);

    const data = {
       members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: FirstName,
          LNAME: LastName
        }
      }
    ]
  };

  // To convert Data into String

  const jsonData = JSON.stringify(data);
   
    //  Taking URL to connect to the Mailchimp
    const url = "https://us18.api.mailchimp.com/3.0/lists/2e3d9e3821";
      
    const option={
      method:"post",
      auth:"sabir1:95ff180489dfccd83bc4db9adbe5b7d7-us18"
    }

    // Creating HTTPs Request 

   const request = https.request(url ,option, function(response){


    if (response.statusCode === 200){
      res.sendFile(__dirname +"/success.html");
    }else{
      res.sendFile(__dirname+"/failure.html");
    }

     response.on("data" ,function(data){
      console.log(JSON.parse(data));
     })
    })

    request.write(jsonData);
    request.end(); 


});
app.post("/failure", function(req,res){
  res.redirect("/")
})




app.listen(process.env.PORT || 3000 , function(){
    console.log("Server is running on port 3000");
});








// APIKEY
//a9b69e15b34617ece24ca7e624a722b0-us18
//a9b69e15b34617ece24ca7e624a722b0-us18


// unique id
// 2e3d9e3821
//2e3d9e3821


// new API KEY
// 95ff180489dfccd83bc4db9adbe5b7d7-us18