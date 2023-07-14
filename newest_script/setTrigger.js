function setTrigger(setFunc){
  
  //Set sheet
  var sheet_nm = "Timer"
  var sheet = SpreadsheetApp.getActive().getSheetByName(sheet_nm);
  
  var year = sheet.getRange(1, 2).getValue();
  var month_msg = sheet.getRange(2, 2).getValue();
  var month = sheet.getRange(2, 2).getValue()-1;  //0~11: Jan=0
  var date = sheet.getRange(3, 2).getValue();
  var hours = sheet.getRange(4, 2).getValue();
  var minutes = sheet.getRange(5, 2).getValue();
  
  var confirm_log = "【本番】Newestのアップデートタイマーを\\n[ " + year + "/" + month_msg + "/" + date + " " + hours + ":" + ('00' + minutes).slice(-2) + " ]\\nに設定します。"
  var result=Browser.msgBox(confirm_log,Browser.Buttons.OK_CANCEL);
  if(result!="ok"){
    return
  }

  /*
  var func = "Update_prd_force"
  Browser.msgBox(year)
  Browser.msgBox(month)
  Browser.msgBox(date)
  Browser.msgBox(hours)
  Browser.msgBox(minutes)
  return
  */
  
  var setTime = new Date();
  setTime.setFullYear(year);
  setTime.setMonth(month);
  setTime.setDate(date);
  setTime.setHours(hours);
  setTime.setMinutes(minutes);
  
  ScriptApp.newTrigger(setFunc).timeBased().at(setTime).create();

  Browser.msgBox("タイマー設定が完了しました。")
}