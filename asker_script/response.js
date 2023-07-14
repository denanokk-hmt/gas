function update_response(kind, version, token, client_id, url, env_log){
  ///////////////////For RESPONSE//////////
  //Set chunk size and initialize requests array
  const chunk_size = 50;
  const requests = [];

  try{
    //Get sheet values
    const response_sheet = SpreadsheetApp.getActive().getSheetByName('response')

    //Get range values from sheet values
    const val_arr = response_sheet.getRange(2, 1, response_sheet.getLastRow(), response_sheet.getLastColumn()).getValues()

    //Create new array without empty string rows
    const parsed_arr = []
    val_arr.map(val => {
     if(val[0] !== ""){
      parsed_arr.push(val);
     }
    })

    const header_line = response_sheet.getRange(1, 1, response_sheet.getLastRow(), response_sheet.getLastColumn()).getValues()

    //Chunk data and create array of requests for async post request
    const batch_id = new Date().getTime().toString();
    let count = 0;
    for(let i = 0; i < parsed_arr.length; i += chunk_size){
      requests.push({
        'url': url,
        'method': 'post',
        'muteHttpExceptions': true,
        'payload': {
          'batch_id': batch_id,
          'response': JSON.stringify(parsed_arr.slice(i, i+chunk_size)),
          'header_line': JSON.stringify(header_line[0]),
          'version': version.version,
          'token': token,
          'client_id' : client_id
        }
      })

      count++;
    }
    //Request
    var responses = UrlFetchApp.fetchAll(requests)
    return responses
  } catch(err) {

    //Logging
    Logger.log(err);
    var log_no = logging(kind, err)

    //Err msg
    kind_log = 'AIのレスポンス（回答文言）を更新でエラーが発生しました。'
    remarks_log = "\\n\\n※管理者へご報告してください。" + "\\nログ番号:" + log_no;
    msg = "【" + env_log + "環境】\\n" + kind_log + remarks_log

    Browser.msgBox(msg);
    return false
  }
}