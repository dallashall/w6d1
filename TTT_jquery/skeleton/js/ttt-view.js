class View {
  constructor(game, $el) {
    this.game = game;
    $el.append(this.setupBoard());
    this.bindEvents();
  }

  bindEvents() {
    $("ul").on("click", e => {
      const $etarget = $(e.target);
      let squareNum = $etarget.data("number");
      const coords = View.mapper[squareNum];
      console.log(coords);
      this.game.playMove(coords);
      const gridSpace = this.game.board.grid[coords[0]][coords[1]];
      console.log(gridSpace);
      if (gridSpace) {
        $etarget.append(gridSpace);
      }
      if (this.game.board.isOver()) {
        let text = `${gridSpace} WINS!!`;
        $("#messages").append(text);
      }
    });
  }

  makeMove($square) {}

  setupBoard() {
    let $ul = $("<ul> </ul>");
    for (let i = 0; i < 9; i++) {
      let $li = $("<li> </li>");
      $li.data("number", i+1);
      $ul.append($li);
    }
    $ul.addClass("clearfix");
    return $ul;
  }
}

View.mapper = {
  1: [0,0],
  2: [0,1],
  3: [0,2],
  4: [1,0],
  5: [1,1],
  6: [1,2],
  7: [2,0],
  8: [2,1],
  9: [2,2]
};

module.exports = View;
