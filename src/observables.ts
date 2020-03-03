import { Observable } from 'rxjs';

/*
    Description:

    The Observables follows the Push protocol of how the data flows. In other orders,
    the Observables are functions that produces the data, and "advertises" the
    consumer functions that the data is produces, so the consumer reacts according to
    this information.

    In the example below, the observable produces data, and "advertises" every time
    something is produced. When the observable calls the function .next, it tells the
    consumer, something is ready. So the consumer, which in this case is the .subscribe function,
    reacts to the data it is produced by executing the function .next.

    When the flow is finished in the Observable producer, it executes the funtion
    .complete, so the consumer reacts executing the .complete.
*/

/*
  Why observables over promises?

  Promises handle a single event, it can return resolve or reject. Otherwise,
  the Observables is like a stream, it handles not just a single event, but
  the consumer can receive several emissions from the provider, for example,
  each time the producer fires the .next() method. Furtheremore, the Observable
  can be "cancelable" when using the unsubscribe property.
*/

const unorderedList = document.getElementById('observables-list');
const loading = document.getElementById('observables-loading');

function changeLoadingState(state: string) {
  loading.innerHTML = '';
  loading.innerHTML = loading.innerHTML + state;
}

const observable = new Observable(subscriber => {
  changeLoadingState('loading');
  subscriber.next('First Item');
  subscriber.next('Second Item');
  setTimeout(() => {
    subscriber.next('Third Item');
  }, 1000);
  setTimeout(() => {
    subscriber.next('Fourth Item');
    subscriber.complete();
  }, 2000);
});

observable.subscribe({
  next(x: string) {
    const node = document.createElement('li');
    const textNode = document.createTextNode(x);

    node.appendChild(textNode);

    unorderedList.appendChild(node)
  },
  error(err) {
    console.error('something wrong occurred: ' + err);
  },
  complete() {
    changeLoadingState('complete');
  }
});
