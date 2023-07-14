function tester() {
  //var book_id = SpreadsheetApp.getActiveSpreadsheet().getId();
  var book_id = '1GubvyR5PMDq8CUEixJiMwTBirkZniqwt1Ac16MT4K5E';
  var result = validationFeeder(book_id, 'response')
  return result
}


/////////////////////////////////////////////////////
//DATA FEED
/////////////////////////////////////////////////////
function validationFeeder(book_id, sheet_name) {
  
  //For Set settings book, sheet
  const settings_sheet_id = book_id
  const spreadsheet = SpreadsheetApp.openById(settings_sheet_id)
  const sheet = spreadsheet.getSheetByName(sheet_name)
  
  //Get Last position
  const lastRow = sheet.getLastRow() - 1
  const lastCol = sheet.getLastColumn()
  
  //Get response data all
  var data = sheet.getRange(1, 1, lastRow, lastCol).getValues()

  //Valiadtion
  var results = []
  var no_buff = []

  const header_row = data.shift()
  const additional_header_index = header_row.indexOf("eventlog")

  for (let r in data) {
    let data_slice
    if (additional_header_index > 0) {
      data_slice = data[r].slice(0, additional_header_index);
    } else {
      data_slice = data[r];
    }
    let row = 'Row:' + (Number(r) + 2) + ' ';
    let [message_no, message_type, message, ...values] = data_slice
    let valid_data = {
      row: row,
      message_no: message_no,
      message_type: message_type,
      message: message.replace(/\r?\n/g, '\\n'),
      values: values,
      no_buff: no_buff,
    } 
    results.push(validationSwithcer(valid_data));
    no_buff.push(message_no); //message_no buffuering
  }
  
  Logger.log(results)
  
  //Select err log
  const errlog = []
  for (let idx of results) {
    if (idx.length) errlog.push(idx)    
  }
  
  return errlog
}
/////////////////////////////////////////////////////
//DATA SWITCHER
/////////////////////////////////////////////////////
function validationSwithcer(data) {

  var errmsg = []
  
  //Common validations
  errmsg.push(validation_IsValue(data.row, data.message_no, 'message_no'))
  errmsg.push(validation_DuplicateMessageNo(data))
  errmsg.push(validation_SelectMessageType(data))
  
  //Get last value of the row 
  var lastValueOfRow
  for(let i = data.values.length-1; i > 0; i--) {
    if (data.values[i]) {
      lastValueOfRow = i;
      break;
    }
  }  

  //Switching validation by type
  let def_col, chk_col = []
  let columns
  switch (data.message_type) {
    case 'text':
      errmsg.push(validation_IsValue(data.row, data.message, 'massage'));
      break;
    case 'markdown':
      errmsg.push(validation_IsValue(data.row, data.message, 'massage'));
      errmsg.push(validation_IsValue(data.row, data.values[0], 'value0 (convert_value)'));
      errmsg.push(validation_IsValue(data.row, data.values[1], 'value1 (converted_value)'));
      break;
    case 'telephone':
      errmsg.push(validation_IsValue(data.row, data.message, 'massage'));
      errmsg.push(validation_IsValue(data.row, data.values[0], 'value0 (teplephone no)'));
      break;
    case 'mail':
      errmsg.push(validation_IsValue(data.row, data.message, 'massage'));
      errmsg.push(validation_IsValue(data.row, data.values[0], 'value0 (mailto)'));
      break;
    case 'image':
      errmsg.push(validation_IsValue(data.row, data.values[0], 'value0 (img_url)'));
      errmsg.push(validation_IsValue(data.row, data.values[1], 'value1 (alt)'));
      break;
    case 'link_image_slider':
    case 'string_string_slider':
    case 'string_value_slider':
    case 'string_image_slider':
    case 'item_image_slider':
    case 'string_string_chip':
    case 'string_value_chip':
    case 'string_avatar_chip':      
    case 'list':
    case 'youtube_slider':
    case 'req_login':
      //Set default columns
      switch (data.message_type) {
        case 'link_image_slider':
          def_col = ['item_name', 'item_value', 'link', 'img_url', 'alt'];
          break;
        case 'string_string_slider':
        case 'string_value_slider':
        case 'string_image_slider':
        case 'item_image_slider':
          def_col = ['item_name', 'item_value', 'img_url', 'alt'];
          break;
        case 'string_string_chip':
        case 'string_value_chip':
        case 'string_avatar_chip':      
        case 'list':
          def_col = ['item_name', 'item_value'];
          break;
        case 'youtube_slider':
          def_col = ['item_name', 'item_value', 'youtube_id', 'alt'];
          break;
        case 'req_login':
          def_col = ['url']
          break;
      }
      errmsg.push(validation_IsValue(data.row, data.values[0], 'columns'));
      columns = data.values[0].replace(/\r?\n/g, '|').split('|');
      for (let idx in def_col) {
        errmsg.push(validation_isNecessaryColumn(data.row, def_col[idx], columns[idx]));
      }    
      errmsg.push(validation_compareColumnsValues(data.row, columns, data.values, lastValueOfRow));
      data.lastValueOfRow = lastValueOfRow
      errmsg.push(validation_Format(data, def_col));   
      break;
    case 'image_card':
      errmsg.push(validation_IsValue(data.row, data.message, 'massage'));
      errmsg.push(validation_IsValue(data.row, data.values[0], 'columns'));
      errmsg.push(validation_IsValue(data.row, data.values[2], 'value2 (card explain)'));      
      def_col = ['img_url', 'link_label', 'link_url'];   
      columns = data.values[0].replace(/\r?\n/g, '|').split('|');
      for (let idx in def_col) {
        errmsg.push(validation_isNecessaryColumn(data.row, def_col[idx], columns[idx]));
      }
      errmsg.push(validation_compareColumnsValues(data.row, columns, [data.values[1]], lastValueOfRow));
      errmsg.push(validation_Format(data, def_col));
      break;
  }

  //Select err log
  const errlog = []
  for (let idx of errmsg) {
    if (idx) errlog.push(idx)    
  }
  return (errlog)? errlog : null
}