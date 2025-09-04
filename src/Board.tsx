import React from "react";
import { ValueType, Item } from "./types";
import Chip from "./Chip";

class Board extends React.Component<any, any> {
  // Define all betting areas
  numbers: number[] = [3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36, 2, 5, 8, 11, 14, 17, 20, 23, 26, 29, 32, 35, 1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31, 34];
  
  constructor(props: any) {
    super(props);
  }

  // Handle bet placement
  placeBet = (type: ValueType, value?: number) => {
    const item: Item = {
      type,
      value: value || 0,
      valueSplit: []
    };
    console.log('Board placeBet called:', type, value, item);
    console.log('onCellClick function:', this.props.onCellClick);
    this.props.onCellClick(item);
  };

  // Render a chip if there's a bet placed
  renderChip = (type: ValueType, value?: number) => {
    // Create an item object just like placeBet does to ensure key consistency
    const item = {
      type,
      value: value || 0,
      valueSplit: []
    };
    
    // Use the same key generation logic as the hook
    const key = item.value !== undefined ? `${item.type}:${item.value}` : `${item.type}:empty`;
    const placedChip = this.props.chipsData.placedChips.get(key);
    
    if (placedChip) {
      return (
        <div className="placed-chip">
          <Chip
            currentItemChips={placedChip}
            currentItem={placedChip.item}
            leftMin={-10}
            leftMax={10}
            topMin={-30}
            topMax={0}
          />
          <div className="chip-sum">${placedChip.sum}</div>
        </div>
      );
    }
    return null;
  };

    // Get number color (red/black)
  getNumberColor = (num: number) => {
    const redNumbers = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36];
    return redNumbers.includes(num) ? 'red' : 'black';
  };

  render() {
    return (
      <div className="roulette-board-wrapper">
        <div className="roulette-board-grid">
          {/* Zero - Column 1, Rows 1-3 */}
          <div 
            className="grid-cell zero-cell" 
            onClick={() => this.placeBet(ValueType.NUMBER, 0)}
          >
            <span>0</span>
            {this.renderChip(ValueType.NUMBER, 0)}
          </div>
          
          {/* Row 1 Numbers: 3,6,9,12,15,18,21,24,27,30,33,36 - Columns 2-13 */}
          {[3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36].map(num => (
            <div 
              key={num}
              className={`grid-cell number-cell ${this.getNumberColor(num)}`}
              onClick={() => this.placeBet(ValueType.NUMBER, num)}
            >
              <span>{num}</span>
              {this.renderChip(ValueType.NUMBER, num)}
            </div>
          ))}
          
          {/* 2:1 Row 1 - Column 14, Row 1 */}
          <div className="grid-cell ratio-cell-row1" onClick={() => this.placeBet(ValueType.NUMBERS_3_12)}>
            <span>2:1</span>
            {this.renderChip(ValueType.NUMBERS_3_12)}
          </div>

          {/* Row 2 Numbers: 2,5,8,11,14,17,20,23,26,29,32,35 - Columns 2-13 */}
          {[2, 5, 8, 11, 14, 17, 20, 23, 26, 29, 32, 35].map(num => (
            <div 
              key={num}
              className={`grid-cell number-cell ${this.getNumberColor(num)}`}
              onClick={() => this.placeBet(ValueType.NUMBER, num)}
            >
              <span>{num}</span>
              {this.renderChip(ValueType.NUMBER, num)}
            </div>
          ))}
          
          {/* 2:1 Row 2 - Column 14, Row 2 */}
          <div className="grid-cell ratio-cell-row2" onClick={() => this.placeBet(ValueType.NUMBERS_2_12)}>
            <span>2:1</span>
            {this.renderChip(ValueType.NUMBERS_2_12)}
          </div>

          {/* Row 3 Numbers: 1,4,7,10,13,16,19,22,25,28,31,34 - Columns 2-13 */}
          {[1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31, 34].map(num => (
            <div 
              key={num}
              className={`grid-cell number-cell ${this.getNumberColor(num)}`}
              onClick={() => this.placeBet(ValueType.NUMBER, num)}
            >
              <span>{num}</span>
              {this.renderChip(ValueType.NUMBER, num)}
            </div>
          ))}
          
          {/* 2:1 Row 3 - Column 14, Row 3 */}
          <div className="grid-cell ratio-cell-row3" onClick={() => this.placeBet(ValueType.NUMBERS_1_12)}>
            <span>2:1</span>
            {this.renderChip(ValueType.NUMBERS_1_12)}
          </div>

          {/* Dozens Row - Row 4 */}
          <div className="grid-cell ratio-cell-left" onClick={this.props.onUndoBet}>
            <span>Undo ↶</span>
          </div>
          <div className="grid-cell dozen-cell-1st" onClick={() => this.placeBet(ValueType.NUMBERS_1_12)}>
            <span>1st 12</span>
            {this.renderChip(ValueType.NUMBERS_1_12)}
          </div>
          <div className="grid-cell dozen-cell-2nd" onClick={() => this.placeBet(ValueType.NUMBERS_2_12)}>
            <span>2nd 12</span>
            {this.renderChip(ValueType.NUMBERS_2_12)}
          </div>
          <div className="grid-cell dozen-cell-3rd" onClick={() => this.placeBet(ValueType.NUMBERS_3_12)}>
            <span>3rd 12</span>
            {this.renderChip(ValueType.NUMBERS_3_12)}
          </div>
          <div className="grid-cell ratio-cell-extra" onClick={this.props.onClearBets}>
            <span>Clear ↻</span>
          </div>

          {/* Bottom Bet Row - Row 5 */}
          {/* Standard roulette layout: "1–18", "EVEN", "RED", "BLACK", "ODD", "19–36" */}
          <div className="grid-cell bottom-bet-1-18" onClick={() => this.placeBet(ValueType.NUMBERS_1_18)}>
            <span>1-18</span>
            {this.renderChip(ValueType.NUMBERS_1_18)}
          </div>
          <div className="grid-cell bottom-bet-even" onClick={() => this.placeBet(ValueType.EVEN)}>
            <span>EVEN</span>
            {this.renderChip(ValueType.EVEN)}
          </div>
          <div className="grid-cell bottom-bet-red" onClick={() => this.placeBet(ValueType.RED)}>
            <span>RED</span>
            {this.renderChip(ValueType.RED)}
          </div>
          <div className="grid-cell bottom-bet-black" onClick={() => this.placeBet(ValueType.BLACK)}>
            <span>BLACK</span>
            {this.renderChip(ValueType.BLACK)}
          </div>
          <div className="grid-cell bottom-bet-odd" onClick={() => this.placeBet(ValueType.ODD)}>
            <span>ODD</span>
            {this.renderChip(ValueType.ODD)}
          </div>
          <div className="grid-cell bottom-bet-19-36" onClick={() => this.placeBet(ValueType.NUMBERS_19_36)}>
            <span>19-36</span>
            {this.renderChip(ValueType.NUMBERS_19_36)}
          </div>
        </div>
      </div>
    );
  }
}

export default Board;
