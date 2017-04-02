// Check whether new version is installed
chrome.runtime.onInstalled.addListener(function (details) {
	if (details.reason == "install") {
		chrome.tabs.create({
			url: "newtab.html"
		});
	} else if (details.reason == "update") {

	}
});
