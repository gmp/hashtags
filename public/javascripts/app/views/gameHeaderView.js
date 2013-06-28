ht.Views.GameHeaderView = Backbone.View.extend({

  template: ht.Templates.GameHeaderTemplate,

  initialize: function() {
  },

  render: function() {
    this.$el.prepend(this.template(this.model.attributes));
  }

});