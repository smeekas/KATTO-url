const moment = require("moment");
const Url = require("../model/url");
exports.getIndex = (req, res, next) => {
  console.log("index");
  res.render("index.ejs", {
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
  console.log("ID", result);
  return result;
};
exports.postUrl = async (req, res, next) => {
  console.log("BODYY", req.body);
  console.log("BODYY u", req.body.url);
  const link = req.body.url;
  // const link = 'https://www.youtube.com/watch?v=3IhQF4-HQdo&ab_channel=CodeWithHarryCodeWithHarryVerified';
  // res.json({linkIS:link});
  // console.log(req.body.url);
  // res.json({postURL:req.body.url})
  const validity = req.body.validity;
  // const validity = 'd';
  const exp = new Date();
  // console.log(req.keyofurl);
  console.log(exp);
  if (validity === "d") {
    exp.setDate(exp.getDate() + 1);
    console.log(exp);
  } else if (validity === "w") {
    exp.setDate(exp.getDate() + 7);
    console.log(exp);
  } else if (validity === "m") {
    exp.setMonth(exp.getMonth() + 1);
    console.log(exp);
  } else if (validity === "y") {
    exp.setFullYear(exp.getFullYear() + 1);
    console.log(exp);
  }
  const key = makeId();

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
    console.log("postUrl");
    console.log(err);
  }
  //   // res.render("index.ejs", {
  //   //   success: true,
  //   //   shorted: `http://localhost:5000/${result.key}`,
  //   // });
  //   // res.json({'success':true});
  //   res.json({ result: result });
  // });
};
exports.getUrl = (req, res, next) => {
  const key = req.params.shortner;
  res.json({ shortnerIs: key });
  // console.log("KEY", req.params);
  // if (!key) {
  //   return res.redirect("/");
  // }
  // Url.findOne({ key: key })
  //   .then((result) => {
  //     // res.redirect(result.url);
  //     if (!result) {
  //       res.render("404.ejs");
  //     }
  //     console.log(result);
  //   })
  //   .catch((err) => {
  //     // console.log("getUrl");
  //     console.log(err);
  //   });
};

exports.get404 = (req, res, next) => {};
