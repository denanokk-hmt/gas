/////////////////////////////////////////////////////
//VALIDATIONS
/////////////////////////////////////////////////////
//
function validation_IsValue(row, data, prop_name) {
  if (!data) return row + prop_name + ' is empty';
}
//
function validation_DuplicateMessageNo(data) {
  if (!data.message_no) return
  if (data.no_buff.indexOf(data.message_no) != -1) return data.row + '[' + data.message_no + ']' + ' message_no is duplicated.'
}
//
function validation_SelectMessageType(data) {
  if (!data.message_type) return data.row + 'message_type is not select.'
}
//
function validation_isNecessaryColumn(row, chk_col, val_col) {
  if (chk_col != val_col) return row + chk_col + ' necessary_column is defined.'
}
//
function validation_compareColumnsValues(row, columns, values, lastValueOfRow) {
  //Compare columns & values validation
  //Without values[0]-->columns
  try {
    var errmsg = []
    for(let idx in values) {
      if (idx == 0) continue;
      if (Number(idx) > lastValueOfRow) break;
      let col_pos = Number(idx);
      let chk = String(values[idx])
      if (chk.match(/\r?\n/)) {
        val = values[idx].replace(/\r?\n/g, '|').split('|');
      } else {
        val = []
        val.push(val)    
      }
      //Compare col and val
      if (columns.length != val.length) {
        errmsg.push('value' + col_pos);
      }
    }
    if (errmsg.length > 0) {
      return row + errmsg.join(', ') + ' are not mach to colmuns.';
    }
  } catch(err) {
    let error = err
    Browser.msgBox(error);
  }
}
//
function validation_Format(data, def_col=[]) {
  var errmsg = []
  switch (data.message_type) {
    case 'text':
      //through
      break;
    case 'markdown':
      //through
      break;
    case 'telephone':
      errmsg.push(searchByRegExp(0, 'telephone', data.values[0].replace(/-/g, ''), '^0[0-9]{９,}'))
      break;
    case 'mail':
      errmsg.push(searchByRegExp(0, 'mailto', data.values[0], '^mailto:[\.|a-z/0-9]+@[a-z/0-9]+'))
      break;
    case 'image':
      errmsg.push(searchByRegExp(0, 'image', data.values[0], '^http[s]*://[\.|a-z|0-9]*.[a-z]{2,}'))
      break;
    case 'link_image_slider':
      for (let idx in data.values) {
        if (idx == 0) continue;
        if (Number(idx) > data.lastValueOfRow) break;
        let col_pos = Number(idx);
        let val = data.values[idx].replace(/\r?\n/g, '|').split('|');
        errmsg.push(searchByRegExp(idx, 'img_url', val[2], '^http[s]*://[\.|a-z|0-9]*.[a-z]{2,}'))
        errmsg.push(searchByRegExp(idx, 'link', val[3], '^http[s]*://[\.|a-z|0-9]*.[a-z]{2,}'))
      }
      break;
    case 'string_string_slider':
    case 'string_value_slider':
    case 'string_image_slider':
    case 'item_image_slider':
      for (let idx in data.values) {
        if (idx == 0) continue;
        if (Number(idx) > data.lastValueOfRow) break;
        let col_pos = Number(idx);
        let val = data.values[idx].replace(/\r?\n/g, '|').split('|');
        errmsg.push(searchByRegExp(idx, 'img_url', val[2], '^http[s]*://[\.|a-z|0-9]*.[a-z]{2,}'))
      }
      break;
    case 'req_login':
      let r_l_val = (/.*/).exec(data.values[1])
      errmsg.push(searchByRegExp(0, 'url', r_l_val[0], '^http[s]*://[\.|a-z|0-9]*.[a-z]{2,}'))
      break;
    case 'youtube_slider':
    case 'string_string_chip':
    case 'string_value_chip':
    case 'string_avatar_chip':      
    case 'list':
      break;
    case 'image_card':
        let col_pos = 1
        let val = data.values[1].replace(/\r?\n/g, '|').split('|');
        errmsg.push(searchByRegExp(1, 'img_url', val[0], '^http[s]*://[\.|a-z|0-9]*.[a-z]{2,}'))
        errmsg.push(searchByRegExp(1, 'link_url', val[2], '^http[s]*://[\.|a-z|0-9]*.[a-z]{2,}'))
      break;
  }
  
  //Delete empty arry.
  errmsg = errmsg.filter(Boolean)
  
  //Err msg join with comma
  if (errmsg.length > 0) {
    return data.row + errmsg.join(', ');
  }
}