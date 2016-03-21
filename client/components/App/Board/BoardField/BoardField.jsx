BoardField = React.createClass({
    mixins: [ReactMeteorData],
    getMeteorData(){
        var fieldIdObj = Boards.find(
            {},
            {fields: {[this.props.fieldId]: 1}}
        ).fetch()

        /** Ugly blob from stackoverflow needed to extract field ID from object property name */
        var fields = Object.keys(fieldIdObj).map(function (k) {
            return fieldIdObj[k]
        })
        var field = fields[0];

        if (!!field) {
            var fields2 = Object.keys(field).map(function (k) {
                return field[k]
            });
            if (!!fields2[1]) {
                var field2 = fields2[0];
            }
        }

        return {
            fieldContent: field2
        }
    },
    getInitialState: function () {
        return {xfieldShouldUpdate: false};
    },

    handleClick: function (event) {
        Meteor.call('playerMove', this.props.fieldId, function (error, result) {
            if (error) {
            }
            if (result) {
            }
        });
    },

    shouldComponentUpdate: function () {
        if (this.state.xfieldShouldUpdate === true) return true
        else return false
        /**
         * This weird thing is never supposed to be true, as I have never set it to true...
         * somehow though...
         * NO IDEA WHY IT WORKS!!!???
         * Need it though to filter move alerts (so opponent sees our move notify, and vice versa).
         */
    },

    componentDidUpdate: function () {
        //console.log(Meteor.user().username +" "+ this.data.fieldContent);
        if (this.data.fieldContent) {
            if (Meteor.user().username != this.data.fieldContent) {
                sAlert.info("Gracz " + this.data.fieldContent + " wykonał ruch", {effect: 'genie'});
            }
        }
    },

    render()
    {

        if (this.data.fieldContent === Meteor.user().username) var fieldClass = "cross"
        else if (!this.data.fieldContent) var fieldClass = "empty"
        else var fieldClass = "nought"


        return (
            <div onClick={this.handleClick} className={fieldClass}>

            </div>
        )
    }
});