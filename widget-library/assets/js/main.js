const list = document.getElementById('component-list');
const iframe = document.getElementById('preview-frame');
const codeBlock = document.querySelector('.code-block');
const codeView = document.getElementById('code-view');
const toggleBtn = document.getElementById('toggle-code');

list.addEventListener('click', e => {
  if (e.target.tagName === 'LI') {
    // highlight
    list.querySelectorAll('li').forEach(li => li.classList.remove('active'));
    e.target.classList.add('active');
    // load component
    const file = e.target.dataset.file;
    iframe.src = `components/${file}`;
    codeBlock.style.display = 'none';
    toggleBtn.textContent = 'Show Code';
  }
});

toggleBtn.addEventListener('click', async () => {
  if (codeBlock.style.display === 'block') {
    codeBlock.style.display = 'none';
    toggleBtn.textContent = 'Show Code';
  } else {
    // fetch the currently loaded component
    const src = iframe.src.split('/').pop();
    const res = await fetch(`components/${src}`);
    const text = await res.text();
    codeView.textContent = text.trim();
    Prism.highlightElement(codeView);
    codeBlock.style.display = 'block';
    toggleBtn.textContent = 'Hide Code';
  }
});

