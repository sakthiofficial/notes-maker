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
      utmParams: Joi.object({
        source: Joi.string(),
        medium: Joi.string(),
        campaign: Joi.string(),
        content: Joi.string(),
      }),
    })
  );

  const {
    userName,
    email,
    phoneNo,
    utmParams: { source, medium, campaign, content },
  } = req.body;

  const { lsqConfig } = config;
  const postBody = [
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

    ...(campaign
      ? [
          {
            Attribute: "SourceCampaign",
            Value: campaign,
          },
        ]
      : []),

    ...(medium
      ? [
          {
            Attribute: "SourceMedium",
            Value: medium,
          },
        ]
      : []),

    ...(content
      ? [
          {
            Attribute: "SourceContent",
            Value: content,
          },
        ]
      : []),

    // ...(ad && [
    //   {
    //     Attribute: "SourceContent",
    //     Value: ad,
    //   },
    // ]),
  ];

  const promise = axios.post(lsqConfig.apiUrl, postBody, {
    params: {
      accessKey: lsqConfig.accessKey,
      secretKey: lsqConfig.secretKey,
    },
  });

  res.sendPromise(promise);
});
