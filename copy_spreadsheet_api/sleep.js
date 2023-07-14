function tester() {
  sleep(10000);
  return true
}
function sleep(waitMsec) {
  var startMsec = new Date();
  while (new Date() - startMsec < waitMsec);
}


