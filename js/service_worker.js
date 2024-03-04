function closeTab(tab) {
	chrome.tabs.remove(tab.id, function() { 
		if (chrome.runtime.lastError) {
	        console.log(chrome.runtime.lastError.message);
	    } else {
	        
	    }
	});
}


function getDomainFromString(inputString) {
    // Regular expression to match domain-like patterns
    const domainRegex = /(?:https?:\/\/)?(?:www\.)?([a-zA-Z0-9-]+(?:\.[a-zA-Z]+)+)/g;

    // Match domain-like patterns in the input string
    const matches = inputString.match(domainRegex);

    // Extract domain from each match
    const domains = matches.map(match => {
        // Remove protocol and "www." prefix
        return match.replace(/^(?:https?:\/\/)?(?:www\.)?/, '');
    });

    return domains;
}


chrome.tabs && chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
	console.log(">>>>> chrome.tabs.onUpdated.addListener url: " + changeInfo.url );

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
