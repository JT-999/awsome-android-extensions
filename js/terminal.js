const lines = [
  { type: 'cmd', text: 'ls extensions/ | head -5' },
  { type: 'out', text: 'uBlock-Origin-Lite' },
  { type: 'out', text: 'AdGuard' },
  { type: 'out', text: '沉浸式翻译' },
  { type: 'out', text: 'Dark-Reader' },
  { type: 'out', text: '...' },
  { type: 'cmd', text: 'ls extensions/ | wc -l' },
  { type: 'out', text: '24' },
  { type: 'cmd', text: 'echo "适用于 Android 浏览器的优质扩展"' },
  { type: 'out', text: '适用于 Android 浏览器的优质扩展' },
];

function typeTerminal() {
  const container = document.getElementById('terminal-output');
  if (!container) return;
  container.innerHTML = '';
  let lineIdx = 0;

  function nextLine() {
    if (lineIdx >= lines.length) {
      setTimeout(() => { container.innerHTML = ''; lineIdx = 0; nextLine(); }, 3000);
      return;
    }
    const line = lines[lineIdx++];
    const div = document.createElement('div');
    div.className = 'line ' + line.type;
    container.appendChild(div);

    if (line.type === 'cmd') {
      let charIdx = 0;
      const timer = setInterval(() => {
        div.textContent = line.text.slice(0, ++charIdx);
        if (charIdx >= line.text.length) {
          clearInterval(timer);
          setTimeout(nextLine, 400);
        }
      }, 45);
    } else {
      div.textContent = line.text;
      setTimeout(nextLine, 300);
    }
  }

  setTimeout(nextLine, 600);
}

document.addEventListener('DOMContentLoaded', typeTerminal);
