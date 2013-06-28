ht.Views.CreateGameView = Backbone.View.extend({

  className: 'create-game',

  template: ht.Templates.CreateGameTemplate,

  initialize: function() {
    this.render();
  },

  events: {
    'click #cancel': 'cancel',
    'click .avatar-contain': 'searchStart'
  },

  render: function () {
    this.$el.empty();
    this.$el.append(this.template(this.model.attributes));
    $('body').empty().append(this.$el);
  },

  cancel: function() {
    this.remove();
    ht.router.back();
  },

  search:,

  searchStart: function() {
    this.$el.append(new ht.Views.CreateGameSearchView().el);
  }

});