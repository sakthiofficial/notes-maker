import Joi from "joi";
import axios from "axios";
import handler from "../../lib/handler";
import config from "../../lib/config";

export default handler({ checkAuthenticated: true }).post(async (req, res) => {
  req.validate(
    req.body,
    Joi.object({
      userName: Joi.string(),
      email: Joi.string(),
      phoneNo: Joi.string(),
      source: Joi.string(),
    })
  );

  const { userName, email, phoneNo, source } = req.body;

  const { lsqConfig } = config;

  const promise = axios.post(
    lsqConfig.apiUrl,
    [
      {
        Attribute: "FirstName",
        Value: userName,
      },
      {
        Attribute: "EmailAddress",
        Value: email,
      },
      {
        Attribute: "Phone",
        Value: phoneNo,
      },
      {
        Attribute: "Source",
        Value: source,
      },
    ],
    {
      params: {
        accessKey: lsqConfig.accessKey,
        secretKey: lsqConfig.secretKey,
      },
    }
  );

  res.sendPromise(promise);
});
