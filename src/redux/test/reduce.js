const count = (state = 10, action) => {
    if (action.type === 'ADD') {
        state = ++state;
    } else if (action.type === 'MINUS') {
        state = --state;
    }
    return state;
};

export default count
