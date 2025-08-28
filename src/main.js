/* Smooth scroll (Lenis) */
const lenis = new Lenis({
  duration: 1.1,
  smoothWheel: true,
  easing: (t) => 1 - Math.pow(1 - t, 3)
});
function raf(time){
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

/* GSAP + ScrollTrigger */
gsap.registerPlugin(ScrollTrigger);

/* Loader */
const loader = document.getElementById('loader');
const loaderBar = document.querySelector('.loader-bar');
let progress = 0;
const loaderInterval = setInterval(()=>{
  progress = Math.min(progress + Math.random() * 12, 100);
  loaderBar.style.width = progress + '%';
  if(progress >= 100){
    clearInterval(loaderInterval);
    loader.style.opacity = '0';
    setTimeout(()=> loader.remove(), 500);
  }
}, 180);

/* Split text utility */
function splitText(selector){
  document.querySelectorAll(selector).forEach((el)=>{
    const words = el.textContent.trim().split(/\s+/);
    el.innerHTML = words.map(w => `<span class="word"><span class="char">${w}</span></span>`).join(' ');
  });
}
splitText('.split');

/* Headline reveal */
gsap.to('.headline .char', {
  y: 0,
  stagger: 0.05,
  ease: 'power3.out',
  duration: 0.8,
  delay: 0.2
});

/* Theme toggle */
const themeToggle = document.getElementById('themeToggle');
let dark = window.matchMedia('(prefers-color-scheme: dark)').matches;
function applyTheme(){
  document.documentElement.style.backgroundColor = getComputedStyle(document.documentElement).getPropertyValue('--bg');
}
themeToggle?.addEventListener('click', ()=>{
  dark = !dark;
  document.documentElement.classList.toggle('light', !dark);
  applyTheme();
});
applyTheme();

/* Projects cards hover parallax */
document.querySelectorAll('.card').forEach((card)=>{
  let hover = false;
  card.addEventListener('pointerenter', ()=> hover = true);
  card.addEventListener('pointerleave', ()=> {hover = false; gsap.to(card, {y:0, rotateX:0, rotateY:0, duration:0.4})});
  card.addEventListener('pointermove', (e)=>{
    if(!hover) return;
    const r = card.getBoundingClientRect();
    const relX = (e.clientX - r.left) / r.width - 0.5;
    const relY = (e.clientY - r.top) / r.height - 0.5;
    gsap.to(card, {y: -4, rotateY: relX * 6, rotateX: -relY * 6, transformPerspective: 600, duration: 0.2});
  });
});

/* Stats counters */
document.querySelectorAll('.num').forEach((el)=>{
  const to = Number(el.dataset.to || '0');
  ScrollTrigger.create({
    trigger: el,
    start: 'top 80%',
    once: true,
    onEnter: ()=>{
      gsap.fromTo(el, {innerText:0}, {innerText: to, duration: 1.8, ease: 'power1.out', snap: {innerText: 1}});
    }
  });
});

/* Section title reveal */
document.querySelectorAll('.section-title').forEach((el)=>{
  const chars = el.querySelectorAll('.char');
  ScrollTrigger.create({
    trigger: el,
    start: 'top 85%',
    onEnter: ()=>{
      gsap.to(chars, {y:0, duration:0.7, ease:'power3.out', stagger:0.03});
    },
    once: true
  });
});

/* Skills badges reveal */
const badges = document.querySelectorAll('.badge');
if(badges.length){
  gsap.set(badges, {y:16, opacity:0});
  ScrollTrigger.batch(badges, {
    start: 'top 90%',
    onEnter: (els)=> gsap.to(els, {y:0, opacity:1, duration:0.5, ease:'power2.out', stagger: {each:0.03, from:'random'}}),
    once: true
  });
}

/* Copy email */
document.getElementById('copyEmail')?.addEventListener('click', async ()=>{
  try{
    await navigator.clipboard.writeText('hello@yourdomain.com');
    const btn = document.getElementById('copyEmail');
    btn.textContent = 'Copied!';
    setTimeout(()=> btn.textContent = 'Copy Email', 1200);
  } catch(err){}
});

/* Year */
const yearEl = document.getElementById('year');
if(yearEl) yearEl.textContent = new Date().getFullYear();


