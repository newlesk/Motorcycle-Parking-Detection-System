/*export const createProject = (project) => {
    return (dispatch, getState ,{getFirestore,getFirebase}) => {
        const firestore = getFirestore();
        const profile = getState().firebase.profile;
        firestore.collection('users').add({
            ...project,
            authorFirstName : 'profile.firstName',
            authorLastName : 'profile.lastName',
            authorId : 12345,
            createAt : new Date()


        }).then(()=>{
            dispatch({ type: 'CREATE_PROJECT', project });
        }).catch((err)=>{
            dispatch({ type: 'CREATE_PROJECT_ERROR',err});
        })
        
    }
};*/

export const createProject = (credentials) => {
    return (dispatch, getState, { getFirebase, getFirestore}) => {
        const firebase = getFirebase();
        const firestore = getFirestore();

        firebase.auth().signInWithEmailAndPassword(
            credentials.email,
            credentials.password
        ).then(resp => {
            return firestore.collection('users').doc(resp.user.uid).set({
                firstName: credentials.firstName,
                lastName: credentials.lastName,
                licensePlate: credentials.licensePlate,
                LineNotifyToken: credentials.LineNotifyToken,
                initials: credentials.firstName[0] + credentials.lastName[0] + credentials.licensePlate[0]
            });
        }).then(() => {
            dispatch({ type: 'create_SUCCESS' });
        }).catch((err) => {
            dispatch({ type: 'create_ERROR', err });
        });

    }
}