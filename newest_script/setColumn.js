/////////////////////////////////////////////////////
//set column
function setColumn(){
  
  //Active sheet
  var active_sheet = SpreadsheetApp.getActiveSheet()
  var sheet_nm = active_sheet.getName();
  
  //Set sheet
  var sheet_set = SpreadsheetApp.getActive().getSheetByName(sheet_nm);

  //active column
  var active_column = active_sheet.getActiveCell().getColumn()

  //active row
  if (sheet_nm == 'Newest' || sheet_nm == 'WorthWords') {
    if (active_column == 2) {
      var active_row = active_sheet.getActiveCell().getRow()
    } else {
     return 
    }
  } else {
   return 
  }
  
  //active cell value
  var active_value = active_sheet.getRange(active_row, active_column).getValue()
  
  //column name positionof column
  pos_col = 4

  //Set column name
  switch (active_value) {
    case 'item_image_slider':
      var str = "item_name\\n item_value\\n img_url\\n alt"
      break
    case 'link_image_slider':
      var str = "item_name\\n item_value\\n img_url\\n alt\\n link"
      break
    case 'string_value_chip':
    case 'list':
      var str = "item_name\\n item_value"
      break
    case 'image_card':
      var str = "img_url\\n link_label\\n link_url"
      break
   default:
      var str = ""
  }
  sheet_set.getRange(active_row, pos_col).setValue(str.split('\\n ').join(String.fromCharCode(10)));
  
  return true
}