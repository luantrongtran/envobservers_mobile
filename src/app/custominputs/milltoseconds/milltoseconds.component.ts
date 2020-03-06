import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
    selector: 'app-mill-to-seconds',
    templateUrl: './milltoseconds.component.html',
    styleUrls: ['./milltoseconds.component.scss'],
})
export class MilltosecondsComponent implements OnInit {

    $value: number;

    @Output()
    eventTriggered = new EventEmitter<{value: number}>();

    @Input()
    set inputValue(value: number) {
        this.$value = Math.round(value / 1000);
    }

    get inputValue() {
        return this.$value;
    }

    constructor() {
    }

    ngOnInit() {
    }

    onValueChanged() {
      this.eventTriggered.emit({value: this.$value});
    }
}
