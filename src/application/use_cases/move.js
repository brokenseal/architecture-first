export const move = (player, squares, position)=>{
    let aMoveHappened = false;

    const newSquares = squares.map((squareValue, index)=>{
        if(position === index && squareValue === null){
            aMoveHappened = true;
            return player;
        }

        return squareValue;
    });

    if(aMoveHappened === false){
        return squares;
    }

    return newSquares;
};

export const calculateWinner = (squares)=>{
    const victories = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],

        [0, 4, 8],
        [2, 4, 6],

        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8]
    ];

    for(let i = 0; i < victories.length; i++){
        let victory = victories[i];
        let row = squares[victory[0]] + squares[victory[1]] + squares[victory[2]];

        if(row === 'XXX'){
            return 'X';
        }

        if(row === 'OOO'){
            return 'O';
        }
    }

    const isDraw = squares.reduce((acc, curr)=>{ return !!acc && !!curr}, true);
    if(isDraw){
        return 'Draw';
    }

    return null;
};
