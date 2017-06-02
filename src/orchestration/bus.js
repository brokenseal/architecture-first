export const getBus = () => {
    let listeners = [];

    return {
        sendMessage: (message, payload)=>{
            listeners.forEach((listener)=>{
                listener(message, payload);
            });
        },
        addListener: (listener)=>{
            if(listeners.indexOf(listener) !== -1){
                throw new Error("Listener already added, adding it twice is not allowed.");
            }

            listeners.push(listener);

            return {
                unsubscribe: ()=>{
                    const listenerIndex = listeners.indexOf(listener);

                    if(listenerIndex === -1){
                        return;
                    }

                    listeners = listeners.slice(0, listenerIndex).concat(listeners.slice(listenerIndex+1));
                }
            }
        },
        getListeners: ()=>{
            return [...listeners];
        }
    }
};
