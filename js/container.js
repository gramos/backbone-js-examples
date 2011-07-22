var Container = Backbone.Model.extend({
    defaults: {name: "My Container", capacity: 10, limit:20}
});

var ContainerView = Backbone.View.extend({

  template: $('#container-template').html(),

  // className: "container",
  id: "ratio-container",


  initialize: function() {
      _.bindAll(this, "render", "bind_update_fields");
    this.model = new Container;
    this.model.bind('change', this.render);
    this.model.view = this;
  },

  /*
    We need to update the model attrs if the user change
    values from the input fileds.
  */
  bind_update_fields: function() {
    var view   = this;
    var fields = $('#container-a').find('.field');
    var events = {};
    _.each(fields, function(f) {
      events["change input." + f.name] = "update_" + f.name
    });
    view.events = {"change input.capacity": "update_capacity"};
  },

  update_limit: function(e) {
    console.log(e);
  },

  update_capacity: function(e) {
    alert(e.target.value);
    this.model.set({capacity: e.target.value});
  },

  events: {"change input.capacity": "update_capacity"},

  render: function() {
    var rendered_data =  $.tmpl( this.template, this.model.toJSON() );
    // this.bind_update_fields();
    $(this.el).html(rendered_data);
    return this;
  }

});

window.container_view = new ContainerView;
$('#containers-zone').html(window.container_view.render().el);


