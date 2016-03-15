Tables = new Mongo.Collection("tables");

// var Schemas = {};
//
// Schemas.Tables = new SimpleSchema({
//   _id: {
//     type: String
//   },
//   competitor1: {
//     type: String,
//     label: "First Competitor"
//   },
//   competitor2: {
//     type: String,
//     label: "Second Competitor"
//   }
// });
//
//
// Tables.attachSchema(Schemas.Tables);
//

if (Meteor.isServer) {
  Meteor.methods({
    createTable: function (competitor1, competitor2) {
      Tables.insert({
        competitor1: competitor1,
        competitor2: null
      });
    },

    checkIfUserIsInTable: function (user) {
      var result = Tables.find({competitor1: user}).count();
      return (result);
    },

    checkIfTableExists: function () {

    }
  });



  Meteor.publish("tables", function () {
    return Tables.find({
        $or: [
          {competitor1: this.userId},
          {competitor2: this.userId}
        ]
      }
    )
  });
}


if (Meteor.isClient) {

  if(!Meteor.userId()) {
    console.log("Niezalogowany użytkownik. Wywołuję FlowRouter.go('/')");
    FlowRouter.go('/');
  }

  console.log("z isClient: ", Meteor.call('checkIfUserIsInTable', Meteor.userId(), function (error, result) {
    if (error) {
      console.log(error);
    } else {
      console.log(result);
      Session.set('isInTable', result);
      //return  (result);
    }
  })
  );

  isInTable = Session.get("isInTable");

  console.log("Z aplikacji: " + Tables.find().count()); // tak nie działa, ale Tables.find().count() z konsoli _PRZEGLĄDARKI_- jak najbardziej! WTF?
  console.log("isInTable: " + isInTable);
  console.log("Użytkownik: " + Meteor.userId());

}