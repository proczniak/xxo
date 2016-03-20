Boards = new Mongo.Collection("boards");

if (Meteor.isServer) {
  Meteor.methods({

    /**
     * Very basic session (user - board) handling
     */
    assignMeToTheBoard: function () {
      userid = Meteor.userId();
      //console.log("assignMeToTheBoard invoked, userid: " + userid);
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
      Boards.remove({_id: boardId})
    },

    // Boards.update(
    // {_id: availableBoard._id},
    // {
    //   $set: {
    //     player2: Meteor.userId(),
    //     p2Name: Meteor.user().username
    //   }
    // });
    //
    clearBoard: function () {
      Boards.update(
        {_id: Meteor.call('getPlayerBoardId')},
        {
          $unset: {
            A1: null, A2: null, A3: null,
            B1: null, B2: null, B3: null,
            C1: null, C2: null, C3: null
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

      var boardId = Meteor.call('getPlayerBoardId');

      if (!getFieldContent(field) && Meteor.userId() === getGameData(boardId).playerWithMoveToken) {
        Boards.update(
          {_id: boardId},
          {
            $set: {
              [field]: Meteor.user().username,
              moveToken: getGameData(boardId).opponentId
            }

          }
        );
      }
    }


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
