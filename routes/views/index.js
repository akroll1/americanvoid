var keystone = require('keystone'),
		async = require('async');

exports = module.exports = function(req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'home';
	locals.data = {
		artilces: []
	}

	view.on('init', function(next){
		keystone.list('Post').model.find()
			.where('state', 'published')
	    .populate('author')
	    .sort('-publishedDate')
	    .limit(6)
	    .exec(function(err, posts) {
				if (err){
					return 'Here is err ', err;
				}
				locals.data.articles = posts;
				console.log('here is locals.data.articles.length ', locals.data.articles.length);
				next(err);
    	});
	});

	// Render the view
	view.render('index');

};
