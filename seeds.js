var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var datas = [
    {
    name: "Shimla",
    image: "https://images.unsplash.com/photo-1513104399965-f5160d963d39?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60",
    description: "Come to Shimla and enjoy the beautiful Mall road!"
    },
    {
    name: "Manali",
    image: "https://images.unsplash.com/photo-1516013894828-b214a58fdba7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60",
    description: "Witness the beauty and be here forever"
    },
    {
    name: "Kullu",
    image: "https://images.unsplash.com/photo-1481682799713-eb3384705155?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80",
    description: "The waterfalls here are heavenly..."
    }
    ];

function seedDB(){
    Campground.deleteMany({},function(err){
        if(!err){
            console.log("All campgrounds removed!");
            // datas.forEach(function(data){
            //     Campground.create(data,function(err,campground){
            //       if(!err){
            //           console.log("Campground created!!");
            //           Comment.create({
            //                 text: "This is the common comment for all the posts",
            //                 author: "Ashu"
            //           }, function(err,comment){
            //               if(!err){
            //                   campground.comments.push(comment);
            //                   campground.save(function(err,campground){
            //                       if(!err){
            //                           console.log("Comments added!!!");
            //                       } 
            //                   });
            //                 }
                           
            //             });
            //         }  
            //     });
                   
            // });
        }
    });
}
    
module.exports = seedDB;