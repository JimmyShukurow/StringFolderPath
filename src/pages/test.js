const toStringChild = (elements, indent = '') => {
  elements.forEach((element) => {
    const icon = element.querySelector('.file-or-folder');
    const iconValue = icon?.querySelector('.q-icon');
    const fileOrFolder = iconValue?.innerHTML;
    const child = element.querySelector('.child');

    result.value += `${indent}&mdash; &nbsp; ${
      element.querySelector('input')?.value
    } `;
    if (fileOrFolder === 'folder') {
      result.value += '/';
    }
    result.value += '<br />';

    if (child && child.querySelectorAll(':scope > .parent').length > 0) {
      var newIndent =
        child.querySelectorAll(':scope > .parent').length > 1
          ? indent + '&nbsp;&nbsp;&nbsp;&nbsp; &#9589;'
          : indent + '&nbsp;&nbsp;&nbsp;&nbsp;';
      toStringChild(child.querySelectorAll(':scope > .parent'), newIndent);
    }
  });

  var stringView = document.querySelector('.string-side');

  if (stringView) {
    stringView.innerHTML = result.value;
  }
};
