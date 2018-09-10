// 
"use strict";
// Thingspeak client instance
//

var ThingSpeakClient = require('thingspeakclient');
var client = new ThingSpeakClient();

// Request instance
//
var request = require('request');

// Express instance
//
var express = require('express');
var app = express();

// MongoDB instance
var MongoClient = require('mongodb').MongoClient;


// API key
//
var userApiKey = 'ZJJX11KQ0VD2VYUY';
var channelId = 'ZJJX11KQ0VD2VYUY';
var channelKey = 'ZJJX11KQ0VD2VYUY';
//function getChannelData(channelId, channelKey) {

// API url
//
var url = 'https://api.thingspeak.com/';

module.exports = () => {

	const api = new Router();

	api.get("/", async (req, res) => {

		console.log("Adquirindo dados");
		res.json((await DemoService.getSomething()));

		client.getChannelFeeds(channelId, { api_key: channelKey }, function (err, resp) {
			if (!err && resp > 0) console.log(resp);else console.log('error');
		});
	});
	return api;
};