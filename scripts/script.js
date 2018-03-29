// Description:
// When you pass the bot an address or a place, it returns a map of that place.
//
// Dependencies:
//   None
//
// Configuration:
//   None
//
// Commands:
// address <query> will pass an address to the Mapbox Geocoding API, and return a centerpoint (lat/long). That centerpoint is then passed to the Static Map API, and a map is returned for that lat/long.

module.exports = function(robot) {

	robot.hear(/address (.*)/i, function(msg) {
		var text = msg.match[1];
		var accessToken = "TOKEN";
	if (!accessToken) {
	msg.send("Please enter your Mapbox access token in the environment variable accessToken.")
	}

		var geocodingUrl = "http://api.mapbox.com/geocoding/v5/mapbox.places/" + text + ".json?access_token=" + accessToken + "&language=en";

	msg.http(geocodingUrl).get()(function(err, res, body) {

		var response = JSON.parse(body);
		var center = response.features[0].center

		var mapUrl = "https://api.mapbox.com/styles/v1/mapbox/streets-v10/static/url-https%3A%2F%2Fmapbox.com%2Fimg%2Frocket.png(" + center[0] + "," + center[1] + ")/" + center[0] + "," + center[1] + ",15/1000x1000?access_token=" + accessToken;
	
	msg.http(mapUrl).get()(function(err, res, body) {

	return msg.send(mapUrl);
	});

});


});
}
