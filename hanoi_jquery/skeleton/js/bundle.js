/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	const HanoiGame = __webpack_require__(1);
	const HanoiView = __webpack_require__(2);

	$( () => {
	  const rootEl = $('.hanoi');
	  const game = new HanoiGame();
	  console.log(rootEl);
	  new HanoiView(game, rootEl);
	});


/***/ },
/* 1 */
/***/ function(module, exports) {

	class Game {
	  constructor() {
	    this.towers = [[3, 2, 1], [], []];
	  }

	  isValidMove(startTowerIdx, endTowerIdx) {
	      const startTower = this.towers[startTowerIdx];
	      const endTower = this.towers[endTowerIdx];

	      if (startTower.length === 0) {
	        return false;
	      } else if (endTower.length == 0) {
	        return true;
	      } else {
	        const topStartDisc = startTower[startTower.length - 1];
	        const topEndDisc = endTower[endTower.length - 1];
	        return topStartDisc < topEndDisc;
	      }
	  }

	  isWon() {
	      // move all the discs to the last or second tower
	      return (this.towers[2].length == 3) || (this.towers[1].length == 3);
	  }

	  move(startTowerIdx, endTowerIdx) {
	      if (this.isValidMove(startTowerIdx, endTowerIdx)) {
	        this.towers[endTowerIdx].push(this.towers[startTowerIdx].pop());
	        return true;
	      } else {
	        return false;
	      }
	  }

	  print() {
	      console.log(JSON.stringify(this.towers));
	  }

	  promptMove(reader, callback) {
	      this.print();
	      reader.question("Enter a starting tower: ", start => {
	        const startTowerIdx = parseInt(start);
	        reader.question("Enter an ending tower: ", end => {
	          const endTowerIdx = parseInt(end);
	          callback(startTowerIdx, endTowerIdx)
	        });
	      });
	  }

	  run(reader, gameCompletionCallback) {
	      this.promptMove(reader, (startTowerIdx, endTowerIdx) => {
	        if (!this.move(startTowerIdx, endTowerIdx)) {
	          console.log("Invalid move!");
	        }

	        if (!this.isWon()) {
	          // Continue to play!
	          this.run(reader, gameCompletionCallback);
	        } else {
	          this.print();
	          console.log("You win!");
	          gameCompletionCallback();
	        }
	      });
	  }
	}

	module.exports = Game;


/***/ },
/* 2 */
/***/ function(module, exports) {

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


/***/ }
/******/ ]);