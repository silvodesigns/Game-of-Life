import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { ButtonToolbar, DropdownButton, Dropdown } from 'react-bootstrap';

class Box extends React.Component {

  selectBox = () => {
    this.props.selectBox(this.props.rows, this.props.cols);
  }
  render() {
    return (
      <div
        className={`${this.props.boxClass}`}
        id={this.props.id}
        onClick={this.selectBox}
      />
    );
  }
}


class Grid extends React.Component {
  render() {
    const width = this.props.cols * 14;
    var rowsArr = [];

    var boxClass = "";
    for (var i = 0; i < this.props.rows; i++) {
      for (var j = 0; j < this.props.cols; j++) {
        let boxId = i + "_" + j;
        boxClass = this.props.gridFull[i][j] ? "box on" : "box off";

        rowsArr.push(
          <Box
            boxClass={boxClass}
            key={boxId}
            boxId={boxId}
            rows={i}
            cols={j}
            selectBox={this.props.selectBox}
          />
        );
      }
    }
    return (
      <div className="grid" style={{ width: width }}>
        {rowsArr}
      </div>
    )
  }



}

class Buttons extends React.Component {

  handleSelect = (evt) => {
    this.props.gridSize(evt);
  }

  render() {
    return (
      <div className="center">
        <ButtonToolbar class="btn-toolbar">
          <button className="btn btn-default" onClick={this.props.playButton}>
            Play
					</button>
          <button className="btn btn-default" onClick={this.props.pauseButton}>
            Pause
					</button>
          <button className="btn btn-default" onClick={this.props.clear}>
            Clear
					</button>
          <button className="btn btn-default" onClick={this.props.slow}>
            -1.25
					</button>
          <button className="btn btn-default" onClick={this.props.fast}>
            +1.25
					</button>
          <button className="btn btn-default" onClick={this.props.seed}>
            Random
					</button>
          <button className="btn btn-default" onClick={this.props.configOne}>
            configOne
					</button>
          <button className="btn btn-default" onClick={this.props.configTwo}>
            configTwo
					</button>
          <DropdownButton
            title="Grid Size"
            id="size-menu"
            onSelect={this.handleSelect}
          >
            <Dropdown.Item eventKey="1" className="btn btn-default">20x10</Dropdown.Item>
            <Dropdown.Item eventKey="2" className="btn btn-default">50x30</Dropdown.Item>
            <Dropdown.Item eventKey="3" className="btn btn-default">70x50</Dropdown.Item>
          </DropdownButton>
        </ButtonToolbar>
      </div>
    )
  }
}

class Main extends React.Component {
  constructor() {
    super()
    this.speed = 100;
    this.rows = 30;
    this.cols = 50;

    this.state = {
      generation: 0,
      gridFull: Array(this.rows).fill().map(() => Array(this.cols).fill(false))
    }

  }

  selectBox = (row, col) => {
    let gridCopy = arrayClone(this.state.gridFull);
    gridCopy[row][col] = !gridCopy[row][col];
    this.setState({
      gridFull: gridCopy
    });
    console.log(gridCopy[row][col])
  }

  seed = () => {
    let gridCopy = arrayClone(this.state.gridFull);
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        if (Math.floor(Math.random() * 4) === 1) {
          gridCopy[i][j] = true;
        }
      }
    }
    this.setState({
      gridFull: gridCopy
    });
  }

  configOne = () => {
    let gridCopy = arrayClone(this.state.gridFull);
    const middleY = Math.floor(this.rows / 2);
    const middleX = Math.floor(this.cols / 2);
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        if ((j === middleX && i === middleY) ||
          (j === middleX + 1 && i === middleY) ||
          (j === middleX - 1 && i === middleY) ||
          (j === middleX && i === middleY - 1) ||
          (j === middleX + 1 && i === middleY - 1) ||
          (j === middleX + 2 && i === middleY - 1)) {
          gridCopy[i][j] = true;
        }
        else {
          gridCopy[i][j] = false;
        }
      }
    }
    this.setState({
      gridFull: gridCopy
    });

  }


  configTwo = () => {
    let gridCopy = arrayClone(this.state.gridFull);
    const middleY = Math.floor(this.rows / 3);
    const middleX = Math.floor(this.cols / 3);
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        if ((j === middleX && i === middleY) ||
          (j === middleX + 1 && i === middleY) ||
          (j === middleX < 1 && i === middleY) ||
          (j === middleX + 1 && i === middleY - 1)) {

          gridCopy[i][j] = true;
        }
        else {
          gridCopy[i][j] = false;
        }
      }
    }
    this.setState({
      gridFull: gridCopy
    });

  }

  // configTwo = () => {
  //   let gridCopy = arrayClone(this.state.gridFull);
  //   const middleY = Math.floor(this.rows / 4);
  //   const middleX = Math.floor(this.cols / 4);
  //   for (let i = 0; i < this.rows; i++) {
  //     for (let j = 0; j < this.cols; j++) {
  //       if ((j > middleX && i < middleY)) {
  //         gridCopy[i][j] = true;
  //       }
  //       else {
  //         gridCopy[i][j] = false;
  //       }
  //     }
  //   }
  //   this.setState({
  //     gridFull: gridCopy
  //   });

  // }




  playButton = () => {
    clearInterval(this.intervalId)
    this.intervalId = setInterval(this.play, this.speed);
  }

  pauseButton = () => {
    clearInterval(this.intervalId)
  }
  slow = () => {
    this.speed = 1000;
    this.playButton();
  }

  fast = () => {
    this.speed = 100;
    this.playButton();
  }

  clear = () => {
    var grid = Array(this.rows).fill().map(() => Array(this.cols).fill(false));
    this.setState({
      gridFull: grid,
      generation: 0
    });
  }

  gridSize = (size) => {
    switch (size) {
      case "1":
        this.cols = 20;
        this.rows = 10;
        break;
      case "2":
        this.cols = 50;
        this.rows = 30;
        break;
      default:
        this.cols = 70;
        this.rows = 50;
    }
    this.clear();

  }
  play = () => {
    let g = this.state.gridFull;
    let g2 = arrayClone(this.state.gridFull);

    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        let count = 0;
        if (i > 0) if (g[i - 1][j]) count++;
        if (i > 0 && j > 0) if (g[i - 1][j - 1]) count++;
        if (i > 0 && j < this.cols - 1) if (g[i - 1][j + 1]) count++;
        if (j < this.cols - 1) if (g[i][j + 1]) count++;
        if (j > 0) if (g[i][j - 1]) count++;
        if (i < this.rows - 1) if (g[i + 1][j]) count++;
        if (i < this.rows - 1 && j > 0) if (g[i + 1][j - 1]) count++;
        if (i < this.rows - 1 && j < this.cols - 1) if (g[i + 1][j + 1]) count++;
        if (g[i][j] && (count < 2 || count > 3)) g2[i][j] = false;
        if (!g[i][j] && count === 3) g2[i][j] = true;
      }
    }
    this.setState({
      gridFull: g2,
      generation: this.state.generation + 1
    });

  }


  componentDidMount() {
    this.seed();
    this.playButton();
  }

  render() {
    return (
      <div>
        <h1>Game Of Life</h1>
        <Buttons
          playButton={this.playButton}
          pauseButton={this.pauseButton}
          slow={this.slow}
          fast={this.fast}
          clear={this.clear}
          seed={this.seed}
          configOne={this.configOne}
          configTwo={this.configTwo}
          gridSize={this.gridSize}
        />
        <Grid
          gridFull={this.state.gridFull}
          rows={this.rows}
          cols={this.cols}
          selectBox={this.selectBox}

        />
        <h2>Generations: {this.state.generation}</h2>
        <h3> These are the rules to game of life: </h3>
        <a href={"https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life"}>Rules of Game of life</a>




      </div >
    );

  }
}


function arrayClone(arr) {
  return JSON.parse(JSON.stringify(arr))
}


ReactDOM.render(<Main />,
  document.getElementById("root")

);


