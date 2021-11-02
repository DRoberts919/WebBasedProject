



//this is where all of our routes are handled
exports.index = (req,res) => {
    res.render("index",{
        title:"index",
    });
};

exports.login = (req,res) =>{
    res.render("login",{
        title: "index",
    });
};

exports.signup = (req,res) =>{
    res.render("signup",{
        title:"signup"
    });
};

exports.account = (req,res) =>{
    res.render("account",{
        title:"account",
        user: req.session.user
    });
};

exports.boards = (req,res) =>{
    res.render("boards",{
        title:"boards"
    });
};


exports.checkUser = (req,res) =>{

}

