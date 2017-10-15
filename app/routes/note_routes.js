module.exports = function(app, db) {
	app.post('/notes', (request, response) => {
		console.log(request.body)
		response.send('Hello')
	});
};