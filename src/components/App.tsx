import { Component, createRef, ReactElement, ReactNode, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import Die from './Die';
import Board from './Board';

export type BoardProps = { dice: Array<DieInfo> };
export type DieInfo = { letter: string, deg: number };


export default class App extends Component {

  state = {
    dice: !!window.location.search ? this.getDiceFromUrl() : this.getRandomDice(),
    deg: 0,
    timerStart:0,
  }

  constructor(props:any){
    super(props);
  }

  componentDidMount(){
    if(!window.location.search){
      this.saveDiceToUrl();
    }
    this.setState({timerStart:new Date().getTime()})
    setInterval(()=>{this.timeTick()}, 1000, this);
  }

  getRandomDice(){
    let initialDice = ["fayirs", "eeeeam", "toootu", "hordnl", "yrrrip", "tettmo", "dnaenn", "hlrndo", "gaemeu", "wonotu", "vgrrow", "pletic", "asrafa", "dnodht", "rfiasa", "drolhh", "tesccn", "jkbxzq", "nagmne", "sesusn", "pfsyri", "itecil", "tetiii", "eeeeaa", "piestc"];
    return initialDice.sort(()=>{
      return 0.5 - Math.random();
    }).map((die:string, i):DieInfo => {
      let letter = die.charAt(Math.floor(Math.random() * 6)).toUpperCase()
      let deg = Math.floor(Math.random() * 4) * 90;
      let dieInfo: DieInfo = {deg, letter}
      return dieInfo}
    )
  }

  getDiceFromUrl():Array<DieInfo>{
    let dice = [];
    if(!!window.location.search){
      let board = window.location.search.slice(1).split('')||[];
      while(board.length) {
        const letter:string = board.shift() || "E";
        const deg:number = parseInt(board.shift() || "") * 90;
        dice.push({letter, deg});
      }
    }
    return dice;
  }

  async rotate(){
    await this.setState({deg: this.state.deg + 90})
    let rootEl = document.getElementById('fullBoard')
    if(rootEl){
      rootEl.style.transform = 'rotate('+this.state.deg+'deg)';
    }
  }

  saveDiceToUrl(){
    let out = '';
    this.state.dice.map((die:DieInfo)=>{
      out += die.letter + (die.deg / 90);
    })
    window.location.search = '?' + out;
  }

  toggleMenu(){
    let menuEl = document.getElementById('menu');
    if(menuEl){
      if(menuEl.style.display == '')
      {
        menuEl.style.display = 'block'
      } else {
        menuEl.style.display = ''
      }
    }
  }

  timeTick(){
    let msDuration = new Date().getTime() - this.state.timerStart;
    let seconds = Math.floor(msDuration / 1000 % 60)
    let minutes = Math.floor(msDuration / 60000);
    console.log(msDuration)
    let timerEl = document.getElementById('timer');
    if(timerEl) timerEl.innerText = `${minutes}:${seconds.toString().length === 1 ? "0" : ""}${seconds}`;
  }

  render(): ReactElement {
    return (
      <>
        <div id="fullBoard">
          <div onClick={()=>this.rotate()} >
            <Board dice={this.state.dice}/>
          </div>
        </div>
        <button onClick={()=>this.toggleMenu()} id="menuButton">|||</button>
        <div id="menu">
          <button id="menuCloseButton" onClick={()=>this.toggleMenu()}>X</button>
          <ul>
            <li><button onClick={()=>window.location.search = ''}>New Board</button></li>
          </ul>
        </div>
        <button onClick={()=>this.setState({timerStart:new Date().getTime()}, ()=>{this.timeTick()}) } id="timer">10:23</button>
      </>
    )
  }
}
