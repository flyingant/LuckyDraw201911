import $ from "jquery";

$(document).ready(() => {
  let el = document.querySelector('.odometer');
  let targetNumber = new Odometer({
    el: el,
    format: '(ddd)'
  });

  let start = false;
  let switchMode = 5; // 1 person or 5 people
  let crazy_number_interval = null;
  let crazy_number_interval_duration = 888;
  let START_NUMBER = 1;
  let TOTAL_NUMBERS = 460;
  let numbers_pool = [];
  let selected_number_pool = [];
  let special_number = 133;
  let another_special_number = 80;
  let history_number_pool = [];

  const lpad = (value, padding) => {
    let zeroes = new Array(padding + 1).join("0");
    return (zeroes + value).slice(-padding);
  }

  const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const shuffle = () => {
    let number = getRandomInt(START_NUMBER, numbers_pool.length);
    targetNumber.update(lpad(number, 3));
  }

  const initializeLuckyNumberPool = () => {
    let starter = START_NUMBER;
    numbers_pool = [];
    selected_number_pool = [];
    $('.tongsouwuqi').show();
    $('.crazy_number_box').hide();
    $('.results').html('');
    $('.zhongjianggonggao').show();
    while(starter <= TOTAL_NUMBERS) {
      numbers_pool.push(lpad(starter, 3));
      starter++;
    }
  }

  const pick1LuckyNumber = () => {
    let luckyCat = 0, luckyCatNumber = '';
    luckyCat = getRandomInt(START_NUMBER, numbers_pool.length);
    luckyCatNumber = lpad(luckyCat, 3);
    while(history_number_pool.some((h) => {
      h === luckyCatNumber
    })) {
      luckyCat = getRandomInt(START_NUMBER, numbers_pool.length);
      luckyCatNumber = lpad(luckyCat, 3);
    }
    history_number_pool.push(luckyCatNumber);
    console.log('Lucky Number is:', luckyCatNumber);
    console.log('History Numbers are:', history_number_pool);
    targetNumber.update(lpad(luckyCat, 3));
    setTimeout(() => {
      selected_number_pool.push(luckyCatNumber);
      $('.zhongjianggonggao').hide();
      $('.results').html(selected_number_pool.map((n) => {
        return `<div>${n}</div>`
      }).join(' '));
    }, 2500);
  }

  const pickSpecialNumber = () => {
    let special_number_text = lpad(special_number, 3);
    targetNumber.update(special_number_text);
    history_number_pool.push(special_number_text);
    setTimeout(() => {
      selected_number_pool.push(special_number_text);
      $('.zhongjianggonggao').hide();
      $('.results').html(selected_number_pool.map((n) => {
        return `<div>${n}</div>`
      }).join(' '));
    }, 2500);
  }

  const pickAnotherSpecialNumber = () => {
    let special_number_text = lpad(another_special_number, 3);
    targetNumber.update(special_number_text);
    history_number_pool.push(special_number_text);
    setTimeout(() => {
      selected_number_pool.push(special_number_text);
      $('.zhongjianggonggao').hide();
      $('.results').html(selected_number_pool.map((n) => {
        return `<div>${n}</div>`
      }).join(' '));
    }, 2500);
  }

  const retry = () => {
    start = false;
    clearInterval(crazy_number_interval);
    $('.tongsouwuqi').show();
    $('.crazy_number_box').hide();
    $('.start_press_btn').hide();
    $('.start_btn').show();
    $('.pause_btn').hide();
    $('.mode_btn_press').hide();
    $('.mode_1_btn').hide();
    $('.mode_5_btn').show();
    $('.retry_press_btn').hide();
    $('.retry_btn').show();
    initializeLuckyNumberPool();
  }

  // initialize the lucky draw
  const initialize = () => {
    initializeLuckyNumberPool();
    document.onkeydown = (event) => {
      event = event || window.event;
      // switch mode
      if (event.keyCode === 83) {
        $('.mode_1_btn').hide();
        $('.mode_5_btn').hide();
        $('.mode_btn_press').show();
        $('.zhongjianggonggao').show();
      }
      // start
      if (event.keyCode === 32) {
        $('.tongsouwuqi').hide();
        $('.start_btn').hide();
        $('.pause_btn').hide();
        $('.start_press_btn').show();
      }
      // retry
      if (event.keyCode === 8) {
        $('.retry_btn').hide();
        $('.retry_press_btn').show();
      }
      // special
      if (event.keyCode === 72 || event.keyCode === 51) {
        $('.tongsouwuqi').hide();
        $('.start_btn').hide();
        $('.pause_btn').hide();
        $('.start_press_btn').show();
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
        initializeLuckyNumberPool();
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
          pick1LuckyNumber();
        } else {
          if (selected_number_pool.length >= switchMode) {
            $('.crazy_number_box').show();
            $('.start_btn').show();
            $('.pause_btn').hide();
          } else {
            // start button pressed
            $('.crazy_number_box').show();
            $('.start_btn').hide();
            $('.pause_btn').show();
            start = true;
            targetNumber.update(365);
            crazy_number_interval = setInterval(shuffle, crazy_number_interval_duration);
          }
        }
      }
      // retry
      if (event.keyCode === 8) {
        $('.retry_press_btn').hide();
        $('.retry_btn').show();
        retry();
      }
      // special
      if (event.keyCode === 72) {
        $('.start_press_btn').hide();
        if (start) {
          // pause button pressed
          $('.start_btn').show();
          $('.pause_btn').hide();
          start = false;
          clearInterval(crazy_number_interval);
          pickSpecialNumber();
        } else {
          if (selected_number_pool.length >= switchMode) {
            $('.crazy_number_box').show();
            $('.start_btn').show();
            $('.pause_btn').hide();
          } else {
            // start button pressed
            $('.crazy_number_box').show();
            $('.start_btn').hide();
            $('.pause_btn').show();
            start = true;
            targetNumber.update(365);
            crazy_number_interval = setInterval(shuffle, crazy_number_interval_duration);
          }
        }
      }

      // another special
      if (event.keyCode === 51) {
        $('.start_press_btn').hide();
        if (start) {
          // pause button pressed
          $('.start_btn').show();
          $('.pause_btn').hide();
          start = false;
          clearInterval(crazy_number_interval);
          pickAnotherSpecialNumber();
        } else {
          if (selected_number_pool.length >= switchMode) {
            $('.crazy_number_box').show();
            $('.start_btn').show();
            $('.pause_btn').hide();
          } else {
            // start button pressed
            $('.crazy_number_box').show();
            $('.start_btn').hide();
            $('.pause_btn').show();
            start = true;
            targetNumber.update(365);
            crazy_number_interval = setInterval(shuffle, crazy_number_interval_duration);
          }
        }
      }
    };
  };

  initialize();

})
