import { fromEvent } from 'rxjs';
import { scan, throttleTime } from 'rxjs/operators';

/*
    Description:

    When I use the method fromEvent, I automatically create an event, like addEventListner.
    In this case, I am creating an event when the element is clicked, and consequently
    firing one method called scan, which has a behaviour similar to the JS reducer method.

    Scan receives two parameters: one function and one number.
    
    The function receives one parameter, which is the total sum, and adds one more value in
    this sun. The number is the initial value of the parameter, in other words, the total sum.

    This scan returns an observable which can be subscribed by the function "subscribe". This function
    subscribe receives the value of the previous observable, which is the scan's one in this case.
*/

const scanButton = document.getElementById('event-scan-button');
const scanOutput = document.getElementById('event-scan-output')

fromEvent(scanButton, 'click')
    .pipe(scan(count => count + 1, 0))
    .subscribe(count => {
        scanOutput.innerHTML = '';
        scanOutput.innerHTML = scanOutput.innerHTML + count;
    });



/*
    Description:

    The throttleTime function receives as parameter one number that defines the
    period in which this event will be fired.
*/
const throttleButton = document.getElementById('event-throttle-button');
const throttleOutput = document.getElementById('event-throttle-output')

fromEvent(throttleButton, 'click')
    .pipe(
        throttleTime(2000),
        scan(count => count + 1, 0)
    )
    .subscribe(count => {
        throttleOutput.innerHTML = '';
        throttleOutput.innerHTML = throttleOutput.innerHTML + count;
    });