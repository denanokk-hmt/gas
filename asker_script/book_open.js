/////////////////////////////////////////////////////
//Set message type
/////////////////////////////////////////////////////
function setMessageType(version) {
  
  //Set sheet
   var sheet_set = SpreadsheetApp.getActive().getSheetByName('message_type');  
  
  //Set settings book, sheet
  const book_name = SpreadsheetApp.getActive().getName()
  if (!version) version = book_name.split('_')[2]
  if (version === 'v1') {
    var settings_sheet_id = '11qiG-UGry_ukEBvv-Y8ka7YqpbradD2O-tdzM-4CJD0';
  } else if (version === 'v2') {
    var settings_sheet_id = '1TzWdyG8H4hLVI8xitGAr1AxGjdJTnsjIQvCqFutf_VY';
  }
  var spreadsheet = SpreadsheetApp.openById(settings_sheet_id)
  var sheet = spreadsheet.getSheetByName('message_type')

  //get messge type
  var values = sheet.getRange(1, 1, 30, 1).getValues()
  
  //set message type
  for (let idx in values) {
    var row = Number(idx) + 1
    sheet_set.getRange(row, 1).setValue(values[idx][0]);
    sheet_set.getRange(row, 2).setValue(values[idx][1]);    
  }
  
  return
}