ht.Views.CreateGameSearchView = Backbone.View.extend({

  className: 'search',

  template: ht.Templates.CreateGameSearchTemplate,

  initialize: function() {
    this.render();
  },

  events: {
    'click #search': 'search'
  },

  render: function() {
    this.$el.append(this.template());
  },

  search: function() {
    console.log('search');
  }

});