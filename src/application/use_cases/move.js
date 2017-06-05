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
