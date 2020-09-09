var express    = require("express"),
    app        = express(),
    bodyParser = require("body-parser"),
    mongoose   = require("mongoose"),
    flash      = require("connect-flash"),
    passport   = require("passport"),
    LocalStrategy = require("passport-local"),
    Campground = require("./models/campground"),
    methodOverride = require("method-override"),
    User       = require("./models/user"),
    seedDB     = require("./seeds"),
    Comment    = require("./models/comment");
    
//requiring routes
var commentRoutes = require("./routes/comments"),
 campgroundRoutes = require("./routes/campgrounds"),
      indexRoutes = require("./routes/index");

var url = process.env.DATABASEURL || "mongodb://localhost/yelp_camp_v6";
mongoose.connect(url,{useUnifiedTopology: true,useNewUrlParser: true});

app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static(__dirname + "/public"));
app.set("view engine","ejs");
app.use(methodOverride("_method"));
app.use(flash());
// seedDB();

// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret : "I am cool",
    resave : false,
    saveUninitialized : false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//calls the fn. on every single route
app.use(function(req,res,next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

app.use(indexRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);
app.use("/campgrounds", campgroundRoutes);

app.listen(process.env.PORT,process.env.IP,function(){
    console.log("The YelpCamp server is listening!!");
})