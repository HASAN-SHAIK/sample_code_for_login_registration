const exp= require('express');
const expressAsyncHandler = require('express-async-handler');
const productApp= exp.Router();
productApp.use(exp.json())




//getting the data from the server
productApp.get('/getproducts',expressAsyncHandler(async(req,res)=>{
    //getting the productCollectionObj
    const productCollectionObj=req.app.get('productCollectionObj');

    //getting the products
    const products=await productCollectionObj.find().toArray()
    
    //responding to the request
    res.send(products);
    
}))



//getting the product with id
productApp.get('/getproduct/:id',expressAsyncHandler(async(req,res)=>{
    //getting the product collection object
    const productCollectionObj = req.app.get('productCollectionObj');

    const pid=(+req.params.id);

    const product=await productCollectionObj.findOne({id:{$eq:pid}});

    if(product==null)
    res.send("No product found")
    else
    res.send(product);
}))



//Creating the product
//     productApp.post('/createproduct', async(req,res,next)=>{
//         try {
//         //getting the productCollection object from the app
//         const productCollectionObj= req.app.get('productCollectionObj')
//         //getting the data from the route.http
//         const productObj=req.body;
    
//         // //Inserting the data into the database using callback functions
//         // productCollectionObj.insertOne(productObj,(err,result)=>{
//         //   if(err)
//         //   console.log("Error occured",err);
//         //   else
//         //   res.send("Successfully inserted");
//         // })
    
    
    
    
//         // //Inserting the data into the database using promise
//         // productCollectionObj.insertOne(productObj)
//         // .then(result=>res.send({message:"Successfully inserted"}))
//         // .catch(err=>console.log("Error occured",err))
    
    
    
//         //Inserting using async & await
//         await productCollectionObj.insertne(productObj);
//         //Result is displayed
//         res.send("Successufully inserted");
    
//     }
//     catch (err) {
//        next (err)
//    }
// });
productApp.post('/createproduct',expressAsyncHandler( async(req,res,next)=>{
    //getting the productCollection object from the app
    const productCollectionObj= req.app.get('productCollectionObj')
    //getting the data from the route.http
    const productObj=req.body;

    // //Inserting the data into the database using callback functions
    // productCollectionObj.insertOne(productObj,(err,result)=>{
    //   if(err)
    //   console.log("Error occured",err);
    //   else
    //   res.send("Successfully inserted");
    // })




    // //Inserting the data into the database using promise
    // productCollectionObj.insertOne(productObj)
    // .then(result=>res.send({message:"Successfully inserted"}))
    // .catch(err=>console.log("Error occured",err))



    //Inserting using async & await
    await productCollectionObj.insertOne(productObj);
    //Result is displayed
    res.send("Successufully inserted");
}));


//Updating the product
productApp.put('/updateproduct/:id',expressAsyncHandler(async(req,res)=>{
    const productCollectionObj= req.app.get('productCollectionObj');
    const pid= (+req.params.id);
    const product=req.body;
    await productCollectionObj.updateOne({id:pid},{$set:{...product}})
    res.send("Successfullt updated")
}))


//delete the product
productApp.delete('/deleteproduct/:id',expressAsyncHandler(async(req,res)=>{
    const productCollectionObj= req.app.get('productCollectionObj')
    const pid= (+req.params.id)
    await productCollectionObj.deleteOne({id:pid});
    res.send("Successfully deleted")
}))


























module.exports=productApp;