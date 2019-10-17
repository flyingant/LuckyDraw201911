import $ from "jquery";

$(document).ready(() => {
  console.log('恭喜恭喜！！');
  window.odometerOptions = {
    auto: false, // Don't automatically initialize everything with class 'odometer'
    format: 'd', // Change how digit groups are formatted, and how many digits are shown after the decimal point
    duration: 10000, // Change how long the javascript expects the CSS animation to take
  };
  let el = document.querySelector('.odometer');
  let targetNumber = new Odometer({
    el: el,
    value: 666,
    format: 'd'
  });

  let start = false;
  let switchMode = 1;
  let crazy_number_interval = null;
  let crazy_number_interval_duration = 1500;

  const shuffle = () => {
    let number = parseInt(Math.random() * 1000);
    console.log('shuffle number:', number);
    targetNumber.update(number);
  }

  // initialize the lucky draw
  const initialize = () => {
    document.onkeydown = (event) => {
      event = event || window.event;
      // switch mode
      if (event.keyCode === 83) {
        $('.mode_1_btn').hide();
        $('.mode_5_btn').hide();
        $('.mode_btn_press').show();
      }
      // start
      if (event.keyCode === 32) {
        $('.start_btn').hide();
        $('.pause_btn').hide();
        $('.start_press_btn').show();
      }
      // retry
      if (event.keyCode === 8) {
        $('.retry_btn').hide();
        $('.retry_press_btn').show();
      }
    };
    document.onkeyup = (event) => {
      event = event || window.event;
      // switch mode
      if (event.keyCode === 83) {
        $('.mode_btn_press').hide();
        if (switchMode === 1) {
          switchMode = 5;
          $('.mode_1_btn').hide();
          $('.mode_5_btn').show();
        } else if (switchMode === 5) {
          switchMode = 1;
          $('.mode_1_btn').show();
          $('.mode_5_btn').hide();
        }
      }
      // start
      if (event.keyCode === 32) {
        $('.start_press_btn').hide();
        if (start) {
          // pause button pressed
          $('.start_btn').show();
          $('.pause_btn').hide();
          start = false;
          clearInterval(crazy_number_interval);
        } else {
          // start button pressed
          $('.tongsouwuqi').hide();
          $('.start_btn').hide();
          $('.pause_btn').show();
          start = true;
          crazy_number_interval = setInterval(shuffle, crazy_number_interval_duration);
        }
      }
      // retry
      if (event.keyCode === 8) {
        $('.retry_press_btn').hide();
        $('.retry_btn').show();
      }
    };
  };

  initialize();

})
