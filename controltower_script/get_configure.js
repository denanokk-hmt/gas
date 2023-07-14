/////////////////////////////////////////////////////
//GET CONFIGURE
/////////////////////////////////////////////////////
//
//
function GetConfigure(ns, kind) {
  
  ///////////////////url seting///////////////
  var domain = "control-tower2.bwing.app"
  var path = "/get/configure"
  var version = "2.0.0"
  var appli_name = 'get_configure'
  var keel_auth = 'g3Ypb305XXoMHqf6x2KImnmAZ/wssRzEj7KQQQBQwH5qMB4kAt8fUvo3ThRSO9NUXaAB14/ECsbpopFjPSpj7ZCUmcv3v1SI&'
  var tokens1 = 'wDQ/aiMoXGReH/CslDLUkizQYaIvsxyejeWXFVsFxXg5Z0whUIUfXa06HEQHP4QHCasB1tzFCsPso5s0a3g2s8OUlZirvwWD'
  var tokens2 = '1zUqNX89X2FZEKynwWbVxy3RN60stUzDiuSUEwAGwy1rZh8kVYUaXas3QUEDboZVD6wDhoiUCcS/pp41bnlg6sHAl5/54ACG'
  var query = "?version=" + version + "&appli_name=" + appli_name + "&ns=" + ns + "&kind=" + kind + "&token=" + keel_auth + "&tokens=" + tokens1 + "," + tokens2
  var url = "https://" + domain + "/hmt" + path + query

  //Browser.msgBox(url)

  try {
    //Request
    var response = UrlFetchApp.fetch(url)
    
    //Convert
    var content = response.getContentText("UTF-8")

    //Result log
    var log = JSON.parse(content)
    var status_code = (Number(log.status_code) + 0).toFixed(0)
    
    //Logging
    var qty = log.length
    var msg = 'Get configure qty:' + qty
    var log_no = logging(msg, ns + "-" & kind)    
         
    //Msg
    //Browser.msgBox(msg);

    return {
      content,
      qty
    }
      
  } catch(err) {
      
    //Logging
    Logger.log(err);
    var log_no = logging(err, kind)
      
    //Err msg
    msg = err + ":" + log_no;
      
    Browser.msgBox(msg);
    return msg
  }
}