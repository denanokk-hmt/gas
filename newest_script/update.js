/////////////////////////////////////////////////////
//UPDATE
/////////////////////////////////////////////////////
//
//copy & paste like the below.
// function Update_pre() { newestResponseUpdate('pre', 'svc', 'v1', true) }
function Update_prd() { newestResponseUpdate('stg', 'svc', 'v2', false) }

function newestResponseUpdate(env, client, series='v1', force=false) {

  //Log setting
  var env_log
  if (env == 'prd') {
    env_log = "本番";
  } else if (env == 'pre') {
    env_log = "プレ";
  } else if (env == 'stg') {
    env_log = "ステージング";
  } else if (env == 'dev') {
    env_log = "DEV";
  } else {
    Browser.msgBox("Sorry...wrong settings..")
    return
  }
  var confirm_log = "【" + env_log + "】 Newest\\n をアップデートしてよろしいですか？"
  
  //confirmation
  if (!force) {
    var result=Browser.msgBox(confirm_log,Browser.Buttons.OK_CANCEL);
    if(result!="ok"){
      return
    }
  }
  
  //Make request url
  var formation = getNewestDomain_TokensClient(env, client, series)
  var version = get_version_token('newest', series)
  var url = "https://" + formation.newest + "/hmt/get/newest/update?client=" + client + "&version=" + version.version + "&token=" + formation.tokens[0]

  //Browser.msgBox(url)
  
  //Update
  try {
    
    //Get request
    var response = UrlFetchApp.fetch(url);
    
    //Get html content
    var content = response.getContentText("UTF-8");
    
    //Get status code
    var status_code = content.split(',')[1].split(":")[1]
    
    //Make log msg
    var log = content.split("{")[1].split("}")[0].replace(/,/g, '\\n').replace(/"/g, '')
    if (status_code === "0") {
      log = "【" + env_log + "の更新が完了しました。】\\n\\n" + log
    } else {
      log = "【" + env_log + "の更新が失敗しました。】\\n\\n" + log
    }
    Browser.msgBox(log);
    return true
  } catch(err) {
    //Make error log
    var log = err.message.split("{")[1].split("}")[0].replace(/,/g, '\\n').replace(/"/g, '')
    Browser.msgBox(log);
    return false
  }
}
