const {Schema, model} = require ('mongoose');

//create the schema (database)
const PizzaSchema = new Schema ({  //Schema --> constructor imported from mongoose
    pizzaName : {
        type : String
    }, 
    createdBy : {
        type : String
    }, 
    createdAt : {
        type : Date,
        default : Date.now
    },
    size : {
        type : String,
        default : 'Large'
    },
    toppings : []
});

// create the Pizza model (whihc means table) using the PizzaSchema
const Pizza = model('Pizza', PizzaSchema);

// export the Pizza model
module.exports = Pizza;