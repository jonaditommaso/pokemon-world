export interface FirebaseUser {
    username: string,
    password: string,
}

export interface FirebaseProvidedUser {
    username: string,
    source: string,
    id: string,
}