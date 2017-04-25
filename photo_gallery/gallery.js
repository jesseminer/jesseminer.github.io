window.app = {};

app.albums = [
  { id: 1, name: 'Cats' },
  { id: 2, name: 'Computer Graphics' },
  { id: 3, name: 'Taughannock Falls' },
  { id: 4, name: 'Winter' }
];

app.photos = [
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
];

app.renderPhotoBrowser = function () {
  $('#content').html(app.template('photo-browser', app));
  app.renderThumbnails();
};

app.renderThumbnails = function () {
  $('#thumbnails').empty();
  _.forEach(app.photos, function (photo) {
    $('#thumbnails').append(app.template('thumbnail', photo));
  });
};

app.template = function (id, data) {
  return Handlebars.compile($('#' + id + '-tmpl').html())(data);
};

$(function() {
  $('#nav a:nth-child(1)').addClass('current');

  $('body').on('click', '.thumbnail', function () {
    var photo = _.find(app.photos, { id: $(this).data('id') });
    $('#content').html(app.template('photo', photo));
  }).on('click', '.back-to-photos', app.renderPhotoBrowser);

  app.renderPhotoBrowser();
});
