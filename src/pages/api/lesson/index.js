import excel from "exceljs";
import fs from "fs";
import path from "path";

const fileName = "code-notes.xlsx";

const getExcelFile = async () => {
  const absolutePath = path.resolve(fileName);
  const fileCheck = fs.existsSync(absolutePath);
  if (!fileCheck) {
    return null;
  }
  const workbook = new excel.Workbook();

  await workbook.xlsx.readFile(absolutePath);
  return workbook;
};
const getSheetNames = (workbook) => {
  const sheets = [];
  workbook.eachSheet((sheet) => {
    sheets.push(sheet.name);
  });
  return sheets;
};
export default async function handler(req, res) {
  const workbook = await getExcelFile();

  const leasons = getSheetNames(workbook);
  res.status(200).send({ result: leasons });
}
