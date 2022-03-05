console.log("I'm background script");
let tab;
chrome.runtime.onMessage.addListener(ScreenRecMssg);
function ScreenRecMssg(message, sender, senderResponse) {
  if (message.purpose == "ScreenRec") {
    tab = message.tabDetail[0];
    console.log("I'm clicked nd working", tab);
    //
    chrome.desktopCapture.chooseDesktopMedia(
      ["screen", "window"],
      tab,
      content
    );
  }
}
function content(stream) {
  console.log("tabid =", tab.id);
  let contentShare = {
    tabDetail: tab.id,
    streamDetail: stream,
    txt: "tabId",
    purpose: "stream",
  };
  chrome.tabs.sendMessage(tab.id, contentShare);
}
function accesstoRec(id) {
  console.log("Sab theek hai", id);
  navigator.mediaDevices.getUserMedia(
    {
      audio: false,
      video: {
        mandatory: {
          chromeMediaSource: "desktop",
          chromeMediaSourceId: id,
        },
      },
    },
    startStream,
    failedStream
  );
}
function startStream(stream) {
  console.log("Receiving Data from User ....");
  let videoId = URL.createObjectURL(stream); //decoding a binary stream to chrome extension url
  stream.onended = function () {
    console.log("video recording session ended");
  };
}
function failedStream() {
  console.log("Something went wrong....better luck next time");
}
