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
  
  this.width = 540;
  this.height = 375;
  this.delay = 3000;
  this.captions = true;
  this.showControls = true;
  this.autoplay = false;
  this.scale = false;

  this.optionsHtml = function() {
    var checked = this.fading ? ' checked="checked"' : '';
    return '<span class="right">\n' +
           '  <input id="fading" type="checkbox" onclick="'+ this.name +'.fading = !'+ this.name +'.fading;"'+ checked +' /><label for="fading"> Fading slideshow</label> | \n' +
           '  <a href="javascript:;" onclick="deleteAlbum('+ this.name +'.aid)">Delete album</a>\n' +
           '</span>\n';
  }

  this.html = function() {
    return '<p style="text-align:left">'+ this.optionsHtml() +'Photo <span>0</span> of <span></span></p>\n' +
           '<p><img src="images/photos/" alt="Image" /><br /><span></span></p>\n' +
           '<p>\n' +
           '  <img title="Previous" onclick="'+ this.name +'.useControls(-1)" src="images/slideshow_controls/previous.jpg" alt="prev" />\n' +
           '  <img title="Play/Pause" onclick="'+ this.name +'.useControls(0)" src="images/slideshow_controls/play.jpg" alt="playpause" />\n' +
           '  <img title="Next" onclick="'+ this.name +'.useControls(1)" src="images/slideshow_controls/next.jpg" alt="next" />\n' +
           '</p>\n' +
           '<p id="start_'+ this.name +'"><input type="button" onclick="this.onclick=\'\'; $(this.parentNode).fadeOut(\'slow\'); '+this.name+'.play();" value="Start Slideshow" /></p>\n';
  }
  
  this.init = function(aid) {
    this.aid = aid;
    this.slides = app.photos.toJSON();
    this.display(this.name + '_container');
  }

  this.display = function(parentId) {
    div = $('#' + parentId);
    div.html(this.html());

    this.slidenum = $('span:nth-child(2)', div);
    this.totalslides = $('span:nth-child(3)', div);
    this.imgarea = $($('p', div)[1]);
    this.img = $($('img', this.imgarea)[0]);
    this.caption = $($('span', this.imgarea)[0]);
    this.controls = $($('p', div)[2]);
    this.playpause = $($('img', this.controls)[1]);
    this.startbutton = $($('p', div)[3]);
    $('img', this.controls).css({ padding: '0px 7px', cursor: 'pointer' });

    if (this.slides.length == 0) {
      div.html('\n<p style="text-align:left">'+ this.optionsHtml() +'<b>This album is empty.</b></p>\n');
      return;
    }
    this.pause();
    this.controls.show();
    this.startbutton.show();
    this.startbutton.css('visibility', 'visible');
    this.width = parseInt(this.imgarea.css('width'));
    this.height = parseInt(this.width * 0.65);
    this.imgarea.css('height', this.height + 36); // make room for caption
    this.totalslides.html(this.slides.length);
    this.changeImg(0);
    if (!this.showControls) this.controls.hide();
    if (this.autoplay || this.showControls) this.startbutton.hide();
    if (this.autoplay) this.play();
  }

  this.changeImg = function(i) {
    if (i < 0) i = this.slides.length - 1;
    if (i >= this.slides.length) i = 0;
    path = this.img.attr('src');
    this.img.attr('src', path.substring(0, path.lastIndexOf('/') + 1) +'image'+ this.slides[i].id +'.jpg');
    if (this.captions) this.caption.html(this.slides[i].caption);
    this.slidenum.html(i + 1);
    this.index = i;
  }

  this.useControls = function(arg) {
    if (arg != 0) {
      if (this.playing) this.pause();
      this.changeImg(this.index + arg);
    }
    else {
      if (this.playing) this.pause();
      else this.play();
    }
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
