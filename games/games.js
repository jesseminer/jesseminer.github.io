timeline_height = 600; //pixels

function Game(title, date, series_id) {
  this.title = title;
  this.date = date;
  this.series_id = series_id;
  
  this.series = function() {
    return series[this.series_id];
  }
  
  this.year = function() {
    return new Date(this.date).getFullYear();
  }
  
  this.nice_date = function() {
    var d = new Date(this.date);
    return months[d.getMonth()] + ' ' + d.getDate() + ', ' + d.getFullYear();
  }
  
  this.toString = function() {
    var series_str = this.series_id ? " (" + this.series() + ")" : "";
    return this.title + " - " + this.nice_date();// + series_str;
  }
}

function g(title, date, series) {
  return new Game(title, date, series);
}

function list(game_array) {
  var rows = game_array.map(function(g) { return '<tr><td>'+ g.title +'</td><td>'+ g.nice_date() +'</td><td>'+ g.series() +'</td></tr>'; }).join('');
  $('#main').html('<table class="game_table" cellspacing="0"><tr><th>Title</th><th>Date</th><th>Series</th></tr>'+ rows + '</table>');
}

function timeline(game_array) {
  if ($('#years_auto').prop('checked')) {
    var start_year = game_array[0].year();
    var end_year = game_array[game_array.length - 1].year();
  }
  else {
    var start_year = parseInt($('#start_year').val());
    var end_year = parseInt($('#end_year').val());
  }
  var time_span = Date.parse(end_year + 1) - Date.parse(start_year);
  
  var year_markers = '';
  for (var i = start_year; i <= end_year + 1; i++) {
    var top = timeline_position('1/1/' + i, start_year, time_span);
    year_markers += '<div class="year_div" style="margin-top: '+ top +'px;">'+ i + '</div>\n'
  }
  
  var game_markers = game_array.map(function(g) {
    var left = 40 + g.series_id * 45;
    var top = timeline_position(g.date, start_year, time_span);
    return '<div class="game_div" style="margin-left: '+ left +'px; margin-top: '+ top +'px;" title="'+ g +'">&nbsp;</div>\n';
  }).join('');
  
  $('#main').html(year_markers + game_markers);
}

function timeline_position(date, start_year, time_span) {
  return Math.floor((Date.parse(date) - Date.parse('1/1/' + start_year)) / time_span * timeline_height);
}

function display() {
  var series_ids = $('#series_checkboxes').find(':checked').map(function() { return parseInt($(this).val()); }).toArray();
  var results = []
  if ($('#years_auto').prop('checked')) {
    for (var i in games) {
      if (series_ids.indexOf(games[i].series_id) != -1) results.push(games[i]);
    }
  }
  else {
    var start_year = parseInt($('#start_year').val());
    var end_year = parseInt($('#end_year').val());
    for (var i in games) {
      if (series_ids.indexOf(games[i].series_id) != -1 && games[i].year() >= start_year && games[i].year() <= end_year) results.push(games[i]);
    }
  }
  note('Showing ' + results.length + ' games');
  if (results.length == 0) $('#main').empty();
  else $('#view_list').prop('checked') ? list(results) : timeline(results);
}

function series_checkboxes() {
  return series.map(function(s) {
    var i = series.indexOf(s);
    return '<input id="series'+ i +'" type="checkbox" value="'+ i +'" checked="checked" /><label for="series'+ i +'"> '+ (s || 'Other') +'</label><br />\n';
  }).join('');
}

function note(msg) {
  $('#notes').text(msg);
}

$(function() {
  $('#series_checkboxes').append(series_checkboxes());
  $('#start_year').val(games[0].year());
  $('#end_year').val(games[games.length - 1].year());
  $('#settings input').change(display);
  $('#check_all').click(function () {
    $(this).siblings('input[type=checkbox]').prop('checked', true);
    display();
  });
  $('#uncheck_all').click(function () {
    $(this).siblings('input[type=checkbox]').prop('checked', false);
    display();
  });
  $('#start_year, #end_year').focus(function () {
    if ($('#years_auto').prop('checked')) $('#years_custom').prop('checked', true).change();
  });
  display();
});
