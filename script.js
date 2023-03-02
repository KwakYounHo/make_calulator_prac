YH = {
  createElement : function (tagName, target, attri, attriValue) {
    const element = document.createElement(tagName);
    target.appendChild(element)
    if (attri !== undefined) {
      element.setAttribute(attri,attriValue);
    }
  },
  numBox : [],
  operate : function (operator) {
    if (operator==='+') {
      result = x + y;
      return result;
    }
    if (operator==='-') {
      result = x - y;
      return result;
    }
    if (operator==='*') {
      result = x * y;
      return result;
    }
    if (operator==='/') {
      result = x / y;
      return result;
    }
  },
  intNumBox : function () {
    if (this.numBox.length === i) {
      printNum.innerText = Number(this.numBox.join(""))
    }
  }
}

/*---------------root 생성-----------------*/
YH.createElement('div',document.body,'id','root');
const root = document.getElementById('root')
// ------------------------------------------


/*--------------영역 3분할-----------------*/
for (i=0; i<3; i++) {
  YH.createElement('div',root)
  if (i===0) {
    document.querySelector('#root>div:nth-child(1)').id = 'monitor'
  } else if (i===1) {
    document.querySelector('#root>div:nth-child(2)').id = 'numPad'
  } else if (i===2) {
    document.querySelector('#root>div:nth-child(3)').id = 'operator'
  }
}
const monitor = document.getElementById('monitor');
const numPad = document.getElementById('numPad');
const operator = document.getElementById('operator');
// -------------------------------------------


/*--------------모니터-----------------*/
YH.createElement('p',monitor);
const printNum = monitor.children[0];
printNum.innerText = Number(YH.numBox.join(""))
// --------------------------------------


/*------------넘버패드------------*/
for (i=0; i<10; i++) {
  YH.createElement('input',numPad,'type','button');
  numPad.children[i].value = i;
  numPad.children[i].addEventListener('click', function() {
    YH.numBox.push(Number(this.value));
    printNum.innerText = Number(YH.numBox.join(""));
  });
}
// ---------------------------------


/*------------연산자--------------*/
for (i=0; i<7; i++) {
  YH.createElement('input',operator,'type','button');
  if (i===0) {
    operator.children[i].value = '+'
  } else if (i===1) {
    operator.children[i].value = '-'
  } else if (i===2) {
    operator.children[i].value = '*'
  } else if (i===3) {
    operator.children[i].value = '/'
  } else if (i===4) {
    operator.children[i].value = 'C'
  } else if (i===5) {
    operator.children[i].value = '←'
  } else if (i===6) {
    operator.children[i].value = '='
  }
  operator.children[i].addEventListener('click', operatorClick)
}

let nowOperator;
let x;
let y;
let result;

function operatorClick() {
  if (this.value === 'C') {
    x = undefined;
    y = undefined;
    nowOperator = undefined;
    result = undefined;
    for (i=0; i<YH.numBox.length;) {
      YH.numBox.pop();
      YH.intNumBox()
    }
  } else if (this.value === '←') {
    YH.numBox.pop()
    printNum.innerText = Number(YH.numBox.join(""))
  } else if (this.value === '=') {
    y = Number(YH.numBox.join(""));
    YH.operate(nowOperator);
    printNum.innerText = Number(result);
  } else {
    if (nowOperator === undefined) {
      nowOperator = this.value;
      for (i=0; i<YH.numBox.length;) {
        YH.numBox.pop();
        YH.intNumBox();
      }
    }
  }
}