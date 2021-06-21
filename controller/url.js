const moment = require("moment");
const Url = require("../model/url");
exports.getIndex = (req, res, next) => {
  return res.render("index.ejs", {
    success: false,
  });
  // res.json({indexIS:true});
};

const makeId = () => {
  const length = 4;
  let result = "";
  const characters = "abcdefghijklmnopqrstuvwxyz0123456789";
  const charLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charLength));
  }
  return result;
};

const keyExists = (key) => {
  Url.findOne({ key: key })
    .then((res) => {
      if (!res) {
        return false;
      } else {
        return true;
      }
    })
    .catch((err) => {
      // console.log("keyExists");
      console.log(err);
    });
};

//! SERVER SIDE URL AUTH and DATE NOT NULL
//!AUTH JWT 

exports.postUrl = async (req, res, next) => {
  console.log("IN POSTURL");
  const link = req.body.url;
  
  const validity = req.body.validity ;
  // const validity = 'd';
  const exp = new Date(validity);
  // console.log(exp);
  // if (validity === "d") {
  //   exp.setDate(exp.getDate() + 1);
  //   console.log(exp);
  // } else if (validity === "w") {
  //   exp.setDate(exp.getDate() + 7);
  //   console.log(exp);
  // } else if (validity === "m") {
  //   exp.setMonth(exp.getMonth() + 1);
  //   console.log(exp);
  // } else if (validity === "y") {
  //   exp.setFullYear(exp.getFullYear() + 1);
  //   console.log(exp);
  // }
  let key = makeId();
  // while (keyExists(key)) {
  //   key=makeId();
  // }

  const url = new Url({
    url: link,
    key: key,
    expireAt: exp,
  });
  // // console.log(moment());
  // // console.log(moment().add(10,'s'));
  // // console.log(moment().add(30,'s'));
  try {
    const result = await url.save();
    // url.save().then((result) => {
    //   console.log(result);
    res.status(200).json({ result: result, success: true });
  } catch (err) {
    // console.log("postUrl");
    console.log(err);
  }

};
exports.getUrl = (req, res, next) => {
  // console.log("IN GETURL");
  const key = req.params.shortner;
  
  Url.findOne({ key: key })
    .then((result) => {
      if (!result) {
        // console.log("404");
        return res.render("404.ejs");
      }
      // console.log(result);
      res.redirect(result.url);
      // res.redirect("http://yahoo.com");
    })
    .catch((err) => {
      // console.log("getUrl");
      console.log(err);
    });
};

