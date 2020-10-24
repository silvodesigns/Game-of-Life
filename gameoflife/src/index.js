import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


class Grid extends React.Component {
  render() {
    const width = this.props.col * 14;
    var rowsArr = [];
    var boxClass = "";
    for (var i = 0; i < this.props.rows; i++) {
      for (var j = 0; j < this.props.col; j++) {
        let boxId = i + "_" + j;
        boxClass = this.props.gridFull[i][j] ? "box on" : "box off";
        rowsArr.push(
          <Box
            boxClass={boxClass}
            key={boxId}
            boxId={boxId}
            row={i}
            col={j}
            selectBox={this.props.selectBox}
          />
        )
      }
    }
    return (
      <div className="grid" style={{ width: width }}>
        {{ rowsArr }}

      </div>
    )
  }



}

class Main extends React.Component {
  constructor() {
    super()
    this.speed = 100;
    this.rows = 30;
    this.col = 50;

    this.state = {
      generation: 0,
      gridFull: Array(this.rows).fill().map(() => Array(this.col).fill(false))
    }

  }
  render() {
    return (
      <div>
        <h1>Game Of Life</h1>
        <Grid
          gridFull={this.state.gridFull}
          rows={this.state.rows}
          col={this.state.col}
          selectBox={this.selectBox}

        />
        <h2>Generations: {this.state.generation}</h2>

      </div >
    );

  }
}


ReactDOM.render(<Main />,
  document.getElementById("root")

);


