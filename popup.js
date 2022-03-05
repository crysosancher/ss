console.log("I'm inserted nd i'm popup")
const desktopButton=document.getElementById("rec")
desktopButton.addEventListener('click',screenRec)
function screenRec(){
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		let screenRecReq={
			tabDetail:tabs,
			txt:"tabId",
			purpose:"ScreenRec"
		}
	chrome.runtime.sendMessage(screenRecReq)
});
}