var app = app || {};

(function(){
    

var Workspace = Backbone.Router.extend({
    
    routes:{
      '*filte': 'setFilter'
    },

    setFilter: function( param ) {
      // Set the current filter to be used
      if (param) {
        param = param.trim();
      }
      app.TodoFilter = param || '';
        console.log(param);

      // Trigger a collection filter event, causing hiding/unhiding
      // of Todo view items
      app.Todos.trigger('filter');
    }
    
    
    
    
    
});

app.TodoRouter = new Workspace();
Backbone.history.start();
    
})();