const COL_PROG_UPDATE_RESULT = 8

function test_update() {
  var button_row = 3
  var ns = 'scheme'
  var kind = 'server_code-cluster'
  var exec_sheetName = 'exec'
  const result = exec_update_configure(button_row, ns, kind, exec_sheetName)
  console.log(result)
}



/////////////////////////////////////////////////////
//UPDATE CONFIGURE
/////////////////////////////////////////////////////
function exec_update_configure(button_row, ns, kind, exec_sheetName) {
  try {

    //Check exec time
    if (!CheckExecTime(10)) return  
    
    //Log setting
    var confirm_log = "Are you sure? \\nUpdate configure : 【" + ns + "/" + kind + "】"
    
    //confirmation
    var result= Browser.msgBox(confirm_log,Browser.Buttons.OK_CANCEL);
    if(result!="ok"){
      return false
    }
    
    ///////////////////url seting///////////////
    var domain = "control-tower2.bwing.app"
    var path = "get/insert/spreadsheet"
    var version = "2.0.0"
    var appli_name = 'keel' //←他のコンポでもkeelで問題なし=え？なら必要？
    var keel_auth = 'g3Ypb305XXoMHqf6x2KImnmAZ/wssRzEj7KQQQBQwH5qMB4kAt8fUvo3ThRSO9NUXaAB14/ECsbpopFjPSpj7ZCUmcv3v1SI&'
    
    //Search spreadsheet id
    switch(`${ns}-${kind}`) {
      case 'scheme-formation':
      case 'scheme-server_code-cluster':
      case 'scheme-server_code-server_domain':
        var spreadsheet_id ='1AANh6T34QnPCQEH9TkbopgVqcXaWy-Aj6RtRnzV5XFo';
        break;
      case 'project_id-server_code-project_id':
        var spreadsheet_id ='1QYCwlagSiI6S4oL68iLGGtBP5kbPpTjrtnJmH_5xETg';
        break;
      case 'common-version':
        var spreadsheet_id ='1cnkL5hYadJHBVxzG6NztJvbxfRh8ENHEHWBIMmmZXbk';
        break;
      case 'api_connect-state-client-api_routine':
      case 'api_connect-server_code-state':
      case 'api_connect-server_code-operator':
      case 'api_connect-state-module':
      case 'api_connect-client-google_translate':
        var spreadsheet_id ='1ceWLg2bMYSJqRko_ZWqc-IraVov07T2wFJ1gsMHhHUw';
        break;
      case 'env-boarding':
      case 'env-keel':
      case 'env-asker':
      case 'env-newest':
      case 'env-p1':
      case 'env-cargo':
      case 'env-cabin':
      case 'env-control-tower2':
        var spreadsheet_id ='1Xt3X0YsunZQZOaMLdEC4j0iuTxOeKnOJi-IBUXm6KAg';
        break;
      case 'token-anonymous':
      case 'token-keel_auth':
        var spreadsheet_id ='1QeviKjqRe8LFyJE-W2fsFv5-EpBqFA2A4cf9m-TB2JY';
        break;
      case 'env_client-boarding':
      case 'env_client-keel':
      case 'env_client-asker':
      case 'env_client-cargo':
      case 'env_client-transit':
      case 'env_client-catwalk':
        var spreadsheet_id ='1OQa1uI2OuXh9AlLPCgQG_tmtLVj-XbA4Of2UKg4_zAc';
        break;
      case 'tokens_client-tokens':
        var spreadsheet_id ='1SaXDis8wWCCCu-_Y-k3Y5dlSwrocKeEVf3qxBA00LfE';
        break;
      case 'spreadsheet-asker_config':
      case 'spreadsheet-asker_response':
      case 'spreadsheet-newest':
      case 'spreadsheet-p1':
        var spreadsheet_id ='1iuLHwh7PDy_vGbxeCmKOmKR-yNsZ0ZVNY1JW-rQ5Kbc';
        break;
      default:
        throw new Error('Error shceme-kind')
    }
    
    var query = "?version=" + version + "&appli_name=" + appli_name + "&ns=" + ns + "&kind=" + kind + "&id=" + spreadsheet_id + "&token=" + keel_auth
    var url = "https://" + domain + "/hmt/" + path + query    
    
    //Browser.msgBox(url)
    //return

    ///////////////////Ready result writer///////////////
    
    //Sheet writer
    //const book_id = SpreadsheetApp.getActive().getId();
    const book_id = spreadsheet_id
    const spreadsheet = SpreadsheetApp.openById(book_id)
    const sheet = spreadsheet.getSheetByName(kind)
    const sheet_exec = spreadsheet.getSheetByName(exec_sheetName)    

    ///////////////////Call API///////////////
    
    //Request
    var response = UrlFetchApp.fetch(url)
    
    //Convert
    var content = response.getContentText("UTF-8")   

    //Result log
    var result = JSON.parse(content)
    var status_code = (Number(result.status_code) + 0).toFixed(0)
    
    //Revision did not match validation result
    if (status_code == 105) {
      sheet_exec.getRange(button_row, COL_PROG_UPDATE_RESULT).setValue(`${new Date()}\n${result.status_msg}`) 
      Browser.msgBox(result.status_msg)
      return
    }
    
    //Logging
    var msg = result.status_msg
    //var log_no = logging(msg, ns + "-" + kind)    
         
    //Msg
    //Browser.msgBox(msg);
    
    //Revsion
    const revision = result.revision
    sheet.getRange(1, 1).setValue(revision);
    
    //Result log
    sheet_exec.getRange(button_row, COL_PROG_UPDATE_RESULT).setValue(`${new Date()}\n Result:${result}\n Rev:${revision}`)    
       
    Browser.msgBox("Done.")
      
  } catch(err) {
      
    //Logging
    Logger.log(err.message);
    var log_no = logging(err.message, kind)
      
    //Err msg
    msg = err.message + ":" + log_no;
      
    Browser.msgBox(msg);
    return msg
  }
}