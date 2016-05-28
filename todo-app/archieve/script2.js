var Todo = Backbone.Model.extend({
    
    initialize : function() {
        console.log('this model has been initialized');
        this.on('change:title', function() {
           console.log('value of todo is changed'); 
        });
    },
    
    defaults : {
        title : '',
        completed : false
    },
    
    setTitle : function(newTitle) {
        this.set({title : newTitle});
    }
    
});

var todo1 = new Todo();
todo1.set('title', 'new title');
console.log(todo1.get('title'));
todo1.setTitle('new freaking title');
console.log(todo1.get('title'));
console.log(todo1.attributes);


//another way to create new object
var todo2 = new Backbone.Model({name : 'James'});
console.log(todo2.get('name'));

var todoView = Backbone.View.extend({
    
    tagName : 'li',
    
    id : 'testingid',
    
    className : 'container',
    
    todoTpl : _.template("An Example template"),
    // 'action selector' : 'callbackFunction'
    events : {
        'dblclick label' : 'edit',
        'keypress .edit' : 'updateOnEnter',
        'blur .edit' : 'close'
    },
    
    initialize : function(options) {
        
        this.options = options || {};
    
    },
    
    render : function() {
        
        this.$el.html(this.todoTpl(this.model.attributes));
        this.input = this.$('.edit');
        return this;
    
    },
    
    edit: function() {
    // executed when todo label is double clicked
    },

    close: function() {
    // executed when todo loses focus
    },

    updateOnEnter: function(e) {
    // executed on each keypress when in todo edit mode,
    // but we'll wait for enter to get in action
    }

    
    
});

    
var todoView = new todoView();
    
console.log(todoView.el);


var NewTodo = Backbone.Model.extend({
   defaults : {
       title : '',
       completed : false
   } 
});

var NewTodosCollection = Backbone.Collection.extend({
   model : NewTodo 
});

var myTodo = new NewTodo({title:'title', id:2});
//try add or remove
var myTodos = new NewTodosCollection({myTodo});
console.log(myTodos.length);

var todos = new Backbone.Collection();
todos.add([
    { title : 'go to belgium', completed : false},
    { title : 'go to usa', completed : false},
    { title : 'go to usa', completed : false}
]);
todos.forEach(function(model) {
    console.log(model.get('title'));
});

var ourObject = {};
_.extend(ourObject, Backbone.Events);
ourObject.on('dance', function(msg) {
    console.log('triggered dance move');
});
ourObject.trigger('dance', 'testing');

var View = Backbone.View.extend({
    
    el : '#todo',
    
    events: {
        'click [type="checkbox"]' : 'clicked',
    },
    
    initialize: function () {
        
        // bind to DOM event using jQuery
        this.$el.click(this.jqueryClicked);

        // bind to API event
        this.on('apiEvent', this.callback);
    },
    
    clicked: function(event) {
        console.log("events handler for " + this.el.outerHTML);
        this.trigger('apiEvent', event.type);
    },
    
    // 'this' is handling DOM element
    jqueryClicked: function(event) {
        console.log("jQuery handler for " + this.outerHTML);
    },
    
    callback: function(eventType) {
        console.log("event type was " + eventType);
    }
    
    
});

var view = new View();

var TodoRouter = Backbone.Router.extend({
    
    routes : {
        "about" : "showAbout",
        "search/:query" : "searchTodos",
        "search/:query/p:page" : "searchTodos"
    },
    
    showAbout : function() {
    
    },
    
    searchTodos : function(query, page) {
        var page_number = page || 1;
        console.log("Page number: " + page_number + " of the results for todos containing the word: " + query);
    }
    
});

var myTodoRouter = new TodoRouter();

Backbone.history.start();




