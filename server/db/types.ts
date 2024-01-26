export type Emploee = {
    code?: number,
    name: string,
    surname: string,
    fathername: string,
}

export type RequestType = {
    id: number,
    name: string,
    weight: number,
}

export type DbRequest = {
    id?: number,
    assigner: number,
    type: RequestType,
    address: string,
}
