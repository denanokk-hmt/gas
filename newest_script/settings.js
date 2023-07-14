function tester() {
  var result = get_settings('prd_boarding', 'sbs')
  console.log(result.server)
}

//////////////////////
//Get server domain & token
//
function get_settings(sheet_name, client) {

  //Set settings book, sheet
  const settings_sheet_id = '1_J2upsm4zHSKsa2RL2JCD-y4faczXIdKlwHQU8DhY0E'
  var spreadsheet = SpreadsheetApp.openById(settings_sheet_id);
  var sheet = spreadsheet.getSheetByName(sheet_name)
  
  //Get data & search
  var range = sheet.getDataRange()
  var values = range.getValues();
  var server = ''
  var token = ''
  var version = ''
  for (let idx in values) {
    if (values[idx][0] == client) {
      server = values[idx][1]
      token = values[idx][2]
      version = values[idx][3]
      break;
    }
  }
  
  //Return
  if (!server) {
    return null;
  } else {
    var result = {
      server: server,
      token: token,
      version: version
    }
    return result;
  }  
}

/////////////////////////////////////////////////////
//GET Version & token
/////////////////////////////////////////////////////
function get_version_token(appli_name, version_kind) {
  
  //Set settings book, sheet
  const settings_sheet_id = '11qiG-UGry_ukEBvv-Y8ka7YqpbradD2O-tdzM-4CJD0'
  var spreadsheet = SpreadsheetApp.openById(settings_sheet_id);
  var sheet = spreadsheet.getSheetByName('versions_tokens')
  
  //get version
  var version_range = sheet.getRange(1, 1, 20, 4).getValues()
  
  let result = {}
  for (let idx in version_range) {
    if (appli_name == version_range[idx][0] && version_kind == version_range[idx][1]) {
      result = {
        version : version_range[idx][2],
        token : version_range[idx][3]
      }
      break;
    }
  }
  return result
}