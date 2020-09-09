var express = require("express");
var router = express.Router({mergeParams: true});
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middlewareObj = require("../middleware");

//Comments new
router.get("/new", middlewareObj.isLoggedIn, function(req,res){
    Campground.findById(req.params.id,function(err,campground){
        if(!err){
            res.render("comments/new",{campground:campground});
        }
    });
});

//Comments create
router.post("/", middlewareObj.isLoggedIn, function(req,res){
    var id = req.params.id;
    Comment.create(req.body.comment,function(err,comment){
        if(!err){
            comment.author.username = req.user.username;
            comment.author.id = req.user._id;
            comment.save();
            Campground.findById(id,function(err,campground){
                if(!err){
                    campground.comments.push(comment);
                    campground.save(function(err,campground){
                        if(!err){
                            req.flash("success","Successfully added your comment!");
                            res.redirect("/campgrounds/"+id);
                        }
                        
                    });
                    
                }
            });
        }
        
    });
});

//comments edit
router.get("/:comment_id/edit", middlewareObj.checkCommentOwnership, function(req,res){
    Comment.findById(req.params.comment_id,function(err, comment){
        if(!err){
            res.render("comments/edit",{campground_id: req.params.id , comment:comment});
        }
    });
});

//comments update
router.put("/:comment_id", middlewareObj.checkCommentOwnership, function(req,res){
    Comment.findByIdAndUpdate(req.params.comment_id, {text: req.body.text}, function(err,comment){
        if(!err){
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

//comments delete
router.delete("/:comment_id", middlewareObj.checkCommentOwnership, function(req,res){
    Comment.findByIdAndRemove(req.params.comment_id ,function(err){
        if(!err){
            req.flash("success","Comment deleted!");
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

module.exports = router;