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

