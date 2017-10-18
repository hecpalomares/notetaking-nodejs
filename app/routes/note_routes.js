var ObjectID = require('mongodb').ObjectID;

module.exports = function(app, db) {
	
	// Get a note by calling /notes/:id
	app.get('/notes/:id', (request, response) => {
		const id = request.params.id;
		// MongoDB requires a ObjectID not just a string from request.params.id
		const details = { '_id': new ObjectID(id) };
		db.collection('notes').findOne(details, (err, item) => {
			if(err) {
				response.send({'error': 'An error has occurred'});
			} else {
				response.send(item);
			}
		});
	});

	// Delete a note by calling /notes/:id
	app.delete('/notes/:id', (request, response) => {
    const id = request.params.id;
    const details = { '_id': new ObjectID(id) };
    db.collection('notes').remove(details, (err, item) => {
      if (err) {
        response.send({'error':'An error has occurred'});
      } else {
        response.send('Note ' + id + ' deleted!');
      } 
    });
  });

	// Push a note by calling /notes
	app.post('/notes', (request, response) => {
		const note = { text: request.body.body, title: request.body.title };
		db.collection('notes').insert(note, (err, result) => {
			if(err) {
				response.send({'error': 'An error has occurred'});
			} else {
				response.send(result.ops[0]);
			}
		});
	});

};