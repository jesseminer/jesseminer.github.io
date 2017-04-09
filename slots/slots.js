var startMoney = 200;
var bank;
var bet;
var images = ['skull.png', 'cornell.png', 'mario.png', 'blotus.png'];
var values = [-4, 1, 2, 3];

function setBank(amt) {
  bank = amt;
  $('#bank').html(bank);
}

function setMsg(msg) {
  $('#message').html(msg);
}

function randomImage() {
  return Math.floor(Math.random() * 4);
}

function setSlots(s1, s2, s3) {
  $('#slot1').attr('src', images[s1]);
  $('#slot2').attr('src', images[s2]);
  $('#slot3').attr('src', images[s3]);
}

function start() {
  setSlots(0, 0, 0);
  setBank(startMoney);
  setMsg("");
  $('#bet2').click();
}

function spin() {
  if (bank <= 0) { setMsg("You're broke!"); return; }
  if ($('#bet5').prop('checked')) bet = bank;
  if (bet > bank) { setMsg("Not enough $!"); return; }
  var s1 = randomImage();
  var s2 = randomImage();
  var s3 = randomImage();
  setSlots(s1, s2, s3);
  results = getWinnings(s1, s2, s3);
  setBank(Math.max(0, bank + results[0]));
  setMsg(results[1]);
}

function getWinnings(s1, s2, s3) {
  var x;
  if (s1 == s2 && s1 == s3) x = values[s1] * 9;
  else {
    var c = count(s1, s2, s3);
    var indexOf2 = c.indexOf(2);
    if (indexOf2 > -1) x = values[indexOf2] * 4 + values[c.indexOf(1)];
    else x = (values[s1] + values[s2] + values[s3]) / 2;
  }
  var won = Math.round(x * bet);
  
  if (won >= 0) msg = "+" + won;
  else msg = '<span style="color: red;">' + won + '</span>';
  return [parseInt(won), msg];
}

function count(s1, s2, s3) {
  counts = [0, 0, 0, 0];
  counts[s1]++;
  counts[s2]++;
  counts[s3]++;
  return counts;
}
