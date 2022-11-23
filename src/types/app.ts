export interface ILocation {
    pathname: string;
    search: string;
    hash: string;
    state: {
        [key: string]: string;
    };
}

export interface ILocationBackground extends ILocation {
    background: ILocation;
}
