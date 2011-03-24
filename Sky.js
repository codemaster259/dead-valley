// The Sky

define(["game", "sprite"], function (game, Sprite) {

  var context = game.spriteContext;

  // in seconds
  var dayTotal        = 10 * 60;
  var nightTotal      =  7 * 60;
  var transitionTotal = 90;

  var counter = 45; // 1/2 the way through sunrise

  var nightAlpha = 0.95;

  var alpha = nightAlpha;

  var transitionPercent = function () {
    return (transitionTotal - counter) / transitionTotal;
  };

  var states = {
    sunrise: function (delta) {
      alpha = nightAlpha - (nightAlpha * transitionPercent());
      if (counter < 0) {
        counter = dayTotal;
        currentState = states.day;
      }
    },
    day: function (delta) {
      alpha = 0.0;
      if (counter < 0) {
        counter = transitionTotal;
        currentState = states.sunset;
      }
    },
    sunset: function (delta) {
      alpha = nightAlpha * transitionPercent();
      if (counter < 0) {
        counter = dayTotal;
        currentState = states.night;
      }
    },
    night: function (delta) {
      alpha = nightAlpha;
      if (counter < 0) {
        counter = transitionTotal;
        currentState = states.sunrise;
      }
    }
  };

  var currentState = states.sunrise;

  var Sky = {
    run: function (delta) {
      counter -= delta;
      currentState(delta);
    },
    render: function (delta) {
      context.fillStyle = "rgba(0, 0, 50, "+alpha+")";
      context.fillRect(0, 0, game.canvasWidth, game.canvasHeight);
    },
    currentAlpha: function () {
      return alpha;
    }
  };
  
  return Sky;
});
