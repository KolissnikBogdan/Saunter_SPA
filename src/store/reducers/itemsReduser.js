const initialState = [null];

export default function userInfo (state = initialState, action) {
    switch (action.type) {
        case 'ADD_ITEM':
            console.log('Add item text', action.textInfo);
            return state;
        case 'ADD_ITEM_ERROR':
            console.log('Add item text error', action.err);
            return state;
        case 'DELETE_ITEM_SUCCESS':
            console.log('Delete item succes');
            return state;
        case 'DELETE_ITEM_ERROR':
            console.log('Delete item error')
            return state;
        default:
            return state;
    }
}