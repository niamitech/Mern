const XLSX = require('xlsx');

exports.parseExcel = (buffer) => {
  const workbook = XLSX.read(buffer, { type: 'buffer' });
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];
  return XLSX.utils.sheet_to_json(sheet);
};

exports.generateExcel = (leads) => {
  const ws = XLSX.utils.json_to_sheet(leads);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Leads');
  return XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' });
};
