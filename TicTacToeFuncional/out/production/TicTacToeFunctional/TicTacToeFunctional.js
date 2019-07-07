if (typeof kotlin === 'undefined') {
  throw new Error("Error loading module 'TicTacToeFunctional'. Its dependency 'kotlin' was not found. Please, check whether 'kotlin' is loaded prior to 'TicTacToeFunctional'.");
}
var TicTacToeFunctional = function (_, Kotlin) {
  'use strict';
  var throwCCE = Kotlin.throwCCE;
  var Kind_CLASS = Kotlin.Kind.CLASS;
  var equals = Kotlin.kotlin.text.equals_igcy3c$;
  var equals_0 = Kotlin.equals;
  var println = Kotlin.kotlin.io.println_s8jyv4$;
  var ensureNotNull = Kotlin.ensureNotNull;
  var toString = Kotlin.toString;
  function imageX() {
    return '<img width="60" height="60" src="img/x.png"/>';
  }
  function imageO() {
    return '<img width="60" height="60" src="img/o.png"/>';
  }
  function fillX(pos) {
    var tmp$;
    var x = Kotlin.isType(tmp$ = getElement(pos), HTMLTableCellElement) ? tmp$ : throwCCE();
    x.innerHTML = 'X';
  }
  function fillO(pos) {
    var tmp$;
    var x = Kotlin.isType(tmp$ = getElement(pos), HTMLTableCellElement) ? tmp$ : throwCCE();
    x.innerHTML = 'O';
  }
  function getElement(id) {
    var tmp$;
    return Kotlin.isType(tmp$ = document.getElementById(id), HTMLElement) ? tmp$ : throwCCE();
  }
  function Player(nome, icon) {
    this.nome = nome;
    this.icon = icon;
  }
  Player.$metadata$ = {
    kind: Kind_CLASS,
    simpleName: 'Player',
    interfaces: []
  };
  var playerX;
  var playerO;
  var player;
  var roundsCounter;
  var instCounter;
  function fillCellSpecific(pos, type) {
    var tmp$;
    var cell = Kotlin.isType(tmp$ = getElement(pos), HTMLTableCellElement) ? tmp$ : throwCCE();
    var turnNumber = getElement('TurnNumber');
    var turnIcon = getElement('TurnIcon');
    if (equals(cell.textContent, '-')) {
      roundsCounter = roundsCounter + 1 | 0;
      if (equals_0(type, playerO)) {
        cell.style.background = 'green';
        fillO(pos);
        turnNumber.innerHTML = roundsCounter.toString();
        player = playerX;
        println(cell.textContent);
        turnIcon.innerHTML = playerX.icon;
      }
      if (equals_0(type, playerX)) {
        cell.style.background = 'orange';
        fillX(pos);
        turnNumber.innerHTML = roundsCounter.toString();
        player = playerO;
        println(cell.textContent);
        turnIcon.innerHTML = playerO.icon;
      }
      checkGame();
    }
     else {
      println('J\xE1 preenchido! Tente outro');
    }
  }
  function checkGame() {
    if (roundsCounter < 5) {
      println('not enough moves');
    }
     else {
      println('five moves or more have been played. Verifications started');
      diagonalAnalysis();
      antiDiagonalAnalysis();
      checkRows(0, 0);
      checkColumns(0, 0);
    }
  }
  function checkRows(row, column) {
    var currentCell = document.getElementById(row.toString() + column.toString());
    if (row <= 2 && column <= 2) {
      if (equals_0(ensureNotNull(currentCell).textContent, '-')) {
        checkRows(row + 1 | 0, 0);
        instCounter = 0;
        println('jumped row' + toString(row));
      }
       else {
        checkRows(row, column + 1 | 0);
        instCounter = instCounter + 1 | 0;
        println('stayed on row' + toString(row));
      }
    }
    if (instCounter === 3) {
      rowAnalysis(row);
    }
  }
  function checkColumns(row, column) {
    var currentCell = document.getElementById(row.toString() + column.toString());
    if (row <= 2 && column <= 2) {
      if (equals_0(ensureNotNull(currentCell).textContent, '-')) {
        checkColumns(0, column + 1 | 0);
        instCounter = 0;
        println('jumped column' + toString(column));
      }
       else {
        checkColumns(row + 1 | 0, column);
        instCounter = instCounter + 1 | 0;
        println('stayed on column' + toString(column));
      }
    }
    if (instCounter === 3) {
      columnAnalysis(column);
    }
  }
  function rowAnalysis(row) {
    var first = getElement(row.toString() + (0).toString()).textContent;
    var second = getElement(row.toString() + (1).toString()).textContent;
    var third = getElement(row.toString() + (2).toString()).textContent;
    println('this is the returned row ' + toString(row));
    if (equals_0(first, second)) {
      if (equals_0(second, third)) {
        println('we have a winner! ' + first + ' on row ' + row.toString());
        callWinner(ensureNotNull(first));
      }
    }
  }
  function columnAnalysis(column) {
    var first = getElement((0).toString() + column.toString()).textContent;
    var second = getElement((1).toString() + column.toString()).textContent;
    var third = getElement((2).toString() + column.toString()).textContent;
    println('this is the returned column ' + toString(column));
    if (equals_0(first, second)) {
      if (equals_0(second, third)) {
        println('we have a winner! ' + first + ' on column ' + column.toString());
        callWinner(ensureNotNull(first));
      }
    }
  }
  function diagonalAnalysis() {
    var first = getElement((0).toString() + (0).toString()).textContent;
    var second = getElement((1).toString() + (1).toString()).textContent;
    var third = getElement((2).toString() + (2).toString()).textContent;
    if (equals_0(first, second)) {
      if (equals_0(second, third)) {
        println('we have a winner! ' + first + ' on the diagonal ');
        callWinner(ensureNotNull(first));
      }
    }
  }
  function antiDiagonalAnalysis() {
    var first = getElement((2).toString() + (0).toString()).textContent;
    var second = getElement((1).toString() + (1).toString()).textContent;
    var third = getElement((0).toString() + (2).toString()).textContent;
    if (equals_0(first, second)) {
      if (equals_0(second, third)) {
        println('we have a winner! ' + first + ' on the anti diagonal! ');
        callWinner(ensureNotNull(first));
      }
    }
  }
  function callWinner(winner) {
    if (equals_0(winner, 'X')) {
      println('PARABENS! ' + playerX.nome + ' ganhou');
      showResult(playerX);
    }
     else if (equals_0(winner, 'O')) {
      println('PARABENS! ' + playerO.nome + ' ganhou');
      showResult(playerO);
    }
     else {
      showResult(player);
    }
  }
  function showResult(player) {
    switch (player.icon) {
      case 'O':
        window.alert('Parab\xE9ns pela vit\xF3ria, ' + player.nome);
        return true;
      case 'X':
        window.alert('Parab\xE9ns pela vit\xF3ria, ' + player.nome);
        return true;
    }
    return false;
  }
  function fillCell(pos) {
    if (equals_0(player, playerO)) {
      fillCellSpecific(pos, playerO);
    }
     else {
      fillCellSpecific(pos, playerX);
    }
  }
  _.imageX = imageX;
  _.imageO = imageO;
  _.fillX_61zpoe$ = fillX;
  _.fillO_61zpoe$ = fillO;
  _.getElement_61zpoe$ = getElement;
  _.Player = Player;
  Object.defineProperty(_, 'playerX', {
    get: function () {
      return playerX;
    },
    set: function (value) {
      playerX = value;
    }
  });
  Object.defineProperty(_, 'playerO', {
    get: function () {
      return playerO;
    },
    set: function (value) {
      playerO = value;
    }
  });
  Object.defineProperty(_, 'player', {
    get: function () {
      return player;
    },
    set: function (value) {
      player = value;
    }
  });
  Object.defineProperty(_, 'roundsCounter', {
    get: function () {
      return roundsCounter;
    },
    set: function (value) {
      roundsCounter = value;
    }
  });
  Object.defineProperty(_, 'instCounter', {
    get: function () {
      return instCounter;
    },
    set: function (value) {
      instCounter = value;
    }
  });
  _.fillCellSpecific_jj7jqn$ = fillCellSpecific;
  _.checkGame = checkGame;
  _.checkRows_vux9f0$ = checkRows;
  _.checkColumns_vux9f0$ = checkColumns;
  _.rowAnalysis_za3lpa$ = rowAnalysis;
  _.columnAnalysis_za3lpa$ = columnAnalysis;
  _.diagonalAnalysis = diagonalAnalysis;
  _.antiDiagonalAnalysis = antiDiagonalAnalysis;
  _.callWinner_61zpoe$ = callWinner;
  _.showResult_vgc0e7$ = showResult;
  _.fillCell = fillCell;
  playerX = new Player('xPlayer', 'X');
  playerO = new Player('oPlayer', 'O');
  player = new Player('Padr\xE3o', '-');
  roundsCounter = 0;
  instCounter = 0;
  Kotlin.defineModule('TicTacToeFunctional', _);
  return _;
}(typeof TicTacToeFunctional === 'undefined' ? {} : TicTacToeFunctional, kotlin);
