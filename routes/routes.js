

exports.index = (req,res) => {
    req.render("./views/index.html");
    res.render("index", {
        title: "index",
    });
};