ht.Views.JudgeView = Backbone.View.extend({

  template: ht.Templates.JudgeTemplate,

  initialize: function() {
    this.render();
  },

  // events: {
  //   'click: img'
  // }


// 3 states: waiting for everyones photos.  ready to choose (3 pics come up at once). game end.


  render: function() {
    this.template();
  }

});