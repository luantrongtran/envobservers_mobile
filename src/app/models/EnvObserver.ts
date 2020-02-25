import {EnvObserverData} from './EnvObserverData';

export class EnvObserver {
    _id: string;
    name: string;
    data: EnvObserverData[];

    constructor(deviceId: string, deviceName: string) {
        this._id = deviceId;
        this.name = deviceName;
    }
}

