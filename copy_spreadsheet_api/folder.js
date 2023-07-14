function tester_getOutPutFolderId() {
  const env = 'stg'
  const kind = 'answers'
  var out = getOutPutFolderId(env, kind)
  Logger.log(out);
}


////////////////////////////
//Get folder
//
function getOutPutFolderId(env, kind) {
  
  try {
    
    //output 【Parent】 folder id
    var outPutParentFolderId
    if (env == 'prd') {
      if (kind == 'answers' || kind == 'response') {
        //::production_03/hmt/asker
        outPutParentFolderId = '1xSiHNcTYdtQZ8__zvGvUTH5svS2363N-';
      } else if (kind == 'newest') {
        //::production_03/WhatYa
        outPutParentFolderId = '1-d6Zla1W3o-1gxPFFrULWzrAbRmkiUQO';
      }
    } else {
      if (kind == 'answers' || kind == 'response') {
        //::stg-dev_03/hmt/asker
        outPutParentFolderId = '1fqSSdl56TkGXpzds7QzcT53sapsjDBh2';
      } else if (kind == 'newest') {
        //::stg-dev_03/hmt/newest
        outPutParentFolderId = '1CeJ4zGBKX8ooW-VegtyZUkWyYR4eFzJ3';
      }
    }
    
    //Get folders
    var target = DriveApp.getFolderById(outPutParentFolderId);
    var folders = target.getFolders();
    var arr = []
    while (folders.hasNext()) {
      var folder = folders.next();
      arr.push([folder.getName(),folder.getId(),folder.getUrl()]);
    }
    
    //search same name output folder compaire the kind 
    var outPutfolderId
    for (let idx in arr) {
      if (arr[idx][0] == kind) {
        outPutfolderId = arr[idx][1]
        break;
      }
      continue;
    }
    if(!outPutfolderId) {
      throw new Error(`cloud not get folder ${outPutParentFolderId}`)
    } else {
      return outPutfolderId
    }

  } catch (err) {
    throw new Error(err)
  }
}