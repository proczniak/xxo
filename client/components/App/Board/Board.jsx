

Board = React.createClass({
  getCompetitors(number) {
    
    return {}
  },
  
  render() {
    return (
      <div className="row">
        <h4>Board: competitor1, competitor2</h4>
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
