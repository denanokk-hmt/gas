//シートをバックアップ
function the_backup(sheet, ns ,kind) {

  let book_id
  
  //backup用SPD
  switch (ns) {
    case 'scheme':
      book_id = '1BJWcEO9YcWPoygzi-ZfW-hFF7-vo9PbNXt_EulFcVXE'
      break
    case 'project_id':
      book_id = '1RzyjeTzyw6MJxfbnGKOtiDMpcRll10kh6meummMxyO8'
      break
    case 'common':
      book_id = '1WFOrGAg_o-8dml28Sqy2L8v9i-nFGL-KHu_wfC1molc'
      break
    case 'api_connect':
      book_id = '1Opa-5X1hHcthXjb7QAmTdGgUvZne5KQQPq1qhUXUkSI'
      break
    case 'env':
      book_id = '15Xm8tdzMKNYIfd-7uradE22skNHXI7vcqV17X2tDD1E'
      break
    case 'token':
      book_id = '169J6qcjE25DujM4PFkPzUEPaBdq-ET3d_AestozVoXw'
      break
    case 'env_client':
      book_id = '1SyTMR8ua604F9HnJBTB_nNaC2LnJb3tPAH-vCVX7kUI'
      break
    case 'tokens_client':
      book_id = '1c9EPP--vCMgO9QoFHElk7IVc9dRUOf9HshhnTMc4ZS8'
      break
    case 'spreadsheet':
      book_id = '1GDHNtjfO_8slpbe0ETY9mFjPsjTna3i8H2gM72BWYjM'
      break
  }

  const spreadsheet = SpreadsheetApp.openById(book_id)


  //date
  var dt = new Date();
  var year = dt.getFullYear();
  var month = dt.getMonth()+1;
  month = ('0' + month).slice(-2);  
  var date = dt.getDate();
  date = ('0' + date).slice(-2);
  var hh = dt.getHours();
  var mm = dt.getMinutes();
  var ss = dt.getSeconds();  
  
  //Backup Sheet
  const backup = sheet.copyTo(spreadsheet)
  backup.setName(`${kind}_${year}${month}${date}_${hh}${mm}${ss}`)

}