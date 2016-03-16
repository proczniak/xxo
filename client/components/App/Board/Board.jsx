Meteor.subscribe('boards');
Board = React.createClass({

  // mixins: [ReactMeteorData],
  // getMeteorData(){
  //   Meteor.subscribe('boards');
  // },


  getPlayerBoard(){
    var result = Boards.find({
      $or: [
        {player1: Meteor.user().username},
        {player2: Meteor.user().username}
      ]
    })._id;
    return (result);

  },

  checkForExistingBoards(){
    console.log("checkForExistingBoards invoked, user: " +Meteor.user().username);
    var result = Boards.find({player2: null})._id;
    if (result) {
      console.log("Znalazłem wolną planszę.")
      return (result);
    } else {
      console.log("Nie znalazłem wolnych plansz.");
    }

  },

  createBoard(){
    console.log("createBoard invoked, user: " +Meteor.user().username);
    Boards.insert({
      player1: Meteor.user().username
    });
  },

  assignPlayerToBoard(){
    console.log("assignPlayerToBoard invoked: " + Meteor.user().username);
  },

  getCompetitors(number) {

    return {}
  },

  componentWillMount(){
    console.log("componentWillMount, użytkownik: " + Meteor.user().username);

    var playerBoard = this.getPlayerBoard();

    if (!!playerBoard) {
      console.log("Player ma przypisaną planszę: " + playerBoard);
      /**
       * Export states, props to Board component
       */
    }
    else{
      console.log("Player nie ma przypisanej planszy.")
      /**
       * Find Existing Boards (board should already have one player assigned)
       */

      var boardExists = this.checkForExistingBoards();
      if (!!boardExists){
        /**
         * assign currentPlayer to the board
         */
        console.log("Przypisuję gracza do planszy");
        this.assignPlayerToBoard();
      }
      else {
        /**
         * Create new board and assign current player.
         */
        console.log("Tworzę nową Planszę");
        //this.createBoard();
      }
    }
  },

  render() {
    return (
      <div className="row">
        <h4>Board: {Meteor.user().username}, competitor2</h4>
        <table className="tab-content">
          <tbody>
          <tr>
            <td id="A1">A1</td>
            <td id="A2">A2</td>
            <td id="A3">A3</td>
          </tr>
          <tr>
            <td id="B1">B1</td>
            <td id="B2">B2</td>
            <td id="B3">B3</td>
          </tr>
          <tr>
            <td id="C1">C1</td>
            <td id="C2">C2</td>
            <td id="C3">C3</td>
          </tr>
          </tbody>
        </table>
      </div>
    )
  }
});
