const axios = require("axios");

module.exports = async (msg) => {
  axios
    .get("https://api.thecatapi.com/v1/images/search")
    .then((res) => {
      msg.channel.send(res.data[0].url);
    })
    .catch((err) => {
      console.log(err);
    });
};
