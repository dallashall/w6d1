const View = require("./ttt-view.js");// require appropriate file
const Game = require("../../solution/game.js");// require appropriate file

$( () => {
  // Your code here
  const $el = $("figure");
  const g = new Game;
  let v = new View(g, $el);

});
