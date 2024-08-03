

const len = document.querySelector('.len')
const editable = document.querySelector('#editable');
const maxLength = 10;
let isComposing = false;


function truncateText() {
  let text = editable.innerText.replace(/\n/g, ''); // 去掉所有的换行符
  if (text.length > maxLength) {
    editable.innerText = text.substring(0, maxLength);
    moveCursorToEnd(editable);
  }
  setLen();
}

editable.addEventListener('input', function () {
  if (!isComposing) {
    truncateText();
  }
});

editable.addEventListener('compositionstart', function () {
  isComposing = true;
});

editable.addEventListener('compositionend', function () {
  isComposing = false;
  truncateText();
});

function setLen() {
  len.innerText = `当前输入长度：${editable.innerText.length}`;
}

setLen()


function moveCursorToEnd(element) {
  const range = document.createRange();
  const selection = window.getSelection();
  range.selectNodeContents(element);
  range.collapse(false);
  selection.removeAllRanges();
  selection.addRange(range);
};