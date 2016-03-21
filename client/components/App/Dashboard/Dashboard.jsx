Dashboard = React.createClass({
    mixins: [ReactMeteorData],
    getMeteorData(){
        Meteor.call('assignMeToTheBoard');
        /**
         * Might be a good spot to handle Scores subs. 2016.03.21
         * */

        return {
            loggedIn: !!Meteor.user()
        }
    },

    render() {
        return (
            <div className="panel panel-default">
                <div className="panel-heading">
                    Dashboard
                </div>
                <div className="panel-body">
                    <User />

                </div>
            </div>
        )
    }
});