window.app = {};

app.albums = new Backbone.Collection([
  { id: 1, name: 'Cats' },
  { id: 2, name: 'Computer Graphics' },
  { id: 3, name: 'Taughannock Falls' },
  { id: 4, name: 'Winter' }
]);

app.photos = new Backbone.Collection([
  { id: 1, caption: 'Luna' },
  { id: 2, caption: 'shiny' },
  { id: 4, caption: 'Inca' },
  { id: 5, caption: 'Kira' },
  { id: 6, caption: '' },
  { id: 7, caption: '' },
  { id: 8, caption: 'Ziggy' },
  { id: 9, caption: 'depth of field' },
  { id: 10, caption: '' },
  { id: 11, caption: '' },
  { id: 12, caption: '' },
  { id: 13, caption: '' },
  { id: 14, caption: 'sweet' },
  { id: 15, caption: '' },
  { id: 16, caption: 'green circles yay' },
  { id: 24, caption: 'Taughannock Falls' },
  { id: 25, caption: 'creek bed' },
  { id: 26, caption: '' },
  { id: 27, caption: '' },
  { id: 28, caption: 'space shuttle' }
]);

app.PhotoBrowser = Backbone.View.extend({
  el: '#content',

  render: function () {
    this.$el.html(app.template('photo-browser'));
    this.renderThumbnails();
    return this;
  },

  renderThumbnails: function () {
    this.$('#thumbnails').empty();
    var view = this;
    app.photos.each(function (photo) {
      view.$('#thumbnails').append(new app.ThumbnailView({ model: photo }).render().$el);
    });
  }
});

app.PhotoView = Backbone.View.extend({
  el: '#content',

  events: {
    'click .back-to-photos': 'showPhotoBrowser'
  },

  render: function () {
    this.$el.html(app.template('photo', this.model.toJSON()));
    return this;
  },

  showPhotoBrowser: function () {
    this.undelegateEvents();
    new app.PhotoBrowser().render();
  }
});

app.ThumbnailView = Backbone.View.extend({
  tagName: 'span',

  events: {
    'click': 'showPhoto'
  },

  render: function () {
    this.$el.append(app.template('thumbnail', this.model.toJSON()));
    return this;
  },

  showPhoto: function () {
    new app.PhotoView({ model: this.model }).render();
  }
});

app.template = function (id, data) {
  return Handlebars.compile($('#' + id + '-tmpl').html())(data);
};

$(function() {
  $('#nav a:nth-child(1)').addClass('current');
  new app.PhotoBrowser().render();
});
