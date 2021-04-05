function closeTab(tab) {
	chrome.tabs.remove(tab.id, function() { 
		if (chrome.runtime.lastError) {
	        console.log(chrome.runtime.lastError.message);
	    } else {
	        
	    }
	});
}

function insertURL(url) {
  getURLs(function(urls) {
      urls.push(url)
      setURLs(urls)
  })
}

function removeURL(url) {
  getURLs(function(urls) {
      var index = urls.indexOf(url);
      if (index > -1) {
          urls.splice(index, 1);
          setURLs(urls)
      }
  })
}

function getURLs(callback) {
  chrome.storage.sync.get({
        urls:[]
    }, function(result) {
      console.log(result.urls);
       callback(result.urls)
    }
  );  
}

function setURLs(urls) {
  chrome.storage.sync.set({
        urls: urls
    }, function(result) {
       console.log("added to list with new values");
    }
  );  
}
