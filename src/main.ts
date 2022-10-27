import { template } from './index';

var view = {
  title: {
    name: 'wenhuili',
    age: 24
  },
  calc: function () {
    return 2 + 4;
  },
  stooges: [
    { "name": "Moe" },
    { "name": "Larry" },
    { "name": "Curly" }
  ]
};


const html = template("<p>hello world {{title.name}} {{#stooges}}<b>{{name}} {{title.age}}</b>{{/stooges}}</p>", view);
console.log(html);
