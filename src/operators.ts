import { of } from 'rxjs';
import { map, first } from 'rxjs/operators';

/*
Operators are functions, and there are two kinds of
operators: pipeable operators and creation operators.

The pipeable operators are functions that can be wrapped
inside the .pipe function, and the behaviour of these
operators is not to change the existing Observable, but
return a new one based on the first Observable. In other
words, the previous Observable will stay unmodified, but
a updated Observable will be returned.

The creation operators will be explained later.

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
*/

const unorderedListMap = document.getElementById('operators-map-list');
const unorderedListFirst = document.getElementById('operators-first-list');

map(x => <any>x * <any>x)(of(1, 2, 3)).subscribe(v => {
    const node = document.createElement('li');
    const textNode = document.createTextNode('Value: ' + v);

    node.appendChild(textNode);

    unorderedListMap.appendChild(node)
});

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