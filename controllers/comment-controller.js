const { Pizza, Comment} = require ('../models');

const commentController = {
    //add comment to pizza
    addComment({ params, body}, res) {
        console.log(body);
        Comment.create(body)
        .then (({_id}) => {   //get the pizza id
            console.log(_id);
            return Pizza.findOneAndUpdate (
                { _id : params.pizzaId}, 
                { $push : { comments : _id}},
                { new : true }
            );
        })
        .then (dbPizzaData => {
            if (!dbPizzaData)
            {
                res.status(404).json({message : 'No pizza found with this id!'});
                return;
            }

            res.json(dbPizzaData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })

    }, 


    //add reply to the comment
    addReply ({ params, body}, res) {
        Comment.findOneAndUpdate(
            {_id : params.commentId},
            {$push : {replies : body}},
            {new : true}
        )
        .then (dbPizzaData => {
            if(!dbPizzaData)
            {
                res.status(404).json({message : 'No pizza found with the id '});
                return;
            }

            res.json(dbPizzaData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
    },

    //remove replies
    removeReply({ params }, res) {
        Comment.findOneAndUpdate (
            {_id : params.commentId},
            {$pull : { replies : {replyId : params.replyId }}},
            {new : true}
        )
        .then (dbPizzaData => {
            if(!dbPizzaData)
            {
                res.status(404).json({message : 'No pizza found with the id '});
                return;
            }

            res.json(dbPizzaData);x
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })

    },

    //remove comment
    removeComment({ params }, res) {
        Comment.findOneAndDelete({ _id : params.commentId})
        .then(deleteComment => {
            if (!deleteComment)
            {
                res.status(404).json({message : 'No comment with this id!'});
                return;
            }
            return Pizza.findOneAndUpdate(
                {_id : params.pizzaId},
                {$pull : { comments : params.commentId}},
                { new : true}
            );
        })
        .then (dbPizzaData => {
            if (!dbPizzaData)
            {
                res.status(404).json({ message : 'No pizza found with this id!'});
                return;
            }
            res.json(dbPizzaData);
        })
        .catch (err => {
            console.log(err);
            res.status(500).json(err);
        });

    }
};

module.exports = commentController;