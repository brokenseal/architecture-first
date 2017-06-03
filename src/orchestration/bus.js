export const getBus = (acceptedMessages = null) => {
    let listeners = [];
    const internalAcceptedMessages = acceptedMessages === null ? null : [...acceptedMessages];

    return {
        sendMessage: (message, payload)=> {
            if (internalAcceptedMessages !== null && internalAcceptedMessages.indexOf(message) === -1) {
                throw new Error(`Message "${message}" not part of the accepted messages for this bus.`);
            }

            listeners.forEach((listener)=> {
                if (listener.messageAcceptedByThisListener !== null
                    && listener.messageAcceptedByThisListener !== message) {
                    return;
                }

                listener(message, payload);
            });
        },
        addListener: (listenerOrMessage, listener = null)=> {
            let messageAcceptedByThisListener = null;

            if (listener === null) {
                listener = listenerOrMessage;
            } else {
                messageAcceptedByThisListener = listenerOrMessage;
            }

            if (listeners.indexOf(listener) !== -1) {
                throw new Error("Listener already added, adding it twice is not allowed.");
            }

            // FIXME: not the best method but effective, let's leave it like this, for now
            listener.messageAcceptedByThisListener = messageAcceptedByThisListener;
            listeners.push(listener);

            return {
                unsubscribe: ()=> {
                    const listenerIndex = listeners.indexOf(listener);

                    if (listenerIndex === -1) {
                        return;
                    }

                    listeners = listeners.slice(0, listenerIndex).concat(listeners.slice(listenerIndex + 1));
                }
            }
        },
        getListeners: ()=> {
            return [...listeners];
        },
        getAcceptedMessages: ()=> {
            if (internalAcceptedMessages === null) {
                return [];
            }

            return [...internalAcceptedMessages];
        }
    }
};
