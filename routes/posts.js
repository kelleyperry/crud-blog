var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var timestamps = require('mongoose-timestamps');

var postSchema = mongoose.Schema({
	title: String,
	author: String,
	content: String
});

postSchema.plugin(timestamps);

var Post = mongoose.model('Post', postSchema);

router.get('/posts', function(req, res, next) {
	Post.find({})
		// .select({
		// 	content: 0,
		// 	__v: 0,
		// 	updatedAt: 0,
		// 	createdAt: 0
		// })
		.limit(100)
		.sort({
			createdAt: -1
		})
		.exec(function(err, posts) {
			if (err) {
				console.log(err);
				return res.status(500).json({
					message: 'Could not retrieve posts'
				});
			}
			res.json(posts);
		});
});

module.exports = router;
