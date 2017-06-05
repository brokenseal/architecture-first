export const goBackInTime = (history, currentPosition)=>{
    return history[currentPosition-1];
};

export const goForwardInTime = (history, currentPosition)=>{
    return history[currentPosition+1];
};
