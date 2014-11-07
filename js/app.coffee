columns = 21
rows = 15

center_row = Math.floor(rows / 2)

stage = $("#stage")
colors = ["red", "purple", "blue", "green", "yellow", "orange"]

player_color = null
opponent_color = null

for y in [0...rows]
  row_width = columns - Math.abs(y - center_row)
  margin = (columns - row_width) * 25
  for x in [0...row_width]
    color = colors[Math.floor(Math.random() * colors.length)]
    element = $('<div/>', class: "circle", style:"left:#{x * 50 + margin}px; top:#{y * 50}px", 'data-color': color, 'data-x': x, 'data-y': y)
    if y == center_row
      if x == 0
        element.addClass "player"
        player_color = color
      #else if x == columns - 1
      #  element.addClass "opponent"
      #  opponent_color = color
    element.appendTo stage

active = (x,y)->
  element = $(".circle[data-x=\"#{x}\"][data-y=\"#{y}\"]")
  if element
    if !element.hasClass('player') and !element.hasClass('active') and element.attr('data-color') != opponent_color
      element.addClass('active')
occupy = (x,y)->
  element = $(".circle[data-x=\"#{x}\"][data-y=\"#{y}\"]")
  if !element.hasClass('player') and element.attr('data-color') == player_color
    element.addClass('player')
    neighbor(x, y, occupy)

neighbor = (x,y,callback)->
  callback(x+1, y)
  callback(x-1, y)

  if y-1 < center_row
    callback(x-1, y-1)
    callback(x, y-1)
  else
    callback(x, y-1)
    callback(x+1, y-1)

  if y+1 <= center_row
    callback(x, y+1)
    callback(x+1, y+1)
  else
    callback(x-1, y+1)
    callback(x, y+1)

active_all = ->
  $('.player').each (index, element)->
    x = parseInt $(element).attr('data-x')
    y = parseInt $(element).attr('data-y')
    neighbor(x, y, active)

active_all()

$('#stage').on 'click', '.active', (event)->
  player_color = event.target.dataset.color
  $('.player').attr 'data-color', player_color
  $(".active[data-color=\"#{player_color}\"]").each (index, element)->
    occupy(parseInt(element.dataset.x), parseInt(element.dataset.y))
  $('.active').removeClass('active')
  active_all()