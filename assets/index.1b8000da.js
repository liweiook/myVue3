import{o as c,c as a,a as u,b as h,d as v,e as y,i as x,f as g,r as P,g as $,h as E,j as L}from"./vendor.7f92ad63.js";const O=function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))t(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&t(o)}).observe(document,{childList:!0,subtree:!0});function s(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerpolicy&&(r.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?r.credentials="include":e.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function t(e){if(e.ep)return;e.ep=!0;const r=s(e);fetch(e.href,r)}};O();const k="modulepreload",l={},A="./",_=function(n,s){return!s||s.length===0?n():Promise.all(s.map(t=>{if(t=`${A}${t}`,t in l)return;l[t]=!0;const e=t.endsWith(".css"),r=e?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${t}"]${r}`))return;const o=document.createElement("link");if(o.rel=e?"stylesheet":k,e||(o.as="script",o.crossOrigin=""),o.href=t,document.head.appendChild(o),e)return new Promise((m,p)=>{o.addEventListener("load",m),o.addEventListener("error",p)})})).then(()=>n())};var d=(i,n)=>{const s=i.__vccOpts||i;for(const[t,e]of n)s[t]=e;return s};const b={},V=u("h1",null,"this is vuex",-1),j=[V];function w(i,n){return c(),a("div",null,j)}var B=d(b,[["render",w]]);const C={},H=u("h1",null,"this is home",-1),N=[H];function R(i,n){return c(),a("div",null,N)}var T=d(C,[["render",R]]);const I=[{path:"/",name:"Home",component:T},{path:"/vuex",name:"Vuex",component:B},{path:"/axios",name:"Axios",component:()=>_(()=>import("./TheAxios.9c6123c6.js"),["assets/TheAxios.9c6123c6.js","assets/vendor.7f92ad63.js"])},{path:"/pinia",name:"Pinia",component:()=>_(()=>import("./ThePinia.2a7a4d48.js"),["assets/ThePinia.2a7a4d48.js","assets/vendor.7f92ad63.js"])}],S=h({history:v(),routes:I});const f=y();f.use(x);const q=g({setup(i){return(n,s)=>{const t=P("router-view");return c(),$(t)}}});E(q).use(f).use(S).use(L).mount("#app");export{d as _};