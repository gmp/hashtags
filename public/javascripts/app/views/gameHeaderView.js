ht.Views.GameHeaderView = Backbone.View.extend({

  template: ht.Templates.GameHeaderTemplate,

  initialize: function() {
  },

  render: function() {
    this.$el.append(this.template(this.model.attributes));
  }

});