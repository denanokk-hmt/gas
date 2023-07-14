function testFormation() {
  var result = getNewestDomain_TokensClient('dev', 'svc', 'v2')
  Logger.log(result);
}

/////////////////////////////////////////////////////
//Get newest domain, tokens client
/////////////////////////////////////////////////////
function getNewestDomain_TokensClient(env, client, series) {
  
  //control tower version
  var version_token = get_version_token('control-tower', series)
  
  var domain = "https://control-tower.bwing.app"
  var path = "/hmt/get/formation"
  var query = "?version=" + version_token.version + "&token=" + version_token.token + "&environment=" + env + "&client=" + client + "&appli_name=newest"
  var url = domain + path + query
  
  //Browser.msgBox(url)
  
  // GETリクエスト
  var response = UrlFetchApp.fetch(url);
  var content = response.getContentText("UTF-8");
  
  //Logger.log(content);
  
  var parser = JSON.parse(content)
  
  var newest = parser.formation[0].newest.domain
  var tokens = parser.tokens_client.list[client]
  
  return {
    newest,
    tokens
  }
}
