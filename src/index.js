import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// 2. 함수 컴포넌트라는 간단한 문법으로 구현
//    - 1.보다 더 간단하게 props를 가져오고, 랜더링 해야 할 것을 반환하는 함수를 작성할 수 있음.
//    - this.props -> props 로 변경. 
//    - onClick={() => props.onClick()} -> onClick = {props.onClick} 으로 변경.
function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}


// // 1. 일반적인 React.Component를 확장한 클래스로 구현
// class Square extends React.Component {

//     // 2. 더이상 Square가 상태를 가지지 않도록 초기화 삭제

//     // 1. 데이터 관리를 위해 생성자 초기화 선언.
//     // constructor(props) {
//     //     // Javascript 클래스에서 서브 클래스의 생성자를 정의할 때
//     //     // super(); 메서드를 명시적으로 호출해줘야 함.
//     //     super(props);
//     //     this.state = {
//     //         value : null,
//     //     };
//     // }

//     // 4. Game -> Board -> Square 순으로 처리되고 있어서 data 정리 위한 수정.
//     //    this.state.value -> this.props.value 파라미터로 전달받은 데이터로 변경.
//     //    this.setState -> this.props.onClick  Board로 부터 전달받는 파라미터의 onClick 이벤트 적용
//     render() {
//       return (
//         <button className="square" onClick={() => this.props.onClick()}>
//           {this.props.value}
//         </button>
//       );
//     }


//     // 3. 현재 state의 value 표시하고, 클릭할 때 바꿔서 수정하도록 함.
//     // render() {
//     //   return (
//     //     <button className="square" onClick={() => this.setState({value: 'X'})}>
//     //       {this.state.value}
//     //     </button>
//     //   );
//     // }

//     // 2. 사각형 클릭하면 alert 띄우기 (화살표 함수를 사용)
//     // render() {
//     //     return (
//     //         <button className="square" onClick={() => alert('click')}>
//     //             {this.props.value}
//     //         </button>
//     //     );
//     // }

//     // 1. 버튼에 value 넣기
//     // render() {
//     //     return (
//     //         <button className="square">
//     //             {this.props.value}
//     //         </button>
//     //     )
//     // }
//   }
  
  class Board extends React.Component {

    // 1. 생성자 초기화
    // 2. 초기화 수정
    // 3. 생성자 삭제 -> 전달 받는 데이터로 가공하기 위해서, 필요없어졌음.
    // constructor(props) {
    //   super(props);
    //   this.state = {
    //     squares : Array(9).fill(null),
    //     xIsNext : true,
    //   }
    // }

    renderSquare(i) {

      // 4. 해당 class 안에 state를 적용하는 생성자를 없앴기 때문에 전달 받는 파라미터의 값으로 변경해줘야 함.
      return (
        <Square
          value = {this.props.squares[i]}
          onClick = {() => this.props.onClick(i)}
          />
      );

      // 3. Board -> Squre로 value와 onClick 두개의 props 전달
      // return (
      //   <Square 
      //     value = {this.state.squares[i]} 
      //     onClick = {() => this.handleClick(i)}
      //   />
      // );

      // 2. squares 배열에 적재하고 ? 전달?
      // return <Square value = {this.state.squares[i]} />;

      // 1. 단순히 Square 에 value만 전달
      // return <Square value={i}/>;
    }
  
    render() {
      // 1. this.state.xIsNext 값에 따라 O/X가 다르게 그려져야 함.
      // 2. state 값 변화
      // 3. status 값을 Game 에서 가져와서 할거니까 없어도 됨? 게임 히스토리를 다른 곳에서 관리해줌.
      // const winner = calculateWinner(this.state.squares);
      // let status;
      // if (winner) {
      //   status = 'winner: ' + winner;
      // } else {
      //   status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
      // }
  
      return (
        <div>
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

    /* 1. 생성자를 추가하여 Game의 초기 상태를 설정 */
    constructor(props) {
      super(props);
      this.state = {
        history: [{
          squares: Array(9).fill(null),
        }],
        stepNumber: 0,
        xIsNext: true,
      };
    }


    // 2. Board에서 옮겨왔음! 내용 수정.
    // 1. xIsNext 데이터 변경 추가 (번갈아 가면서 바뀜- 기존값의 !니까)
    handleClick(i) {
      const history = this.state.history.slice(0, this.state.stepNumber + 1);
      const current = history[history.length -1];
      const squares = current.squares.slice();
      // const squares = this.state.squares.slice();
      if (calculateWinner(squares) || squares[i]) {
        return;
      }
      squares[i] = this.state.xIsNext ? 'X' : 'O';
      this.setState({
        history: history.concat([{
          squares: squares
        }]),
        stepNumber: history.length,
        xIsNext: !this.state.xIsNext,
      });

      // 수정 
      // this.setState({
      //   squares: squares,
      //   xIsNext: !this.state.xIsNext,
      // });
    }

    jumpTo(step) {
      this.setState({
        stepNumber: step,
        xIsNext: (step % 2) === 0,
      });
    }

    /* 히스토리 전체를 보고 게임 상태를 계산하여 가져올 수 있어야 함. */
    render() {
      const history = this.state.history;
      const current = history[this.state.stepNumber];
      const winner = calculateWinner(current.squares);

      /** 이동을 표시하기 위해 UI 그리기 */
      const moves = history.map((step, move) => {
        const desc = move ? 'Go to move # ' + move : 'Go to game start';
        return (
          <li key={move}>
            <button onClick={() => this.jumpTo(move)}>{desc}</button>
          </li>
        );
      });

      let status;
      if (winner) {
        status = 'Winner: ' + winner;
      } else {
        status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
      }

      return (
        <div className="game">
          <div className="game-board">
            <Board 
              squares = {current.squares}
              onClick = {(i) => this.handleClick(i)} />
          </div>
          <div className="game-info">
            <div>{status}</div>
            <ol>{moves}</ol>
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

  function calculateWinner(squares) {
    const lines = [
      [0,1,2],
      [3,4,5],
      [6,7,8],
      [0,3,6],
      [1,4,7],
      [2,5,8],
      [0,4,8],
      [2,4,6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a,b,c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }