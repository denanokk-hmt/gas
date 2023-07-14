////////////////////////////
//Search file
//
function searchFileId(folderId, searchFilename) {
  try {
    
    //Get files 
    const files = DriveApp.getFolderById(folderId).getFiles()
    
    //Search
    var arr = []
    while(files.hasNext()){
      var file = files.next();
      arr.push([file.getName(),file.getId(),file.getUrl()]);
    }
    
    //check
    var searchFileId
    for (let idx in arr) {
      if (arr[idx][0] == searchFilename) {
        searchFileId = arr[idx][1]
        break;
      }
      continue;
    }

    if(!searchFileId) return false;
  
    return searchFileId;
    
  } catch (err) {
    throw new Error(err)
  }  
}
