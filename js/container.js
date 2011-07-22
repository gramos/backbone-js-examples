var Container = Backbone.Model.extend({
    defaults: {name: "My Container", capacity: 10, limit:20}
});

var ContainerView = Backbone.View.extend({

  template: $('#container-template').html(),

  className: "container",

  initialize: function() {
    _.bindAll(this, "render");
    this.model = new Container;
    this.model.bind('change', this.render);
    this.model.view = this;
  },

  /*
    We need to update the model attrs if the user change
    values from the input fileds.
  */
  bind_update_fields: function() {
    var fields = $('#container-a').find('.field');
    var events = {};
    _.each(fields, function(f) {
      events["change input." + f.name] = "update_" + f.name
    });
    this.events = events;
    return events;
  },

  update_limit: function(e) {
    console.log(e);
  },

  update_capacity: function(e) {

    console.log(e);
    // this.model.set({capacity: e.targe.value});
  },

  render: function() {
    var rendered_data =  $.tmpl( this.template, this.model.toJSON() );
    $('#container-a').html(rendered_data);
    this.bind_update_fields();
    return this;
  }

});

window.container_view = new ContainerView;
window.container_view.render();


