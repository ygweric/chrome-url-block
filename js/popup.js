
localizeHtml();

function localizeHtml() {
  document.getElementById("switchTitle").innerText = chrome.i18n.getMessage("enable_url_block")
  document.getElementById("setting").innerText = chrome.i18n.getMessage("setting")
  document.getElementById("addCurrent").innerText = chrome.i18n.getMessage("block_current_domain")
}

setupCheckboxValue();

document.getElementById("checkbox").addEventListener("click", actionToggle);
document.getElementById("setting").addEventListener("click", showSettingView);
document.getElementById("addCurrent").addEventListener("click", addCurrentDomain);

function actionToggle() {
	let checkbox = document.getElementById("checkbox")
	if (checkbox.checked) {
		console.log(`actionToggle ${checkbox.checked}`)
	} else {
		console.log(`actionToggle ${checkbox.checked}`)
	}

	saveChanges(checkbox.checked)
}

function saveChanges(enable) {
	chrome.storage.sync.set({'enable': enable}, function() {
	  console.log('Settings saved');
	});
}

function setupCheckboxValue() {
	let checkbox = document.getElementById("checkbox")
	chrome.storage.sync.get('enable', function(result) {
	  console.log(`enable: ${result.enable}`);
	  checkbox.checked = result.enable
	});
}

function addCurrentDomain() {
	var query = { active: true, currentWindow: true };
	chrome.tabs.query(query, function callback(tabs) {
	  var currentTab = tabs[0];
	  var url = currentTab.url
	  console.log(url);
	  insertURL(url)
	  closeTab(currentTab)
	});
}

function showSettingView() {
	chrome.runtime.openOptionsPage()
}

