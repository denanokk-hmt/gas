/////////////////////////////////////////////////////
//ANSWERS UPDATE
/////////////////////////////////////////////////////
//
//copy & paste like the below for production.
//
// @kind: answers, response
// @env: prd, pre, stg, dev
// @client: client code(svc,,)
// @pre_client ~v18, v19~:not use
// @series: v1, v2
//
function Update(kind, env, client, pre_client, version_kind, super_force_zzz=null) {

  ///////////////////For PRD, PRE, DEV//////////
  ///////////////////confirmation///////////////
  
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
    Browser.msgBox(`引数異常：${kind}, ${env}, ${client}`)
    return
  }
  var kind_log = (kind === 'answers')? 'AIへの設定を変更します。' : 'AIのレスポンス（回答文言）を更新します。'
  var remarks_log = "\\n\\n※反映までに数分間かかる場合もあります。\\nしばらくお待ちください。";
  var confirm_log = "【" + env_log + "環境】\\n" + kind_log + remarks_log
  
  //confirmation
  var result= Browser.msgBox(confirm_log,Browser.Buttons.OK_CANCEL);
  if(result!="ok"){
    return
  }
    
  ///////////////////counter check///////////////
    
  //Set wait sec      
  var wait_sec = 40;
  
  //Check exec time
  if (!CheckExecTime(env, wait_sec, kind)) return

  
  ///////////////////url seting///////////////

  //Get boarding domain, tokens client, client from formation
  var formation = getBoardingDomain_TokensClient(env, client, super_force_zzz)

  //Set boarding Pass(URL)
  var domain = formation.boarding
  var path = "/post/asker/" + kind + "/update"
  var token = formation.tokens[0]
  var keet_auth = formation.token
  var version = get_version_token('boarding', version_kind)
  var url = "https://" + domain + "/hmt/" + formation.client + path
  var client_id = (env === 'pre')? client : null;  //for pre client
  
  //Browser.msgBox(`url: ${url}, version: ${JSON.stringify(version)}, client_id: ${client_id}`)

  let responses;

  //Get values and build requests
  if(kind == "answers"){

    responses = update_answers(kind, version, token, client_id, url, env_log)

  } else if(kind == "response") {
    
    responses = update_response(kind, version, token, client_id, url, env_log)

  } else {

    Browser.msgBox(`引数異常：${kind}, ${env}, ${client}`)
    return

  }

  if(!responses){
    kind_log = (kind === 'answers')? 'AIへの設定でエラーが発生しました。' : 'AIのレスポンス（回答文言）を更新でエラーが発生しました。'
    remarks_log = "\\n\\n※管理者へご報告してください。" + "\\nログ番号:" + log_no;
    msg = "【" + env_log + "環境】\\n" + kind_log + remarks_log
    Browser.msgBox(msg);
    return
  }

  //Convert text_
  var responses_content = responses.map(res => res.getContentText("UTF-8"))

  let success = true;
  for(let i = 0; i < responses_content.length; i++){
    if(responses_content[i].status_code > 0){
      Logger.log(responses_content[i])
      success = false
      break
    }
  }

  //Logging
  Logger.log(responses_content)
  var log_no = ""
  if ( responses_content.length = 1) {
    log_no = logging(kind, responses_content[0])
  } else {
    for(let i = 0; i < responses_content.length; i++){
      log_no = logging(kind, responses_content[i]) + ", " + log_no
    }
  }

  //Msg
  var msg
  switch (success) {
    case true:
      kind_log = (kind === 'answers')? 'AIへの設定が完了しました。' : 'AIのレスポンス（回答文言）の更新が完了しました。'
      remarks_log = "\\n\\n※(ログ番号:" + log_no + ")";
      msg = "【" + env_log + "環境】\\n" + kind_log + remarks_log
      break;
    default:
      kind_log = (kind === 'answers')? 'AIへの設定でエラーが発生しました。' : 'AIのレスポンス（回答文言）を更新でエラーが発生しました。'
      remarks_log = "\\n\\n※管理者へご報告してください。" + "\\nログ番号:" + log_no;
      msg = "【" + env_log + "環境】\\n" + kind_log + remarks_log
      break;
  }

  Browser.msgBox(msg);
  return
}