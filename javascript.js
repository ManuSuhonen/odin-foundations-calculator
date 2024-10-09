var element = document.querySelector(' … ');
var styles = window.getComputedStyle(element,':after')
var content = styles['content'];

window.getComputedStyle(
    document.querySelector('somedivId'), ':after'
);

window.getSelection().toString()