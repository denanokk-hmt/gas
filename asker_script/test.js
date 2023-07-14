//push test

//local test
function getPreviousVersion() {
  let token = ScriptApp.getOAuthToken();
  
  Logger.log(token);
  var url = 'https://script.googleapis.com/v1/projects/10TIYymj56JUiXZvQmM0MI4c8farCQWXOoPMGZij50pOiy0PDPYwl-pOd/content?versionNumber=16'+ "&oauth=" + token;
  
  var response = UrlFetchApp.fetch(url)
    
  //Convert text_
  var content = response.getContentText("UTF-8")
  
  Logger.log(content)
  console.log(content)

}

//answers update test client svc in dev environment
function getTestAnswersData() {
  var testData = {
    'credentials': [["method","[\"ci_tester\", \"post_message\", \"get_quest\"]"],["environment","Watson Assistant Development2-Tokyo/Sola2-Newest2"],["workspace_id","5145df1d-2cb5-4b3e-9a59-7bee9d11af3e"],["username","apikey"],["password","hmTIebNqSvEBWU-1PLF8DaugTvBBRfRmUOZPepqcHAqO"],["url","https://gateway-tok.watsonplatform.net/assistant/api"],["tag","[\"all\", \"tester\", \"prd\", \"pre\"]"],["method","[\"ci_tester\", \"post_message\", \"get_quest\"]"],["environment","Watson Assistant Development/WhatYa svc Mock"],["workspace_id","4708e18d-9bd6-46b2-a883-fc7f1f179b90"],["username","apikey"],["password","wtnLNwKqoSoftg7G-JOo4izZWgHqmXqVVqSHJwsqY8tI"],["url","https://gateway-tok.watsonplatform.net/assistant/api"],["tag","[\"all\", \"tester\", \"prd\", \"pre\"]"],["method",""],["environment",""],["workspace_id",""],["username",""],["password",""],["url",""],["tag",""],["method",""],["environment",""],["workspace_id",""],["username",""],["password",""],["url",""],["tag",""],["method",""],["environment",""],["workspace_id",""],["username",""],["password",""],["url",""],["tag",""]],
    'default_messages': [["min_length_error","最低文字数が足りていません。S2|R0002"],["max_length_error","最台文字数がオーバーです。S2"],["timeout_error","タイムアウトエラーです。SS"],["conversation_api_error","Watsonちょっとイカれちゃった。SS"],["confidence_error","確信度が不足でした。SS"],["system_error","システムが異常終了しました。SS"],["data_linkage_error","Linkage error...\\\ SS"]],
    'config': [["confidence_exclusion",0.3],["ai_timeout",1000000],["manner","compare_results"],["under_min_length-question_min_length",3],["under_min_length-conversation_id","not enough question length"],["under_min_length-intents","not enough question length"],["under_min_length-entities","not enough question length"],["under_min_length-confidence","[ 0, 0 ]"],["under_min_length-text",""],["under_min_length-nodes_visited","nothing"],["over_max_length-question_max_length",20],["over_max_length-conversation_id","over question length"],["over_max_length-intents","over question length"],["over_max_length-entities","over question length"],["over_max_length-confidence","[ 0, 0 ]"],["over_max_length-text",""],["over_max_length-nodes_visited","nothing"],["exclusion_min_length_strings","未解決"],["exclusion_min_length_strings","解決"],["exclusion_min_length_strings","返品"],["exclusion_min_length_strings","返品は"],["exclusion_min_length_strings","返品を"],["exclusion_min_length_strings","送料"],["exclusion_min_length_strings","送料は"],["exclusion_min_length_strings","Yes"],["exclusion_min_length_strings","No"],["no_output_words","HHHHH"]],
  }
  
  return testData;
}

//resposne update test client svc in dev environment
function getTestResponseData(){
  var testData = {
    'response': [["R000_0001_1","text","お探しのブランド・商品は、5階 子供洋品売り場にございます。\\ただし、営業状況が変更になっている場合がございます。\詳細はホームページをご確認ください。","","","","","","","","","","","","","","","","","","","","","","",""],["R000_0001_2","image","子供洋品","https://www.daimaru.co.jp/kobe/dgguide/floormap/f5/F5_7.jpg","no image","","","","","","","","","","","","","","","","","","","","",""],["R000_0002_1","text","お探しのブランド・商品は、4階 婦人服売り場にございます。\\ただし、営業状況が変更になっている場合がございます。\詳細はホームページをご確認ください。","","","","","","","","","","","","","","","","","","","","","","",""],["R000_0002_2","image","婦人服","https://www.daimaru.co.jp/kobe/dgguide/floormap/f4/F4_45.jpg","no image","","","","","","","","","","","","","","","","","","","","",""],["R000_0003_1","text","お探しのブランド・商品は、4階 婦人服売り場にございます。\\ただし、営業状況が変更になっている場合がございます。\詳細はホームページをご確認ください。","","","","","","","","","","","","","","","","","","","","","","",""],["R000_0003_2","image","婦人服","https://www.daimaru.co.jp/kobe/dgguide/floormap/f4/F4_5.jpg","no image","","","","","","","","","","","","","","","","","","","","",""],["R000_0004_1","text","ご利用ありがとうございます。申し訳ございません。お取り扱いをしておりません。\\営業状況が変更になっている場合がございます。\詳細はホームページをご確認ください。","","","","","","","","","","","","","","","","","","","","","","",""],["R000_0004_2","text","ご利用ありがとうございます。申し訳ございません。お取り扱いをしておりません。\\営業状況が変更になっている場合がございます。\詳細はホームページをご確認ください。","","","","","","","","","","","","","","","","","","","","","","",""]]
  }
  
  return testData;
}
