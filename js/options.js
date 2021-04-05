
localizeHtml();

function localizeHtml() {
  document.getElementById("pageTitle").innerText = chrome.i18n.getMessage("appName")
  document.getElementById("headerTitle").innerText = chrome.i18n.getMessage("blocked_url_list")
  document.getElementById("urlInput").placeholder = chrome.i18n.getMessage("input_url")
  document.getElementById("addButton").innerText = chrome.i18n.getMessage("add")
  // document.getElementById("author").innerText = chrome.i18n.getMessage("author") + "Eric Yang"
}

var myNodelist = document.getElementsByTagName("LI");
var i;
for (i = 0; i < myNodelist.length; i++) {
  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  myNodelist[i].appendChild(span);
}

var close = document.getElementsByClassName("close");
var i;
for (i = 0; i < close.length; i++) {
  close[i].onclick = function () {
    var li = this.parentElement;
    var innerText = li.innerText
    var url = innerText.substring(0, innerText.length - 1);
    removeURL(url)
  }
}

document.getElementById("addButton").addEventListener("click", addElement);

function addElement() {
  var inputValue = document.getElementById("urlInput").value;
  if (inputValue === '') {
    alert(chrome.i18n.getMessage("you_must_write_sth"));
    return
  }

  addElementWith(inputValue)
  insertURL(inputValue)
}

function addElementWith(inputValue) {
  var li = document.createElement("li");
  var t = document.createTextNode(inputValue);
  li.appendChild(t);
  document.getElementById("urlUL").appendChild(li);
  document.getElementById("urlInput").value = "";

  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  li.appendChild(span);

  for (i = 0; i < close.length; i++) {
    close[i].onclick = function () {
      var li = this.parentElement;
      li.style.display = "none";
      var innerText = li.innerText
      var url = innerText.substring(0, innerText.length - 1);
      removeURL(url)
    }
  }
}

setupListView()

function setupListView() {
  getURLs(function (urls) {
    console.log(urls);
    updateListView(urls)
  })
}

function updateListView(urls) {
  for (var i = 0; i < urls.length; ++i) {
    var url = urls[i];
    addElementWith(url)
  }
}


console.log(window.navigator.language)