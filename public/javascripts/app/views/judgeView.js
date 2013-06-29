ht.Views.JudgeView = Backbone.View.extend({

  className: 'judge',

  template: ht.Templates.JudgeTemplate,

  initialize: function() {
    this.render();
  },

// 3 states: waiting for everyones photos.  ready to choose (3 pics come up at once). game end.

  render: function() {
    this.$el.append(this.template());
  }

});