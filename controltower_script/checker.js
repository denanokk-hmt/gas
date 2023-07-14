/////////////////////////////////////////////////////
//CHECK EXEC TIME
/////////////////////////////////////////////////////
function CheckExecTime(wait_sec) {

  //Set sheet
  var sheet_set = SpreadsheetApp.getActive().getSheetByName('Counter');
  
  //Set column
  var column = 1
  
  //Set row & waiting sec
  var row = 2
  
  //Old exec time
  var oldUnix = sheet_set.getRange(row, column).getValue()
  if (!oldUnix) { oldUnix = 0 }

  //New exec time
  var newUnix = new Date().getTime().toString().substr(0,10)
  newUnix = parseFloat(newUnix)
  var diff = newUnix - oldUnix
  
  //Judgement 
  if (diff < wait_sec) {
    //Log setting
    var cancel_msg = '処理をキャンセルしました。' 
    Browser.msgBox("処理実行中です。しばらくお待ちください。\\n\\n" +  cancel_msg)
    return false
  }
  
  //Set exec time
  sheet_set.getRange(row, column).setValue(newUnix);

  return true
}

