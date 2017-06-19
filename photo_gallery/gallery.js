window.app = {};

app.Photo = Backbone.Model.extend({
  matchesCaption: function (term) {
    return _.includes(this.get('caption').toLowerCase(), term);
  },

  matchesAlbum: function (albumIds) {
    var thisAlbums = this.get('albums');
    return _.intersection(thisAlbums, albumIds).length || (thisAlbums.length === 0 && _.includes(albumIds, 0));
  }
});

app.Photos = Backbone.Collection.extend({
  model: app.Photo
});

app.albums = new Backbone.Collection([
  { id: 1, name: 'Cats' },
  { id: 2, name: 'Computer Graphics' },
  { id: 3, name: 'Taughannock Falls' },
  { id: 4, name: 'Winter' }
]);

app.photos = new app.Photos([
  { id: 1, caption: 'Luna', albums: [1] },
  { id: 2, caption: 'shiny', albums: [4] },
  { id: 4, caption: 'Inca', albums: [1] },
  { id: 5, caption: 'Kira', albums: [1] },
  { id: 6, caption: '', albums: [4] },
  { id: 7, caption: '', albums: [4] },
  { id: 8, caption: 'Ziggy', albums: [1] },
  { id: 9, caption: 'depth of field', albums: [2] },
  { id: 10, caption: '', albums: [2] },
  { id: 11, caption: '', albums: [2] },
  { id: 12, caption: '', albums: [2] },
  { id: 13, caption: '', albums: [2] },
  { id: 14, caption: 'sweet', albums: [0] },
  { id: 15, caption: '', albums: [0] },
  { id: 16, caption: 'green circles yay', albums: [0] },
  { id: 24, caption: 'Taughannock Falls', albums: [3, 4] },
  { id: 25, caption: 'creek bed', albums: [3] },
  { id: 26, caption: '', albums: [3, 4] },
  { id: 27, caption: '', albums: [0] },
  { id: 28, caption: 'space shuttle', albums: [0] }
]);

app.Router = Backbone.Router.extend({
  routes: {
    '': 'photoBrowser',
    'photos/:id': 'showPhoto'
  },

  photoBrowser: function () {
    app.photoBrowser.render();
  },

  showPhoto: function (id) {
    new app.PhotoView({ model: app.photos.get(id) }).render();
  }
});

app.PhotoBrowser = Backbone.View.extend({
  el: '#content',

  events: {
    'keyup #search-captions': 'setSearchTerm',
    'click .all-albums': 'selectAllAlbums',
    'click .no-albums': 'deselectAllAlbums',
    'change #search-albums input': 'setAlbums'
  },

  initialize: function () {
    this.searchTerm = '';
    this.albumIds = app.albums.pluck('id');
    this.albumIds.push(0);
    this.matchingPhotos = app.photos.clone();
  },

  deselectAllAlbums: function (e) {
    e.preventDefault();
    this.$('#search-albums input').prop('checked', false);
    this.setAlbums();
  },

  filterPhotos: function () {
    var term = this.searchTerm.toLowerCase();
    var albumIds = this.albumIds;
    var photos = app.photos.filter(function (photo) {
      return photo.matchesCaption(term) && photo.matchesAlbum(albumIds);
    });
    this.matchingPhotos.reset(photos);
  },

  render: function () {
    this.$el.html(app.template('photo-browser', { albums: app.albums.toJSON(), searchTerm: this.searchTerm }));
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

  selectAllAlbums: function (e) {
    e.preventDefault();
    this.$('#search-albums input').prop('checked', true);
    this.setAlbums();
  },

  setAlbums: function () {
    this.albumIds = this.$('#search-albums :checkbox:checked').map(function () {
      return parseInt(this.value);
    }).get();
    this.filterPhotos();
    this.renderThumbnails();
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
  app.photoBrowser = new app.PhotoBrowser();
  app.router = new app.Router();

  $('body').on('click', 'a.js-route', function (e) {
    e.preventDefault();
    app.router.navigate($(this).attr('href'), { trigger: true });
  });

  Backbone.history.start({ root: '/photo_gallery/' });
});
