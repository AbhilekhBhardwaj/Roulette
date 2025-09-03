import React from "react";
import Wheel from "./Wheel";
import Board from "./Board";
import { List, Button, Progress } from '@mantine/core';
import { Item, PlacedChip, RouletteWrapperState, GameData, GameStages, ValueType } from "./Global";
var classNames = require("classnames");
import { height } from "@mui/system";
import anime from "animejs";
import ProgressBarRound from "./ProgressBar";

// var singleRotation = 0

// var r1 = singleRotation * 0 // 0
// var r2 = singleRotation * 2 // 19.45..

class RouletteWrapper extends React.Component<any, any> {
  
  rouletteWheelNumbers = [ 
    0, 32, 15, 19, 4, 21, 2, 25,
    17, 34, 6, 27, 13, 36, 11,
    30, 8, 23,10, 5, 24, 16, 33,
    1, 20, 14, 31, 9, 22, 18, 29,
    7, 28, 12, 35, 3, 26
  ];

  numberRef = React.createRef<HTMLInputElement>();
  state: RouletteWrapperState = {
    rouletteData: {
      numbers: this.rouletteWheelNumbers
    },
    chipsData: {
      selectedChip: 5,
      placedChips: new Map<string, PlacedChip>()
    },
    number: {
      next: null
    },
    winners: [],
    history: [],
    stage: GameStages.PLACE_BET,
    username: "",
    endTime: 0,
    progressCountdown: 0,
    time_remaining: 0,
  };
  animateProgress: any;
  balance: number = 1000;
  lastWin: number = 0;

  blackNumbers = [ 2, 4, 6, 8, 10, 11, 13, 15, 17, 20, 22, 24, 26, 29, 28, 31, 33, 35 ];
  constructor(props: { username: string }) {
    super(props);

    this.onSpinClick = this.onSpinClick.bind(this);
    this.onChipClick = this.onChipClick.bind(this);
    this.getChipClasses = this.getChipClasses.bind(this);
    this.onCellClick = this.onCellClick.bind(this);
    this.placeBet = this.placeBet.bind(this);
    this.clearBet = this.clearBet.bind(this);
  }

  componentDidMount() {}
  componentWillUnmount() {}
  setGameData(gameData: GameData) { 
    if (gameData.stage === GameStages.NO_MORE_BETS) { // PLACE BET from 25 to 35
      var endTime = 35;
      var nextNumber = gameData.value
      this.setState({ endTime: endTime, progressCountdown: endTime - gameData.time_remaining, number: { next: nextNumber }, stage: gameData.stage, time_remaining: gameData.time_remaining}); 
    } else if (gameData.stage === GameStages.WINNERS) { // PLACE BET from 35 to 59
      var endTime = 59;
      if (gameData.wins.length > 0) {
        this.setState({ endTime: endTime, progressCountdown: endTime - gameData.time_remaining,winners: gameData.wins,stage: gameData.stage, time_remaining: gameData.time_remaining, history: gameData.history }); 
      } else {
        this.setState({ endTime: endTime, progressCountdown: endTime - gameData.time_remaining, stage: gameData.stage, time_remaining: gameData.time_remaining, history: gameData.history }); 
     }
    } else { // PLACE BET from 0 to 25
      var endTime = 25;
      this.setState({endTime: endTime, progressCountdown: endTime - gameData.time_remaining, stage: gameData.stage , time_remaining: gameData.time_remaining}); 
    }
  }

  onCellClick(item: Item) {
    console.log("RouletteWrapper onCellClick called with:", item);
    var currentChips: Map<string, PlacedChip> = this.state.chipsData.placedChips;

    var chipValue = this.state.chipsData.selectedChip;
    if (chipValue === 0 || chipValue === null || chipValue === undefined) {
      console.log("No chip selected, chipValue:", chipValue);
      return;
    }
    const currentChip: PlacedChip = { item: item, sum: chipValue };

    const key = this.getCellKey(item);
    console.log("Generated key:", key);
    const existing = currentChips.get(key);
    if (existing !== undefined) {
      currentChip.sum += existing.sum;
    }

    // Create a new Map to ensure React detects the state change
    const newChips = new Map(currentChips);
    newChips.set(key, currentChip);
    
    console.log("Placing bet:", key, currentChip);
    this.setState({
      chipsData: {
        selectedChip: this.state.chipsData.selectedChip,
        placedChips: newChips
      }
    });
  }
  getCellKey(cell: Item): string {
    if (cell.value !== undefined) {
      return `${cell.type}:${cell.value}`;
    }
    if (cell.valueSplit !== undefined) {
      return `${cell.type}:split:${cell.valueSplit.join(',')}`;
    }
    return `${cell.type}:empty`;
  }
  onChipClick(chip: number | null) {
    if (chip != null) {
      console.log('Selected chip', chip);
      this.setState({
        chipsData: {
          selectedChip: chip,
          placedChips: this.state.chipsData.placedChips
        }
      });
    }
  }
  
  getChipClasses(chip: number) {
    var cellClass = classNames({
      chip_selected: chip === this.state.chipsData.selectedChip,
      "chip-100": chip === 100,
      "chip-20": chip === 20,
      "chip-10": chip === 10,
      "chip-5": chip === 5
    });

    return cellClass;
  }
  onSpinClick() {
    var nextNumber: any = null;
    if (this.numberRef.current) {
      nextNumber = this.numberRef.current.value;
    }
    if (nextNumber != null) {
      this.setState({ number: { next: nextNumber } });
    }
  }
  placeBet() { 
    // Sum total bet
    const placedChipsMap: Map<string, PlacedChip> = this.state.chipsData.placedChips;
    let totalBet = 0;
    placedChipsMap.forEach((pc) => { totalBet += pc.sum; });
    // Deduct bet if any and if balance allows; still spin even with 0 bet
    if (totalBet > 0 && this.balance >= totalBet) {
      this.balance -= totalBet;
    }
    // Simulate spin
    const nextNumberSimulated = Math.floor(Math.random() * 37);
    // Compute winnings
    const winnings = this.calculateWinnings(nextNumberSimulated, Array.from(placedChipsMap.values()));
    this.lastWin = winnings;
    this.balance += winnings;
    // Update UI
    this.setState((prev: any) => ({
      number: { next: String(nextNumberSimulated) },
      history: [nextNumberSimulated, ...prev.history].slice(0, 10),
      stage: GameStages.NO_MORE_BETS,
      endTime: 35,
      time_remaining: 0,
      chipsData: { selectedChip: prev.chipsData.selectedChip, placedChips: new Map<string, PlacedChip>() }
    }));
  }
  calculateWinnings(winningNumber: number, placedChips: PlacedChip[]) {
    const blackNumbers = [ 2, 4, 6, 8, 10, 11, 13, 15, 17, 20, 22, 24, 26, 29, 28, 31, 33, 35 ];
    const redNumbers = [ 1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36 ];
    let win = 0;
    for (let i = 0; i < placedChips.length; i++) {
      const placedChip = placedChips[i];
      const placedChipType = placedChip.item.type;
      const placedChipValue = placedChip.item.value;
      const placedChipSum = placedChip.sum;
      if (placedChipType === ValueType.NUMBER && placedChipValue === winningNumber) {
        win += placedChipSum * 36;
      } else if (placedChipType === ValueType.BLACK && blackNumbers.includes(winningNumber)) {
        win += placedChipSum * 2;
      } else if (placedChipType === ValueType.RED && redNumbers.includes(winningNumber)) {
        win += placedChipSum * 2;
      } else if (placedChipType === ValueType.NUMBERS_1_18 && (winningNumber >= 1 && winningNumber <= 18)) {
        win += placedChipSum * 2;
      } else if (placedChipType === ValueType.NUMBERS_19_36 && (winningNumber >= 19 && winningNumber <= 36)) {
        win += placedChipSum * 2;
      } else if (placedChipType === ValueType.NUMBERS_1_12 && (winningNumber >= 1 && winningNumber <= 12)) {
        win += placedChipSum * 3;
      } else if (placedChipType === ValueType.NUMBERS_2_12 && (winningNumber >= 13 && winningNumber <= 24)) {
        win += placedChipSum * 3;
      } else if (placedChipType === ValueType.NUMBERS_3_12 && (winningNumber >= 25 && winningNumber <= 36)) {
        win += placedChipSum * 3;
      } else if (placedChipType === ValueType.EVEN && winningNumber !== 0 && winningNumber % 2 === 0) {
        win += placedChipSum * 2;
      } else if (placedChipType === ValueType.ODD && winningNumber !== 0 && winningNumber % 2 === 1) {
        win += placedChipSum * 2;
      }
    }
    return win;
  }

  clearBet() { 
    this.setState({
      chipsData: {
        selectedChip: this.state.chipsData.selectedChip,
        placedChips: new Map<string, PlacedChip>()
      }
    });
  }

  handleWinningNumber(winningNumber: number) {
    // Update the history by adding the new number to the beginning
    // This will shift all existing numbers to the right
    this.setState((prev: any) => ({
      history: [winningNumber, ...prev.history].slice(0, 10) // Keep only last 10 numbers
    }));
  }
  render() {
    return (
      <div>
        <div className={"top-bar"}>
          <div className={"stats"}>
            <div className={"stat-item"}><span>Balance</span><strong>${this.balance}</strong></div>
            <div className={"stat-item"}><span>Bet</span><strong>${this.getTotalBet()}</strong></div>
            <div className={"stat-item"}><span>Last win</span><strong>${this.lastWin}</strong></div>
          </div>
          <div className={"quick-select"}>
            <button onClick={() => this.onChipClick(5)}>5</button>
            <button onClick={() => this.onChipClick(10)}>10</button>
            <button onClick={() => this.onChipClick(20)}>20</button>
            <button onClick={() => this.onChipClick(100)}>100</button>
          </div>
        </div>
        <div>
          <table className={"rouletteWheelWrapper"}>
            <tbody>
            <tr>
            <td className={"winnersBoard"}>
            <div className={"winnerItemHeader hideElementsTest"} >WINNERS</div>
              { 
                this.state.winners.map((entry, index) => {
                    return (<div className="winnerItem">{index+1}. {entry.username} won {entry.sum}$</div>);
                })
              }
            </td>
            <td><Wheel 
              rouletteData={this.state.rouletteData} 
              number={this.state.number} 
              onWinningNumber={this.handleWinningNumber.bind(this)}
            /></td>
            <td>
              <div className={"winnerHistory hideElementsTest"}>
              { 
                this.state.history.map((entry, index) => {
                  if (entry === 0) {
                    return (<div className="green">{entry}</div>);
                  } else if (this.blackNumbers.includes(entry)) {
                    return (<div className="black">{entry}</div>);
                  } else {
                    return (<div className="red">{entry}</div>);
                  }
                })
              }
              </div>
            </td>
              
            </tr>
            </tbody>
          </table>
          <Board
            onCellClick={this.onCellClick}
            chipsData={this.state.chipsData}
            rouletteData={this.state.rouletteData}
          />
        </div>
        <div className={"progressBar hideElementsTest"}>
          <ProgressBarRound stage={this.state.stage} maxDuration={this.state.endTime} currentDuration={this.state.time_remaining} />
        </div>
        {/* <div>
        <h2>Updated: {this.state.number.next}</h2>
          <input className={"number"} ref={this.numberRef} />
          <button className={"spin"} onClick={this.onSpinClick}>
            Spin
          </button>
        </div> */}
        <div className="roulette-actions hideElementsTest">
          <ul>
            <li>
            <Button  variant="gradient" gradient={{ from: '#ed6ea0', to: '#ec8c69', deg: 35 }} size="xl" onClick={() => this.clearBet()} >Clear Bet</Button>
            </li>
            <li className={"board-chip"} onClick={() => this.onChipClick(100)}>
              <div
                key={"chip_100"}
                className={this.getChipClasses(100)}
                onClick={() => this.onChipClick(100)}
              >
                100
              </div>
            </li>
            <li className={"board-chip"}>
              <span key={"chip_20"} onClick={() => this.onChipClick(20)}>
                <div
                  className={this.getChipClasses(20)}
                  onClick={() => this.onChipClick(20)}
                >
                  20
                </div>
              </span>
            </li>
            <li className={"board-chip"}>
              <span key={"chip_10"} onClick={() => this.onChipClick(10)}>
                <div
                  className={this.getChipClasses(10)}
                  onClick={() => this.onChipClick(10)}
                >
                  10
                </div>
              </span>
            </li>
            <li className={"board-chip"}>
              <span key={"chip_5"} onClick={() => this.onChipClick(5)}>
                <div
                  className={this.getChipClasses(5)}
                  onClick={() => this.onChipClick(5)}
                >
                  5
                </div>
              </span>
            </li>
            <li>
            <Button variant="gradient" gradient={{ from: 'orange', to: 'red' }} size="xl" onClick={() => this.placeBet()} >Place Bet</Button>
            </li>
          </ul>
        </div>
      </div>
    );
  }
  getTotalBet(): number {
    let total = 0;
    const iter = this.state.chipsData.placedChips.values();
    // eslint-disable-next-line no-constant-condition
    while (true) {
      const next = iter.next();
      if (next.done) break;
      const pc = next.value;
      if (pc && pc.sum) total += pc.sum;
    }
    return total;
  }
}

export default RouletteWrapper;
