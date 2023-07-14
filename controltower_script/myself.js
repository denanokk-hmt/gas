function clientname() {
  return bookname()
}
function bookname() {
  return SpreadsheetApp.getActive().getName()
}
function sheetname() {
  return SpreadsheetApp.getActiveSpreadsheet().getActiveSheet().getName();
}
