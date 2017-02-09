'use strict';

/**
* hierarchicalCategoryList helper
*
* returns a list of categories sorted in alphabetical order of category names.
* each category name is in parent-category > child-category > child-child-category > ... format, thus hierarchical.
*
* Syntax Example (Loop through hierarchical category list, print out category name and posts under the category):
*
*   <% hierarchicalCategoryList().map(function(category) { %>
*       <h1><%= category.name %></h1>
*       <% category.posts.map(function(post) { %>
*          <p><%= post.title %></p>
*       <% }) %>
*   <% }) %>
*
*/

function hierarchicalCategoryListHelper(categories, options) {
    if (!options && !categories) {
        categories = this.site.categories;
    }

    if (!categories || !categories.length) return '';

    options = options || {};

    var depth = options.depth ? parseInt(options.depth, 10) : 0; // levels of categories to be displayed.
    var separator = options.hasOwnProperty('separator') ? options.separator : ' > '; // separator between categories

    function HierarchicalCategory(name, posts) {
        var self = this;
        this.name = name;
        this.posts = posts.filter(function(post) {
            return post.categories.map(function(cat) {return cat.name}).join(separator) === self.name;
        });
    }

    function prepareQuery(parentId) {
        var query = {};

        if (parentId) {
            query.parent = parentId;
        } else {
            query.parent = {$exists: false};
        }

        return categories.find(query).filter(function(cat) {
            return cat.length;
        });
    }

    function createHierarchicalCategoryList(level, parentId) {
        var list = [];
        prepareQuery(parentId).forEach(function(parent, i) {
            if (!depth || level + 1 < depth) {
                var childCategoryList = createHierarchicalCategoryList(level + 1, parent._id);
                childCategoryList.forEach(function(child) {
                    list.push(new HierarchicalCategory(parent.name + separator + child.name, parent.posts));
                })
            }
            list.push(new HierarchicalCategory(parent.name, parent.posts));
        });
        return list;
    }

    var categoryList = createHierarchicalCategoryList(0);

    // remove zero post categories
    categoryList = categoryList.filter(function(cat) {
        return cat.posts.length;
    });

    // sort alphabetically
    var sortedCategoryList = categoryList.sort(function(a, b) {return a.name > b.name;});

    return sortedCategoryList;
}

hexo.extend.helper.register('hierarchicalCategoryList', function(categories, options) {
    return hierarchicalCategoryListHelper.call(this, categories, options);
});
