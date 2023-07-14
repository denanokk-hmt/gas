function test_formation() {
  var result = getBoardingDomain_TokensClient('pre', 'sbs', 'v1')
  Logger.log(result);
}

/////////////////////////////////////////////////////
//Get boarding domain, tokens client
/////////////////////////////////////////////////////
var force_zzz = 'prd3' //クラスター移管に伴い、クライアントを完全重複可能に変更。zzzで切り分けが可能
/*
  env: 環境-->dev, stg, prd, pre
  client: 顧客コード-->svc
  super_force_zzz: 強制zzzフィルター(個別シートごとにzzz指定が可能)
*/
function getBoardingDomain_TokensClient(env, client, super_force_zzz) {

  //control tower version
  //https://docs.google.com/spreadsheets/d/11qiG-UGry_ukEBvv-Y8ka7YqpbradD2O-tdzM-4CJD0/edit#gid=1300601338
  //fielename:settings
  //sheet: version_tokens
  //appli_name: control-tower
  var version_token = {
    version: '2.0.0',
    token: 'g3Ypb305XXoMHqf6x2KImnmAZ/wssRzEj7KQQQBQwH5qMB4kAt8fUvo3ThRSO9NUXaAB14/ECsbpopFjPSpj7ZCUmcv3v1SI'
  }
  var domain = "https://control-tower2.bwing.app"
  var path = "/hmt/get/formation"
  var query = "?appli_name=asker&version=" + version_token.version + "&token=" + version_token.token + "&environment=" + env + "&client=" + client
  var url = domain + path + query

  // GETリクエスト
  var response = UrlFetchApp.fetch(url);
  var content = response.getContentText("UTF-8");

  //Logger.log(content);
  var parser = JSON.parse(content)

  //care duplicatte client
  let findex = 0
  if (parser.formation.length != 1) {
    const zzz = (super_force_zzz)? super_force_zzz : (force_zzz)? force_zzz : null;
    for (let idx in parser.formation) {
      if (parser.formation[idx].zzz == zzz) {
        findex = idx;
        break;
      }
    }
  }

  var boarding = parser.formation[findex].boarding.domain
  var tokens = parser.tokens_client.list[client]
  var pre_client = parser.formation[findex].pre_client
  client = (env == 'pre')? pre_client : client

  return {
    boarding,
    tokens,
    client
  }
}
