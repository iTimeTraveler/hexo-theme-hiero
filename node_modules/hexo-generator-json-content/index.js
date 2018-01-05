var util = require('hexo-util'),
	keywords = require('keyword-extractor');

hexo.extend.generator.register('json-content', hexo_generator_json_content);

function hexo_generator_json_content(site) {
	var cfg = hexo.config.hasOwnProperty('jsonContent') ? hexo.config.jsonContent : {
			meta: true
		},

		ignore = cfg.ignore ? cfg.ignore.map(function(item) {
			return item.toLowerCase();
		}) : [],

		minify = function(str) {
			return util.stripHTML(str).trim().replace(/\n/g, ' ').replace(/\s+/g, ' ');
		},

		getKeywords = function(str) {
			return keywords.extract(str, {
				language: cfg.keywords,
				remove_digits: true,
				return_changed_case: true,
				remove_duplicates: true
			}).join(' ');
		},

		pages = cfg.hasOwnProperty('pages') ? cfg.pages : {
			raw: false,
			content: false,
			title: true,
			slug: true,
			date: true,
			updated: true,
			comments: true,
			path: true,
			link: true,
			permalink: true,
			excerpt: true,
			text: true,
			keywords: true
		},

		posts = cfg.hasOwnProperty('posts') ? cfg.posts : {
			raw: false,
			content: false,
			title: true,
			slug: true,
			date: true,
			updated: true,
			comments: true,
			path: true,
			link: true,
			permalink: true,
			excerpt: true,
			text: true,
			categories: true,
			tags: true,
			keywords: true
		},

		json = cfg.meta ? {
			meta: {
				title: hexo.config.title,
				subtitle: hexo.config.subtitle,
				description: hexo.config.description,
				author: hexo.config.author,
				url: hexo.config.url,
			}
		} : {};

	if (pages) {
		var pagesPropertyNames = Object.getOwnPropertyNames(pages).filter(function(item) {
				return pages[item];
			}),
			pagesContent = site.pages.filter(function(page) {
				var path = page.path.toLowerCase(),
					igno = ignore.find(function(item) {
						return path.includes(item);
					});
				return !igno;
			}).map(function(page) {
				var actualPage = {};

				pagesPropertyNames.forEach(function(item) {
					switch (item) {
						case 'excerpt':
							return actualPage[item] = minify(page.excerpt);

						case 'text':
							return actualPage[item] = minify(page.content);

						case 'keywords':
							if (cfg.keywords)
								return actualPage[item] = getKeywords(minify(page.excerpt));

						default:
							return actualPage[item] = page[item];
					}
				});

				return actualPage;
			});

		if (posts || cfg.meta)
			json.pages = pagesContent;
		else
			json = pagesContent;
	}

	if (posts) {
		var postsPropertyNames = Object.getOwnPropertyNames(posts).filter(function(item) {
				return posts[item];
			}),
			catags = function(item) {
				return {
					name: item.name,
					slug: item.slug,
					permalink: item.permalink
				};
			},
			postsContent = site.posts.sort('-date').filter(function(post) {
				return post.published;
			}).filter(function(post) {
				var path = post.path.toLowerCase(),
					igno = ignore.find(function(item) {
						return path.includes(item);
					});
				return !igno;
			}).map(function(post) {
				var actualPost = {};

				postsPropertyNames.forEach(function(item) {
					switch (item) {
						case 'excerpt':
							return actualPost[item] = minify(post.excerpt);

						case 'text':
							return actualPost[item] = minify(post.content);

						case 'keywords':
							if (cfg.keywords)
								return actualPost[item] = getKeywords(minify(post.excerpt));

						case 'categories':
							return actualPost[item] = post.categories.map(catags);

						case 'tags':
							return actualPost[item] = post.tags.map(catags);

						default:
							return actualPost[item] = post[item];
					}
				});

				return actualPost;
			});

		if (pages || cfg.meta)
			json.posts = postsContent;
		else
			json = postsContent;
	}

	return {
		path: 'content.json',
		data: JSON.stringify(json)
	};
}
