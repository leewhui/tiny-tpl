# tiny-tpl

一个模板引擎的简易实现，用来个人学习使用

## 解析步骤如下
1. 词法分析，获取每个 token (tokenize)
2. 根据嵌套规则，生成 AST 树 (ast)
3. 根据数据和 生成的 AST 树，渲染为 html 字符串 (render)


```javascript
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


const html = template("<p>hello world {{title.name}} {{#stooges}}<b>{{title.age}}</b>{{#array}}{{$}}{{/array}}{{/stooges}}</p>", view);
console.log(html);
```

以上为测试代码，该模板支持：
1. 对象
2. 数组
3. 函数
4. 函数模板

上述代码生成结果为
```
<p>hello world wenhuili <b>age is 24</b>age is helloworld</p>
```

## 打开方式
1. yarn install
2. yarn dev
3. 打开控制台即可看到输出
