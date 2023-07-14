/*
function tester() {
  //const kind = 'formation'
  const kind = 'server_code-cluster'
  //const kind = 'server_code-server_domain'
  const book_id = SpreadsheetApp.getActive().getId();
  const spreadsheet = SpreadsheetApp.openById(book_id)
  const sheet = spreadsheet.getSheetByName(kind)
  controltowerscript.the_sort(sheet, ns, kind)
}*/

////////////////////////
//
function the_sort(sheet, ns, kind) {

  const lastRow = sheet.getLastRow();
  const lastCol = sheet.getLastColumn();
  
  //Get the last
  const lastColA1 = sheet.getRange(1, lastCol).getA1Notation().replace(/\d/,'');
  const header = sheet.getRange(2, 1, 1, lastCol).getValues()

  //Get colomun position in sheet
  let colomuns = {}
  for (let idx in header[0]) {
    console.log()
    colomuns[header[0][idx]] = (Number(idx) + 1)
  }

  //Sort
  switch (kind) {
    //scheme
    case 'formation':
      sheet.getRange(3, 1, lastRow, lastCol).sort([
        {column: colomuns['series'], ascending: false},
        {column: colomuns['zzz'], ascending: false},
        {column: colomuns['boarding'], ascending: false},
        {column: colomuns['use'], ascending: true},
        {column: colomuns['region'], ascending: true},
        {column: colomuns['client'], ascending: true}
      ]);
      break; 
      
    //scheme
    case 'server_code-cluster':
    case 'server_code-server_domain':

    //project_id
    case 'server_code-project_id':
      sheet.getRange(3, 1, lastRow, lastCol).sort([
        {column: colomuns['series'], ascending: false},
        {column: colomuns['zzz'], ascending: false},
        {column: colomuns['use'], ascending: true},
        {column: colomuns['server_code'], ascending: false},
      ]);
      break;

    //api_connect
    case 'state-client-api_routine':
    case 'server_code-operator':
      sheet.getRange(3, 1, lastRow, lastCol).sort([
        {column: colomuns['series'], ascending: false},
        {column: colomuns['zzz'], ascending: false},
        {column: colomuns['use'], ascending: true},
        {column: colomuns['server_code'], ascending: false},
        {column: colomuns['client'], ascending: true}
      ]);
      break;
    case 'server_code-state':

    //env, env_client(newest, p1 -->below)
    case 'boarding':
    case 'keel':
    case 'asker':
    case 'cabin':
    case 'cargo':
    case 'transit':
    case 'catwalk':
      if (ns == 'env') {
        sheet.getRange(3, 1, lastRow, lastCol).sort([
          {column: colomuns['series'], ascending: false},
          {column: colomuns['zzz'], ascending: false},
          {column: colomuns['use'], ascending: true},
          {column: colomuns['server_code'], ascending: false},        
        ]);
      } else {
        sheet.getRange(3, 1, lastRow, lastCol).sort([
          {column: colomuns['series'], ascending: false},
          {column: colomuns['zzz'], ascending: false},
          {column: colomuns['use'], ascending: true},
          {column: colomuns['server_code'], ascending: false},
          {column: colomuns['client'], ascending: true}
        ]);
      }
      break;
    //token
    case 'anonymous':
    case 'keel_auth':
      sheet.getRange(3, 1, lastRow, lastCol).sort([
        {column: colomuns['series'], ascending: false},
        {column: colomuns['zzz'], ascending: false},
        {column: colomuns['use'], ascending: true},
        {column: colomuns['server_code'], ascending: false},
      ]);
      break;
      
    //common
    case 'version':
      sheet.getRange(3, 1, lastRow, lastCol).sort([
        {column: colomuns['series'], ascending: false},
        {column: colomuns['version'], ascending: false},
        {column: colomuns['use'], ascending: true},
        {column: colomuns['server_code'], ascending: false},
      ]);
      break;
    //common
    case 'status':
      sheet.getRange(3, 1, lastRow, lastCol).sort([
        {column: colomuns['value'], ascending: true},
      ]); 
      break;
      
    //api_connect
    case 'state-module':
      sheet.getRange(3, 1, lastRow, lastCol).sort([
        {column: colomuns['state'], ascending: true},
      ]);
      break;
    //api_connect      
    case 'client-google_translate':    
      sheet.getRange(3, 1, lastRow, lastCol).sort([
        {column: colomuns['use'], ascending: true},
        {column: colomuns['region'], ascending: true},
        {column: colomuns['client'], ascending: true}
      ]);
      break;

    //tokens_client
    case 'tokens':    
      sheet.getRange(3, 1, lastRow, lastCol).sort([
        {column: colomuns['series'], ascending: false},
        {column: colomuns['zzz'], ascending: false},
        {column: colomuns['use'], ascending: true},
        {column: colomuns['region'], ascending: true},
        {column: colomuns['client'], ascending: true}
      ]);
      break;      

    //spreadsheet
    case 'asker_config':
    case 'asker_response':
      sheet.getRange(3, 1, lastRow, lastCol).sort([
        {column: colomuns['series'], ascending: false},
        {column: colomuns['zzz'], ascending: false},
        {column: colomuns['use'], ascending: true},
        {column: colomuns['client'], ascending: true},
      ]);
      break;

    //【newest, p1】 env, env_client, spreadsheet
    case 'newest':
    case 'p1':
      if (ns == 'env' || ns == 'env_client') {
        sheet.getRange(3, 1, lastRow, lastCol).sort([
          {column: colomuns['series'], ascending: false},
          {column: colomuns['zzz'], ascending: false},
          {column: colomuns['use'], ascending: true},
          {column: colomuns['server_code'], ascending: false},
        ]);
        break;      
      } else if (ns == 'spreadsheet' && kind == 'newest') {
        sheet.getRange(3, 1, lastRow, lastCol).sort([
          {column: colomuns['series'], ascending: false},
          {column: colomuns['zzz'], ascending: false},
          {column: colomuns['use'], ascending: true},
          {column: colomuns['client'], ascending: true},
        ]);
        break;
      } else if (ns == 'spreadsheet' && kind == 'p1') {
        sheet.getRange(3, 1, lastRow, lastCol).sort([
          {column: colomuns['series'], ascending: false},
          {column: colomuns['use'], ascending: true},
          {column: colomuns['client'], ascending: true},
        ]);
        break;      
      }
      
    default:

  }
 
  return true
}