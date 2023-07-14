///////////////////////////////////////////////////////////////
//IMAGE GENARATOR
///////////////////////////////////////////////////////////////
/*
//item_image_slider　Genarator
function item_image_slider_Generator_0() { Generator('item_image_slider', 0) }
function item_image_slider_Generator_1() { Generator('item_image_slider', 1) }
function item_image_slider_Generator_2() { Generator('item_image_slider', 2) }
function item_image_slider_Generator_3() { Generator('item_image_slider', 3) }
function item_image_slider_Generator_4() { Generator('item_image_slider', 4) }
function item_image_slider_Generator_5() { Generator('item_image_slider', 5) }
function item_image_slider_Generator_6() { Generator('item_image_slider', 6) }
function item_image_slider_Generator_7() { Generator('item_image_slider', 7) }
function item_image_slider_Generator_8() { Generator('item_image_slider', 8) }
function item_image_slider_Generator_9() { Generator('item_image_slider', 9) }
function item_image_slider_Generator_10() { Generator('item_image_slider', 10) }
//link_image_slider　Genarator
function link_image_slider_Generator_0() { Generator('link_image_slider', 0) }
function link_image_slider_Generator_1() { Generator('link_image_slider', 1) }
function link_image_slider_Generator_2() { Generator('link_image_slider', 2) }
function link_image_slider_Generator_3() { Generator('link_image_slider', 3) }
function link_image_slider_Generator_4() { Generator('link_image_slider', 4) }
function link_image_slider_Generator_5() { Generator('link_image_slider', 5) }
function link_image_slider_Generator_6() { Generator('link_image_slider', 6) }
function link_image_slider_Generator_7() { Generator('link_image_slider', 7) }
function link_image_slider_Generator_8() { Generator('link_image_slider', 8) }
function link_image_slider_Generator_9() { Generator('link_image_slider', 9) }
function link_image_slider_Generator_10() { Generator('link_image_slider', 10) }
//image_card　Genarator
function image_card_Generator_0() { Generator('image_card', 0) }
function image_card_Generator_1() { Generator('image_card', 1) }
*/

//Genarator
function Generator(type, number) {
  
  //Active sheet
  var active_sheet = SpreadsheetApp.getActiveSheet()
  var sheet_nm = active_sheet.getName();
  
  //Set sheet
  var sheet_set = SpreadsheetApp.getActive().getSheetByName(sheet_nm);
  
  switch (type) {
    case 'item_image_slider':
      if (number == 0) {
        sheet_set.getRange('C8:L8').setValue('')
        break;
      }
      var col = 2
      var v1 = sheet_set.getRange(4, number + col).getValue()
      var v2 = sheet_set.getRange(5, (number + col).toFixed(0)).getValue()
      var v3 = sheet_set.getRange(6, (number + col).toFixed(0)).getValue()
      var v4 = sheet_set.getRange(7, (number + col).toFixed(0)).getValue()
      var str = v1 + "\\n " + v2 + "\\n " + v3 + "\\n " + v4
      sheet_set.getRange(8, (number + col).toFixed(0)).setValue(str.split('\\n ').join(String.fromCharCode(10)))
      break;
    case 'link_image_slider':
      if (number == 0) {
        sheet_set.getRange('C17:L17').setValue('')
        break;
      }
      var col = 2
      var v1 = sheet_set.getRange(12, number + col).getValue()
      var v2 = sheet_set.getRange(13, (number + col).toFixed(0)).getValue()
      var v3 = sheet_set.getRange(14, (number + col).toFixed(0)).getValue()
      var v4 = sheet_set.getRange(15, (number + col).toFixed(0)).getValue()
      var v5 = sheet_set.getRange(16, (number + col).toFixed(0)).getValue()
      var str = v1 + "\\n " + v2 + "\\n " + v3 + "\\n " + v4 + "\\n " + v5
      sheet_set.getRange(17, (number + col).toFixed(0)).setValue(str.split('\\n ').join(String.fromCharCode(10)))
      break;
    case 'image_card':
      if (number == 0) {
        sheet_set.getRange('C24:L24').setValue('')
        break;
      }
      var col = 2
      var v1 = sheet_set.getRange(21, number + col).getValue()
      var v2 = sheet_set.getRange(22, (number + col).toFixed(0)).getValue()
      var v3 = sheet_set.getRange(23, (number + col).toFixed(0)).getValue()
      var str = v1 + "\\n " + v2 + "\\n " + v3
      sheet_set.getRange(24, (number + col).toFixed(0)).setValue(str.split('\\n ').join(String.fromCharCode(10)))
      break;
    default:
  }
}
