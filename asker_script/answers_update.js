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
// @version_kind: v1, v2
//
function Update(kind, env, client, pre_client, version_kind='v1') {

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
    
  ///////////////////conter check///////////////
    
  //Set wait sec      
  var wait_sec = 40;
  
  //Check exec time
  if (!CheckExecTime(env, wait_sec, kind)) return

  
  ///////////////////url seting///////////////

  //Get boarding domain, tokens client, client from formation
  var formation = getBoardingDomain_TokensClient(env, client, version_kind)

  //Set boarding Pass(URL)
  var domain = formation.boarding
  var path = "/post/asker/" + kind + "/update"
  var token = formation.tokens[0]
  var keet_auth = formation.token
  var version = get_version_token('boarding', version_kind)
  var url = "https://" + domain + "/hmt/" + formation.client + path
  var client_id = (env === 'pre')? client : null;  //for pre client
  
  //Browser.msgBox(`url: ${url}, version: ${JSON.stringify(version)}, client_id: ${client_id}`)

  //Set chunk size and initialize requests array
  const chunk_size = 50;
  let requests = [];
  
  try {
    
    //Get values and build requests
    if(kind == "answers"){

      ///////////////////For ANSWERS//////////

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
     
    } else {
      
      ///////////////////For RESPONSE//////////
        
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
          'payload': {
            'batch_id': batch_id,
            'response': JSON.stringify(parsed_arr.slice(i, i+chunk_size)),
            'header_line': JSON.stringify(header_line[0]),
            'version': version.version,
            'token': token,
            'client_id' : client_id            
          }
        })

        //if(env == 'pre') requests[count].payload.client_id = client;
        count++;
      }
    }
      
    //Request
    var responses = UrlFetchApp.fetchAll(requests)

    //Convert text_
    var responses_content = responses.map(res => res.getContentText("UTF-8"))

    //Logging
    Logger.log(responses_content)
    var log_no = logging(kind, JSON.stringify(responses_content))

    //In case responses is an array of strings , deserialize it first
    let response_kind = typeof responses[0] === 'string' ? responses.map(res => JSON.parse(res)) : responses;

    //Check if there's an error in the responses array for result log
    let error = response_kind.some(response => (response.status_code && response.status_code !== 0) || (response.status && response.status !== 'Success.'))
      
    //Msg
    var msg
    switch (true) {
      case error:
        msg = "【" + env_log + "環境】\\n" + kind_log + remarks_log
        kind_log = (kind === 'answers')? 'AIへの設定でエラーが発生しました。' : 'AIのレスポンス（回答文言）を更新でエラーが発生しました。'
        remarks_log = "\\n\\n※管理者へご報告してください。" + "\\nログ番号:" + log_no;
        msg = "【" + env_log + "環境】\\n" + kind_log + remarks_log
        break;
      default:
        msg = "【" + env_log + "環境】\\n" + kind_log + remarks_log
        kind_log = (kind === 'answers')? 'AIへの設定が完了しました。' : 'AIのレスポンス（回答文言）の更新が完了しました。'
        remarks_log = "\\n\\n※(ログ番号:" + log_no + ")";
        msg = "【" + env_log + "環境】\\n" + kind_log + remarks_log
    }
      
    Browser.msgBox(msg);
    return true
      
  } catch(err) {
      
    //Logging
    Logger.log(err);
    var log_no = logging(kind, err)
      
    //Err msg
    msg = "【" + env_log + "環境】\\n" + kind_log + remarks_log
    kind_log = (kind === 'answers')? 'AIへの設定でエラーが発生しました。' : 'AIのレスポンス（回答文言）を更新でエラーが発生しました。'
    remarks_log = "\\n\\n※管理者へご報告してください。" + "\\nログ番号:" + log_no;
    msg = "【" + env_log + "環境】\\n" + kind_log + remarks_log    
      
    Browser.msgBox(msg);
    return false
  }
}
