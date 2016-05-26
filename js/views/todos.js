var app = app || {};
(function() {
app.TodoView = Backbone.View.extend({

    tagName: 'li',

    template: _.template($('#item-template').html()),

    events: {
      'click .toggle': 'togglecompleted', 
      'dblclick label': 'edit',
      'keypress .edit': 'updateOnEnter',
      'click .destroy': 'clear',  
      'blur .edit': 'close'
    },


    initialize: function() {
      this.listenTo(this.model, 'change', this.render);
      this.listenTo(this.model, 'destroy', this.remove);
      this.listenTo(this.model, 'visible', this.toggleVisible);
    },
    
    togglecompleted: function() {
      this.model.toggle();
    },
    
    toggleVisible : function () {
      this.$el.toggleClass('hidden',  this.isHidden());
    },

    isHidden : function () {
      var isCompleted = this.model.get('completed');
      return ( // hidden cases only
        (!isCompleted && app.TodoFilter === 'completed')
        || (isCompleted && app.TodoFilter === 'active')
      );
    },

    // Re-renders the titles of the todo item.
    render: function() {
      this.$el.html(this.template(this.model.attributes));
        
      this.$el.toggleClass('completed', this.model.get('completed'));
      this.toggleVisible();  
        
      this.$input = this.$('.edit');
      return this;
    },

    // Switch this view into `"editing"` mode, displaying the input field.
    edit: function() {
      this.$el.addClass('editing');
      this.$input.focus();
    },

    // Close the `"editing"` mode, saving changes to the todo.
    close: function() {
      var value = this.$input.val().trim();

      if (value) {
        this.model.save({ title: value });
      }

      this.$el.removeClass('editing');
    },

    updateOnEnter: function( e ) {
      if ( e.which === ENTER_KEY ) {
        this.close();
      }
    },
    
    clear: function() {
      this.model.destroy();
    }
    
});
})();