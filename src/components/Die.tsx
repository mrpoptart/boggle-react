import './Die.css'

interface DieProps {
    letter: string;
    deg: number;
}

export default function(props:DieProps){
    let letter = props.letter.toUpperCase();
    let deg = props.deg;
    let lined = false;

    if ("WMZN".split('').indexOf(letter) !== -1) {
        lined = true;
    }

    return (
        <div className={`die`}>
            <div className={`letter ${lined?'lined':''}`} style={{transform: `rotate(${deg}deg)`}}>{letter}</div>
        </div>
    );
}