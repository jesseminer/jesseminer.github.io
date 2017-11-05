function Slideshow() {
  this.aid = 0;
  this.index = 0;
  this.timer;
  this.playing = 0;
  this.fading = true;
  this.fadeOutTime = 1000;
  this.fadeInTime = 1500;
  this.delay = 3000;

  this.init = function(selector, aid) {
    this.el = $(selector);
    this.aid = aid;
    this.slides = app.photos.toJSON();
    this.display();
  }

  this.display = function() {
    var div = this.el;
    div.html(app.template('slideshow'));

    this.imgarea = div.find('.slideshow-image-wrapper');
    this.img = this.imgarea.find('img');
    this.caption = div.find('.slideshow-caption');
    this.controls = div.find('.slideshow-controls');
    this.playpause = div.find('.play-or-pause');

    if (this.slides.length == 0) {
      div.html('\n<p style="text-align:left">'+ this.optionsHtml() +'<b>This album is empty.</b></p>\n');
      return;
    }
    this.pause();
    this.controls.show();
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
    var path = this.img.attr('src');
    this.img.attr('src', path.substring(0, path.lastIndexOf('/') + 1) +'image'+ this.slides[i].id +'.jpg');
    this.caption.html(this.slides[i].caption);
    this.index = i;
  }

  this.pause = function() {
    this.playing = 0;
    clearTimeout(this.timer);
    this.img.stop().css('opacity', 1);
    var path = this.playpause.attr('src');
    this.playpause.attr('src', path.substring(0, path.lastIndexOf('/') + 1) + "play.jpg");
  }
  
  this.play = function() {
    if (!this.playing) {
      this.playing = 1;
      var path = this.playpause.attr('src');
      this.playpause.attr('src', path.substring(0, path.lastIndexOf('/') + 1) + "pause.jpg");
    }    
    this.timer = setTimeout(this.advance.bind(this), this.delay);
  }
  
  this.advance = function() {
    if (this.fading) this.fadeOut();
    else {
      this.changeImg(this.index + 1);
      this.play();
    }
  }
    
  this.fadeOut = function() {
    this.img.fadeTo(this.fadeOutTime, 0);
    this.timer = setTimeout(this.fadeIn.bind(this), this.fadeOutTime);
  }
  
  this.fadeIn = function() {
    this.changeImg(this.index + 1);
    this.img.fadeTo(this.fadeInTime, 1);
    this.timer = setTimeout(this.play.bind(this), this.fadeInTime);
  }
}
