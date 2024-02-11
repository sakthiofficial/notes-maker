import { google } from "googleapis";

const spreadsheetId = "1e09_NCJ8HQ7ovjFk_bbHv-XHDUkC2OXn-6KPRW371Y0"; // Replace with your Google Sheets spreadsheet ID

const getAuth = async () => {
  const auth = new google.auth.GoogleAuth({
    keyFile: "goole-sheet-credentials.json",
    scopes: "https://www.googleapis.com/auth/spreadsheets",
  });
  // Create client instance for auth
  return auth;
};

const getGoogleSheet = async (client) => {
  const sheets = google.sheets({ version: "v4", auth: client });
  return sheets;
};

const getSheetNames = async (googleSheets) => {
  const { data } = await googleSheets.spreadsheets.get({
    spreadsheetId,
  });
  const sheets = (data.sheets || []).map((sheet) => {
    const googleSheetName = sheet?.properties?.title;
    return googleSheetName;
  });
  return sheets;
};
export default async function handler(req, res) {
  const auth = await getAuth();
  const client = await auth.getClient();
  const googleSheets = await getGoogleSheet(client);

  const leasons = await getSheetNames(googleSheets);
  console.log(leasons);
  res.status(200).send({ result: leasons });
}
