import excel from "exceljs";
import fs from "fs";

const path = "/home/user/Desktop/Persnoal Files/tutorial-notes-making/";
const fileName = "code-notes.xlsx";

const getExcelFile = async () => {
  const absolutePath = `${path}${fileName}`;
  const fileCheck = fs.existsSync(absolutePath);
  console.log("filecheck", fileCheck);
  if (!fileCheck) {
    const workbook = new excel.Workbook();

    await workbook.xlsx.writeFile(fileName);
    console.log(`File '${fileName}' created successfully.`);
    return workbook;
  }
  const workbook = new excel.Workbook();

  await workbook.xlsx.readFile(absolutePath);
  return workbook;
};
const createSheetRow = async (workbook, sheet, note) => {
  let worksheet = workbook.getWorksheet(sheet);
  if (!worksheet) {
    worksheet = workbook.addWorksheet(sheet);
    const header = worksheet.addRow(1);
    header.values = ["Topic", "Description", "Code", "Refrence Link"];
    header.eachCell((cell) => {
      cell.alignment = {
        horizontal: "center", // Options: 'left', 'center', 'right', 'fill', 'justify', 'centerContinuous', 'distributed'
        vertical: "middle", // Options: 'top', 'middle', 'bottom', 'distributed'
      };
      cell.font = {
        size: 14, // Adjust the size as needed
        color: { argb: "#D2B48C" }, // Set the color in ARGB format (white in this example)
      };
    });
  }
  const { actualRowCount } = worksheet;

  // Add the new data to the next row
  const newRow = worksheet.getRow(actualRowCount + 1);
  newRow.values = Object.values(note);
  newRow.eachCell((cell, colNumber) => {
    // Customize the cell styles as needed
    const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
    const isHyperLink = urlRegex.test(cell?.value);
    if (isHyperLink) {
      cell.value = {
        text: cell.value,
        hyperlink: cell.value,
      };
    }

    cell.border = {
      top: { style: "thin" },
      left: { style: "thin" },
      bottom: { style: "thin" },
      right: { style: "thin" },
    };
    const callValueLength = cell.value.length;
    cell.alignment = {
      horizontal: "left", // Options: 'left', 'center', 'right', 'fill', 'justify', 'centerContinuous', 'distributed'
      vertical: "top", // Options: 'top', 'middle', 'bottom', 'distributed'
      wrapText: true,
    };
    const minWidth = 20;

    const maxWidth = 30;
    const columnWidth = Math.max(maxWidth, callValueLength) + 2;
    const column = worksheet.getColumn(colNumber);
    column.width = minWidth;
    column.height = minWidth;
    cell.font = {
      size: 12, // Adjust the size as needed
      color: { argb: "#D2B48C" }, // Set the color in ARGB format (white in this example)
    };
    if (callValueLength > 25) {
      column.width = columnWidth;
    }
    // Add more styles as needed
  });
  // Save the workbook
  const result = await workbook.xlsx.writeFile(fileName);

  return result;
};
export default async function handler(req, res) {
  const workbook = await getExcelFile();
  const noteData = req.body;
  const noteFormFields = {
    topic: "topic",
    description: "description",
    code: "code",
    refrenceLink: "refrenceLink",
  };
  const structuredNote = {
    lesson: noteData[noteFormFields?.topic],
    topic: noteData[noteFormFields?.topic],
    description: noteData[noteFormFields?.description],
    refrenceLink: noteData[noteFormFields?.refrenceLink],
  };
  await createSheetRow(workbook, noteData.lesson, structuredNote);

  res.status(200).send({ result: "succes" });
}
