//1st check latest version from now Deploy version

//2nd must set deploy version befor new deploy version setting
const DEPLOY_VERSION = 55

//3rd must set script version & match to deploy version
//[key]:string
//[version]:Number
function setScriptPropertyVersion(key='asker_script_version', version=DEPLOY_VERSION) {
  PropertiesService.getScriptProperties().setProperty(key, Number(version).toFixed(0))
}

//Get Depoly version
function getDeployVersion() {
  return DEPLOY_VERSION
}

//Get property of script for ◯◯_script_version getting
function getScriptVersionFromProperty(key='asker_script_version') {
  const version = PropertiesService.getScriptProperties().getProperty(key)
  Logger.log(version)
  return version
}