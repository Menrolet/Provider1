export type RequestAnswer = {
    status: number,
    response: any,
}

export type Subscription = {
    element: Element,
    event: string,
    listener: EventListenerOrEventListenerObject
}

export type ReqType = {
    ID: number,
    Name: string,
    Weight: number,
}

export type EmploeeInfo = {
    ID: string,
    Name: string,
    Surname: string,
    Fathername: string,
}

export type RequestInfo = {
    ID: number,
    reqType: ReqType,
    Assigner: EmploeeInfo,
    address: string,
}

export type Listener = () => any;
