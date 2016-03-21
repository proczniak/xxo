Boards = new Mongo.Collection("boards");
PlayerScores = new Mongo.Collection("scores");
if (Meteor.isServer) {
  Meteor.methods({

    /**
     * Very basic session (user - board) handling
     */
    assignMeToTheBoard: function () {
      //  userid = Meteor.userId();

      /**
       * Check if the player has a score entry, if not, create it.
       */
      if (!PlayerScores.findOne({_id: Meteor.userId()})) {
        console.log("no score, lets insert some data.");
        PlayerScores.insert(
          {
            _id: Meteor.userId(),
            score: 0
          }
        );
      }

      /**
       * Check if player has a board already assigned.
       */
      if (!!Meteor.call('getPlayerBoardId')) {
        /**
         * Player has a board assigned we're done here. Lets return assigned board _id.
         */
        return playerBoard._id;
      }
      else {
        /**
         * No board assigned to the player.
         * Let's check if there are any other players awaiting for game to start.
         * (Boards with only one player assigned)
         */
        if (!!Meteor.call('checkForAvailableBoards')) {
          /**
           * Board with only one player already assigned FOUND. Let's hook up!
           */
          Boards.update(
            {_id: availableBoard._id},
            {
              $set: {
                player2: Meteor.userId(),
                p2Name: Meteor.user().username
              }
            });
        }
        else {
          /**
           * No other player waiting found. Let's create a Board and assign our Player to it.
           */
          Meteor.call('createBoard');
        }
      }

    },

    getPlayerBoardId: function () {
      // console.log('getPlayerBoardId invoked.');
      playerBoard = Boards.findOne(
        {
          $or: [
            {player1: this.userId},
            {player2: this.userId}
          ]
        }
      );
      if (!!playerBoard) {
        //console.log('getPlayerBoardId, playerBoard._id: ' + playerBoard._id);
        return playerBoard._id;
      }
    },

    checkForAvailableBoards: function () {
      //console.log("checkForAvailableBoards invoked, user: " + Meteor.user().username);
      availableBoard = Boards.findOne({
        $and: [
          {player1: {$ne: null}},
          {player2: null}
        ]
      });

      if (!!availableBoard) {
        //console.log('checkForAvailableBoards found: ' + availableBoard._id)
        return availableBoard._id;
      }
      else return false;
    },

    createBoard: function () {
      Boards.insert({
        player1: this.userId,
        p1Name: Meteor.user().username,
        moveToken: Meteor.userId()
      });
    },

    destroyBoard: function (boardId) {
      console.log("niszczę planszę.");
      Boards.remove({_id: Meteor.call('getPlayerBoardId')})
    },

    clearBoard: function () {
      Boards.update(
        {_id: Meteor.call('getPlayerBoardId')},
        {
          $unset: {
            A1: null, A2: null, A3: null,
            B1: null, B2: null, B3: null,
            C1: null, C2: null, C3: null, gameResult: null
          }
        }
      );
    },

    playerMove: function (field) {

      getFieldContent = function (fieldId) {
        gameFieldObj1 = Boards.find(
          {
            $or: [
              {player1: Meteor.userId()},
              {player2: Meteor.userId()}
            ]
          },
          {
            fields: {
              [fieldId]: 1
            }
          }
        ).fetch();

        /**
         * Blob found on stackoverflow to cope with bad data handling design.
         * Might be fixed with moving game (board, fields) data to related collection.
         */
        var fields = Object.keys(gameFieldObj1).map(function (k) {
          return gameFieldObj1[k]
        })
        var field = fields[0];

        //console.log("Meteor.userId(): "+Meteor.userId()+"Obiekt myObj: " + myObj + ", Obiekt field: " + field);
        if (!!field) {
          var fields2 = Object.keys(field).map(function (k) {
            return field[k]
          });
        }

        var field2 = fields2[1];
        return field2;
      };

      getGameData = function (boardId) {
        var boardData = Boards.findOne({_id: boardId});
        if (boardData.player1 === Meteor.userId()) opId = boardData.player2
        else opId = boardData.player1
        return ({
          opponentId: opId,
          playerWithMoveToken: boardData.moveToken
        })
      };

      checkGameResult = function () {
        /** function returns:
         * undefined - when game is still in progress
         * draw - when game result is draw
         * winner Id - when current player actually won.
         *
         * Also function handles locking the game after it's finished
         */

        bS = Boards.findOne({_id: boardId});
        /** bS stands for boardState */

        if (
          ((bS.A1 === bS.A2 && bS.A2 === bS.A3) && !!bS.A1) ||
          ((bS.B1 === bS.B2 && bS.B2 === bS.B3) && !!bS.B1) ||
          ((bS.C1 === bS.C2 && bS.C2 === bS.C3) && !!bS.C1) ||

          ((bS.A1 === bS.B1 && bS.B1 === bS.C1) && !!bS.A1) ||
          ((bS.A2 === bS.B2 && bS.B2 === bS.C2) && !!bS.A2) ||
          ((bS.A3 === bS.B3 && bS.B3 === bS.C3) && !!bS.A3) ||

          ((bS.A1 === bS.B2 && bS.B2 === bS.C3) && !!bS.A1) ||
          ((bS.C1 === bS.B2 && bS.B2 === bS.A3) && !!bS.A3)
        ) {
          if (!bS.gameResult) {
            Boards.update(
              {_id: boardId},
              {
                $set: {
                  gameResult: Meteor.userId()
                }
              }
            )
          }

        } else if (
          !!bS.A1 && !!bS.A2 && !!bS.A3 & !!bS.B1 && !!bS.B2 && !!bS.B3 & !!bS.C1 && !!bS.C2 && !!bS.C3) {
          Boards.update(
            {_id: boardId},
            {
              $set: {
                gameResult: "draw"
              }
            }
          )
        }
        bS = Boards.findOne({_id: boardId});
        return bS.gameResult
      };

      playersScoreUpdate = function (gameResult) {
        if (!!PlayerScores.findOne()) {
          switch (gameResult) {
            case "win":
              PlayerScores.update(
                {_id: Meteor.userId()},
                {$inc: {score: 2}}
              );
              PlayerScores.update(
                {_id: getGameData(boardId).opponentId},
                {$inc: {score: -2}}
              );
              //console.log("playerScoreUpdate WIIIIIIN!. Lets. add and get 2 points each. " + Meteor.userId());
              //console.log("player: " + getGameData(boardId).opponentId + "lost 2 points")
              break;
            case "draw":
              PlayerScores.update(
                {_id: Meteor.userId()},
                {$inc: {score: 1}}
              );
              PlayerScores.update(
                {_id: getGameData(boardId).opponentId},
                {$inc: {score: 1}}
              );
              console.log("playerScoreUpdate DRAWWW!!!. Lets. add 1 point each");
              break;
            default:
              console.log("Terrible error at playerMove, playersScoreUpdate. No can do. (unknown gameRsult status.)")
          }
          console.log("playerScoreUpdate, " + gameResult);
        } else console.log("Terrible error at playerMove, playersScoreUpdate. No can do. (scores have not been created)")
      };

      var boardId = Meteor.call('getPlayerBoardId');

      /**
       * Check if move allowed (field empty and token on player side) then
       * make the move
       */
      if (!getFieldContent(field) && Meteor.userId() === getGameData(boardId).playerWithMoveToken) {
        if (!checkGameResult()) {
          console.log("playerMove: no result yet");
          Boards.update(
            {_id: boardId},
            {
              $set: {
                [field]: Meteor.user().username,
                moveToken: getGameData(boardId).opponentId
              }
            }
          )
        }

        /**
         * Lets update some scores.
         */
        if (checkGameResult() === Meteor.userId()) {
          console.log("+2 pts. WIN!!!!!! - Score me up!: " + Meteor.userId());
          console.log("-2 pts. LOST - fuck you!: " + getGameData(boardId).opponentId);
          playersScoreUpdate("win");
        } else if (checkGameResult() === "draw") {
          playersScoreUpdate("draw");
          console.log("+1 pts. DRAW: " + Meteor.userId() + ", " + getGameData(boardId).opponentId);
        }

      }

      console.log("move not allowed anymore. GameResult: " + checkGameResult());

      return checkGameResult();
    }


  });

  Meteor.publish("scores", function () {
    return PlayerScores.find({
      _id: this.userId
    })
  });

  Meteor.publish("boards", function () {
    console.log("Game.jsx: Publikuję kolekcję boards z player1 lub player2: " + this.userId);
    return Boards.find(
      {
        $or: [
          {player1: this.userId},
          {player2: this.userId}
        ]
      }
    )
  });


}
