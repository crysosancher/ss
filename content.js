console.log("Ha bhai bol...mai he hoon content");
chrome.runtime.onMessage.addListener(streamGot);
function streamGot(message, sender, senderResponse) {
  console.log("HAve been clicked");
  if ((message.purpose = "stream")) {
    console.log("Mssg received sir");
    try{
      navigator.mediaDevices.getUserMedia(
        {
          audio: false,
          video: {
            mandatory: {
              chromeMediaSource: "desktop",
              chromeMediaSourceId: message.streamDetail,
            },
          },
        },
        startStream,
        failedStream
      );

    }catch(err){
      console.log("tum se na ho paayega")

    }
  
  }
}
function startStream(streamData) {//bolb data
	console.log("Receiving Data from User ....");
	let videoId = URL.createObjectURL(streamData); //decoding a binary stream to chrome extension url
	stream.onended = function () {
	  console.log("video recording session ended");
	};
      }
      function failedStream() {
	console.log("Something went wrong....better luck next time");
      }
      
