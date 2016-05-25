// Backbone model

var Blog = Backbone.Model.extend({
    
    
    defaults : {
        author : '',
        title : '',
        url : ''
        
    }
    
});

// Backbone collection
var Blogs = Backbone.Collection.extend({});


var blog1 = new Blog({
    author : 'testing author',
    title : 'testing title',
    url : 'testing url'
});

var blog2 = new Blog({
    author : 'testing author2',
    title : 'testing title 2',
    url : 'testing url'
});

var blogs = new Blogs([blog1, blog2]);

// Backbone view for one blog

var BlogView = Backbone.View.extend({
    
    model : new Blog(),
    tagName : 'tr',
    initialize : function() {
        this.template = _.template($('.blogs-list-template').html())
    },
    
    render: function() {
        
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    
    }
    
});

var BlogsViews = Backbone.View.extend({
    
    model : blogs,
    el : $('.blogs-list'),
    initialize : function() {
        
        this.model.on('add', this.render, this);
    
    },
    
    render : function() {
        
        var self = this;
        this.$el.html('');
        _.each(this.model.toArray(), function(blog) {
            
            self.$el.append((new BlogView({model:blog})).render().$el);
            
        }
        )
        return this;
    }
    
    
});

var blogsView = new BlogsViews();

$(document).ready(function() {
    
    $('.add-blog').on('click', function() {
        
        var blog = new Blog({
            
            author : $('.author-input').val(),
            title : $('.title-input').val(),
            url : $('.url-input').val()
        })
        
        blogs.add(blog);
        
    });
    
});