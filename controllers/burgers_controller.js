const express=require("express");

const router=express.Router();
//import the model (burger.js) to use its database functions
const burger=require("../models/burger.js");

//Create all our routes and set up logic within those routes where required.

 router.get("/",async function(req,res){
  const data=await burger.selectAll();
  const hbsObject={
      burgers:data
  };
  res.render("index",hbsObject);
 });

 router.post("/burger",async function(req,res){
   const result=await burger.insertOne(req.body.burger_name);
   
   //send back the id of the burger
   res.json({id:result.insertId});
 });

 router.put("/burger/:id",async function(req,res){
    const id=req.params.id;
    const bstatus=req.body.devoured;
    const result=await burger.updateOne(bstatus,id);
    if (result.changedRows==0){
        //If no rows are changed, then ID must not exist, so 404
        return res.status(404).end();
    }
    else{
        res.status(200).end();
    }

 });

module.exports=router;