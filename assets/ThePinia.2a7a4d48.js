import{k as l,f as m,l as i,s as c,o as d,c as p,a,t,u as n,F as f}from"./vendor.7f92ad63.js";const g=l({id:"user",state:()=>({name:"\u5F20\u4E09",age:18,gender:"\u7537"}),actions:{updateName(s){this.name=s}},getters:{fullName:s=>`${s.name}\u4E30`},persist:{enabled:!0,strategies:[{key:"my_user",storage:localStorage,paths:["name","age"]}]}}),_=a("h1",null,"this is pinia",-1),S=m({setup(s){const e=g(),o=i(()=>e.name),{name:r}=c(e);e.updateName("\u674E\u56DB");const{fullName:u}=e;return(h,N)=>(d(),p(f,null,[a("div",null,t(n(e).name),1),a("div",null,t(n(o)),1),a("div",null,t(n(r)),1),a("div",null,t(n(u)),1),_],64))}});export{S as default};
