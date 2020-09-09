var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var middlewareObj = require("../middleware");

//index
router.get("/",function(req,res){
    var user = req.user;
    Campground.find({},function(err,campgrounds){
        if(!err){
            res.render("campgrounds/index",{campgrounds:campgrounds});
        }
    });
});

//new
router.get("/new",middlewareObj.isLoggedIn,function(req,res){
    res.render("campgrounds/new");
});

//create
router.post("/", middlewareObj.isLoggedIn,function(req,res){
    var campname = req.body.campname;
    var price = req.body.price;
    var url = req.body.url;
    var description = req.body.desc;
    var author = {
        username: req.user.username,
        id: req.user._id
    };
    var newCampground = {name : campname ,price: price ,image : url ,description:description ,author:author};
    Campground.create(newCampground, function(err,campground){
        if(!err){
            req.flash("success","Successfully added a new campground!");
            res.redirect("/campgrounds");
        }
    });
});

//show
router.get("/:id",function(req, res) {
    Campground.findById(req.params.id).populate("comments").exec(function(err,foundCampground){
        if(!err){
            res.render("campgrounds/show",{campground:foundCampground}); 
        }
    });
});

//edit 
router.get("/:id/edit", middlewareObj.checkCampgroundOwnership, function(req,res){
        Campground.findById(req.params.id,function(err,campground){
            if(!err){
                res.render("campgrounds/edit",{campground:campground});
            }
        });
});

//update
router.put("/:id" , middlewareObj.checkCampgroundOwnership , function(req,res){
    var newData = {
        name: req.body.campname,
        price: req.body.price,
        image: req.body.url,
        description: req.body.desc
    }
    Campground.findByIdAndUpdate(req.params.id, newData, function(err,updatedCampground){
        if(!err){
            res.redirect("/campgrounds/" + updatedCampground._id);
        }
    });
});

//destroy
router.delete("/:id", middlewareObj.checkCampgroundOwnership, function(req,res){
    Campground.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/campgrounds");
        } else{
            res.redirect("/campgrounds");
        }
    });
});

module.exports = router;