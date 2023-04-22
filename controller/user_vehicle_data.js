
const get_data = (req,resp,next)=>{
    return resp.render("user/dashboard", {
        layout: "layoutb",
        user: req.session.user,
      });
}

const inqueries =(req,resp,next)=>{
    return resp.render("user/notification", {
        layout: "layoutb",
        user: req.session.user,
      });
}

const data = (req,resp,next)=>{

}

module.exports = {
    get_data,
    inqueries
}