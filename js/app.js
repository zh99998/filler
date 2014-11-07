// Generated by CoffeeScript 1.8.0
(function() {
  var active, active_all, center_row, color, colors, columns, element, margin, neighbor, occupy, opponent_color, player_color, row_width, rows, stage, x, y, _i, _j;

  columns = 21;

  rows = 15;

  center_row = Math.floor(rows / 2);

  stage = $("#stage");

  colors = ["red", "purple", "blue", "green", "yellow", "orange"];

  player_color = null;

  opponent_color = null;

  for (y = _i = 0; 0 <= rows ? _i < rows : _i > rows; y = 0 <= rows ? ++_i : --_i) {
    row_width = columns - Math.abs(y - center_row);
    margin = (columns - row_width) * 25;
    for (x = _j = 0; 0 <= row_width ? _j < row_width : _j > row_width; x = 0 <= row_width ? ++_j : --_j) {
      color = colors[Math.floor(Math.random() * colors.length)];
      element = $('<div/>', {
        "class": "circle",
        style: "left:" + (x * 50 + margin) + "px; top:" + (y * 50) + "px",
        'data-color': color,
        'data-x': x,
        'data-y': y
      });
      if (y === center_row) {
        if (x === 0) {
          element.addClass("player");
          player_color = color;
        }
      }
      element.appendTo(stage);
    }
  }

  active = function(x, y) {
    element = $(".circle[data-x=\"" + x + "\"][data-y=\"" + y + "\"]");
    if (element) {
      if (!element.hasClass('player') && !element.hasClass('active') && element.attr('data-color') !== opponent_color) {
        return element.addClass('active');
      }
    }
  };

  occupy = function(x, y) {
    element = $(".circle[data-x=\"" + x + "\"][data-y=\"" + y + "\"]");
    if (!element.hasClass('player') && element.attr('data-color') === player_color) {
      element.addClass('player');
      return neighbor(x, y, occupy);
    }
  };

  neighbor = function(x, y, callback) {
    callback(x + 1, y);
    callback(x - 1, y);
    if (y - 1 < center_row) {
      callback(x - 1, y - 1);
      callback(x, y - 1);
    } else {
      callback(x, y - 1);
      callback(x + 1, y - 1);
    }
    if (y + 1 <= center_row) {
      callback(x, y + 1);
      return callback(x + 1, y + 1);
    } else {
      callback(x - 1, y + 1);
      return callback(x, y + 1);
    }
  };

  active_all = function() {
    return $('.player').each(function(index, element) {
      x = parseInt($(element).attr('data-x'));
      y = parseInt($(element).attr('data-y'));
      return neighbor(x, y, active);
    });
  };

  active_all();

  $('#stage').on('click', '.active', function(event) {
    player_color = event.target.dataset.color;
    $('.player').attr('data-color', player_color);
    $(".active[data-color=\"" + player_color + "\"]").each(function(index, element) {
      return occupy(parseInt(element.dataset.x), parseInt(element.dataset.y));
    });
    $('.active').removeClass('active');
    return active_all();
  });

}).call(this);

//# sourceMappingURL=app.js.map
