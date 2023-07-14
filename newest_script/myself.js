function bookname() {
  return SpreadsheetApp.getActive().getName()
}
function sheetname() {
  return SpreadsheetApp.getActiveSpreadsheet().getActiveSheet().getName();
}
function clientname() {
  var str = bookname().split("_")
  return str[0]
}
function componame() {
  var str = bookname().split("_")
  return str[1]
}
function seriesname() {
  var str = bookname().split("_")
  return str[2]
}