var Container = Backbone.Model.extend({
    defaults: {name: "My Container", capacity: 10, limit:20}
});

var ContainerView = Backbone.View.extend({

  template: $('#container-template').html(),

  // className: "container",
  id: "ratio-container",

  initialize: function() {
    _.bindAll(this, "render");
    this.model = new Container;
    this.model.bind('change', this.render);
    this.model.view = this;
  },

  events: function() {
    var fields = ['capacity', 'limit']
    var _events = {}
    _.each(fields, function(f) {
      _events["change input." + f] = "update_field"
    });
    return _events;
  }(),

  /*
    We need to update the model attrs if the user change
    values from the input fileds.
  */
  update_field: function(e) {
    var o = {}
    o[e.currentTarget.name] = e.target.value;
    console.log(o);
    this.model.set(o);
    console.log(this.model.get(e.currentTarget.name));
  },

  render: function() {
    var rendered_data =  $.tmpl( this.template, this.model.toJSON() );
    $(this.el).html(rendered_data);
    // this.bind_update_fields();
    return this;
  }

});

window.container_view = new ContainerView;
$('#containers-zone').html(window.container_view.render().el);


