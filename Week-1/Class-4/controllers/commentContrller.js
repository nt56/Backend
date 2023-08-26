//import model
const Post = require("../models/postModel");
const Comment = require("../models/commentModel");

//business logic
exports.createComment = async (req,res) => {
    try{
        //fetch data from req body
        const {post, user, body} = req.body;
        
        //create a comment object
        const comment = new Comment({
            post,user,body
        });

        //save new commnets into the database
        const savedComment = await comment.save();

        //find the post by ID , add the new comment to its commnet array
        const updatedPost = await Post.findByIdAndUpdate(post, {$push: {comments: savedComment}}, {new:true})
            .populate("comments")   //populates the comments array with comments documents
            .exec();

        res.json({
            post:updatedPost,
        });
    }
    catch(error){
        return res.status(500).json({
            error:"Error while creating comment",
        });
    }
}

