import Joi from "joi";
import axios from "axios";
import handler from "../../lib/handler";
import config from "../../lib/config";
import { LpLead } from "../../../models/lplead";
import initDb from "../../lib/db";

export default handler({ checkAuthenticated: true }).post(async (req, res) => {
  await initDb();

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
        ad: Joi.string(),
      }),
    })
  );

  const {
    userName,
    email,
    phoneNo,
    utmParams: { source, medium, campaign, content },
  } = req.body;

  await new LpLead({
    FirstName: userName,
    EmailAddress: email,
    Phone: phoneNo,
    Source: source,
    SourceMedium: medium,
    SourceCampaign: campaign,
    SourceContent: content,
  }).save();

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
  ];

  const promise = axios.post(lsqConfig.apiUrl, postBody, {
    params: {
      accessKey: lsqConfig.accessKey,
      secretKey: lsqConfig.secretKey,
    },
  });

  res.sendPromise(promise);
});
