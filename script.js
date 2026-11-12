function munch(){
  const AC = window.AudioContext || window.webkitAudioContext;
  if(!AC) return;
  const ctx = new AC(), t0 = ctx.currentTime + 0.55;
  for(let i = 0; i < 3; i++){
    const t = t0 + i * 0.3;
    const o = ctx.createOscillator(), g = ctx.createGain();
    o.type = 'sawtooth';
    o.frequency.setValueAtTime(220, t);
    o.frequency.exponentialRampToValueAtTime(60, t + 0.15);
    g.gain.setValueAtTime(0.25, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.18);
    o.connect(g).connect(ctx.destination);
    o.start(t); o.stop(t + 0.2);
  }
  const g = t0 + 0.95, o = ctx.createOscillator(), v = ctx.createGain();
  o.type = 'sine';
  o.frequency.setValueAtTime(120, g);
  o.frequency.exponentialRampToValueAtTime(400, g + 0.2);
  v.gain.setValueAtTime(0.3, g);
  v.gain.exponentialRampToValueAtTime(0.001, g + 0.25);
  o.connect(v).connect(ctx.destination);
  o.start(g); o.stop(g + 0.3);
}
document.querySelectorAll('.del-btn').forEach(btn => {
  const label = btn.querySelector('.label');
  let busy = false;
  btn.addEventListener('click', () => {
    if(busy) return;
    busy = true;
    btn.classList.add('eating');
    munch();
    setTimeout(() => {
      label.style.transition = 'none';
      btn.classList.remove('eating');
      label.textContent = 'Deleted ✓';
      label.offsetWidth;
      label.style.transition = '';
      label.animate([{opacity:0},{opacity:1}], 300);
    }, 1700);
    setTimeout(() => { label.textContent = 'Delete'; busy = false; }, 3400);
  });
});
