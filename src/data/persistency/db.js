export const getDb = ()=> {
    let data;

    // FIXME: not really needed at the moment and actually a very simplistic implementation
    return {
        save: (dataToSave)=> {
            data = dataToSave;
        },
        retrieve: ()=> {
            return data;
        }
    }
};
