require("dotenv").config();
exports.connect = ()=>{
    try {
        const mangoose =require("mongoose")
        mangoose.connect(
            // `mongodb://localhost:27017/rentalShop`
            `mongodb+srv://amrutesh:${process.env.MONGO_PASS}@cluster0.yj2ao.mongodb.net?retryWrites=true&w=majority`,

            {useNewUrlParser:true,useUnifiedTopology:true})
        // mangoose.set('useFindandModify',false)
        
    } catch (error) {
        console.log(error)
        console.log("error in connecting db")
        process.exit()
        
    }
}