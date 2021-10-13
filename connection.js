exports.connect = ()=>{
    try {
        const mangoose =require("mongoose")
        mangoose.connect(`mongodb://localhost:27017/rentalShop`,{useNewUrlParser:true,useUnifiedTopology:true})
        // mangoose.set('useFindandModify',false)
        
    } catch (error) {
        console.log(error)
        console.log("error in connecting db")
        process.exit()
        
    }
}