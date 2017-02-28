class View {
  constructor(game, $el) {
    this.game = game;
    this.$el = $el;
    this.setupTowers($el);
    this.render(this.game.towers);
    this.firstClick = undefined;
    this.won = false;
    this.addClicks();
  }

  setupTowers($el) {
    console.log($el);
    const $fig = $el;
    for (let i=0; i < 3; i++) {
      const $ul = $("<ul> </ul>");
      $ul.data("tower", i);
      $fig.append($ul);
    }
  }

  render(towers) {
    console.log("entering render");
    const $ul = $("ul");
    console.log($ul);
    $ul.empty();
    towers.forEach((tower, towerIdx) => {
      const $towerul = $($ul.eq(towerIdx));
      for (let i = 2; i >= 0; i--) {
        let disc = tower[i];
        const $li = $(`<li class="disc-${disc}"> </li>`);
        $li.data("number", disc);
        $towerul.append($li);
      }
      console.log("made it");

    });
    if (this.game.isWon()) {
      $("#winner").append("You won!");
      this.won = true;
    }
  }

  addClicks() {
    const $fig = $("figure");
    $fig.on("click", e => {
      let $target = $(e.target);
      // console.log($target.parent());
      const tower = $target.data("tower") !== undefined ? $target.data("tower") : $target.parent().data("tower");
      console.log(`This is what we send to the click ${tower}`);
      this.clickTower(tower);

    });
  }

  clickTower(tower) {
    if (this.won) return;
    console.log(this.firstClick);
    if (this.firstClick !== undefined) {
      const secondClick = tower;
      this.game.move(this.firstClick, secondClick);
      this.render(this.game.towers);
      console.log(secondClick);
      $("ul").eq(this.firstClick).removeAttr("style");
      this.firstClick = undefined;

    }
    else {
      console.log(`first click is ${tower}`);
      this.firstClick = tower;
      $("ul").eq(tower).css("background-color", "lightblue");
    }

  }
}

module.exports = View;
