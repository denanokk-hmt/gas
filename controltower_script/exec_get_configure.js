const COL_PROG_GET_DATA = 2
const COL_PROG_BACKUP = 3
const COL_PROG_DATA_PLOTTED = 4
const COL_PROG_DATA_FORMATTED = 5
const COL_PROG_RESULT_REV = 6
const MSG_PROG_GET_DATA = "Got configure."
const MSG_PROG_BACKUP = "backuped."
const MSG_PROG_DATA_PLOTTED = "data plotted."
const MSG_PROG_DATA_FORMATTED = "data formatted."
            
                
function exec_get_configure(button_row, ns, kind, exec_sheetName) {
  try {
    
    //Check exec time
    if (!CheckExecTime(10)) return  
    
    //Log setting
    var confirm_log = "Are you sure? \\nGetting configure : 【" + ns + "/" + kind + "】"
    
    //confirmation
    var result= Browser.msgBox(confirm_log,Browser.Buttons.OK_CANCEL);
    if(result!="ok"){
      return false
    }   
        
    //Header of row values
    const book_id = SpreadsheetApp.getActive().getId();
    const spreadsheet = SpreadsheetApp.openById(book_id)
    const sheet = spreadsheet.getSheetByName(kind)
    const sheet_exec = spreadsheet.getSheetByName(exec_sheetName)  

    //    
    sheet_exec.getRange(button_row, COL_PROG_GET_DATA).setValue("")
    sheet_exec.getRange(button_row, COL_PROG_BACKUP).setValue("")
    sheet_exec.getRange(button_row, COL_PROG_DATA_PLOTTED).setValue("")
    sheet_exec.getRange(button_row, COL_PROG_DATA_FORMATTED).setValue("")    
    sheet_exec.getRange(button_row, COL_PROG_RESULT_REV).setValue("") 
    
    //get sheet data
    const lastRow = sheet.getLastRow();
    const lastCol = sheet.getLastColumn();
    const header = sheet.getRange(2, 1, 1, lastCol).getValues()
    
    //Get Configure
    const content = GetConfigure(ns, kind)
    if (!content) {
      return
    }  
    const entities = JSON.parse(content.content)

    //
    sheet_exec.getRange(button_row, COL_PROG_GET_DATA).setValue(`${new Date()}\n${MSG_PROG_GET_DATA} Qty:${content.qty}`)
    
    //Adjust getting data to spd columns
    var data = []
    for (let entity of entities) {
      let row = {}
      for (let col of header[0]) {
        row[col] = entity[col]
      }
      data.push(row)
    }
    
    
    //back up sheet
    the_backup(sheet, ns, kind)
    
    //
    sheet_exec.getRange(button_row, COL_PROG_BACKUP).setValue(`${new Date()}\n${MSG_PROG_BACKUP}`)
    
    //Clear Sheet
    sheet.getRange(3, 1, 2000, lastCol).clearContent()
    sheet.getRange(3, 1, 2000, lastCol).clearFormat()
    
    //Revsion
    const revision = entities[0].revision
    sheet.getRange(1, 1).setValue(revision);
    
    //Plot data
    let row_pos = 2 //header row position
    for (let row in data) {
      row_pos++
        let col_pos = 0 //BOF col position
        for (let col in data[row]) {
          col_pos++
            let val = ''
            if (col == 'ns') {
              val = `WhatYa-ControlTower-${ns}`;
            } else if (col == 'kind') {
              val = kind
            } else {
              val = data[row][col]
            }
          sheet.getRange(row_pos, col_pos).setValue(val);
        }
    }
    
    //
    sheet_exec.getRange(button_row, COL_PROG_DATA_PLOTTED).setValue(`${new Date()}\n${MSG_PROG_DATA_PLOTTED}`)
    
    //sort
    the_sort(sheet, ns, kind)
    
    //color
    the_colors(sheet, kind)
    
    //
    sheet_exec.getRange(button_row, COL_PROG_DATA_FORMATTED).setValue(`${new Date()}\n${MSG_PROG_DATA_FORMATTED}`)

    //
    sheet_exec.getRange(button_row, COL_PROG_RESULT_REV).setValue(`${new Date()}\nGet 【Rev:${revision}】 of ${ns}\/${kind}.`)  
    
    Browser.msgBox("Done.")
  
  return  
  } catch (err) {
    Browser.msgBox(err)
  }
}
