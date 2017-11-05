function Slideshow() {
  this.index = 0;
  this.timer;
  this.playing = false;
  this.fading = true;
  this.fadeOutTime = 1000;
  this.fadeInTime = 1500;
  this.delay = 3000;

  this.render = function(selector, albumId) {
    this.slides = app.photos.byAlbum(albumId);

    var div = $(selector);
    if (this.slides.length === 0) {
      div.html('<strong>This album is empty.</strong>');
      return;
    }

    div.html(app.template('slideshow'));
    this.imgarea = div.find('.slideshow-image-wrapper');
    this.img = this.imgarea.find('img');
    this.caption = div.find('.slideshow-caption');
    this.controls = div.find('.slideshow-controls');
    this.playpause = div.find('.play-or-pause');

    this.pause();
    this.imgarea.css('height', this.imgarea.width() * 0.6);
    this.changeImg(0);
    this.attachEvents();
  }

  this.attachEvents = function () {
    var self = this;
    this.playpause.on('click', function () {
      self.playing ? self.pause() : self.play();
    });
    this.controls.find('.previous-image').on('click', function () {
      if (self.playing) { self.pause(); }
      self.changeImg(self.index - 1);
    });
    this.controls.find('.next-image').on('click', function () {
      if (self.playing) { self.pause(); }
      self.changeImg(self.index + 1);
    });
    $('#fading').on('change', function () {
      self.fading = $(this).prop('checked');
    });
  };

  this.changeImg = function(i) {
    if (i < 0) i = this.slides.length - 1;
    if (i >= this.slides.length) i = 0;
    this.img.attr('src', this.slides[i].imagePath());
    this.caption.html(this.slides[i].get('caption'));
    this.index = i;
  }

  this.pause = function() {
    this.playing = false;
    clearTimeout(this.timer);
    this.img.stop().css('opacity', 1);
    this.playpause.attr('src', 'images/slideshow_controls/play.jpg');
  }
  
  this.play = function() {
    this.playing = true;
    this.playpause.attr('src', 'images/slideshow_controls/pause.jpg');
    this.setTransitionTimer();
  }
  
  this.advance = function() {
    if (this.fading) this.fadeTransition();
    else {
      this.changeImg(this.index + 1);
      this.setTransitionTimer();
    }
  }

  this.setTransitionTimer = function () {
    this.timer = setTimeout(this.advance.bind(this), this.delay);
  }

  this.fadeTransition = function () {
    var fadeInNextImage = function () {
      this.changeImg(this.index + 1);
      this.img.fadeTo(this.fadeInTime, 1, this.setTransitionTimer.bind(this));
    };
    this.img.fadeTo(this.fadeOutTime, 0, fadeInNextImage.bind(this));
  }
}
