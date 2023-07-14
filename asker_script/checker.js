/////////////////////////////////////////////////////
//CHECK EXEC TIME
/////////////////////////////////////////////////////
function CheckExecTime(env, wait_sec, action) {

  //Set sheet
  var sheet_set = SpreadsheetApp.getActive().getSheetByName('Counter');
  
  //Set column
  var column = (env == 'pre')? 1 : 2
  
  //Set row & waiting sec
  switch (action) {
    case 'answers':
      var row = 2
      break;
    case 'response':
      var row = 3
      break;
  }
  
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
    var env_log = (env == 'prd')? "本番" : "プレ";
    var cancel_msg = '【' + env_log + '】' + action + 'の処理をキャンセルしました。' 
    Browser.msgBox("処理実行中です。しばらくお待ちください。\\n\\n" +  cancel_msg)
    return false
  }
  
  //Set exec time
  sheet_set.getRange(row, column).setValue(newUnix);

  return true
}

