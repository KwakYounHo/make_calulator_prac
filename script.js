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
    if (this.numBox.length === 0) {
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
for (i=0; i<3; i++) {
  YH.createElement('p',monitor);
}
const printNum = monitor.children[2];
const printX = monitor.children[0];
const printOperator = monitor.children[1];
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
  if (this.value === 'C') { // 초기화
    x = undefined;
    y = undefined;
    nowOperator = undefined;
    result = undefined;
    for (i=0; i<YH.numBox.length;) {
      YH.numBox.pop();
    }
    YH.intNumBox()
  } else if (this.value === '←') {  // 지우개
    YH.numBox.pop()
    printNum.innerText = Number(YH.numBox.join(""))
  } else if (this.value === '=') {  // 계산
    if (result === undefined) {
      y = Number(YH.numBox.join(""));
    } else {
      x = result;
      result = undefined;
    }
    YH.operate(nowOperator);
    printNum.innerText = Number(result);
    x = undefined;
    for (i=0; i<YH.numBox.length;) {
      YH.numBox.pop();
    }
  } else {                         // 그 외 (사칙연산)
    if (nowOperator === undefined) {  // 최초 클릭 (operator가 없을 때)
      nowOperator = this.value;
      x = Number(printNum.innerText);
      printX.innerText = x;
      printOperator.innerText = nowOperator;
      for (i=0; i<YH.numBox.length;) {
        YH.numBox.pop();
      }
    } else {                        // operator가 있을 때
      if (result === undefined) { // 결과가 없을 때
        if (YH.numBox.length === 0) { // 아무 숫자도 누르지 않았다면
          nowOperator = this.value;
          printOperator.innerText = nowOperator;
        } else {                        // 숫자를 눌렀다면
          y = Number(YH.numBox.join(""));
          YH.operate(nowOperator);
          printNum.innerText = result;
          x = result;
          printX.innerText = x;
          result = undefined;
          for (i=0; i<YH.numBox.length;) {
            YH.numBox.pop();
          }
          nowOperator = this.value;
          printOperator.innerText = nowOperator;
        }
      } else {
        x = result;
        printX.innerText = x;
        result = undefined;
        nowOperator = this.value;
        printOperator.innerText = nowOperator;
      }
    }
  }
}