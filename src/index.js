import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Square extends React.Component {

    // 2. 더이상 Square가 상태를 가지지 않도록 초기화 삭제

    // 1. 데이터 관리를 위해 생성자 초기화 선언.
    // constructor(props) {
    //     // Javascript 클래스에서 서브 클래스의 생성자를 정의할 때
    //     // super(); 메서드를 명시적으로 호출해줘야 함.
    //     super(props);
    //     this.state = {
    //         value : null,
    //     };
    // }

    // 4. Game -> Board -> Square 순으로 처리되고 있어서 data 정리 위한 수정.
    //    this.state.value -> this.props.value 파라미터로 전달받은 데이터로 변경.
    //    this.setState -> this.props.onClick  Board로 부터 전달받는 파라미터의 onClick 이벤트 적용
    render() {
      return (
        <button className="square" onClick={() => this.props.onClick()}>
          {this.props.value}
        </button>
      );
    }


    // 3. 현재 state의 value 표시하고, 클릭할 때 바꿔서 수정하도록 함.
    // render() {
    //   return (
    //     <button className="square" onClick={() => this.setState({value: 'X'})}>
    //       {this.state.value}
    //     </button>
    //   );
    // }

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

    // 생성자 초기화
    constructor(props) {
      super(props);
      this.state = {
        squares : Array(9).fill(null),
      }
    }

    handleClick(i) {
      const squares = this.state.squares.slice();
      squares[i] = 'X';
      this.setState({squares: squares});
    }

    renderSquare(i) {

      // 3. Board -> Squre로 value와 onClick 두개의 props 전달
      return (
        <Square 
          value = {this.state.squares[i]} 
          onClick = {() => this.handleClick(i)}
        />
      );

      // 2. squares 배열에 적재하고 ? 전달?
      // return <Square value = {this.state.squares[i]} />;

      // 1. 단순히 Square 에 value만 전달
      // return <Square value={i}/>;
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
  