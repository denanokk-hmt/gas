/////////////////////////////////////
// DELETE TRIGGERS ALL
/////////////////////////////////////
function delTriggers(func) {
  var triggers = ScriptApp.getProjectTriggers();
  for(var i=0; i < triggers.length; i++) {
    var trigger = triggers[i].getHandlerFunction()
    //console.log(trigger)
    if (trigger == func) {
      ScriptApp.deleteTrigger(triggers[i]);
    }
  }
}