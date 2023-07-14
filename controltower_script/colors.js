

function tester() {
  
  //const kind = 'formation'
  //const kind = 'server_code-cluster'
  const kind = 'server_code-server_domain'
  
  //Header of row values
  const book_id = SpreadsheetApp.getActive().getId();
  const spreadsheet = SpreadsheetApp.openById(book_id)
  const sheet = spreadsheet.getSheetByName(kind)
  controltowerscript.the_colors(sheet, kind)
}

var colors = {
    DEFAULT : "#f3f3f3", //Ultra light GRAY
    V2_TEMP : "#ffff00", //Fluorescent YELLOW
    PRD3_PRD : "#b4a7d6", //PURPLE
    PRD3_PRE : "#d9d2e9", //RIGHT PURPLE
    PRD2_PRD : "#f9cb9c", //RIGHT ORANGE
    PRD2_PRE : "#fce5cd", //ULTRA LIGHT ORANGE
    WLP_PRD : "#ffe599", //RIGHT YELLOW
    WLP_PRE : "#fff2cc", //ULTRA LIGHT YELLOW
    V2_DEV : "#d0e0e3", //ULTRA LIGHT BLUE
    V2_STG : "#a2c4c9", //SMOKY BLUE
    V1_PRD : "#9fc5e8", //UNDER LIGHT BLUE
    V1_PRE : "#cfe2f3", //UNDER ULTRA LIGHT BLUE
    V1_CCQA : "#93c47d", //GREEN
    V1_STG : "#6fa8dc", //UNDER BLUE
};

////////////////////////
//
function the_colors(sheet, kind) {

  //Get the last
  const lastRow = sheet.getLastRow();
  const lastCol = sheet.getLastColumn();
  const lastColA1 = sheet.getRange(1, lastCol).getA1Notation().replace(/\d/,'');
  const header = sheet.getRange(2, 1, 1, lastCol).getValues()
  
  //Get colomun position in array
  let colomuns = {}
  for (let idx in header[0]) {
    colomuns[header[0][idx]] = Number(idx)
  }

  //get sheet rows
  const rows = sheet.getRange(3, 1, lastRow, lastCol).getValues();

  //color formatting
  for (let idx in rows) {
    let bg_color = colors.DEFAULT;
    const row_num = (Number(idx) + 3)
    switch (rows[idx][colomuns['series']]) {
      ////////////////v2/////////////////
      case 'v2':
        switch (rows[idx][colomuns['zzz']]) {
          //PRD3-PRD
          case 'tmp':
            bg_color = colors.V2_TEMP
            break;
          //ADD CLIENT TEMPLATE
          case 'prd3':
            bg_color = (rows[idx][colomuns['use']] == 'prd')? colors.PRD3_PRD : bg_color = colors.PRD3_PRE;
            break;
          //PRD2
          case 'prd2':
            bg_color = (rows[idx][colomuns['use']] == 'prd')? colors.PRD2_PRD : bg_color = colors.PRD2_PRE;
            break;
          //WLP
          case 'wlp':
            bg_color = (rows[idx][colomuns['use']] == 'prd')? colors.WLP_PRD : bg_color = colors.WLP_PRE;
            break;
          //STG
          case 'stg':
          case 'v2':
            bg_color = colors.V2_STG;
            break;
          //DEV
          case 'dev':
            bg_color = colors.V2_DEV;
            break;
          //STG
          default:
            bg_color = colors.DEFAULT;
            break;
        }
        break;
      ////////////////v1/////////////////
      case 'v1':
        switch (rows[idx][colomuns['zzz']]) {
          case 'v1':
            //V1-PRD
            if (rows[idx][colomuns['use']] == 'prd') {
              bg_color = colors.V1_PRD
            //V1-PRR
            } else if (rows[idx][colomuns['use']] == 'pre') {
              bg_color = colors.V1_PRE
            //V1-STG              
            } else if (rows[idx][colomuns['use']] == 'stg') {
              bg_color = colors.V1_STG
            }
            break;
          //V1-CCQA
          case'ccqa':
              bg_color = colors.V1_CCQA
          //V1-PRD
          case 'prd2':
              bg_color = colors.V1_PRD
            break;
          default:
            bg_color = colors.DEFAULT;
            break;
        }
        break;
      default:
        bg_color = colors.DEFAULT;
        break;
    }
    //Set background color
    sheet.getRange(`A${row_num}:${lastColA1}${row_num}`).setBackground(bg_color);
  }
}