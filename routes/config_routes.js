const indexR = require("./index");
const usersR = require("./users");
const cardsR = require("./cards");
const uploadR = require("./upload_file");

exports.originAllow = (app) => {
  // allow to recive requests from another domain
  app.all('*', function (req, res, next) {
    if (!req.get('Origin')) return next();
// in real life project , change the * to domain name
    res.set('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, PATCH");
    res.set('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type,x-auth-token');
    next();
  });
}

exports.routerInit = (app) => {
  app.use("/",indexR);
  app.use("/users",usersR);
  app.use("/cards",cardsR);
  app.use("/upload",uploadR);


  app.use((req,res) => {
    res.json({msg:"Url not found , page 404 "})
  })
}

