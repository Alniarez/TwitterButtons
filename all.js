(function () {  
  var processedLists = new WeakMap();
  
  var createOpenButton = function (list) {
    var images = list.parentNode.parentNode.getElementsByClassName('AdaptiveMedia-photoContainer');
    var button = document.createElement('div');
    button.setAttribute('class', 'ProfileTweet-action js-toggleState ProfileTweet-action--ExtractImages');
    button.innerHTML = '<button class="ProfileTweet-actionButton js-actionButton" type="button">'+
    '<div class="IconContainer js-tooltip" title="Extract Images">'+
    '<span class="Icon Icon--photo"></span>'+
    '</div>'+
    '</button>';
    button.addEventListener('click', function () {
      for (var j = 0; j < images.length; j++) {
        var url = images[j].getAttribute('data-image-url') + ':orig';
        window.open(url);
      }
    });
    button.addEventListener('mouseenter',function(){
      if(images.length<1){
        return;
      }
      var icon = button.getElementsByClassName("Icon")[0];
      icon.style.color = "rgb(47,194,239)";
    })
    button.addEventListener('mouseleave',function(){
      var icon = button.getElementsByClassName("Icon")[0];
      icon.style.color = "rgb(170,184,194)";
    })
    return button;
  };
  
	// Download a file form a url.
	function saveFile(url) {
	  // Get file name from url.
	  var filename = url.substring(url.lastIndexOf("/") + 1).split("?")[0];
	  var xhr = new XMLHttpRequest();
	  xhr.responseType = 'blob';
	  xhr.onload = function() {
		var a = document.createElement('a');
		a.href = window.URL.createObjectURL(xhr.response); // xhr.response is a blob
		a.download = filename; // Set the file name.
		a.style.display = 'none';
		document.body.appendChild(a);
		a.click();
		delete a;
	  };
	  xhr.open('GET', url);
	  xhr.send();
	}
  
  var createDownloadButton = function (list) {
    var images = list.parentNode.parentNode.getElementsByClassName('AdaptiveMedia-photoContainer');
    var button = document.createElement('div');
    button.setAttribute('class', 'ProfileTweet-action js-toggleState ProfileTweet-action--ExtractImages');
    button.innerHTML = '<button class="ProfileTweet-actionButton js-actionButton" type="button">'+
    '<div class="IconContainer js-tooltip" title="Download Images">'+
    '<span class="Icon Icon--download"></span>'+
    '</div>'+
    '</button>';
	
    button.addEventListener('click', function () {
      for (var j = 0; j < images.length; j++) {
        var url = images[j].getAttribute('data-image-url') + ':orig';
		saveFile(url);
      }
    });
    button.addEventListener('mouseenter',function(){
      if(images.length<1){
        return;
      }
      var icon = button.getElementsByClassName("Icon")[0];
      icon.style.color = "rgb(47,194,239)";
    })
    button.addEventListener('mouseleave',function(){
      var icon = button.getElementsByClassName("Icon")[0];
      icon.style.color = "rgb(170,184,194)";
    })
    return button;
  };
  
  var addButtons = function () {
    var lists = document.getElementsByClassName('ProfileTweet-actionList');
    for (var i = 0; i < lists.length; i++) {
      var list = lists[i];
      if (processedLists.has(list)) {
        continue;
      } else {
        var oldButton = list.getElementsByClassName("ProfileTweet-action--ExtractImages")[0];
        if(oldButton){
          oldButton.parentNode.removeChild(oldButton);
        }
        processedLists.set(list, 1);
        var button = createOpenButton(list);
        list.appendChild(button);
		button = createDownloadButton(list);
        list.appendChild(button);
      }
    }
  };
  
  (function () {
    var DOMObserverTimer = false;
    var DOMObserverConfig = {
      attributes: true,
      childList: true,
      subtree: true
    };
    var DOMObserver = new MutationObserver(function () {
      if (DOMObserverTimer !== 'false') {
        clearTimeout(DOMObserverTimer);
      }
      DOMObserverTimer = setTimeout(function () {
        DOMObserver.disconnect();
        addButtons();
        DOMObserver.observe(document.body, DOMObserverConfig);
      }, 100);
    });
    DOMObserver.observe(document.body, DOMObserverConfig);
  }) ();
  
  addButtons();
}) ();
