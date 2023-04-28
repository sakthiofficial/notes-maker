// import config from "../../lib/config";
import handler from "../../lib/handler";

export default handler().get(async (req, res) => {
  // console.log(config.buildNo);
  res.status(200).send({
    status: "OK",
    // buildNo: config.buildNo,
  });
});
