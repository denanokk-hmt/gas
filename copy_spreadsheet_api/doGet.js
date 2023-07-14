function tester_doGet() {
  const e =
  {
    "parameter": {
      "env" : "prd",
      "kind" : "answers",
      "client": "TEST",
      "series": "v2",
      "folderid": "1GLDy_v3EBs4jU7-O_jNz9BPBnFhptV8v",
    }
  };
  
  const out = doGet(e);
  Logger.log(out);
}

////////////////////////////
//Revieve request
//
function doGet(e) {
  
  try {

    //get parematers
    const env = e.parameter.env
    const kind = e.parameter.kind;
    const client = e.parameter.client;
    const series = e.parameter.series;
    const folderid = e.parameter.folderid;
    
    //validation   
    if (!env || !kind || !client || !series) {
      const params = {
        msg:'validation error. check parameters.'
      }
      return HtmlService.createHtmlOutput(params);
    }
    
    //template folder id --> production_00/hmt/templates  
    const templateFolderId = '1gaKYgxBFteXASczYrCO9XY62xnkXR9a5';
    
    //Get outout folder id
    let outputFolderId
    if (folderid) {
      outputFolderId = folderid
    } else {
      outputFolderId = getOutPutFolderId(env, kind)
    }  
    
    //Copy filename
    const tempFileName = `tmp_${kind}_${series}`
    const copyFileName = `${client}_${kind}_${series}`
    
    //Copy
    const result = copyTemplate(templateFolderId, outputFolderId, tempFileName, copyFileName)
    
    //Trim result for split 
    const response = `|||SPLIT|||GDRIVE_folderId:${result.folderId}|||SPLIT|||GDRIVE_fileId:${result.fileId}|||SPLIT|||${env}:${kind}:${client}:${series}|||SPLIT|||`
    
    //var params = JSON.stringify(e);
    return HtmlService.createHtmlOutput(response);
    
  } catch (err) {
    return err
  }
}