import {EnvObserverData} from './EnvObserverData';

export class EnvObserver {
    deviceId: string;
    deviceName: string;
    data: EnvObserverData[];

    constructor(deviceId: string, deviceName: string) {
        this.deviceId = deviceId;
        this.deviceName = deviceName;
    }
}

