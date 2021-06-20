const {Schema, model} = require ('mongoose');

//create the schema (database)
const PizzaSchema = new Schema (   //Schema --> constructor imported from mongoose
    {  
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
        toppings : [],
        comments : [
            {
                type : Schema.Types.ObjectId,
                ref : 'Comment'
            }
        ]
    }, 
    {
        toJSON : {
            virtuals : true
        }, 
        id : false
    }
);

// get total count of comments and replies on retrieval
PizzaSchema.virtual('commentCount').get(function() {
    return this.comments.length;
});

// create the Pizza model (whihc means table) using the PizzaSchema
const Pizza = model('Pizza', PizzaSchema);

// export the Pizza model
module.exports = Pizza;