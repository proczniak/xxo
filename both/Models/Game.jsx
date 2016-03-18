Boards = new Mongo.Collection("boards");

// var Schemas = {};
//
// Schemas.Boards = new SimpleSchema({
//   _id: {
//     type: String
//   },
//   player1: {
//     type: String,
//     label: "First Competitor"
//   },
//   player2: {
//     type: String,
//     label: "Second Competitor"
//   }
// });
//
//
// Boards.attachSchema(Schemas.Boards);

if (Meteor.isServer) {
  Meteor.methods({

    /**
     * Very basic session (user - board) handling
     */
    assignMeToTheBoard: function () {
      userid = Meteor.userId();
      console.log("assignMeToTheBoard invoked, userid: " + userid);

      /**
       * Check if player has a board already assigned.
       */
      if (!!Meteor.call('checkIfPlayerAlreadyOnBoard')) {
        /**
         * Player has a board assigned we're done here. Lets return assigned board _id.
         */

        console.log('Znalazłem plansze: ' + playerBoard._id + ". SUKCES. Gracz jest na planszy. ");
        return playerBoard._id;
      }
      else {
        /**
         * No board assigned to the player.
         */

        console.log('Nie znalazłem planszy z przypisanym użytkownikiem: ' + this.userId +
          '\n Sprawdzam czy są juz jakieś plansze z przypisanym innym użytkownikiem.');

        /**
         * Let's check if there are any other players awaiting for game to start.
         * (Boards with only one player assigned)
         */
        if (!!Meteor.call('checkForAvailableBoards')) {
          /**
           * Board with only one player already assigned FOUND. Let's hook up!
           */
          console.log('Znalazłem planszę z innym użytkownikiem. Podłączam się do planszy: ' + availableBoard._id);

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
          console.log('Nie znalazłem wolnej planszy. Tworzę planszę.');
          Meteor.call('createBoard');
        }
      }

    },

    checkIfPlayerAlreadyOnBoard: function () {
      console.log('checkIfPlayerAlreadyOnBoard invoked.');
      playerBoard = Boards.findOne(
        {
          $or: [
            {player1: this.userId},
            {player2: this.userId}
          ]
        }
      );
      if (!!playerBoard) {
        console.log('checkIfPlayerAlreadyOnBoard, playerBoard._id: ' + playerBoard._id);
        return playerBoard._id;
      }
    },

    checkForAvailableBoards: function () {
      console.log("checkForAvailableBoards invoked, user: " + Meteor.user().username);
      //  var result = Boards.find({player2: null})._id;
      availableBoard = Boards.findOne({
        $and: [
          {player1: {$ne: null}},
          {player2: null}
        ]
      });

      if (!!availableBoard) {
        console.log('checkForAvailableBoards found: ' + availableBoard._id)
        return availableBoard._id;
      }
      else return false;
    },

    createBoard: function () {
      console.log("createBoard invoked, user: " + Meteor.userId());

      Boards.insert({
        player1: this.userId,
        p1Name: Meteor.user().username
      });
    },

    playerMove: function (field) {

      var boardId = Meteor.call('checkIfPlayerAlreadyOnBoard');
      console.log("Gracz: " + Meteor.user().username + " wykonał ruch na polu: " + field);
      //var updateData = {field + ": " + Meteor.user().username};
      //console.log("boardId: " + boardId + "updateData: " + updateData);
      Boards.update(
        {_id: boardId},
        {
          $set: {
            [field]: Meteor.user().username
          }

        }
      );
    },

    destroyBoard: function () {
      console.log("destroyBoard: Gracz zamknął przeglądarkę. Musimy posprzątać");
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


if (Meteor.isClient) {

  if (!!Meteor.userId()) {
    /**   2016.03.16 WTF?
     * Assign the player (user) to a Board
     */
    console.log("Użytkownik zalogowany");
  } else {
    console.log("Użytkownik niezalogowany");
  }

  console.log("Plansze: " + Boards.find().count()); // tak nie działa, ale Tables.find().count() z konsoli _PRZEGLĄDARKI_- jak najbardziej! WTF?
  console.log("Użytkownik: " + Meteor.userId());
}