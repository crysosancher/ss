console.log("Ha bhai bol...mai he hoon content");
chrome.runtime.onMessage.addListener(streamGot);
async function streamGot(message, sender, senderResponse) {
  console.log("HAve been clicked");
  if ((message.purpose = "stream")) {
    console.log("Mssg received sir");
    try {
      //       await navigator.mediaDevices.getUserMedia(
      //         {
      //           audio: false,
      //           video: {
      //             mandatory: {
      //               chromeMediaSource: "desktop",
      //               chromeMediaSourceId: message.streamDetail,
      //             },
      //           },
      //         },
      //         startStream,
      //         failedStream
      //       );

      //     }catch(err){
      //       console.log("tum se na ho paayega")

      //     }

      //   }
      // }
      // function startStream(streamData) {//bolb data
      // 	console.log("Receiving Data from User ....");
      // 	let videoId = URL.createObjectURL(streamData); //decoding a binary stream to chrome extension url
      // 	stream.onended = function () {
      // 	  console.log("video recording session ended");
      // 	};
      //       }
      //       function failedStream() {
      // 	console.log("Something went wrong....better luck next time");
      //       }
      const media = await navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
          mandatory: {
            chromeMediaSource: "desktop",
            chromeMediaSourceId: message.streamDetail,
          },
        },
      });
      console.log(media);
      startStream(media);
    } catch (err) {
      console.log(err);
      failedStream();
      console.log("tum se na ho paayega");
    }
  }
}
function startStream(streamData) {
  //bolb data
  console.log("Receiving Data from User ....");
  // record the stream
  const recorder = new MediaRecorder(streamData);
  recorder.start();
  console.log("Recording Started");
  // connect the stream to the gain node

//   recorder.ondataavailable = function (e) {
//     console.log("video recording session ended");



//     let videoId = URL.createObjectURL(e.data); //decoding a binary stream to chrome extension url
//     console.log(videoId);
//   };
// }
recorder.ondataavailable = function (e) {
  console.log("video recording session ended");

  // download the recorded blob
  const blob = new Blob([e.data], { type: "video/webm" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.style.display = "none";
  a.href = url;
  a.download = "recorded.webm";
  document.body.appendChild(a);
  a.click();
  setTimeout(function () {
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }, 100);


}
}
function failedStream() {
  console.log("Something went wrong....better luck next time");
}
