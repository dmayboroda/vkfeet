function authorize() {
	"use strict";
	var params  = new Array();
	params['client_id'] 	= "5128489";
	params['redirect_uri'] 	= "https://oauth.vk.com/blank.html";
	params['display'] 		= "page";
	params['scope'] 		= "wall,friends,groups";
	params['response_type'] = "token";
	params['v'] 			= "5.37";
	var request = new Request("https://oauth.vk.com/authorize", params);

	chrome.storage.local.get({'vktoken':{}}, function(items) {
		if (items.vktoken.length === undefined) {
			chrome.tabs.create({url: request.create(), selected: true}, function(tab){
				chrome.tabs.onUpdated.addListener(authListener(tab.id));
			});
		}
	});
}

function authListener(authTabId) {
	"use strict";
	return function tabListener(tabId, tabInfo) {
		if (tabId === authTabId 
			&& tabInfo !== undefined 
			&& tabInfo.status === "loading") {
			if (tabInfo.url.indexOf('oauth.vk.com/blank.html') > -1) {
				authTabId = null;
				chrome.tabs.onUpdated.removeListener(tabListener);
				var token = getParamValue(tabInfo.url, 'access_token');
				if (token === undefined || token.length === undefined) {
					onError("unable to authorize", "please try later");
					return;
				}
				chrome.storage.local.set({'vktoken': token}, function(){
					chrome.tabs.remove(tabId);
				});
			}
		}
	}
}