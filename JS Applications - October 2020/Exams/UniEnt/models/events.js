export function create(data) {
    return firebase.firestore().collection('events').add(data)
}
export function getAll() {
    return firebase.firestore().collection('events').get()
}
export function get(id) {
    return firebase.firestore().collection('events').doc(id).get()
}
export function close(id) {
    return firebase.firestore().collection('events').doc(id).delete()
}
export function update(id, data) {
    return firebase.firestore().collection('events').doc(id).update(data)
}