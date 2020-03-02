import { fromEvent } from 'rxjs';
import { scan } from 'rxjs/operators';

const button = document.querySelector('button');
const countOutput = document.getElementById('count-output')

fromEvent(button, 'click')
    .pipe(scan(count => count + 1, 0))
    .subscribe(count => {
        countOutput.innerHTML = '';
        countOutput.innerHTML = countOutput.innerHTML + count;
    });