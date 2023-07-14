function tester() {
  var result = set_logging('control-tower')
  console.log(result.server)
}

/////////////////////////////////////////////////////
//Set log
/////////////////////////////////////////////////////
function logging(kind, log) {
  
  //Set sheet
  var sheet_set = SpreadsheetApp.getActive().getSheetByName('log');
  
  //Search last value row
  var sheet_last_row = sheet_set.getRange("A:A").getValues();
  var log_last_row = sheet_last_row.filter(String).length
  
  //Set enable writing row
  var row = (log_last_row >= 2000)? 2 : log_last_row + 1
  
  var dd = Utilities.formatDate(new Date(), "JST", "yyyy'年'MM'月'dd'日' HH'時'mm'分'ss'秒'");
  
  //Writing log
  sheet_set.getRange(row, 1).setValue(row);  
  sheet_set.getRange(row, 2).setValue(dd);
  sheet_set.getRange(row, 3).setValue(kind);
  sheet_set.getRange(row, 4).setValue(log);
  
  return row
}