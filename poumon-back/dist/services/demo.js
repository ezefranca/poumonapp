// 
"use strict";

const request = require('request');

class DemoService {

	static getSomething() {

		return { "text": "GET: it works!" };
	}

	static postSomething() {

		return { "text": "POST: it works!" };
	}

	static putSomething() {

		return { "text": "PUT: it works!" };
	}

	static deleteSomething() {

		return { "text": "DELETE: it works!" };
	}

	static dataFromThingSpeak() {

		var options = {
			url: 'https://api.thingspeak.com/channels/243585/feeds.json?api_key=Y4XNG4UWQ82ODKNE&results=2'
		};

		function callback(error, response, body) {
			if (!error && response.statusCode == 200) {
				console.log(body);
				return body;
			}
		}
		request(options, callback);
	}

}

module.exports = DemoService;