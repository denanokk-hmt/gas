function update_answers(kind, version, token, client_id, url, env_log){
  ///////////////////For ANSWERS//////////
  //Set chunk size and initialize requests array
  const chunk_size = 50;
  const requests = [];

  try{
    //Get sheets values
    const credentials_sheet = SpreadsheetApp.getActive().getSheetByName('credentials');
    const default_messages_sheet = SpreadsheetApp.getActive().getSheetByName('default_messages');
    const config_sheet = SpreadsheetApp.getActive().getSheetByName('config');

    //Get range values from sheet values
    const cred_vals = credentials_sheet.getRange(1, 2, credentials_sheet.getLastRow(), 2).getValues()
    const def_msg_vals = default_messages_sheet.getRange(1, 1, default_messages_sheet.getLastRow(), 2).getValues()
    const config_vals = config_sheet.getRange(1, 1, config_sheet.getLastRow(), 2).getValues()

    //Set requests
    requests.push({
      'url': url,
      'method': 'post',
      'muteHttpExceptions': true,
      'payload': {
        'credentials': JSON.stringify(cred_vals),
        'config': JSON.stringify(config_vals),
        'default_messages': JSON.stringify(def_msg_vals),
        'version': version.version,
        'token': token,
        'client_id' : client_id
      }
    });
    //if(env == 'pre') requests[0].payload.client_id = client;
    //Request
    var responses = UrlFetchApp.fetchAll(requests)
    return responses
  } catch(err) {
  
    //Logging
    Logger.log(err);
    var log_no = logging(kind, err)
  
    //Err msg
    kind_log = 'AIへの設定でエラーが発生しました。'
    remarks_log = "\\n\\n※管理者へご報告してください。" + "\\nログ番号:" + log_no;
    msg = "【" + env_log + "環境】\\n" + kind_log + remarks_log
  
    Browser.msgBox(msg);
    return false
  }
}