import mongoose from "mongoose";

import { addCreatedHook } from "./hooks/addCreated";

const { Schema } = mongoose;

const LpLeadSchema = new Schema({
  FirstName: { type: String, trim: true },
  EmailAddress: { type: String, trim: true },
  Phone: { type: String, trim: true },
  Source: { type: String, trim: true },
  SourceCampaign: { type: String, trim: true },
  SourceMedium: { type: String, trim: true },
  SourceContent: { type: String, trim: true },
  Project: { type: String, trim: true, default: "SIRUSERI" },
  created: Number,
});
addCreatedHook(LpLeadSchema);

export const LpLead =
  mongoose.models.LpLead || mongoose.model("LpLead", LpLeadSchema);
