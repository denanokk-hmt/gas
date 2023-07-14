////////////////////////////
//Copy Template
//
function copyTemplate(templateFolderId, outputFolderId, tempFileName, copyFileName,hhh) {
  
  try {

    //Search template file id
    var templateFileId = searchFileId(templateFolderId, tempFileName);
    if(!templateFileId) return false
    
    //Set template file
    var templateFile = DriveApp.getFileById(templateFileId);
    
    //Set output folder
    var OutputFolder = DriveApp.getFolderById(outputFolderId);
    
    //Copy template
    templateFile.makeCopy(copyFileName, OutputFolder);
    
    sleep(5000)

    //Search copyfile id
    var copyFileId = searchFileId(outputFolderId, copyFileName);
    if(!copyFileId) copyFileId = 'failuer copy file.'
    
    return {
      folderId : outputFolderId,
      fileId : copyFileId,
    }
  } catch (err) {
    throw new Error(err)
  }
}