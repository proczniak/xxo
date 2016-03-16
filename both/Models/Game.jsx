// console.log("User.jsx: Użytkownik: " + Meteor.user()._id);

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




    checkIfBoardExists: function () {

    },

    createBoard: function () {
    Boards.insert({
      player1: this.userId
    });
  },

  });



  Meteor.publish("boards", function () {
    console.log("Game.jsx: username: " + this.userId);
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

  // console.log("z isClient: ", Meteor.call('checkIfPlayerIsOnBoard', Meteor.userId(), function (error, result) {
  //     if (error) {
  //       console.log(error);
  //     } else {
  //       console.log(result);
  //       Session.set('userIsOnBoard', result);
  //       //return  (result);
  //     }
  //   })
  // );


  if (!!Meteor.userId()) {
   /**
   * Assign the player (user) to a Board
   */
    console.log("Użytkownik zalogowany");
  } else {
    console.log("Użytkownik niezalogowany");
  }

  console.log("Plansze: " + Boards.find().count()); // tak nie działa, ale Tables.find().count() z konsoli _PRZEGLĄDARKI_- jak najbardziej! WTF?
  console.log("Użytkownik: " + Meteor.userId());
}