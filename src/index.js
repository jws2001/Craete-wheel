
const moveCursorToEnd = (element) => {
    const range = document.createRange();
    const selection = window.getSelection();
    range.selectNodeContents(element);
    range.collapse(false);
    selection.removeAllRanges();
    selection.addRange(range);
  };

const editable = document.querySelector('#editable');

editable.addEventListener('paste', function (event) {
    event.preventDefault();
    const clipboardData = event.clipboardData || window.clipboardData;
    const items = clipboardData.items;

    for (let i = 0; i < items.length; i++) {
      if (items[i].type.indexOf('image') !== -1) {
        const file = items[i].getAsFile();
        const reader = new FileReader();
        reader.onload = function (event) {
          const img = document.createElement('img');
          img.src = event.target.result;
          editable.appendChild(img);
          moveCursorToEnd(editable);
        };
        reader.readAsDataURL(file);
      } else {
        // For other types of content (e.g., text), you can handle them here
        const text = clipboardData.getData('text/plain');
        document.execCommand('insertText', false, text);
      }
    }
  });