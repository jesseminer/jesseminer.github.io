Vue.createApp({
  data: function () {
    return {
      betOptions: [1, 10, 50, 100, 'all'],
      images: ['skull.png', 'cornell.png', 'mario.png', 'blotus.png'],
      message: '',
      money: 500,
      redMessage: false,
      results: [3, 3, 3],
      rewards: [-3, 1, 2, 3],
      selectedBet: 10
    }
  },

  methods: {
    betLabel: function (amount) {
      return amount === 'all' ? 'All I have left!' : amount;
    },

    count: function (s1, s2, s3) {
      var counts = [0, 0, 0, 0];
      counts[s1]++;
      counts[s2]++;
      counts[s3]++;
      return counts;
    },

    getWinnings: function (bet) {
      var x;
      var s1 = this.results[0];
      var s2 = this.results[1];
      var s3 = this.results[2];

      if (s1 == s2 && s1 == s3) {
        x = this.rewards[s1] * 7;
      } else {
        var c = this.count(s1, s2, s3);
        var indexOf2 = c.indexOf(2);
        x = indexOf2 > -1 ? this.rewards[indexOf2] : -1;
      }
      return Math.round(x * bet);
    },

    randomImage: function () {
      return Math.floor(Math.random() * 4);
    },

    reset: function () {
      this.results = [3, 3, 3];
      this.money = 500;
      this.selectedBet = 10;
      this.setMsg('');
    },

    setMsg: function (msg, red) {
      this.message = msg;
      this.redMessage = red;
    },

    spin: function () {
      if (this.money <= 0) {
        this.setMsg("You're broke!");
        return;
      }

      var bet = this.selectedBet === 'all' ? this.money : this.selectedBet;

      if (bet > this.money) {
        this.setMsg('Not enough $!');
        return;
      }

      this.results = [this.randomImage(), this.randomImage(), this.randomImage()];
      var amountWon = this.getWinnings(bet);
      this.money = Math.max(0, this.money + amountWon);

      amountWon > 0 ?
        this.setMsg('+' + amountWon) :
        this.setMsg(amountWon, true);
    }
  }
}).mount('#container');
