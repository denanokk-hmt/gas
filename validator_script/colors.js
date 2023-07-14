function test() {
  const book = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = book.getSheetByName('response')
  cellsWhite(sheet)
}
//ConvertRange2A1
function convertNum2A1(sheet, row, column) {
  var result = sheet.getRange(row, column);
  return result.getA1Notation();
}
//
function cellsWhite(sheet) {
  const lastRow = sheet.getLastRow() - 1
  const lastSheetRow = sheet.getRange("A:A").getLastRow();
  const range_str = "A2:" + "Z" + lastSheetRow
  const range = sheet.getRange(range_str);
  range.setBackground('#ffffff');
}
//
function erroCellsBgColor(sheet, log) {
  var cells = []
  for (let idx in log) {
    for (let idx2 in log[idx]) {
      let str = []
      str = log[idx][idx2].replace(/ /g, '|').split('|');
      let row = str[0].replace("Row:", "");
      for (let idx3 in str) {
        switch (true) {
          case /^message_no$/.test(str[idx3]):
            cells.push("A" + row);
            break;
          case /^message_type$/.test(str[idx3]):
            cells.push("B" + row);
            break;
          case /^message$/.test(str[idx3]):
            cells.push("C" + row);
            break;            
          case /^columns$/.test(str[idx3]):
            cells.push("D" + row);
            break;
          case /^necessary_column$/.test(str[idx3]):
            cells.push("D" + row);
            break;
          case /^value[1-9]+/.test(str[idx3]):
            const val_num = Number(str[idx3].replace("value","").replace(",",""))
            const cell = convertNum2A1(sheet, Number(row), val_num + 4)
            cells.push(cell);
            break;
          default:
            //nothing
        }
      }
    }
  }
  
  if (cells.length > 0) {
    for(let idx in cells) {
      let range = sheet.getRange(cells[idx]);
      range.setBackground('#ffff00');    
    }
  }
  return cells
}