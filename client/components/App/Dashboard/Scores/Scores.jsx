Score = React.createClass({

 mixins: [ReactMeteorData],
 getMeteorData(){
   if (PlayerScores.findOne()) var playerScore = PlayerScores.findOne().score;
   else playerScore = 0;

   return ({
     playerScore: playerScore
   })

 },

 render() {
   return (
     <div className="panel-group">
       <div className="panel-body">
         Score: {this.data.playerScore}
       </div>
     </div>
   )
 }
});