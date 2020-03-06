import {EnvObserverData} from './EnvObserverData';

export class EnvObserver {
    _id: string;
    name: string;
    data: EnvObserverData[];
    options: {
        pollingInterval: number,
        timeOffset: string
    } = {
        pollingInterval: 0,
        timeOffset: ''
    };

    constructor(deviceId: string, deviceName: string) {
        this._id = deviceId;
        this.name = deviceName;
    }
}

