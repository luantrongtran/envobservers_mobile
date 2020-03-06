import {async, ComponentFixture, TestBed, getTestBed} from '@angular/core/testing';

import {DevicesService} from './devices.service';
import {HttpClientModule} from '@angular/common/http';
import {HttpClientTestingModule} from '@angular/common/http/testing';

import {EnvObserverData} from '../models/EnvObserverData';

describe('DevicesService', () => {
    let testBed: TestBed;
    let devicesService: DevicesService;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [DevicesService]
        });

        testBed = getTestBed();
        devicesService = testBed.get(DevicesService);
    }));

    it('should be created', () => {
       expect(devicesService).toBeTruthy();
    });

    it ('Should return something', () => {
    });
});
