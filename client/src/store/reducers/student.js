import state from '../state/student'

export default function studentReducer(preState = state, action) {
    const { type, data } = action
    switch (type) {
        case 'INFO':
            return { ...preState, info: data }
        default:
            return preState
    }
}