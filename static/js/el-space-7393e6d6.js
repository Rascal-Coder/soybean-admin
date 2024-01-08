import{a as N,k as T,l as $,h as v,aO as I,v as A,r as b,an as L,i as d,al as g,I as y,aV as o,aW as C,T as O,e as h,f as Y,d as B,aX as z,aY as R,Y as V}from"./index-8c0aa285.js";const k=N({prefixCls:{type:String}}),P=T({name:"ElSpaceItem",props:k,setup(e,{slots:u}){const p=$("space"),r=v(()=>`${e.prefixCls||p.b()}__item`);return()=>I("div",{class:r.value},A(u,"default"))}}),w={small:8,default:12,large:16};function _(e){const u=$("space"),p=v(()=>[u.b(),u.m(e.direction),e.class]),r=b(0),n=b(0),m=v(()=>{const t=e.wrap||e.fill?{flexWrap:"wrap",marginBottom:`-${n.value}px`}:{},l={alignItems:e.alignment};return[t,l,e.style]}),f=v(()=>{const t={paddingBottom:`${n.value}px`,marginRight:`${r.value}px`},l=e.fill?{flexGrow:1,minWidth:`${e.fillRatio}%`}:{};return[t,l]});return L(()=>{const{size:t="small",wrap:l,direction:i,fill:a}=e;if(d(t)){const[s=0,c=0]=t;r.value=s,n.value=c}else{let s;g(t)?s=t:s=w[t||"small"]||w.small,(l||a)&&i==="horizontal"?r.value=n.value=s:i==="horizontal"?(r.value=s,n.value=0):(n.value=s,r.value=0)}}),{classes:p,containerStyle:m,itemStyle:f}}const j=N({direction:{type:String,values:["horizontal","vertical"],default:"horizontal"},class:{type:h([String,Object,Array]),default:""},style:{type:h([String,Array,Object]),default:""},alignment:{type:h(String),default:"center"},prefixCls:{type:String},spacer:{type:h([Object,String,Number,Array]),default:null,validator:e=>C(e)||g(e)||Y(e)},wrap:Boolean,fill:Boolean,fillRatio:{type:Number,default:100},size:{type:[String,Array,Number],values:B,validator:e=>g(e)||d(e)&&e.length===2&&e.every(g)}}),W=T({name:"ElSpace",props:j,setup(e,{slots:u}){const{classes:p,containerStyle:r,itemStyle:n}=_(e);function m(f,t="",l=[]){const{prefixCls:i}=e;return f.forEach((a,s)=>{z(a)?d(a.children)&&a.children.forEach((c,S)=>{z(c)&&d(c.children)?m(c.children,`${t+S}-`,l):l.push(y(P,{style:n.value,prefixCls:i,key:`nested-${t+S}`},{default:()=>[c]},o.PROPS|o.STYLE,["style","prefixCls"]))}):R(a)&&l.push(y(P,{style:n.value,prefixCls:i,key:`LoopKey${t+s}`},{default:()=>[a]},o.PROPS|o.STYLE,["style","prefixCls"]))}),l}return()=>{var f;const{spacer:t,direction:l}=e,i=A(u,"default",{key:0},()=>[]);if(((f=i.children)!=null?f:[]).length===0)return null;if(d(i.children)){let a=m(i.children);if(t){const s=a.length-1;a=a.reduce((c,S,E)=>{const x=[...c,S];return E!==s&&x.push(y("span",{style:[n.value,l==="vertical"?"width: 100%":null],key:E},[C(t)?t:O(t,o.TEXT)],o.STYLE)),x},[])}return y("div",{class:p.value,style:r.value},a,o.STYLE|o.CLASS)}return i.children}}}),X=V(W);export{X as E};
