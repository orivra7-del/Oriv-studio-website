const progress=document.querySelector('.progress');
const menu=document.querySelector('.menu');
const mobile=document.querySelector('.mobile-menu');
menu?.addEventListener('click',()=>mobile.classList.toggle('open'));
document.querySelectorAll('.mobile-menu a').forEach(a=>a.addEventListener('click',()=>mobile.classList.remove('open')));

const io=new IntersectionObserver(entries=>{
 entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')});
},{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

window.addEventListener('scroll',()=>{
 const max=document.documentElement.scrollHeight-innerHeight;
 progress.style.width=(max>0?(scrollY/max)*100:0)+'%';
},{passive:true});
