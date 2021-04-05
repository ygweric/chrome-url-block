
chrome.tabs && chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
	// console.log(">>>>> chrome.tabs.onUpdated.addListener url: " + changeInfo.url );

	chrome.storage.sync.get(['enable', 'urls'], function (result) {
		if (result.enable) {
			var urls = result.urls
			for (var i = 0; i < urls.length; ++i) {
				var url = urls[i];
				if (tab.url.match(url) != null) {
					closeTab(tab)
					return
				}
			}
		}
	});
});
