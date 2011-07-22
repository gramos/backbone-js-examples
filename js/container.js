var Container = Backbone.Model.extend({
  defaults: {name: "My Container"}
});

var ContainerView = Backbone.View.extend({

  template: $('#container-template').html(),

  initialize: function() {
    _.bindAll(this, "render");
    this.model = new Container;
    this.model.bind('change', this.render);
    this.model.view = this;
  },

  render: function() {
    rendered_data =  $.tmpl( this.template, this.model.toJSON() )
    $('#container-a').html(rendered_data);
    return this;
  }

});

window.container_view = new ContainerView;
window.container_view.render();

