import { google } from "googleapis";

const spreadsheetId = process.env.GOOGLE_SHEET_ID; // Replace with your Google Sheets spreadsheet ID
const range = "Sheet1"; // Replace with your sheet name

const getAuth = async () => {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    },
    scopes: "https://www.googleapis.com/auth/spreadsheets",
  });
  // Create client instance for auth
  return auth;
};

const getGoogleSheet = async (client) => {
  const sheets = google.sheets({ version: "v4", auth: client });
  return sheets;
};

const appendSheetRow = async ({ googleSheets, sheetName, values }) => {
  const appendedCellRespnse = await googleSheets.spreadsheets.values.append({
    spreadsheetId,
    range: sheetName,
    valueInputOption: "RAW",
    resource: {
      values: [values],
    },
  });

  return appendedCellRespnse;
};

const createSheetRow = async (googleSheets, noteData, lesson) => {
  const sheetName = lesson;
  const { data } = await googleSheets.spreadsheets.get({
    spreadsheetId,
  });
  const sheetPresent = (data.sheets || []).some((sheet) => {
    const googleSheetName = sheet?.properties?.title;
    return googleSheetName === sheetName;
  });
  if (!sheetPresent) {
    const sheetCreateResult = await googleSheets.spreadsheets.batchUpdate({
      spreadsheetId,
      resource: {
        requests: [
          {
            addSheet: {
              properties: {
                title: sheetName,
              },
            },
          },
        ],
      },
    });

    console.log("Creating new Sheet", sheetCreateResult);
    const headers = ["Topic", "Description", "Code", "Refrence Link"];
    // Add header and apply styling
    await googleSheets.spreadsheets.values.update({
      spreadsheetId,
      range: `${sheetName}!A1:D1`,
      valueInputOption: "RAW",
      resource: {
        values: [headers],
      },
    });

    // Apply styling to header row
    await googleSheets.spreadsheets.batchUpdate({
      spreadsheetId,

      resource: {
        requests: [
          {
            repeatCell: {
              range: {
                sheetId:
                  sheetCreateResult.data.replies[0].addSheet.properties.sheetId,
                startRowIndex: 0,
                endRowIndex: 1,
                startColumnIndex: 0, // Adjust these indices based on your header columns
                endColumnIndex: headers.length,
              },
              cell: {
                userEnteredFormat: {
                  backgroundColor: { red: 0.82, green: 0.82, blue: 0.82 },
                  horizontalAlignment: "CENTER",
                  textFormat: {
                    bold: true,
                    foregroundColor: { red: 0.0, green: 0.0, blue: 0.0 },
                    fontSize: 12,
                  },
                },
              },
              fields:
                "userEnteredFormat(backgroundColor,horizontalAlignment,textFormat)",
            },
          },
        ],
      },
    });
  }
  const values = Object.values(noteData);
  const result = await appendSheetRow({ googleSheets, sheetName, values });
  return result;
};

export default async function handler(req, res) {
  try {
    console.log("commiong here");
    const auth = await getAuth();
    const client = await auth.getClient();
    const googleSheets = await getGoogleSheet(client);

    // Your existing code for creating structured note
    const noteData = req.body;
    const noteFormFields = {
      topic: "topic",
      description: "description",
      code: "code",
      refrenceLink: "refrenceLink",
      lesson: "lesson",
    };
    const structuredNote = {
      topic: noteData[noteFormFields?.topic],
      description: noteData[noteFormFields?.description],
      code: noteData[noteFormFields?.code],
      refrenceLink: noteData[noteFormFields?.refrenceLink],
    };

    // Add the new note to Google Sheets
    const googleSheetResult = await createSheetRow(
      googleSheets,
      structuredNote,
      noteData[noteFormFields?.lesson]
    );
    res.status(googleSheetResult?.status).send({
      result: {
        status: googleSheetResult.status,
        statusText: googleSheetResult.statusText,
      },
    });
  } catch (error) {
    console.error("Error:", error.message);
  }
}
