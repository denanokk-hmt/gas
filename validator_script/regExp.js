function testReg(){
  let data
  let regexp
 
  //data = '03-333-3333'
  //regexp.str = '^0[0-9]{8,}'
  //data = 'mailto:user@dammy.com?'
  //regexp.str = '^mailto:[\.|a-z/0-9]+@[a-z/0-9]+';
  //data = data.replace(/-/g, '');
  
  //data = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHQ4HvCs3DeWCDSnA7wBl_kt8J6kGe-EJP6mUh6b7-AZA0JB4Q';
  data = '2https://www.svc.co.jp/';
  //data = 'https://ja.wikipedia.org/wiki/%E3%83%A9%E3%82%A4%E3%82%AA%E3%83%B3';
  regexp = '^http[s]*://[\.|a-z|0-9]*.[a-z]{2,}';
  //regexp = '^https?://[\w!?/\+\-_~=;\.,*&@#$%\(\)\’\[\]]+';
  
  const result = searchByRegExp(1, 'img_url', data, regexp)
  return result
}

/////////////////////////////////////////////////////
//SEARCH BY REGEXP
/////////////////////////////////////////////////////
function searchByRegExp(value_pos, data_name, str, regexp, option) {
  try {
    const exp = {
      str: regexp,
      opt: option,
    }
    const pattern = new RegExp(exp.str, exp.opt);
    const result = str.match(pattern);
    if (!result) {
      return 'value' + value_pos + ' is wrong format ' + data_name
    }
  } catch(err) {
    Logger.log(err)
    return err
  }
}