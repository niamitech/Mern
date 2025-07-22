const xlsx = require('xlsx');

// 📥 Parse Excel/CSV Buffer to JSON
function parseExcel(buffer) {
  const workbook = xlsx.read(buffer, { type: 'buffer' });
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];
  const data = xlsx.utils.sheet_to_json(sheet);
  return data;
}

// 📤 Generate Excel from JSON
function generateExcel(data) {
  const worksheet = xlsx.utils.json_to_sheet(data);
  const workbook = xlsx.utils.book_new();
  xlsx.utils.book_append_sheet(workbook, worksheet, 'Leads');
  return xlsx.write(workbook, { type: 'buffer', bookType: 'xlsx' });
}

module.exports = { parseExcel, generateExcel };
