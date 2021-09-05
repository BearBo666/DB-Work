export function getToken() {
    return window.localStorage.getItem('token')
}

export function getAuthToken() {
    return window.localStorage.getItem('x-auth-token')
}

export function setToken(token) {
    return window.localStorage.setItem('token', token)
}

export function setAuthToken(token) {
    return window.localStorage.setItem('x-auth-token', token)
}