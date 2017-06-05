// Check whether new version is installed
chrome.runtime.onInstalled.addListener(function (details) {
	if (details.reason == "install") {
		chrome.tabs.create({
			url: "newtab.html"
		});
	} else if (details.reason == "update") {
		var notification = new Notification('Snappy 每天放送', {
			icon: '/assets/snappy-icon-128.png',
			body: "Snappy 每天放送完成更新，點擊這裡查看更新日誌。",
		});

		notification.onclick = function () {
			window.open("https://github.com/collaction/snappy-chrome-new-tab");
			notification.close();
		};

		setTimeout(function () {
			notification.close();
		}, 5000);
	}
});
