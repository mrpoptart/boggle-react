import {Component, } from 'react'
import { BoardProps, DieInfo } from './App';
import Die from "./Die";


export default class extends Component<BoardProps>{

    dice: Array<DieInfo> = [];

    state = {
        boardClass: 'tall',
    }

    constructor(props:any){
        super(props);
        this.dice = props.dice;
    }

    componentDidMount() {
      window.addEventListener('resize', this.updateDimensions);
      this.updateDimensions();
    }
    componentWillUnmount() {
      window.removeEventListener('resize', this.updateDimensions);
    }

    updateDimensions = ()=>{
        let dim = 'tall';
		if (window.innerWidth / window.innerHeight > 1) {
			dim = 'wide';
		}
        this.setState({
            boardClass: dim,
        });
    }

    render(){
        return (
            <div id='board' className={this.state.boardClass}>
                {this.dice.map((item, i) => {
                    let letter = item.letter;
                    let deg = item.deg;
                    return <Die key={`die${i}`} letter={letter} deg={deg}/>
                })}
            </div>
        )
    }
}