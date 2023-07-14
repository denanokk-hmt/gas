function tester() {
  //var result = get_version_token("control-tower", "v1")
  //console.log(result.server)
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