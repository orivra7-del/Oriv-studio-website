const nav=document.getElementById("nav");
window.addEventListener("scroll",()=>nav.classList.toggle("scrolled",scrollY>10));
const menu=document.querySelector(".menu"), links=document.querySelector(".navlinks");
menu?.addEventListener("click",()=>{const open=menu.getAttribute("aria-expanded")==="true";menu.setAttribute("aria-expanded",String(!open));links.style.display=open?"none":"flex";links.style.position="absolute";links.style.top="64px";links.style.left="0";links.style.right="0";links.style.padding="20px";links.style.background="rgba(243,241,235,.98)";links.style.flexDirection="column";links.style.gap="18px"});
