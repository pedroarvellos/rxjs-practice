import { of, interval } from 'rxjs';
import { map, first, concatAll } from 'rxjs/operators';

/*
    Operators are functions, and there are two kinds of
    operators: pipeable operators and creation operators.
*/

/*
    Pipeable operators:

    The pipeable operators are functions that can be wrapped
    inside the .pipe function, and the behaviour of these
    operators is not to change the existing Observable, but
    return a new one based on the first Observable. In other
    words, the previous Observable will stay unmodified, but
    a updated Observable will be returned.

    In the example above, I am using the function .of, which is
    a creation observable. This function is returning the values
    1, 2 and 3 as emitting observables, one by another. It is like
    emitting three .next functions in a row.

    The function map takes the retuning observable, transforms the
    value of this observable in another one (the value times the value),
    and returns another observable with the new value.

    After this, the subscribe method takes this observable and receives
    this last Observable, logging the result. This action will happen
    3 times, one for the returning number 1, another for the returning number 2
    and another for the returning number 3.

    .pipe is a function to concat other functions,
        pipe make things a bit easier, because you avoid
        wrapping many functions and losing control, like:
        op4()(op3()(op2()(op1()(obs))))

        With pipe it would be something like:
        obs.pipe(
            op1(),
            op2(),
            op3(),
            op3(),
        )

*/

const unorderedListMap = document.getElementById('operators-map-list');
const unorderedListFirst = document.getElementById('operators-first-list');
const numbersByInterval = document.getElementById('operators-interval-list');

map(x => <any>x * <any>x)(of(1, 2, 3)).subscribe(v => {
    const node = document.createElement('li');
    const textNode = document.createTextNode('Value: ' + v);

    node.appendChild(textNode);

    unorderedListMap.appendChild(node)
});

// Using the .pipe function things would get a bit easier
// to understand:
// of(1, 2, 3).pipe(map(x => <any>x * <any>x)).subscribe(v => {
//     ...
// });

/*
    The example below is just like the example above,
    but the function .first instead of take each
    returning Observable, it only takes the first one
    and returns it.
*/

first()(of(1, 2, 3)).subscribe(v => {
    const node = document.createElement('li');
    const textNode = document.createTextNode('First value: ' + v);

    node.appendChild(textNode);

    unorderedListFirst.appendChild(node)
});

/*
    The creation Operators:

    They are functions that can create Observables.
    
    The function below creates one Observable that
    emmits one value in the interval of 5 seconds.
*/

const observable = interval(5000); // in milli

observable.subscribe(x => {
    const node = document.createElement('span');
    const textNode = document.createTextNode(' ' + x);

    node.appendChild(textNode);

    numbersByInterval.appendChild(node)
})

/*
    Even though we have already used the subscription function,
    there are a bunch of important things about them:

    - The way to get the results of an Observable, is executing its
    subscribe property.
    - The subscriptions can be and should be unsubscribed, so it
    cancels the Observable executions.
    - If you have a subscription, you can create a child subscription
    and put it inside the first subscription, so it is possible to cancel
    both, for example: 

    const observable1 = interval(400);
    const observable2 = interval(300);
    
    const subscription = observable1.subscribe(x => console.log('first: ' + x));
    const childSubscription = observable2.subscribe(x => console.log('second: ' + x));
    
    subscription.add(childSubscription);
    
    setTimeout(() => {
    // Unsubscribes BOTH subscription and childSubscription
    subscription.unsubscribe();
    }, 1000);
*/