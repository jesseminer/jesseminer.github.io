function Slideshow(varName) {
  this.name = varName;
  this.aid = 0;
  this.index = 0;
  this.timer;
  this.playing = 0;
  this.fading = 0;
  this.fadeOutTime = 1000;
  this.fadeInTime = 1500;
  this.minOpacity = 0;
  
  this.delay = 3000;
  this.captions = true;
  this.showControls = true;
  this.autoplay = false;
  this.scale = false;
  
  this.init = function(aid) {
    this.aid = aid;
    this.slides = app.photos.toJSON();
    this.display(this.name + '_container');
  }

  this.display = function(parentId) {
    var div = $('#' + parentId);
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
    if (!this.showControls) this.controls.hide();
    if (this.autoplay) this.play();
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
  };

  this.changeImg = function(i) {
    if (i < 0) i = this.slides.length - 1;
    if (i >= this.slides.length) i = 0;
    path = this.img.attr('src');
    this.img.attr('src', path.substring(0, path.lastIndexOf('/') + 1) +'image'+ this.slides[i].id +'.jpg');
    if (this.captions) this.caption.html(this.slides[i].caption);
    this.index = i;
  }

  this.pause = function() {
    this.playing = 0;
    clearTimeout(this.timer);
    this.img.stop();
    this.img.css('opacity', 1);
    path = this.playpause.attr('src');
    this.playpause.attr('src', path.substring(0, path.lastIndexOf('/') + 1) + "play.jpg");
  }
  
  this.play = function() {
    if (!this.playing) {
      this.playing = 1;
      path = this.playpause.attr('src');
      this.playpause.attr('src', path.substring(0, path.lastIndexOf('/') + 1) + "pause.jpg");
    }    
    this.timer = setTimeout(this.name +".advance()", this.delay);
  }
  
  this.advance = function() {
    if (this.fading) this.fadeOut();
    else {
      this.changeImg(this.index + 1);
      this.play();
    }
  }
    
  this.fadeOut = function() {
    this.img.fadeTo(this.fadeOutTime, this.minOpacity);
    this.timer = setTimeout(this.name +".fadeIn();", this.fadeOutTime);
  }
  
  this.fadeIn = function() {
    this.changeImg(this.index + 1);
    this.img.fadeTo(this.fadeInTime, 1);
    this.timer = setTimeout(this.name +".play()", this.fadeInTime);
  }
}
