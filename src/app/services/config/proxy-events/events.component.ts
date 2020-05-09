

export enum ProxyEvents {
    PROXY_UP,
    PROXY_DOWN,
    PROXY_CONNECTED,
    PROXY_DISCONNECTED,

    PROXY_ERROR,
}

export class ProxyEvent {

    constructor(public id: ProxyEvents, public data: any) {

    }
}