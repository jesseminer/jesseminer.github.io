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

app.Router = Backbone.Router.extend({
  routes: {
    '': 'photoBrowser',
    'photos/:id': 'showPhoto'
  },

  photoBrowser: function () {
    new app.PhotoBrowser().render();
  },

  showPhoto: function (id) {
    new app.PhotoView({ model: app.photos.get(id) }).render();
  }
});

app.PhotoBrowser = Backbone.View.extend({
  el: '#content',

  events: {
    'keyup #search-captions': 'setSearchTerm'
  },

  initialize: function () {
    this.searchTerm = '';
    this.matchingPhotos = app.photos.clone();
  },

  filterPhotos: function () {
    var term = this.searchTerm.toLowerCase();
    var photos = app.photos.filter(function (photo) {
      return _.includes(photo.get('caption').toLowerCase(), term);
    });
    this.matchingPhotos.reset(photos);
  },

  render: function () {
    this.$el.html(app.template('photo-browser'));
    this.renderThumbnails();
    return this;
  },

  renderThumbnails: function () {
    this.$('#thumbnails').empty();
    var view = this;
    this.matchingPhotos.each(function (photo) {
      view.$('#thumbnails').append(new app.ThumbnailView({ model: photo }).render().$el);
    });
  },

  setSearchTerm: function () {
    this.searchTerm = _.trim(this.$('#search-captions').val());
    this.filterPhotos();
    this.renderThumbnails();
  }
});

app.PhotoView = Backbone.View.extend({
  el: '#content',

  render: function () {
    this.$el.html(app.template('photo', this.model.toJSON()));
    return this;
  }
});

app.ThumbnailView = Backbone.View.extend({
  tagName: 'span',

  render: function () {
    this.$el.html(app.template('thumbnail', this.model.toJSON()));
    return this;
  }
});

app.template = function (id, data) {
  return Handlebars.compile($('#' + id + '-tmpl').html())(data);
};

$(function() {
  app.router = new app.Router();

  $('body').on('click', 'a.js-route', function (e) {
    e.preventDefault();
    app.router.navigate($(this).attr('href'), { trigger: true });
  });

  Backbone.history.start({ root: '/photo_gallery/' });
});
