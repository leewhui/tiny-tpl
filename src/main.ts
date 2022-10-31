import { template } from './index';

var view = {
  title: {
    name: 'wenhuili',
    age: 24
  },
  calc: function () {
    return 2 + 4;
  },
  array: [
    "hello",
    "world"
  ],
  stooges(age: string) {
    return `age is ${age}`;
  }
};


// const html = template("<p>hello world {{title.name}} {{#stooges}}<b>{{$}} {{title.age}}</b>{{/stooges}}</p>", view);
const html = template("<p>hello world {{title.name}} {{#stooges}}<b>{{title.age}}</b>{{#array}}{{$}}{{/array}}{{/stooges}}</p>", view);
console.log(html);
