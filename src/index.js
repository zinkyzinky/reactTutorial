import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Square extends React.Component {

    constructor(props) {
        // Javascript 클래스에서 서브 클래스의 생성자를 정의할 때
        // super(); 메서드를 명시적으로 호출해줘야 함.
        super(props);
        this.state = {
            value : null,
        };
    }


    // 3. 현재 state의 value 표시하고, 클릭할 때 바꿔서 수정하도록 함.
    render() {
      return (
        <button className="square" onClick={() => this.setState({value: 'X'})}>
          {this.state.value}
        </button>
      );
    }

    // 2. 사각형 클릭하면 alert 띄우기 (화살표 함수를 사용)
    // render() {
    //     return (
    //         <button className="square" onClick={() => alert('click')}>
    //             {this.props.value}
    //         </button>
    //     );
    // }

    // 1. 버튼에 value 넣기
    // render() {
    //     return (
    //         <button className="square">
    //             {this.props.value}
    //         </button>
    //     )
    // }
  }
  
  class Board extends React.Component {
    renderSquare(i) {
      return <Square value={i}/>;
    }
  
    render() {
      const status = 'Next player: X';
  
      return (
        <div>
          <div className="status">{status}</div>
          <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div>
        </div>
      );
    }
  }
  
  class Game extends React.Component {
    render() {
      return (
        <div className="game">
          <div className="game-board">
            <Board />
          </div>
          <div className="game-info">
            <div>{/* status */}</div>
            <ol>{/* TODO */}</ol>
          </div>
        </div>
      );
    }
  }
  
  // ========================================
  
  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );
  