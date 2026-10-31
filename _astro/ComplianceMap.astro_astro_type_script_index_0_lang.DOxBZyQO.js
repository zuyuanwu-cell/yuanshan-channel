var e=new Set,t=!1;function n(t,n,i=2){let o=n&&n.length,s=o?n[0]*i:t.length;e.size&&e.clear();let c=r(t,0,s,i,!0),l=[];if(!c||c.next===c.prev)return l;let u=0,f=0,p=0;if(o&&(c=d(t,n,c,i)),t.length>80*i){u=t[0],f=t[1];let e=u,n=f;for(let r=i;r<s;r+=i){let i=t[r],a=t[r+1];i<u&&(u=i),a<f&&(f=a),i>e&&(e=i),a>n&&(n=a)}p=Math.max(e-u,n-f),p=p===0?0:32767/p}return a(c,l,u,f,p),l}function r(e,t,n,r,i){let a=null;if(i===fe(e,t,n,r)>0)for(let i=t;i<n;i+=r)a=le(i/r|0,e[i],e[i+1],a);else for(let i=n-r;i>=t;i-=r)a=le(i/r|0,e[i],e[i+1],a);return a&&ie(a,a.next)&&(ue(a),a=a.next),a}function i(n,r=n){let i=r===n,a=n,o;do o=!1,a!==a.next&&(e.size===0||!e.has(a))&&(ie(a,a.next)||P(a.prev,a,a.next)===0)?((i||a===r)&&(r=a.prev),t=!0,ue(a),a=a.prev,o=!0):(i||a!==r)&&(a=a.next,o=!i);while(o||a!==r);return r}function a(e,n,r,a,u){u&&j(e,r,a,u);let d=e,f=!1;for(;e.prev!==e.next;){let p=e.prev,m=e.next;if(P(p,e,m)<0&&(u?s(e,r,a,u):o(e)))n.push(p.i,e.i,m.i),ue(e),e=m,d=m;else if(e=m,e===d){if(t=!1,e=i(e),t){d=e;continue}if(!f){e=c(e,n),d=e,f=!0;continue}l(e,n,r,a,u);break}}}function o(e){let t=e.prev,n=e,r=e.next,i=t.x,a=n.x,o=r.x,s=t.y,c=n.y,l=r.y,u=Math.min(i,a,o),d=Math.min(s,c,l),f=Math.max(i,a,o),p=Math.max(s,c,l),m=r.next;for(;m!==t;){if(m.x>=u&&m.x<=f&&m.y>=d&&m.y<=p&&(i!==m.x||s!==m.y)&&N(i,s,a,c,o,l,m.x,m.y)&&P(m.prev,m,m.next)>=0)return!1;m=m.next}return!0}function s(e,t,n,r){let i=e.prev,a=e,o=e.next,s=i.x,c=a.x,l=o.x,u=i.y,d=a.y,f=o.y,p=Math.min(s,c,l),m=Math.min(u,d,f),h=Math.max(s,c,l),g=Math.max(u,d,f),_=te(p,m,t,n,r),v=te(h,g,t,n,r),y=e.prevZ;for(;y&&y.z>=_;){if(y.x>=p&&y.x<=h&&y.y>=m&&y.y<=g&&y!==o&&(s!==y.x||u!==y.y)&&N(s,u,c,d,l,f,y.x,y.y)&&P(y.prev,y,y.next)>=0)return!1;y=y.prevZ}let b=e.nextZ;for(;b&&b.z<=v;){if(b.x>=p&&b.x<=h&&b.y>=m&&b.y<=g&&b!==o&&(s!==b.x||u!==b.y)&&N(s,u,c,d,l,f,b.x,b.y)&&P(b.prev,b,b.next)>=0)return!1;b=b.nextZ}return!0}function c(e,t){let n=e,r=!1;do{let i=n.prev,a=n.next.next;ae(i,n,n.next,a,!1)&&I(i,a)&&I(a,i)&&(t.push(i.i,n.i,a.i),ue(n),ue(n.next),n=e=a,r=!0),n=n.next}while(n!==e);return r?i(n):n}function l(e,t,n,r,o){let s=e;do{let e=s.next.next;for(;e!==s.prev;){if(s.i!==e.i&&re(s,e)){let c=ce(s,e);s=i(s,s.next),c=i(c,c.next),a(s,t,n,r,o),a(c,t,n,r,o);return}e=e.next}s=s.next}while(s!==e)}var u=!1;function d(t,n,a,o){let s=[];for(let i=0,a=n.length;i<a;i++){let c=r(t,n[i]*o,i<a-1?n[i+1]*o:t.length,o,!1);c===c.next&&e.add(c),s.push(ne(c))}s.sort(f),y(t.length/o,n.length),b(a,a),u=!0;for(let e=0;e<s.length;e++)a=p(s[e],a);return u=!1,i(a)}function f(e,t){return e.x-t.x||e.y-t.y||(e.next.y-e.y)/(e.next.x-e.x)-(t.next.y-t.y)/(t.next.x-t.x)}function p(e,t){let n=w(e,t);if(!n)return t;let r=ce(n,e),a=r.next;return b(n,a.next),i(r,r.next),i(n,n.next)}var m=16,h=new Float64Array,g=0,_=[],v=[];function y(e,t){let n=Math.ceil((e+2*t)/m)+t+2;h.length<n*4&&(h=new Float64Array(n*4)),g=0}function b(e,t){let n=e;do{let e=g++;_[e]=n;let r=n.x,i=n.y,a=n.x,o=n.y,s=0;do{let t=n.next;n.z=e,t.x<r&&(r=t.x),t.x>a&&(a=t.x),t.y<i&&(i=t.y),t.y>o&&(o=t.y),n=t}while(++s<m&&n!==t);v[e]=n;let c=e*4;h[c]=r,h[c+1]=i,h[c+2]=a,h[c+3]=o}while(n!==t)}function x(e,t){let n=e.z*4;t.x<h[n]&&(h[n]=t.x),t.y<h[n+1]&&(h[n+1]=t.y),t.x>h[n+2]&&(h[n+2]=t.x),t.y>h[n+3]&&(h[n+3]=t.y)}function S(e){let t=v[e];for(;t.prev.next!==t;)t=t.next;return v[e]=t,t}function C(e){let t=_[e];for(;t.prev.next!==t;)t=t.next;return _[e]=t,t}function w(e,t){let n=t,r=e.x,i=e.y,a=-1/0,o;if(ie(e,n))return n;for(let t=0,s=0;t<g;t++,s+=4){if(i<h[s+1]||i>h[s+3]||h[s]>r||h[s+2]<=a)continue;let c=S(t);n=C(t);do{if(n.prev.next===n){if(ie(e,n.next))return n.next;if(i<=n.y&&i>=n.next.y&&n.next.y!==n.y){let e=n.x+(i-n.y)*(n.next.x-n.x)/(n.next.y-n.y);if(e<=r&&e>a&&(a=e,o=n.x<n.next.x?n:n.next,e===r))return o}}n=n.next}while(n!==c)}if(!o)return null;let s=o.x,c=o.y,l=Math.min(i,c),u=Math.max(i,c),d=1/0;for(let t=0,f=0;t<g;t++,f+=4){if(h[f+2]<s||h[f]>r||h[f+3]<l||h[f+1]>u)continue;let p=S(t);n=C(t);do{if(n.prev.next===n&&r>=n.x&&n.x>=s&&r!==n.x&&N(i<c?r:a,i,s,c,i<c?a:r,i,n.x,n.y)){let t=Math.abs(i-n.y)/(r-n.x);(I(n,e)||n.y===i&&n.next.y===i&&n.next.x>r)&&(t<d||t===d&&(n.x>o.x||n.x===o.x&&T(o,n)))&&(o=n,d=t)}n=n.next}while(n!==p)}return o}function T(e,t){return P(e.prev,e,t.prev)<0&&P(t.next,e,e.next)<0}var E=[],D=[],O=new Uint32Array,k=new Uint32Array,A=new Uint32Array(256);function j(e,t,n,r){let i=e,a=0;do i.z=te(i.x,i.y,t,n,r),E[a++]=i,i=i.next;while(i!==e);ee(a);let o=null;for(let e=0;e<a;e++){let t=E[e];t.prevZ=o,o&&(o.nextZ=t),o=t}o.nextZ=null,E.fill(null,0,a),D.fill(null,0,a)}function ee(e){if(e<=32)for(let t=1;t<e;t++){let e=E[t],n=e.z,r=t-1;for(;r>=0&&E[r].z>n;)E[r+1]=E[r],r--;E[r+1]=e}else{O.length<e&&(O=new Uint32Array(e),k=new Uint32Array(e),D=Array(e));for(let t=0;t<e;t++)O[t]=E[t].z;M(e,E,O,D,k,0),M(e,D,k,E,O,8),M(e,E,O,D,k,16),M(e,D,k,E,O,24)}}function M(e,t,n,r,i,a){A.fill(0);for(let t=0;t<e;t++)A[n[t]>>>a&255]++;let o=0;for(let e=0;e<256;e++){let t=A[e];A[e]=o,o+=t}for(let o=0;o<e;o++){let e=n[o],s=A[e>>>a&255]++;r[s]=t[o],i[s]=e}}function te(e,t,n,r,i){return e=(e-n)*i|0,t=(t-r)*i|0,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,e|t<<1}function ne(e){let t=e,n=e;do(t.x<n.x||t.x===n.x&&t.y<n.y)&&(n=t),t=t.next;while(t!==e);return n}function N(e,t,n,r,i,a,o,s){return(i-o)*(t-s)>=(e-o)*(a-s)&&(e-o)*(r-s)>=(n-o)*(t-s)&&(n-o)*(a-s)>=(i-o)*(r-s)}function re(e,t){let n=ie(e,t)&&P(e.prev,e,e.next)>0&&P(t.prev,t,t.next)>0;return e.next.i!==t.i&&(n||I(e,t)&&I(t,e)&&(P(e.prev,e,t.prev)!==0||P(e,t.prev,t)!==0))&&!oe(e,t)&&(n||se(e,t))}function P(e,t,n){return(t.y-e.y)*(n.x-t.x)-(t.x-e.x)*(n.y-t.y)}function ie(e,t){return e.x===t.x&&e.y===t.y}function ae(e,t,n,r,i=!0){let a=P(e,t,n),o=P(e,t,r),s=P(n,r,e),c=P(n,r,t);return(a>0&&o<0||a<0&&o>0)&&(s>0&&c<0||s<0&&c>0)?!0:i?!!(a===0&&F(e,n,t)||o===0&&F(e,r,t)||s===0&&F(n,e,r)||c===0&&F(n,t,r)):!1}function F(e,t,n){return t.x<=Math.max(e.x,n.x)&&t.x>=Math.min(e.x,n.x)&&t.y<=Math.max(e.y,n.y)&&t.y>=Math.min(e.y,n.y)}function oe(e,t){let n=Math.min(e.x,t.x),r=Math.max(e.x,t.x),i=Math.min(e.y,t.y),a=Math.max(e.y,t.y),o=e;do{let s=o.next;if(o.x>r&&s.x>r||o.x<n&&s.x<n||o.y>a&&s.y>a||o.y<i&&s.y<i)o=s;else{if(o.i!==e.i&&s.i!==e.i&&o.i!==t.i&&s.i!==t.i&&ae(o,s,e,t))return!0;o=s}}while(o!==e);return!1}function I(e,t){return P(e.prev,e,e.next)<0?P(e,t,e.next)>=0&&P(e,e.prev,t)>=0:P(e,t,e.prev)<0||P(e,e.next,t)<0}function se(e,t){let n=e,r=!1,i=(e.x+t.x)/2,a=(e.y+t.y)/2;do{let e=n.next;n.y>a!=e.y>a&&i<(e.x-n.x)*(a-n.y)/(e.y-n.y)+n.x&&(r=!r),n=e}while(n!==e);return r}function ce(e,t){let n=de(e.i,e.x,e.y),r=de(t.i,t.x,t.y),i=e.next,a=t.prev;return e.next=t,t.prev=e,n.next=i,i.prev=n,r.next=n,n.prev=r,a.next=r,r.prev=a,r}function le(e,t,n,r){let i=de(e,t,n);return r?(i.next=r.next,i.prev=r,r.next.prev=i,r.next=i):(i.prev=i,i.next=i),i}function ue(e){e.next.prev=e.prev,e.prev.next=e.next,e.prevZ&&(e.prevZ.nextZ=e.nextZ),e.nextZ&&(e.nextZ.prevZ=e.prevZ),u&&x(e.prev,e.next)}function de(e,t,n){return{i:e,x:t,y:n,prev:null,next:null,z:0,prevZ:null,nextZ:null}}function fe(e,t,n,r){let i=0;for(let a=t,o=n-r;a<n;a+=r)i+=(e[o]-e[a])*(e[a+1]+e[o+1]),o=a;return i}function pe(e){let t=[],n=[],r=e[0][0].length,i=0,a=0;for(let o of e){for(let e of o)for(let n=0;n<r;n++)t.push(e[n]);a&&(i+=a,n.push(i)),a=o.length}return{vertices:t,holes:n,dimensions:r}}var me=1e3,L=1001,he=1002,R=1003,ge=1004,_e=1005,ve=1006,z=1007,ye=1008,B=1009,be=1010,xe=1011,Se=1012,Ce=1013,we=1014,V=1015,Te=1016,Ee=1017,De=1018,Oe=1020,ke=35902,H=35899,U=1021,Ae=1022,je=1023,Me=1026,Ne=1027,Pe=1028,Fe=1029,Ie=1030,Le=1031,Re=1033,ze=33776,Be=33777,Ve=33778,He=33779,Ue=35840,We=35841,Ge=35842,Ke=35843,qe=36196,Je=37492,Ye=37496,Xe=37488,Ze=37489,Qe=37490,$e=37491,et=37808,tt=37809,nt=37810,rt=37811,it=37812,at=37813,ot=37814,st=37815,ct=37816,lt=37817,ut=37818,dt=37819,ft=37820,pt=37821,mt=36492,ht=36494,gt=36495,_t=36283,vt=36284,yt=36285,bt=36286,xt=2300,St=2301,Ct=2302,wt=2303,Tt=2400,Et=2401,Dt=2402,Ot=3200,kt=`srgb`,At=`srgb-linear`,jt=`linear`,Mt=`srgb`,Nt=7680,Pt=35044,Ft=2e3;function It(e){for(let t=e.length-1;t>=0;--t)if(e[t]>=65535)return!0;return!1}function Lt(e){return ArrayBuffer.isView(e)&&!(e instanceof DataView)}function Rt(e){return document.createElementNS(`http://www.w3.org/1999/xhtml`,e)}function zt(){let e=Rt(`canvas`);return e.style.display=`block`,e}var Bt={};function Vt(...e){let t=`THREE.`+e.shift();console.log(t,...e)}function Ht(e){let t=e[0];if(typeof t==`string`&&t.startsWith(`TSL:`)){let t=e[1];t&&t.isStackTrace?e[0]+=` `+t.getLocation():e[1]=`Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.`}return e}function W(...e){e=Ht(e);let t=`THREE.`+e.shift();{let n=e[0];n&&n.isStackTrace?console.warn(n.getError(t)):console.warn(t,...e)}}function G(...e){e=Ht(e);let t=`THREE.`+e.shift();{let n=e[0];n&&n.isStackTrace?console.error(n.getError(t)):console.error(t,...e)}}function Ut(...e){let t=e.join(` `);t in Bt||(Bt[t]=!0,W(...e))}function Wt(e,t,n){return new Promise(function(r,i){function a(){switch(e.clientWaitSync(t,e.SYNC_FLUSH_COMMANDS_BIT,0)){case e.WAIT_FAILED:i();break;case e.TIMEOUT_EXPIRED:setTimeout(a,n);break;default:r()}}setTimeout(a,n)})}var Gt={0:1,2:6,4:7,3:5,1:0,6:2,7:4,5:3},Kt=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){let n=this._listeners;return n!==void 0&&n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){let n=this._listeners;if(n===void 0)return;let r=n[e];if(r!==void 0){let e=r.indexOf(t);e!==-1&&r.splice(e,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let n=t[e.type];if(n!==void 0){e.target=this;let t=n.slice(0);for(let n=0,r=t.length;n<r;n++)t[n].call(this,e);e.target=null}}},qt=`00.01.02.03.04.05.06.07.08.09.0a.0b.0c.0d.0e.0f.10.11.12.13.14.15.16.17.18.19.1a.1b.1c.1d.1e.1f.20.21.22.23.24.25.26.27.28.29.2a.2b.2c.2d.2e.2f.30.31.32.33.34.35.36.37.38.39.3a.3b.3c.3d.3e.3f.40.41.42.43.44.45.46.47.48.49.4a.4b.4c.4d.4e.4f.50.51.52.53.54.55.56.57.58.59.5a.5b.5c.5d.5e.5f.60.61.62.63.64.65.66.67.68.69.6a.6b.6c.6d.6e.6f.70.71.72.73.74.75.76.77.78.79.7a.7b.7c.7d.7e.7f.80.81.82.83.84.85.86.87.88.89.8a.8b.8c.8d.8e.8f.90.91.92.93.94.95.96.97.98.99.9a.9b.9c.9d.9e.9f.a0.a1.a2.a3.a4.a5.a6.a7.a8.a9.aa.ab.ac.ad.ae.af.b0.b1.b2.b3.b4.b5.b6.b7.b8.b9.ba.bb.bc.bd.be.bf.c0.c1.c2.c3.c4.c5.c6.c7.c8.c9.ca.cb.cc.cd.ce.cf.d0.d1.d2.d3.d4.d5.d6.d7.d8.d9.da.db.dc.dd.de.df.e0.e1.e2.e3.e4.e5.e6.e7.e8.e9.ea.eb.ec.ed.ee.ef.f0.f1.f2.f3.f4.f5.f6.f7.f8.f9.fa.fb.fc.fd.fe.ff`.split(`.`),Jt=Math.PI/180,Yt=180/Math.PI;function Xt(){let e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0,r=Math.random()*4294967295|0;return(qt[e&255]+qt[e>>8&255]+qt[e>>16&255]+qt[e>>24&255]+`-`+qt[t&255]+qt[t>>8&255]+`-`+qt[t>>16&15|64]+qt[t>>24&255]+`-`+qt[n&63|128]+qt[n>>8&255]+`-`+qt[n>>16&255]+qt[n>>24&255]+qt[r&255]+qt[r>>8&255]+qt[r>>16&255]+qt[r>>24&255]).toLowerCase()}function K(e,t,n){return Math.max(t,Math.min(n,e))}function Zt(e,t){return(e%t+t)%t}function Qt(e,t,n){return(1-n)*e+n*t}function $t(e,t){switch(t.constructor){case Float32Array:return e;case Uint32Array:return e/4294967295;case Uint16Array:return e/65535;case Uint8Array:case Uint8ClampedArray:return e/255;case Int32Array:return Math.max(e/2147483647,-1);case Int16Array:return Math.max(e/32767,-1);case Int8Array:return Math.max(e/127,-1);default:throw Error(`THREE.MathUtils: Invalid component type.`)}}function en(e,t){switch(t.constructor){case Float32Array:return e;case Uint32Array:return Math.round(e*4294967295);case Uint16Array:return Math.round(e*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(e*255);case Int32Array:return Math.round(e*2147483647);case Int16Array:return Math.round(e*32767);case Int8Array:return Math.round(e*127);default:throw Error(`THREE.MathUtils: Invalid component type.`)}}var q=class e{static{e.prototype.isVector2=!0}constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw Error(`THREE.Vector2: index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw Error(`THREE.Vector2: index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6],this.y=r[1]*t+r[4]*n+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=K(this.x,e.x,t.x),this.y=K(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=K(this.x,e,t),this.y=K(this.y,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(K(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(K(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),r=Math.sin(t),i=this.x-e.x,a=this.y-e.y;return this.x=i*n-a*r+e.x,this.y=i*r+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},tn=class{constructor(e=0,t=0,n=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=r}static slerpFlat(e,t,n,r,i,a,o){let s=n[r+0],c=n[r+1],l=n[r+2],u=n[r+3],d=i[a+0],f=i[a+1],p=i[a+2],m=i[a+3];if(u!==m||s!==d||c!==f||l!==p){let e=s*d+c*f+l*p+u*m;e<0&&(d=-d,f=-f,p=-p,m=-m,e=-e);let t=1-o;if(e<.9995){let n=Math.acos(e),r=Math.sin(n);t=Math.sin(t*n)/r,o=Math.sin(o*n)/r,s=s*t+d*o,c=c*t+f*o,l=l*t+p*o,u=u*t+m*o}else{s=s*t+d*o,c=c*t+f*o,l=l*t+p*o,u=u*t+m*o;let e=1/Math.sqrt(s*s+c*c+l*l+u*u);s*=e,c*=e,l*=e,u*=e}}e[t]=s,e[t+1]=c,e[t+2]=l,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,r,i,a){let o=n[r],s=n[r+1],c=n[r+2],l=n[r+3],u=i[a],d=i[a+1],f=i[a+2],p=i[a+3];return e[t]=o*p+l*u+s*f-c*d,e[t+1]=s*p+l*d+c*u-o*f,e[t+2]=c*p+l*f+o*d-s*u,e[t+3]=l*p-o*u-s*d-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,r){return this._x=e,this._y=t,this._z=n,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,r=e._y,i=e._z,a=e._order,o=Math.cos,s=Math.sin,c=o(n/2),l=o(r/2),u=o(i/2),d=s(n/2),f=s(r/2),p=s(i/2);switch(a){case`XYZ`:this._x=d*l*u+c*f*p,this._y=c*f*u-d*l*p,this._z=c*l*p+d*f*u,this._w=c*l*u-d*f*p;break;case`YXZ`:this._x=d*l*u+c*f*p,this._y=c*f*u-d*l*p,this._z=c*l*p-d*f*u,this._w=c*l*u+d*f*p;break;case`ZXY`:this._x=d*l*u-c*f*p,this._y=c*f*u+d*l*p,this._z=c*l*p+d*f*u,this._w=c*l*u-d*f*p;break;case`ZYX`:this._x=d*l*u-c*f*p,this._y=c*f*u+d*l*p,this._z=c*l*p-d*f*u,this._w=c*l*u+d*f*p;break;case`YZX`:this._x=d*l*u+c*f*p,this._y=c*f*u+d*l*p,this._z=c*l*p-d*f*u,this._w=c*l*u-d*f*p;break;case`XZY`:this._x=d*l*u-c*f*p,this._y=c*f*u-d*l*p,this._z=c*l*p+d*f*u,this._w=c*l*u+d*f*p;break;default:W(`Quaternion: .setFromEuler() encountered an unknown order: `+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,r=Math.sin(n);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],r=t[4],i=t[8],a=t[1],o=t[5],s=t[9],c=t[2],l=t[6],u=t[10],d=n+o+u;if(d>0){let e=.5/Math.sqrt(d+1);this._w=.25/e,this._x=(l-s)*e,this._y=(i-c)*e,this._z=(a-r)*e}else if(n>o&&n>u){let e=2*Math.sqrt(1+n-o-u);this._w=(l-s)/e,this._x=.25*e,this._y=(r+a)/e,this._z=(i+c)/e}else if(o>u){let e=2*Math.sqrt(1+o-n-u);this._w=(i-c)/e,this._x=(r+a)/e,this._y=.25*e,this._z=(s+l)/e}else{let e=2*Math.sqrt(1+u-n-o);this._w=(a-r)/e,this._x=(i+c)/e,this._y=(s+l)/e,this._z=.25*e}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(K(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let r=Math.min(1,t/n);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x*=e,this._y*=e,this._z*=e,this._w*=e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,r=e._y,i=e._z,a=e._w,o=t._x,s=t._y,c=t._z,l=t._w;return this._x=n*l+a*o+r*c-i*s,this._y=r*l+a*s+i*o-n*c,this._z=i*l+a*c+n*s-r*o,this._w=a*l-n*o-r*s-i*c,this._onChangeCallback(),this}slerp(e,t){let n=e._x,r=e._y,i=e._z,a=e._w,o=this.dot(e);o<0&&(n=-n,r=-r,i=-i,a=-a,o=-o);let s=1-t;if(o<.9995){let e=Math.acos(o),c=Math.sin(e);s=Math.sin(s*e)/c,t=Math.sin(t*e)/c,this._x=this._x*s+n*t,this._y=this._y*s+r*t,this._z=this._z*s+i*t,this._w=this._w*s+a*t,this._onChangeCallback()}else this._x=this._x*s+n*t,this._y=this._y*s+r*t,this._z=this._z*s+i*t,this._w=this._w*s+a*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),r=Math.sqrt(1-n),i=Math.sqrt(n);return this.set(r*Math.sin(e),r*Math.cos(e),i*Math.sin(t),i*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},J=class e{static{e.prototype.isVector3=!0}constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw Error(`THREE.Vector3: index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw Error(`THREE.Vector3: index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(rn.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(rn.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,r=this.z,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6]*r,this.y=i[1]*t+i[4]*n+i[7]*r,this.z=i[2]*t+i[5]*n+i[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,r=this.z,i=e.elements,a=1/(i[3]*t+i[7]*n+i[11]*r+i[15]);return this.x=(i[0]*t+i[4]*n+i[8]*r+i[12])*a,this.y=(i[1]*t+i[5]*n+i[9]*r+i[13])*a,this.z=(i[2]*t+i[6]*n+i[10]*r+i[14])*a,this}applyQuaternion(e){let t=this.x,n=this.y,r=this.z,i=e.x,a=e.y,o=e.z,s=e.w,c=2*(a*r-o*n),l=2*(o*t-i*r),u=2*(i*n-a*t);return this.x=t+s*c+a*u-o*l,this.y=n+s*l+o*c-i*u,this.z=r+s*u+i*l-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,r=this.z,i=e.elements;return this.x=i[0]*t+i[4]*n+i[8]*r,this.y=i[1]*t+i[5]*n+i[9]*r,this.z=i[2]*t+i[6]*n+i[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=K(this.x,e.x,t.x),this.y=K(this.y,e.y,t.y),this.z=K(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=K(this.x,e,t),this.y=K(this.y,e,t),this.z=K(this.z,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(K(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,r=e.y,i=e.z,a=t.x,o=t.y,s=t.z;return this.x=r*s-i*o,this.y=i*a-n*s,this.z=n*o-r*a,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return nn.copy(this).projectOnVector(e),this.sub(nn)}reflect(e){return this.sub(nn.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(K(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,r=this.z-e.z;return t*t+n*n+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let r=Math.sin(t)*e;return this.x=r*Math.sin(n),this.y=Math.cos(t)*e,this.z=r*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},nn=new J,rn=new tn,Y=class e{static{e.prototype.isMatrix3=!0}constructor(e,t,n,r,i,a,o,s,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,r,i,a,o,s,c)}set(e,t,n,r,i,a,o,s,c){let l=this.elements;return l[0]=e,l[1]=r,l[2]=o,l[3]=t,l[4]=i,l[5]=s,l[6]=n,l[7]=a,l[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,r=t.elements,i=this.elements,a=n[0],o=n[3],s=n[6],c=n[1],l=n[4],u=n[7],d=n[2],f=n[5],p=n[8],m=r[0],h=r[3],g=r[6],_=r[1],v=r[4],y=r[7],b=r[2],x=r[5],S=r[8];return i[0]=a*m+o*_+s*b,i[3]=a*h+o*v+s*x,i[6]=a*g+o*y+s*S,i[1]=c*m+l*_+u*b,i[4]=c*h+l*v+u*x,i[7]=c*g+l*y+u*S,i[2]=d*m+f*_+p*b,i[5]=d*h+f*v+p*x,i[8]=d*g+f*y+p*S,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8];return t*a*l-t*o*c-n*i*l+n*o*s+r*i*c-r*a*s}invert(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8],u=l*a-o*c,d=o*s-l*i,f=c*i-a*s,p=t*u+n*d+r*f;if(p===0)return this.set(0,0,0,0,0,0,0,0,0);let m=1/p;return e[0]=u*m,e[1]=(r*c-l*n)*m,e[2]=(o*n-r*a)*m,e[3]=d*m,e[4]=(l*t-r*s)*m,e[5]=(r*i-o*t)*m,e[6]=f*m,e[7]=(n*s-c*t)*m,e[8]=(a*t-n*i)*m,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,r,i,a,o){let s=Math.cos(i),c=Math.sin(i);return this.set(n*s,n*c,-n*(s*a+c*o)+a+e,-r*c,r*s,-r*(-c*a+s*o)+o+t,0,0,1),this}scale(e,t){return Ut(`Matrix3: .scale() is deprecated. Use .makeScale() instead.`),this.premultiply(an.makeScale(e,t)),this}rotate(e){return Ut(`Matrix3: .rotate() is deprecated. Use .makeRotation() instead.`),this.premultiply(an.makeRotation(-e)),this}translate(e,t){return Ut(`Matrix3: .translate() is deprecated. Use .makeTranslation() instead.`),this.premultiply(an.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let e=0;e<9;e++)if(t[e]!==n[e])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}},an=new Y,on=new Y().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),sn=new Y().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function cn(){let e={enabled:!0,workingColorSpace:At,spaces:{},convert:function(e,t,n){return this.enabled===!1||t===n||!t||!n||(this.spaces[t].transfer===`srgb`&&(e.r=ln(e.r),e.g=ln(e.g),e.b=ln(e.b)),this.spaces[t].primaries!==this.spaces[n].primaries&&(e.applyMatrix3(this.spaces[t].toXYZ),e.applyMatrix3(this.spaces[n].fromXYZ)),this.spaces[n].transfer===`srgb`&&(e.r=un(e.r),e.g=un(e.g),e.b=un(e.b))),e},workingToColorSpace:function(e,t){return this.convert(e,this.workingColorSpace,t)},colorSpaceToWorking:function(e,t){return this.convert(e,t,this.workingColorSpace)},getPrimaries:function(e){return this.spaces[e].primaries},getTransfer:function(e){return e===``?jt:this.spaces[e].transfer},getToneMappingMode:function(e){return this.spaces[e].outputColorSpaceConfig.toneMappingMode||`standard`},getLuminanceCoefficients:function(e,t=this.workingColorSpace){return e.fromArray(this.spaces[t].luminanceCoefficients)},define:function(e){Object.assign(this.spaces,e)},_getMatrix:function(e,t,n){return e.copy(this.spaces[t].toXYZ).multiply(this.spaces[n].fromXYZ)},_getDrawingBufferColorSpace:function(e){return this.spaces[e].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(e=this.workingColorSpace){return this.spaces[e].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(t,n){return Ut(`ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace().`),e.workingToColorSpace(t,n)},toWorkingColorSpace:function(t,n){return Ut(`ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking().`),e.colorSpaceToWorking(t,n)}},t=[.64,.33,.3,.6,.15,.06],n=[.2126,.7152,.0722],r=[.3127,.329];return e.define({[At]:{primaries:t,whitePoint:r,transfer:jt,toXYZ:on,fromXYZ:sn,luminanceCoefficients:n,workingColorSpaceConfig:{unpackColorSpace:kt},outputColorSpaceConfig:{drawingBufferColorSpace:kt}},[kt]:{primaries:t,whitePoint:r,transfer:Mt,toXYZ:on,fromXYZ:sn,luminanceCoefficients:n,outputColorSpaceConfig:{drawingBufferColorSpace:kt}}}),e}var X=cn();function ln(e){return e<.04045?e*.0773993808:(e*.9478672986+.0521327014)**2.4}function un(e){return e<.0031308?e*12.92:1.055*e**.41666-.055}var dn,fn=class{static getDataURL(e,t=`image/png`){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>`u`)return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{dn===void 0&&(dn=Rt(`canvas`)),dn.width=e.width,dn.height=e.height;let t=dn.getContext(`2d`);e instanceof ImageData?t.putImageData(e,0,0):t.drawImage(e,0,0,e.width,e.height),n=dn}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap){let t=Rt(`canvas`);t.width=e.width,t.height=e.height;let n=t.getContext(`2d`);n.drawImage(e,0,0,e.width,e.height);let r=n.getImageData(0,0,e.width,e.height),i=r.data;for(let e=0;e<i.length;e++)i[e]=ln(i[e]/255)*255;return n.putImageData(r,0,0),t}if(e.data){let t=e.data.slice(0);for(let e=0;e<t.length;e++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[e]=Math.floor(ln(t[e]/255)*255):t[e]=ln(t[e]);return{data:t,width:e.width,height:e.height}}return W(`ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied.`),e}},pn=0,mn=class{constructor(e=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:pn++}),this.uuid=Xt(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<`u`&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<`u`&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t===null?e.set(0,0,0):e.set(t.width,t.height,t.depth||0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e==`string`;if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:``},r=this.data;if(r!==null){let e;if(Array.isArray(r)){e=[];for(let t=0,n=r.length;t<n;t++)r[t].isDataTexture?e.push(hn(r[t].image)):e.push(hn(r[t]))}else e=hn(r);n.url=e}return t||(e.images[this.uuid]=n),n}};function hn(e){return typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap?fn.getDataURL(e):e.data?{data:Array.from(e.data),width:e.width,height:e.height,type:e.data.constructor.name}:(W(`Texture: Unable to serialize Texture.`),{})}var gn=0,_n=new J,vn=class e extends Kt{constructor(t=e.DEFAULT_IMAGE,n=e.DEFAULT_MAPPING,r=L,i=L,a=ve,o=ye,s=je,c=B,l=e.DEFAULT_ANISOTROPY,u=``){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:gn++}),this.uuid=Xt(),this.name=``,this.source=new mn(t),this.mipmaps=[],this.mapping=n,this.channel=0,this.wrapS=r,this.wrapT=i,this.magFilter=a,this.minFilter=o,this.anisotropy=l,this.format=s,this.internalFormat=null,this.type=c,this.offset=new q(0,0),this.repeat=new q(1,1),this.center=new q(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Y,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(_n).x}get height(){return this.source.getSize(_n).y}get depth(){return this.source.getSize(_n).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let n=e[t];if(n===void 0){W(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let r=this[t];r===void 0?W(`Texture.setValues(): property '${t}' does not exist.`):r&&n&&r.isVector2&&n.isVector2||r&&n&&r.isVector3&&n.isVector3||r&&n&&r.isMatrix3&&n.isMatrix3?r.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e==`string`;if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.7,type:`Texture`,generator:`Texture.toJSON`},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:`dispose`})}transformUv(e){if(this.mapping!==300)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case me:e.x-=Math.floor(e.x);break;case L:e.x=e.x<0?0:1;break;case he:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x-=Math.floor(e.x)}if(e.y<0||e.y>1)switch(this.wrapT){case me:e.y-=Math.floor(e.y);break;case L:e.y=e.y<0?0:1;break;case he:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y-=Math.floor(e.y)}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};vn.DEFAULT_IMAGE=null,vn.DEFAULT_MAPPING=300,vn.DEFAULT_ANISOTROPY=1;var yn=class e{static{e.prototype.isVector4=!0}constructor(e=0,t=0,n=0,r=1){this.x=e,this.y=t,this.z=n,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,r){return this.x=e,this.y=t,this.z=n,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw Error(`THREE.Vector4: index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw Error(`THREE.Vector4: index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w===void 0?1:e.w,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,r=this.z,i=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*r+a[12]*i,this.y=a[1]*t+a[5]*n+a[9]*r+a[13]*i,this.z=a[2]*t+a[6]*n+a[10]*r+a[14]*i,this.w=a[3]*t+a[7]*n+a[11]*r+a[15]*i,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,r,i,a=.01,o=.1,s=e.elements,c=s[0],l=s[4],u=s[8],d=s[1],f=s[5],p=s[9],m=s[2],h=s[6],g=s[10];if(Math.abs(l-d)<a&&Math.abs(u-m)<a&&Math.abs(p-h)<a){if(Math.abs(l+d)<o&&Math.abs(u+m)<o&&Math.abs(p+h)<o&&Math.abs(c+f+g-3)<o)return this.set(1,0,0,0),this;t=Math.PI;let e=(c+1)/2,s=(f+1)/2,_=(g+1)/2,v=(l+d)/4,y=(u+m)/4,b=(p+h)/4;return e>s&&e>_?e<a?(n=0,r=.707106781,i=.707106781):(n=Math.sqrt(e),r=v/n,i=y/n):s>_?s<a?(n=.707106781,r=0,i=.707106781):(r=Math.sqrt(s),n=v/r,i=b/r):_<a?(n=.707106781,r=.707106781,i=0):(i=Math.sqrt(_),n=y/i,r=b/i),this.set(n,r,i,t),this}let _=Math.sqrt((h-p)*(h-p)+(u-m)*(u-m)+(d-l)*(d-l));return Math.abs(_)<.001&&(_=1),this.x=(h-p)/_,this.y=(u-m)/_,this.z=(d-l)/_,this.w=Math.acos((c+f+g-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=K(this.x,e.x,t.x),this.y=K(this.y,e.y,t.y),this.z=K(this.z,e.z,t.z),this.w=K(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=K(this.x,e,t),this.y=K(this.y,e,t),this.z=K(this.z,e,t),this.w=K(this.w,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(K(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},bn=class extends Kt{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:ve,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new yn(0,0,e,t),this.scissorTest=!1,this.viewport=new yn(0,0,e,t),this.textures=[];let r=new vn({width:e,height:t,depth:n.depth}),i=n.count;for(let e=0;e<i;e++)this.textures[e]=r.clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveColorBuffer=n.resolveColorBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.storeMultisampledColorBuffer=n.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=n.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=n.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(e={}){let t={minFilter:ve,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let e=0;e<this.textures.length;e++)this.textures[e].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),e!==null&&e.renderTarget===null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let r=0,i=this.textures.length;r<i;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=n,this.textures[r].isData3DTexture!==!0&&(this.textures[r].isArrayTexture=this.textures[r].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let n=Object.assign({},e.textures[t].image);this.textures[t].source=new mn(n)}if(this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveColorBuffer=e.resolveColorBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,this.storeMultisampledColorBuffer=e.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=e.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=e.storeMultisampledStencilBuffer,e.depthTexture!==null){if(e.depthTexture.renderTarget===e){let t=e.depthTexture.clone();t.renderTarget=null,this.depthTexture=t}else this.depthTexture=e.depthTexture}return this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:`dispose`})}},xn=class extends bn{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},Sn=class extends vn{constructor(e=null,t=1,n=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=R,this.minFilter=R,this.wrapR=L,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}},Cn=class extends vn{constructor(e=null,t=1,n=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=R,this.minFilter=R,this.wrapR=L,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}},wn=class e{static{e.prototype.isMatrix4=!0}constructor(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h)}set(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h){let g=this.elements;return g[0]=e,g[4]=t,g[8]=n,g[12]=r,g[1]=i,g[5]=a,g[9]=o,g[13]=s,g[2]=c,g[6]=l,g[10]=u,g[14]=d,g[3]=f,g[7]=p,g[11]=m,g[15]=h,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new e().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();let t=this.elements,n=e.elements,r=1/Tn.setFromMatrixColumn(e,0).length(),i=1/Tn.setFromMatrixColumn(e,1).length(),a=1/Tn.setFromMatrixColumn(e,2).length();return t[0]=n[0]*r,t[1]=n[1]*r,t[2]=n[2]*r,t[3]=0,t[4]=n[4]*i,t[5]=n[5]*i,t[6]=n[6]*i,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,r=e.y,i=e.z,a=Math.cos(n),o=Math.sin(n),s=Math.cos(r),c=Math.sin(r),l=Math.cos(i),u=Math.sin(i);if(e.order===`XYZ`){let e=a*l,n=a*u,r=o*l,i=o*u;t[0]=s*l,t[4]=-s*u,t[8]=c,t[1]=n+r*c,t[5]=e-i*c,t[9]=-o*s,t[2]=i-e*c,t[6]=r+n*c,t[10]=a*s}else if(e.order===`YXZ`){let e=s*l,n=s*u,r=c*l,i=c*u;t[0]=e+i*o,t[4]=r*o-n,t[8]=a*c,t[1]=a*u,t[5]=a*l,t[9]=-o,t[2]=n*o-r,t[6]=i+e*o,t[10]=a*s}else if(e.order===`ZXY`){let e=s*l,n=s*u,r=c*l,i=c*u;t[0]=e-i*o,t[4]=-a*u,t[8]=r+n*o,t[1]=n+r*o,t[5]=a*l,t[9]=i-e*o,t[2]=-a*c,t[6]=o,t[10]=a*s}else if(e.order===`ZYX`){let e=a*l,n=a*u,r=o*l,i=o*u;t[0]=s*l,t[4]=r*c-n,t[8]=e*c+i,t[1]=s*u,t[5]=i*c+e,t[9]=n*c-r,t[2]=-c,t[6]=o*s,t[10]=a*s}else if(e.order===`YZX`){let e=a*s,n=a*c,r=o*s,i=o*c;t[0]=s*l,t[4]=i-e*u,t[8]=r*u+n,t[1]=u,t[5]=a*l,t[9]=-o*l,t[2]=-c*l,t[6]=n*u+r,t[10]=e-i*u}else if(e.order===`XZY`){let e=a*s,n=a*c,r=o*s,i=o*c;t[0]=s*l,t[4]=-u,t[8]=c*l,t[1]=e*u+i,t[5]=a*l,t[9]=n*u-r,t[2]=r*u-n,t[6]=o*l,t[10]=i*u+e}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Dn,e,On)}lookAt(e,t,n){let r=this.elements;return jn.subVectors(e,t),jn.lengthSq()===0&&(jn.z=1),jn.normalize(),kn.crossVectors(n,jn),kn.lengthSq()===0&&(Math.abs(n.z)===1?jn.x+=1e-4:jn.z+=1e-4,jn.normalize(),kn.crossVectors(n,jn)),kn.normalize(),An.crossVectors(jn,kn),r[0]=kn.x,r[4]=An.x,r[8]=jn.x,r[1]=kn.y,r[5]=An.y,r[9]=jn.y,r[2]=kn.z,r[6]=An.z,r[10]=jn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,r=t.elements,i=this.elements,a=n[0],o=n[4],s=n[8],c=n[12],l=n[1],u=n[5],d=n[9],f=n[13],p=n[2],m=n[6],h=n[10],g=n[14],_=n[3],v=n[7],y=n[11],b=n[15],x=r[0],S=r[4],C=r[8],w=r[12],T=r[1],E=r[5],D=r[9],O=r[13],k=r[2],A=r[6],j=r[10],ee=r[14],M=r[3],te=r[7],ne=r[11],N=r[15];return i[0]=a*x+o*T+s*k+c*M,i[4]=a*S+o*E+s*A+c*te,i[8]=a*C+o*D+s*j+c*ne,i[12]=a*w+o*O+s*ee+c*N,i[1]=l*x+u*T+d*k+f*M,i[5]=l*S+u*E+d*A+f*te,i[9]=l*C+u*D+d*j+f*ne,i[13]=l*w+u*O+d*ee+f*N,i[2]=p*x+m*T+h*k+g*M,i[6]=p*S+m*E+h*A+g*te,i[10]=p*C+m*D+h*j+g*ne,i[14]=p*w+m*O+h*ee+g*N,i[3]=_*x+v*T+y*k+b*M,i[7]=_*S+v*E+y*A+b*te,i[11]=_*C+v*D+y*j+b*ne,i[15]=_*w+v*O+y*ee+b*N,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],r=e[8],i=e[12],a=e[1],o=e[5],s=e[9],c=e[13],l=e[2],u=e[6],d=e[10],f=e[14],p=e[3],m=e[7],h=e[11],g=e[15],_=s*f-c*d,v=o*f-c*u,y=o*d-s*u,b=a*f-c*l,x=a*d-s*l,S=a*u-o*l;return t*(m*_-h*v+g*y)-n*(p*_-h*b+g*x)+r*(p*v-m*b+g*S)-i*(p*y-m*x+h*S)}determinantAffine(){let e=this.elements,t=e[0],n=e[4],r=e[8],i=e[1],a=e[5],o=e[9],s=e[2],c=e[6],l=e[10];return t*(a*l-o*c)-n*(i*l-o*s)+r*(i*c-a*s)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8],u=e[9],d=e[10],f=e[11],p=e[12],m=e[13],h=e[14],g=e[15],_=t*o-n*a,v=t*s-r*a,y=t*c-i*a,b=n*s-r*o,x=n*c-i*o,S=r*c-i*s,C=l*m-u*p,w=l*h-d*p,T=l*g-f*p,E=u*h-d*m,D=u*g-f*m,O=d*g-f*h,k=_*O-v*D+y*E+b*T-x*w+S*C;if(k===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let A=1/k;return e[0]=(o*O-s*D+c*E)*A,e[1]=(r*D-n*O-i*E)*A,e[2]=(m*S-h*x+g*b)*A,e[3]=(d*x-u*S-f*b)*A,e[4]=(s*T-a*O-c*w)*A,e[5]=(t*O-r*T+i*w)*A,e[6]=(h*y-p*S-g*v)*A,e[7]=(l*S-d*y+f*v)*A,e[8]=(a*D-o*T+c*C)*A,e[9]=(n*T-t*D-i*C)*A,e[10]=(p*x-m*y+g*_)*A,e[11]=(u*y-l*x-f*_)*A,e[12]=(o*w-a*E-s*C)*A,e[13]=(t*E-n*w+r*C)*A,e[14]=(m*v-p*b-h*_)*A,e[15]=(l*b-u*v+d*_)*A,this}scale(e){let t=this.elements,n=e.x,r=e.y,i=e.z;return t[0]*=n,t[4]*=r,t[8]*=i,t[1]*=n,t[5]*=r,t[9]*=i,t[2]*=n,t[6]*=r,t[10]*=i,t[3]*=n,t[7]*=r,t[11]*=i,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,r))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),r=Math.sin(t),i=1-n,a=e.x,o=e.y,s=e.z,c=i*a,l=i*o;return this.set(c*a+n,c*o-r*s,c*s+r*o,0,c*o+r*s,l*o+n,l*s-r*a,0,c*s-r*o,l*s+r*a,i*s*s+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,r,i,a){return this.set(1,n,i,0,e,1,a,0,t,r,1,0,0,0,0,1),this}compose(e,t,n){let r=this.elements,i=t._x,a=t._y,o=t._z,s=t._w,c=i+i,l=a+a,u=o+o,d=i*c,f=i*l,p=i*u,m=a*l,h=a*u,g=o*u,_=s*c,v=s*l,y=s*u,b=n.x,x=n.y,S=n.z;return r[0]=(1-(m+g))*b,r[1]=(f+y)*b,r[2]=(p-v)*b,r[3]=0,r[4]=(f-y)*x,r[5]=(1-(d+g))*x,r[6]=(h+_)*x,r[7]=0,r[8]=(p+v)*S,r[9]=(h-_)*S,r[10]=(1-(d+m))*S,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,n){let r=this.elements;e.x=r[12],e.y=r[13],e.z=r[14];let i=this.determinantAffine();if(i===0)return n.set(1,1,1),t.identity(),this;let a=Tn.set(r[0],r[1],r[2]).length(),o=Tn.set(r[4],r[5],r[6]).length(),s=Tn.set(r[8],r[9],r[10]).length();i<0&&(a=-a),En.copy(this);let c=1/a,l=1/o,u=1/s;return En.elements[0]*=c,En.elements[1]*=c,En.elements[2]*=c,En.elements[4]*=l,En.elements[5]*=l,En.elements[6]*=l,En.elements[8]*=u,En.elements[9]*=u,En.elements[10]*=u,t.setFromRotationMatrix(En),n.x=a,n.y=o,n.z=s,this}makePerspective(e,t,n,r,i,a,o=Ft,s=!1){let c=this.elements,l=2*i/(t-e),u=2*i/(n-r),d=(t+e)/(t-e),f=(n+r)/(n-r),p,m;if(s)p=i/(a-i),m=a*i/(a-i);else if(o===2e3)p=-(a+i)/(a-i),m=-2*a*i/(a-i);else if(o===2001)p=-a/(a-i),m=-a*i/(a-i);else throw Error(`THREE.Matrix4.makePerspective(): Invalid coordinate system: `+o);return c[0]=l,c[4]=0,c[8]=d,c[12]=0,c[1]=0,c[5]=u,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=p,c[14]=m,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,r,i,a,o=Ft,s=!1){let c=this.elements,l=2/(t-e),u=2/(n-r),d=-(t+e)/(t-e),f=-(n+r)/(n-r),p,m;if(s)p=1/(a-i),m=a/(a-i);else if(o===2e3)p=-2/(a-i),m=-(a+i)/(a-i);else if(o===2001)p=-1/(a-i),m=-i/(a-i);else throw Error(`THREE.Matrix4.makeOrthographic(): Invalid coordinate system: `+o);return c[0]=l,c[4]=0,c[8]=0,c[12]=d,c[1]=0,c[5]=u,c[9]=0,c[13]=f,c[2]=0,c[6]=0,c[10]=p,c[14]=m,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let e=0;e<16;e++)if(t[e]!==n[e])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}},Tn=new J,En=new wn,Dn=new J(0,0,0),On=new J(1,1,1),kn=new J,An=new J,jn=new J,Mn=new wn,Nn=new tn,Pn=class e{constructor(t=0,n=0,r=0,i=e.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=n,this._z=r,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,r=this._order){return this._x=e,this._y=t,this._z=n,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let r=e.elements,i=r[0],a=r[4],o=r[8],s=r[1],c=r[5],l=r[9],u=r[2],d=r[6],f=r[10];switch(t){case`XYZ`:this._y=Math.asin(K(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-l,f),this._z=Math.atan2(-a,i)):(this._x=Math.atan2(d,c),this._z=0);break;case`YXZ`:this._x=Math.asin(-K(l,-1,1)),Math.abs(l)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(s,c)):(this._y=Math.atan2(-u,i),this._z=0);break;case`ZXY`:this._x=Math.asin(K(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(s,i));break;case`ZYX`:this._y=Math.asin(-K(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(s,i)):(this._x=0,this._z=Math.atan2(-a,c));break;case`YZX`:this._z=Math.asin(K(s,-1,1)),Math.abs(s)<.9999999?(this._x=Math.atan2(-l,c),this._y=Math.atan2(-u,i)):(this._x=0,this._y=Math.atan2(o,f));break;case`XZY`:this._z=Math.asin(-K(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(o,i)):(this._x=Math.atan2(-l,f),this._y=0);break;default:W(`Euler: .setFromRotationMatrix() encountered an unknown order: `+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Mn.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Mn,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Nn.setFromEuler(this),this.setFromQuaternion(Nn,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};Pn.DEFAULT_ORDER=`XYZ`;var Fn=class{constructor(){this.mask=1}set(e){this.mask=1<<e>>>0}enable(e){this.mask|=1<<e}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e}disable(e){this.mask&=~(1<<e)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return!!(this.mask&1<<e)}},In=0,Ln=new J,Rn=new tn,zn=new wn,Bn=new J,Vn=new J,Hn=new J,Un=new tn,Wn=new J(1,0,0),Gn=new J(0,1,0),Kn=new J(0,0,1),qn={type:`added`},Jn={type:`removed`},Yn={type:`childadded`,child:null},Xn={type:`childremoved`,child:null},Zn=class e extends Kt{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:In++}),this.uuid=Xt(),this.name=``,this.type=`Object3D`,this.parent=null,this.children=[],this.up=e.DEFAULT_UP.clone();let t=new J,n=new Pn,r=new tn,i=new J(1,1,1);function a(){r.setFromEuler(n,!1)}function o(){n.setFromQuaternion(r,void 0,!1)}n._onChange(a),r._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:n},quaternion:{configurable:!0,enumerable:!0,value:r},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new wn},normalMatrix:{value:new Y}}),this.matrix=new wn,this.matrixWorld=new wn,this.matrixAutoUpdate=e.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=e.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Fn,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Rn.setFromAxisAngle(e,t),this.quaternion.multiply(Rn),this}rotateOnWorldAxis(e,t){return Rn.setFromAxisAngle(e,t),this.quaternion.premultiply(Rn),this}rotateX(e){return this.rotateOnAxis(Wn,e)}rotateY(e){return this.rotateOnAxis(Gn,e)}rotateZ(e){return this.rotateOnAxis(Kn,e)}translateOnAxis(e,t){return Ln.copy(e).applyQuaternion(this.quaternion),this.position.add(Ln.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Wn,e)}translateY(e){return this.translateOnAxis(Gn,e)}translateZ(e){return this.translateOnAxis(Kn,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(zn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Bn.copy(e):Bn.set(e,t,n);let r=this.parent;this.updateWorldMatrix(!0,!1),Vn.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?zn.lookAt(Vn,Bn,this.up):zn.lookAt(Bn,Vn,this.up),this.quaternion.setFromRotationMatrix(zn),r&&(zn.extractRotation(r.matrixWorld),Rn.setFromRotationMatrix(zn),this.quaternion.premultiply(Rn.invert()))}add(e){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return e===this?(G(`Object3D.add: object can't be added as a child of itself.`,e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(qn),Yn.child=e,this.dispatchEvent(Yn),Yn.child=null):G(`Object3D.add: object not an instance of THREE.Object3D.`,e),this)}remove(e){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.remove(arguments[e]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Jn),Xn.child=e,this.dispatchEvent(Xn),Xn.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),zn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),zn.multiply(e.parent.matrixWorld)),e.applyMatrix4(zn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(qn),Yn.child=e,this.dispatchEvent(Yn),Yn.child=null,this}getObjectById(e){return this.getObjectByProperty(`id`,e)}getObjectByName(e){return this.getObjectByProperty(`name`,e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,r=this.children.length;n<r;n++){let r=this.children[n].getObjectByProperty(e,t);if(r!==void 0)return r}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let r=this.children;for(let i=0,a=r.length;i<a;i++)r[i].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Vn,e,Hn),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Vn,Un,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(e){e(this);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let e=this.pivot;if(e!==null){let t=e.x,n=e.y,r=e.z,i=this.matrix.elements;i[12]+=t-i[0]*t-i[4]*n-i[8]*r,i[13]+=n-i[1]*t-i[5]*n-i[9]*r,i[14]+=r-i[2]*t-i[6]*n-i[10]*r}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t,n=!1){let r=this.parent;if(e===!0&&r!==null&&r.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),t===!0){let e=this.children;for(let t=0,r=e.length;t<r;t++)e[t].updateWorldMatrix(!1,!0,n)}}toJSON(e){let t=e===void 0||typeof e==`string`,n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:`Object`,generator:`Object3D.toJSON`});let r={};r.uuid=this.uuid,r.type=this.type,r.name=this.name,r.castShadow=this.castShadow,r.receiveShadow=this.receiveShadow,r.visible=this.visible,r.frustumCulled=this.frustumCulled,r.renderOrder=this.renderOrder,r.static=this.static,r.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.pivot!==null&&(r.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(r.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(r.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(r.type=`InstancedMesh`,r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type=`BatchedMesh`,r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(e=>({...e,boundingBox:e.boundingBox?e.boundingBox.toJSON():void 0,boundingSphere:e.boundingSphere?e.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(e=>({...e})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(e),r.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function i(t,n){return t[n.uuid]===void 0&&(t[n.uuid]=n.toJSON(e)),n.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=i(e.geometries,this.geometry);let t=this.geometry.parameters;if(t!==void 0&&t.shapes!==void 0){let n=t.shapes;if(Array.isArray(n))for(let t=0,r=n.length;t<r;t++){let r=n[t];i(e.shapes,r)}else i(e.shapes,n)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(i(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0){if(Array.isArray(this.material)){let t=[];for(let n=0,r=this.material.length;n<r;n++)t.push(i(e.materials,this.material[n]));r.material=t}else r.material=i(e.materials,this.material)}if(this.children.length>0){r.children=[];for(let t=0;t<this.children.length;t++)r.children.push(this.children[t].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let t=0;t<this.animations.length;t++){let n=this.animations[t];r.animations.push(i(e.animations,n))}}if(t){let t=a(e.geometries),r=a(e.materials),i=a(e.textures),o=a(e.images),s=a(e.shapes),c=a(e.skeletons),l=a(e.animations),u=a(e.nodes);t.length>0&&(n.geometries=t),r.length>0&&(n.materials=r),i.length>0&&(n.textures=i),o.length>0&&(n.images=o),s.length>0&&(n.shapes=s),c.length>0&&(n.skeletons=c),l.length>0&&(n.animations=l),u.length>0&&(n.nodes=u)}return n.object=r,n;function a(e){let t=[];for(let n in e){let r=e[n];delete r.metadata,t.push(r)}return t}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot===null?null:e.pivot.clone(),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let t=0;t<e.children.length;t++){let n=e.children[t];this.add(n.clone())}return this}dispose(){this.dispatchEvent({type:`dispose`})}};Zn.DEFAULT_UP=new J(0,1,0),Zn.DEFAULT_MATRIX_AUTO_UPDATE=!0,Zn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var Qn=class extends Zn{constructor(){super(),this.isGroup=!0,this.type=`Group`}},$n={type:`move`},er=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Qn,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Qn,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new J,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new J),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Qn,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new J,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new J,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:`connected`,data:e}),this}disconnect(e){return this.dispatchEvent({type:`disconnected`,data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let r=null,i=null,a=null,o=this._targetRay,s=this._grip,c=this._hand;if(e&&t.session.visibilityState!==`visible-blurred`){if(c&&e.hand){a=!0;for(let r of e.hand.values()){let e=t.getJointPose(r,n),i=this._getHandJoint(c,r);e!==null&&(i.matrix.fromArray(e.transform.matrix),i.matrix.decompose(i.position,i.rotation,i.scale),i.matrixWorldNeedsUpdate=!0,i.jointRadius=e.radius),i.visible=e!==null}let r=c.joints[`index-finger-tip`],i=c.joints[`thumb-tip`],o=r.position.distanceTo(i.position);c.inputState.pinching&&o>.025?(c.inputState.pinching=!1,this.dispatchEvent({type:`pinchend`,handedness:e.handedness,target:this})):!c.inputState.pinching&&o<=.015&&(c.inputState.pinching=!0,this.dispatchEvent({type:`pinchstart`,handedness:e.handedness,target:this}))}else s!==null&&e.gripSpace&&(i=t.getPose(e.gripSpace,n),i!==null&&(s.matrix.fromArray(i.transform.matrix),s.matrix.decompose(s.position,s.rotation,s.scale),s.matrixWorldNeedsUpdate=!0,i.linearVelocity?(s.hasLinearVelocity=!0,s.linearVelocity.copy(i.linearVelocity)):s.hasLinearVelocity=!1,i.angularVelocity?(s.hasAngularVelocity=!0,s.angularVelocity.copy(i.angularVelocity)):s.hasAngularVelocity=!1,s.eventsEnabled&&s.dispatchEvent({type:`gripUpdated`,data:e,target:this})));o!==null&&(r=t.getPose(e.targetRaySpace,n),r===null&&i!==null&&(r=i),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent($n)))}return o!==null&&(o.visible=r!==null),s!==null&&(s.visible=i!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new Qn;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}},tr={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},nr={h:0,s:0,l:0},rr={h:0,s:0,l:0};function ir(e,t,n){return n<0&&(n+=1),n>1&&--n,n<1/6?e+(t-e)*6*n:n<1/2?t:n<2/3?e+(t-e)*6*(2/3-n):e}var Z=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let t=e;t&&t.isColor?this.copy(t):typeof t==`number`?this.setHex(t):typeof t==`string`&&this.setStyle(t)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=kt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,X.colorSpaceToWorking(this,t),this}setRGB(e,t,n,r=X.workingColorSpace){return this.r=e,this.g=t,this.b=n,X.colorSpaceToWorking(this,r),this}setHSL(e,t,n,r=X.workingColorSpace){if(e=Zt(e,1),t=K(t,0,1),n=K(n,0,1),t===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+t):n+t-n*t,i=2*n-r;this.r=ir(i,r,e+1/3),this.g=ir(i,r,e),this.b=ir(i,r,e-1/3)}return X.colorSpaceToWorking(this,r),this}setStyle(e,t=kt){function n(t){t!==void 0&&parseFloat(t)<1&&W(`Color: Alpha component of `+e+` will be ignored.`)}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let i,a=r[1],o=r[2];switch(a){case`rgb`:case`rgba`:if(i=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(i[4]),this.setRGB(Math.min(255,parseInt(i[1],10))/255,Math.min(255,parseInt(i[2],10))/255,Math.min(255,parseInt(i[3],10))/255,t);if(i=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(i[4]),this.setRGB(Math.min(100,parseInt(i[1],10))/100,Math.min(100,parseInt(i[2],10))/100,Math.min(100,parseInt(i[3],10))/100,t);break;case`hsl`:case`hsla`:if(i=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(i[4]),this.setHSL(parseFloat(i[1])/360,parseFloat(i[2])/100,parseFloat(i[3])/100,t);break;default:W(`Color: Unknown color model `+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){let n=r[1],i=n.length;if(i===3)return this.setRGB(parseInt(n.charAt(0),16)/15,parseInt(n.charAt(1),16)/15,parseInt(n.charAt(2),16)/15,t);if(i===6)return this.setHex(parseInt(n,16),t);W(`Color: Invalid hex color `+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=kt){let n=tr[e.toLowerCase()];return n===void 0?W(`Color: Unknown color `+e):this.setHex(n,t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=ln(e.r),this.g=ln(e.g),this.b=ln(e.b),this}copyLinearToSRGB(e){return this.r=un(e.r),this.g=un(e.g),this.b=un(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=kt){return X.workingToColorSpace(ar.copy(this),e),Math.round(K(ar.r*255,0,255))*65536+Math.round(K(ar.g*255,0,255))*256+Math.round(K(ar.b*255,0,255))}getHexString(e=kt){return(`000000`+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=X.workingColorSpace){X.workingToColorSpace(ar.copy(this),t);let n=ar.r,r=ar.g,i=ar.b,a=Math.max(n,r,i),o=Math.min(n,r,i),s,c,l=(o+a)/2;if(o===a)s=0,c=0;else{let e=a-o;switch(c=l<=.5?e/(a+o):e/(2-a-o),a){case n:s=(r-i)/e+(r<i?6:0);break;case r:s=(i-n)/e+2;break;case i:s=(n-r)/e+4}s/=6}return e.h=s,e.s=c,e.l=l,e}getRGB(e,t=X.workingColorSpace){return X.workingToColorSpace(ar.copy(this),t),e.r=ar.r,e.g=ar.g,e.b=ar.b,e}getStyle(e=kt){X.workingToColorSpace(ar.copy(this),e);let t=ar.r,n=ar.g,r=ar.b;return e===`srgb`?`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(r*255)})`:`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${r.toFixed(3)})`}offsetHSL(e,t,n){return this.getHSL(nr),this.setHSL(nr.h+e,nr.s+t,nr.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(nr),e.getHSL(rr);let n=Qt(nr.h,rr.h,t),r=Qt(nr.s,rr.s,t),i=Qt(nr.l,rr.l,t);return this.setHSL(n,r,i),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,r=this.b,i=e.elements;return this.r=i[0]*t+i[3]*n+i[6]*r,this.g=i[1]*t+i[4]*n+i[7]*r,this.b=i[2]*t+i[5]*n+i[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},ar=new Z;Z.NAMES=tr;var or=class extends Zn{constructor(){super(),this.isScene=!0,this.type=`Scene`,this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Pn,this.environmentIntensity=1,this.environmentRotation=new Pn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`observe`,{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),t.object.backgroundBlurriness=this.backgroundBlurriness,t.object.backgroundIntensity=this.backgroundIntensity,t.object.backgroundRotation=this.backgroundRotation.toArray(),t.object.environmentIntensity=this.environmentIntensity,t.object.environmentRotation=this.environmentRotation.toArray(),t}},sr=new J,cr=new J,lr=new J,ur=new J,dr=new J,fr=new J,pr=new J,mr=new J,hr=new J,gr=new J,_r=new yn,vr=new yn,yr=new yn,br=class e{constructor(e=new J,t=new J,n=new J){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,r){r.subVectors(n,t),sr.subVectors(e,t),r.cross(sr);let i=r.lengthSq();return i>0?r.multiplyScalar(1/Math.sqrt(i)):r.set(0,0,0)}static getBarycoord(e,t,n,r,i){sr.subVectors(r,t),cr.subVectors(n,t),lr.subVectors(e,t);let a=sr.dot(sr),o=sr.dot(cr),s=sr.dot(lr),c=cr.dot(cr),l=cr.dot(lr),u=a*c-o*o;if(u===0)return i.set(0,0,0),null;let d=1/u,f=(c*s-o*l)*d,p=(a*l-o*s)*d;return i.set(1-f-p,p,f)}static containsPoint(e,t,n,r){return this.getBarycoord(e,t,n,r,ur)!==null&&ur.x>=0&&ur.y>=0&&ur.x+ur.y<=1}static getInterpolation(e,t,n,r,i,a,o,s){return this.getBarycoord(e,t,n,r,ur)===null?(s.x=0,s.y=0,`z`in s&&(s.z=0),`w`in s&&(s.w=0),null):(s.setScalar(0),s.addScaledVector(i,ur.x),s.addScaledVector(a,ur.y),s.addScaledVector(o,ur.z),s)}static getInterpolatedAttribute(e,t,n,r,i,a){return _r.setScalar(0),vr.setScalar(0),yr.setScalar(0),_r.fromBufferAttribute(e,t),vr.fromBufferAttribute(e,n),yr.fromBufferAttribute(e,r),a.setScalar(0),a.addScaledVector(_r,i.x),a.addScaledVector(vr,i.y),a.addScaledVector(yr,i.z),a}static isFrontFacing(e,t,n,r){return sr.subVectors(n,t),cr.subVectors(e,t),sr.cross(cr).dot(r)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,r){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,n,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return sr.subVectors(this.c,this.b),cr.subVectors(this.a,this.b),sr.cross(cr).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return e.getNormal(this.a,this.b,this.c,t)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,n){return e.getBarycoord(t,this.a,this.b,this.c,n)}getInterpolation(t,n,r,i,a){return e.getInterpolation(t,this.a,this.b,this.c,n,r,i,a)}containsPoint(t){return e.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return e.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,r=this.b,i=this.c,a,o;dr.subVectors(r,n),fr.subVectors(i,n),mr.subVectors(e,n);let s=dr.dot(mr),c=fr.dot(mr);if(s<=0&&c<=0)return t.copy(n);hr.subVectors(e,r);let l=dr.dot(hr),u=fr.dot(hr);if(l>=0&&u<=l)return t.copy(r);let d=s*u-l*c;if(d<=0&&s>=0&&l<=0)return a=s/(s-l),t.copy(n).addScaledVector(dr,a);gr.subVectors(e,i);let f=dr.dot(gr),p=fr.dot(gr);if(p>=0&&f<=p)return t.copy(i);let m=f*c-s*p;if(m<=0&&c>=0&&p<=0)return o=c/(c-p),t.copy(n).addScaledVector(fr,o);let h=l*p-f*u;if(h<=0&&u-l>=0&&f-p>=0)return pr.subVectors(i,r),o=(u-l)/(u-l+(f-p)),t.copy(r).addScaledVector(pr,o);let g=1/(h+m+d);return a=m*g,o=d*g,t.copy(n).addScaledVector(dr,a).addScaledVector(fr,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},xr=class{constructor(e=new J(1/0,1/0,1/0),t=new J(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Cr.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Cr.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=Cr.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let r=n.getAttribute(`position`);if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let t=0,n=r.count;t<n;t++)e.isMesh===!0?e.getVertexPosition(t,Cr):Cr.fromBufferAttribute(r,t),Cr.applyMatrix4(e.matrixWorld),this.expandByPoint(Cr);else e.boundingBox===void 0?(n.boundingBox===null&&n.computeBoundingBox(),wr.copy(n.boundingBox)):(e.boundingBox===null&&e.computeBoundingBox(),wr.copy(e.boundingBox)),wr.applyMatrix4(e.matrixWorld),this.union(wr)}let r=e.children;for(let e=0,n=r.length;e<n;e++)this.expandByObject(r[e],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Cr),Cr.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(jr),Mr.subVectors(this.max,jr),Tr.subVectors(e.a,jr),Er.subVectors(e.b,jr),Dr.subVectors(e.c,jr),Or.subVectors(Er,Tr),kr.subVectors(Dr,Er),Ar.subVectors(Tr,Dr);let t=[0,-Or.z,Or.y,0,-kr.z,kr.y,0,-Ar.z,Ar.y,Or.z,0,-Or.x,kr.z,0,-kr.x,Ar.z,0,-Ar.x,-Or.y,Or.x,0,-kr.y,kr.x,0,-Ar.y,Ar.x,0];return!Fr(t,Tr,Er,Dr,Mr)||(t=[1,0,0,0,1,0,0,0,1],!Fr(t,Tr,Er,Dr,Mr))?!1:(Nr.crossVectors(Or,kr),t=[Nr.x,Nr.y,Nr.z],Fr(t,Tr,Er,Dr,Mr))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Cr).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Cr).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()||(Sr[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Sr[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Sr[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Sr[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Sr[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Sr[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Sr[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Sr[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Sr)),this}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},Sr=[new J,new J,new J,new J,new J,new J,new J,new J],Cr=new J,wr=new xr,Tr=new J,Er=new J,Dr=new J,Or=new J,kr=new J,Ar=new J,jr=new J,Mr=new J,Nr=new J,Pr=new J;function Fr(e,t,n,r,i){for(let a=0,o=e.length-3;a<=o;a+=3){Pr.fromArray(e,a);let o=i.x*Math.abs(Pr.x)+i.y*Math.abs(Pr.y)+i.z*Math.abs(Pr.z),s=t.dot(Pr),c=n.dot(Pr),l=r.dot(Pr);if(Math.max(-Math.max(s,c,l),Math.min(s,c,l))>o)return!1}return!0}var Ir=new J,Lr=new q,Rr=0,zr=class extends Kt{constructor(e,t,n=!1){if(super(),Array.isArray(e))throw TypeError(`THREE.BufferAttribute: array should be a Typed Array.`);this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Rr++}),this.name=``,this.array=e,this.itemSize=t,this.count=e===void 0?0:e.length/t,this.normalized=n,this.usage=Pt,this.updateRanges=[],this.gpuType=V,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let r=0,i=this.itemSize;r<i;r++)this.array[e+r]=t.array[n+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Lr.fromBufferAttribute(this,t),Lr.applyMatrix3(e),this.setXY(t,Lr.x,Lr.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)Ir.fromBufferAttribute(this,t),Ir.applyMatrix3(e),this.setXYZ(t,Ir.x,Ir.y,Ir.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)Ir.fromBufferAttribute(this,t),Ir.applyMatrix4(e),this.setXYZ(t,Ir.x,Ir.y,Ir.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Ir.fromBufferAttribute(this,t),Ir.applyNormalMatrix(e),this.setXYZ(t,Ir.x,Ir.y,Ir.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Ir.fromBufferAttribute(this,t),Ir.transformDirection(e),this.setXYZ(t,Ir.x,Ir.y,Ir.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=$t(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=en(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=$t(t,this.array)),t}setX(e,t){return this.normalized&&(t=en(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=$t(t,this.array)),t}setY(e,t){return this.normalized&&(t=en(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=$t(t,this.array)),t}setZ(e,t){return this.normalized&&(t=en(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=$t(t,this.array)),t}setW(e,t){return this.normalized&&(t=en(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=en(t,this.array),n=en(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,r){return e*=this.itemSize,this.normalized&&(t=en(t,this.array),n=en(n,this.array),r=en(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this}setXYZW(e,t,n,r,i){return e*=this.itemSize,this.normalized&&(t=en(t,this.array),n=en(n,this.array),r=en(r,this.array),i=en(i,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this.array[e+3]=i,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return e.name=this.name,e.usage=this.usage,e.gpuType=this.gpuType,e}dispose(){this.dispatchEvent({type:`dispose`})}},Br=class extends zr{constructor(e,t,n){super(new Uint16Array(e),t,n)}},Vr=class extends zr{constructor(e,t,n){super(new Uint32Array(e),t,n)}},Hr=class extends zr{constructor(e,t,n){super(new Float32Array(e),t,n)}},Ur=new xr,Wr=new J,Gr=new J,Kr=class{constructor(e=new J,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t===void 0?Ur.setFromPoints(e).getCenter(n):n.copy(t);let r=0;for(let t=0,i=e.length;t<i;t++)r=Math.max(r,n.distanceToSquared(e[t]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius*=e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Wr.subVectors(e,this.center);let t=Wr.lengthSq();if(t>this.radius*this.radius){let e=Math.sqrt(t),n=(e-this.radius)*.5;this.center.addScaledVector(Wr,n/e),this.radius+=n}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Gr.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Wr.copy(e.center).add(Gr)),this.expandByPoint(Wr.copy(e.center).sub(Gr))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},qr=0,Jr=new wn,Yr=new Zn,Xr=new J,Zr=new xr,Qr=new xr,$r=new J,ei=class e extends Kt{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:qr++}),this.uuid=Xt(),this.name=``,this.type=`BufferGeometry`,this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return this.index=Array.isArray(e)?new(It(e)?Vr:Br)(e,1):e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let t=new Y().getNormalMatrix(e);n.applyNormalMatrix(t),n.needsUpdate=!0}let r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return Jr.makeRotationFromQuaternion(e),this.applyMatrix4(Jr),this}rotateX(e){return Jr.makeRotationX(e),this.applyMatrix4(Jr),this}rotateY(e){return Jr.makeRotationY(e),this.applyMatrix4(Jr),this}rotateZ(e){return Jr.makeRotationZ(e),this.applyMatrix4(Jr),this}translate(e,t,n){return Jr.makeTranslation(e,t,n),this.applyMatrix4(Jr),this}scale(e,t,n){return Jr.makeScale(e,t,n),this.applyMatrix4(Jr),this}lookAt(e){return Yr.lookAt(e),Yr.updateMatrix(),this.applyMatrix4(Yr.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Xr).negate(),this.translate(Xr.x,Xr.y,Xr.z),this}setFromPoints(e){let t=this.getAttribute(`position`);if(t===void 0){let t=[];for(let n=0,r=e.length;n<r;n++){let r=e[n];t.push(r.x,r.y,r.z||0)}this.setAttribute(`position`,new Hr(t,3))}else{let n=Math.min(e.length,t.count);for(let r=0;r<n;r++){let n=e[r];t.setXYZ(r,n.x,n.y,n.z||0)}e.length>t.count&&W(`BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry.`),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new xr);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute)G(`BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.`,this),this.boundingBox.set(new J(-1/0,-1/0,-1/0),new J(1/0,1/0,1/0));else{if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let e=0,n=t.length;e<n;e++){let n=t[e];Zr.setFromBufferAttribute(n),this.morphTargetsRelative?($r.addVectors(this.boundingBox.min,Zr.min),this.boundingBox.expandByPoint($r),$r.addVectors(this.boundingBox.max,Zr.max),this.boundingBox.expandByPoint($r)):(this.boundingBox.expandByPoint(Zr.min),this.boundingBox.expandByPoint(Zr.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&G(`BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.`,this)}}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Kr);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute)G(`BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.`,this),this.boundingSphere.set(new J,1/0);else if(e){let n=this.boundingSphere.center;if(Zr.setFromBufferAttribute(e),t)for(let e=0,n=t.length;e<n;e++){let n=t[e];Qr.setFromBufferAttribute(n),this.morphTargetsRelative?($r.addVectors(Zr.min,Qr.min),Zr.expandByPoint($r),$r.addVectors(Zr.max,Qr.max),Zr.expandByPoint($r)):(Zr.expandByPoint(Qr.min),Zr.expandByPoint(Qr.max))}Zr.getCenter(n);let r=0;for(let t=0,i=e.count;t<i;t++)$r.fromBufferAttribute(e,t),r=Math.max(r,n.distanceToSquared($r));if(t)for(let i=0,a=t.length;i<a;i++){let a=t[i],o=this.morphTargetsRelative;for(let t=0,i=a.count;t<i;t++)$r.fromBufferAttribute(a,t),o&&(Xr.fromBufferAttribute(e,t),$r.add(Xr)),r=Math.max(r,n.distanceToSquared($r))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&G(`BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.`,this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){G(`BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)`);return}let n=t.position,r=t.normal,i=t.uv,a=this.getAttribute(`tangent`);(a===void 0||a.count!==n.count)&&(a=new zr(new Float32Array(4*n.count),4),this.setAttribute(`tangent`,a));let o=[],s=[];for(let e=0;e<n.count;e++)o[e]=new J,s[e]=new J;let c=new J,l=new J,u=new J,d=new q,f=new q,p=new q,m=new J,h=new J;function g(e,t,r){c.fromBufferAttribute(n,e),l.fromBufferAttribute(n,t),u.fromBufferAttribute(n,r),d.fromBufferAttribute(i,e),f.fromBufferAttribute(i,t),p.fromBufferAttribute(i,r),l.sub(c),u.sub(c),f.sub(d),p.sub(d);let a=1/(f.x*p.y-p.x*f.y);isFinite(a)&&(m.copy(l).multiplyScalar(p.y).addScaledVector(u,-f.y).multiplyScalar(a),h.copy(u).multiplyScalar(f.x).addScaledVector(l,-p.x).multiplyScalar(a),o[e].add(m),o[t].add(m),o[r].add(m),s[e].add(h),s[t].add(h),s[r].add(h))}let _=this.groups;_.length===0&&(_=[{start:0,count:e.count}]);for(let t=0,n=_.length;t<n;++t){let n=_[t],r=n.start,i=n.count;for(let t=r,n=r+i;t<n;t+=3)g(e.getX(t+0),e.getX(t+1),e.getX(t+2))}let v=new J,y=new J,b=new J,x=new J;function S(e){b.fromBufferAttribute(r,e),x.copy(b);let t=o[e];v.copy(t),v.sub(b.multiplyScalar(b.dot(t))).normalize(),y.crossVectors(x,t);let n=y.dot(s[e])<0?-1:1;a.setXYZW(e,v.x,v.y,v.z,n)}for(let t=0,n=_.length;t<n;++t){let n=_[t],r=n.start,i=n.count;for(let t=r,n=r+i;t<n;t+=3)S(e.getX(t+0)),S(e.getX(t+1)),S(e.getX(t+2))}this._transformed=!0}computeVertexNormals(){let e=this.index,t=this.getAttribute(`position`);if(t!==void 0){let n=this.getAttribute(`normal`);if(n===void 0||n.count!==t.count)n=new zr(new Float32Array(t.count*3),3),this.setAttribute(`normal`,n);else for(let e=0,t=n.count;e<t;e++)n.setXYZ(e,0,0,0);let r=new J,i=new J,a=new J,o=new J,s=new J,c=new J,l=new J,u=new J;if(e)for(let d=0,f=e.count;d<f;d+=3){let f=e.getX(d+0),p=e.getX(d+1),m=e.getX(d+2);r.fromBufferAttribute(t,f),i.fromBufferAttribute(t,p),a.fromBufferAttribute(t,m),l.subVectors(a,i),u.subVectors(r,i),l.cross(u),o.fromBufferAttribute(n,f),s.fromBufferAttribute(n,p),c.fromBufferAttribute(n,m),o.add(l),s.add(l),c.add(l),n.setXYZ(f,o.x,o.y,o.z),n.setXYZ(p,s.x,s.y,s.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let e=0,o=t.count;e<o;e+=3)r.fromBufferAttribute(t,e+0),i.fromBufferAttribute(t,e+1),a.fromBufferAttribute(t,e+2),l.subVectors(a,i),u.subVectors(r,i),l.cross(u),n.setXYZ(e+0,l.x,l.y,l.z),n.setXYZ(e+1,l.x,l.y,l.z),n.setXYZ(e+2,l.x,l.y,l.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)$r.fromBufferAttribute(e,t),$r.normalize(),e.setXYZ(t,$r.x,$r.y,$r.z)}toNonIndexed(){function t(e,t){let n=e.array,r=e.itemSize,i=e.normalized,a=new n.constructor(t.length*r),o=0,s=0;for(let i=0,c=t.length;i<c;i++){o=e.isInterleavedBufferAttribute?t[i]*e.data.stride+e.offset:t[i]*r;for(let e=0;e<r;e++)a[s++]=n[o++]}return new zr(a,r,i)}if(this.index===null)return W(`BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed.`),this;let n=new e,r=this.index.array,i=this.attributes;for(let e in i){let a=i[e],o=t(a,r);n.setAttribute(e,o)}let a=this.morphAttributes;for(let e in a){let i=[],o=a[e];for(let e=0,n=o.length;e<n;e++){let n=o[e],a=t(n,r);i.push(a)}n.morphAttributes[e]=i}n.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let e=0,t=o.length;e<t;e++){let t=o[e];n.addGroup(t.start,t.count,t.materialIndex)}return n}toJSON(){let e={metadata:{version:4.7,type:`BufferGeometry`,generator:`BufferGeometry.toJSON`}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?`BufferGeometry`:this.type,e.name=this.name,Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let t=this.parameters;for(let n in t)t[n]!==void 0&&(e[n]=t[n]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let t in n){let r=n[t];e.data.attributes[t]=r.toJSON(e.data)}let r={},i=!1;for(let t in this.morphAttributes){let n=this.morphAttributes[t],a=[];for(let t=0,r=n.length;t<r;t++){let r=n[t];a.push(r.toJSON(e.data))}a.length>0&&(r[t]=a,i=!0)}i&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone());let r=e.attributes;for(let e in r){let n=r[e];this.setAttribute(e,n.clone(t))}let i=e.morphAttributes;for(let e in i){let n=[],r=i[e];for(let e=0,i=r.length;e<i;e++)n.push(r[e].clone(t));this.morphAttributes[e]=n}this.morphTargetsRelative=e.morphTargetsRelative;let a=e.groups;for(let e=0,t=a.length;e<t;e++){let t=a[e];this.addGroup(t.start,t.count,t.materialIndex)}let o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());let s=e.boundingSphere;return s!==null&&(this.boundingSphere=s.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:`dispose`})}},ti=new J,ni=new J,ri=new Y,ii=class{constructor(e=new J(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,r){return this.normal.set(e,t,n),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let r=ti.subVectors(n,t).cross(ni.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,n=!0){let r=e.delta(ti),i=this.normal.dot(r);if(i===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let a=-(e.start.dot(this.normal)+this.constant)/i;return n===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(r,a)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||ri.getNormalMatrix(e),r=this.coplanarPoint(ti).applyMatrix4(e),i=this.normal.applyMatrix3(n).normalize();return this.constant=-r.dot(i),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(e){return this.normal.fromArray(e.normal),this.constant=e.constant,this}},ai=0,oi=class extends Kt{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:ai++}),this.uuid=Xt(),this.name=``,this.type=`Material`,this.blending=1,this.side=0,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=204,this.blendDst=205,this.blendEquation=100,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Z(0,0,0),this.blendAlpha=0,this.depthFunc=3,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=519,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Nt,this.stencilZFail=Nt,this.stencilZPass=Nt,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){W(`Material: parameter '${t}' has value of undefined.`);continue}let r=this[t];r===void 0?W(`Material: '${t}' is not a property of THREE.${this.type}.`):r&&r.isColor?r.set(n):r&&r.isVector2&&n&&n.isVector2||r&&r.isEuler&&n&&n.isEuler||r&&r.isVector3&&n&&n.isVector3?r.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e==`string`;t&&(e={textures:{},images:{}});let n={metadata:{version:4.7,type:`Material`,generator:`Material.toJSON`}};n.uuid=this.uuid,n.type=this.type,n.blending=this.blending,n.side=this.side,n.shadowSide=this.shadowSide,n.vertexColors=this.vertexColors,n.opacity=this.opacity,n.transparent=this.transparent,n.blendSrc=this.blendSrc,n.blendDst=this.blendDst,n.blendEquation=this.blendEquation,n.blendSrcAlpha=this.blendSrcAlpha,n.blendDstAlpha=this.blendDstAlpha,n.blendEquationAlpha=this.blendEquationAlpha,n.blendColor=this.blendColor.getHex(),n.blendAlpha=this.blendAlpha,n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.clipIntersection=this.clipIntersection,n.clipShadows=this.clipShadows,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,n.stencilWrite=this.stencilWrite,n.polygonOffset=this.polygonOffset,n.polygonOffsetFactor=this.polygonOffsetFactor,n.polygonOffsetUnits=this.polygonOffsetUnits,n.dithering=this.dithering,n.alphaTest=this.alphaTest,n.alphaHash=this.alphaHash,n.alphaToCoverage=this.alphaToCoverage,n.premultipliedAlpha=this.premultipliedAlpha,n.forceSinglePass=this.forceSinglePass,n.allowOverride=this.allowOverride,n.visible=this.visible,n.toneMapped=this.toneMapped,n.name=this.name,this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(n.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(n.clippingPlanes=this.clippingPlanes.map(e=>e.toJSON())),this.rotation!==void 0&&(n.rotation=this.rotation),this.depthPacking!==void 0&&(n.depthPacking=this.depthPacking),this.linewidth!==void 0&&(n.linewidth=this.linewidth),this.linecap!==void 0&&(n.linecap=this.linecap),this.linejoin!==void 0&&(n.linejoin=this.linejoin),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.wireframe!==void 0&&(n.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(n.flatShading=this.flatShading),this.fog!==void 0&&(n.fog=this.fog),Object.keys(this.userData).length>0&&(n.userData=this.userData);function r(e){let t=[];for(let n in e){let r=e[n];delete r.metadata,t.push(r)}return t}if(t){let t=r(e.textures),i=r(e.images);t.length>0&&(n.textures=t),i.length>0&&(n.images=i)}return n}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new Z().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.retroreflectivity!==void 0&&(this.retroreflectivity=e.retroreflectivity),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.clippingPlanes!==void 0&&(this.clippingPlanes=e.clippingPlanes.map(e=>new ii().fromJSON(e))),e.clipIntersection!==void 0&&(this.clipIntersection=e.clipIntersection),e.clipShadows!==void 0&&(this.clipShadows=e.clipShadows),e.depthPacking!==void 0&&(this.depthPacking=e.depthPacking),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.linecap!==void 0&&(this.linecap=e.linecap),e.linejoin!==void 0&&(this.linejoin=e.linejoin),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(this.vertexColors=typeof e.vertexColors==`number`?e.vertexColors>0:e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let t=e.normalScale;Array.isArray(t)===!1&&(t=[t,t]),this.normalScale=new q().fromArray(t)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new q().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let e=t.length;n=Array(e);for(let r=0;r!==e;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:`dispose`})}set needsUpdate(e){e===!0&&this.version++}},si=new J,ci=new J,li=new J,ui=new J,di=class{constructor(e=new J,t=new J(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,si)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=si.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(si.copy(this.origin).addScaledVector(this.direction,t),si.distanceToSquared(e))}distanceSqToSegment(e,t,n,r){ci.copy(e).add(t).multiplyScalar(.5),li.copy(t).sub(e).normalize(),ui.copy(this.origin).sub(ci);let i=e.distanceTo(t)*.5,a=-this.direction.dot(li),o=ui.dot(this.direction),s=-ui.dot(li),c=ui.lengthSq(),l=Math.abs(1-a*a),u,d,f,p;if(l>0){if(u=a*s-o,d=a*o-s,p=i*l,u>=0){if(d>=-p){if(d<=p){let e=1/l;u*=e,d*=e,f=u*(u+a*d+2*o)+d*(a*u+d+2*s)+c}else d=i,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*s)+c}else d=-i,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*s)+c}else d<=-p?(u=Math.max(0,-(-a*i+o)),d=u>0?-i:Math.min(Math.max(-i,-s),i),f=-u*u+d*(d+2*s)+c):d<=p?(u=0,d=Math.min(Math.max(-i,-s),i),f=d*(d+2*s)+c):(u=Math.max(0,-(a*i+o)),d=u>0?i:Math.min(Math.max(-i,-s),i),f=-u*u+d*(d+2*s)+c)}else d=a>0?-i:i,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*s)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),r&&r.copy(ci).addScaledVector(li,d),f}intersectSphere(e,t){if(e.radius<0)return null;si.subVectors(e.center,this.origin);let n=si.dot(this.direction),r=si.dot(si)-n*n,i=e.radius*e.radius;if(r>i)return null;let a=Math.sqrt(i-r),o=n-a,s=n+a;return s<0?null:o<0?this.at(s,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,r,i,a,o,s,c=1/this.direction.x,l=1/this.direction.y,u=1/this.direction.z,d=this.origin;return c>=0?(n=(e.min.x-d.x)*c,r=(e.max.x-d.x)*c):(n=(e.max.x-d.x)*c,r=(e.min.x-d.x)*c),l>=0?(i=(e.min.y-d.y)*l,a=(e.max.y-d.y)*l):(i=(e.max.y-d.y)*l,a=(e.min.y-d.y)*l),n>a||i>r||((i>n||isNaN(n))&&(n=i),(a<r||isNaN(r))&&(r=a),u>=0?(o=(e.min.z-d.z)*u,s=(e.max.z-d.z)*u):(o=(e.max.z-d.z)*u,s=(e.min.z-d.z)*u),n>s||o>r)||((o>n||n!==n)&&(n=o),(s<r||r!==r)&&(r=s),r<0)?null:this.at(n>=0?n:r,t)}intersectsBox(e){return this.intersectBox(e,si)!==null}intersectTriangle(e,t,n,r,i){let a=this.origin,o=this.direction,s=o.x,c=o.y,l=o.z,u=e.x-a.x,d=e.y-a.y,f=e.z-a.z,p=t.x-a.x,m=t.y-a.y,h=t.z-a.z,g=n.x-a.x,_=n.y-a.y,v=n.z-a.z,y=Math.abs(s),b=Math.abs(c),x=Math.abs(l),S,C,w,T,E,D,O,k,A,j,ee,M;if(y>=b&&y>=x?(w=s,D=u,A=p,M=g,s>=0?(S=c,C=l,T=d,E=f,O=m,k=h,j=_,ee=v):(S=l,C=c,T=f,E=d,O=h,k=m,j=v,ee=_)):b>=x?(w=c,D=d,A=m,M=_,c>=0?(S=l,C=s,T=f,E=u,O=h,k=p,j=v,ee=g):(S=s,C=l,T=u,E=f,O=p,k=h,j=g,ee=v)):(w=l,D=f,A=h,M=v,l>=0?(S=s,C=c,T=u,E=d,O=p,k=m,j=g,ee=_):(S=c,C=s,T=d,E=u,O=m,k=p,j=_,ee=g)),w===0)return null;let te=S/w,ne=C/w,N=1/w,re=T-te*D,P=E-ne*D,ie=O-te*A,ae=k-ne*A,F=j-te*M,oe=ee-ne*M,I=F*ae-oe*ie,se=re*oe-P*F,ce=ie*P-ae*re;if(r){if(I<0||se<0||ce<0)return null}else if((I<0||se<0||ce<0)&&(I>0||se>0||ce>0))return null;let le=I+se+ce;if(le===0)return null;let ue=N*(I*D+se*A+ce*M);return(le>0?ue<0:ue>0)?null:this.at(ue/le,i)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},fi=class extends oi{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type=`MeshBasicMaterial`,this.color=new Z(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Pn,this.combine=0,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap=`round`,this.wireframeLinejoin=`round`,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},pi=new wn,mi=new di,hi=new Kr,gi=new J,_i=new J,vi=new J,yi=new J,bi=new J,xi=new J,Si=new J,Ci=new J,wi=class extends Zn{constructor(e=new ei,t=new fi){super(),this.isMesh=!0,this.type=`Mesh`,this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let n=e[t[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let e=0,t=n.length;e<t;e++){let t=n[e].name||String(e);this.morphTargetInfluences.push(0),this.morphTargetDictionary[t]=e}}}}getVertexPosition(e,t){let n=this.geometry,r=n.attributes.position,i=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(r,e);let o=this.morphTargetInfluences;if(i&&o){xi.set(0,0,0);for(let n=0,r=i.length;n<r;n++){let r=o[n],s=i[n];r!==0&&(bi.fromBufferAttribute(s,e),a?xi.addScaledVector(bi,r):xi.addScaledVector(bi.sub(t),r))}t.add(xi)}return t}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,r=this.material,i=this.matrixWorld;r!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),hi.copy(n.boundingSphere),hi.applyMatrix4(i),mi.copy(e.ray).recast(e.near),!(hi.containsPoint(mi.origin)===!1&&(mi.intersectSphere(hi,gi)===null||mi.origin.distanceToSquared(gi)>(e.far-e.near)**2))&&(pi.copy(i).invert(),mi.copy(e.ray).applyMatrix4(pi),(n.boundingBox===null||mi.intersectsBox(n.boundingBox)!==!1)&&this._computeIntersections(e,t,mi)))}_computeIntersections(e,t,n){let r,i=this.geometry,a=this.material,o=i.index,s=i.attributes.position,c=i.attributes.uv,l=i.attributes.uv1,u=i.attributes.normal,d=i.groups,f=i.drawRange;if(o!==null){if(Array.isArray(a))for(let i=0,s=d.length;i<s;i++){let s=d[i],p=a[s.materialIndex],m=Math.max(s.start,f.start),h=Math.min(o.count,Math.min(s.start+s.count,f.start+f.count));for(let i=m,a=h;i<a;i+=3){let a=o.getX(i),d=o.getX(i+1),f=o.getX(i+2);r=Ei(this,p,e,n,c,l,u,a,d,f),r&&(r.faceIndex=Math.floor(i/3),r.face.materialIndex=s.materialIndex,t.push(r))}}else{let i=Math.max(0,f.start),s=Math.min(o.count,f.start+f.count);for(let d=i,f=s;d<f;d+=3){let i=o.getX(d),s=o.getX(d+1),f=o.getX(d+2);r=Ei(this,a,e,n,c,l,u,i,s,f),r&&(r.faceIndex=Math.floor(d/3),t.push(r))}}}else if(s!==void 0){if(Array.isArray(a))for(let i=0,o=d.length;i<o;i++){let o=d[i],p=a[o.materialIndex],m=Math.max(o.start,f.start),h=Math.min(s.count,Math.min(o.start+o.count,f.start+f.count));for(let i=m,a=h;i<a;i+=3){let a=i,s=i+1,d=i+2;r=Ei(this,p,e,n,c,l,u,a,s,d),r&&(r.faceIndex=Math.floor(i/3),r.face.materialIndex=o.materialIndex,t.push(r))}}else{let i=Math.max(0,f.start),o=Math.min(s.count,f.start+f.count);for(let s=i,d=o;s<d;s+=3){let i=s,o=s+1,d=s+2;r=Ei(this,a,e,n,c,l,u,i,o,d),r&&(r.faceIndex=Math.floor(s/3),t.push(r))}}}}};function Ti(e,t,n,r,i,a,o,s){let c;if(c=t.side===1?r.intersectTriangle(o,a,i,!0,s):r.intersectTriangle(i,a,o,t.side===0,s),c===null)return null;Ci.copy(s),Ci.applyMatrix4(e.matrixWorld);let l=n.ray.origin.distanceTo(Ci);return l<n.near||l>n.far?null:{distance:l,point:Ci.clone(),object:e}}function Ei(e,t,n,r,i,a,o,s,c,l){e.getVertexPosition(s,_i),e.getVertexPosition(c,vi),e.getVertexPosition(l,yi);let u=Ti(e,t,n,r,_i,vi,yi,Si);if(u){let e=new J;br.getBarycoord(Si,_i,vi,yi,e),i&&(u.uv=br.getInterpolatedAttribute(i,s,c,l,e,new q)),a&&(u.uv1=br.getInterpolatedAttribute(a,s,c,l,e,new q)),o&&(u.normal=br.getInterpolatedAttribute(o,s,c,l,e,new J),u.normal.dot(r.direction)>0&&u.normal.multiplyScalar(-1));let t={a:s,b:c,c:l,normal:new J,materialIndex:0};br.getNormal(_i,vi,yi,t.normal),u.face=t,u.barycoord=e}return u}var Di=class extends vn{constructor(e=null,t=1,n=1,r,i,a,o,s,c=R,l=R,u,d){super(null,a,o,s,c,l,r,i,u,d),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},Oi=new Kr,ki=new q(.5,.5),Ai=new J,ji=class{constructor(e=new ii,t=new ii,n=new ii,r=new ii,i=new ii,a=new ii){this.planes=[e,t,n,r,i,a]}set(e,t,n,r,i,a){let o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(r),o[4].copy(i),o[5].copy(a),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=Ft,n=!1){let r=this.planes,i=e.elements,a=i[0],o=i[1],s=i[2],c=i[3],l=i[4],u=i[5],d=i[6],f=i[7],p=i[8],m=i[9],h=i[10],g=i[11],_=i[12],v=i[13],y=i[14],b=i[15];if(r[0].setComponents(c-a,f-l,g-p,b-_).normalize(),r[1].setComponents(c+a,f+l,g+p,b+_).normalize(),r[2].setComponents(c+o,f+u,g+m,b+v).normalize(),r[3].setComponents(c-o,f-u,g-m,b-v).normalize(),n)r[4].setComponents(s,d,h,y).normalize(),r[5].setComponents(c-s,f-d,g-h,b-y).normalize();else if(r[4].setComponents(c-s,f-d,g-h,b-y).normalize(),t===2e3)r[5].setComponents(c+s,f+d,g+h,b+y).normalize();else if(t===2001)r[5].setComponents(s,d,h,y).normalize();else throw Error(`THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: `+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Oi.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Oi.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Oi)}intersectsSprite(e){return Oi.center.set(0,0,0),Oi.radius=.7071067811865476+ki.distanceTo(e.center),Oi.applyMatrix4(e.matrixWorld),this.intersectsSphere(Oi)}intersectsSphere(e){let t=this.planes,n=e.center,r=-e.radius;for(let e=0;e<6;e++)if(t[e].distanceToPoint(n)<r)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let r=t[n];if(Ai.x=r.normal.x>0?e.max.x:e.min.x,Ai.y=r.normal.y>0?e.max.y:e.min.y,Ai.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(Ai)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}},Mi=class extends oi{constructor(e){super(),this.isLineBasicMaterial=!0,this.type=`LineBasicMaterial`,this.color=new Z(16777215),this.map=null,this.linewidth=1,this.linecap=`round`,this.linejoin=`round`,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}},Ni=new J,Pi=new J,Fi=new wn,Ii=new di,Li=new Kr,Ri=new J,zi=new J,Bi=class extends Zn{constructor(e=new ei,t=new Mi){super(),this.isLine=!0,this.type=`Line`,this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[0];for(let e=1,r=t.count;e<r;e++)Ni.fromBufferAttribute(t,e-1),Pi.fromBufferAttribute(t,e),n[e]=n[e-1],n[e]+=Ni.distanceTo(Pi);e.setAttribute(`lineDistance`,new Hr(n,1))}else W(`Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.`);return this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,r=this.matrixWorld,i=e.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Li.copy(n.boundingSphere),Li.applyMatrix4(r),Li.radius+=i,e.ray.intersectsSphere(Li)===!1)return;Fi.copy(r).invert(),Ii.copy(e.ray).applyMatrix4(Fi);let o=i/((this.scale.x+this.scale.y+this.scale.z)/3),s=o*o,c=this.isLineSegments?2:1,l=n.index,u=n.attributes.position;if(l!==null){let n=Math.max(0,a.start),r=Math.min(l.count,a.start+a.count);for(let i=n,a=r-1;i<a;i+=c){let n=l.getX(i),r=l.getX(i+1),a=Vi(this,e,Ii,s,n,r,i);a&&t.push(a)}if(this.isLineLoop){let i=l.getX(r-1),a=l.getX(n),o=Vi(this,e,Ii,s,i,a,r-1);o&&t.push(o)}}else{let n=Math.max(0,a.start),r=Math.min(u.count,a.start+a.count);for(let i=n,a=r-1;i<a;i+=c){let n=Vi(this,e,Ii,s,i,i+1,i);n&&t.push(n)}if(this.isLineLoop){let i=Vi(this,e,Ii,s,r-1,n,r-1);i&&t.push(i)}}}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let n=e[t[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let e=0,t=n.length;e<t;e++){let t=n[e].name||String(e);this.morphTargetInfluences.push(0),this.morphTargetDictionary[t]=e}}}}};function Vi(e,t,n,r,i,a,o){let s=e.geometry.attributes.position;if(Ni.fromBufferAttribute(s,i),Pi.fromBufferAttribute(s,a),n.distanceSqToSegment(Ni,Pi,Ri,zi)>r)return;Ri.applyMatrix4(e.matrixWorld);let c=t.ray.origin.distanceTo(Ri);if(!(c<t.near||c>t.far))return{distance:c,point:zi.clone().applyMatrix4(e.matrixWorld),index:o,face:null,faceIndex:null,barycoord:null,object:e}}var Hi=new J,Ui=new J,Wi=class extends Bi{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type=`LineSegments`}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[];for(let e=0,r=t.count;e<r;e+=2)Hi.fromBufferAttribute(t,e),Ui.fromBufferAttribute(t,e+1),n[e]=e===0?0:n[e-1],n[e+1]=n[e]+Hi.distanceTo(Ui);e.setAttribute(`lineDistance`,new Hr(n,1))}else W(`LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.`);return this}},Gi=class extends oi{constructor(e){super(),this.isPointsMaterial=!0,this.type=`PointsMaterial`,this.color=new Z(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},Ki=new wn,qi=new di,Ji=new Kr,Yi=new J,Xi=class extends Zn{constructor(e=new ei,t=new Gi){super(),this.isPoints=!0,this.type=`Points`,this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let n=this.geometry,r=this.matrixWorld,i=e.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Ji.copy(n.boundingSphere),Ji.applyMatrix4(r),Ji.radius+=i,e.ray.intersectsSphere(Ji)===!1)return;Ki.copy(r).invert(),qi.copy(e.ray).applyMatrix4(Ki);let o=i/((this.scale.x+this.scale.y+this.scale.z)/3),s=o*o,c=n.index,l=n.attributes.position;if(c!==null){let n=Math.max(0,a.start),i=Math.min(c.count,a.start+a.count);for(let a=n,o=i;a<o;a++){let n=c.getX(a);Yi.fromBufferAttribute(l,n),Zi(Yi,n,s,r,e,t,this)}}else{let n=Math.max(0,a.start),i=Math.min(l.count,a.start+a.count);for(let a=n,o=i;a<o;a++)Yi.fromBufferAttribute(l,a),Zi(Yi,a,s,r,e,t,this)}}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let n=e[t[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let e=0,t=n.length;e<t;e++){let t=n[e].name||String(e);this.morphTargetInfluences.push(0),this.morphTargetDictionary[t]=e}}}}};function Zi(e,t,n,r,i,a,o){let s=qi.distanceSqToPoint(e);if(s<n){let n=new J;qi.closestPointToPoint(e,n),n.applyMatrix4(r);let c=i.ray.origin.distanceTo(n);if(c<i.near||c>i.far)return;a.push({distance:c,distanceToRay:Math.sqrt(s),point:n,index:t,face:null,faceIndex:null,barycoord:null,object:o})}}var Qi=class extends vn{constructor(e=[],t=301,n,r,i,a,o,s,c,l){super(e,t,n,r,i,a,o,s,c,l),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},$i=class extends vn{constructor(e,t,n=we,r,i,a,o=R,s=R,c,l=Me,u=1){if(l!==1026&&l!==1027)throw Error(`THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat`);super({width:e,height:t,depth:u},r,i,a,o,s,l,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new mn(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return t.compareFunction=this.compareFunction,t}},ea=class extends $i{constructor(e,t=we,n=301,r,i,a=R,o=R,s,c=Me){let l={width:e,height:e,depth:1},u=[l,l,l,l,l,l];super(e,e,t,n,r,i,a,o,s,c),this.image=u,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}},ta=class extends vn{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}},na=class e extends ei{constructor(e=1,t=1,n=1,r=1,i=1,a=1){super(),this.type=`BoxGeometry`,this.parameters={width:e,height:t,depth:n,widthSegments:r,heightSegments:i,depthSegments:a};let o=this;r=Math.floor(r),i=Math.floor(i),a=Math.floor(a);let s=[],c=[],l=[],u=[],d=0,f=0;p(`z`,`y`,`x`,-1,-1,n,t,e,a,i,0),p(`z`,`y`,`x`,1,-1,n,t,-e,a,i,1),p(`x`,`z`,`y`,1,1,e,n,t,r,a,2),p(`x`,`z`,`y`,1,-1,e,n,-t,r,a,3),p(`x`,`y`,`z`,1,-1,e,t,n,r,i,4),p(`x`,`y`,`z`,-1,-1,e,t,-n,r,i,5),this.setIndex(s),this.setAttribute(`position`,new Hr(c,3)),this.setAttribute(`normal`,new Hr(l,3)),this.setAttribute(`uv`,new Hr(u,2));function p(e,t,n,r,i,a,p,m,h,g,_){let v=a/h,y=p/g,b=a/2,x=p/2,S=m/2,C=h+1,w=g+1,T=0,E=0,D=new J;for(let a=0;a<w;a++){let o=a*y-x;for(let s=0;s<C;s++)D[e]=(s*v-b)*r,D[t]=o*i,D[n]=S,c.push(D.x,D.y,D.z),D[e]=0,D[t]=0,D[n]=m>0?1:-1,l.push(D.x,D.y,D.z),u.push(s/h),u.push(1-a/g),T+=1}for(let e=0;e<g;e++)for(let t=0;t<h;t++){let n=d+t+C*e,r=d+t+C*(e+1),i=d+(t+1)+C*(e+1),a=d+(t+1)+C*e;s.push(n,r,a),s.push(r,i,a),E+=6}o.addGroup(f,E,_),f+=E,d+=T}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}},ra=class e extends ei{constructor(e=1,t=1,n=1,r=1){super(),this.type=`PlaneGeometry`,this.parameters={width:e,height:t,widthSegments:n,heightSegments:r};let i=e/2,a=t/2,o=Math.floor(n),s=Math.floor(r),c=o+1,l=s+1,u=e/o,d=t/s,f=[],p=[],m=[],h=[];for(let e=0;e<l;e++){let t=e*d-a;for(let n=0;n<c;n++){let r=n*u-i;p.push(r,-t,0),m.push(0,0,1),h.push(n/o),h.push(1-e/s)}}for(let e=0;e<s;e++)for(let t=0;t<o;t++){let n=t+c*e,r=t+c*(e+1),i=t+1+c*(e+1),a=t+1+c*e;f.push(n,r,a),f.push(r,i,a)}this.setIndex(f),this.setAttribute(`position`,new Hr(p,3)),this.setAttribute(`normal`,new Hr(m,3)),this.setAttribute(`uv`,new Hr(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.width,t.height,t.widthSegments,t.heightSegments)}},ia=class e extends ei{constructor(e=1,t=32,n=16,r=0,i=Math.PI*2,a=0,o=Math.PI){super(),this.type=`SphereGeometry`,this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:r,phiLength:i,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));let s=Math.min(a+o,Math.PI),c=0,l=[],u=new J,d=new J,f=[],p=[],m=[],h=[];for(let f=0;f<=n;f++){let g=[],_=f/n,v=a+_*o,y=e*Math.cos(v),b=Math.sqrt(e*e-y*y),x=0;f===0&&a===0?x=.5/t:f===n&&s===Math.PI&&(x=-.5/t);for(let e=0;e<=t;e++){let n=e/t,a=r+n*i;u.x=-b*Math.cos(a),u.y=y,u.z=b*Math.sin(a),p.push(u.x,u.y,u.z),d.copy(u).normalize(),m.push(d.x,d.y,d.z),h.push(n+x,1-_),g.push(c++)}l.push(g)}for(let e=0;e<n;e++)for(let r=0;r<t;r++){let t=l[e][r+1],i=l[e][r],o=l[e+1][r],c=l[e+1][r+1];(e!==0||a>0)&&f.push(t,i,c),(e!==n-1||s<Math.PI)&&f.push(i,o,c)}this.setIndex(f),this.setAttribute(`position`,new Hr(p,3)),this.setAttribute(`normal`,new Hr(m,3)),this.setAttribute(`uv`,new Hr(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}};function aa(e){let t={};for(let n in e){t[n]={};for(let r in e[n]){let i=e[n][r];if(sa(i))i.isRenderTargetTexture?(W(`UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms().`),t[n][r]=null):t[n][r]=i.clone();else if(Array.isArray(i)){if(sa(i[0])){let e=[];for(let t=0,n=i.length;t<n;t++)e[t]=i[t].clone();t[n][r]=e}else t[n][r]=i.slice()}else t[n][r]=i}}return t}function oa(e){let t={};for(let n=0;n<e.length;n++){let r=aa(e[n]);for(let e in r)t[e]=r[e]}return t}function sa(e){return e&&(e.isColor||e.isMatrix3||e.isMatrix4||e.isVector2||e.isVector3||e.isVector4||e.isTexture||e.isQuaternion)}function ca(e){let t=[];for(let n=0;n<e.length;n++)t.push(e[n].clone());return t}function la(e){let t=e.getRenderTarget();return t===null?e.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:X.workingColorSpace}var ua={clone:aa,merge:oa},da=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,fa=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,pa=class extends oi{constructor(e){super(),this.isShaderMaterial=!0,this.type=`ShaderMaterial`,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=da,this.fragmentShader=fa,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=aa(e.uniforms),this.uniformsGroups=ca(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let n in this.uniforms){let r=this.uniforms[n].value;r&&r.isTexture?t.uniforms[n]={type:`t`,value:r.toJSON(e).uuid}:r&&r.isColor?t.uniforms[n]={type:`c`,value:r.getHex()}:r&&r.isVector2?t.uniforms[n]={type:`v2`,value:r.toArray()}:r&&r.isVector3?t.uniforms[n]={type:`v3`,value:r.toArray()}:r&&r.isVector4?t.uniforms[n]={type:`v4`,value:r.toArray()}:r&&r.isMatrix3?t.uniforms[n]={type:`m3`,value:r.toArray()}:r&&r.isMatrix4?t.uniforms[n]={type:`m4`,value:r.toArray()}:t.uniforms[n]={value:r}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let e in this.extensions)this.extensions[e]===!0&&(n[e]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(let n in e.uniforms){let r=e.uniforms[n];switch(this.uniforms[n]={},r.type){case`t`:this.uniforms[n].value=t[r.value]||null;break;case`c`:this.uniforms[n].value=new Z().setHex(r.value);break;case`v2`:this.uniforms[n].value=new q().fromArray(r.value);break;case`v3`:this.uniforms[n].value=new J().fromArray(r.value);break;case`v4`:this.uniforms[n].value=new yn().fromArray(r.value);break;case`m3`:this.uniforms[n].value=new Y().fromArray(r.value);break;case`m4`:this.uniforms[n].value=new wn().fromArray(r.value);break;default:this.uniforms[n].value=r.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(let t in e.extensions)this.extensions[t]=e.extensions[t];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}},ma=class extends pa{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type=`RawShaderMaterial`}},ha=class extends oi{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type=`MeshDepthMaterial`,this.depthPacking=Ot,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},ga=class extends oi{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type=`MeshDistanceMaterial`,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};function _a(e,t){return!e||e.constructor===t?e:typeof t.BYTES_PER_ELEMENT==`number`?new t(e):Array.prototype.slice.call(e)}function va(e){return e!==void 0&&e.inTangents!==void 0&&e.outTangents!==void 0}var ya=class{constructor(e,t,n,r){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=r===void 0?new t.constructor(n):r,this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,r=t[n],i=t[n-1];validate_interval:{seek:{let a;linear_scan:{forward_scan:if(!(e<r)){for(let a=n+2;;){if(r===void 0){if(e<i)break forward_scan;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(i=r,r=t[++n],e<r)break seek}a=t.length;break linear_scan}if(!(e>=i)){let o=t[1];e<o&&(n=2,i=o);for(let a=n-2;;){if(i===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===a)break;if(r=i,i=t[--n-1],e>=i)break seek}a=n,n=0;break linear_scan}break validate_interval}for(;n<a;){let r=n+a>>>1;e<t[r]?a=r:n=r+1}if(r=t[n],i=t[n-1],i===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(r===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,i,r)}return this.interpolate_(n,i,e,r)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,r=this.valueSize,i=e*r;for(let e=0;e!==r;++e)t[e]=n[i+e];return t}interpolate_(){throw Error(`THREE.Interpolant: Call to abstract method.`)}intervalChanged_(){}},ba=class extends ya{constructor(e,t,n,r){super(e,t,n,r),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Tt,endingEnd:Tt}}intervalChanged_(e,t,n){let r=this.parameterPositions,i=e-2,a=e+1,o=r[i],s=r[a];if(o===void 0)switch(this.getSettings_().endingStart){case Et:i=e,o=2*t-n;break;case Dt:i=r.length-2,o=t+r[i]-r[i+1];break;default:i=e,o=n}if(s===void 0)switch(this.getSettings_().endingEnd){case Et:a=e,s=2*n-t;break;case Dt:a=1,s=n+r[1]-r[0];break;default:a=e-1,s=t}let c=(n-t)*.5,l=this.valueSize;this._weightPrev=c/(t-o),this._weightNext=c/(s-n),this._offsetPrev=i*l,this._offsetNext=a*l}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=e*o,c=s-o,l=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,f=this._weightNext,p=(n-t)/(r-t),m=p*p,h=m*p,g=-d*h+2*d*m-d*p,_=(1+d)*h+(-1.5-2*d)*m+(-.5+d)*p+1,v=(-1-f)*h+(1.5+f)*m+.5*p,y=f*h-f*m;for(let e=0;e!==o;++e)i[e]=g*a[l+e]+_*a[c+e]+v*a[s+e]+y*a[u+e];return i}},xa=class extends ya{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=e*o,c=s-o,l=(n-t)/(r-t),u=1-l;for(let e=0;e!==o;++e)i[e]=a[c+e]*u+a[s+e]*l;return i}},Sa=class extends ya{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e){return this.copySampleValue_(e-1)}},Ca=class extends ya{interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=e*o,c=s-o,l=this.inTangents,u=this.outTangents;if(!l||!u){let e=(n-t)/(r-t),l=1-e;for(let t=0;t!==o;++t)i[t]=a[c+t]*l+a[s+t]*e;return i}let d=o*2,f=e-1;for(let p=0;p!==o;++p){let o=a[c+p],m=a[s+p],h=f*d+p*2,g=u[h],_=u[h+1],v=e*d+p*2,y=l[v],b=l[v+1],x=Ea(n,t,g,y,r);i[p]=wa(x,o,_,b,m)}return i}};function wa(e,t,n,r,i){let a=1-e;return a*a*a*t+3*a*a*e*n+3*a*e*e*r+e*e*e*i}function Ta(e,t,n,r,i){let a=1-e;return 3*a*a*(n-t)+6*a*e*(r-n)+3*e*e*(i-r)}function Ea(e,t,n,r,i){let a=(e-t)/(i-t);for(let o=0;o<8;o++){let o=wa(a,t,n,r,i)-e;if(Math.abs(o)<1e-10)break;let s=Ta(a,t,n,r,i);if(Math.abs(s)<1e-10)break;a=Math.max(0,Math.min(1,a-o/s))}return a}var Da=class{constructor(e,t,n,r){if(e===void 0)throw Error(`THREE.KeyframeTrack: track name is undefined`);if(t===void 0||t.length===0)throw Error(`THREE.KeyframeTrack: no keyframes in track named `+e);this.name=e,this.times=_a(t,this.TimeBufferType),this.values=_a(n,this.ValueBufferType),this.setInterpolation(r||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:_a(e.times,Array),values:_a(e.values,Array)};let t=e.getInterpolation();t!==e.DefaultInterpolation&&(n.interpolation=t),va(e.settings)&&(n.settings={inTangents:_a(e.settings.inTangents,Array),outTangents:_a(e.settings.outTangents,Array)})}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new Sa(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new xa(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new ba(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodBezier(e){let t=new Ca(this.times,this.values,this.getValueSize(),e);return this.settings&&(t.inTangents=this.settings.inTangents,t.outTangents=this.settings.outTangents),t}setInterpolation(e){let t;switch(e){case xt:t=this.InterpolantFactoryMethodDiscrete;break;case St:t=this.InterpolantFactoryMethodLinear;break;case Ct:t=this.InterpolantFactoryMethodSmooth;break;case wt:t=this.InterpolantFactoryMethodBezier}if(t===void 0){let t=`unsupported interpolation for `+this.ValueTypeName+` keyframe track named `+this.name;if(this.createInterpolant===void 0){if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw Error(t)}return W(`KeyframeTrack:`,t),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return xt;case this.InterpolantFactoryMethodLinear:return St;case this.InterpolantFactoryMethodSmooth:return Ct;case this.InterpolantFactoryMethodBezier:return wt}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]*=e;va(this.settings)&&(Oa(this.settings.inTangents,e),Oa(this.settings.outTangents,e))}return this}trim(e,t){let n=this.times,r=n.length,i=0,a=r-1;for(;i!==r&&n[i]<e;)++i;for(;a!==-1&&n[a]>t;)--a;if(++a,i!==0||a!==r){i>=a&&(a=Math.max(a,1),i=a-1);let e=this.getValueSize();this.times=n.slice(i,a),this.values=this.values.slice(i*e,a*e)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(G(`KeyframeTrack: Invalid value size in track.`,this),e=!1);let n=this.times,r=this.values,i=n.length;i===0&&(G(`KeyframeTrack: Track is empty.`,this),e=!1);let a=null;for(let t=0;t!==i;t++){let r=n[t];if(typeof r==`number`&&isNaN(r)){G(`KeyframeTrack: Time is not a valid number.`,this,t,r),e=!1;break}if(a!==null&&a>r){G(`KeyframeTrack: Out of order keys.`,this,t,r,a),e=!1;break}a=r}if(r!==void 0&&Lt(r))for(let t=0,n=r.length;t!==n;++t){let n=r[t];if(isNaN(n)){G(`KeyframeTrack: Value is not a valid number.`,this,t,n),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),r=this.getInterpolation()===Ct,i=e.length-1,a=1;for(let o=1;o<i;++o){let i=!1,s=e[o];if(s!==e[o+1]&&(o!==1||s!==e[0])){if(r)i=!0;else{let e=o*n,r=e-n,a=e+n;for(let o=0;o!==n;++o){let n=t[e+o];if(n!==t[r+o]||n!==t[a+o]){i=!0;break}}}}if(i){if(o!==a){e[a]=e[o];let r=o*n,i=a*n;for(let e=0;e!==n;++e)t[i+e]=t[r+e]}++a}}if(i>0){e[a]=e[i];for(let e=i*n,r=a*n,o=0;o!==n;++o)t[r+o]=t[e+o];++a}return a===e.length?(this.times=e,this.values=t):(this.times=e.slice(0,a),this.values=t.slice(0,a*n)),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=this.constructor,r=new n(this.name,e,t);return r.createInterpolant=this.createInterpolant,va(this.settings)&&(r.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),r}};function Oa(e,t){for(let n=0,r=e.length;n!==r;n+=2)e[n]*=t}Da.prototype.ValueTypeName=``,Da.prototype.TimeBufferType=Float32Array,Da.prototype.ValueBufferType=Float32Array,Da.prototype.DefaultInterpolation=St;var ka=class extends Da{constructor(e,t,n){super(e,t,n)}};ka.prototype.ValueTypeName=`bool`,ka.prototype.ValueBufferType=Array,ka.prototype.DefaultInterpolation=xt,ka.prototype.InterpolantFactoryMethodLinear=void 0,ka.prototype.InterpolantFactoryMethodSmooth=void 0;var Aa=class extends Da{constructor(e,t,n,r){super(e,t,n,r)}};Aa.prototype.ValueTypeName=`color`;var ja=class extends Da{constructor(e,t,n,r){super(e,t,n,r)}};ja.prototype.ValueTypeName=`number`;var Ma=class extends ya{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=(n-t)/(r-t),c=e*o;for(let e=c+o;c!==e;c+=4)tn.slerpFlat(i,0,a,c-o,a,c,s);return i}},Na=class extends Da{constructor(e,t,n,r){super(e,t,n,r)}InterpolantFactoryMethodLinear(e){return new Ma(this.times,this.values,this.getValueSize(),e)}};Na.prototype.ValueTypeName=`quaternion`,Na.prototype.InterpolantFactoryMethodSmooth=void 0;var Pa=class extends Da{constructor(e,t,n){super(e,t,n)}};Pa.prototype.ValueTypeName=`string`,Pa.prototype.ValueBufferType=Array,Pa.prototype.DefaultInterpolation=xt,Pa.prototype.InterpolantFactoryMethodLinear=void 0,Pa.prototype.InterpolantFactoryMethodSmooth=void 0;var Fa=class extends Da{constructor(e,t,n,r){super(e,t,n,r)}};Fa.prototype.ValueTypeName=`vector`;var Ia=new J,La=new tn,Ra=new J,za=class extends Zn{constructor(){super(),this.isCamera=!0,this.type=`Camera`,this.matrixWorldInverse=new wn,this.projectionMatrix=new wn,this.projectionMatrixInverse=new wn,this.coordinateSystem=Ft,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(Ia,La,Ra),Ra.x===1&&Ra.y===1&&Ra.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Ia,La,Ra.set(1,1,1)).invert()}updateWorldMatrix(e,t,n=!1){super.updateWorldMatrix(e,t,n),this.matrixWorld.decompose(Ia,La,Ra),Ra.x===1&&Ra.y===1&&Ra.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Ia,La,Ra.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},Ba=new J,Va=new q,Ha=new q,Ua=class extends za{constructor(e=50,t=1,n=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type=`PerspectiveCamera`,this.fov=e,this.zoom=1,this.near=n,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=Yt*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(Jt*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Yt*2*Math.atan(Math.tan(Jt*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Ba.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Ba.x,Ba.y).multiplyScalar(-e/Ba.z),Ba.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Ba.x,Ba.y).multiplyScalar(-e/Ba.z)}getViewSize(e,t){return this.getViewBounds(e,Va,Ha),t.subVectors(Ha,Va)}setViewOffset(e,t,n,r,i,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=i,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(Jt*.5*this.fov)/this.zoom,n=2*t,r=this.aspect*n,i=-.5*r,a=this.view;if(this.view!==null&&this.view.enabled){let e=a.fullWidth,o=a.fullHeight;i+=a.offsetX*r/e,t-=a.offsetY*n/o,r*=a.width/e,n*=a.height/o}let o=this.filmOffset;o!==0&&(i+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(i,i+r,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},Wa=class extends za{constructor(e=-1,t=1,n=1,r=-1,i=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type=`OrthographicCamera`,this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=r,this.near=i,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,r,i,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=i,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,r=(this.top+this.bottom)/2,i=n-e,a=n+e,o=r+t,s=r-t;if(this.view!==null&&this.view.enabled){let e=(this.right-this.left)/this.view.fullWidth/this.zoom,t=(this.top-this.bottom)/this.view.fullHeight/this.zoom;i+=e*this.view.offsetX,a=i+e*this.view.width,o-=t*this.view.offsetY,s=o-t*this.view.height}this.projectionMatrix.makeOrthographic(i,a,o,s,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},Ga=-90,Ka=1,qa=class extends Zn{constructor(e,t,n){super(),this.type=`CubeCamera`,this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let r=new Ua(Ga,Ka,e,t);r.layers=this.layers,this.add(r);let i=new Ua(Ga,Ka,e,t);i.layers=this.layers,this.add(i);let a=new Ua(Ga,Ka,e,t);a.layers=this.layers,this.add(a);let o=new Ua(Ga,Ka,e,t);o.layers=this.layers,this.add(o);let s=new Ua(Ga,Ka,e,t);s.layers=this.layers,this.add(s);let c=new Ua(Ga,Ka,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,r,i,a,o,s]=t;for(let e of t)this.remove(e);if(e===2e3)n.up.set(0,1,0),n.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),i.up.set(0,0,-1),i.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),s.up.set(0,1,0),s.lookAt(0,0,-1);else if(e===2001)n.up.set(0,-1,0),n.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),i.up.set(0,0,1),i.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),s.up.set(0,-1,0),s.lookAt(0,0,-1);else throw Error(`THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: `+e);for(let e of t)this.add(e),e.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[i,a,o,s,c,l]=this.children,u=e.getRenderTarget(),d=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),p=e.xr.enabled;e.xr.enabled=!1;let m=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let h=!1;h=e.isWebGLRenderer===!0?e.state.buffers.depth.getReversed():e.reversedDepthBuffer,e.setRenderTarget(n,0,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,i),e.setRenderTarget(n,1,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(n,2,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(n,3,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,s),e.setRenderTarget(n,4,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),n.texture.generateMipmaps=m,e.setRenderTarget(n,5,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(u,d,f),e.xr.enabled=p,n.texture.needsPMREMUpdate=!0}},Ja=class extends Ua{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}},Ya=`\\[\\]\\.:\\/`,Xa=RegExp(`[\\[\\]\\.:\\/]`,`g`),Za=`[^\\[\\]\\.:\\/]`,Qa=`[^`+Ya.replace(`\\.`,``)+`]`,$a=`((?:WC+[\\/:])*)`.replace(`WC`,Za),eo=`(WCOD+)?`.replace(`WCOD`,Qa),to=`(?:\\.(WC+)(?:\\[(.+)\\])?)?`.replace(`WC`,Za),no=`\\.(WC+)(?:\\[(.+)\\])?`.replace(`WC`,Za),ro=RegExp(`^`+$a+eo+to+no+`$`),io=[`material`,`materials`,`bones`,`map`],ao=class{constructor(e,t,n){let r=n||oo.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,r)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,r=this._bindings[n];r!==void 0&&r.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let r=this._targetGroup.nCachedObjects_,i=n.length;r!==i;++r)n[r].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},oo=class e{constructor(t,n,r){this.path=n,this.parsedPath=r||e.parseTrackName(n),this.node=e.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,n,r){return t&&t.isAnimationObjectGroup?new e.Composite(t,n,r):new e(t,n,r)}static sanitizeNodeName(e){return e.replace(/\s/g,`_`).replace(Xa,``)}static parseTrackName(e){let t=ro.exec(e);if(t===null)throw Error(`THREE.PropertyBinding: Cannot parse trackName: `+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},r=n.nodeName&&n.nodeName.lastIndexOf(`.`);if(r!==void 0&&r!==-1){let e=n.nodeName.substring(r+1);io.indexOf(e)!==-1&&(n.nodeName=n.nodeName.substring(0,r),n.objectName=e)}if(n.propertyName===null||n.propertyName.length===0)throw Error(`THREE.PropertyBinding: can not parse propertyName from trackName: `+e);return n}static findNode(e,t){if(t===void 0||t===``||t===`.`||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(e){for(let r=0;r<e.length;r++){let i=e[r];if(i.name===t||i.uuid===t)return i;let a=n(i.children);if(a)return a}return null},r=n(e.children);if(r)return r}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)e[t++]=n[r]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)n[r]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)n[r]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)n[r]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let t=this.node,n=this.parsedPath,r=n.objectName,i=n.propertyName,a=n.propertyIndex;if(t||(t=e.findNode(this.rootNode,n.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){W(`PropertyBinding: No target node found for track: `+this.path+`.`);return}if(r){let e=n.objectIndex;switch(r){case`materials`:if(!t.material){G(`PropertyBinding: Can not bind to material as node does not have a material.`,this);return}if(!t.material.materials){G(`PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.`,this);return}t=t.material.materials;break;case`bones`:if(!t.skeleton){G(`PropertyBinding: Can not bind to bones as node does not have a skeleton.`,this);return}t=t.skeleton.bones;for(let n=0;n<t.length;n++)if(t[n].name===e){e=n;break}break;case`map`:if(`map`in t){t=t.map;break}if(!t.material){G(`PropertyBinding: Can not bind to material as node does not have a material.`,this);return}if(!t.material.map){G(`PropertyBinding: Can not bind to material.map as node.material does not have a map.`,this);return}t=t.material.map;break;default:if(t[r]===void 0){G(`PropertyBinding: Can not bind to objectName of node undefined.`,this);return}t=t[r]}if(e!==void 0){if(t[e]===void 0){G(`PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.`,this,t);return}t=t[e]}}let o=t[i];if(o===void 0){let e=n.nodeName;G(`PropertyBinding: Trying to update property for track: `+e+`.`+i+` but it wasn't found.`,t);return}let s=this.Versioning.None;this.targetObject=t,t.isMaterial===!0?s=this.Versioning.NeedsUpdate:t.isObject3D===!0&&(s=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(a!==void 0){if(i===`morphTargetInfluences`){if(!t.geometry){G(`PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.`,this);return}if(!t.geometry.morphAttributes){G(`PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.`,this);return}t.morphTargetDictionary[a]!==void 0&&(a=t.morphTargetDictionary[a])}c=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=a}else o.fromArray!==void 0&&o.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(c=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=i;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][s]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};oo.Composite=ao,oo.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3},oo.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2},oo.prototype.GetterByBindingType=[oo.prototype._getValue_direct,oo.prototype._getValue_array,oo.prototype._getValue_arrayElement,oo.prototype._getValue_toArray],oo.prototype.SetterByBindingTypeAndVersioning=[[oo.prototype._setValue_direct,oo.prototype._setValue_direct_setNeedsUpdate,oo.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[oo.prototype._setValue_array,oo.prototype._setValue_array_setNeedsUpdate,oo.prototype._setValue_array_setMatrixWorldNeedsUpdate],[oo.prototype._setValue_arrayElement,oo.prototype._setValue_arrayElement_setNeedsUpdate,oo.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[oo.prototype._setValue_fromArray,oo.prototype._setValue_fromArray_setNeedsUpdate,oo.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var so=new wn,co=class{constructor(e,t,n=0,r=1/0){this.ray=new di(e,t),this.near=n,this.far=r,this.camera=null,this.layers=new Fn,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,t.projectionMatrix.elements[14]).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):G(`Raycaster: Unsupported camera type: `+t.type)}setFromXRController(e){return so.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(so),this}intersectObject(e,t=!0,n=[]){return uo(e,this,n,t),n.sort(lo),n}intersectObjects(e,t=!0,n=[]){for(let r=0,i=e.length;r<i;r++)uo(e[r],this,n,t);return n.sort(lo),n}};function lo(e,t){return e.distance-t.distance}function uo(e,t,n,r){let i=!0;if(e.layers.test(t.layers)&&e.raycast(t,n)===!1&&(i=!1),i===!0&&r===!0){let r=e.children;for(let e=0,i=r.length;e<i;e++)uo(r[e],t,n,!0)}}(class e{static{e.prototype.isMatrix2=!0}constructor(e,t,n,r){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,n,r)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let n=0;n<4;n++)this.elements[n]=e[n+t];return this}set(e,t,n,r){let i=this.elements;return i[0]=e,i[2]=t,i[1]=n,i[3]=r,this}});function fo(e,t,n,r){let i=po(r);switch(n){case U:return e*t;case Pe:return e*t/i.components*i.byteLength;case Fe:return e*t/i.components*i.byteLength;case Ie:return e*t*2/i.components*i.byteLength;case Le:return e*t*2/i.components*i.byteLength;case Ae:return e*t*3/i.components*i.byteLength;case je:return e*t*4/i.components*i.byteLength;case Re:return e*t*4/i.components*i.byteLength;case ze:case Be:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*8;case Ve:case He:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case We:case Ke:return Math.max(e,16)*Math.max(t,8)/4;case Ue:case Ge:return Math.max(e,8)*Math.max(t,8)/2;case qe:case Je:case Xe:case Ze:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*8;case Ye:case Qe:case $e:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case et:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case tt:return Math.floor((e+4)/5)*Math.floor((t+3)/4)*16;case nt:return Math.floor((e+4)/5)*Math.floor((t+4)/5)*16;case rt:return Math.floor((e+5)/6)*Math.floor((t+4)/5)*16;case it:return Math.floor((e+5)/6)*Math.floor((t+5)/6)*16;case at:return Math.floor((e+7)/8)*Math.floor((t+4)/5)*16;case ot:return Math.floor((e+7)/8)*Math.floor((t+5)/6)*16;case st:return Math.floor((e+7)/8)*Math.floor((t+7)/8)*16;case ct:return Math.floor((e+9)/10)*Math.floor((t+4)/5)*16;case lt:return Math.floor((e+9)/10)*Math.floor((t+5)/6)*16;case ut:return Math.floor((e+9)/10)*Math.floor((t+7)/8)*16;case dt:return Math.floor((e+9)/10)*Math.floor((t+9)/10)*16;case ft:return Math.floor((e+11)/12)*Math.floor((t+9)/10)*16;case pt:return Math.floor((e+11)/12)*Math.floor((t+11)/12)*16;case mt:case ht:case gt:return Math.ceil(e/4)*Math.ceil(t/4)*16;case _t:case vt:return Math.ceil(e/4)*Math.ceil(t/4)*8;case yt:case bt:return Math.ceil(e/4)*Math.ceil(t/4)*16}throw Error(`Unable to determine texture byte length for ${n} format.`)}function po(e){switch(e){case B:case be:return{byteLength:1,components:1};case Se:case xe:case Te:return{byteLength:2,components:1};case Ee:case De:return{byteLength:2,components:4};case we:case Ce:case V:return{byteLength:4,components:1};case ke:case H:return{byteLength:4,components:3}}throw Error(`THREE.TextureUtils: Unknown texture type ${e}.`)}typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`register`,{detail:{revision:`186`}})),typeof window<`u`&&(window.__THREE__?W(`WARNING: Multiple instances of Three.js being imported.`):window.__THREE__=`186`);function mo(){let e=null,t=!1,n=null,r=null;function i(t,a){r=e.requestAnimationFrame(i),n(t,a)}return{start:function(){t!==!0&&n!==null&&e!==null&&(r=e.requestAnimationFrame(i),t=!0)},stop:function(){e!==null&&e.cancelAnimationFrame(r),t=!1},setAnimationLoop:function(e){n=e},setContext:function(t){e=t}}}function ho(e){let t=new WeakMap;function n(t,n){let r=t.array,i=t.usage,a=r.byteLength,o=e.createBuffer();e.bindBuffer(n,o),e.bufferData(n,r,i),t.onUploadCallback();let s;if(r instanceof Float32Array)s=e.FLOAT;else if(typeof Float16Array<`u`&&r instanceof Float16Array)s=e.HALF_FLOAT;else if(r instanceof Uint16Array)s=t.isFloat16BufferAttribute?e.HALF_FLOAT:e.UNSIGNED_SHORT;else if(r instanceof Int16Array)s=e.SHORT;else if(r instanceof Uint32Array)s=e.UNSIGNED_INT;else if(r instanceof Int32Array)s=e.INT;else if(r instanceof Int8Array)s=e.BYTE;else if(r instanceof Uint8Array)s=e.UNSIGNED_BYTE;else if(r instanceof Uint8ClampedArray)s=e.UNSIGNED_BYTE;else throw Error(`THREE.WebGLAttributes: Unsupported buffer data format: `+r);return{buffer:o,type:s,bytesPerElement:r.BYTES_PER_ELEMENT,version:t.version,size:a}}function r(t,n,r){let i=n.array,a=n.updateRanges;if(e.bindBuffer(r,t),a.length===0)e.bufferSubData(r,0,i);else{a.sort((e,t)=>e.start-t.start);let t=0;for(let e=1;e<a.length;e++){let n=a[t],r=a[e];r.start<=n.start+n.count+1?n.count=Math.max(n.count,r.start+r.count-n.start):(++t,a[t]=r)}a.length=t+1;for(let t=0,n=a.length;t<n;t++){let n=a[t];e.bufferSubData(r,n.start*i.BYTES_PER_ELEMENT,i,n.start,n.count)}n.clearUpdateRanges()}n.onUploadCallback()}function i(e){return e.isInterleavedBufferAttribute&&(e=e.data),t.get(e)}function a(n){n.isInterleavedBufferAttribute&&(n=n.data);let r=t.get(n);r&&(e.deleteBuffer(r.buffer),t.delete(n))}function o(e,i){if(e.isInterleavedBufferAttribute&&(e=e.data),e.isGLBufferAttribute){let n=t.get(e);(!n||n.version<e.version)&&t.set(e,{buffer:e.buffer,type:e.type,bytesPerElement:e.elementSize,version:e.version});return}let a=t.get(e);if(a===void 0)t.set(e,n(e,i));else if(a.version<e.version){if(a.size!==e.array.byteLength)throw Error(`THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.`);r(a.buffer,e,i),a.version=e.version}}return{get:i,remove:a,update:o}}var Q={alphahash_fragment:`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,alphahash_pars_fragment:`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,alphamap_fragment:`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,alphamap_pars_fragment:`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,alphatest_fragment:`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,alphatest_pars_fragment:`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,aomap_fragment:`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,aomap_pars_fragment:`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,batching_pars_vertex:`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,batching_vertex:`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,begin_vertex:`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,beginnormal_vertex:`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,bsdfs:`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,iridescence_fragment:`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,bumpmap_pars_fragment:`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,clipping_planes_fragment:`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,clipping_planes_pars_fragment:`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,clipping_planes_pars_vertex:`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,clipping_planes_vertex:`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,color_fragment:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,color_pars_fragment:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,color_pars_vertex:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,color_vertex:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,common:`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,cube_uv_reflection_fragment:`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,defaultnormal_vertex:`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,displacementmap_pars_vertex:`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,displacementmap_vertex:`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,emissivemap_fragment:`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,emissivemap_pars_fragment:`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,colorspace_fragment:`gl_FragColor = linearToOutputTexel( gl_FragColor );`,colorspace_pars_fragment:`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,envmap_fragment:`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,envmap_common_pars_fragment:`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,envmap_pars_fragment:`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,envmap_pars_vertex:`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,envmap_physical_pars_fragment:`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_RETROREFLECTION
		vec3 getIBLRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 retroVec = normalize( mix( viewDir, normal, pow4( roughness ) ) );
				retroVec = transformDirectionByInverseViewMatrix( retroVec, viewMatrix );
				vec4 envMapColor = textureCubeUV( envMap, envMapRotation * retroVec, roughness );
				return envMapColor.rgb * envMapIntensity;
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
		#ifdef USE_RETROREFLECTION
			vec3 getIBLAnisotropyRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
				#ifdef ENVMAP_TYPE_CUBE_UV
					vec3 bentNormal = cross( bitangent, viewDir );
					bentNormal = normalize( cross( bentNormal, bitangent ) );
					bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
					return getIBLRetroRadiance( viewDir, bentNormal, roughness );
				#else
					return vec3( 0.0 );
				#endif
			}
		#endif
	#endif
#endif`,envmap_vertex:`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,fog_vertex:`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,fog_pars_vertex:`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,fog_fragment:`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,fog_pars_fragment:`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,gradientmap_pars_fragment:`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,lightmap_pars_fragment:`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,lights_lambert_fragment:`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,lights_lambert_pars_fragment:`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,lights_pars_begin:`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_SUN_LIGHTS > 0
	struct SunLight {
		vec3 direction;
		vec3 color;
	};
	uniform SunLight sunLights[ NUM_SUN_LIGHTS ];
	void getSunLightInfo( const in SunLight sunLight, out IncidentLight light ) {
		light.color = sunLight.color;
		light.direction = sunLight.direction;
		light.visible = true;
	}
#endif
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,lights_toon_fragment:`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,lights_toon_pars_fragment:`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,lights_phong_fragment:`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,lights_phong_pars_fragment:`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,lights_physical_fragment:`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_RETROREFLECTION
	material.retroreflectivity = retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,lights_physical_pars_fragment:`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	vec2 dfg;
	vec3 multiScatteringCompensation;
	#ifdef USE_RETROREFLECTION
		float retroreflectivity;
	#endif
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0Dielectric;
		vec3 iridescenceF0Metallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec2 fab, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec2 fab, const in vec3 specularColor, const in float specularF90, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	vec3 specularBRDF = BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	#ifdef USE_RETROREFLECTION
		vec3 retroViewDir = reflect( - geometryViewDir, geometryNormal );
		vec3 retroSpecularBRDF = BRDF_GGX( directLight.direction, retroViewDir, geometryNormal, material );
		specularBRDF = mix( specularBRDF, retroSpecularBRDF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directSpecular += irradiance * specularBRDF * material.multiScatteringCompensation;
	vec3 halfDir = normalize( directLight.direction + geometryViewDir );
	float dotVH = saturate( dot( geometryViewDir, halfDir ) );
	vec3 F = F_Schlick( material.specularColor, material.specularF90, dotVH );
	#ifdef USE_RETROREFLECTION
		vec3 retroHalfDir = normalize( directLight.direction + retroViewDir );
		float dotRetroVH = saturate( dot( retroViewDir, retroHalfDir ) );
		vec3 retroF = F_Schlick( material.specularColor, material.specularF90, dotRetroVH );
		F = mix( F, retroF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - F );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScattering, multiScattering );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScattering, multiScattering );
	#endif
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - singleScattering - multiScattering );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		sheenSpecularIndirect += irradiance * material.sheenColor * sheenAlbedo * RECIPROCAL_PI;
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( material.dfg, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceF0Metallic, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( material.dfg, material.diffuseColor, material.specularF90, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,lights_fragment_begin:`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		vec3 iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		vec3 iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( iridescenceFresnelDielectric, iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0Dielectric = Schlick_to_F0( iridescenceFresnelDielectric, 1.0, dotNVi );
		material.iridescenceF0Metallic = Schlick_to_F0( iridescenceFresnelMetallic, 1.0, dotNVi );
	}
#endif
#ifdef STANDARD
	float dotNVms = saturate( dot( geometryNormal, geometryViewDir ) );
	material.dfg = texture2D( dfgLUT, vec2( material.roughness, dotNVms ) ).rg;
	#if ( NUM_SUN_LIGHTS > 0 || NUM_DIR_LIGHTS > 0 || NUM_POINT_LIGHTS > 0 || NUM_SPOT_LIGHTS > 0 )
		float EssMs = material.dfg.x + material.dfg.y;
		material.multiScatteringCompensation = 1.0 + material.specularColorBlended * ( 1.0 / EssMs - 1.0 );
	#endif
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SUN_LIGHTS > 0 ) && defined( RE_Direct )
	SunLight sunLight;
	#if defined( USE_SHADOWMAP ) && NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHTS; i ++ ) {
		sunLight = sunLights[ i ];
		getSunLightInfo( sunLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SUN_LIGHT_SHADOWS )
		sunLightShadow = sunLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getSunShadow( sunShadowMap[ i ], sunLightShadow, UNROLLED_LOOP_INDEX ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,lights_fragment_maps:`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		vec3 iblRadiance = getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		vec3 iblRadiance = getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_RETROREFLECTION
		#ifdef USE_ANISOTROPY
			vec3 retroIBLRadiance = getIBLAnisotropyRetroRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
		#else
			vec3 retroIBLRadiance = getIBLRetroRadiance( geometryViewDir, geometryNormal, material.roughness );
		#endif
		iblRadiance = mix( iblRadiance, retroIBLRadiance, saturate( material.retroreflectivity ) );
	#endif
	radiance += iblRadiance;
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,lights_fragment_end:`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,lightprobes_pars_fragment:`#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,logdepthbuf_fragment:`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,logdepthbuf_pars_fragment:`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,logdepthbuf_pars_vertex:`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,logdepthbuf_vertex:`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,map_fragment:`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,map_pars_fragment:`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,map_particle_fragment:`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,map_particle_pars_fragment:`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,metalnessmap_fragment:`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,metalnessmap_pars_fragment:`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,morphinstance_vertex:`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,morphcolor_vertex:`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,morphnormal_vertex:`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,morphtarget_pars_vertex:`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,morphtarget_vertex:`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,normal_fragment_begin:`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,normal_fragment_maps:`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,normal_pars_fragment:`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,normal_pars_vertex:`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,normal_vertex:`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,normalmap_pars_fragment:`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,clearcoat_normal_fragment_begin:`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,clearcoat_normal_fragment_maps:`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,clearcoat_pars_fragment:`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,iridescence_pars_fragment:`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,opaque_fragment:`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,packing:`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,premultiplied_alpha_fragment:`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,project_vertex:`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,dithering_fragment:`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,dithering_pars_fragment:`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,roughnessmap_fragment:`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,roughnessmap_pars_fragment:`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,shadowmap_pars_fragment:`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		#define SUN_LIGHT_CASCADES 2
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#else
			uniform sampler2D sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#endif
		uniform mat4 sunShadowMatrix[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		uniform vec4 sunShadowCascade[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
		struct SunLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SunLightShadow sunLightShadows[ NUM_SUN_LIGHT_SHADOWS ];
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_SUN_LIGHT_SHADOWS > 0
		float getSunShadow(
			#if defined( SHADOWMAP_TYPE_PCF )
				sampler2DShadow shadowMap,
			#else
				sampler2D shadowMap,
			#endif
			SunLightShadow sunLightShadow,
			int shadowIndex
		) {
			vec4 shadowWorldPosition = vec4( vSunShadowWorldPosition.xyz + vSunShadowWorldNormal * sunLightShadow.shadowNormalBias, 1.0 );
			float viewDepth = vSunShadowWorldPosition.w;
			int cascadeOffset = shadowIndex * SUN_LIGHT_CASCADES;
			float shadow = 1.0;
			for ( int i = SUN_LIGHT_CASCADES - 1; i >= 0; i -- ) {
				vec4 cascade = sunShadowCascade[ cascadeOffset + i ];
				if ( viewDepth >= cascade.x && viewDepth < cascade.y ) {
					float cascadeShadow = getShadow(
						shadowMap,
						sunLightShadow.shadowMapSize,
						sunLightShadow.shadowIntensity,
						sunLightShadow.shadowBias,
						sunLightShadow.shadowRadius,
						sunShadowMatrix[ cascadeOffset + i ] * shadowWorldPosition
					);
					shadow = mix( cascadeShadow, shadow, smoothstep( cascade.z, cascade.y, viewDepth ) );
				}
			}
			return shadow;
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,shadowmap_pars_vertex:`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,shadowmap_vertex:`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_SUN_LIGHT_SHADOWS > 0
		vSunShadowWorldPosition = vec4( worldPosition.xyz, - mvPosition.z );
		vSunShadowWorldNormal = shadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,shadowmask_pars_fragment:`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHT_SHADOWS; i ++ ) {
		sunLight = sunLightShadows[ i ];
		shadow *= receiveShadow ? getSunShadow( sunShadowMap[ i ], sunLight, UNROLLED_LOOP_INDEX ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,skinbase_vertex:`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,skinning_pars_vertex:`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,skinning_vertex:`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,skinnormal_vertex:`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,specularmap_fragment:`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,specularmap_pars_fragment:`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,tonemapping_fragment:`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,tonemapping_pars_fragment:`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,transmission_fragment:`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,transmission_pars_fragment:`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,uv_pars_fragment:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,uv_pars_vertex:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,uv_vertex:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,worldpos_vertex:`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,background_vert:`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,background_frag:`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,backgroundCube_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,backgroundCube_frag:`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,cube_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,cube_frag:`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,depth_vert:`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,depth_frag:`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,distance_vert:`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,distance_frag:`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,equirect_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,equirect_frag:`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,linedashed_vert:`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,linedashed_frag:`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,meshbasic_vert:`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,meshbasic_frag:`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshlambert_vert:`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshlambert_frag:`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshmatcap_vert:`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,meshmatcap_frag:`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshnormal_vert:`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,meshnormal_frag:`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,meshphong_vert:`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshphong_frag:`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshphysical_vert:`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,meshphysical_frag:`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_RETROREFLECTION
	uniform float retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshtoon_vert:`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshtoon_frag:`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,points_vert:`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,points_frag:`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,shadow_vert:`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,shadow_frag:`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,sprite_vert:`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,sprite_frag:`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`},$={common:{diffuse:{value:new Z(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Y},alphaMap:{value:null},alphaMapTransform:{value:new Y},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Y}},envmap:{envMap:{value:null},envMapRotation:{value:new Y},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Y}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Y}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Y},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Y},normalScale:{value:new q(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Y},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Y}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Y}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Y}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Z(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new J},probesMax:{value:new J},probesResolution:{value:new J}},points:{diffuse:{value:new Z(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Y},alphaTest:{value:0},uvTransform:{value:new Y}},sprite:{diffuse:{value:new Z(16777215)},opacity:{value:1},center:{value:new q(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Y},alphaMap:{value:null},alphaMapTransform:{value:new Y},alphaTest:{value:0}}},go={basic:{uniforms:oa([$.common,$.specularmap,$.envmap,$.aomap,$.lightmap,$.fog]),vertexShader:Q.meshbasic_vert,fragmentShader:Q.meshbasic_frag},lambert:{uniforms:oa([$.common,$.specularmap,$.envmap,$.aomap,$.lightmap,$.emissivemap,$.bumpmap,$.normalmap,$.displacementmap,$.fog,$.lights,{emissive:{value:new Z(0)},envMapIntensity:{value:1}}]),vertexShader:Q.meshlambert_vert,fragmentShader:Q.meshlambert_frag},phong:{uniforms:oa([$.common,$.specularmap,$.envmap,$.aomap,$.lightmap,$.emissivemap,$.bumpmap,$.normalmap,$.displacementmap,$.fog,$.lights,{emissive:{value:new Z(0)},specular:{value:new Z(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Q.meshphong_vert,fragmentShader:Q.meshphong_frag},standard:{uniforms:oa([$.common,$.envmap,$.aomap,$.lightmap,$.emissivemap,$.bumpmap,$.normalmap,$.displacementmap,$.roughnessmap,$.metalnessmap,$.fog,$.lights,{emissive:{value:new Z(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Q.meshphysical_vert,fragmentShader:Q.meshphysical_frag},toon:{uniforms:oa([$.common,$.aomap,$.lightmap,$.emissivemap,$.bumpmap,$.normalmap,$.displacementmap,$.gradientmap,$.fog,$.lights,{emissive:{value:new Z(0)}}]),vertexShader:Q.meshtoon_vert,fragmentShader:Q.meshtoon_frag},matcap:{uniforms:oa([$.common,$.bumpmap,$.normalmap,$.displacementmap,$.fog,{matcap:{value:null}}]),vertexShader:Q.meshmatcap_vert,fragmentShader:Q.meshmatcap_frag},points:{uniforms:oa([$.points,$.fog]),vertexShader:Q.points_vert,fragmentShader:Q.points_frag},dashed:{uniforms:oa([$.common,$.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Q.linedashed_vert,fragmentShader:Q.linedashed_frag},depth:{uniforms:oa([$.common,$.displacementmap]),vertexShader:Q.depth_vert,fragmentShader:Q.depth_frag},normal:{uniforms:oa([$.common,$.bumpmap,$.normalmap,$.displacementmap,{opacity:{value:1}}]),vertexShader:Q.meshnormal_vert,fragmentShader:Q.meshnormal_frag},sprite:{uniforms:oa([$.sprite,$.fog]),vertexShader:Q.sprite_vert,fragmentShader:Q.sprite_frag},background:{uniforms:{uvTransform:{value:new Y},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Q.background_vert,fragmentShader:Q.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Y}},vertexShader:Q.backgroundCube_vert,fragmentShader:Q.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Q.cube_vert,fragmentShader:Q.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Q.equirect_vert,fragmentShader:Q.equirect_frag},distance:{uniforms:oa([$.common,$.displacementmap,{referencePosition:{value:new J},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Q.distance_vert,fragmentShader:Q.distance_frag},shadow:{uniforms:oa([$.lights,$.fog,{color:{value:new Z(0)},opacity:{value:1}}]),vertexShader:Q.shadow_vert,fragmentShader:Q.shadow_frag}};go.physical={uniforms:oa([go.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Y},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Y},clearcoatNormalScale:{value:new q(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Y},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Y},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Y},sheen:{value:0},sheenColor:{value:new Z(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Y},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Y},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Y},transmissionSamplerSize:{value:new q},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Y},attenuationDistance:{value:0},attenuationColor:{value:new Z(0)},specularColor:{value:new Z(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Y},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Y},anisotropyVector:{value:new q},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Y}}]),vertexShader:Q.meshphysical_vert,fragmentShader:Q.meshphysical_frag};var _o={r:0,b:0,g:0},vo=new wn,yo=new Y;yo.set(-1,0,0,0,1,0,0,0,1);function bo(e,t,n,r,i,a){let o=new Z(0),s=i===!0?0:1,c,l,u=null,d=0,f=null;function p(e){let n=e.isScene===!0?e.background:null;if(n&&n.isTexture){let r=e.backgroundBlurriness>0;n=t.get(n,r)}return n}function m(t){let r=!1,i=p(t);i===null?g(o,s):i&&i.isColor&&(g(i,1),r=!0);let c=e.xr.getEnvironmentBlendMode();c===`additive`?n.buffers.color.setClear(0,0,0,1,a):c===`alpha-blend`&&n.buffers.color.setClear(0,0,0,0,a),(e.autoClear||r)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil))}function h(t,n){let i=p(n);i&&(i.isCubeTexture||i.mapping===306)?(l===void 0&&(l=new wi(new na(1,1,1),new pa({name:`BackgroundCubeMaterial`,uniforms:aa(go.backgroundCube.uniforms),vertexShader:go.backgroundCube.vertexShader,fragmentShader:go.backgroundCube.fragmentShader,side:1,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute(`normal`),l.geometry.deleteAttribute(`uv`),l.onBeforeRender=function(e,t,n){this.matrixWorld.copyPosition(n.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(l)),l.material.uniforms.envMap.value=i,l.material.uniforms.backgroundBlurriness.value=n.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=n.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(vo.makeRotationFromEuler(n.backgroundRotation)).transpose(),i.isCubeTexture&&i.isRenderTargetTexture===!1&&l.material.uniforms.backgroundRotation.value.premultiply(yo),l.material.toneMapped=X.getTransfer(i.colorSpace)!==Mt,(u!==i||d!==i.version||f!==e.toneMapping)&&(l.material.needsUpdate=!0,u=i,d=i.version,f=e.toneMapping),l.layers.enableAll(),t.unshift(l,l.geometry,l.material,0,0,null)):i&&i.isTexture&&(c===void 0&&(c=new wi(new ra(2,2),new pa({name:`BackgroundMaterial`,uniforms:aa(go.background.uniforms),vertexShader:go.background.vertexShader,fragmentShader:go.background.fragmentShader,side:0,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute(`normal`),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(c)),c.material.uniforms.t2D.value=i,c.material.uniforms.backgroundIntensity.value=n.backgroundIntensity,c.material.toneMapped=X.getTransfer(i.colorSpace)!==Mt,i.matrixAutoUpdate===!0&&i.updateMatrix(),c.material.uniforms.uvTransform.value.copy(i.matrix),(u!==i||d!==i.version||f!==e.toneMapping)&&(c.material.needsUpdate=!0,u=i,d=i.version,f=e.toneMapping),c.layers.enableAll(),t.unshift(c,c.geometry,c.material,0,0,null))}function g(t,r){t.getRGB(_o,la(e)),n.buffers.color.setClear(_o.r,_o.g,_o.b,r,a)}function _(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return o},setClearColor:function(e,t=1){o.set(e),s=t,g(o,s)},getClearAlpha:function(){return s},setClearAlpha:function(e){s=e,g(o,s)},render:m,addToRenderList:h,dispose:_}}function xo(e,t){let n=e.getParameter(e.MAX_VERTEX_ATTRIBS),r={},i=f(null),a=i,o=!1;function s(n,r,i,s,c){let u=!1,f=d(n,s,i,r);a!==f&&(a=f,l(a.object)),u=p(n,s,i,c),u&&m(n,s,i,c),c!==null&&t.update(c,e.ELEMENT_ARRAY_BUFFER),(u||o)&&(o=!1,b(n,r,i,s),c!==null&&e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,t.get(c).buffer))}function c(){return e.createVertexArray()}function l(t){return e.bindVertexArray(t)}function u(t){return e.deleteVertexArray(t)}function d(e,t,n,i){let a=i.wireframe===!0,o=r[t.id];o===void 0&&(o={},r[t.id]=o);let s=e.isInstancedMesh===!0?e.id:0,l=o[s];l===void 0&&(l={},o[s]=l);let u=l[n.id];u===void 0&&(u={},l[n.id]=u);let d=u[a];return d===void 0&&(d=f(c()),u[a]=d),d}function f(e){let t=[],r=[],i=[];for(let e=0;e<n;e++)t[e]=0,r[e]=0,i[e]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:t,enabledAttributes:r,attributeDivisors:i,object:e,attributes:{},index:null}}function p(e,t,n,r){let i=a.attributes,o=t.attributes,s=0,c=n.getAttributes();for(let t in c)if(c[t].location>=0){let n=i[t],r=o[t];if(r===void 0&&(t===`instanceMatrix`&&e.instanceMatrix&&(r=e.instanceMatrix),t===`instanceColor`&&e.instanceColor&&(r=e.instanceColor)),n===void 0||n.attribute!==r||r&&n.data!==r.data)return!0;s++}return a.attributesNum!==s||a.index!==r}function m(e,t,n,r){let i={},o=t.attributes,s=0,c=n.getAttributes();for(let t in c)if(c[t].location>=0){let n=o[t];n===void 0&&(t===`instanceMatrix`&&e.instanceMatrix&&(n=e.instanceMatrix),t===`instanceColor`&&e.instanceColor&&(n=e.instanceColor));let r={};r.attribute=n,n&&n.data&&(r.data=n.data),i[t]=r,s++}a.attributes=i,a.attributesNum=s,a.index=r}function h(){let e=a.newAttributes;for(let t=0,n=e.length;t<n;t++)e[t]=0}function g(e){_(e,0)}function _(t,n){let r=a.newAttributes,i=a.enabledAttributes,o=a.attributeDivisors;r[t]=1,i[t]===0&&(e.enableVertexAttribArray(t),i[t]=1),o[t]!==n&&(e.vertexAttribDivisor(t,n),o[t]=n)}function v(){let t=a.newAttributes,n=a.enabledAttributes;for(let r=0,i=n.length;r<i;r++)n[r]!==t[r]&&(e.disableVertexAttribArray(r),n[r]=0)}function y(t,n,r,i,a,o,s){s===!0?e.vertexAttribIPointer(t,n,r,a,o):e.vertexAttribPointer(t,n,r,i,a,o)}function b(n,r,i,a){h();let o=a.attributes,s=i.getAttributes(),c=r.defaultAttributeValues;for(let r in s){let i=s[r];if(i.location>=0){let s=o[r];if(s===void 0&&(r===`instanceMatrix`&&n.instanceMatrix&&(s=n.instanceMatrix),r===`instanceColor`&&n.instanceColor&&(s=n.instanceColor)),s!==void 0){let r=s.normalized,o=s.itemSize,c=t.get(s);if(c===void 0)continue;let l=c.buffer,u=c.type,d=c.bytesPerElement,f=u===e.INT||u===e.UNSIGNED_INT||s.gpuType===1013;if(s.isInterleavedBufferAttribute){let t=s.data,c=t.stride,p=s.offset;if(t.isInstancedInterleavedBuffer){for(let e=0;e<i.locationSize;e++)_(i.location+e,t.meshPerAttribute);n.isInstancedMesh!==!0&&a._maxInstanceCount===void 0&&(a._maxInstanceCount=t.meshPerAttribute*t.count)}else for(let e=0;e<i.locationSize;e++)g(i.location+e);e.bindBuffer(e.ARRAY_BUFFER,l);for(let e=0;e<i.locationSize;e++)y(i.location+e,o/i.locationSize,u,r,c*d,(p+o/i.locationSize*e)*d,f)}else{if(s.isInstancedBufferAttribute){for(let e=0;e<i.locationSize;e++)_(i.location+e,s.meshPerAttribute);n.isInstancedMesh!==!0&&a._maxInstanceCount===void 0&&(a._maxInstanceCount=s.meshPerAttribute*s.count)}else for(let e=0;e<i.locationSize;e++)g(i.location+e);e.bindBuffer(e.ARRAY_BUFFER,l);for(let e=0;e<i.locationSize;e++)y(i.location+e,o/i.locationSize,u,r,o*d,o/i.locationSize*e*d,f)}}else if(c!==void 0){let t=c[r];if(t!==void 0)switch(t.length){case 2:e.vertexAttrib2fv(i.location,t);break;case 3:e.vertexAttrib3fv(i.location,t);break;case 4:e.vertexAttrib4fv(i.location,t);break;default:e.vertexAttrib1fv(i.location,t)}}}}v()}function x(){T();for(let e in r){let t=r[e];for(let e in t){let n=t[e];for(let e in n){let t=n[e];for(let e in t)u(t[e].object),delete t[e];delete n[e]}}delete r[e]}}function S(e){if(r[e.id]===void 0)return;let t=r[e.id];for(let e in t){let n=t[e];for(let e in n){let t=n[e];for(let e in t)u(t[e].object),delete t[e];delete n[e]}}delete r[e.id]}function C(e){for(let t in r){let n=r[t];for(let t in n){let r=n[t];if(r[e.id]===void 0)continue;let i=r[e.id];for(let e in i)u(i[e].object),delete i[e];delete r[e.id]}}}function w(e){for(let t in r){let n=r[t],i=e.isInstancedMesh===!0?e.id:0,a=n[i];if(a!==void 0){for(let e in a){let t=a[e];for(let e in t)u(t[e].object),delete t[e];delete a[e]}delete n[i],Object.keys(n).length===0&&delete r[t]}}}function T(){E(),o=!0,a!==i&&(a=i,l(a.object))}function E(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:s,reset:T,resetDefaultState:E,dispose:x,releaseStatesOfGeometry:S,releaseStatesOfObject:w,releaseStatesOfProgram:C,initAttributes:h,enableAttribute:g,disableUnusedAttributes:v}}function So(e,t,n){let r;function i(e){r=e}function a(t,i){e.drawArrays(r,t,i),n.update(i,r,1)}function o(t,i,a){a!==0&&(e.drawArraysInstanced(r,t,i,a),n.update(i,r,a))}function s(e,i,a){if(a===0)return;t.get(`WEBGL_multi_draw`).multiDrawArraysWEBGL(r,e,0,i,0,a);let o=0;for(let e=0;e<a;e++)o+=i[e];n.update(o,r,1)}this.setMode=i,this.render=a,this.renderInstances=o,this.renderMultiDraw=s}function Co(e,t,n,r){let i;function a(){if(i!==void 0)return i;if(t.has(`EXT_texture_filter_anisotropic`)===!0){let n=t.get(`EXT_texture_filter_anisotropic`);i=e.getParameter(n.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function o(t){return t===1023||r.convert(t)===e.getParameter(e.IMPLEMENTATION_COLOR_READ_FORMAT)}function s(n){let i=n===1016&&(t.has(`EXT_color_buffer_half_float`)||t.has(`EXT_color_buffer_float`));return!(n!==1009&&n!==1015&&!i&&r.convert(n)!==e.getParameter(e.IMPLEMENTATION_COLOR_READ_TYPE))}function c(t){if(t===`highp`){if(e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.HIGH_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.HIGH_FLOAT).precision>0)return`highp`;t=`mediump`}return t===`mediump`&&e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.MEDIUM_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.MEDIUM_FLOAT).precision>0?`mediump`:`lowp`}let l=n.precision===void 0?`highp`:n.precision,u=c(l);u!==l&&(W(`WebGLRenderer:`,l,`not supported, using`,u,`instead.`),l=u);let d=n.logarithmicDepthBuffer===!0,f=n.reversedDepthBuffer===!0&&t.has(`EXT_clip_control`);n.reversedDepthBuffer===!0&&f===!1&&W(`WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.`);let p=e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS),m=e.getParameter(e.MAX_VERTEX_TEXTURE_IMAGE_UNITS),h=e.getParameter(e.MAX_TEXTURE_SIZE),g=e.getParameter(e.MAX_CUBE_MAP_TEXTURE_SIZE),_=e.getParameter(e.MAX_VERTEX_ATTRIBS),v=e.getParameter(e.MAX_VERTEX_UNIFORM_VECTORS),y=e.getParameter(e.MAX_VARYING_VECTORS),b=e.getParameter(e.MAX_FRAGMENT_UNIFORM_VECTORS),x=e.getParameter(e.MAX_SAMPLES),S=e.getParameter(e.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:a,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:s,precision:l,logarithmicDepthBuffer:d,reversedDepthBuffer:f,maxTextures:p,maxVertexTextures:m,maxTextureSize:h,maxCubemapSize:g,maxAttributes:_,maxVertexUniforms:v,maxVaryings:y,maxFragmentUniforms:b,maxSamples:x,samples:S}}function wo(e){let t=this,n=null,r=0,i=!1,a=!1,o=new ii,s=new Y,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(e,t){let n=e.length!==0||t||r!==0||i;return i=t,r=e.length,n},this.beginShadows=function(){a=!0,u(null)},this.endShadows=function(){a=!1},this.setGlobalState=function(e,t){n=u(e,t,0)},this.setState=function(t,o,s){let d=t.clippingPlanes,f=t.clipIntersection,p=t.clipShadows,m=e.get(t);if(!i||d===null||d.length===0||a&&!p)a?u(null):l();else{let e=a?0:r,t=e*4,i=m.clippingState||null;c.value=i,i=u(d,o,t,s);for(let e=0;e!==t;++e)i[e]=n[e];m.clippingState=i,this.numIntersection=f?this.numPlanes:0,this.numPlanes+=e}};function l(){c.value!==n&&(c.value=n,c.needsUpdate=r>0),t.numPlanes=r,t.numIntersection=0}function u(e,n,r,i){let a=e===null?0:e.length,l=null;if(a!==0){if(l=c.value,i!==!0||l===null){let t=r+a*4,i=n.matrixWorldInverse;s.getNormalMatrix(i),(l===null||l.length<t)&&(l=new Float32Array(t));for(let t=0,n=r;t!==a;++t,n+=4)o.copy(e[t]).applyMatrix4(i,s),o.normal.toArray(l,n),l[n+3]=o.constant}c.value=l,c.needsUpdate=!0}return t.numPlanes=a,t.numIntersection=0,l}}var To=4,Eo=6,Do=20,Oo=256,ko=new Wa,Ao=new Z,jo=null,Mo=0,No=0,Po=!1,Fo=new J,Io=new J,Lo=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,n=.1,r=100,i={}){let{size:a=256,position:o=Fo}=i;jo=this._renderer.getRenderTarget(),Mo=this._renderer.getActiveCubeFace(),No=this._renderer.getActiveMipmapLevel(),Po=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);let s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(e,n,r,s,o),t>0&&this._blur(s,0,0,t),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Wo(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Uo(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=2**this._lodMax}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(jo,Mo,No),this._renderer.xr.enabled=Po,e.scissorTest=!1,Bo(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===301||e.mapping===302?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),jo=this._renderer.getRenderTarget(),Mo=this._renderer.getActiveCubeFace(),No=this._renderer.getActiveMipmapLevel(),Po=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:ve,minFilter:ve,generateMipmaps:!1,type:Te,format:je,colorSpace:At,depthBuffer:!1},r=zo(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=zo(e,t,n);let{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=Ro(r)),this._blurMaterial=Ho(r,e,t),this._ggxMaterial=Vo(r,e,t)}return r}_compileMaterial(e){let t=new wi(new ei,e);this._renderer.compile(t,ko)}_sceneToCubeUV(e,t,n,r,i){let a=new Ua(90,1,t,n),o=[1,-1,1,1,1,1],s=[1,1,1,-1,-1,-1],c=this._renderer,l=c.autoClear,u=c.toneMapping;c.getClearColor(Ao),c.toneMapping=0,c.autoClear=!1,c.state.buffers.depth.getReversed()&&(c.setRenderTarget(r),c.clearDepth(),c.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new wi(new na,new fi({name:`PMREM.Background`,side:1,depthWrite:!1,depthTest:!1})));let d=this._backgroundBox,f=d.material,p=!1,m=e.background;m?m.isColor&&(f.color.copy(m),e.background=null,p=!0):(f.color.copy(Ao),p=!0);for(let t=0;t<6;t++){let n=t%3;n===0?(a.up.set(0,o[t],0),a.position.set(i.x,i.y,i.z),a.lookAt(i.x+s[t],i.y,i.z)):n===1?(a.up.set(0,0,o[t]),a.position.set(i.x,i.y,i.z),a.lookAt(i.x,i.y+s[t],i.z)):(a.up.set(0,o[t],0),a.position.set(i.x,i.y,i.z),a.lookAt(i.x,i.y,i.z+s[t]));let l=this._cubeSize;Bo(r,n*l,t>2?l:0,l,l),c.setRenderTarget(r),p&&c.render(d,a),c.render(e,a)}c.toneMapping=u,c.autoClear=l,e.background=m}_textureToCubeUV(e,t){let n=this._renderer,r=e.mapping===301||e.mapping===302;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=Wo()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Uo());let i=r?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=i;let o=i.uniforms;o.envMap.value=e;let s=this._cubeSize;Bo(t,0,0,3*s,2*s),n.setRenderTarget(t),n.render(a,ko)}_applyPMREM(e){let t=this._renderer,n=t.autoClear;t.autoClear=!1;let r=this._lodMeshes.length;for(let t=1;t<r;t++)this._applyGGXFilter(e,t-1,t);t.autoClear=n}_applyGGXFilter(e,t,n){let r=this._renderer,i=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[n];o.material=a;let s=a.uniforms,c=n/(this._lodMeshes.length-1),l=t/(this._lodMeshes.length-1),u=Math.sqrt(c*c-l*l)*(c*1.25),{_lodMax:d}=this,f=this._sizeLods[n],p=3*f*(n>d-To?n-d+To:0),m=4*(this._cubeSize-f);s.envMap.value=e.texture,s.roughness.value=u,s.mipInt.value=d-t,Bo(i,p,m,3*f,2*f),r.setRenderTarget(i),r.render(o,ko),s.envMap.value=i.texture,s.roughness.value=0,s.mipInt.value=d-n,Bo(e,p,m,3*f,2*f),r.setRenderTarget(e),r.render(o,ko)}_blur(e,t,n,r){let i=this._pingPongRenderTarget,a=Math.min(r,Math.PI)/Math.SQRT2;this._blurPass(e,i,t,n,a),this._blurPass(i,e,n,n,a)}_blurPass(e,t,n,r,i){let a=this._renderer,o=this._blurMaterial,s=this._lodMeshes[r];s.material=o;let c=o.uniforms;c.envMap.value=e.texture,c.sigma.value=i,c.mipInt.value=this._lodMax-n;let l=this._sizeLods[r];Bo(t,3*l*(r>this._lodMax-To?r-this._lodMax+To:0),4*(this._cubeSize-l),3*l,2*l),a.setRenderTarget(t),a.render(s,ko)}};function Ro(e){let t=[],n=[],r=e,i=e-To+1+Eo;for(let e=0;e<i;e++){let e=2**r;t.push(e);let i=1/(e-2),a=-i,o=1+i,s=[a,a,o,a,o,o,a,a,o,o,a,o],c=new Float32Array(108),l=new Float32Array(108);for(let e=0;e<6;e++){let t=e%3*2/3-1,n=e>2?0:-1,r=[t,n,0,t+2/3,n,0,t+2/3,n+1,0,t,n,0,t+2/3,n+1,0,t,n+1,0];c.set(r,18*e);for(let t=0;t<6;t++){let n=s[t*2]*2-1,r=s[t*2+1]*2-1;e===0?Io.set(1,r,n):e===1?Io.set(-n,1,-r):e===2?Io.set(-n,r,1):e===3?Io.set(-1,r,-n):e===4?Io.set(-n,-1,r):Io.set(n,r,-1),Io.toArray(l,(e*6+t)*3)}}let u=new ei;u.setAttribute(`position`,new zr(c,3)),u.setAttribute(`outputDirection`,new zr(l,3)),n.push(new wi(u,null)),r>To&&r--}return{lodMeshes:n,sizeLods:t}}function zo(e,t,n){let r=new xn(e,t,n);return r.texture.mapping=306,r.texture.name=`PMREM.cubeUv`,r.scissorTest=!0,r}function Bo(e,t,n,r,i){e.viewport.set(t,n,r,i),e.scissor.set(t,n,r,i)}function Vo(e,t,n){return new pa({name:`PMREMGGXConvolution`,defines:{GGX_SAMPLES:Oo,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${e}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Go(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function Ho(e,t,n){return new pa({name:`SphericalGaussianBlur`,defines:{SAMPLES:Do,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${e}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:Go(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float sigma;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359
			#define GOLDEN_ANGLE 2.39996322973

			void main() {

				if ( sigma == 0.0 ) {

					gl_FragColor = vec4( bilinearCubeUV( envMap, vOutputDirection, mipInt ), 1.0 );
					return;

				}

				vec3 outputDirection = normalize( vOutputDirection );

				vec3 up = abs( outputDirection.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
				vec3 tangent = normalize( cross( up, outputDirection ) );
				vec3 bitangent = cross( outputDirection, tangent );

				// Truncate the kernel at three standard deviations or at the antipode.
				float thetaMax = min( 3.0 * sigma, PI );
				float truncation = 1.0 - exp( - 0.5 * thetaMax * thetaMax / ( sigma * sigma ) );

				vec3 accumColor = vec3( 0.0 );
				float accumWeight = 0.0;

				for ( int i = 0; i < SAMPLES; i ++ ) {

					// Stratified inverse-CDF sampling of the Gaussian, placed on a golden-angle spiral.
					float stratum = ( float( i ) + 0.5 ) / float( SAMPLES );
					float theta = sigma * sqrt( - 2.0 * log( 1.0 - stratum * truncation ) );
					float phi = float( i ) * GOLDEN_ANGLE;

					vec3 offset = cos( phi ) * tangent + sin( phi ) * bitangent;
					vec3 sampleDirection = cos( theta ) * outputDirection + sin( theta ) * offset;

					// Correct the planar sample density to solid angle.
					float weight = sin( theta ) / theta;

					accumColor += weight * bilinearCubeUV( envMap, sampleDirection, mipInt );
					accumWeight += weight;

				}

				gl_FragColor = vec4( accumColor / accumWeight, 1.0 );

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function Uo(){return new pa({name:`EquirectangularToCubeUV`,uniforms:{envMap:{value:null}},vertexShader:Go(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function Wo(){return new pa({name:`CubemapToCubeUV`,uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Go(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function Go(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}var Ko=class extends xn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},r=[n,n,n,n,n,n];this.texture=new Qi(r),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new na(5,5,5),i=new pa({name:`CubemapFromEquirect`,uniforms:aa(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:1,blending:0});i.uniforms.tEquirect.value=t;let a=new wi(r,i),o=t.minFilter;return t.minFilter===1008&&(t.minFilter=ve),new qa(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,r=!0){let i=e.getRenderTarget();for(let i=0;i<6;i++)e.setRenderTarget(this,i),e.clear(t,n,r);e.setRenderTarget(i)}};function qo(e){let t=new WeakMap,n=new WeakMap,r=null;function i(e,t=!1){return e==null?null:t?o(e):a(e)}function a(n){if(n&&n.isTexture){let r=n.mapping;if(r===303||r===304){if(t.has(n)){let e=t.get(n).texture;return s(e,n.mapping)}{let r=n.image;if(r&&r.height>0){let i=new Ko(r.height);return i.fromEquirectangularTexture(e,n),t.set(n,i),n.addEventListener(`dispose`,l),s(i.texture,n.mapping)}return null}}}return n}function o(t){if(t&&t.isTexture){let i=t.mapping,a=i===303||i===304,o=i===301||i===302;if(a||o){let i=n.get(t),s=i===void 0?0:i.texture.pmremVersion;if(t.isRenderTargetTexture&&t.pmremVersion!==s)return r===null&&(r=new Lo(e)),i=a?r.fromEquirectangular(t,i):r.fromCubemap(t,i),i.texture.pmremVersion=t.pmremVersion,n.set(t,i),i.texture;if(i!==void 0)return i.texture;{let s=t.image;return a&&s&&s.height>0||o&&s&&c(s)?(r===null&&(r=new Lo(e)),i=a?r.fromEquirectangular(t):r.fromCubemap(t),i.texture.pmremVersion=t.pmremVersion,n.set(t,i),t.addEventListener(`dispose`,u),i.texture):null}}}return t}function s(e,t){return t===303?e.mapping=301:t===304&&(e.mapping=302),e}function c(e){let t=0;for(let n=0;n<6;n++)e[n]!==void 0&&t++;return t===6}function l(e){let n=e.target;n.removeEventListener(`dispose`,l);let r=t.get(n);r!==void 0&&(t.delete(n),r.dispose())}function u(e){let t=e.target;t.removeEventListener(`dispose`,u);let r=n.get(t);r!==void 0&&(n.delete(t),r.dispose())}function d(){t=new WeakMap,n=new WeakMap,r!==null&&(r.dispose(),r=null)}return{get:i,dispose:d}}function Jo(e){let t={};function n(n){if(t[n]!==void 0)return t[n];let r=e.getExtension(n);return t[n]=r,r}return{has:function(e){return n(e)!==null},init:function(){n(`EXT_color_buffer_float`),n(`WEBGL_clip_cull_distance`),n(`OES_texture_float_linear`),n(`EXT_color_buffer_half_float`),n(`WEBGL_multisampled_render_to_texture`),n(`WEBGL_render_shared_exponent`)},get:function(e){let t=n(e);return t===null&&Ut(`WebGLRenderer: `+e+` extension not supported.`),t}}}function Yo(e,t,n,r){let i={},a=new WeakMap;function o(e){let s=e.target;s.index!==null&&t.remove(s.index);for(let e in s.attributes)t.remove(s.attributes[e]);s.removeEventListener(`dispose`,o),delete i[s.id];let c=a.get(s);c&&(t.remove(c),a.delete(s)),r.releaseStatesOfGeometry(s),s.isInstancedBufferGeometry===!0&&delete s._maxInstanceCount,n.memory.geometries--}function s(e,t){return i[t.id]===!0||(t.addEventListener(`dispose`,o),i[t.id]=!0,n.memory.geometries++),t}function c(n){let r=n.attributes;for(let n in r)t.update(r[n],e.ARRAY_BUFFER)}function l(e){let n=[],r=e.index,i=e.attributes.position,o=0;if(i===void 0)return;if(r!==null){let e=r.array;o=r.version;for(let t=0,r=e.length;t<r;t+=3){let r=e[t+0],i=e[t+1],a=e[t+2];n.push(r,i,i,a,a,r)}}else{let e=i.array;o=i.version;for(let t=0,r=e.length/3-1;t<r;t+=3){let e=t+0,r=t+1,i=t+2;n.push(e,r,r,i,i,e)}}let s=new(i.count>=65535?Vr:Br)(n,1);s.version=o;let c=a.get(e);c&&t.remove(c),a.set(e,s)}function u(e){let t=a.get(e);if(t){let n=e.index;n!==null&&t.version<n.version&&l(e)}else l(e);return a.get(e)}return{get:s,update:c,getWireframeAttribute:u}}function Xo(e,t,n){let r;function i(e){r=e}let a,o;function s(e){a=e.type,o=e.bytesPerElement}function c(t,i){e.drawElements(r,i,a,t*o),n.update(i,r,1)}function l(t,i,s){s!==0&&(e.drawElementsInstanced(r,i,a,t*o,s),n.update(i,r,s))}function u(e,i,o){if(o===0)return;t.get(`WEBGL_multi_draw`).multiDrawElementsWEBGL(r,i,0,a,e,0,o);let s=0;for(let e=0;e<o;e++)s+=i[e];n.update(s,r,1)}this.setMode=i,this.setIndex=s,this.render=c,this.renderInstances=l,this.renderMultiDraw=u}function Zo(e){let t={geometries:0,textures:0},n={frame:0,calls:0,triangles:0,points:0,lines:0};function r(t,r,i){switch(n.calls++,r){case e.TRIANGLES:n.triangles+=t/3*i;break;case e.LINES:n.lines+=t/2*i;break;case e.LINE_STRIP:n.lines+=i*(t-1);break;case e.LINE_LOOP:n.lines+=i*t;break;case e.POINTS:n.points+=i*t;break;default:G(`WebGLInfo: Unknown draw mode:`,r)}}function i(){n.calls=0,n.triangles=0,n.points=0,n.lines=0}return{memory:t,render:n,programs:null,autoReset:!0,reset:i,update:r}}function Qo(e,t,n){let r=new WeakMap,i=new yn;function a(a,o,s){let c=a.morphTargetInfluences,l=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,u=l===void 0?0:l.length,d=r.get(o);if(d===void 0||d.count!==u){d!==void 0&&d.texture.dispose();let e=o.morphAttributes.position!==void 0,n=o.morphAttributes.normal!==void 0,a=o.morphAttributes.color!==void 0,s=o.morphAttributes.position||[],c=o.morphAttributes.normal||[],l=o.morphAttributes.color||[],f=0;e===!0&&(f=1),n===!0&&(f=2),a===!0&&(f=3);let p=o.attributes.position.count*f,m=1;p>t.maxTextureSize&&(m=Math.ceil(p/t.maxTextureSize),p=t.maxTextureSize);let h=new Float32Array(p*m*4*u),g=new Sn(h,p,m,u);g.type=V,g.needsUpdate=!0;let _=f*4;for(let t=0;t<u;t++){let r=s[t],o=c[t],u=l[t],d=p*m*4*t;for(let t=0;t<r.count;t++){let s=t*_;e===!0&&(i.fromBufferAttribute(r,t),h[d+s+0]=i.x,h[d+s+1]=i.y,h[d+s+2]=i.z,h[d+s+3]=0),n===!0&&(i.fromBufferAttribute(o,t),h[d+s+4]=i.x,h[d+s+5]=i.y,h[d+s+6]=i.z,h[d+s+7]=0),a===!0&&(i.fromBufferAttribute(u,t),h[d+s+8]=i.x,h[d+s+9]=i.y,h[d+s+10]=i.z,h[d+s+11]=u.itemSize===4?i.w:1)}}d={count:u,texture:g,size:new q(p,m)},r.set(o,d);function v(){g.dispose(),r.delete(o),o.removeEventListener(`dispose`,v)}o.addEventListener(`dispose`,v)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)s.getUniforms().setValue(e,`morphTexture`,a.morphTexture,n);else{let t=0;for(let e=0;e<c.length;e++)t+=c[e];let n=o.morphTargetsRelative?1:1-t;s.getUniforms().setValue(e,`morphTargetBaseInfluence`,n),s.getUniforms().setValue(e,`morphTargetInfluences`,c)}s.getUniforms().setValue(e,`morphTargetsTexture`,d.texture,n),s.getUniforms().setValue(e,`morphTargetsTextureSize`,d.size)}return{update:a}}function $o(e,t,n,r,i){let a=new WeakMap;function o(r){let o=i.render.frame,s=r.geometry,l=t.get(r,s);if(a.get(l)!==o&&(t.update(l),a.set(l,o)),r.isInstancedMesh&&(r.hasEventListener(`dispose`,c)===!1&&r.addEventListener(`dispose`,c),a.get(r)!==o&&(n.update(r.instanceMatrix,e.ARRAY_BUFFER),r.instanceColor!==null&&n.update(r.instanceColor,e.ARRAY_BUFFER),a.set(r,o))),r.isSkinnedMesh){let e=r.skeleton;a.get(e)!==o&&(e.update(),a.set(e,o))}return l}function s(){a=new WeakMap}function c(e){let t=e.target;t.removeEventListener(`dispose`,c),r.releaseStatesOfObject(t),n.remove(t.instanceMatrix),t.instanceColor!==null&&n.remove(t.instanceColor)}return{update:o,dispose:s}}var es={1:`LINEAR_TONE_MAPPING`,2:`REINHARD_TONE_MAPPING`,3:`CINEON_TONE_MAPPING`,4:`ACES_FILMIC_TONE_MAPPING`,6:`AGX_TONE_MAPPING`,7:`NEUTRAL_TONE_MAPPING`,5:`CUSTOM_TONE_MAPPING`};function ts(e,t,n,r,i,a){let o=new xn(t,n,{type:e,depthBuffer:i,stencilBuffer:a,samples:r?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),s=null,c=null,l=new ei;l.setAttribute(`position`,new Hr([-1,3,0,-1,-1,0,3,-1,0],3)),l.setAttribute(`uv`,new Hr([0,2,0,0,2,0],2));let u=new ma({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),d=new wi(l,u),f=new Wa(-1,1,1,-1,0,1),p=null,m=null,h=!1,g,_=null,v=[],y=!1;this.setSize=function(e,t){o.setSize(e,t),s!==null&&s.setSize(e,t),c!==null&&c.setSize(e,t);for(let n=0;n<v.length;n++){let r=v[n];r.setSize&&r.setSize(e,t)}},this.setEffects=function(e){v=e,y=v.length>0&&v[0].isRenderPass===!0;let t=o.width,n=o.height;v.length>0&&s===null&&(s=new xn(t,n,{type:Te,depthBuffer:!1,stencilBuffer:!1}),c=new xn(t,n,{type:Te,depthBuffer:!1,stencilBuffer:!1}));for(let e=0;e<v.length;e++){let r=v[e];r.setSize&&r.setSize(t,n)}},this.begin=function(e,t){if(h||e.toneMapping===0&&v.length===0)return!1;if(_=t,t!==null){let e=t.width,n=t.height;(o.width!==e||o.height!==n)&&this.setSize(e,n)}return y===!1&&e.setRenderTarget(o),g=e.toneMapping,e.toneMapping=0,!0},this.hasRenderPass=function(){return y},this.end=function(e,t){e.toneMapping=g,h=!0;let n=o,r=s;for(let i=0;i<v.length;i++){let a=v[i];a.enabled!==!1&&(a.render(e,r,n,t),a.needsSwap!==!1&&(n=r,r=r===s?c:s))}if(p!==e.outputColorSpace||m!==e.toneMapping){p=e.outputColorSpace,m=e.toneMapping,u.defines={},X.getTransfer(p)===`srgb`&&(u.defines.SRGB_TRANSFER=``);let t=es[m];t&&(u.defines[t]=``),u.needsUpdate=!0}u.uniforms.tDiffuse.value=n.texture,e.setRenderTarget(_),e.render(d,f),_=null,h=!1},this.isCompositing=function(){return h},this.dispose=function(){o.dispose(),s!==null&&s.dispose(),c!==null&&c.dispose(),l.dispose(),u.dispose()}}var ns=new vn,rs=new $i(1,1),is=new Sn,as=new Cn,os=new Qi,ss=[],cs=[],ls=new Float32Array(16),us=new Float32Array(9),ds=new Float32Array(4);function fs(e,t,n){let r=e[0];if(r<=0||r>0)return e;let i=t*n,a=ss[i];if(a===void 0&&(a=new Float32Array(i),ss[i]=a),t!==0){r.toArray(a,0);for(let r=1,i=0;r!==t;++r)i+=n,e[r].toArray(a,i)}return a}function ps(e,t){if(e.length!==t.length)return!1;for(let n=0,r=e.length;n<r;n++)if(e[n]!==t[n])return!1;return!0}function ms(e,t){for(let n=0,r=t.length;n<r;n++)e[n]=t[n]}function hs(e,t){let n=cs[t];n===void 0&&(n=new Int32Array(t),cs[t]=n);for(let r=0;r!==t;++r)n[r]=e.allocateTextureUnit();return n}function gs(e,t){let n=this.cache;n[0]!==t&&(e.uniform1f(this.addr,t),n[0]=t)}function _s(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2f(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(ps(n,t))return;e.uniform2fv(this.addr,t),ms(n,t)}}function vs(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3f(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else if(t.r!==void 0)(n[0]!==t.r||n[1]!==t.g||n[2]!==t.b)&&(e.uniform3f(this.addr,t.r,t.g,t.b),n[0]=t.r,n[1]=t.g,n[2]=t.b);else{if(ps(n,t))return;e.uniform3fv(this.addr,t),ms(n,t)}}function ys(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4f(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(ps(n,t))return;e.uniform4fv(this.addr,t),ms(n,t)}}function bs(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(ps(n,t))return;e.uniformMatrix2fv(this.addr,!1,t),ms(n,t)}else{if(ps(n,r))return;ds.set(r),e.uniformMatrix2fv(this.addr,!1,ds),ms(n,r)}}function xs(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(ps(n,t))return;e.uniformMatrix3fv(this.addr,!1,t),ms(n,t)}else{if(ps(n,r))return;us.set(r),e.uniformMatrix3fv(this.addr,!1,us),ms(n,r)}}function Ss(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(ps(n,t))return;e.uniformMatrix4fv(this.addr,!1,t),ms(n,t)}else{if(ps(n,r))return;ls.set(r),e.uniformMatrix4fv(this.addr,!1,ls),ms(n,r)}}function Cs(e,t){let n=this.cache;n[0]!==t&&(e.uniform1i(this.addr,t),n[0]=t)}function ws(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2i(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(ps(n,t))return;e.uniform2iv(this.addr,t),ms(n,t)}}function Ts(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3i(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(ps(n,t))return;e.uniform3iv(this.addr,t),ms(n,t)}}function Es(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4i(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(ps(n,t))return;e.uniform4iv(this.addr,t),ms(n,t)}}function Ds(e,t){let n=this.cache;n[0]!==t&&(e.uniform1ui(this.addr,t),n[0]=t)}function Os(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2ui(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(ps(n,t))return;e.uniform2uiv(this.addr,t),ms(n,t)}}function ks(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3ui(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(ps(n,t))return;e.uniform3uiv(this.addr,t),ms(n,t)}}function As(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4ui(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(ps(n,t))return;e.uniform4uiv(this.addr,t),ms(n,t)}}function js(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i);let a;this.type===e.SAMPLER_2D_SHADOW?(rs.compareFunction=n.isReversedDepthBuffer()?518:515,a=rs):a=ns,n.setTexture2D(t||a,i)}function Ms(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTexture3D(t||as,i)}function Ns(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTextureCube(t||os,i)}function Ps(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTexture2DArray(t||is,i)}function Fs(e){switch(e){case 5126:return gs;case 35664:return _s;case 35665:return vs;case 35666:return ys;case 35674:return bs;case 35675:return xs;case 35676:return Ss;case 5124:case 35670:return Cs;case 35667:case 35671:return ws;case 35668:case 35672:return Ts;case 35669:case 35673:return Es;case 5125:return Ds;case 36294:return Os;case 36295:return ks;case 36296:return As;case 35678:case 36198:case 36298:case 36306:case 35682:return js;case 35679:case 36299:case 36307:return Ms;case 35680:case 36300:case 36308:case 36293:return Ns;case 36289:case 36303:case 36311:case 36292:return Ps}}function Is(e,t){e.uniform1fv(this.addr,t)}function Ls(e,t){let n=fs(t,this.size,2);e.uniform2fv(this.addr,n)}function Rs(e,t){let n=fs(t,this.size,3);e.uniform3fv(this.addr,n)}function zs(e,t){let n=fs(t,this.size,4);e.uniform4fv(this.addr,n)}function Bs(e,t){let n=fs(t,this.size,4);e.uniformMatrix2fv(this.addr,!1,n)}function Vs(e,t){let n=fs(t,this.size,9);e.uniformMatrix3fv(this.addr,!1,n)}function Hs(e,t){let n=fs(t,this.size,16);e.uniformMatrix4fv(this.addr,!1,n)}function Us(e,t){e.uniform1iv(this.addr,t)}function Ws(e,t){e.uniform2iv(this.addr,t)}function Gs(e,t){e.uniform3iv(this.addr,t)}function Ks(e,t){e.uniform4iv(this.addr,t)}function qs(e,t){e.uniform1uiv(this.addr,t)}function Js(e,t){e.uniform2uiv(this.addr,t)}function Ys(e,t){e.uniform3uiv(this.addr,t)}function Xs(e,t){e.uniform4uiv(this.addr,t)}function Zs(e,t,n){let r=this.cache,i=t.length,a=hs(n,i);ps(r,a)||(e.uniform1iv(this.addr,a),ms(r,a));let o;o=this.type===e.SAMPLER_2D_SHADOW?rs:ns;for(let e=0;e!==i;++e)n.setTexture2D(t[e]||o,a[e])}function Qs(e,t,n){let r=this.cache,i=t.length,a=hs(n,i);ps(r,a)||(e.uniform1iv(this.addr,a),ms(r,a));for(let e=0;e!==i;++e)n.setTexture3D(t[e]||as,a[e])}function $s(e,t,n){let r=this.cache,i=t.length,a=hs(n,i);ps(r,a)||(e.uniform1iv(this.addr,a),ms(r,a));for(let e=0;e!==i;++e)n.setTextureCube(t[e]||os,a[e])}function ec(e,t,n){let r=this.cache,i=t.length,a=hs(n,i);ps(r,a)||(e.uniform1iv(this.addr,a),ms(r,a));for(let e=0;e!==i;++e)n.setTexture2DArray(t[e]||is,a[e])}function tc(e){switch(e){case 5126:return Is;case 35664:return Ls;case 35665:return Rs;case 35666:return zs;case 35674:return Bs;case 35675:return Vs;case 35676:return Hs;case 5124:case 35670:return Us;case 35667:case 35671:return Ws;case 35668:case 35672:return Gs;case 35669:case 35673:return Ks;case 5125:return qs;case 36294:return Js;case 36295:return Ys;case 36296:return Xs;case 35678:case 36198:case 36298:case 36306:case 35682:return Zs;case 35679:case 36299:case 36307:return Qs;case 35680:case 36300:case 36308:case 36293:return $s;case 36289:case 36303:case 36311:case 36292:return ec}}var nc=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=Fs(t.type)}},rc=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=tc(t.type)}},ic=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let r=this.seq;for(let i=0,a=r.length;i!==a;++i){let a=r[i];a.setValue(e,t[a.id],n)}}},ac=/(\w+)(\])?(\[|\.)?/g;function oc(e,t){e.seq.push(t),e.map[t.id]=t}function sc(e,t,n){let r=e.name,i=r.length;for(ac.lastIndex=0;;){let a=ac.exec(r),o=ac.lastIndex,s=a[1],c=a[2]===`]`,l=a[3];if(c&&(s|=0),l===void 0||l===`[`&&o+2===i){oc(n,l===void 0?new nc(s,e,t):new rc(s,e,t));break}{let e=n.map[s];e===void 0&&(e=new ic(s),oc(n,e)),n=e}}}var cc=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let r=0;r<n;++r){let n=e.getActiveUniform(t,r);sc(n,e.getUniformLocation(t,n.name),this)}let r=[],i=[];for(let t of this.seq)t.type===e.SAMPLER_2D_SHADOW||t.type===e.SAMPLER_CUBE_SHADOW||t.type===e.SAMPLER_2D_ARRAY_SHADOW?r.push(t):i.push(t);r.length>0&&(this.seq=r.concat(i))}setValue(e,t,n,r){let i=this.map[t];i!==void 0&&i.setValue(e,n,r)}setOptional(e,t,n){let r=t[n];r!==void 0&&this.setValue(e,n,r)}static upload(e,t,n,r){for(let i=0,a=t.length;i!==a;++i){let a=t[i],o=n[a.id];o.needsUpdate!==!1&&a.setValue(e,o.value,r)}}static seqWithValue(e,t){let n=[];for(let r=0,i=e.length;r!==i;++r){let i=e[r];i.id in t&&n.push(i)}return n}};function lc(e,t,n){let r=e.createShader(t);return e.shaderSource(r,n),e.compileShader(r),r}var uc=37297,dc=0;function fc(e,t){let n=e.split(`
`),r=[],i=Math.max(t-6,0),a=Math.min(t+6,n.length);for(let e=i;e<a;e++){let i=e+1;r.push(`${i===t?`>`:` `} ${i}: ${n[e]}`)}return r.join(`
`)}var pc=new Y;function mc(e){X._getMatrix(pc,X.workingColorSpace,e);let t=`mat3( ${pc.elements.map(e=>e.toFixed(4))} )`;switch(X.getTransfer(e)){case jt:return[t,`LinearTransferOETF`];case Mt:return[t,`sRGBTransferOETF`];default:return W(`WebGLProgram: Unsupported color space: `,e),[t,`LinearTransferOETF`]}}function hc(e,t,n){let r=e.getShaderParameter(t,e.COMPILE_STATUS),i=(e.getShaderInfoLog(t)||``).trim();if(r&&i===``)return``;let a=/ERROR: 0:(\d+)/.exec(i);if(a){let r=parseInt(a[1]);return n.toUpperCase()+`

`+i+`

`+fc(e.getShaderSource(t),r)}return i}function gc(e,t){let n=mc(t);return[`vec4 ${e}( vec4 value ) {`,`	return ${n[1]}( vec4( value.rgb * ${n[0]}, value.a ) );`,`}`].join(`
`)}var _c={1:`Linear`,2:`Reinhard`,3:`Cineon`,4:`ACESFilmic`,6:`AgX`,7:`Neutral`,5:`Custom`};function vc(e,t){let n=_c[t];return n===void 0?(W(`WebGLProgram: Unsupported toneMapping:`,t),`vec3 `+e+`( vec3 color ) { return LinearToneMapping( color ); }`):`vec3 `+e+`( vec3 color ) { return `+n+`ToneMapping( color ); }`}var yc=new J;function bc(){return X.getLuminanceCoefficients(yc),[`float luminance( const in vec3 rgb ) {`,`	const vec3 weights = vec3( ${yc.x.toFixed(4)}, ${yc.y.toFixed(4)}, ${yc.z.toFixed(4)} );`,`	return dot( weights, rgb );`,`}`].join(`
`)}function xc(e){return[e.extensionClipCullDistance?`#extension GL_ANGLE_clip_cull_distance : require`:``,e.extensionMultiDraw?`#extension GL_ANGLE_multi_draw : require`:``].filter(wc).join(`
`)}function Sc(e){let t=[];for(let n in e){let r=e[n];r!==!1&&t.push(`#define `+n+` `+r)}return t.join(`
`)}function Cc(e,t){let n={},r=e.getProgramParameter(t,e.ACTIVE_ATTRIBUTES);for(let i=0;i<r;i++){let r=e.getActiveAttrib(t,i),a=r.name,o=1;r.type===e.FLOAT_MAT2&&(o=2),r.type===e.FLOAT_MAT3&&(o=3),r.type===e.FLOAT_MAT4&&(o=4),n[a]={type:r.type,location:e.getAttribLocation(t,a),locationSize:o}}return n}function wc(e){return e!==``}function Tc(e,t){let n=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return e.replace(/NUM_SUN_LIGHTS/g,t.numSunLights).replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,n).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,t.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Ec(e,t){return e.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var Dc=/^[ \t]*#include +<([\w\d./]+)>/gm;function Oc(e){return e.replace(Dc,Ac)}var kc=new Map;function Ac(e,t){let n=Q[t];if(n===void 0){let e=kc.get(t);if(e!==void 0)n=Q[e],W(`WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.`,t,e);else throw Error(`THREE.WebGLProgram: Can not resolve #include <`+t+`>`)}return Oc(n)}var jc=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Mc(e){return e.replace(jc,Nc)}function Nc(e,t,n,r){let i=``;for(let e=parseInt(t);e<parseInt(n);e++)i+=r.replace(/\[\s*i\s*\]/g,`[ `+e+` ]`).replace(/UNROLLED_LOOP_INDEX/g,e);return i}function Pc(e){let t=`precision ${e.precision} float;
	precision ${e.precision} int;
	precision ${e.precision} sampler2D;
	precision ${e.precision} samplerCube;
	precision ${e.precision} sampler3D;
	precision ${e.precision} sampler2DArray;
	precision ${e.precision} sampler2DShadow;
	precision ${e.precision} samplerCubeShadow;
	precision ${e.precision} sampler2DArrayShadow;
	precision ${e.precision} isampler2D;
	precision ${e.precision} isampler3D;
	precision ${e.precision} isamplerCube;
	precision ${e.precision} isampler2DArray;
	precision ${e.precision} usampler2D;
	precision ${e.precision} usampler3D;
	precision ${e.precision} usamplerCube;
	precision ${e.precision} usampler2DArray;
	`;return e.precision===`highp`?t+=`
#define HIGH_PRECISION`:e.precision===`mediump`?t+=`
#define MEDIUM_PRECISION`:e.precision===`lowp`&&(t+=`
#define LOW_PRECISION`),t}var Fc={1:`SHADOWMAP_TYPE_PCF`,3:`SHADOWMAP_TYPE_VSM`};function Ic(e){return Fc[e.shadowMapType]||`SHADOWMAP_TYPE_BASIC`}var Lc={301:`ENVMAP_TYPE_CUBE`,302:`ENVMAP_TYPE_CUBE`,306:`ENVMAP_TYPE_CUBE_UV`};function Rc(e){return e.envMap===!1?`ENVMAP_TYPE_CUBE`:Lc[e.envMapMode]||`ENVMAP_TYPE_CUBE`}var zc={302:`ENVMAP_MODE_REFRACTION`};function Bc(e){return e.envMap===!1?`ENVMAP_MODE_REFLECTION`:zc[e.envMapMode]||`ENVMAP_MODE_REFLECTION`}var Vc={0:`ENVMAP_BLENDING_MULTIPLY`,1:`ENVMAP_BLENDING_MIX`,2:`ENVMAP_BLENDING_ADD`};function Hc(e){return e.envMap===!1?`ENVMAP_BLENDING_NONE`:Vc[e.combine]||`ENVMAP_BLENDING_NONE`}function Uc(e){let t=e.envMapCubeUVHeight;if(t===null)return null;let n=Math.log2(t)-2,r=1/t;return{texelWidth:1/(3*Math.max(2**n,112)),texelHeight:r,maxMip:n}}function Wc(e,t,n,r){let i=e.getContext(),a=n.defines,o=n.vertexShader,s=n.fragmentShader,c=Ic(n),l=Rc(n),u=Bc(n),d=Hc(n),f=Uc(n),p=xc(n),m=Sc(a),h=i.createProgram(),g,_,v=n.glslVersion?`#version `+n.glslVersion+`
`:``;n.isRawShaderMaterial?(g=[`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m].filter(wc).join(`
`),g.length>0&&(g+=`
`),_=[`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m].filter(wc).join(`
`),_.length>0&&(_+=`
`)):(g=[Pc(n),`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m,n.extensionClipCullDistance?`#define USE_CLIP_DISTANCE`:``,n.batching?`#define USE_BATCHING`:``,n.batchingColor?`#define USE_BATCHING_COLOR`:``,n.instancing?`#define USE_INSTANCING`:``,n.instancingColor?`#define USE_INSTANCING_COLOR`:``,n.instancingMorph?`#define USE_INSTANCING_MORPH`:``,n.useFog&&n.fog?`#define USE_FOG`:``,n.useFog&&n.fogExp2?`#define FOG_EXP2`:``,n.map?`#define USE_MAP`:``,n.envMap?`#define USE_ENVMAP`:``,n.envMap?`#define `+u:``,n.lightMap?`#define USE_LIGHTMAP`:``,n.aoMap?`#define USE_AOMAP`:``,n.bumpMap?`#define USE_BUMPMAP`:``,n.normalMap?`#define USE_NORMALMAP`:``,n.normalMapObjectSpace?`#define USE_NORMALMAP_OBJECTSPACE`:``,n.normalMapTangentSpace?`#define USE_NORMALMAP_TANGENTSPACE`:``,n.displacementMap?`#define USE_DISPLACEMENTMAP`:``,n.emissiveMap?`#define USE_EMISSIVEMAP`:``,n.anisotropy?`#define USE_ANISOTROPY`:``,n.anisotropyMap?`#define USE_ANISOTROPYMAP`:``,n.clearcoatMap?`#define USE_CLEARCOATMAP`:``,n.clearcoatRoughnessMap?`#define USE_CLEARCOAT_ROUGHNESSMAP`:``,n.clearcoatNormalMap?`#define USE_CLEARCOAT_NORMALMAP`:``,n.iridescenceMap?`#define USE_IRIDESCENCEMAP`:``,n.iridescenceThicknessMap?`#define USE_IRIDESCENCE_THICKNESSMAP`:``,n.specularMap?`#define USE_SPECULARMAP`:``,n.specularColorMap?`#define USE_SPECULAR_COLORMAP`:``,n.specularIntensityMap?`#define USE_SPECULAR_INTENSITYMAP`:``,n.roughnessMap?`#define USE_ROUGHNESSMAP`:``,n.metalnessMap?`#define USE_METALNESSMAP`:``,n.alphaMap?`#define USE_ALPHAMAP`:``,n.alphaHash?`#define USE_ALPHAHASH`:``,n.transmission?`#define USE_TRANSMISSION`:``,n.transmissionMap?`#define USE_TRANSMISSIONMAP`:``,n.thicknessMap?`#define USE_THICKNESSMAP`:``,n.sheenColorMap?`#define USE_SHEEN_COLORMAP`:``,n.sheenRoughnessMap?`#define USE_SHEEN_ROUGHNESSMAP`:``,n.mapUv?`#define MAP_UV `+n.mapUv:``,n.alphaMapUv?`#define ALPHAMAP_UV `+n.alphaMapUv:``,n.lightMapUv?`#define LIGHTMAP_UV `+n.lightMapUv:``,n.aoMapUv?`#define AOMAP_UV `+n.aoMapUv:``,n.emissiveMapUv?`#define EMISSIVEMAP_UV `+n.emissiveMapUv:``,n.bumpMapUv?`#define BUMPMAP_UV `+n.bumpMapUv:``,n.normalMapUv?`#define NORMALMAP_UV `+n.normalMapUv:``,n.displacementMapUv?`#define DISPLACEMENTMAP_UV `+n.displacementMapUv:``,n.metalnessMapUv?`#define METALNESSMAP_UV `+n.metalnessMapUv:``,n.roughnessMapUv?`#define ROUGHNESSMAP_UV `+n.roughnessMapUv:``,n.anisotropyMapUv?`#define ANISOTROPYMAP_UV `+n.anisotropyMapUv:``,n.clearcoatMapUv?`#define CLEARCOATMAP_UV `+n.clearcoatMapUv:``,n.clearcoatNormalMapUv?`#define CLEARCOAT_NORMALMAP_UV `+n.clearcoatNormalMapUv:``,n.clearcoatRoughnessMapUv?`#define CLEARCOAT_ROUGHNESSMAP_UV `+n.clearcoatRoughnessMapUv:``,n.iridescenceMapUv?`#define IRIDESCENCEMAP_UV `+n.iridescenceMapUv:``,n.iridescenceThicknessMapUv?`#define IRIDESCENCE_THICKNESSMAP_UV `+n.iridescenceThicknessMapUv:``,n.sheenColorMapUv?`#define SHEEN_COLORMAP_UV `+n.sheenColorMapUv:``,n.sheenRoughnessMapUv?`#define SHEEN_ROUGHNESSMAP_UV `+n.sheenRoughnessMapUv:``,n.specularMapUv?`#define SPECULARMAP_UV `+n.specularMapUv:``,n.specularColorMapUv?`#define SPECULAR_COLORMAP_UV `+n.specularColorMapUv:``,n.specularIntensityMapUv?`#define SPECULAR_INTENSITYMAP_UV `+n.specularIntensityMapUv:``,n.transmissionMapUv?`#define TRANSMISSIONMAP_UV `+n.transmissionMapUv:``,n.thicknessMapUv?`#define THICKNESSMAP_UV `+n.thicknessMapUv:``,n.vertexTangents&&n.flatShading===!1?`#define USE_TANGENT`:``,n.vertexNormals?`#define HAS_NORMAL`:``,n.vertexColors?`#define USE_COLOR`:``,n.vertexAlphas?`#define USE_COLOR_ALPHA`:``,n.vertexUv1s?`#define USE_UV1`:``,n.vertexUv2s?`#define USE_UV2`:``,n.vertexUv3s?`#define USE_UV3`:``,n.pointsUvs?`#define USE_POINTS_UV`:``,n.flatShading?`#define FLAT_SHADED`:``,n.skinning?`#define USE_SKINNING`:``,n.morphTargets?`#define USE_MORPHTARGETS`:``,n.morphNormals&&n.flatShading===!1?`#define USE_MORPHNORMALS`:``,n.morphColors?`#define USE_MORPHCOLORS`:``,n.morphTargetsCount>0?`#define MORPHTARGETS_TEXTURE_STRIDE `+n.morphTextureStride:``,n.morphTargetsCount>0?`#define MORPHTARGETS_COUNT `+n.morphTargetsCount:``,n.doubleSided?`#define DOUBLE_SIDED`:``,n.flipSided?`#define FLIP_SIDED`:``,n.shadowMapEnabled?`#define USE_SHADOWMAP`:``,n.shadowMapEnabled?`#define `+c:``,n.sizeAttenuation?`#define USE_SIZEATTENUATION`:``,n.numLightProbes>0?`#define USE_LIGHT_PROBES`:``,n.logarithmicDepthBuffer?`#define USE_LOGARITHMIC_DEPTH_BUFFER`:``,n.reversedDepthBuffer?`#define USE_REVERSED_DEPTH_BUFFER`:``,`uniform mat4 modelMatrix;`,`uniform mat4 modelViewMatrix;`,`uniform mat4 projectionMatrix;`,`uniform mat4 viewMatrix;`,`uniform mat3 normalMatrix;`,`uniform vec3 cameraPosition;`,`uniform bool isOrthographic;`,`#ifdef USE_INSTANCING`,`	attribute mat4 instanceMatrix;`,`#endif`,`#ifdef USE_INSTANCING_COLOR`,`	attribute vec3 instanceColor;`,`#endif`,`#ifdef USE_INSTANCING_MORPH`,`	uniform sampler2D morphTexture;`,`#endif`,`attribute vec3 position;`,`attribute vec3 normal;`,`attribute vec2 uv;`,`#ifdef USE_UV1`,`	attribute vec2 uv1;`,`#endif`,`#ifdef USE_UV2`,`	attribute vec2 uv2;`,`#endif`,`#ifdef USE_UV3`,`	attribute vec2 uv3;`,`#endif`,`#ifdef USE_TANGENT`,`	attribute vec4 tangent;`,`#endif`,`#if defined( USE_COLOR_ALPHA )`,`	attribute vec4 color;`,`#elif defined( USE_COLOR )`,`	attribute vec3 color;`,`#endif`,`#ifdef USE_SKINNING`,`	attribute vec4 skinIndex;`,`	attribute vec4 skinWeight;`,`#endif`,`
`].filter(wc).join(`
`),_=[Pc(n),`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m,n.useFog&&n.fog?`#define USE_FOG`:``,n.useFog&&n.fogExp2?`#define FOG_EXP2`:``,n.alphaToCoverage?`#define ALPHA_TO_COVERAGE`:``,n.map?`#define USE_MAP`:``,n.matcap?`#define USE_MATCAP`:``,n.envMap?`#define USE_ENVMAP`:``,n.envMap?`#define `+l:``,n.envMap?`#define `+u:``,n.envMap?`#define `+d:``,f?`#define CUBEUV_TEXEL_WIDTH `+f.texelWidth:``,f?`#define CUBEUV_TEXEL_HEIGHT `+f.texelHeight:``,f?`#define CUBEUV_MAX_MIP `+f.maxMip+`.0`:``,n.lightMap?`#define USE_LIGHTMAP`:``,n.aoMap?`#define USE_AOMAP`:``,n.bumpMap?`#define USE_BUMPMAP`:``,n.normalMap?`#define USE_NORMALMAP`:``,n.normalMapObjectSpace?`#define USE_NORMALMAP_OBJECTSPACE`:``,n.normalMapTangentSpace?`#define USE_NORMALMAP_TANGENTSPACE`:``,n.packedNormalMap?`#define USE_PACKED_NORMALMAP`:``,n.emissiveMap?`#define USE_EMISSIVEMAP`:``,n.anisotropy?`#define USE_ANISOTROPY`:``,n.anisotropyMap?`#define USE_ANISOTROPYMAP`:``,n.clearcoat?`#define USE_CLEARCOAT`:``,n.clearcoatMap?`#define USE_CLEARCOATMAP`:``,n.clearcoatRoughnessMap?`#define USE_CLEARCOAT_ROUGHNESSMAP`:``,n.clearcoatNormalMap?`#define USE_CLEARCOAT_NORMALMAP`:``,n.dispersion?`#define USE_DISPERSION`:``,n.retroreflection?`#define USE_RETROREFLECTION`:``,n.iridescence?`#define USE_IRIDESCENCE`:``,n.iridescenceMap?`#define USE_IRIDESCENCEMAP`:``,n.iridescenceThicknessMap?`#define USE_IRIDESCENCE_THICKNESSMAP`:``,n.specularMap?`#define USE_SPECULARMAP`:``,n.specularColorMap?`#define USE_SPECULAR_COLORMAP`:``,n.specularIntensityMap?`#define USE_SPECULAR_INTENSITYMAP`:``,n.roughnessMap?`#define USE_ROUGHNESSMAP`:``,n.metalnessMap?`#define USE_METALNESSMAP`:``,n.alphaMap?`#define USE_ALPHAMAP`:``,n.alphaTest?`#define USE_ALPHATEST`:``,n.alphaHash?`#define USE_ALPHAHASH`:``,n.sheen?`#define USE_SHEEN`:``,n.sheenColorMap?`#define USE_SHEEN_COLORMAP`:``,n.sheenRoughnessMap?`#define USE_SHEEN_ROUGHNESSMAP`:``,n.transmission?`#define USE_TRANSMISSION`:``,n.transmissionMap?`#define USE_TRANSMISSIONMAP`:``,n.thicknessMap?`#define USE_THICKNESSMAP`:``,n.vertexTangents&&n.flatShading===!1?`#define USE_TANGENT`:``,n.vertexColors||n.instancingColor?`#define USE_COLOR`:``,n.vertexAlphas||n.batchingColor?`#define USE_COLOR_ALPHA`:``,n.vertexUv1s?`#define USE_UV1`:``,n.vertexUv2s?`#define USE_UV2`:``,n.vertexUv3s?`#define USE_UV3`:``,n.pointsUvs?`#define USE_POINTS_UV`:``,n.gradientMap?`#define USE_GRADIENTMAP`:``,n.flatShading?`#define FLAT_SHADED`:``,n.doubleSided?`#define DOUBLE_SIDED`:``,n.flipSided?`#define FLIP_SIDED`:``,n.shadowMapEnabled?`#define USE_SHADOWMAP`:``,n.shadowMapEnabled?`#define `+c:``,n.premultipliedAlpha?`#define PREMULTIPLIED_ALPHA`:``,n.numLightProbes>0?`#define USE_LIGHT_PROBES`:``,n.numLightProbeGrids>0?`#define USE_LIGHT_PROBES_GRID`:``,n.decodeVideoTexture?`#define DECODE_VIDEO_TEXTURE`:``,n.decodeVideoTextureEmissive?`#define DECODE_VIDEO_TEXTURE_EMISSIVE`:``,n.logarithmicDepthBuffer?`#define USE_LOGARITHMIC_DEPTH_BUFFER`:``,n.reversedDepthBuffer?`#define USE_REVERSED_DEPTH_BUFFER`:``,`uniform mat4 viewMatrix;`,`uniform vec3 cameraPosition;`,`uniform bool isOrthographic;`,n.toneMapping===0?``:`#define TONE_MAPPING`,n.toneMapping===0?``:Q.tonemapping_pars_fragment,n.toneMapping===0?``:vc(`toneMapping`,n.toneMapping),n.dithering?`#define DITHERING`:``,n.opaque?`#define OPAQUE`:``,Q.colorspace_pars_fragment,gc(`linearToOutputTexel`,n.outputColorSpace),bc(),n.useDepthPacking?`#define DEPTH_PACKING `+n.depthPacking:``,`
`].filter(wc).join(`
`)),o=Oc(o),o=Tc(o,n),o=Ec(o,n),s=Oc(s),s=Tc(s,n),s=Ec(s,n),o=Mc(o),s=Mc(s),n.isRawShaderMaterial!==!0&&(v=`#version 300 es
`,g=[p,`#define attribute in`,`#define varying out`,`#define texture2D texture`].join(`
`)+`
`+g,_=[`#define varying in`,n.glslVersion===`300 es`?``:`layout(location = 0) out highp vec4 pc_fragColor;`,n.glslVersion===`300 es`?``:`#define gl_FragColor pc_fragColor`,`#define gl_FragDepthEXT gl_FragDepth`,`#define texture2D texture`,`#define textureCube texture`,`#define texture2DProj textureProj`,`#define texture2DLodEXT textureLod`,`#define texture2DProjLodEXT textureProjLod`,`#define textureCubeLodEXT textureLod`,`#define texture2DGradEXT textureGrad`,`#define texture2DProjGradEXT textureProjGrad`,`#define textureCubeGradEXT textureGrad`].join(`
`)+`
`+_);let y=v+g+o,b=v+_+s,x=lc(i,i.VERTEX_SHADER,y),S=lc(i,i.FRAGMENT_SHADER,b);i.attachShader(h,x),i.attachShader(h,S),n.index0AttributeName===void 0?n.hasPositionAttribute===!0&&i.bindAttribLocation(h,0,`position`):i.bindAttribLocation(h,0,n.index0AttributeName),i.linkProgram(h);function C(t){if(e.debug.checkShaderErrors){let n=i.getProgramInfoLog(h)||``,r=i.getShaderInfoLog(x)||``,a=i.getShaderInfoLog(S)||``,o=n.trim(),s=r.trim(),c=a.trim(),l=!0,u=!0;if(i.getProgramParameter(h,i.LINK_STATUS)===!1){if(l=!1,typeof e.debug.onShaderError==`function`)e.debug.onShaderError(i,h,x,S);else{let e=hc(i,x,`vertex`),n=hc(i,S,`fragment`);G(`WebGLProgram: Shader Error `+i.getError()+` - VALIDATE_STATUS `+i.getProgramParameter(h,i.VALIDATE_STATUS)+`

Material Name: `+t.name+`
Material Type: `+t.type+`

Program Info Log: `+o+`
`+e+`
`+n)}}else o===``?(s===``||c===``)&&(u=!1):W(`WebGLProgram: Program Info Log:`,o);u&&(t.diagnostics={runnable:l,programLog:o,vertexShader:{log:s,prefix:g},fragmentShader:{log:c,prefix:_}})}i.deleteShader(x),i.deleteShader(S),w=new cc(i,h),T=Cc(i,h)}let w;this.getUniforms=function(){return w===void 0&&C(this),w};let T;this.getAttributes=function(){return T===void 0&&C(this),T};let E=n.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return E===!1&&(E=i.getProgramParameter(h,uc)),E},this.destroy=function(){r.releaseStatesOfProgram(this),i.deleteProgram(h),this.program=void 0},this.type=n.shaderType,this.name=n.shaderName,this.id=dc++,this.cacheKey=t,this.usedTimes=1,this.program=h,this.vertexShader=x,this.fragmentShader=S,this}var Gc=0,Kc=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,n){let r=this._getShaderCacheForMaterial(e);return r.has(t)===!1&&(r.add(t),t.usedTimes++),r.has(n)===!1&&(r.add(n),n.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let e of t)e.usedTimes--,e.usedTimes===0&&this.shaderCache.delete(e.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new qc(e),t.set(e,n)),n}},qc=class{constructor(e){this.id=Gc++,this.code=e,this.usedTimes=0}};function Jc(e){return e===1030||e===37490||e===36285}function Yc(e,t,n,r,i,a){let o=new Fn,s=new Kc,c=new Set,l=[],u=new Map,d=r.logarithmicDepthBuffer,f=r.precision,p={MeshDepthMaterial:`depth`,MeshDistanceMaterial:`distance`,MeshNormalMaterial:`normal`,MeshBasicMaterial:`basic`,MeshLambertMaterial:`lambert`,MeshPhongMaterial:`phong`,MeshToonMaterial:`toon`,MeshStandardMaterial:`physical`,MeshPhysicalMaterial:`physical`,MeshMatcapMaterial:`matcap`,LineBasicMaterial:`basic`,LineDashedMaterial:`dashed`,PointsMaterial:`points`,ShadowMaterial:`shadow`,SpriteMaterial:`sprite`};function m(e){return c.add(e),e===0?`uv`:`uv${e}`}function h(i,o,l,u,h,g){let _=u.fog,v=h.geometry,y=i.isMeshStandardMaterial||i.isMeshLambertMaterial||i.isMeshPhongMaterial?u.environment:null,b=i.isMeshStandardMaterial||i.isMeshLambertMaterial&&!i.envMap||i.isMeshPhongMaterial&&!i.envMap,x=t.get(i.envMap||y,b),S=x&&x.mapping===306?x.image.height:null,C=p[i.type];i.precision!==null&&(f=r.getMaxPrecision(i.precision),f!==i.precision&&W(`WebGLProgram.getParameters:`,i.precision,`not supported, using`,f,`instead.`));let w=v.morphAttributes.position||v.morphAttributes.normal||v.morphAttributes.color,T=w===void 0?0:w.length,E=0;v.morphAttributes.position!==void 0&&(E=1),v.morphAttributes.normal!==void 0&&(E=2),v.morphAttributes.color!==void 0&&(E=3);let D,O,k,A;if(C){let e=go[C];D=e.vertexShader,O=e.fragmentShader}else{D=i.vertexShader,O=i.fragmentShader;let e=s.getVertexShaderStage(i),t=s.getFragmentShaderStage(i);s.update(i,e,t),k=e.id,A=t.id}let j=e.getRenderTarget(),ee=e.state.buffers.depth.getReversed(),M=h.isInstancedMesh===!0,te=h.isBatchedMesh===!0,ne=!!i.map,N=!!i.matcap,re=!!x,P=!!i.aoMap,ie=!!i.lightMap,ae=!!i.bumpMap&&i.wireframe===!1,F=!!i.normalMap,oe=!!i.displacementMap,I=!!i.emissiveMap,se=!!i.metalnessMap,ce=!!i.roughnessMap,le=i.anisotropy>0,ue=i.clearcoat>0,de=i.dispersion>0,fe=i.retroreflectivity>0,pe=i.iridescence>0,me=i.sheen>0,L=i.transmission>0,he=le&&!!i.anisotropyMap,R=ue&&!!i.clearcoatMap,ge=ue&&!!i.clearcoatNormalMap,_e=ue&&!!i.clearcoatRoughnessMap,ve=pe&&!!i.iridescenceMap,z=pe&&!!i.iridescenceThicknessMap,ye=me&&!!i.sheenColorMap,B=me&&!!i.sheenRoughnessMap,be=!!i.specularMap,xe=!!i.specularColorMap,Se=!!i.specularIntensityMap,Ce=L&&!!i.transmissionMap,we=L&&!!i.thicknessMap,V=!!i.gradientMap,Te=!!i.alphaMap,Ee=i.alphaTest>0,De=!!i.alphaHash,Oe=!!i.extensions,ke=0;i.toneMapped&&(j===null||j.isXRRenderTarget===!0)&&(ke=e.toneMapping);let H={shaderID:C,shaderType:i.type,shaderName:i.name,vertexShader:D,fragmentShader:O,defines:i.defines,customVertexShaderID:k,customFragmentShaderID:A,isRawShaderMaterial:i.isRawShaderMaterial===!0,glslVersion:i.glslVersion,precision:f,batching:te,batchingColor:te&&h._colorsTexture!==null,instancing:M,instancingColor:M&&h.instanceColor!==null,instancingMorph:M&&h.morphTexture!==null,outputColorSpace:j===null?e.outputColorSpace:j.isXRRenderTarget===!0?j.texture.colorSpace:X.workingColorSpace,alphaToCoverage:!!i.alphaToCoverage,map:ne,matcap:N,envMap:re,envMapMode:re&&x.mapping,envMapCubeUVHeight:S,aoMap:P,lightMap:ie,bumpMap:ae,normalMap:F,displacementMap:oe,emissiveMap:I,normalMapObjectSpace:F&&i.normalMapType===1,normalMapTangentSpace:F&&i.normalMapType===0,packedNormalMap:F&&i.normalMapType===0&&Jc(i.normalMap.format),metalnessMap:se,roughnessMap:ce,anisotropy:le,anisotropyMap:he,clearcoat:ue,clearcoatMap:R,clearcoatNormalMap:ge,clearcoatRoughnessMap:_e,dispersion:de,retroreflection:fe,iridescence:pe,iridescenceMap:ve,iridescenceThicknessMap:z,sheen:me,sheenColorMap:ye,sheenRoughnessMap:B,specularMap:be,specularColorMap:xe,specularIntensityMap:Se,transmission:L,transmissionMap:Ce,thicknessMap:we,gradientMap:V,opaque:i.transparent===!1&&i.blending===1&&i.alphaToCoverage===!1,alphaMap:Te,alphaTest:Ee,alphaHash:De,combine:i.combine,mapUv:ne&&m(i.map.channel),aoMapUv:P&&m(i.aoMap.channel),lightMapUv:ie&&m(i.lightMap.channel),bumpMapUv:ae&&m(i.bumpMap.channel),normalMapUv:F&&m(i.normalMap.channel),displacementMapUv:oe&&m(i.displacementMap.channel),emissiveMapUv:I&&m(i.emissiveMap.channel),metalnessMapUv:se&&m(i.metalnessMap.channel),roughnessMapUv:ce&&m(i.roughnessMap.channel),anisotropyMapUv:he&&m(i.anisotropyMap.channel),clearcoatMapUv:R&&m(i.clearcoatMap.channel),clearcoatNormalMapUv:ge&&m(i.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:_e&&m(i.clearcoatRoughnessMap.channel),iridescenceMapUv:ve&&m(i.iridescenceMap.channel),iridescenceThicknessMapUv:z&&m(i.iridescenceThicknessMap.channel),sheenColorMapUv:ye&&m(i.sheenColorMap.channel),sheenRoughnessMapUv:B&&m(i.sheenRoughnessMap.channel),specularMapUv:be&&m(i.specularMap.channel),specularColorMapUv:xe&&m(i.specularColorMap.channel),specularIntensityMapUv:Se&&m(i.specularIntensityMap.channel),transmissionMapUv:Ce&&m(i.transmissionMap.channel),thicknessMapUv:we&&m(i.thicknessMap.channel),alphaMapUv:Te&&m(i.alphaMap.channel),vertexTangents:!!v.attributes.tangent&&(F||le),vertexNormals:!!v.attributes.normal,vertexColors:i.vertexColors,vertexAlphas:i.vertexColors===!0&&!!v.attributes.color&&v.attributes.color.itemSize===4,pointsUvs:h.isPoints===!0&&!!v.attributes.uv&&(ne||Te),fog:!!_,useFog:i.fog===!0,fogExp2:!!_&&_.isFogExp2,flatShading:i.wireframe===!1&&(i.flatShading===!0||v.attributes.normal===void 0&&F===!1&&(i.isMeshLambertMaterial||i.isMeshPhongMaterial||i.isMeshStandardMaterial||i.isMeshPhysicalMaterial)),sizeAttenuation:i.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:ee,skinning:h.isSkinnedMesh===!0,hasPositionAttribute:v.attributes.position!==void 0,morphTargets:v.morphAttributes.position!==void 0,morphNormals:v.morphAttributes.normal!==void 0,morphColors:v.morphAttributes.color!==void 0,morphTargetsCount:T,morphTextureStride:E,numSunLights:o.sun.length,numDirLights:o.directional.length,numPointLights:o.point.length,numSpotLights:o.spot.length,numSpotLightMaps:o.spotLightMap.length,numRectAreaLights:o.rectArea.length,numHemiLights:o.hemi.length,numSunLightShadows:o.sunShadowMap.length,numDirLightShadows:o.directionalShadowMap.length,numPointLightShadows:o.pointShadowMap.length,numSpotLightShadows:o.spotShadowMap.length,numSpotLightShadowsWithMaps:o.numSpotLightShadowsWithMaps,numLightProbes:o.numLightProbes,numLightProbeGrids:g.length,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:i.dithering,shadowMapEnabled:e.shadowMap.enabled&&l.length>0,shadowMapType:e.shadowMap.type,toneMapping:ke,decodeVideoTexture:ne&&i.map.isVideoTexture===!0&&X.getTransfer(i.map.colorSpace)===`srgb`,decodeVideoTextureEmissive:I&&i.emissiveMap.isVideoTexture===!0&&X.getTransfer(i.emissiveMap.colorSpace)===`srgb`,premultipliedAlpha:i.premultipliedAlpha,doubleSided:i.side===2,flipSided:i.side===1,useDepthPacking:i.depthPacking>=0,depthPacking:i.depthPacking||0,index0AttributeName:i.index0AttributeName,extensionClipCullDistance:Oe&&i.extensions.clipCullDistance===!0&&n.has(`WEBGL_clip_cull_distance`),extensionMultiDraw:(Oe&&i.extensions.multiDraw===!0||te)&&n.has(`WEBGL_multi_draw`),rendererExtensionParallelShaderCompile:n.has(`KHR_parallel_shader_compile`),customProgramCacheKey:i.customProgramCacheKey()};return H.vertexUv1s=c.has(1),H.vertexUv2s=c.has(2),H.vertexUv3s=c.has(3),c.clear(),H}function g(t){let n=[];if(t.shaderID?n.push(t.shaderID):(n.push(t.customVertexShaderID),n.push(t.customFragmentShaderID)),t.defines!==void 0)for(let e in t.defines)n.push(e),n.push(t.defines[e]);return t.isRawShaderMaterial===!1&&(_(n,t),v(n,t),n.push(e.outputColorSpace)),n.push(t.customProgramCacheKey),n.join()}function _(e,t){e.push(t.precision),e.push(t.outputColorSpace),e.push(t.envMapMode),e.push(t.envMapCubeUVHeight),e.push(t.mapUv),e.push(t.alphaMapUv),e.push(t.lightMapUv),e.push(t.aoMapUv),e.push(t.bumpMapUv),e.push(t.normalMapUv),e.push(t.displacementMapUv),e.push(t.emissiveMapUv),e.push(t.metalnessMapUv),e.push(t.roughnessMapUv),e.push(t.anisotropyMapUv),e.push(t.clearcoatMapUv),e.push(t.clearcoatNormalMapUv),e.push(t.clearcoatRoughnessMapUv),e.push(t.iridescenceMapUv),e.push(t.iridescenceThicknessMapUv),e.push(t.sheenColorMapUv),e.push(t.sheenRoughnessMapUv),e.push(t.specularMapUv),e.push(t.specularColorMapUv),e.push(t.specularIntensityMapUv),e.push(t.transmissionMapUv),e.push(t.thicknessMapUv),e.push(t.combine),e.push(t.fogExp2),e.push(t.sizeAttenuation),e.push(t.morphTargetsCount),e.push(t.morphAttributeCount),e.push(t.numSunLights),e.push(t.numDirLights),e.push(t.numPointLights),e.push(t.numSpotLights),e.push(t.numSpotLightMaps),e.push(t.numHemiLights),e.push(t.numRectAreaLights),e.push(t.numSunLightShadows),e.push(t.numDirLightShadows),e.push(t.numPointLightShadows),e.push(t.numSpotLightShadows),e.push(t.numSpotLightShadowsWithMaps),e.push(t.numLightProbes),e.push(t.shadowMapType),e.push(t.toneMapping),e.push(t.numClippingPlanes),e.push(t.numClipIntersection),e.push(t.depthPacking)}function v(e,t){o.disableAll(),t.instancing&&o.enable(0),t.instancingColor&&o.enable(1),t.instancingMorph&&o.enable(2),t.matcap&&o.enable(3),t.envMap&&o.enable(4),t.normalMapObjectSpace&&o.enable(5),t.normalMapTangentSpace&&o.enable(6),t.clearcoat&&o.enable(7),t.iridescence&&o.enable(8),t.alphaTest&&o.enable(9),t.vertexColors&&o.enable(10),t.vertexAlphas&&o.enable(11),t.vertexUv1s&&o.enable(12),t.vertexUv2s&&o.enable(13),t.vertexUv3s&&o.enable(14),t.vertexTangents&&o.enable(15),t.anisotropy&&o.enable(16),t.alphaHash&&o.enable(17),t.batching&&o.enable(18),t.dispersion&&o.enable(19),t.retroreflection&&o.enable(24),t.batchingColor&&o.enable(20),t.gradientMap&&o.enable(21),t.packedNormalMap&&o.enable(22),t.vertexNormals&&o.enable(23),e.push(o.mask),o.disableAll(),t.fog&&o.enable(0),t.useFog&&o.enable(1),t.flatShading&&o.enable(2),t.logarithmicDepthBuffer&&o.enable(3),t.reversedDepthBuffer&&o.enable(4),t.skinning&&o.enable(5),t.morphTargets&&o.enable(6),t.morphNormals&&o.enable(7),t.morphColors&&o.enable(8),t.premultipliedAlpha&&o.enable(9),t.shadowMapEnabled&&o.enable(10),t.doubleSided&&o.enable(11),t.flipSided&&o.enable(12),t.useDepthPacking&&o.enable(13),t.dithering&&o.enable(14),t.transmission&&o.enable(15),t.sheen&&o.enable(16),t.opaque&&o.enable(17),t.pointsUvs&&o.enable(18),t.decodeVideoTexture&&o.enable(19),t.decodeVideoTextureEmissive&&o.enable(20),t.alphaToCoverage&&o.enable(21),t.numLightProbeGrids>0&&o.enable(22),t.hasPositionAttribute&&o.enable(23),e.push(o.mask)}function y(e){let t=p[e.type],n;if(t){let e=go[t];n=ua.clone(e.uniforms)}else n=e.uniforms;return n}function b(t,n){let r=u.get(n);return r===void 0?(r=new Wc(e,n,t,i),l.push(r),u.set(n,r)):++r.usedTimes,r}function x(e){if(--e.usedTimes===0){let t=l.indexOf(e);l[t]=l[l.length-1],l.pop(),u.delete(e.cacheKey),e.destroy()}}function S(e){s.remove(e)}function C(){s.dispose()}return{getParameters:h,getProgramCacheKey:g,getUniforms:y,acquireProgram:b,releaseProgram:x,releaseShaderCache:S,programs:l,dispose:C}}function Xc(){let e=new WeakMap;function t(t){return e.has(t)}function n(t){let n=e.get(t);return n===void 0&&(n={},e.set(t,n)),n}function r(t){e.delete(t)}function i(t,n,r){e.get(t)[n]=r}function a(){e=new WeakMap}return{has:t,get:n,remove:r,update:i,dispose:a}}function Zc(e,t){return e.groupOrder===t.groupOrder?e.renderOrder===t.renderOrder?e.material.id===t.material.id?e.materialVariant===t.materialVariant?e.z===t.z?e.id-t.id:e.z-t.z:e.materialVariant-t.materialVariant:e.material.id-t.material.id:e.renderOrder-t.renderOrder:e.groupOrder-t.groupOrder}function Qc(e,t){return e.groupOrder===t.groupOrder?e.renderOrder===t.renderOrder?e.z===t.z?e.id-t.id:t.z-e.z:e.renderOrder-t.renderOrder:e.groupOrder-t.groupOrder}function $c(){let e=[],t=0,n=[],r=[],i=[];function a(){t=0,n.length=0,r.length=0,i.length=0}function o(e){let t=0;return e.isInstancedMesh&&(t+=2),e.isSkinnedMesh&&(t+=1),t}function s(n,r,i,a,s,c){let l=e[t];return l===void 0?(l={id:n.id,object:n,geometry:r,material:i,materialVariant:o(n),groupOrder:a,renderOrder:n.renderOrder,z:s,group:c},e[t]=l):(l.id=n.id,l.object=n,l.geometry=r,l.material=i,l.materialVariant=o(n),l.groupOrder=a,l.renderOrder=n.renderOrder,l.z=s,l.group=c),t++,l}function c(e,t,a,o,c,l,u){u.reversedDepth===!0&&(c=-c);let d=s(e,t,a,o,c,l);a.transmission>0?r.push(d):a.transparent===!0?i.push(d):n.push(d)}function l(e,t,a,o,c,l){let u=s(e,t,a,o,c,l);a.transmission>0?r.unshift(u):a.transparent===!0?i.unshift(u):n.unshift(u)}function u(e,t){n.length>1&&n.sort(e||Zc),r.length>1&&r.sort(t||Qc),i.length>1&&i.sort(t||Qc)}function d(){for(let n=t,r=e.length;n<r;n++){let t=e[n];if(t.id===null)break;t.id=null,t.object=null,t.geometry=null,t.material=null,t.group=null}}return{opaque:n,transmissive:r,transparent:i,init:a,push:c,unshift:l,finish:d,sort:u}}function el(){let e=new WeakMap;function t(t,n){let r=e.get(t),i;return r===void 0?(i=new $c,e.set(t,[i])):n>=r.length?(i=new $c,r.push(i)):i=r[n],i}function n(){e=new WeakMap}return{get:t,dispose:n}}function tl(){let e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case`SunLight`:case`DirectionalLight`:n={direction:new J,color:new Z};break;case`SpotLight`:n={position:new J,direction:new J,color:new Z,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case`PointLight`:n={position:new J,color:new Z,distance:0,decay:0};break;case`HemisphereLight`:n={direction:new J,skyColor:new Z,groundColor:new Z};break;case`RectAreaLight`:n={color:new Z,position:new J,halfWidth:new J,halfHeight:new J}}return e[t.id]=n,n}}}function nl(){let e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case`SunLight`:case`DirectionalLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new q};break;case`SpotLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new q};break;case`PointLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new q,shadowCameraNear:1,shadowCameraFar:1e3}}return e[t.id]=n,n}}}var rl=0;function il(e,t){return(t.castShadow?2:0)-(e.castShadow?2:0)+ +!!t.map-!!e.map}function al(e){let t=new tl,n=nl(),r={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let e=0;e<9;e++)r.probe.push(new J);let i=new J,a=new wn,o=new wn;function s(i){let a=0,o=0,s=0;for(let e=0;e<9;e++)r.probe[e].set(0,0,0);let c=0,l=0,u=0,d=0,f=0,p=0,m=0,h=0,g=0,_=0,v=0,y=0,b=0,x=0;i.sort(il);for(let e=0,S=i.length;e<S;e++){let S=i[e],C=S.color,w=S.intensity,T=S.distance,E=null;if(S.shadow&&S.shadow.map&&(E=S.shadow.map.texture.format===1030?S.shadow.map.texture:S.shadow.map.depthTexture||S.shadow.map.texture),S.isAmbientLight)a+=C.r*w,o+=C.g*w,s+=C.b*w;else if(S.isLightProbe){for(let e=0;e<9;e++)r.probe[e].addScaledVector(S.sh.coefficients[e],w);x++}else if(S.isSunLight){let e=t.get(S);if(e.color.copy(S.color).multiplyScalar(S.intensity),S.castShadow){let e=S.shadow,t=n.get(S);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize.copy(e.mapSize).multiply(e.getFrameExtents()),r.sunShadow[l]=t,r.sunShadowMap[l]=E;let i=e.getViewportCount();for(let t=0;t<i;t++)r.sunShadowMatrix[u+t]=e.getMatrix(t),r.sunShadowCascade[u+t]=e._cascadeData[t];u+=i,l++}r.sun[c]=e,c++}else if(S.isDirectionalLight){let e=t.get(S);if(e.color.copy(S.color).multiplyScalar(S.intensity),S.castShadow){let e=S.shadow,t=n.get(S);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize=e.mapSize,r.directionalShadow[d]=t,r.directionalShadowMap[d]=E,r.directionalShadowMatrix[d]=S.shadow.matrix,g++}r.directional[d]=e,d++}else if(S.isSpotLight){let e=t.get(S);e.position.setFromMatrixPosition(S.matrixWorld),e.color.copy(C).multiplyScalar(w),e.distance=T,e.coneCos=Math.cos(S.angle),e.penumbraCos=Math.cos(S.angle*(1-S.penumbra)),e.decay=S.decay,r.spot[p]=e;let i=S.shadow;if(S.map&&(r.spotLightMap[y]=S.map,y++,i.updateMatrices(S),S.castShadow&&b++),r.spotLightMatrix[p]=i.matrix,S.castShadow){let e=n.get(S);e.shadowIntensity=i.intensity,e.shadowBias=i.bias,e.shadowNormalBias=i.normalBias,e.shadowRadius=i.radius,e.shadowMapSize=i.mapSize,r.spotShadow[p]=e,r.spotShadowMap[p]=E,v++}p++}else if(S.isRectAreaLight){let e=t.get(S);e.color.copy(C).multiplyScalar(w),e.halfWidth.set(S.width*.5,0,0),e.halfHeight.set(0,S.height*.5,0),r.rectArea[m]=e,m++}else if(S.isPointLight){let e=t.get(S);if(e.color.copy(S.color).multiplyScalar(S.intensity),e.distance=S.distance,e.decay=S.decay,S.castShadow){let e=S.shadow,t=n.get(S);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize=e.mapSize,t.shadowCameraNear=e.camera.near,t.shadowCameraFar=e.camera.far,r.pointShadow[f]=t,r.pointShadowMap[f]=E,r.pointShadowMatrix[f]=S.shadow.matrix,_++}r.point[f]=e,f++}else if(S.isHemisphereLight){let e=t.get(S);e.skyColor.copy(S.color).multiplyScalar(w),e.groundColor.copy(S.groundColor).multiplyScalar(w),r.hemi[h]=e,h++}}m>0&&(e.has(`OES_texture_float_linear`)===!0?(r.rectAreaLTC1=$.LTC_FLOAT_1,r.rectAreaLTC2=$.LTC_FLOAT_2):(r.rectAreaLTC1=$.LTC_HALF_1,r.rectAreaLTC2=$.LTC_HALF_2)),r.ambient[0]=a,r.ambient[1]=o,r.ambient[2]=s;let S=r.hash;(S.sunLength!==c||S.directionalLength!==d||S.pointLength!==f||S.spotLength!==p||S.rectAreaLength!==m||S.hemiLength!==h||S.numSunShadows!==l||S.numDirectionalShadows!==g||S.numPointShadows!==_||S.numSpotShadows!==v||S.numSpotMaps!==y||S.numLightProbes!==x)&&(r.sun.length=c,r.directional.length=d,r.spot.length=p,r.rectArea.length=m,r.point.length=f,r.hemi.length=h,r.sunShadow.length=l,r.sunShadowMap.length=l,r.sunShadowMatrix.length=u,r.sunShadowCascade.length=u,r.directionalShadow.length=g,r.directionalShadowMap.length=g,r.directionalShadowMatrix.length=g,r.pointShadow.length=_,r.pointShadowMap.length=_,r.pointShadowMatrix.length=_,r.spotShadow.length=v,r.spotShadowMap.length=v,r.spotLightMatrix.length=v+y-b,r.spotLightMap.length=y,r.numSpotLightShadowsWithMaps=b,r.numLightProbes=x,S.sunLength=c,S.directionalLength=d,S.pointLength=f,S.spotLength=p,S.rectAreaLength=m,S.hemiLength=h,S.numSunShadows=l,S.numDirectionalShadows=g,S.numPointShadows=_,S.numSpotShadows=v,S.numSpotMaps=y,S.numLightProbes=x,r.version=rl++)}function c(e,t){let n=0,s=0,c=0,l=0,u=0,d=0,f=t.matrixWorldInverse;for(let t=0,p=e.length;t<p;t++){let p=e[t];if(p.isSunLight){let e=r.sun[n];e.direction.setFromMatrixPosition(p.matrixWorld),e.direction.transformDirection(f),n++}else if(p.isDirectionalLight){let e=r.directional[s];e.direction.setFromMatrixPosition(p.matrixWorld),i.setFromMatrixPosition(p.target.matrixWorld),e.direction.sub(i),e.direction.transformDirection(f),s++}else if(p.isSpotLight){let e=r.spot[l];e.position.setFromMatrixPosition(p.matrixWorld),e.position.applyMatrix4(f),e.direction.setFromMatrixPosition(p.matrixWorld),i.setFromMatrixPosition(p.target.matrixWorld),e.direction.sub(i),e.direction.transformDirection(f),l++}else if(p.isRectAreaLight){let e=r.rectArea[u];e.position.setFromMatrixPosition(p.matrixWorld),e.position.applyMatrix4(f),o.identity(),a.copy(p.matrixWorld),a.premultiply(f),o.extractRotation(a),e.halfWidth.set(p.width*.5,0,0),e.halfHeight.set(0,p.height*.5,0),e.halfWidth.applyMatrix4(o),e.halfHeight.applyMatrix4(o),u++}else if(p.isPointLight){let e=r.point[c];e.position.setFromMatrixPosition(p.matrixWorld),e.position.applyMatrix4(f),c++}else if(p.isHemisphereLight){let e=r.hemi[d];e.direction.setFromMatrixPosition(p.matrixWorld),e.direction.transformDirection(f),d++}}}return{setup:s,setupView:c,state:r}}function ol(e){let t=new al(e),n=[],r=[],i=[];function a(e){d.camera=e,n.length=0,r.length=0,i.length=0}function o(e){n.push(e)}function s(e){r.push(e)}function c(e){i.push(e)}function l(){t.setup(n)}function u(e){t.setupView(n,e)}let d={lightsArray:n,shadowsArray:r,lightProbeGridArray:i,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:a,state:d,setupLights:l,setupLightsView:u,pushLight:o,pushShadow:s,pushLightProbeGrid:c}}function sl(e){let t=new WeakMap;function n(n,r=0){let i=t.get(n),a;return i===void 0?(a=new ol(e),t.set(n,[a])):r>=i.length?(a=new ol(e),i.push(a)):a=i[r],a}function r(){t=new WeakMap}return{get:n,dispose:r}}var cl=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,ll=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,ul=[new J(1,0,0),new J(-1,0,0),new J(0,1,0),new J(0,-1,0),new J(0,0,1),new J(0,0,-1)],dl=[new J(0,-1,0),new J(0,-1,0),new J(0,0,1),new J(0,0,-1),new J(0,-1,0),new J(0,-1,0)],fl=new wn,pl=new J,ml=new J;function hl(e,t,n){let r=new ji,i=new q,a=new q,o=new yn,s=new ha,c=new ga,l={},u=n.maxTextureSize,d={0:1,1:0,2:2},f=new pa({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new q},radius:{value:4}},vertexShader:cl,fragmentShader:ll}),p=f.clone();p.defines.HORIZONTAL_PASS=1;let m=new ei;m.setAttribute(`position`,new zr(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let h=new wi(m,f),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=1;let _=this.type;this.render=function(t,n,s){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||t.length===0)return;this.type===2&&(W(`WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead.`),this.type=1);let c=e.getRenderTarget(),l=e.getActiveCubeFace(),d=e.getActiveMipmapLevel(),f=e.state;f.setBlending(0),f.buffers.depth.getReversed()===!0?f.buffers.color.setClear(0,0,0,0):f.buffers.color.setClear(1,1,1,1),f.buffers.depth.setTest(!0),f.setScissorTest(!1);let p=_!==this.type;p&&n.traverse(function(e){e.material&&(Array.isArray(e.material)?e.material.forEach(e=>e.needsUpdate=!0):e.material.needsUpdate=!0)});for(let c=0,l=t.length;c<l;c++){let l=t[c],d=l.shadow;if(d===void 0){W(`WebGLShadowMap:`,l,`has no shadow.`);continue}if(d.autoUpdate===!1&&d.needsUpdate===!1)continue;i.copy(d.mapSize);let m=d.getFrameExtents();i.multiply(m),a.copy(d.mapSize),(i.x>u||i.y>u)&&(i.x>u&&(a.x=Math.floor(u/m.x),i.x=a.x*m.x,d.mapSize.x=a.x),i.y>u&&(a.y=Math.floor(u/m.y),i.y=a.y*m.y,d.mapSize.y=a.y));let h=e.state.buffers.depth.getReversed();if(d.camera._reversedDepth=h,d.map===null||p===!0){if(d.map!==null&&(d.map.depthTexture!==null&&(d.map.depthTexture.dispose(),d.map.depthTexture=null),d.map.dispose()),this.type===3){if(l.isPointLight){W(`WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.`);continue}d.map=new xn(i.x,i.y,{format:Ie,type:Te,minFilter:ve,magFilter:ve,generateMipmaps:!1}),d.map.texture.name=l.name+`.shadowMap`,d.map.depthTexture=new $i(i.x,i.y,V),d.map.depthTexture.name=l.name+`.shadowMapDepth`,d.map.depthTexture.format=Me,d.map.depthTexture.compareFunction=null,d.map.depthTexture.minFilter=R,d.map.depthTexture.magFilter=R}else l.isPointLight?(d.map=new Ko(i.x),d.map.depthTexture=new ea(i.x,we)):(d.map=new xn(i.x,i.y),d.map.depthTexture=new $i(i.x,i.y,we)),d.map.depthTexture.name=l.name+`.shadowMap`,d.map.depthTexture.format=Me,this.type===1?(d.map.depthTexture.compareFunction=h?518:515,d.map.depthTexture.minFilter=ve,d.map.depthTexture.magFilter=ve):(d.map.depthTexture.compareFunction=null,d.map.depthTexture.minFilter=R,d.map.depthTexture.magFilter=R);d.camera.updateProjectionMatrix()}d.map.isWebGLCubeRenderTarget!==!0&&(d.map.width!==i.x||d.map.height!==i.y)&&d.map.setSize(i.x,i.y);let g=d.map.isWebGLCubeRenderTarget?6:d.getViewportCount();l.isPointLight!==!0&&d.updateMatrices(l,s);for(let t=0;t<g;t++){let i=d.getCamera(t);if(l.isPointLight){let e=d.camera,n=d.matrix,r=l.distance||e.far;r!==e.far&&(e.far=r,e.updateProjectionMatrix()),pl.setFromMatrixPosition(l.matrixWorld),e.position.copy(pl),ml.copy(e.position),ml.add(ul[t]),e.up.copy(dl[t]),e.lookAt(ml),e.updateMatrixWorld(),n.makeTranslation(-pl.x,-pl.y,-pl.z),fl.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),d._frustum.setFromProjectionMatrix(fl,e.coordinateSystem,e.reversedDepth)}if(d.map.isWebGLCubeRenderTarget)e.setRenderTarget(d.map,t),e.clear();else{t===0&&(e.setRenderTarget(d.map),e.clear());let n=d.getViewport(t);o.set(a.x*n.x,a.y*n.y,a.x*n.z,a.y*n.w),f.viewport(o)}r=d.getFrustum(t),b(n,s,i,l,this.type)}d.isPointLightShadow!==!0&&this.type===3&&v(d,s),d.needsUpdate=!1}_=this.type,g.needsUpdate=!1,e.setRenderTarget(c,l,d)};function v(n,r){let a=t.update(h);f.defines.VSM_SAMPLES!==n.blurSamples&&(f.defines.VSM_SAMPLES=n.blurSamples,p.defines.VSM_SAMPLES=n.blurSamples,f.needsUpdate=!0,p.needsUpdate=!0),n.mapPass===null?n.mapPass=new xn(i.x,i.y,{format:Ie,type:Te}):(n.mapPass.width!==n.map.width||n.mapPass.height!==n.map.height)&&n.mapPass.setSize(n.map.width,n.map.height),f.uniforms.shadow_pass.value=n.map.depthTexture,f.uniforms.resolution.value.set(n.map.width,n.map.height),f.uniforms.radius.value=n.radius,e.setRenderTarget(n.mapPass),e.clear(),e.renderBufferDirect(r,null,a,f,h,null),p.uniforms.shadow_pass.value=n.mapPass.texture,p.uniforms.resolution.value.set(n.map.width,n.map.height),p.uniforms.radius.value=n.radius,e.setRenderTarget(n.map),e.clear(),e.renderBufferDirect(r,null,a,p,h,null)}function y(t,n,r,i){let a=null,o=r.isPointLight===!0?t.customDistanceMaterial:t.customDepthMaterial;if(o!==void 0)a=o;else if(a=r.isPointLight===!0?c:s,e.localClippingEnabled&&n.clipShadows===!0&&Array.isArray(n.clippingPlanes)&&n.clippingPlanes.length!==0||n.displacementMap&&n.displacementScale!==0||n.alphaMap&&n.alphaTest>0||n.map&&n.alphaTest>0||n.alphaToCoverage===!0){let e=a.uuid,t=n.uuid,r=l[e];r===void 0&&(r={},l[e]=r);let i=r[t];i===void 0&&(i=a.clone(),r[t]=i,n.addEventListener(`dispose`,x)),a=i}if(a.visible=n.visible,a.wireframe=n.wireframe,i===3?a.side=n.shadowSide===null?n.side:n.shadowSide:a.side=n.shadowSide===null?d[n.side]:n.shadowSide,a.alphaMap=n.alphaMap,a.alphaTest=n.alphaToCoverage===!0?.5:n.alphaTest,a.map=n.map,a.clipShadows=n.clipShadows,a.clippingPlanes=n.clippingPlanes,a.clipIntersection=n.clipIntersection,a.displacementMap=n.displacementMap,a.displacementScale=n.displacementScale,a.displacementBias=n.displacementBias,a.wireframeLinewidth=n.wireframeLinewidth,a.linewidth=n.linewidth,r.isPointLight===!0&&a.isMeshDistanceMaterial===!0){let t=e.properties.get(a);t.light=r}return a}function b(n,i,a,o,s){if(n.visible===!1)return;if(n.layers.test(i.layers)&&(n.isMesh||n.isLine||n.isPoints)&&(n.castShadow||n.receiveShadow&&s===3)&&(!n.frustumCulled||n.intersectsFrustum(r))){n.modelViewMatrix.multiplyMatrices(a.matrixWorldInverse,n.matrixWorld);let r=t.update(n),c=n.material;if(Array.isArray(c)){let t=r.groups;for(let l=0,u=t.length;l<u;l++){let u=t[l],d=c[u.materialIndex];if(d&&d.visible){let t=y(n,d,o,s);n.onBeforeShadow(e,n,i,a,r,t,u),e.renderBufferDirect(a,null,r,t,n,u),n.onAfterShadow(e,n,i,a,r,t,u)}}}else if(c.visible){let t=y(n,c,o,s);n.onBeforeShadow(e,n,i,a,r,t,null),e.renderBufferDirect(a,null,r,t,n,null),n.onAfterShadow(e,n,i,a,r,t,null)}}let c=n.children;for(let e=0,t=c.length;e<t;e++)b(c[e],i,a,o,s)}function x(e){e.target.removeEventListener(`dispose`,x);for(let t in l){let n=l[t],r=e.target.uuid;r in n&&(n[r].dispose(),delete n[r])}}}function gl(e,t){function n(){let t=!1,n=new yn,r=null,i=new yn(0,0,0,0);return{setMask:function(n){r!==n&&!t&&(e.colorMask(n,n,n,n),r=n)},setLocked:function(e){t=e},setClear:function(t,r,a,o,s){s===!0&&(t*=o,r*=o,a*=o),n.set(t,r,a,o),i.equals(n)===!1&&(e.clearColor(t,r,a,o),i.copy(n))},reset:function(){t=!1,r=null,i.set(-1,0,0,0)}}}function r(){let n=!1,r=!1,i=null,a=null,o=null;return{setReversed:function(e){if(r!==e){let n=t.get(`EXT_clip_control`);e?n.clipControlEXT(n.LOWER_LEFT_EXT,n.ZERO_TO_ONE_EXT):n.clipControlEXT(n.LOWER_LEFT_EXT,n.NEGATIVE_ONE_TO_ONE_EXT),r=e;let i=o;o=null,this.setClear(i)}},getReversed:function(){return r},setTest:function(t){t?se(e.DEPTH_TEST):ce(e.DEPTH_TEST)},setMask:function(t){i!==t&&!n&&(e.depthMask(t),i=t)},setFunc:function(t){if(r&&(t=Gt[t]),a!==t){switch(t){case 0:e.depthFunc(e.NEVER);break;case 1:e.depthFunc(e.ALWAYS);break;case 2:e.depthFunc(e.LESS);break;case 3:e.depthFunc(e.LEQUAL);break;case 4:e.depthFunc(e.EQUAL);break;case 5:e.depthFunc(e.GEQUAL);break;case 6:e.depthFunc(e.GREATER);break;case 7:e.depthFunc(e.NOTEQUAL);break;default:e.depthFunc(e.LEQUAL)}a=t}},setLocked:function(e){n=e},setClear:function(t){o!==t&&(o=t,r&&(t=1-t),e.clearDepth(t))},reset:function(){n=!1,i=null,a=null,o=null,r=!1}}}function i(){let t=!1,n=null,r=null,i=null,a=null,o=null,s=null,c=null,l=null;return{setTest:function(n){t||(n?se(e.STENCIL_TEST):ce(e.STENCIL_TEST))},setMask:function(r){n!==r&&!t&&(e.stencilMask(r),n=r)},setFunc:function(t,n,o){(r!==t||i!==n||a!==o)&&(e.stencilFunc(t,n,o),r=t,i=n,a=o)},setOp:function(t,n,r){(o!==t||s!==n||c!==r)&&(e.stencilOp(t,n,r),o=t,s=n,c=r)},setLocked:function(e){t=e},setClear:function(t){l!==t&&(e.clearStencil(t),l=t)},reset:function(){t=!1,n=null,r=null,i=null,a=null,o=null,s=null,c=null,l=null}}}let a=new n,o=new r,s=new i,c=new WeakMap,l=new WeakMap,u={},d={},f={},p=new WeakMap,m=[],h=null,g=!1,_=null,v=null,y=null,b=null,x=null,S=null,C=null,w=new Z(0,0,0),T=0,E=!1,D=null,O=null,k=null,A=null,j=null,ee=e.getParameter(e.MAX_COMBINED_TEXTURE_IMAGE_UNITS),M=!1,te=0,ne=e.getParameter(e.VERSION);ne.indexOf(`WebGL`)===-1?ne.indexOf(`OpenGL ES`)!==-1&&(te=parseFloat(/^OpenGL ES (\d)/.exec(ne)[1]),M=te>=2):(te=parseFloat(/^WebGL (\d)/.exec(ne)[1]),M=te>=1);let N=null,re={},P=e.getParameter(e.SCISSOR_BOX),ie=e.getParameter(e.VIEWPORT),ae=new yn().fromArray(P),F=new yn().fromArray(ie);function oe(t,n,r,i){let a=new Uint8Array(4),o=e.createTexture();e.bindTexture(t,o),e.texParameteri(t,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(t,e.TEXTURE_MAG_FILTER,e.NEAREST);for(let o=0;o<r;o++)t===e.TEXTURE_3D||t===e.TEXTURE_2D_ARRAY?e.texImage3D(n,0,e.RGBA,1,1,i,0,e.RGBA,e.UNSIGNED_BYTE,a):e.texImage2D(n+o,0,e.RGBA,1,1,0,e.RGBA,e.UNSIGNED_BYTE,a);return o}let I={};I[e.TEXTURE_2D]=oe(e.TEXTURE_2D,e.TEXTURE_2D,1),I[e.TEXTURE_CUBE_MAP]=oe(e.TEXTURE_CUBE_MAP,e.TEXTURE_CUBE_MAP_POSITIVE_X,6),I[e.TEXTURE_2D_ARRAY]=oe(e.TEXTURE_2D_ARRAY,e.TEXTURE_2D_ARRAY,1,1),I[e.TEXTURE_3D]=oe(e.TEXTURE_3D,e.TEXTURE_3D,1,1),a.setClear(0,0,0,1),o.setClear(1),s.setClear(0),se(e.DEPTH_TEST),o.setFunc(3),he(!1),R(1),se(e.CULL_FACE),me(0);function se(t){u[t]!==!0&&(e.enable(t),u[t]=!0)}function ce(t){u[t]!==!1&&(e.disable(t),u[t]=!1)}function le(t,n){return f[t]!==n&&(e.bindFramebuffer(t,n),f[t]=n,t===e.DRAW_FRAMEBUFFER&&(f[e.FRAMEBUFFER]=n),t===e.FRAMEBUFFER&&(f[e.DRAW_FRAMEBUFFER]=n),!0)}function ue(t,n){let r=m,i=!1;if(t){r=p.get(n),r===void 0&&(r=[],p.set(n,r));let a=t.textures;if(r.length!==a.length||r[0]!==e.COLOR_ATTACHMENT0){for(let t=0,n=a.length;t<n;t++)r[t]=e.COLOR_ATTACHMENT0+t;r.length=a.length,i=!0}}else r[0]!==e.BACK&&(r[0]=e.BACK,i=!0);i&&e.drawBuffers(r)}function de(t){return h!==t&&(e.useProgram(t),h=t,!0)}let fe={100:e.FUNC_ADD,101:e.FUNC_SUBTRACT,102:e.FUNC_REVERSE_SUBTRACT};fe[103]=e.MIN,fe[104]=e.MAX;let pe={200:e.ZERO,201:e.ONE,202:e.SRC_COLOR,204:e.SRC_ALPHA,210:e.SRC_ALPHA_SATURATE,208:e.DST_COLOR,206:e.DST_ALPHA,203:e.ONE_MINUS_SRC_COLOR,205:e.ONE_MINUS_SRC_ALPHA,209:e.ONE_MINUS_DST_COLOR,207:e.ONE_MINUS_DST_ALPHA,211:e.CONSTANT_COLOR,212:e.ONE_MINUS_CONSTANT_COLOR,213:e.CONSTANT_ALPHA,214:e.ONE_MINUS_CONSTANT_ALPHA};function me(t,n,r,i,a,o,s,c,l,u){if(t===0)g===!0&&(ce(e.BLEND),g=!1);else if(g===!1&&(se(e.BLEND),g=!0),t!==5){if(t!==_||u!==E){if((v!==100||x!==100)&&(e.blendEquation(e.FUNC_ADD),v=100,x=100),u)switch(t){case 1:e.blendFuncSeparate(e.ONE,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case 2:e.blendFunc(e.ONE,e.ONE);break;case 3:e.blendFuncSeparate(e.ZERO,e.ONE_MINUS_SRC_COLOR,e.ZERO,e.ONE);break;case 4:e.blendFuncSeparate(e.DST_COLOR,e.ONE_MINUS_SRC_ALPHA,e.ZERO,e.ONE);break;default:G(`WebGLState: Invalid blending: `,t)}else switch(t){case 1:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case 2:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE,e.ONE,e.ONE);break;case 3:G(`WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true`);break;case 4:G(`WebGLState: MultiplyBlending requires material.premultipliedAlpha = true`);break;default:G(`WebGLState: Invalid blending: `,t)}y=null,b=null,S=null,C=null,w.set(0,0,0),T=0,_=t,E=u}}else a||=n,o||=r,s||=i,(n!==v||a!==x)&&(e.blendEquationSeparate(fe[n],fe[a]),v=n,x=a),(r!==y||i!==b||o!==S||s!==C)&&(e.blendFuncSeparate(pe[r],pe[i],pe[o],pe[s]),y=r,b=i,S=o,C=s),(c.equals(w)===!1||l!==T)&&(e.blendColor(c.r,c.g,c.b,l),w.copy(c),T=l),_=t,E=!1}function L(t,n){t.side===2?ce(e.CULL_FACE):se(e.CULL_FACE);let r=t.side===1;n&&(r=!r),he(r),t.blending===1&&t.transparent===!1?me(0):me(t.blending,t.blendEquation,t.blendSrc,t.blendDst,t.blendEquationAlpha,t.blendSrcAlpha,t.blendDstAlpha,t.blendColor,t.blendAlpha,t.premultipliedAlpha),o.setFunc(t.depthFunc),o.setTest(t.depthTest),o.setMask(t.depthWrite),a.setMask(t.colorWrite);let i=t.stencilWrite;s.setTest(i),i&&(s.setMask(t.stencilWriteMask),s.setFunc(t.stencilFunc,t.stencilRef,t.stencilFuncMask),s.setOp(t.stencilFail,t.stencilZFail,t.stencilZPass)),_e(t.polygonOffset,t.polygonOffsetFactor,t.polygonOffsetUnits),t.alphaToCoverage===!0?se(e.SAMPLE_ALPHA_TO_COVERAGE):ce(e.SAMPLE_ALPHA_TO_COVERAGE)}function he(t){D!==t&&(t?e.frontFace(e.CW):e.frontFace(e.CCW),D=t)}function R(t){t===0?ce(e.CULL_FACE):(se(e.CULL_FACE),t!==O&&(t===1?e.cullFace(e.BACK):t===2?e.cullFace(e.FRONT):e.cullFace(e.FRONT_AND_BACK))),O=t}function ge(t){t!==k&&(M&&e.lineWidth(t),k=t)}function _e(t,n,r){t?(se(e.POLYGON_OFFSET_FILL),(A!==n||j!==r)&&(A=n,j=r,o.getReversed()&&(n=-n),e.polygonOffset(n,r))):ce(e.POLYGON_OFFSET_FILL)}function ve(t){t?se(e.SCISSOR_TEST):ce(e.SCISSOR_TEST)}function z(t){t===void 0&&(t=e.TEXTURE0+ee-1),N!==t&&(e.activeTexture(t),N=t)}function ye(t,n,r){r===void 0&&(r=N===null?e.TEXTURE0+ee-1:N);let i=re[r];i===void 0&&(i={type:void 0,texture:void 0},re[r]=i),(i.type!==t||i.texture!==n)&&(N!==r&&(e.activeTexture(r),N=r),e.bindTexture(t,n||I[t]),i.type=t,i.texture=n)}function B(){let t=re[N];t!==void 0&&t.type!==void 0&&(e.bindTexture(t.type,null),t.type=void 0,t.texture=void 0)}function be(){try{e.compressedTexImage2D(...arguments)}catch(e){G(`WebGLState:`,e)}}function xe(){try{e.compressedTexImage3D(...arguments)}catch(e){G(`WebGLState:`,e)}}function Se(){try{e.texSubImage2D(...arguments)}catch(e){G(`WebGLState:`,e)}}function Ce(){try{e.texSubImage3D(...arguments)}catch(e){G(`WebGLState:`,e)}}function we(){try{e.compressedTexSubImage2D(...arguments)}catch(e){G(`WebGLState:`,e)}}function V(){try{e.compressedTexSubImage3D(...arguments)}catch(e){G(`WebGLState:`,e)}}function Te(){try{e.texStorage2D(...arguments)}catch(e){G(`WebGLState:`,e)}}function Ee(){try{e.texStorage3D(...arguments)}catch(e){G(`WebGLState:`,e)}}function De(){try{e.texImage2D(...arguments)}catch(e){G(`WebGLState:`,e)}}function Oe(){try{e.texImage3D(...arguments)}catch(e){G(`WebGLState:`,e)}}function ke(t){return d[t]===void 0?e.getParameter(t):d[t]}function H(t,n){d[t]!==n&&(e.pixelStorei(t,n),d[t]=n)}function U(t){ae.equals(t)===!1&&(e.scissor(t.x,t.y,t.z,t.w),ae.copy(t))}function Ae(t){F.equals(t)===!1&&(e.viewport(t.x,t.y,t.z,t.w),F.copy(t))}function je(t,n){let r=l.get(n);r===void 0&&(r=new WeakMap,l.set(n,r));let i=r.get(t);i===void 0&&(i=e.getUniformBlockIndex(n,t.name),r.set(t,i))}function Me(t,n){let r=l.get(n).get(t);c.get(n)!==r&&(e.uniformBlockBinding(n,r,t.__bindingPointIndex),c.set(n,r))}function Ne(){e.disable(e.BLEND),e.disable(e.CULL_FACE),e.disable(e.DEPTH_TEST),e.disable(e.POLYGON_OFFSET_FILL),e.disable(e.SCISSOR_TEST),e.disable(e.STENCIL_TEST),e.disable(e.SAMPLE_ALPHA_TO_COVERAGE),e.blendEquation(e.FUNC_ADD),e.blendFunc(e.ONE,e.ZERO),e.blendFuncSeparate(e.ONE,e.ZERO,e.ONE,e.ZERO),e.blendColor(0,0,0,0),e.colorMask(!0,!0,!0,!0),e.clearColor(0,0,0,0),e.depthMask(!0),e.depthFunc(e.LESS),o.setReversed(!1),e.clearDepth(1),e.stencilMask(4294967295),e.stencilFunc(e.ALWAYS,0,4294967295),e.stencilOp(e.KEEP,e.KEEP,e.KEEP),e.clearStencil(0),e.cullFace(e.BACK),e.frontFace(e.CCW),e.polygonOffset(0,0),e.activeTexture(e.TEXTURE0),e.bindFramebuffer(e.FRAMEBUFFER,null),e.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),e.bindFramebuffer(e.READ_FRAMEBUFFER,null),e.useProgram(null),e.lineWidth(1),e.scissor(0,0,e.canvas.width,e.canvas.height),e.viewport(0,0,e.canvas.width,e.canvas.height),e.pixelStorei(e.PACK_ALIGNMENT,4),e.pixelStorei(e.UNPACK_ALIGNMENT,4),e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,!1),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,e.BROWSER_DEFAULT_WEBGL),e.pixelStorei(e.PACK_ROW_LENGTH,0),e.pixelStorei(e.PACK_SKIP_PIXELS,0),e.pixelStorei(e.PACK_SKIP_ROWS,0),e.pixelStorei(e.UNPACK_ROW_LENGTH,0),e.pixelStorei(e.UNPACK_IMAGE_HEIGHT,0),e.pixelStorei(e.UNPACK_SKIP_PIXELS,0),e.pixelStorei(e.UNPACK_SKIP_ROWS,0),e.pixelStorei(e.UNPACK_SKIP_IMAGES,0),u={},d={},N=null,re={},f={},p=new WeakMap,m=[],h=null,g=!1,_=null,v=null,y=null,b=null,x=null,S=null,C=null,w=new Z(0,0,0),T=0,E=!1,D=null,O=null,k=null,A=null,j=null,ae.set(0,0,e.canvas.width,e.canvas.height),F.set(0,0,e.canvas.width,e.canvas.height),a.reset(),o.reset(),s.reset()}return{buffers:{color:a,depth:o,stencil:s},enable:se,disable:ce,bindFramebuffer:le,drawBuffers:ue,useProgram:de,setBlending:me,setMaterial:L,setFlipSided:he,setCullFace:R,setLineWidth:ge,setPolygonOffset:_e,setScissorTest:ve,activeTexture:z,bindTexture:ye,unbindTexture:B,compressedTexImage2D:be,compressedTexImage3D:xe,texImage2D:De,texImage3D:Oe,pixelStorei:H,getParameter:ke,updateUBOMapping:je,uniformBlockBinding:Me,texStorage2D:Te,texStorage3D:Ee,texSubImage2D:Se,texSubImage3D:Ce,compressedTexSubImage2D:we,compressedTexSubImage3D:V,scissor:U,viewport:Ae,reset:Ne}}function _l(e,t,n,r,i,a,o){let s=t.has(`WEBGL_multisampled_render_to_texture`)?t.get(`WEBGL_multisampled_render_to_texture`):null,c=typeof navigator>`u`?!1:/OculusBrowser/g.test(navigator.userAgent),l=new q,u=new WeakMap,d=new Set,f,p=new WeakMap,m=!1;try{m=typeof OffscreenCanvas<`u`&&new OffscreenCanvas(1,1).getContext(`2d`)!==null}catch{}function h(e,t){return m?new OffscreenCanvas(e,t):Rt(`canvas`)}function g(e,t,n){let r=1,i=Oe(e);if((i.width>n||i.height>n)&&(r=n/Math.max(i.width,i.height)),r<1){if(typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap||typeof VideoFrame<`u`&&e instanceof VideoFrame){let n=Math.floor(r*i.width),a=Math.floor(r*i.height);f===void 0&&(f=h(n,a));let o=t?h(n,a):f;return o.width=n,o.height=a,o.getContext(`2d`).drawImage(e,0,0,n,a),W(`WebGLRenderer: Texture has been resized from (`+i.width+`x`+i.height+`) to (`+n+`x`+a+`).`),o}return`data`in e&&W(`WebGLRenderer: Image in DataTexture is too big (`+i.width+`x`+i.height+`).`),e}return e}function _(e){return e.generateMipmaps}function v(t){e.generateMipmap(t)}function y(t){return t.isWebGLCubeRenderTarget?e.TEXTURE_CUBE_MAP:t.isWebGL3DRenderTarget?e.TEXTURE_3D:t.isWebGLArrayRenderTarget||t.isCompressedArrayTexture?e.TEXTURE_2D_ARRAY:e.TEXTURE_2D}function b(n,r,i,a,o,s=!1){if(n!==null){if(e[n]!==void 0)return e[n];W(`WebGLRenderer: Attempt to use non-existing WebGL internal format '`+n+`'`)}let c;a&&(c=t.get(`EXT_texture_norm16`),c||W(`WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension`));let l=r;if(r===e.RED&&(i===e.FLOAT&&(l=e.R32F),i===e.HALF_FLOAT&&(l=e.R16F),i===e.UNSIGNED_BYTE&&(l=e.R8),i===e.UNSIGNED_SHORT&&c&&(l=c.R16_EXT),i===e.SHORT&&c&&(l=c.R16_SNORM_EXT)),r===e.RED_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.R8UI),i===e.UNSIGNED_SHORT&&(l=e.R16UI),i===e.UNSIGNED_INT&&(l=e.R32UI),i===e.BYTE&&(l=e.R8I),i===e.SHORT&&(l=e.R16I),i===e.INT&&(l=e.R32I)),r===e.RG&&(i===e.FLOAT&&(l=e.RG32F),i===e.HALF_FLOAT&&(l=e.RG16F),i===e.UNSIGNED_BYTE&&(l=e.RG8),i===e.UNSIGNED_SHORT&&c&&(l=c.RG16_EXT),i===e.SHORT&&c&&(l=c.RG16_SNORM_EXT)),r===e.RG_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.RG8UI),i===e.UNSIGNED_SHORT&&(l=e.RG16UI),i===e.UNSIGNED_INT&&(l=e.RG32UI),i===e.BYTE&&(l=e.RG8I),i===e.SHORT&&(l=e.RG16I),i===e.INT&&(l=e.RG32I)),r===e.RGB_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.RGB8UI),i===e.UNSIGNED_SHORT&&(l=e.RGB16UI),i===e.UNSIGNED_INT&&(l=e.RGB32UI),i===e.BYTE&&(l=e.RGB8I),i===e.SHORT&&(l=e.RGB16I),i===e.INT&&(l=e.RGB32I)),r===e.RGBA_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.RGBA8UI),i===e.UNSIGNED_SHORT&&(l=e.RGBA16UI),i===e.UNSIGNED_INT&&(l=e.RGBA32UI),i===e.BYTE&&(l=e.RGBA8I),i===e.SHORT&&(l=e.RGBA16I),i===e.INT&&(l=e.RGBA32I)),r===e.RGB&&(i===e.UNSIGNED_SHORT&&c&&(l=c.RGB16_EXT),i===e.SHORT&&c&&(l=c.RGB16_SNORM_EXT),i===e.UNSIGNED_INT_5_9_9_9_REV&&(l=e.RGB9_E5),i===e.UNSIGNED_INT_10F_11F_11F_REV&&(l=e.R11F_G11F_B10F)),r===e.RGBA){let t=s?jt:X.getTransfer(o);i===e.FLOAT&&(l=e.RGBA32F),i===e.HALF_FLOAT&&(l=e.RGBA16F),i===e.UNSIGNED_BYTE&&(l=t===`srgb`?e.SRGB8_ALPHA8:e.RGBA8),i===e.UNSIGNED_SHORT&&c&&(l=c.RGBA16_EXT),i===e.SHORT&&c&&(l=c.RGBA16_SNORM_EXT),i===e.UNSIGNED_SHORT_4_4_4_4&&(l=e.RGBA4),i===e.UNSIGNED_SHORT_5_5_5_1&&(l=e.RGB5_A1)}return(l===e.R16F||l===e.R32F||l===e.RG16F||l===e.RG32F||l===e.RGBA16F||l===e.RGBA32F)&&t.get(`EXT_color_buffer_float`),l}function x(t,n){let r;return t?n===null||n===1014||n===1020?r=e.DEPTH24_STENCIL8:n===1015?r=e.DEPTH32F_STENCIL8:n===1012&&(r=e.DEPTH24_STENCIL8,W(`DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.`)):n===null||n===1014||n===1020?r=e.DEPTH_COMPONENT24:n===1015?r=e.DEPTH_COMPONENT32F:n===1012&&(r=e.DEPTH_COMPONENT16),r}function S(e,t){return _(e)===!0||e.isFramebufferTexture&&e.minFilter!==1003&&e.minFilter!==1006?Math.log2(Math.max(t.width,t.height))+1:e.mipmaps!==void 0&&e.mipmaps.length>0?e.mipmaps.length:e.isCompressedTexture&&Array.isArray(e.image)?t.mipmaps.length:1}function C(e){let t=e.target;t.removeEventListener(`dispose`,C),T(t),t.isVideoTexture&&u.delete(t),t.isHTMLTexture&&d.delete(t)}function w(e){let t=e.target;t.removeEventListener(`dispose`,w),D(t)}function T(e){let t=r.get(e);if(t.__webglInit===void 0)return;let n=e.source,i=p.get(n);if(i){let r=i[t.__cacheKey];r.usedTimes--,r.usedTimes===0&&E(e),Object.keys(i).length===0&&p.delete(n)}r.remove(e)}function E(t){let n=r.get(t);e.deleteTexture(n.__webglTexture);let i=t.source,a=p.get(i);delete a[n.__cacheKey],o.memory.textures--}function D(t){let n=r.get(t);if(t.depthTexture&&(t.depthTexture.dispose(),r.remove(t.depthTexture)),t.isWebGLCubeRenderTarget)for(let t=0;t<6;t++){if(Array.isArray(n.__webglFramebuffer[t]))for(let r=0;r<n.__webglFramebuffer[t].length;r++)e.deleteFramebuffer(n.__webglFramebuffer[t][r]);else e.deleteFramebuffer(n.__webglFramebuffer[t]);n.__webglDepthbuffer&&e.deleteRenderbuffer(n.__webglDepthbuffer[t])}else{if(Array.isArray(n.__webglFramebuffer))for(let t=0;t<n.__webglFramebuffer.length;t++)e.deleteFramebuffer(n.__webglFramebuffer[t]);else e.deleteFramebuffer(n.__webglFramebuffer);if(n.__webglDepthbuffer&&e.deleteRenderbuffer(n.__webglDepthbuffer),n.__webglMultisampledFramebuffer&&e.deleteFramebuffer(n.__webglMultisampledFramebuffer),n.__webglColorRenderbuffer)for(let t=0;t<n.__webglColorRenderbuffer.length;t++)n.__webglColorRenderbuffer[t]&&e.deleteRenderbuffer(n.__webglColorRenderbuffer[t]);n.__webglDepthRenderbuffer&&e.deleteRenderbuffer(n.__webglDepthRenderbuffer)}let i=t.textures;for(let t=0,n=i.length;t<n;t++){let n=r.get(i[t]);n.__webglTexture&&(e.deleteTexture(n.__webglTexture),o.memory.textures--),r.remove(i[t])}r.remove(t)}let O=0;function k(){O=0}function A(){return O}function j(e){O=e}function ee(){let e=O;return e>=i.maxTextures&&W(`WebGLTextures: Trying to use `+(e+1)+` texture units while this GPU supports only `+i.maxTextures),O+=1,e}function M(e){let t=[];return t.push(e.wrapS),t.push(e.wrapT),t.push(e.wrapR||0),t.push(e.magFilter),t.push(e.minFilter),t.push(e.anisotropy),t.push(e.internalFormat),t.push(e.format),t.push(e.type),t.push(e.generateMipmaps),t.push(e.premultiplyAlpha),t.push(e.flipY),t.push(e.unpackAlignment),t.push(e.colorSpace),t.join()}function te(t,i){let a=r.get(t);if(t.isVideoTexture&&Ee(t),t.isRenderTargetTexture===!1&&t.isExternalTexture!==!0&&t.version>0&&a.__version!==t.version){let e=t.image;if(e===null)W(`WebGLRenderer: Texture marked for update but no image data found.`);else if(e.complete===!1)W(`WebGLRenderer: Texture marked for update but image is incomplete`);else{ce(a,t,i);return}}else t.isExternalTexture&&(a.__webglTexture=t.sourceTexture?t.sourceTexture:null);n.bindTexture(e.TEXTURE_2D,a.__webglTexture,e.TEXTURE0+i)}function ne(t,i){let a=r.get(t);t.isRenderTargetTexture===!1&&t.version>0&&a.__version!==t.version?ce(a,t,i):(t.isExternalTexture&&(a.__webglTexture=t.sourceTexture?t.sourceTexture:null),n.bindTexture(e.TEXTURE_2D_ARRAY,a.__webglTexture,e.TEXTURE0+i))}function N(t,i){let a=r.get(t);t.isRenderTargetTexture===!1&&t.version>0&&a.__version!==t.version?ce(a,t,i):n.bindTexture(e.TEXTURE_3D,a.__webglTexture,e.TEXTURE0+i)}function re(t,i){let a=r.get(t);t.isCubeDepthTexture!==!0&&t.version>0&&a.__version!==t.version?le(a,t,i):n.bindTexture(e.TEXTURE_CUBE_MAP,a.__webglTexture,e.TEXTURE0+i)}let P={[me]:e.REPEAT,[L]:e.CLAMP_TO_EDGE,[he]:e.MIRRORED_REPEAT},ie={[R]:e.NEAREST,[ge]:e.NEAREST_MIPMAP_NEAREST,[_e]:e.NEAREST_MIPMAP_LINEAR,[ve]:e.LINEAR,[z]:e.LINEAR_MIPMAP_NEAREST,[ye]:e.LINEAR_MIPMAP_LINEAR},ae={512:e.NEVER,519:e.ALWAYS,513:e.LESS,515:e.LEQUAL,514:e.EQUAL,518:e.GEQUAL,516:e.GREATER,517:e.NOTEQUAL};function F(n,a){if(a.type===1015&&t.has(`OES_texture_float_linear`)===!1&&(a.magFilter===1006||a.magFilter===1007||a.magFilter===1005||a.magFilter===1008||a.minFilter===1006||a.minFilter===1007||a.minFilter===1005||a.minFilter===1008)&&W(`WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device.`),e.texParameteri(n,e.TEXTURE_WRAP_S,P[a.wrapS]),e.texParameteri(n,e.TEXTURE_WRAP_T,P[a.wrapT]),(n===e.TEXTURE_3D||n===e.TEXTURE_2D_ARRAY)&&e.texParameteri(n,e.TEXTURE_WRAP_R,P[a.wrapR]),e.texParameteri(n,e.TEXTURE_MAG_FILTER,ie[a.magFilter]),e.texParameteri(n,e.TEXTURE_MIN_FILTER,ie[a.minFilter]),a.compareFunction&&(e.texParameteri(n,e.TEXTURE_COMPARE_MODE,e.COMPARE_REF_TO_TEXTURE),e.texParameteri(n,e.TEXTURE_COMPARE_FUNC,ae[a.compareFunction])),t.has(`EXT_texture_filter_anisotropic`)===!0){if(a.magFilter===1003||a.minFilter!==1005&&a.minFilter!==1008||a.type===1015&&t.has(`OES_texture_float_linear`)===!1)return;if(a.anisotropy>1||r.get(a).__currentAnisotropy){let o=t.get(`EXT_texture_filter_anisotropic`);e.texParameterf(n,o.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(a.anisotropy,i.getMaxAnisotropy())),r.get(a).__currentAnisotropy=a.anisotropy}}}function oe(t,n){let r=!1;t.__webglInit===void 0&&(t.__webglInit=!0,n.addEventListener(`dispose`,C));let i=n.source,a=p.get(i);a===void 0&&(a={},p.set(i,a));let s=M(n);if(s!==t.__cacheKey){a[s]===void 0&&(a[s]={texture:e.createTexture(),usedTimes:0},o.memory.textures++,r=!0),a[s].usedTimes++;let i=a[t.__cacheKey];i!==void 0&&(a[t.__cacheKey].usedTimes--,i.usedTimes===0&&E(n)),t.__cacheKey=s,t.__webglTexture=a[s].texture}return r}function I(e,t,n){return Math.floor(Math.floor(e/n)/t)}function se(t,r,i,a){let o=t.updateRanges;if(o.length===0)n.texSubImage2D(e.TEXTURE_2D,0,0,0,r.width,r.height,i,a,r.data);else{o.sort((e,t)=>e.start-t.start);let s=0;for(let e=1;e<o.length;e++){let t=o[s],n=o[e],i=t.start+t.count,a=I(n.start,r.width,4),c=I(t.start,r.width,4);n.start<=i+1&&a===c&&I(n.start+n.count-1,r.width,4)===a?t.count=Math.max(t.count,n.start+n.count-t.start):(++s,o[s]=n)}o.length=s+1;let c=n.getParameter(e.UNPACK_ROW_LENGTH),l=n.getParameter(e.UNPACK_SKIP_PIXELS),u=n.getParameter(e.UNPACK_SKIP_ROWS);n.pixelStorei(e.UNPACK_ROW_LENGTH,r.width);for(let t=0,s=o.length;t<s;t++){let s=o[t],c=Math.floor(s.start/4),l=Math.ceil(s.count/4),u=c%r.width,d=Math.floor(c/r.width),f=l;n.pixelStorei(e.UNPACK_SKIP_PIXELS,u),n.pixelStorei(e.UNPACK_SKIP_ROWS,d),n.texSubImage2D(e.TEXTURE_2D,0,u,d,f,1,i,a,r.data)}t.clearUpdateRanges(),n.pixelStorei(e.UNPACK_ROW_LENGTH,c),n.pixelStorei(e.UNPACK_SKIP_PIXELS,l),n.pixelStorei(e.UNPACK_SKIP_ROWS,u)}}function ce(t,o,s){let c=e.TEXTURE_2D;(o.isDataArrayTexture||o.isCompressedArrayTexture)&&(c=e.TEXTURE_2D_ARRAY),o.isData3DTexture&&(c=e.TEXTURE_3D);let l=oe(t,o),u=o.source;n.bindTexture(c,t.__webglTexture,e.TEXTURE0+s);let f=r.get(u);if(u.version!==f.__version||l===!0){if(n.activeTexture(e.TEXTURE0+s),!(typeof ImageBitmap<`u`&&o.image instanceof ImageBitmap)){let t=X.getPrimaries(X.workingColorSpace),r=o.colorSpace===``?null:X.getPrimaries(o.colorSpace),i=o.colorSpace===``||t===r?e.NONE:e.BROWSER_DEFAULT_WEBGL;n.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,o.flipY),n.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,o.premultiplyAlpha),n.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,i)}n.pixelStorei(e.UNPACK_ALIGNMENT,o.unpackAlignment);let t=g(o.image,!1,i.maxTextureSize);t=De(o,t);let r=a.convert(o.format,o.colorSpace),p=a.convert(o.type),m=b(o.internalFormat,r,p,o.normalized,o.colorSpace,o.isVideoTexture);F(c,o);let h,y=o.mipmaps,C=o.isVideoTexture!==!0,w=f.__version===void 0||l===!0,T=u.dataReady,E=S(o,t);if(o.isDepthTexture)m=x(o.format===Ne,o.type),w&&(C?n.texStorage2D(e.TEXTURE_2D,1,m,t.width,t.height):n.texImage2D(e.TEXTURE_2D,0,m,t.width,t.height,0,r,p,null));else if(o.isDataTexture){if(y.length>0){C&&w&&n.texStorage2D(e.TEXTURE_2D,E,m,y[0].width,y[0].height);for(let t=0,i=y.length;t<i;t++)h=y[t],C?T&&n.texSubImage2D(e.TEXTURE_2D,t,0,0,h.width,h.height,r,p,h.data):n.texImage2D(e.TEXTURE_2D,t,m,h.width,h.height,0,r,p,h.data);o.generateMipmaps=!1}else C?(w&&n.texStorage2D(e.TEXTURE_2D,E,m,t.width,t.height),T&&se(o,t,r,p)):n.texImage2D(e.TEXTURE_2D,0,m,t.width,t.height,0,r,p,t.data)}else if(o.isCompressedTexture){if(o.isCompressedArrayTexture){C&&w&&n.texStorage3D(e.TEXTURE_2D_ARRAY,E,m,y[0].width,y[0].height,t.depth);for(let i=0,a=y.length;i<a;i++)if(h=y[i],o.format!==1023){if(r!==null){if(C){if(T){if(o.layerUpdates.size>0){let t=fo(h.width,h.height,o.format,o.type);for(let a of o.layerUpdates){let o=h.data.subarray(a*t/h.data.BYTES_PER_ELEMENT,(a+1)*t/h.data.BYTES_PER_ELEMENT);n.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,i,0,0,a,h.width,h.height,1,r,o)}}else n.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,i,0,0,0,h.width,h.height,t.depth,r,h.data)}}else n.compressedTexImage3D(e.TEXTURE_2D_ARRAY,i,m,h.width,h.height,t.depth,0,h.data,0,0)}else W(`WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()`)}else C?T&&n.texSubImage3D(e.TEXTURE_2D_ARRAY,i,0,0,0,h.width,h.height,t.depth,r,p,h.data):n.texImage3D(e.TEXTURE_2D_ARRAY,i,m,h.width,h.height,t.depth,0,r,p,h.data);o.layerUpdates.size>0&&o.clearLayerUpdates()}else{C&&w&&n.texStorage2D(e.TEXTURE_2D,E,m,y[0].width,y[0].height);for(let t=0,i=y.length;t<i;t++)h=y[t],o.format===1023?C?T&&n.texSubImage2D(e.TEXTURE_2D,t,0,0,h.width,h.height,r,p,h.data):n.texImage2D(e.TEXTURE_2D,t,m,h.width,h.height,0,r,p,h.data):r===null?W(`WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()`):C?T&&n.compressedTexSubImage2D(e.TEXTURE_2D,t,0,0,h.width,h.height,r,h.data):n.compressedTexImage2D(e.TEXTURE_2D,t,m,h.width,h.height,0,h.data)}}else if(o.isDataArrayTexture){if(C){if(w&&n.texStorage3D(e.TEXTURE_2D_ARRAY,E,m,t.width,t.height,t.depth),T){if(o.layerUpdates.size>0){let i=fo(t.width,t.height,o.format,o.type);for(let a of o.layerUpdates){let o=t.data.subarray(a*i/t.data.BYTES_PER_ELEMENT,(a+1)*i/t.data.BYTES_PER_ELEMENT);n.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,a,t.width,t.height,1,r,p,o)}o.clearLayerUpdates()}else n.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,0,t.width,t.height,t.depth,r,p,t.data)}}else n.texImage3D(e.TEXTURE_2D_ARRAY,0,m,t.width,t.height,t.depth,0,r,p,t.data)}else if(o.isData3DTexture)C?(w&&n.texStorage3D(e.TEXTURE_3D,E,m,t.width,t.height,t.depth),T&&n.texSubImage3D(e.TEXTURE_3D,0,0,0,0,t.width,t.height,t.depth,r,p,t.data)):n.texImage3D(e.TEXTURE_3D,0,m,t.width,t.height,t.depth,0,r,p,t.data);else if(o.isFramebufferTexture){if(w){if(C)n.texStorage2D(e.TEXTURE_2D,E,m,t.width,t.height);else{let i=t.width,a=t.height;for(let t=0;t<E;t++)n.texImage2D(e.TEXTURE_2D,t,m,i,a,0,r,p,null),i>>=1,a>>=1}}}else if(o.isHTMLTexture){if(`texElementImage2D`in e){let n=e.canvas;if(n.hasAttribute(`layoutsubtree`)||n.setAttribute(`layoutsubtree`,`true`),t.parentNode!==n){n.appendChild(t),d.add(o),n.onpaint=e=>{let t=e.changedElements;for(let e of d)t.includes(e.image)&&(e.needsUpdate=!0)},n.requestPaint();return}if(e.texElementImage2D.length===3)e.texElementImage2D(e.TEXTURE_2D,e.RGBA8,t);else{let n=e.RGBA,r=e.RGBA,i=e.UNSIGNED_BYTE;e.texElementImage2D(e.TEXTURE_2D,0,n,r,i,t)}e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE)}}else if(y.length>0){if(C&&w){let t=Oe(y[0]);n.texStorage2D(e.TEXTURE_2D,E,m,t.width,t.height)}for(let t=0,i=y.length;t<i;t++)h=y[t],C?T&&n.texSubImage2D(e.TEXTURE_2D,t,0,0,r,p,h):n.texImage2D(e.TEXTURE_2D,t,m,r,p,h);o.generateMipmaps=!1}else if(C){if(w){let r=Oe(t);n.texStorage2D(e.TEXTURE_2D,E,m,r.width,r.height)}T&&n.texSubImage2D(e.TEXTURE_2D,0,0,0,r,p,t)}else n.texImage2D(e.TEXTURE_2D,0,m,r,p,t);_(o)&&v(c),f.__version=u.version,o.onUpdate&&o.onUpdate(o)}t.__version=o.version}function le(t,o,s){if(o.image.length!==6)return;let c=oe(t,o),l=o.source;n.bindTexture(e.TEXTURE_CUBE_MAP,t.__webglTexture,e.TEXTURE0+s);let u=r.get(l);if(l.version!==u.__version||c===!0){n.activeTexture(e.TEXTURE0+s);let t=X.getPrimaries(X.workingColorSpace),r=o.colorSpace===``?null:X.getPrimaries(o.colorSpace),d=o.colorSpace===``||t===r?e.NONE:e.BROWSER_DEFAULT_WEBGL;n.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,o.flipY),n.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,o.premultiplyAlpha),n.pixelStorei(e.UNPACK_ALIGNMENT,o.unpackAlignment),n.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,d);let f=o.isCompressedTexture||o.image[0].isCompressedTexture,p=o.image[0]&&o.image[0].isDataTexture,m=[];for(let e=0;e<6;e++)!f&&!p?m[e]=g(o.image[e],!0,i.maxCubemapSize):m[e]=p?o.image[e].image:o.image[e],m[e]=De(o,m[e]);let h=m[0],y=a.convert(o.format,o.colorSpace),x=a.convert(o.type),C=b(o.internalFormat,y,x,o.normalized,o.colorSpace),w=o.isVideoTexture!==!0,T=u.__version===void 0||c===!0,E=l.dataReady,D=S(o,h);F(e.TEXTURE_CUBE_MAP,o);let O;if(f){w&&T&&n.texStorage2D(e.TEXTURE_CUBE_MAP,D,C,h.width,h.height);for(let t=0;t<6;t++){O=m[t].mipmaps;for(let r=0;r<O.length;r++){let i=O[r];o.format===1023?w?E&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,0,0,i.width,i.height,y,x,i.data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,C,i.width,i.height,0,y,x,i.data):y===null?W(`WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()`):w?E&&n.compressedTexSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,0,0,i.width,i.height,y,i.data):n.compressedTexImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,C,i.width,i.height,0,i.data)}}}else{if(O=o.mipmaps,w&&T){O.length>0&&D++;let t=Oe(m[0]);n.texStorage2D(e.TEXTURE_CUBE_MAP,D,C,t.width,t.height)}for(let t=0;t<6;t++)if(p){w?E&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,0,0,m[t].width,m[t].height,y,x,m[t].data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,C,m[t].width,m[t].height,0,y,x,m[t].data);for(let r=0;r<O.length;r++){let i=O[r].image[t].image;w?E&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,0,0,i.width,i.height,y,x,i.data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,C,i.width,i.height,0,y,x,i.data)}}else{w?E&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,0,0,y,x,m[t]):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,C,y,x,m[t]);for(let r=0;r<O.length;r++){let i=O[r];w?E&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,0,0,y,x,i.image[t]):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,C,y,x,i.image[t])}}}_(o)&&v(e.TEXTURE_CUBE_MAP),u.__version=l.version,o.onUpdate&&o.onUpdate(o)}t.__version=o.version}function ue(t,i,o,c,l,u){let d=a.convert(o.format,o.colorSpace),f=a.convert(o.type),p=b(o.internalFormat,d,f,o.normalized,o.colorSpace),m=r.get(i),h=r.get(o);if(h.__renderTarget=i,!m.__hasExternalTextures){let t=Math.max(1,i.width>>u),r=Math.max(1,i.height>>u);l===e.TEXTURE_3D||l===e.TEXTURE_2D_ARRAY?n.texImage3D(l,u,p,t,r,i.depth,0,d,f,null):n.texImage2D(l,u,p,t,r,0,d,f,null)}n.bindFramebuffer(e.FRAMEBUFFER,t),Te(i)?s.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,c,l,h.__webglTexture,0,V(i)):(l===e.TEXTURE_2D||l>=e.TEXTURE_CUBE_MAP_POSITIVE_X&&l<=e.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&e.framebufferTexture2D(e.FRAMEBUFFER,c,l,h.__webglTexture,u),n.bindFramebuffer(e.FRAMEBUFFER,null)}function de(t,n,r){if(e.bindRenderbuffer(e.RENDERBUFFER,t),n.depthBuffer){let i=n.depthTexture,a=i&&i.isDepthTexture?i.type:null,o=x(n.stencilBuffer,a),c=n.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;Te(n)?s.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,V(n),o,n.width,n.height):r?e.renderbufferStorageMultisample(e.RENDERBUFFER,V(n),o,n.width,n.height):e.renderbufferStorage(e.RENDERBUFFER,o,n.width,n.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,c,e.RENDERBUFFER,t)}else{let t=n.textures;for(let i=0;i<t.length;i++){let o=t[i],c=a.convert(o.format,o.colorSpace),l=a.convert(o.type),u=b(o.internalFormat,c,l,o.normalized,o.colorSpace);Te(n)?s.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,V(n),u,n.width,n.height):r?e.renderbufferStorageMultisample(e.RENDERBUFFER,V(n),u,n.width,n.height):e.renderbufferStorage(e.RENDERBUFFER,u,n.width,n.height)}}e.bindRenderbuffer(e.RENDERBUFFER,null)}function fe(t,i,o){let c=i.isWebGLCubeRenderTarget===!0;if(n.bindFramebuffer(e.FRAMEBUFFER,t),!(i.depthTexture&&i.depthTexture.isDepthTexture))throw Error(`THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.`);let l=r.get(i.depthTexture);if(l.__renderTarget=i,l.__webglTexture&&i.depthTexture.image.width===i.width&&i.depthTexture.image.height===i.height||(i.depthTexture.image.width=i.width,i.depthTexture.image.height=i.height,i.depthTexture.needsUpdate=!0),c){if(l.__webglInit===void 0&&(l.__webglInit=!0,i.depthTexture.addEventListener(`dispose`,C)),l.__webglTexture===void 0){l.__webglTexture=e.createTexture(),n.bindTexture(e.TEXTURE_CUBE_MAP,l.__webglTexture),F(e.TEXTURE_CUBE_MAP,i.depthTexture);let t=a.convert(i.depthTexture.format),r=a.convert(i.depthTexture.type),o;i.depthTexture.format===1026?o=e.DEPTH_COMPONENT24:i.depthTexture.format===1027&&(o=e.DEPTH24_STENCIL8);for(let n=0;n<6;n++)e.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+n,0,o,i.width,i.height,0,t,r,null)}}else te(i.depthTexture,0);let u=l.__webglTexture,d=V(i),f=c?e.TEXTURE_CUBE_MAP_POSITIVE_X+o:e.TEXTURE_2D,p=i.depthTexture.format===1027?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;if(i.depthTexture.format===1026)Te(i)?s.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,p,f,u,0,d):e.framebufferTexture2D(e.FRAMEBUFFER,p,f,u,0);else if(i.depthTexture.format===1027)Te(i)?s.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,p,f,u,0,d):e.framebufferTexture2D(e.FRAMEBUFFER,p,f,u,0);else throw Error(`THREE.WebGLTextures: Unknown depthTexture format.`)}function pe(t){let i=r.get(t),a=t.isWebGLCubeRenderTarget===!0;if(i.__boundDepthTexture!==t.depthTexture){let e=t.depthTexture;if(i.__depthDisposeCallback&&i.__depthDisposeCallback(),e){let t=()=>{delete i.__boundDepthTexture,delete i.__depthDisposeCallback,e.removeEventListener(`dispose`,t)};e.addEventListener(`dispose`,t),i.__depthDisposeCallback=t}i.__boundDepthTexture=e}if(t.depthTexture&&!i.__autoAllocateDepthBuffer){if(a)for(let e=0;e<6;e++)fe(i.__webglFramebuffer[e],t,e);else{let e=t.texture.mipmaps;e&&e.length>0?fe(i.__webglFramebuffer[0],t,0):fe(i.__webglFramebuffer,t,0)}}else if(a){i.__webglDepthbuffer=[];for(let r=0;r<6;r++)if(n.bindFramebuffer(e.FRAMEBUFFER,i.__webglFramebuffer[r]),i.__webglDepthbuffer[r]===void 0)i.__webglDepthbuffer[r]=e.createRenderbuffer(),de(i.__webglDepthbuffer[r],t,!1);else{let n=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,a=i.__webglDepthbuffer[r];e.bindRenderbuffer(e.RENDERBUFFER,a),e.framebufferRenderbuffer(e.FRAMEBUFFER,n,e.RENDERBUFFER,a)}}else{let r=t.texture.mipmaps;if(r&&r.length>0?n.bindFramebuffer(e.FRAMEBUFFER,i.__webglFramebuffer[0]):n.bindFramebuffer(e.FRAMEBUFFER,i.__webglFramebuffer),i.__webglDepthbuffer===void 0)i.__webglDepthbuffer=e.createRenderbuffer(),de(i.__webglDepthbuffer,t,!1);else{let n=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,r=i.__webglDepthbuffer;e.bindRenderbuffer(e.RENDERBUFFER,r),e.framebufferRenderbuffer(e.FRAMEBUFFER,n,e.RENDERBUFFER,r)}}n.bindFramebuffer(e.FRAMEBUFFER,null)}function B(t,n,i){let a=r.get(t);n!==void 0&&ue(a.__webglFramebuffer,t,t.texture,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,0),i!==void 0&&pe(t)}function be(t){let i=t.texture,s=r.get(t),c=r.get(i);t.addEventListener(`dispose`,w);let l=t.textures,u=t.isWebGLCubeRenderTarget===!0,d=l.length>1;if(d||(c.__webglTexture===void 0&&(c.__webglTexture=e.createTexture()),c.__version=i.version,o.memory.textures++),u){s.__webglFramebuffer=[];for(let t=0;t<6;t++)if(i.mipmaps&&i.mipmaps.length>0){s.__webglFramebuffer[t]=[];for(let n=0;n<i.mipmaps.length;n++)s.__webglFramebuffer[t][n]=e.createFramebuffer()}else s.__webglFramebuffer[t]=e.createFramebuffer()}else{if(i.mipmaps&&i.mipmaps.length>0){s.__webglFramebuffer=[];for(let t=0;t<i.mipmaps.length;t++)s.__webglFramebuffer[t]=e.createFramebuffer()}else s.__webglFramebuffer=e.createFramebuffer();if(d)for(let t=0,n=l.length;t<n;t++){let n=r.get(l[t]);n.__webglTexture===void 0&&(n.__webglTexture=e.createTexture(),o.memory.textures++)}if(t.samples>0&&Te(t)===!1){s.__webglMultisampledFramebuffer=e.createFramebuffer(),s.__webglColorRenderbuffer=[],n.bindFramebuffer(e.FRAMEBUFFER,s.__webglMultisampledFramebuffer);for(let n=0;n<l.length;n++){let r=l[n];s.__webglColorRenderbuffer[n]=e.createRenderbuffer(),e.bindRenderbuffer(e.RENDERBUFFER,s.__webglColorRenderbuffer[n]);let i=a.convert(r.format,r.colorSpace),o=a.convert(r.type),c=b(r.internalFormat,i,o,r.normalized,r.colorSpace,t.isXRRenderTarget===!0),u=V(t);e.renderbufferStorageMultisample(e.RENDERBUFFER,u,c,t.width,t.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+n,e.RENDERBUFFER,s.__webglColorRenderbuffer[n])}e.bindRenderbuffer(e.RENDERBUFFER,null),t.depthBuffer&&(s.__webglDepthRenderbuffer=e.createRenderbuffer(),de(s.__webglDepthRenderbuffer,t,!0)),n.bindFramebuffer(e.FRAMEBUFFER,null)}}if(u){n.bindTexture(e.TEXTURE_CUBE_MAP,c.__webglTexture),F(e.TEXTURE_CUBE_MAP,i);for(let n=0;n<6;n++)if(i.mipmaps&&i.mipmaps.length>0)for(let r=0;r<i.mipmaps.length;r++)ue(s.__webglFramebuffer[n][r],t,i,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+n,r);else ue(s.__webglFramebuffer[n],t,i,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+n,0);_(i)&&v(e.TEXTURE_CUBE_MAP),n.unbindTexture()}else if(d){for(let i=0,a=l.length;i<a;i++){let a=l[i],o=r.get(a),c=e.TEXTURE_2D;(t.isWebGL3DRenderTarget||t.isWebGLArrayRenderTarget)&&(c=t.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),n.bindTexture(c,o.__webglTexture),F(c,a),ue(s.__webglFramebuffer,t,a,e.COLOR_ATTACHMENT0+i,c,0),_(a)&&v(c)}n.unbindTexture()}else{let r=e.TEXTURE_2D;if((t.isWebGL3DRenderTarget||t.isWebGLArrayRenderTarget)&&(r=t.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),n.bindTexture(r,c.__webglTexture),F(r,i),i.mipmaps&&i.mipmaps.length>0)for(let n=0;n<i.mipmaps.length;n++)ue(s.__webglFramebuffer[n],t,i,e.COLOR_ATTACHMENT0,r,n);else ue(s.__webglFramebuffer,t,i,e.COLOR_ATTACHMENT0,r,0);_(i)&&v(r),n.unbindTexture()}t.depthBuffer&&pe(t)}function xe(e){let t=e.textures;for(let i=0,a=t.length;i<a;i++){let a=t[i];if(_(a)){let t=y(e),i=r.get(a).__webglTexture;n.bindTexture(t,i),v(t),n.unbindTexture()}}}let Se=[],Ce=[];function we(t){if(t.samples>0){if(Te(t)===!1){let i=t.textures,a=t.width,o=t.height,s=e.COLOR_BUFFER_BIT,l=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,u=r.get(t),d=i.length>1;if(d)for(let t=0;t<i.length;t++)n.bindFramebuffer(e.FRAMEBUFFER,u.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.RENDERBUFFER,null),n.bindFramebuffer(e.FRAMEBUFFER,u.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.TEXTURE_2D,null,0);n.bindFramebuffer(e.READ_FRAMEBUFFER,u.__webglMultisampledFramebuffer);let f=t.texture.mipmaps;f&&f.length>0?n.bindFramebuffer(e.DRAW_FRAMEBUFFER,u.__webglFramebuffer[0]):n.bindFramebuffer(e.DRAW_FRAMEBUFFER,u.__webglFramebuffer);for(let n=0;n<i.length;n++){if(t.resolveDepthBuffer&&(t.depthBuffer&&(s|=e.DEPTH_BUFFER_BIT),t.stencilBuffer&&t.resolveStencilBuffer&&(s|=e.STENCIL_BUFFER_BIT)),d){e.framebufferRenderbuffer(e.READ_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.RENDERBUFFER,u.__webglColorRenderbuffer[n]);let t=r.get(i[n]).__webglTexture;e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,t,0)}e.blitFramebuffer(0,0,a,o,0,0,a,o,s,e.NEAREST),c===!0&&(Se.length=0,Ce.length=0,Se.push(e.COLOR_ATTACHMENT0+n),t.depthBuffer&&t.storeMultisampledDepthBuffer===!1&&(Se.push(l),Ce.push(l),e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,Ce)),e.invalidateFramebuffer(e.READ_FRAMEBUFFER,Se))}if(n.bindFramebuffer(e.READ_FRAMEBUFFER,null),n.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),d)for(let t=0;t<i.length;t++){n.bindFramebuffer(e.FRAMEBUFFER,u.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.RENDERBUFFER,u.__webglColorRenderbuffer[t]);let a=r.get(i[t]).__webglTexture;n.bindFramebuffer(e.FRAMEBUFFER,u.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.TEXTURE_2D,a,0)}n.bindFramebuffer(e.DRAW_FRAMEBUFFER,u.__webglMultisampledFramebuffer)}else if(t.depthBuffer&&t.storeMultisampledDepthBuffer===!1&&c){let n=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,[n])}}}function V(e){return Math.min(i.maxSamples,e.samples)}function Te(e){let n=r.get(e);return e.samples>0&&t.has(`WEBGL_multisampled_render_to_texture`)===!0&&n.__useRenderToTexture!==!1}function Ee(e){let t=o.render.frame;u.get(e)!==t&&(u.set(e,t),e.update())}function De(e,t){let n=e.colorSpace,r=e.format,i=e.type;return e.isCompressedTexture===!0||e.isVideoTexture===!0||n!==`srgb-linear`&&n!==``&&(X.getTransfer(n)===`srgb`?(r!==1023||i!==1009)&&W(`WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType.`):G(`WebGLTextures: Unsupported texture color space:`,n)),t}function Oe(e){return typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement?(l.width=e.naturalWidth||e.width,l.height=e.naturalHeight||e.height):typeof VideoFrame<`u`&&e instanceof VideoFrame?(l.width=e.displayWidth,l.height=e.displayHeight):(l.width=e.width,l.height=e.height),l}this.allocateTextureUnit=ee,this.resetTextureUnits=k,this.getTextureUnits=A,this.setTextureUnits=j,this.setTexture2D=te,this.setTexture2DArray=ne,this.setTexture3D=N,this.setTextureCube=re,this.rebindTextures=B,this.setupRenderTarget=be,this.updateRenderTargetMipmap=xe,this.updateMultisampleRenderTarget=we,this.setupDepthRenderbuffer=pe,this.setupFrameBufferTexture=ue,this.useMultisampledRTT=Te,this.isReversedDepthBuffer=function(){return n.buffers.depth.getReversed()}}function vl(e,t){function n(n,r=``){let i,a=X.getTransfer(r);if(n===1009)return e.UNSIGNED_BYTE;if(n===1017)return e.UNSIGNED_SHORT_4_4_4_4;if(n===1018)return e.UNSIGNED_SHORT_5_5_5_1;if(n===35902)return e.UNSIGNED_INT_5_9_9_9_REV;if(n===35899)return e.UNSIGNED_INT_10F_11F_11F_REV;if(n===1010)return e.BYTE;if(n===1011)return e.SHORT;if(n===1012)return e.UNSIGNED_SHORT;if(n===1013)return e.INT;if(n===1014)return e.UNSIGNED_INT;if(n===1015)return e.FLOAT;if(n===1016)return e.HALF_FLOAT;if(n===1021)return e.ALPHA;if(n===1022)return e.RGB;if(n===1023)return e.RGBA;if(n===1026)return e.DEPTH_COMPONENT;if(n===1027)return e.DEPTH_STENCIL;if(n===1028)return e.RED;if(n===1029)return e.RED_INTEGER;if(n===1030)return e.RG;if(n===1031)return e.RG_INTEGER;if(n===1033)return e.RGBA_INTEGER;if(n===33776||n===33777||n===33778||n===33779){if(a===`srgb`){if(i=t.get(`WEBGL_compressed_texture_s3tc_srgb`),i!==null){if(n===33776)return i.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===33777)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===33778)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===33779)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null}else if(i=t.get(`WEBGL_compressed_texture_s3tc`),i!==null){if(n===33776)return i.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===33777)return i.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===33778)return i.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===33779)return i.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null}if(n===35840||n===35841||n===35842||n===35843){if(i=t.get(`WEBGL_compressed_texture_pvrtc`),i!==null){if(n===35840)return i.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===35841)return i.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===35842)return i.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===35843)return i.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null}if(n===36196||n===37492||n===37496||n===37488||n===37489||n===37490||n===37491){if(i=t.get(`WEBGL_compressed_texture_etc`),i!==null){if(n===36196||n===37492)return a===`srgb`?i.COMPRESSED_SRGB8_ETC2:i.COMPRESSED_RGB8_ETC2;if(n===37496)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:i.COMPRESSED_RGBA8_ETC2_EAC;if(n===37488)return i.COMPRESSED_R11_EAC;if(n===37489)return i.COMPRESSED_SIGNED_R11_EAC;if(n===37490)return i.COMPRESSED_RG11_EAC;if(n===37491)return i.COMPRESSED_SIGNED_RG11_EAC}else return null}if(n===37808||n===37809||n===37810||n===37811||n===37812||n===37813||n===37814||n===37815||n===37816||n===37817||n===37818||n===37819||n===37820||n===37821){if(i=t.get(`WEBGL_compressed_texture_astc`),i!==null){if(n===37808)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:i.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===37809)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:i.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===37810)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:i.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===37811)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:i.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===37812)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:i.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===37813)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:i.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===37814)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:i.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===37815)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:i.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===37816)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:i.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===37817)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:i.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===37818)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:i.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===37819)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:i.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===37820)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:i.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===37821)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:i.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null}if(n===36492||n===36494||n===36495){if(i=t.get(`EXT_texture_compression_bptc`),i!==null){if(n===36492)return a===`srgb`?i.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:i.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===36494)return i.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===36495)return i.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null}if(n===36283||n===36284||n===36285||n===36286){if(i=t.get(`EXT_texture_compression_rgtc`),i!==null){if(n===36283)return i.COMPRESSED_RED_RGTC1_EXT;if(n===36284)return i.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===36285)return i.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===36286)return i.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null}return n===1020?e.UNSIGNED_INT_24_8:e[n]===void 0?null:e[n]}return{convert:n}}var yl=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,bl=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,xl=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let n=new ta(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new pa({vertexShader:yl,fragmentShader:bl,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new wi(new ra(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},Sl=class extends Kt{constructor(e,t){super();let n=this,r=null,i=1,a=null,o=`local-floor`,s=1,c=null,l=null,u=null,d=null,f=null,p=null,m=typeof XRWebGLBinding<`u`,h=new xl,g={},_=t.getContextAttributes(),v=null,y=null,b=[],x=[],S=new q,C=null,w=null,T=new Ua;T.viewport=new yn;let E=new Ua;E.viewport=new yn;let D=[T,E],O=new Ja,k=null,A=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(e){let t=b[e];return t===void 0&&(t=new er,b[e]=t),t.getTargetRaySpace()},this.getControllerGrip=function(e){let t=b[e];return t===void 0&&(t=new er,b[e]=t),t.getGripSpace()},this.getHand=function(e){let t=b[e];return t===void 0&&(t=new er,b[e]=t),t.getHandSpace()};function j(e){let t=x.indexOf(e.inputSource);if(t===-1)return;let n=b[t];n!==void 0&&(n.update(e.inputSource,e.frame,c||a),n.dispatchEvent({type:e.type,data:e.inputSource}))}function ee(){r.removeEventListener(`select`,j),r.removeEventListener(`selectstart`,j),r.removeEventListener(`selectend`,j),r.removeEventListener(`squeeze`,j),r.removeEventListener(`squeezestart`,j),r.removeEventListener(`squeezeend`,j),r.removeEventListener(`end`,ee),r.removeEventListener(`inputsourceschange`,M);for(let e=0;e<b.length;e++){let t=x[e];t!==null&&(x[e]=null,b[e].disconnect(t))}k=null,A=null,h.reset();for(let e in g)delete g[e];if(e.setRenderTarget(v),f=null,d=null,u=null,r=null,y=null,F.stop(),n.isPresenting=!1,e.setPixelRatio(C),e.setSize(S.width,S.height,!1),w!==null){let e=w.camera;e.fov=w.fov,e.zoom=w.zoom,e.updateProjectionMatrix(),w=null}n.dispatchEvent({type:`sessionend`})}this.setFramebufferScaleFactor=function(e){i=e,n.isPresenting===!0&&W(`WebXRManager: Cannot change framebuffer scale while presenting.`)},this.setReferenceSpaceType=function(e){o=e,n.isPresenting===!0&&W(`WebXRManager: Cannot change reference space type while presenting.`)},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(e){c=e},this.getBaseLayer=function(){return d===null?f:d},this.getBinding=function(){return u===null&&m&&(u=new XRWebGLBinding(r,t)),u},this.getFrame=function(){return p},this.getSession=function(){return r},this.setSession=async function(l){if(r=l,r!==null){if(v=e.getRenderTarget(),r.addEventListener(`select`,j),r.addEventListener(`selectstart`,j),r.addEventListener(`selectend`,j),r.addEventListener(`squeeze`,j),r.addEventListener(`squeezestart`,j),r.addEventListener(`squeezeend`,j),r.addEventListener(`end`,ee),r.addEventListener(`inputsourceschange`,M),_.xrCompatible!==!0&&await t.makeXRCompatible(),C=e.getPixelRatio(),e.getSize(S),m&&`createProjectionLayer`in XRWebGLBinding.prototype){let n=null,a=null,o=null;_.depth&&(o=_.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,n=_.stencil?Ne:Me,a=_.stencil?Oe:we);let s={colorFormat:t.RGBA8,depthFormat:o,scaleFactor:i};u=this.getBinding(),d=u.createProjectionLayer(s),r.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),y=new xn(d.textureWidth,d.textureHeight,{format:je,type:B,depthTexture:new $i(d.textureWidth,d.textureHeight,a,void 0,void 0,void 0,void 0,void 0,void 0,n),stencilBuffer:_.stencil,colorSpace:e.outputColorSpace,samples:_.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1,storeMultisampledDepthBuffer:d.ignoreDepthValues===!1,storeMultisampledStencilBuffer:d.ignoreDepthValues===!1})}else{let n={antialias:_.antialias,alpha:!0,depth:_.depth,stencil:_.stencil,framebufferScaleFactor:i};f=new XRWebGLLayer(r,t,n),r.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),y=new xn(f.framebufferWidth,f.framebufferHeight,{format:je,type:B,colorSpace:e.outputColorSpace,stencilBuffer:_.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1,storeMultisampledDepthBuffer:f.ignoreDepthValues===!1,storeMultisampledStencilBuffer:f.ignoreDepthValues===!1})}y.isXRRenderTarget=!0,this.setFoveation(s),c=null,a=await r.requestReferenceSpace(o),F.setContext(r),F.start(),n.isPresenting=!0,n.dispatchEvent({type:`sessionstart`})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return h.getDepthTexture()};function M(e){for(let t=0;t<e.removed.length;t++){let n=e.removed[t],r=x.indexOf(n);r>=0&&(x[r]=null,b[r].disconnect(n))}for(let t=0;t<e.added.length;t++){let n=e.added[t],r=x.indexOf(n);if(r===-1){for(let e=0;e<b.length;e++)if(e>=x.length){x.push(n),r=e;break}else if(x[e]===null){x[e]=n,r=e;break}if(r===-1)break}let i=b[r];i&&i.connect(n)}}let te=new J,ne=new J;function N(e,t,n){te.setFromMatrixPosition(t.matrixWorld),ne.setFromMatrixPosition(n.matrixWorld);let r=te.distanceTo(ne),i=t.projectionMatrix.elements,a=n.projectionMatrix.elements,o=i[14]/(i[10]-1),s=i[14]/(i[10]+1),c=(i[9]+1)/i[5],l=(i[9]-1)/i[5],u=(i[8]-1)/i[0],d=(a[8]+1)/a[0],f=o*u,p=o*d,m=r/(-u+d),h=m*-u;if(t.matrixWorld.decompose(e.position,e.quaternion,e.scale),e.translateX(h),e.translateZ(m),e.matrixWorld.compose(e.position,e.quaternion,e.scale),e.matrixWorldInverse.copy(e.matrixWorld).invert(),i[10]===-1)e.projectionMatrix.copy(t.projectionMatrix),e.projectionMatrixInverse.copy(t.projectionMatrixInverse);else{let t=o+m,n=s+m,i=f-h,a=p+(r-h),u=c*s/n*t,d=l*s/n*t;e.projectionMatrix.makePerspective(i,a,u,d,t,n),e.projectionMatrixInverse.copy(e.projectionMatrix).invert()}}function re(e,t){t===null?e.matrixWorld.copy(e.matrix):e.matrixWorld.multiplyMatrices(t.matrixWorld,e.matrix),e.matrixWorldInverse.copy(e.matrixWorld).invert()}this.updateCamera=function(e){if(r===null)return;let t=e.near,n=e.far;h.texture!==null&&(h.depthNear>0&&(t=h.depthNear),h.depthFar>0&&(n=h.depthFar)),O.near=E.near=T.near=t,O.far=E.far=T.far=n,(k!==O.near||A!==O.far)&&(r.updateRenderState({depthNear:O.near,depthFar:O.far}),k=O.near,A=O.far),O.layers.mask=e.layers.mask|6,T.layers.mask=O.layers.mask&-5,E.layers.mask=O.layers.mask&-3;let i=e.parent,a=O.cameras;re(O,i);for(let e=0;e<a.length;e++)re(a[e],i);a.length===2?N(O,T,E):O.projectionMatrix.copy(T.projectionMatrix),w===null&&e.isPerspectiveCamera&&(w={camera:e,fov:e.fov,zoom:e.zoom}),P(e,O,i)};function P(e,t,n){n===null?e.matrix.copy(t.matrixWorld):(e.matrix.copy(n.matrixWorld),e.matrix.invert(),e.matrix.multiply(t.matrixWorld)),e.matrix.decompose(e.position,e.quaternion,e.scale),e.updateMatrixWorld(!0),e.projectionMatrix.copy(t.projectionMatrix),e.projectionMatrixInverse.copy(t.projectionMatrixInverse),e.isPerspectiveCamera&&(e.fov=Yt*2*Math.atan(1/e.projectionMatrix.elements[5]),e.zoom=1)}this.getCamera=function(){return O},this.getFoveation=function(){if(d!==null||f!==null)return s},this.setFoveation=function(e){s=e,d!==null&&(d.fixedFoveation=e),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=e)},this.hasDepthSensing=function(){return h.texture!==null},this.getDepthSensingMesh=function(){return h.getMesh(O)},this.getCameraTexture=function(e){return g[e]};let ie=null;function ae(t,i){if(l=i.getViewerPose(c||a),p=i,l!==null){let t=l.views;f!==null&&(e.setRenderTargetFramebuffer(y,f.framebuffer),e.setRenderTarget(y));let i=!1;t.length!==O.cameras.length&&(O.cameras.length=0,i=!0);for(let n=0;n<t.length;n++){let r=t[n],a=null;if(f!==null)a=f.getViewport(r);else{let t=u.getViewSubImage(d,r);a=t.viewport,n===0&&(e.setRenderTargetTextures(y,t.colorTexture,t.depthStencilTexture),e.setRenderTarget(y))}let o=D[n];o===void 0&&(o=new Ua,o.layers.enable(n),o.viewport=new yn,D[n]=o),o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.quaternion,o.scale),o.projectionMatrix.fromArray(r.projectionMatrix),o.projectionMatrixInverse.copy(o.projectionMatrix).invert(),o.viewport.set(a.x,a.y,a.width,a.height),n===0&&(O.matrix.copy(o.matrix),O.matrix.decompose(O.position,O.quaternion,O.scale)),i===!0&&O.cameras.push(o)}let a=r.enabledFeatures;if(a&&a.includes(`depth-sensing`)&&r.depthUsage==`gpu-optimized`&&m){u=n.getBinding();let e=u.getDepthInformation(t[0]);e&&e.isValid&&e.texture&&h.init(e,r.renderState)}if(a&&a.includes(`camera-access`)&&m){e.state.unbindTexture(),u=n.getBinding();for(let e=0;e<t.length;e++){let n=t[e].camera;if(n){let e=g[n];e||(e=new ta,g[n]=e);let t=u.getCameraImage(n);e.sourceTexture=t}}}}for(let e=0;e<b.length;e++){let t=x[e],n=b[e];t!==null&&n!==void 0&&n.update(t,i,c||a)}ie&&ie(t,i),i.detectedPlanes&&n.dispatchEvent({type:`planesdetected`,data:i}),p=null}let F=new mo;F.setAnimationLoop(ae),this.setAnimationLoop=function(e){ie=e},this.dispose=function(){}}},Cl=new wn,wl=new Y;wl.set(-1,0,0,0,1,0,0,0,1);function Tl(e,t){function n(e,t){e.matrixAutoUpdate===!0&&e.updateMatrix(),t.value.copy(e.matrix)}function r(t,n){n.color.getRGB(t.fogColor.value,la(e)),n.isFog?(t.fogNear.value=n.near,t.fogFar.value=n.far):n.isFogExp2&&(t.fogDensity.value=n.density)}function i(e,t,n,r,i){t.isNodeMaterial?t.uniformsNeedUpdate=!1:t.isMeshBasicMaterial?a(e,t):t.isMeshLambertMaterial?(a(e,t),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)):t.isMeshToonMaterial?(a(e,t),d(e,t)):t.isMeshPhongMaterial?(a(e,t),u(e,t),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)):t.isMeshStandardMaterial?(a(e,t),f(e,t),t.isMeshPhysicalMaterial&&p(e,t,i)):t.isMeshMatcapMaterial?(a(e,t),m(e,t)):t.isMeshDepthMaterial?a(e,t):t.isMeshDistanceMaterial?(a(e,t),h(e,t)):t.isMeshNormalMaterial?a(e,t):t.isLineBasicMaterial?(o(e,t),t.isLineDashedMaterial&&s(e,t)):t.isPointsMaterial?c(e,t,n,r):t.isSpriteMaterial?l(e,t):t.isShadowMaterial?(e.color.value.copy(t.color),e.opacity.value=t.opacity):t.isShaderMaterial&&(t.uniformsNeedUpdate=!1)}function a(e,r){e.opacity.value=r.opacity,r.color&&e.diffuse.value.copy(r.color),r.emissive&&e.emissive.value.copy(r.emissive).multiplyScalar(r.emissiveIntensity),r.map&&(e.map.value=r.map,n(r.map,e.mapTransform)),r.alphaMap&&(e.alphaMap.value=r.alphaMap,n(r.alphaMap,e.alphaMapTransform)),r.bumpMap&&(e.bumpMap.value=r.bumpMap,n(r.bumpMap,e.bumpMapTransform),e.bumpScale.value=r.bumpScale,r.side===1&&(e.bumpScale.value*=-1)),r.normalMap&&(e.normalMap.value=r.normalMap,n(r.normalMap,e.normalMapTransform),e.normalScale.value.copy(r.normalScale),r.side===1&&e.normalScale.value.negate()),r.displacementMap&&(e.displacementMap.value=r.displacementMap,n(r.displacementMap,e.displacementMapTransform),e.displacementScale.value=r.displacementScale,e.displacementBias.value=r.displacementBias),r.emissiveMap&&(e.emissiveMap.value=r.emissiveMap,n(r.emissiveMap,e.emissiveMapTransform)),r.specularMap&&(e.specularMap.value=r.specularMap,n(r.specularMap,e.specularMapTransform)),r.alphaTest>0&&(e.alphaTest.value=r.alphaTest);let i=t.get(r),a=i.envMap,o=i.envMapRotation;a&&(e.envMap.value=a,e.envMapRotation.value.setFromMatrix4(Cl.makeRotationFromEuler(o)).transpose(),a.isCubeTexture&&a.isRenderTargetTexture===!1&&e.envMapRotation.value.premultiply(wl),e.reflectivity.value=r.reflectivity,e.ior.value=r.ior,e.refractionRatio.value=r.refractionRatio),r.lightMap&&(e.lightMap.value=r.lightMap,e.lightMapIntensity.value=r.lightMapIntensity,n(r.lightMap,e.lightMapTransform)),r.aoMap&&(e.aoMap.value=r.aoMap,e.aoMapIntensity.value=r.aoMapIntensity,n(r.aoMap,e.aoMapTransform))}function o(e,t){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,t.map&&(e.map.value=t.map,n(t.map,e.mapTransform))}function s(e,t){e.dashSize.value=t.dashSize,e.totalSize.value=t.dashSize+t.gapSize,e.scale.value=t.scale}function c(e,t,r,i){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,e.size.value=t.size*r,e.scale.value=i*.5,t.map&&(e.map.value=t.map,n(t.map,e.uvTransform)),t.alphaMap&&(e.alphaMap.value=t.alphaMap,n(t.alphaMap,e.alphaMapTransform)),t.alphaTest>0&&(e.alphaTest.value=t.alphaTest)}function l(e,t){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,e.rotation.value=t.rotation,t.map&&(e.map.value=t.map,n(t.map,e.mapTransform)),t.alphaMap&&(e.alphaMap.value=t.alphaMap,n(t.alphaMap,e.alphaMapTransform)),t.alphaTest>0&&(e.alphaTest.value=t.alphaTest)}function u(e,t){e.specular.value.copy(t.specular),e.shininess.value=Math.max(t.shininess,1e-4)}function d(e,t){t.gradientMap&&(e.gradientMap.value=t.gradientMap)}function f(e,t){e.metalness.value=t.metalness,t.metalnessMap&&(e.metalnessMap.value=t.metalnessMap,n(t.metalnessMap,e.metalnessMapTransform)),e.roughness.value=t.roughness,t.roughnessMap&&(e.roughnessMap.value=t.roughnessMap,n(t.roughnessMap,e.roughnessMapTransform)),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)}function p(e,t,r){e.ior.value=t.ior,t.sheen>0&&(e.sheenColor.value.copy(t.sheenColor).multiplyScalar(t.sheen),e.sheenRoughness.value=t.sheenRoughness,t.sheenColorMap&&(e.sheenColorMap.value=t.sheenColorMap,n(t.sheenColorMap,e.sheenColorMapTransform)),t.sheenRoughnessMap&&(e.sheenRoughnessMap.value=t.sheenRoughnessMap,n(t.sheenRoughnessMap,e.sheenRoughnessMapTransform))),t.clearcoat>0&&(e.clearcoat.value=t.clearcoat,e.clearcoatRoughness.value=t.clearcoatRoughness,t.clearcoatMap&&(e.clearcoatMap.value=t.clearcoatMap,n(t.clearcoatMap,e.clearcoatMapTransform)),t.clearcoatRoughnessMap&&(e.clearcoatRoughnessMap.value=t.clearcoatRoughnessMap,n(t.clearcoatRoughnessMap,e.clearcoatRoughnessMapTransform)),t.clearcoatNormalMap&&(e.clearcoatNormalMap.value=t.clearcoatNormalMap,n(t.clearcoatNormalMap,e.clearcoatNormalMapTransform),e.clearcoatNormalScale.value.copy(t.clearcoatNormalScale),t.side===1&&e.clearcoatNormalScale.value.negate())),t.dispersion>0&&(e.dispersion.value=t.dispersion),t.retroreflectivity>0&&(e.retroreflectivity.value=t.retroreflectivity),t.iridescence>0&&(e.iridescence.value=t.iridescence,e.iridescenceIOR.value=t.iridescenceIOR,e.iridescenceThicknessMinimum.value=t.iridescenceThicknessRange[0],e.iridescenceThicknessMaximum.value=t.iridescenceThicknessRange[1],t.iridescenceMap&&(e.iridescenceMap.value=t.iridescenceMap,n(t.iridescenceMap,e.iridescenceMapTransform)),t.iridescenceThicknessMap&&(e.iridescenceThicknessMap.value=t.iridescenceThicknessMap,n(t.iridescenceThicknessMap,e.iridescenceThicknessMapTransform))),t.transmission>0&&(e.transmission.value=t.transmission,e.transmissionSamplerMap.value=r.texture,e.transmissionSamplerSize.value.set(r.width,r.height),t.transmissionMap&&(e.transmissionMap.value=t.transmissionMap,n(t.transmissionMap,e.transmissionMapTransform)),e.thickness.value=t.thickness,t.thicknessMap&&(e.thicknessMap.value=t.thicknessMap,n(t.thicknessMap,e.thicknessMapTransform)),e.attenuationDistance.value=t.attenuationDistance,e.attenuationColor.value.copy(t.attenuationColor)),t.anisotropy>0&&(e.anisotropyVector.value.set(t.anisotropy*Math.cos(t.anisotropyRotation),t.anisotropy*Math.sin(t.anisotropyRotation)),t.anisotropyMap&&(e.anisotropyMap.value=t.anisotropyMap,n(t.anisotropyMap,e.anisotropyMapTransform))),e.specularIntensity.value=t.specularIntensity,e.specularColor.value.copy(t.specularColor),t.specularColorMap&&(e.specularColorMap.value=t.specularColorMap,n(t.specularColorMap,e.specularColorMapTransform)),t.specularIntensityMap&&(e.specularIntensityMap.value=t.specularIntensityMap,n(t.specularIntensityMap,e.specularIntensityMapTransform))}function m(e,t){t.matcap&&(e.matcap.value=t.matcap)}function h(e,n){let r=t.get(n).light;e.referencePosition.value.setFromMatrixPosition(r.matrixWorld),e.nearDistance.value=r.shadow.camera.near,e.farDistance.value=r.shadow.camera.far}return{refreshFogUniforms:r,refreshMaterialUniforms:i}}function El(e,t,n,r){let i={},a={},o=[],s=e.getParameter(e.MAX_UNIFORM_BUFFER_BINDINGS);function c(e,t){let n=t.program;r.uniformBlockBinding(e,n)}function l(e,n){let o=i[e.id];o===void 0&&(g(e),o=u(e),i[e.id]=o,e.addEventListener(`dispose`,v));let s=n.program;r.updateUBOMapping(e,s);let c=t.render.frame;a[e.id]!==c&&(f(e),a[e.id]=c)}function u(t){let n=d();t.__bindingPointIndex=n;let r=e.createBuffer(),i=t.__size,a=t.usage;return e.bindBuffer(e.UNIFORM_BUFFER,r),e.bufferData(e.UNIFORM_BUFFER,i,a),e.bindBuffer(e.UNIFORM_BUFFER,null),e.bindBufferBase(e.UNIFORM_BUFFER,n,r),r}function d(){for(let e=0;e<s;e++)if(o.indexOf(e)===-1)return o.push(e),e;return G(`WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached.`),0}function f(t){let n=i[t.id],r=t.uniforms,a=t.__cache;e.bindBuffer(e.UNIFORM_BUFFER,n);for(let e=0,t=r.length;e<t;e++){let t=r[e];if(Array.isArray(t))for(let n=0,r=t.length;n<r;n++)p(t[n],e,n,a);else p(t,e,0,a)}e.bindBuffer(e.UNIFORM_BUFFER,null)}function p(t,n,r,i){if(h(t,n,r,i)===!0){let n=t.__offset,r=t.value;if(Array.isArray(r)){let e=0;for(let n=0;n<r.length;n++){let i=r[n],a=_(i);m(i,t.__data,e),typeof i!=`number`&&typeof i!=`boolean`&&!i.isMatrix3&&!ArrayBuffer.isView(i)&&(e+=a.storage/Float32Array.BYTES_PER_ELEMENT)}}else m(r,t.__data,0);e.bufferSubData(e.UNIFORM_BUFFER,n,t.__data)}}function m(e,t,n){typeof e==`number`||typeof e==`boolean`?t[0]=e:e.isMatrix3?(t[0]=e.elements[0],t[1]=e.elements[1],t[2]=e.elements[2],t[3]=0,t[4]=e.elements[3],t[5]=e.elements[4],t[6]=e.elements[5],t[7]=0,t[8]=e.elements[6],t[9]=e.elements[7],t[10]=e.elements[8],t[11]=0):ArrayBuffer.isView(e)?t.set(new e.constructor(e.buffer,e.byteOffset,t.length)):e.toArray(t,n)}function h(e,t,n,r){let i=e.value,a=t+`_`+n;if(r[a]===void 0)return r[a]=typeof i==`number`||typeof i==`boolean`?i:ArrayBuffer.isView(i)?i.slice():i.clone(),!0;{let e=r[a];if(typeof i==`number`||typeof i==`boolean`){if(e!==i)return r[a]=i,!0}else if(ArrayBuffer.isView(i))return!0;else if(e.equals(i)===!1)return e.copy(i),!0}return!1}function g(e){let t=e.uniforms,n=0;for(let e=0,r=t.length;e<r;e++){let r=Array.isArray(t[e])?t[e]:[t[e]];for(let e=0,t=r.length;e<t;e++){let t=r[e],i=Array.isArray(t.value)?t.value:[t.value];for(let e=0,r=i.length;e<r;e++){let r=i[e],a=_(r),o=n%16,s=o%a.boundary,c=o+s;n+=s,c!==0&&16-c<a.storage&&(n+=16-c),t.__data=new Float32Array(a.storage/Float32Array.BYTES_PER_ELEMENT),t.__offset=n,n+=a.storage}}}let r=n%16;return r>0&&(n+=16-r),e.__size=n,e.__cache={},this}function _(e){let t={boundary:0,storage:0};return typeof e==`number`||typeof e==`boolean`?(t.boundary=4,t.storage=4):e.isVector2?(t.boundary=8,t.storage=8):e.isVector3||e.isColor?(t.boundary=16,t.storage=12):e.isVector4?(t.boundary=16,t.storage=16):e.isMatrix3?(t.boundary=48,t.storage=48):e.isMatrix4?(t.boundary=64,t.storage=64):e.isTexture?W(`WebGLRenderer: Texture samplers can not be part of an uniforms group.`):ArrayBuffer.isView(e)?(t.boundary=16,t.storage=e.byteLength):W(`WebGLRenderer: Unsupported uniform value type.`,e),t}function v(t){let n=t.target;n.removeEventListener(`dispose`,v);let r=o.indexOf(n.__bindingPointIndex);o.splice(r,1),e.deleteBuffer(i[n.id]),delete i[n.id],delete a[n.id]}function y(){for(let t in i)e.deleteBuffer(i[t]);o=[],i={},a={}}return{bind:c,update:l,dispose:y}}var Dl=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),Ol=null;function kl(){return Ol===null&&(Ol=new Di(Dl,16,16,Ie,Te),Ol.name=`DFG_LUT`,Ol.minFilter=ve,Ol.magFilter=ve,Ol.wrapS=L,Ol.wrapT=L,Ol.generateMipmaps=!1,Ol.needsUpdate=!0),Ol}var Al=class{constructor(e={}){let{canvas:t=zt(),context:n=null,depth:r=!0,stencil:i=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:s=!0,preserveDrawingBuffer:c=!1,powerPreference:l=`default`,failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:d=!1,outputBufferType:f=B}=e;this.isWebGLRenderer=!0;let p;if(n!==null){if(typeof WebGLRenderingContext<`u`&&n instanceof WebGLRenderingContext)throw Error(`THREE.WebGLRenderer: WebGL 1 is not supported since r163.`);p=n.getContextAttributes().alpha}else p=a;let m=f,h=new Set([Re,Le,Fe]),g=new Set([B,we,Se,Oe,Ee,De]),_=new Uint32Array(4),v=new Int32Array(4),y=new J,b=null,x=null,S=[],C=[],w=null;this.domElement=t,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=0,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let T=this,E=!1,D=null,O=null,k=null,A=null;this._outputColorSpace=kt;let j=0,ee=0,M=null,te=-1,ne=null,N=new yn,re=new yn,P=null,ie=new Z(0),ae=0,F=t.width,oe=t.height,I=1,se=null,ce=null,le=new yn(0,0,F,oe),ue=new yn(0,0,F,oe),de=!1,fe=new ji,pe=!1,me=!1,L=new wn,he=new J,R=new yn,ge={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},_e=!1;function ve(){return M===null?I:1}let z=n;function be(e,n){return t.getContext(e,n)}let xe,Ce,V,ke,H,U,Ae,je,Me,Ne,Pe,Ie,ze,Be,Ve,He,Ue,We,Ge,Ke,qe,Je,Ye;try{let e={alpha:!0,depth:r,stencil:i,antialias:o,premultipliedAlpha:s,preserveDrawingBuffer:c,powerPreference:l,failIfMajorPerformanceCaveat:u};if(`setAttribute`in t&&t.setAttribute(`data-engine`,`three.js r186`),t.addEventListener(`webglcontextlost`,Qe,!1),t.addEventListener(`webglcontextrestored`,$e,!1),t.addEventListener(`webglcontextcreationerror`,et,!1),z===null){let t=`webgl2`;if(z=be(t,e),z===null)throw be(t)?Error(`THREE.WebGLRenderer: Error creating WebGL context with your selected attributes.`):Error(`THREE.WebGLRenderer: Error creating WebGL context.`)}Xe()}catch(e){throw t.removeEventListener(`webglcontextlost`,Qe,!1),t.removeEventListener(`webglcontextrestored`,$e,!1),t.removeEventListener(`webglcontextcreationerror`,et,!1),G(`WebGLRenderer: `+e.message),e}function Xe(){xe=new Jo(z),xe.init(),qe=new vl(z,xe),Ce=new Co(z,xe,e,qe),V=new gl(z,xe),Ce.reversedDepthBuffer&&d&&V.buffers.depth.setReversed(!0),O=z.createFramebuffer(),k=z.createFramebuffer(),A=z.createFramebuffer(),ke=new Zo(z),H=new Xc,U=new _l(z,xe,V,H,Ce,qe,ke),Ae=new qo(T),je=new ho(z),Je=new xo(z,je),Me=new Yo(z,je,ke,Je),Ne=new $o(z,Me,je,Je,ke),We=new Qo(z,Ce,U),Ve=new wo(H),Pe=new Yc(T,Ae,xe,Ce,Je,Ve),Ie=new Tl(T,H),ze=new el,Be=new sl(xe),Ue=new bo(T,Ae,V,Ne,p,s),He=new hl(T,Ne,Ce),Ye=new El(z,ke,Ce,V),Ge=new So(z,xe,ke),Ke=new Xo(z,xe,ke),ke.programs=Pe.programs,T.capabilities=Ce,T.extensions=xe,T.properties=H,T.renderLists=ze,T.shadowMap=He,T.state=V,T.info=ke}m!==1009&&(w=new ts(m,t.width,t.height,o,r,i));let Ze=new Sl(T,z);this.xr=Ze,this.getContext=function(){return z},this.getContextAttributes=function(){return z.getContextAttributes()},this.forceContextLoss=function(){let e=xe.get(`WEBGL_lose_context`);e&&e.loseContext()},this.forceContextRestore=function(){let e=xe.get(`WEBGL_lose_context`);e&&e.restoreContext()},this.getPixelRatio=function(){return I},this.setPixelRatio=function(e){e!==void 0&&(I=e,this.setSize(F,oe,!1))},this.getSize=function(e){return e.set(F,oe)},this.setSize=function(e,n,r=!0){Ze.isPresenting?W(`WebGLRenderer: Can't change size while VR device is presenting.`):(F=e,oe=n,t.width=Math.floor(e*I),t.height=Math.floor(n*I),r===!0&&(t.style.width=e+`px`,t.style.height=n+`px`),w!==null&&w.setSize(t.width,t.height),this.setViewport(0,0,e,n))},this.getDrawingBufferSize=function(e){return e.set(F*I,oe*I).floor()},this.setDrawingBufferSize=function(e,n,r){F=e,oe=n,I=r,t.width=Math.floor(e*r),t.height=Math.floor(n*r),this.setViewport(0,0,e,n)},this.setEffects=function(e){if(m===1009)G(`WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.`);else{if(e){for(let t=0;t<e.length;t++)if(e[t].isOutputPass===!0){W(`WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.`);break}}w.setEffects(e||[])}},this.getCurrentViewport=function(e){return e.copy(N)},this.getViewport=function(e){return e.copy(le)},this.setViewport=function(e,t,n,r){e.isVector4?le.set(e.x,e.y,e.z,e.w):le.set(e,t,n,r),V.viewport(N.copy(le).multiplyScalar(I).round())},this.getScissor=function(e){return e.copy(ue)},this.setScissor=function(e,t,n,r){e.isVector4?ue.set(e.x,e.y,e.z,e.w):ue.set(e,t,n,r),V.scissor(re.copy(ue).multiplyScalar(I).round())},this.getScissorTest=function(){return de},this.setScissorTest=function(e){V.setScissorTest(de=e)},this.setOpaqueSort=function(e){se=e},this.setTransparentSort=function(e){ce=e},this.getClearColor=function(e){return e.copy(Ue.getClearColor())},this.setClearColor=function(){Ue.setClearColor(...arguments)},this.getClearAlpha=function(){return Ue.getClearAlpha()},this.setClearAlpha=function(){Ue.setClearAlpha(...arguments)},this.clear=function(e=!0,t=!0,n=!0){let r=0;if(e){let e=!1;if(M!==null){let t=M.texture.format;e=h.has(t)}if(e){let e=M.texture.type,t=g.has(e),n=Ue.getClearColor(),r=Ue.getClearAlpha(),i=n.r,a=n.g,o=n.b;t?(_[0]=i,_[1]=a,_[2]=o,_[3]=r,z.clearBufferuiv(z.COLOR,0,_)):(v[0]=i,v[1]=a,v[2]=o,v[3]=r,z.clearBufferiv(z.COLOR,0,v))}else r|=z.COLOR_BUFFER_BIT}t&&(r|=z.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),n&&(r|=z.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),r!==0&&z.clear(r)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(e){e.setRenderer(this),D=e},this.dispose=function(){t.removeEventListener(`webglcontextlost`,Qe,!1),t.removeEventListener(`webglcontextrestored`,$e,!1),t.removeEventListener(`webglcontextcreationerror`,et,!1),Ue.dispose(),ze.dispose(),Be.dispose(),H.dispose(),Ae.dispose(),Ne.dispose(),Je.dispose(),Ye.dispose(),Pe.dispose(),Ze.dispose(),Ze.removeEventListener(`sessionstart`,st),Ze.removeEventListener(`sessionend`,ct),lt.stop()};function Qe(e){e.preventDefault(),Vt(`WebGLRenderer: Context Lost.`),E=!0}function $e(){Vt(`WebGLRenderer: Context Restored.`),E=!1;let e=ke.autoReset,t=He.enabled,n=He.autoUpdate,r=He.needsUpdate,i=He.type;Xe(),ke.autoReset=e,He.enabled=t,He.autoUpdate=n,He.needsUpdate=r,He.type=i}function et(e){G(`WebGLRenderer: A WebGL context could not be created. Reason: `,e.statusMessage)}function tt(e){let t=e.target;t.removeEventListener(`dispose`,tt),nt(t)}function nt(e){rt(e),H.remove(e)}function rt(e){let t=H.get(e).programs;t!==void 0&&(t.forEach(function(e){Pe.releaseProgram(e)}),e.isShaderMaterial&&Pe.releaseShaderCache(e))}this.renderBufferDirect=function(e,t,n,r,i,a){t===null&&(t=ge);let o=i.isMesh&&i.matrixWorld.determinantAffine()<0,s=yt(e,t,n,r,i);V.setMaterial(r,o);let c=n.index,l=1;if(r.wireframe===!0){if(c=Me.getWireframeAttribute(n),c===void 0)return;l=2}let u=n.drawRange,d=n.attributes.position,f=u.start*l,p=(u.start+u.count)*l;a!==null&&(f=Math.max(f,a.start*l),p=Math.min(p,(a.start+a.count)*l)),c===null?d!=null&&(f=Math.max(f,0),p=Math.min(p,d.count)):(f=Math.max(f,0),p=Math.min(p,c.count));let m=p-f;if(m<0||m===1/0)return;Je.setup(i,r,s,n,c);let h,g=Ge;if(c!==null&&(h=je.get(c),g=Ke,g.setIndex(h)),i.isMesh)r.wireframe===!0?(V.setLineWidth(r.wireframeLinewidth*ve()),g.setMode(z.LINES)):g.setMode(z.TRIANGLES);else if(i.isLine){let e=r.linewidth;e===void 0&&(e=1),V.setLineWidth(e*ve()),i.isLineSegments?g.setMode(z.LINES):i.isLineLoop?g.setMode(z.LINE_LOOP):g.setMode(z.LINE_STRIP)}else i.isPoints?g.setMode(z.POINTS):i.isSprite&&g.setMode(z.TRIANGLES);if(i.isBatchedMesh){if(xe.get(`WEBGL_multi_draw`))g.renderMultiDraw(i._multiDrawStarts,i._multiDrawCounts,i._multiDrawCount);else{let e=i._multiDrawStarts,t=i._multiDrawCounts,n=i._multiDrawCount,a=c?je.get(c).bytesPerElement:1,o=H.get(r).currentProgram.getUniforms();for(let r=0;r<n;r++)o.setValue(z,`_gl_DrawID`,r),g.render(e[r]/a,t[r])}}else if(i.isInstancedMesh)g.renderInstances(f,m,i.count);else if(n.isInstancedBufferGeometry){let e=n._maxInstanceCount===void 0?1/0:n._maxInstanceCount,t=Math.min(n.instanceCount,e);g.renderInstances(f,m,t)}else g.render(f,m)};function it(e,t,n,r){D!==null&&e.isNodeMaterial&&D.setObject(r,e),pe===!0&&Ve.setState(e,n,!1),e.transparent===!0&&e.side===2&&e.forceSinglePass===!1?(e.side=1,e.needsUpdate=!0,ht(e,t,r),e.side=0,e.needsUpdate=!0,ht(e,t,r),e.side=2):ht(e,t,r)}this.compile=function(e,t,n=null){n===null&&(n=e),D!==null&&D.renderStart(e,t,n),x=Be.get(n),x.init(t),C.push(x),n.traverseVisible(function(e){e.isLight&&e.layers.test(t.layers)&&(x.pushLight(e),e.castShadow&&x.pushShadow(e))}),e!==n&&e.traverseVisible(function(e){e.isLight&&e.layers.test(t.layers)&&(x.pushLight(e),e.castShadow&&x.pushShadow(e))}),x.setupLights(),D!==null&&D.updateLights(x.state.lightsArray),me=this.localClippingEnabled,pe=Ve.init(this.clippingPlanes,me),pe===!0&&Ve.setGlobalState(this.clippingPlanes,t),D!==null&&He.render(x.state.shadowsArray,n,t);let r=new Set;return e.traverse(function(e){if(!(e.isMesh||e.isPoints||e.isLine||e.isSprite))return;let i=e.material;if(i){if(Array.isArray(i))for(let a=0;a<i.length;a++){let o=i[a];it(o,n,t,e),r.add(o)}else it(i,n,t,e),r.add(i)}}),x=C.pop(),D!==null&&D.renderEnd(),r},this.compileAsync=function(e,t,n=null){let r=this.compile(e,t,n);return new Promise(t=>{function n(){r.forEach(function(e){let t=H.get(e).currentProgram;(t===void 0||t.isReady())&&r.delete(e)}),r.size===0?t(e):setTimeout(n,10)}xe.get(`KHR_parallel_shader_compile`)===null?setTimeout(n,10):n()})};let at=null;function ot(e){at&&at(e)}function st(){lt.stop()}function ct(){lt.start()}let lt=new mo;lt.setAnimationLoop(ot),typeof self<`u`&&lt.setContext(self),this.setAnimationLoop=function(e){at=e,Ze.setAnimationLoop(e),e===null?lt.stop():lt.start()},Ze.addEventListener(`sessionstart`,st),Ze.addEventListener(`sessionend`,ct),this.render=function(e,t){if(t!==void 0&&t.isCamera!==!0){G(`WebGLRenderer.render: camera is not an instance of THREE.Camera.`);return}if(E===!0)return;D!==null&&D.renderStart(e,t);let n=Ze.enabled===!0&&Ze.isPresenting===!0,r=w!==null&&(M===null||n)&&w.begin(T,M);if(e.matrixWorldAutoUpdate===!0&&e.updateMatrixWorld(),t.parent===null&&t.matrixWorldAutoUpdate===!0&&t.updateMatrixWorld(),Ze.enabled===!0&&Ze.isPresenting===!0&&(w===null||w.isCompositing()===!1)&&(Ze.cameraAutoUpdate===!0&&Ze.updateCamera(t),t=Ze.getCamera()),e.isScene===!0&&e.onBeforeRender(T,e,t,M),x=Be.get(e,C.length),x.init(t),x.state.textureUnits=U.getTextureUnits(),C.push(x),L.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),fe.setFromProjectionMatrix(L,Ft,t.reversedDepth),me=this.localClippingEnabled,pe=Ve.init(this.clippingPlanes,me),b=ze.get(e,S.length),b.init(),S.push(b),Ze.enabled===!0&&Ze.isPresenting===!0){let e=T.xr.getDepthSensingMesh();e!==null&&ut(e,t,-1/0,T.sortObjects)}ut(e,t,0,T.sortObjects),b.finish(),D!==null&&D.updateLights(x.state.lightsArray),T.sortObjects===!0&&b.sort(se,ce),_e=Ze.enabled===!1||Ze.isPresenting===!1||Ze.hasDepthSensing()===!1,_e&&Ue.addToRenderList(b,e),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),pe===!0&&Ve.beginShadows();let i=x.state.shadowsArray;if(He.render(i,e,t),pe===!0&&Ve.endShadows(),(r&&w.hasRenderPass())===!1){let n=b.opaque,r=b.transmissive;if(x.setupLights(),t.isArrayCamera){let i=t.cameras;if(r.length>0)for(let t=0,a=i.length;t<a;t++){let a=i[t];ft(n,r,e,a)}_e&&Ue.render(e);for(let t=0,n=i.length;t<n;t++){let n=i[t];dt(b,e,n,n.viewport)}}else r.length>0&&ft(n,r,e,t),_e&&Ue.render(e),dt(b,e,t)}M!==null&&ee===0&&(U.updateMultisampleRenderTarget(M),U.updateRenderTargetMipmap(M)),r&&w.end(T),e.isScene===!0&&e.onAfterRender(T,e,t),Je.resetDefaultState(),te=-1,ne=null,C.pop(),C.length>0?(x=C[C.length-1],U.setTextureUnits(x.state.textureUnits),pe===!0&&Ve.setGlobalState(T.clippingPlanes,x.state.camera)):x=null,S.pop(),b=S.length>0?S[S.length-1]:null,D!==null&&D.renderEnd()};function ut(e,t,n,r){if(e.visible===!1)return;if(e.layers.test(t.layers)){if(e.isGroup)n=e.renderOrder;else if(e.isLOD)e.autoUpdate===!0&&e.update(t);else if(e.isLightProbeGrid)x.pushLightProbeGrid(e);else if(e.isLight)x.pushLight(e),e.castShadow&&x.pushShadow(e);else if(e.isSprite){if(!e.frustumCulled||e.intersectsFrustum(fe)){r&&R.setFromMatrixPosition(e.matrixWorld).applyMatrix4(L);let i=Ne.update(e),a=e.material;a.visible&&b.push(e,i,a,n,R.z,null,t)}}else if((e.isMesh||e.isLine||e.isPoints)&&(!e.frustumCulled||e.intersectsFrustum(fe))){let i=Ne.update(e),a=e.material;if(r&&(e.boundingSphere===void 0?(i.boundingSphere===null&&i.computeBoundingSphere(),R.copy(i.boundingSphere.center)):(e.boundingSphere===null&&e.computeBoundingSphere(),R.copy(e.boundingSphere.center)),R.applyMatrix4(e.matrixWorld).applyMatrix4(L)),Array.isArray(a)){let r=i.groups;for(let o=0,s=r.length;o<s;o++){let s=r[o],c=a[s.materialIndex];c&&c.visible&&b.push(e,i,c,n,R.z,s,t)}}else a.visible&&b.push(e,i,a,n,R.z,null,t)}}let i=e.children;for(let e=0,a=i.length;e<a;e++)ut(i[e],t,n,r)}function dt(e,t,n,r){let{opaque:i,transmissive:a,transparent:o}=e;x.setupLightsView(n),pe===!0&&Ve.setGlobalState(T.clippingPlanes,n),r&&V.viewport(N.copy(r)),i.length>0&&pt(i,t,n),a.length>0&&pt(a,t,n),o.length>0&&pt(o,t,n),V.buffers.depth.setTest(!0),V.buffers.depth.setMask(!0),V.buffers.color.setMask(!0),V.setPolygonOffset(!1)}function ft(e,t,n,r){if((n.isScene===!0?n.overrideMaterial:null)!==null)return;if(x.state.transmissionRenderTarget[r.id]===void 0){let e=xe.has(`EXT_color_buffer_half_float`)||xe.has(`EXT_color_buffer_float`);x.state.transmissionRenderTarget[r.id]=new xn(1,1,{generateMipmaps:!0,type:e?Te:B,minFilter:ye,samples:Math.max(4,Ce.samples),stencilBuffer:i,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:X.workingColorSpace})}let a=x.state.transmissionRenderTarget[r.id],o=r.viewport||N;a.setSize(o.z*T.transmissionResolutionScale,o.w*T.transmissionResolutionScale);let s=T.getRenderTarget(),c=T.getActiveCubeFace(),l=T.getActiveMipmapLevel();T.setRenderTarget(a),T.getClearColor(ie),ae=T.getClearAlpha(),ae<1&&T.setClearColor(16777215,.5),T.clear(),_e&&Ue.render(n);let u=T.toneMapping;T.toneMapping=0;let d=r.viewport;if(r.viewport!==void 0&&(r.viewport=void 0),x.setupLightsView(r),pe===!0&&Ve.setGlobalState(T.clippingPlanes,r),pt(e,n,r),U.updateMultisampleRenderTarget(a),U.updateRenderTargetMipmap(a),xe.has(`WEBGL_multisampled_render_to_texture`)===!1){let e=!1;for(let i=0,a=t.length;i<a;i++){let{object:a,geometry:o,material:s,group:c}=t[i];if(s.side===2&&a.layers.test(r.layers)){let t=s.side;s.side=1,s.needsUpdate=!0,mt(a,n,r,o,s,c),s.side=t,s.needsUpdate=!0,e=!0}}e===!0&&(U.updateMultisampleRenderTarget(a),U.updateRenderTargetMipmap(a))}T.setRenderTarget(s,c,l),T.setClearColor(ie,ae),d!==void 0&&(r.viewport=d),T.toneMapping=u}function pt(e,t,n){let r=t.isScene===!0?t.overrideMaterial:null;for(let i=0,a=e.length;i<a;i++){let a=e[i],{object:o,geometry:s,group:c}=a,l=a.material;l.allowOverride===!0&&r!==null&&(l=r),o.layers.test(n.layers)&&mt(o,t,n,s,l,c)}}function mt(e,t,n,r,i,a){D!==null&&i.isNodeMaterial&&D.setObject(e,i),e.onBeforeRender(T,t,n,r,i,a),e.modelViewMatrix.multiplyMatrices(n.matrixWorldInverse,e.matrixWorld),e.normalMatrix.getNormalMatrix(e.modelViewMatrix),i.onBeforeRender(T,t,n,r,e,a),i.transparent===!0&&i.side===2&&i.forceSinglePass===!1?(i.side=1,i.needsUpdate=!0,T.renderBufferDirect(n,t,r,i,e,a),i.side=0,i.needsUpdate=!0,T.renderBufferDirect(n,t,r,i,e,a),i.side=2):T.renderBufferDirect(n,t,r,i,e,a),e.onAfterRender(T,t,n,r,i,a)}function ht(e,t,n){t.isScene!==!0&&(t=ge);let r=H.get(e),i=x.state.lights,a=x.state.shadowsArray,o=i.state.version,s=Pe.getParameters(e,i.state,a,t,n,x.state.lightProbeGridArray),c=Pe.getProgramCacheKey(s),l=r.programs;r.environment=e.isMeshStandardMaterial||e.isMeshLambertMaterial||e.isMeshPhongMaterial?t.environment:null,r.fog=t.fog;let u=e.isMeshStandardMaterial||e.isMeshLambertMaterial&&!e.envMap||e.isMeshPhongMaterial&&!e.envMap;r.envMap=Ae.get(e.envMap||r.environment,u),r.envMapRotation=r.environment!==null&&e.envMap===null?t.environmentRotation:e.envMapRotation,l===void 0&&(e.addEventListener(`dispose`,tt),l=new Map,r.programs=l);let d=l.get(c);if(d!==void 0){if(r.currentProgram===d&&r.lightsStateVersion===o)return _t(e,s),d}else s.uniforms=Pe.getUniforms(e),D!==null&&e.isNodeMaterial&&D.build(e,n,s),e.onBeforeCompile(s,T),d=Pe.acquireProgram(s,c),l.set(c,d),r.uniforms=s.uniforms;let f=r.uniforms;return(!e.isShaderMaterial&&!e.isRawShaderMaterial||e.clipping===!0)&&(f.clippingPlanes=Ve.uniform),_t(e,s),r.needsLights=xt(e),r.lightsStateVersion=o,r.needsLights&&(f.ambientLightColor.value=i.state.ambient,f.lightProbe.value=i.state.probe,f.sunLights.value=i.state.sun,f.sunLightShadows.value=i.state.sunShadow,f.directionalLights.value=i.state.directional,f.directionalLightShadows.value=i.state.directionalShadow,f.spotLights.value=i.state.spot,f.spotLightShadows.value=i.state.spotShadow,f.rectAreaLights.value=i.state.rectArea,f.ltc_1.value=i.state.rectAreaLTC1,f.ltc_2.value=i.state.rectAreaLTC2,f.pointLights.value=i.state.point,f.pointLightShadows.value=i.state.pointShadow,f.hemisphereLights.value=i.state.hemi,f.sunShadowMatrix.value=i.state.sunShadowMatrix,f.sunShadowCascade.value=i.state.sunShadowCascade,f.directionalShadowMatrix.value=i.state.directionalShadowMatrix,f.spotLightMatrix.value=i.state.spotLightMatrix,f.spotLightMap.value=i.state.spotLightMap,f.pointShadowMatrix.value=i.state.pointShadowMatrix),r.lightProbeGrid=x.state.lightProbeGridArray.length>0,r.currentProgram=d,r.uniformsList=null,d}function gt(e){if(e.uniformsList===null){let t=e.currentProgram.getUniforms();e.uniformsList=cc.seqWithValue(t.seq,e.uniforms)}return e.uniformsList}function _t(e,t){let n=H.get(e);n.outputColorSpace=t.outputColorSpace,n.batching=t.batching,n.batchingColor=t.batchingColor,n.instancing=t.instancing,n.instancingColor=t.instancingColor,n.instancingMorph=t.instancingMorph,n.skinning=t.skinning,n.morphTargets=t.morphTargets,n.morphNormals=t.morphNormals,n.morphColors=t.morphColors,n.morphTargetsCount=t.morphTargetsCount,n.numClippingPlanes=t.numClippingPlanes,n.numIntersection=t.numClipIntersection,n.vertexAlphas=t.vertexAlphas,n.vertexTangents=t.vertexTangents,n.toneMapping=t.toneMapping}function vt(e,t){if(e.length===0)return null;if(e.length===1)return e[0].texture===null?null:e[0];y.setFromMatrixPosition(t.matrixWorld);for(let t=0,n=e.length;t<n;t++){let n=e[t];if(n.texture!==null&&n.boundingBox.containsPoint(y))return n}return null}function yt(e,t,n,r,i){t.isScene!==!0&&(t=ge),U.resetTextureUnits();let a=t.fog,o=r.isMeshStandardMaterial||r.isMeshLambertMaterial||r.isMeshPhongMaterial?t.environment:null,s=M===null?T.outputColorSpace:M.isXRRenderTarget===!0?M.texture.colorSpace:X.workingColorSpace,c=r.isMeshStandardMaterial||r.isMeshLambertMaterial&&!r.envMap||r.isMeshPhongMaterial&&!r.envMap,l=Ae.get(r.envMap||o,c),u=r.vertexColors===!0&&!!n.attributes.color&&n.attributes.color.itemSize===4,d=!!n.attributes.tangent&&(!!r.normalMap||r.anisotropy>0),f=!!n.morphAttributes.position,p=!!n.morphAttributes.normal,m=!!n.morphAttributes.color,h=0;r.toneMapped&&(M===null||M.isXRRenderTarget===!0)&&(h=T.toneMapping);let g=n.morphAttributes.position||n.morphAttributes.normal||n.morphAttributes.color,_=g===void 0?0:g.length,v=H.get(r),y=x.state.lights;if(pe===!0&&(me===!0||e!==ne)){let t=e===ne&&r.id===te;Ve.setState(r,e,t)}let b=!1;r.version===v.__version?v.needsLights&&v.lightsStateVersion!==y.state.version?b=!0:v.outputColorSpace===s?i.isBatchedMesh&&v.batching===!1||!i.isBatchedMesh&&v.batching===!0||i.isBatchedMesh&&v.batchingColor===!0&&i._colorsTexture===null||i.isBatchedMesh&&v.batchingColor===!1&&i._colorsTexture!==null||i.isInstancedMesh&&v.instancing===!1||!i.isInstancedMesh&&v.instancing===!0||i.isSkinnedMesh&&v.skinning===!1||!i.isSkinnedMesh&&v.skinning===!0||i.isInstancedMesh&&v.instancingColor===!0&&i.instanceColor===null||i.isInstancedMesh&&v.instancingColor===!1&&i.instanceColor!==null||i.isInstancedMesh&&v.instancingMorph===!0&&i.morphTexture===null||i.isInstancedMesh&&v.instancingMorph===!1&&i.morphTexture!==null?b=!0:v.envMap===l?r.fog===!0&&v.fog!==a||v.numClippingPlanes!==void 0&&(v.numClippingPlanes!==Ve.numPlanes||v.numIntersection!==Ve.numIntersection)?b=!0:v.vertexAlphas===u&&v.vertexTangents===d&&v.morphTargets===f&&v.morphNormals===p&&v.morphColors===m&&v.toneMapping===h&&v.morphTargetsCount===_?!!v.lightProbeGrid!=x.state.lightProbeGridArray.length>0&&(b=!0):b=!0:b=!0:b=!0:(b=!0,v.__version=r.version);let S=v.currentProgram;b===!0&&(S=ht(r,t,i),D&&r.isNodeMaterial&&D.onUpdateProgram(r,S,v));let C=!1,w=!1,E=!1,O=S.getUniforms(),k=v.uniforms;if(V.useProgram(S.program)&&(C=!0,w=!0,E=!0),r.id!==te&&(te=r.id,w=!0),v.needsLights){let e=vt(x.state.lightProbeGridArray,i);v.lightProbeGrid!==e&&(v.lightProbeGrid=e,w=!0)}if(C||ne!==e){V.buffers.depth.getReversed()&&e.reversedDepth!==!0&&(e._reversedDepth=!0,e.updateProjectionMatrix()),O.setValue(z,`projectionMatrix`,e.projectionMatrix),O.setValue(z,`viewMatrix`,e.matrixWorldInverse);let t=O.map.cameraPosition;t!==void 0&&t.setValue(z,he.setFromMatrixPosition(e.matrixWorld)),Ce.logarithmicDepthBuffer&&O.setValue(z,`logDepthBufFC`,2/(Math.log(e.far+1)/Math.LN2)),(r.isMeshPhongMaterial||r.isMeshToonMaterial||r.isMeshLambertMaterial||r.isMeshBasicMaterial||r.isMeshStandardMaterial||r.isShaderMaterial)&&O.setValue(z,`isOrthographic`,e.isOrthographicCamera===!0),ne!==e&&(ne=e,w=!0,E=!0)}if(v.needsLights&&(y.state.sunShadowMap.length>0&&O.setValue(z,`sunShadowMap`,y.state.sunShadowMap,U),y.state.directionalShadowMap.length>0&&O.setValue(z,`directionalShadowMap`,y.state.directionalShadowMap,U),y.state.spotShadowMap.length>0&&O.setValue(z,`spotShadowMap`,y.state.spotShadowMap,U),y.state.pointShadowMap.length>0&&O.setValue(z,`pointShadowMap`,y.state.pointShadowMap,U)),i.isSkinnedMesh){O.setOptional(z,i,`bindMatrix`),O.setOptional(z,i,`bindMatrixInverse`);let e=i.skeleton;e&&(e.boneTexture===null&&e.computeBoneTexture(),O.setValue(z,`boneTexture`,e.boneTexture,U))}i.isBatchedMesh&&(O.setOptional(z,i,`batchingTexture`),O.setValue(z,`batchingTexture`,i._matricesTexture,U),O.setOptional(z,i,`batchingIdTexture`),O.setValue(z,`batchingIdTexture`,i._indirectTexture,U),O.setOptional(z,i,`batchingColorTexture`),i._colorsTexture!==null&&O.setValue(z,`batchingColorTexture`,i._colorsTexture,U));let A=n.morphAttributes;if((A.position!==void 0||A.normal!==void 0||A.color!==void 0)&&We.update(i,n,S),(w||v.receiveShadow!==i.receiveShadow)&&(v.receiveShadow=i.receiveShadow,O.setValue(z,`receiveShadow`,i.receiveShadow)),(r.isMeshStandardMaterial||r.isMeshLambertMaterial||r.isMeshPhongMaterial)&&r.envMap===null&&t.environment!==null&&(k.envMapIntensity.value=t.environmentIntensity),k.dfgLUT!==void 0&&(k.dfgLUT.value=kl()),w){if(O.setValue(z,`toneMappingExposure`,T.toneMappingExposure),v.needsLights&&bt(k,E),a&&r.fog===!0&&Ie.refreshFogUniforms(k,a),Ie.refreshMaterialUniforms(k,r,I,oe,x.state.transmissionRenderTarget[e.id]),v.needsLights&&v.lightProbeGrid){let e=v.lightProbeGrid;k.probesSH.value=e.texture,k.probesMin.value.copy(e.boundingBox.min),k.probesMax.value.copy(e.boundingBox.max),k.probesResolution.value.copy(e.resolution)}cc.upload(z,gt(v),k,U)}if(r.isShaderMaterial&&r.uniformsNeedUpdate===!0&&(cc.upload(z,gt(v),k,U),r.uniformsNeedUpdate=!1),r.isSpriteMaterial&&O.setValue(z,`center`,i.center),O.setValue(z,`modelViewMatrix`,i.modelViewMatrix),O.setValue(z,`normalMatrix`,i.normalMatrix),O.setValue(z,`modelMatrix`,i.matrixWorld),r.uniformsGroups!==void 0){let e=r.uniformsGroups;for(let t=0,n=e.length;t<n;t++){let n=e[t];Ye.update(n,S),Ye.bind(n,S)}}return S}function bt(e,t){e.ambientLightColor.needsUpdate=t,e.lightProbe.needsUpdate=t,e.sunLights.needsUpdate=t,e.sunLightShadows.needsUpdate=t,e.directionalLights.needsUpdate=t,e.directionalLightShadows.needsUpdate=t,e.pointLights.needsUpdate=t,e.pointLightShadows.needsUpdate=t,e.spotLights.needsUpdate=t,e.spotLightShadows.needsUpdate=t,e.rectAreaLights.needsUpdate=t,e.hemisphereLights.needsUpdate=t}function xt(e){return e.isMeshLambertMaterial||e.isMeshToonMaterial||e.isMeshPhongMaterial||e.isMeshStandardMaterial||e.isShadowMaterial||e.isShaderMaterial&&e.lights===!0}this.getActiveCubeFace=function(){return j},this.getActiveMipmapLevel=function(){return ee},this.getRenderTarget=function(){return M},this.setRenderTargetTextures=function(e,t,n){let r=H.get(e);r.__autoAllocateDepthBuffer=e.resolveDepthBuffer===!1,r.__autoAllocateDepthBuffer===!1&&(r.__useRenderToTexture=!1),H.get(e.texture).__webglTexture=t,H.get(e.depthTexture).__webglTexture=r.__autoAllocateDepthBuffer?void 0:n,r.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(e,t){let n=H.get(e);n.__webglFramebuffer=t,n.__useDefaultFramebuffer=t===void 0},this.setRenderTarget=function(e,t=0,n=0){M=e,j=t,ee=n;let r=null,i=!1,a=!1;if(e){let o=H.get(e);if(o.__useDefaultFramebuffer!==void 0){V.bindFramebuffer(z.FRAMEBUFFER,o.__webglFramebuffer),N.copy(e.viewport),re.copy(e.scissor),P=e.scissorTest,V.viewport(N),V.scissor(re),V.setScissorTest(P),te=-1;return}if(o.__webglFramebuffer===void 0)U.setupRenderTarget(e);else if(o.__hasExternalTextures)U.rebindTextures(e,H.get(e.texture).__webglTexture,H.get(e.depthTexture).__webglTexture);else if(e.depthBuffer){let t=e.depthTexture;if(o.__boundDepthTexture!==t){if(t!==null&&H.has(t)&&(e.width!==t.image.width||e.height!==t.image.height))throw Error(`THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.`);U.setupDepthRenderbuffer(e)}}let s=e.texture;(s.isData3DTexture||s.isDataArrayTexture||s.isCompressedArrayTexture)&&(a=!0);let c=H.get(e).__webglFramebuffer;e.isWebGLCubeRenderTarget?(r=Array.isArray(c[t])?c[t][n]:c[t],i=!0):r=e.samples>0&&U.useMultisampledRTT(e)===!1?H.get(e).__webglMultisampledFramebuffer:Array.isArray(c)?c[n]:c,N.copy(e.viewport),re.copy(e.scissor),P=e.scissorTest}else N.copy(le).multiplyScalar(I).floor(),re.copy(ue).multiplyScalar(I).floor(),P=de;if(n!==0&&(r=O),V.bindFramebuffer(z.FRAMEBUFFER,r)&&V.drawBuffers(e,r),V.viewport(N),V.scissor(re),V.setScissorTest(P),i){let r=H.get(e.texture);z.framebufferTexture2D(z.FRAMEBUFFER,z.COLOR_ATTACHMENT0,z.TEXTURE_CUBE_MAP_POSITIVE_X+t,r.__webglTexture,n)}else if(a){let r=t;for(let t=0;t<e.textures.length;t++){let i=H.get(e.textures[t]);z.framebufferTextureLayer(z.FRAMEBUFFER,z.COLOR_ATTACHMENT0+t,i.__webglTexture,n,r)}}else if(e!==null&&n!==0){let t=H.get(e.texture);z.framebufferTexture2D(z.FRAMEBUFFER,z.COLOR_ATTACHMENT0,z.TEXTURE_2D,t.__webglTexture,n)}te=-1};function St(e){let t=H.get(e);return(t.__readFormat!==e.format||t.__readType!==e.type)&&(t.__readFormat=e.format,t.__readType=e.type,t.__formatReadable=Ce.textureFormatReadable(e.format),t.__typeReadable=Ce.textureTypeReadable(e.type)),t}this.readRenderTargetPixels=function(e,t,n,r,i,a,o,s=0){if(!(e&&e.isWebGLRenderTarget)){G(`WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.`);return}let c=H.get(e).__webglFramebuffer;if(e.isWebGLCubeRenderTarget&&o!==void 0&&(c=c[o]),c){V.bindFramebuffer(z.FRAMEBUFFER,c);try{let o=e.textures[s],c=o.format,l=o.type;e.textures.length>1&&z.readBuffer(z.COLOR_ATTACHMENT0+s);let u=St(o);if(u.__formatReadable===!1){G(`WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.`);return}if(u.__typeReadable===!1){G(`WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.`);return}t>=0&&t<=e.width-r&&n>=0&&n<=e.height-i&&z.readPixels(t,n,r,i,qe.convert(c),qe.convert(l),a)}finally{let e=M===null?null:H.get(M).__webglFramebuffer;V.bindFramebuffer(z.FRAMEBUFFER,e)}}},this.readRenderTargetPixelsAsync=async function(e,t,n,r,i,a,o,s=0){if(!(e&&e.isWebGLRenderTarget))throw Error(`THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.`);let c=H.get(e).__webglFramebuffer;if(e.isWebGLCubeRenderTarget&&o!==void 0&&(c=c[o]),c){if(t>=0&&t<=e.width-r&&n>=0&&n<=e.height-i){V.bindFramebuffer(z.FRAMEBUFFER,c);let o=e.textures[s],l=o.format,u=o.type;e.textures.length>1&&z.readBuffer(z.COLOR_ATTACHMENT0+s);let d=St(o);if(d.__formatReadable===!1)throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.`);if(d.__typeReadable===!1)throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.`);let f=z.createBuffer();z.bindBuffer(z.PIXEL_PACK_BUFFER,f),z.bufferData(z.PIXEL_PACK_BUFFER,a.byteLength,z.STREAM_READ),z.readPixels(t,n,r,i,qe.convert(l),qe.convert(u),0),z.bindBuffer(z.PIXEL_PACK_BUFFER,null);let p=M===null?null:H.get(M).__webglFramebuffer;V.bindFramebuffer(z.FRAMEBUFFER,p);let m=z.fenceSync(z.SYNC_GPU_COMMANDS_COMPLETE,0);return z.flush(),await Wt(z,m,4),z.bindBuffer(z.PIXEL_PACK_BUFFER,f),z.getBufferSubData(z.PIXEL_PACK_BUFFER,0,a),z.bindBuffer(z.PIXEL_PACK_BUFFER,null),z.deleteBuffer(f),z.deleteSync(m),a}throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.`)}},this.copyFramebufferToTexture=function(e,t=null,n=0){let r=2**-n,i=Math.floor(e.image.width*r),a=Math.floor(e.image.height*r),o=t===null?0:t.x,s=t===null?0:t.y;U.setTexture2D(e,0),z.copyTexSubImage2D(z.TEXTURE_2D,n,0,0,o,s,i,a),V.unbindTexture()},this.copyTextureToTexture=function(e,t,n=null,r=null,i=0,a=0){let o,s,c,l,u,d,f,p,m,h=e.isCompressedTexture?e.mipmaps[a]:e.image;if(n!==null)o=n.max.x-n.min.x,s=n.max.y-n.min.y,c=n.isBox3?n.max.z-n.min.z:1,l=n.min.x,u=n.min.y,d=n.isBox3?n.min.z:0;else{let t=2**-i;o=Math.floor(h.width*t),s=Math.floor(h.height*t),c=e.isDataArrayTexture?h.depth:e.isData3DTexture?Math.floor(h.depth*t):1,l=0,u=0,d=0}r===null?(f=0,p=0,m=0):(f=r.x,p=r.y,m=r.z);let g=qe.convert(t.format),_=qe.convert(t.type),v;t.isData3DTexture?(U.setTexture3D(t,0),v=z.TEXTURE_3D):t.isDataArrayTexture||t.isCompressedArrayTexture?(U.setTexture2DArray(t,0),v=z.TEXTURE_2D_ARRAY):(U.setTexture2D(t,0),v=z.TEXTURE_2D),V.activeTexture(z.TEXTURE0),V.pixelStorei(z.UNPACK_FLIP_Y_WEBGL,t.flipY),V.pixelStorei(z.UNPACK_PREMULTIPLY_ALPHA_WEBGL,t.premultiplyAlpha),V.pixelStorei(z.UNPACK_ALIGNMENT,t.unpackAlignment);let y=V.getParameter(z.UNPACK_ROW_LENGTH),b=V.getParameter(z.UNPACK_IMAGE_HEIGHT),x=V.getParameter(z.UNPACK_SKIP_PIXELS),S=V.getParameter(z.UNPACK_SKIP_ROWS),C=V.getParameter(z.UNPACK_SKIP_IMAGES);V.pixelStorei(z.UNPACK_ROW_LENGTH,h.width),V.pixelStorei(z.UNPACK_IMAGE_HEIGHT,h.height),V.pixelStorei(z.UNPACK_SKIP_PIXELS,l),V.pixelStorei(z.UNPACK_SKIP_ROWS,u),V.pixelStorei(z.UNPACK_SKIP_IMAGES,d);let w=e.isDataArrayTexture||e.isData3DTexture,T=t.isDataArrayTexture||t.isData3DTexture;if(e.isDepthTexture){let n=H.get(e),r=H.get(t),h=H.get(n.__renderTarget),g=H.get(r.__renderTarget);V.bindFramebuffer(z.READ_FRAMEBUFFER,h.__webglFramebuffer),V.bindFramebuffer(z.DRAW_FRAMEBUFFER,g.__webglFramebuffer);for(let n=0;n<c;n++)w&&(z.framebufferTextureLayer(z.READ_FRAMEBUFFER,z.COLOR_ATTACHMENT0,H.get(e).__webglTexture,i,d+n),z.framebufferTextureLayer(z.DRAW_FRAMEBUFFER,z.COLOR_ATTACHMENT0,H.get(t).__webglTexture,a,m+n)),z.blitFramebuffer(l,u,o,s,f,p,o,s,z.DEPTH_BUFFER_BIT,z.NEAREST);V.bindFramebuffer(z.READ_FRAMEBUFFER,null),V.bindFramebuffer(z.DRAW_FRAMEBUFFER,null)}else if(i!==0||e.isRenderTargetTexture||H.has(e)){let n=H.get(e),r=H.get(t);V.bindFramebuffer(z.READ_FRAMEBUFFER,k),V.bindFramebuffer(z.DRAW_FRAMEBUFFER,A);for(let e=0;e<c;e++)w?z.framebufferTextureLayer(z.READ_FRAMEBUFFER,z.COLOR_ATTACHMENT0,n.__webglTexture,i,d+e):z.framebufferTexture2D(z.READ_FRAMEBUFFER,z.COLOR_ATTACHMENT0,z.TEXTURE_2D,n.__webglTexture,i),T?z.framebufferTextureLayer(z.DRAW_FRAMEBUFFER,z.COLOR_ATTACHMENT0,r.__webglTexture,a,m+e):z.framebufferTexture2D(z.DRAW_FRAMEBUFFER,z.COLOR_ATTACHMENT0,z.TEXTURE_2D,r.__webglTexture,a),i===0?T?z.copyTexSubImage3D(v,a,f,p,m+e,l,u,o,s):z.copyTexSubImage2D(v,a,f,p,l,u,o,s):z.blitFramebuffer(l,u,o,s,f,p,o,s,z.COLOR_BUFFER_BIT,z.NEAREST);V.bindFramebuffer(z.READ_FRAMEBUFFER,null),V.bindFramebuffer(z.DRAW_FRAMEBUFFER,null)}else T?e.isDataTexture||e.isData3DTexture?z.texSubImage3D(v,a,f,p,m,o,s,c,g,_,h.data):t.isCompressedArrayTexture?z.compressedTexSubImage3D(v,a,f,p,m,o,s,c,g,h.data):z.texSubImage3D(v,a,f,p,m,o,s,c,g,_,h):e.isDataTexture?z.texSubImage2D(z.TEXTURE_2D,a,f,p,o,s,g,_,h.data):e.isCompressedTexture?z.compressedTexSubImage2D(z.TEXTURE_2D,a,f,p,h.width,h.height,g,h.data):z.texSubImage2D(z.TEXTURE_2D,a,f,p,o,s,g,_,h);V.pixelStorei(z.UNPACK_ROW_LENGTH,y),V.pixelStorei(z.UNPACK_IMAGE_HEIGHT,b),V.pixelStorei(z.UNPACK_SKIP_PIXELS,x),V.pixelStorei(z.UNPACK_SKIP_ROWS,S),V.pixelStorei(z.UNPACK_SKIP_IMAGES,C),a===0&&t.generateMipmaps&&z.generateMipmap(v),V.unbindTexture()},this.initRenderTarget=function(e){H.get(e).__webglFramebuffer===void 0&&U.setupRenderTarget(e)},this.initTexture=function(e){e.isCubeTexture?U.setTextureCube(e,0):e.isData3DTexture?U.setTexture3D(e,0):e.isDataArrayTexture||e.isCompressedArrayTexture?U.setTexture2DArray(e,0):U.setTexture2D(e,0),V.unbindTexture()},this.resetState=function(){j=0,ee=0,M=null,V.reset(),Je.reset()},typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`observe`,{detail:this}))}get coordinateSystem(){return Ft}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=X._getDrawingBufferColorSpace(e),t.unpackColorSpace=X._getUnpackColorSpace()}},jl={notice:`Country shapes from Natural Earth (public domain) via world-atlas (© Mike Bostock, BSD-3-Clause). 1:110m, plus 1:50m where 110m omits a country.`,countries:[{id:`fj`,lon:178,lat:-17.83,small:!0,parts:[[[[178.12,-17.51],[178.37,-17.34],[178.72,-17.63],[178.55,-18.15],[177.93,-18.29],[177.38,-18.16],[177.29,-17.72],[177.67,-17.38]]],[[[-180,-16.07],[-179.79,-16.02],[-179.92,-16.5],[-180,-16.56],[-180.64,-16.8],[-181.27,-17.01],[-181.4,-16.64],[-180.9,-16.43],[-180.59,-16.38]]]]},{id:`tz`,lon:34.75,lat:-6.26,small:!1,parts:[[[[33.9,-.95],[34.07,-1.06],[37.7,-3.1],[37.77,-3.68],[39.2,-4.68],[38.74,-5.91],[38.8,-6.48],[39.44,-6.84],[39.47,-7.1],[39.2,-7.7],[39.25,-8.01],[39.19,-8.49],[39.54,-9.11],[39.95,-10.1],[40.32,-10.32],[39.52,-10.9],[38.43,-11.29],[37.83,-11.27],[37.47,-11.57],[36.78,-11.6],[36.51,-11.72],[35.31,-11.44],[34.56,-11.52],[34.28,-10.16],[33.94,-9.69],[33.74,-9.42],[32.76,-9.23],[32.19,-8.93],[31.56,-8.76],[31.16,-8.59],[30.74,-8.34],[30.2,-7.08],[29.62,-6.52],[29.42,-5.94],[29.52,-5.42],[29.34,-4.5],[29.75,-4.45],[30.12,-4.09],[30.5,-3.57],[30.75,-3.36],[30.74,-3.03],[30.53,-2.81],[30.47,-2.41],[30.76,-2.29],[30.81,-1.7],[30.42,-1.14],[30.77,-1.01],[31.87,-1.03]]]]},{id:`eh`,lon:-12.14,lat:24.29,small:!1,parts:[[[[-8.67,27.66],[-8.66,27.59],[-8.69,27.4],[-8.69,25.88],[-11.97,25.93],[-11.94,23.37],[-12.88,23.29],[-13.12,22.77],[-12.93,21.33],[-16.85,21.33],[-17.06,21],[-17.02,21.42],[-17,21.42],[-14.75,21.5],[-14.63,21.86],[-14.22,22.31],[-13.89,23.69],[-12.5,24.77],[-12.03,26.03],[-11.72,26.1],[-11.39,26.88],[-10.55,26.99],[-10.19,26.86],[-9.74,26.86],[-9.41,27.09],[-8.79,27.12],[-8.82,27.66]]]]},{id:`ca`,lon:-101.57,lat:57.75,small:!1,parts:[[[[-122.84,49],[-122.98,49],[-124.91,49.99],[-125.63,50.42],[-127.44,50.83],[-127.99,51.72],[-127.85,52.33],[-129.13,52.76],[-129.3,53.56],[-130.51,54.29],[-130.54,54.8],[-129.98,55.28],[-130.01,55.92],[-131.71,56.55],[-132.73,57.69],[-133.35,58.41],[-134.27,58.86],[-134.95,59.27],[-135.47,59.79],[-136.48,59.46],[-137.45,58.91],[-138.34,59.56],[-139.04,60],[-140.01,60.28],[-141,60.31],[-140.99,66],[-140.99,69.71],[-139.12,69.47],[-137.54,68.99],[-136.5,68.9],[-135.63,69.32],[-134.42,69.63],[-132.93,69.51],[-131.43,69.94],[-129.79,70.19],[-129.11,69.78],[-128.36,70.01],[-128.14,70.48],[-127.45,70.38],[-125.75,69.48],[-124.43,70.16],[-124.29,69.4],[-123.06,69.56],[-122.68,69.86],[-121.47,69.8],[-119.94,69.38],[-117.6,69.01],[-116.23,68.84],[-115.25,68.91],[-113.9,68.4],[-115.3,67.9],[-113.5,67.69],[-110.8,67.81],[-109.95,67.98],[-108.88,67.38],[-107.79,67.89],[-108.81,68.31],[-108.17,68.65],[-106.95,68.7],[-106.15,68.8],[-105.34,68.56],[-104.34,68.02],[-103.22,68.1],[-101.45,67.65],[-99.9,67.81],[-98.44,67.78],[-98.56,68.4],[-97.67,68.58],[-96.12,68.24],[-96.13,67.29],[-95.49,68.09],[-94.69,68.06],[-94.23,69.07],[-95.31,69.68],[-96.47,70.09],[-96.39,71.19],[-95.21,71.92],[-93.89,71.76],[-92.88,71.32],[-91.52,70.19],[-92.41,69.7],[-90.55,69.5],[-90.55,68.47],[-89.21,69.26],[-88.02,68.62],[-88.32,67.87],[-87.35,67.2],[-86.31,67.92],[-85.58,68.78],[-85.52,69.88],[-84.1,69.81],[-82.62,69.66],[-81.28,69.16],[-81.22,68.67],[-81.96,68.13],[-81.26,67.6],[-81.39,67.11],[-83.35,66.41],[-84.74,66.26],[-85.77,66.56],[-86.07,66.06],[-87.03,65.21],[-87.32,64.77],[-88.48,64.1],[-89.91,64.03],[-90.7,63.61],[-90.77,62.96],[-91.93,62.84],[-93.16,62.02],[-94.24,60.9],[-94.63,60.11],[-94.69,58.95],[-93.21,58.78],[-92.76,57.85],[-92.3,57.09],[-90.9,57.29],[-89.04,56.85],[-88.04,56.47],[-87.32,56],[-86.07,55.72],[-85.01,55.3],[-83.36,55.25],[-82.27,55.15],[-82.44,54.28],[-82.13,53.28],[-81.4,52.16],[-79.91,51.21],[-79.14,51.53],[-78.6,52.56],[-79.12,54.14],[-79.83,54.67],[-78.23,55.14],[-77.1,55.84],[-76.54,56.53],[-76.62,57.2],[-77.3,58.05],[-78.52,58.81],[-77.34,59.85],[-77.77,60.76],[-78.11,62.32],[-77.41,62.55],[-75.7,62.28],[-74.67,62.18],[-73.84,62.44],[-72.91,62.11],[-71.68,61.53],[-71.37,61.14],[-69.59,61.06],[-69.62,60.22],[-69.29,58.96],[-68.37,58.8],[-67.65,58.21],[-66.2,58.77],[-65.25,59.87],[-64.58,60.34],[-63.81,59.44],[-62.5,58.17],[-61.4,56.97],[-61.8,56.34],[-60.47,55.78],[-59.57,55.2],[-57.98,54.95],[-57.33,54.63],[-56.94,53.78],[-56.16,53.65],[-55.76,53.27],[-55.68,52.15],[-56.41,51.77],[-57.13,51.42],[-58.78,51.07],[-60.03,50.24],[-61.72,50.08],[-63.86,50.29],[-65.36,50.3],[-66.4,50.23],[-67.24,49.51],[-68.51,49.07],[-69.95,47.74],[-71.11,46.82],[-70.26,46.99],[-68.65,48.3],[-66.55,49.13],[-65.06,49.23],[-64.17,48.74],[-65.12,48.07],[-64.8,46.99],[-64.47,46.24],[-63.17,45.74],[-61.52,45.88],[-60.52,47.01],[-60.45,46.28],[-59.8,45.92],[-61.04,45.26],[-63.25,44.67],[-64.25,44.27],[-65.36,43.55],[-66.12,43.62],[-66.16,44.47],[-64.42,45.29],[-66.03,45.26],[-67.14,45.14],[-67.79,45.7],[-67.79,47.07],[-68.23,47.35],[-68.91,47.19],[-69.24,47.45],[-70,46.69],[-70.3,45.91],[-70.66,45.46],[-71.08,45.31],[-71.4,45.25],[-71.51,45.01],[-73.35,45.01],[-74.87,45],[-75.32,44.82],[-76.38,44.1],[-76.5,44.02],[-76.82,43.63],[-77.74,43.63],[-78.72,43.62],[-79.17,43.47],[-79.01,43.27],[-78.92,42.96],[-78.94,42.86],[-80.25,42.37],[-81.28,42.21],[-82.44,41.67],[-82.69,41.67],[-83.03,41.83],[-83.14,41.98],[-83.12,42.08],[-82.9,42.43],[-82.43,42.98],[-82.14,43.57],[-82.34,44.44],[-82.55,45.35],[-83.59,45.82],[-83.47,45.99],[-83.62,46.12],[-83.89,46.12],[-84.09,46.28],[-84.14,46.51],[-84.34,46.41],[-84.61,46.44],[-84.55,46.54],[-84.78,46.64],[-84.88,46.9],[-85.65,47.22],[-86.46,47.55],[-87.44,47.94],[-88.38,48.3],[-89.27,48.02],[-89.6,48.01],[-90.83,48.27],[-91.64,48.14],[-92.61,48.45],[-93.63,48.61],[-94.33,48.67],[-94.64,48.84],[-94.82,49.39],[-95.15,49.38],[-95.16,49],[-97.23,49],[-100.65,49],[-104.05,49],[-107.05,49],[-110.05,49],[-113,49],[-116.05,49],[-117.03,49],[-120,49]]],[[[-83.99,62.45],[-83.25,62.91],[-81.88,62.9],[-81.9,62.71],[-83.07,62.16],[-83.77,62.18]]],[[[-79.77,72.8],[-80.88,73.33],[-80.83,73.69],[-80.35,73.76],[-78.06,73.65],[-76.34,73.1],[-76.25,72.83],[-77.32,72.86],[-78.39,72.88],[-79.49,72.74]]],[[[-80.32,62.09],[-79.93,62.38],[-79.52,62.36],[-79.27,62.16],[-79.66,61.63],[-80.1,61.72],[-80.36,62.02]]],[[[-93.61,74.98],[-94.16,74.59],[-95.61,74.67],[-96.82,74.93],[-96.29,75.38],[-94.85,75.65],[-93.98,75.3]]],[[[-93.84,77.52],[-94.29,77.49],[-96.17,77.56],[-96.44,77.83],[-94.42,77.82],[-93.72,77.63]]],[[[-96.75,78.77],[-95.56,78.42],[-95.83,78.06],[-97.31,77.85],[-98.12,78.08],[-98.55,78.46],[-98.63,78.87],[-97.34,78.83]]],[[[-88.15,74.39],[-89.77,74.52],[-92.42,74.84],[-92.77,75.39],[-92.89,75.88],[-93.89,76.32],[-95.96,76.44],[-97.12,76.75],[-96.75,77.16],[-94.68,77.1],[-93.57,76.78],[-91.6,76.78],[-90.74,76.45],[-90.97,76.07],[-89.82,75.85],[-89.19,75.61],[-87.84,75.57],[-86.38,75.48],[-84.79,75.7],[-82.75,75.78],[-81.13,75.71],[-80.06,75.34],[-79.83,74.92],[-80.46,74.66],[-81.95,74.44],[-83.23,74.56],[-86.1,74.41]]],[[[-111.26,78.15],[-109.85,78],[-110.19,77.7],[-112.05,77.41],[-113.53,77.73],[-112.73,78.05]]],[[[-110.96,78.8],[-109.66,78.6],[-110.88,78.41],[-112.54,78.41],[-112.52,78.55],[-111.5,78.85]]],[[[-55.6,51.32],[-56.13,50.69],[-56.8,49.81],[-56.14,50.15],[-55.47,49.94],[-55.82,49.59],[-54.93,49.31],[-54.47,49.56],[-53.48,49.25],[-53.79,48.52],[-53.09,48.69],[-52.96,48.16],[-52.65,47.54],[-53.07,46.66],[-53.52,46.62],[-54.18,46.81],[-53.96,47.63],[-54.24,47.75],[-55.4,46.88],[-56,46.92],[-55.29,47.39],[-56.25,47.63],[-57.33,47.57],[-59.27,47.6],[-59.42,47.9],[-58.8,48.25],[-59.23,48.52],[-58.39,49.13],[-57.36,50.72],[-56.74,51.29],[-55.87,51.63],[-55.41,51.59]]],[[[-83.88,65.11],[-82.79,64.77],[-81.64,64.45],[-81.55,63.98],[-80.82,64.06],[-80.1,63.73],[-80.99,63.41],[-82.55,63.65],[-83.11,64.1],[-84.1,63.57],[-85.52,63.05],[-85.87,63.64],[-87.22,63.54],[-86.35,64.04],[-86.23,64.82],[-85.88,65.74],[-85.16,65.66],[-84.98,65.22],[-84.46,65.37]]],[[[-78.77,72.35],[-77.82,72.75],[-75.61,72.24],[-74.23,71.77],[-74.1,71.33],[-72.24,71.56],[-71.2,70.92],[-68.79,70.52],[-67.92,70.12],[-66.97,69.19],[-68.81,68.72],[-66.45,68.07],[-64.86,67.85],[-63.42,66.93],[-61.85,66.86],[-62.16,66.16],[-63.92,65],[-65.15,65.43],[-66.72,66.39],[-68.01,66.26],[-68.14,65.69],[-67.09,65.11],[-65.73,64.65],[-65.32,64.38],[-64.67,63.39],[-65.01,62.67],[-66.27,62.95],[-68.78,63.75],[-67.37,62.88],[-66.33,62.28],[-66.17,61.93],[-68.88,62.33],[-71.02,62.91],[-72.24,63.4],[-71.89,63.68],[-73.38,64.19],[-74.84,64.68],[-74.82,64.39],[-77.71,64.23],[-78.55,64.57],[-77.9,65.31],[-76.02,65.33],[-73.96,65.46],[-74.29,65.81],[-73.95,66.31],[-72.65,67.28],[-72.93,67.73],[-73.31,68.07],[-74.84,68.55],[-76.87,68.89],[-76.23,69.15],[-77.29,69.77],[-78.17,69.83],[-78.96,70.17],[-79.49,69.87],[-81.31,69.74],[-84.94,69.97],[-87.06,70.26],[-88.68,70.41],[-89.51,70.76],[-88.47,71.22],[-89.89,71.22],[-90.2,72.24],[-89.44,73.13],[-88.41,73.54],[-85.83,73.8],[-86.56,73.16],[-85.77,72.53],[-84.85,73.34],[-82.32,73.75],[-80.6,72.72],[-80.75,72.06]]],[[[-94.5,74.13],[-92.42,74.1],[-90.51,73.86],[-92,72.97],[-93.2,72.77],[-94.27,72.02],[-95.41,72.06],[-96.03,72.94],[-96.02,73.44],[-95.5,73.86]]],[[[-122.86,76.12],[-121.16,76.86],[-119.11,77.51],[-117.57,77.5],[-116.2,77.65],[-116.34,76.88],[-117.11,76.53],[-118.04,76.48],[-119.9,76.05],[-121.5,75.9]]],[[[-132.71,54.04],[-131.75,54.12],[-132.05,52.98],[-131.18,52.18],[-131.58,52.18],[-132.18,52.64],[-132.55,53.1],[-133.06,53.41],[-133.24,53.85],[-133.18,54.17]]],[[[-105.49,79.3],[-103.53,79.16],[-100.82,78.8],[-100.06,78.33],[-99.67,77.91],[-101.3,78.02],[-102.95,78.34],[-105.18,78.38],[-104.21,78.68],[-105.42,78.92]]],[[[-123.51,48.51],[-124.01,48.37],[-125.65,48.83],[-125.96,49.18],[-126.85,49.53],[-127.03,49.81],[-128.06,50],[-128.44,50.54],[-128.36,50.77],[-127.31,50.55],[-126.69,50.4],[-125.75,50.29],[-125.42,49.95],[-124.92,49.48],[-123.92,49.06]]],[[[-121.54,74.45],[-120.11,74.24],[-117.56,74.19],[-116.59,73.9],[-115.51,73.47],[-116.77,73.22],[-119.22,72.52],[-120.46,71.82],[-120.46,71.38],[-123.09,70.9],[-123.62,71.34],[-125.93,71.87],[-125.5,72.29],[-124.81,73.02],[-123.94,73.68],[-124.92,74.29]]],[[[-107.82,75.85],[-106.93,76.01],[-105.88,75.97],[-105.71,75.48],[-106.31,75],[-109.7,74.85],[-112.22,74.42],[-113.74,74.39],[-113.87,74.72],[-111.79,75.16],[-116.31,75.04],[-117.71,75.22],[-116.35,76.2],[-115.4,76.48],[-112.59,76.14],[-110.81,75.55],[-109.07,75.47],[-110.5,76.43],[-109.58,76.79],[-108.55,76.68],[-108.21,76.2]]],[[[-106.52,73.08],[-105.4,72.67],[-104.77,71.7],[-104.46,70.99],[-102.79,70.5],[-100.98,70.03],[-101.09,69.59],[-102.73,69.5],[-102.09,69.12],[-102.43,68.75],[-104.24,68.91],[-105.96,69.18],[-107.12,69.12],[-109,68.78],[-111.53,68.63],[-113.31,68.54],[-113.86,69.01],[-115.22,69.28],[-116.11,69.17],[-117.34,69.96],[-116.68,70.07],[-115.13,70.24],[-113.72,70.19],[-112.42,70.37],[-114.35,70.6],[-116.49,70.52],[-117.91,70.54],[-118.43,70.91],[-116.11,71.31],[-117.65,71.29],[-119.4,71.56],[-118.56,72.31],[-117.87,72.71],[-115.19,73.31],[-114.17,73.12],[-114.67,72.65],[-112.44,72.95],[-111.05,72.45],[-109.92,72.96],[-109.01,72.63],[-108.19,71.65],[-107.69,72.06],[-108.4,73.09],[-107.52,73.24]]],[[[-100.44,72.71],[-101.54,73.36],[-100.36,73.84],[-99.16,73.63],[-97.38,73.76],[-97.12,73.47],[-98.05,72.99],[-96.54,72.56],[-96.72,71.66],[-98.36,71.27],[-99.32,71.36],[-100.01,71.74],[-102.5,72.51],[-102.48,72.83]]],[[[-106.6,73.6],[-105.26,73.64],[-104.5,73.42],[-105.38,72.76],[-106.94,73.46]]],[[[-98.5,76.72],[-97.74,76.26],[-97.7,75.74],[-98.16,75],[-99.81,74.9],[-100.88,75.06],[-100.86,75.64],[-102.5,75.56],[-102.57,76.34],[-101.49,76.31],[-99.98,76.65],[-98.58,76.59]]],[[[-96.01,80.6],[-95.32,80.91],[-94.3,80.98],[-94.74,81.21],[-92.41,81.26],[-91.13,80.72],[-89.45,80.51],[-87.81,80.32],[-87.02,79.66],[-85.82,79.34],[-87.19,79.04],[-89.03,78.29],[-90.81,78.22],[-92.88,78.34],[-93.95,78.75],[-93.94,79.11],[-93.15,79.38],[-94.97,79.37],[-96.08,79.7],[-96.71,80.16]]],[[[-91.59,81.9],[-90.1,82.08],[-88.93,82.12],[-86.97,82.28],[-85.5,82.65],[-84.26,82.6],[-83.18,82.32],[-82.42,82.86],[-81.1,83.02],[-79.31,83.13],[-76.25,83.17],[-75.72,83.06],[-72.83,83.23],[-70.67,83.17],[-68.5,83.11],[-65.83,83.03],[-63.68,82.9],[-61.85,82.63],[-61.89,82.36],[-64.33,81.93],[-66.75,81.73],[-67.66,81.5],[-65.48,81.51],[-67.84,80.9],[-69.47,80.62],[-71.18,79.8],[-73.24,79.63],[-73.88,79.43],[-76.91,79.32],[-75.53,79.2],[-76.22,79.02],[-75.39,78.53],[-76.34,78.18],[-77.89,77.9],[-78.36,77.51],[-79.76,77.21],[-79.62,76.98],[-77.91,77.02],[-77.89,76.78],[-80.56,76.18],[-83.17,76.45],[-86.11,76.3],[-87.6,76.42],[-89.49,76.47],[-89.62,76.95],[-87.77,77.18],[-88.26,77.9],[-87.65,77.97],[-84.98,77.54],[-86.34,78.18],[-87.96,78.37],[-87.15,78.76],[-85.38,79],[-85.1,79.35],[-86.51,79.74],[-86.93,80.25],[-84.2,80.21],[-83.41,80.1],[-81.85,80.46],[-84.1,80.58],[-87.6,80.52],[-89.37,80.86],[-90.2,81.26],[-91.37,81.55]]],[[[-75.22,67.44],[-75.87,67.15],[-76.99,67.1],[-77.24,67.59],[-76.81,68.15],[-75.89,68.29],[-75.11,68.01],[-75.1,67.58]]],[[[-96.26,69.49],[-95.65,69.11],[-96.27,68.76],[-97.62,69.06],[-98.43,68.95],[-99.8,69.4],[-98.92,69.71],[-98.22,70.14],[-97.16,69.86],[-96.56,69.68]]],[[[-64.52,49.87],[-64.17,49.96],[-62.86,49.71],[-61.84,49.29],[-61.81,49.11],[-62.29,49.09],[-63.59,49.4]]],[[[-64.01,47.04],[-63.66,46.55],[-62.94,46.42],[-62.01,46.44],[-62.51,46.03],[-62.87,45.97],[-64.14,46.39],[-64.39,46.73]]]]},{id:`us`,lon:-99.06,lat:39.5,small:!1,parts:[[[[-122.84,49],[-120,49],[-117.03,49],[-116.05,49],[-113,49],[-110.05,49],[-107.05,49],[-104.05,49],[-100.65,49],[-97.23,49],[-95.16,49],[-95.15,49.38],[-94.82,49.39],[-94.64,48.84],[-94.33,48.67],[-93.63,48.61],[-92.61,48.45],[-91.64,48.14],[-90.83,48.27],[-89.6,48.01],[-89.27,48.02],[-88.38,48.3],[-87.44,47.94],[-86.46,47.55],[-85.65,47.22],[-84.88,46.9],[-84.78,46.64],[-84.55,46.54],[-84.61,46.44],[-84.34,46.41],[-84.14,46.51],[-84.09,46.28],[-83.89,46.12],[-83.62,46.12],[-83.47,45.99],[-83.59,45.82],[-82.55,45.35],[-82.34,44.44],[-82.14,43.57],[-82.43,42.98],[-82.9,42.43],[-83.12,42.08],[-83.14,41.98],[-83.03,41.83],[-82.69,41.67],[-82.44,41.67],[-81.28,42.21],[-80.25,42.37],[-78.94,42.86],[-78.92,42.96],[-79.01,43.27],[-79.17,43.47],[-78.72,43.62],[-77.74,43.63],[-76.82,43.63],[-76.5,44.02],[-76.38,44.1],[-75.32,44.82],[-74.87,45],[-73.35,45.01],[-71.51,45.01],[-71.4,45.25],[-71.08,45.31],[-70.66,45.46],[-70.3,45.91],[-70,46.69],[-69.24,47.45],[-68.91,47.19],[-68.23,47.35],[-67.79,47.07],[-67.79,45.7],[-67.14,45.14],[-66.97,44.81],[-68.03,44.33],[-69.06,43.98],[-70.12,43.68],[-70.65,43.09],[-70.81,42.86],[-70.83,42.33],[-70.49,41.81],[-70.08,41.78],[-70.18,42.15],[-69.89,41.92],[-69.96,41.64],[-70.64,41.48],[-71.12,41.49],[-71.86,41.32],[-72.29,41.27],[-72.88,41.22],[-73.71,40.93],[-72.24,41.12],[-71.94,40.93],[-73.35,40.63],[-73.98,40.63],[-73.95,40.75],[-74.26,40.47],[-73.96,40.43],[-74.18,39.71],[-74.91,38.94],[-74.98,39.2],[-75.2,39.25],[-75.53,39.5],[-75.32,38.96],[-75.07,38.78],[-75.06,38.4],[-75.38,38.02],[-75.94,37.22],[-76.03,37.26],[-75.72,37.94],[-76.23,38.32],[-76.35,39.15],[-76.54,38.72],[-76.33,38.08],[-76.99,38.24],[-76.3,37.92],[-76.26,36.97],[-75.97,36.9],[-75.87,36.55],[-75.73,35.55],[-76.36,34.81],[-77.4,34.51],[-78.05,33.93],[-78.55,33.86],[-79.06,33.49],[-79.2,33.16],[-80.3,32.51],[-80.87,32.03],[-81.34,31.44],[-81.49,30.73],[-81.31,30.04],[-80.98,29.18],[-80.53,28.47],[-80.53,28.04],[-80.06,26.88],[-80.09,26.21],[-80.13,25.82],[-80.38,25.21],[-80.68,25.08],[-81.17,25.2],[-81.33,25.64],[-81.71,25.87],[-82.24,26.73],[-82.71,27.49],[-82.86,27.89],[-82.65,28.55],[-82.93,29.1],[-83.71,29.94],[-84.1,30.09],[-85.11,29.64],[-85.29,29.69],[-85.77,30.15],[-86.4,30.4],[-87.53,30.27],[-88.42,30.39],[-89.18,30.32],[-89.59,30.16],[-89.41,29.89],[-89.43,29.49],[-89.22,29.29],[-89.41,29.16],[-89.78,29.31],[-90.15,29.12],[-90.88,29.15],[-91.63,29.68],[-92.5,29.55],[-93.22,29.78],[-93.85,29.71],[-94.69,29.48],[-95.6,28.74],[-96.59,28.31],[-97.14,27.83],[-97.37,27.38],[-97.38,26.69],[-97.33,26.21],[-97.14,25.87],[-97.53,25.84],[-98.24,26.06],[-99.02,26.37],[-99.3,26.84],[-99.52,27.54],[-100.11,28.11],[-100.46,28.7],[-100.96,29.38],[-101.66,29.78],[-102.48,29.76],[-103.11,28.97],[-103.94,29.27],[-104.46,29.57],[-104.71,30.12],[-105.04,30.64],[-105.63,31.08],[-106.14,31.4],[-106.51,31.75],[-108.24,31.75],[-108.24,31.34],[-109.04,31.34],[-111.02,31.33],[-113.31,32.04],[-114.81,32.52],[-114.72,32.72],[-115.99,32.61],[-117.13,32.53],[-117.29,33.05],[-117.94,33.62],[-118.41,33.74],[-118.52,34.03],[-119.08,34.08],[-119.44,34.35],[-120.37,34.45],[-120.62,34.61],[-120.74,35.16],[-121.72,36.16],[-122.55,37.55],[-122.51,37.78],[-122.95,38.11],[-123.73,38.95],[-123.86,39.77],[-124.4,40.31],[-124.18,41.14],[-124.21,42],[-124.53,42.77],[-124.14,43.71],[-124.02,44.62],[-123.9,45.52],[-124.08,46.86],[-124.4,47.72],[-124.69,48.18],[-124.57,48.38],[-123.12,48.04],[-122.59,47.1],[-122.34,47.36],[-122.5,48.18]]],[[[-155.4,20.08],[-155.22,19.99],[-155.06,19.86],[-154.81,19.51],[-154.83,19.45],[-155.22,19.24],[-155.54,19.08],[-155.69,18.92],[-155.94,19.06],[-155.91,19.34],[-156.07,19.7],[-156.02,19.81],[-155.85,19.98],[-155.92,20.17],[-155.86,20.27],[-155.79,20.25]]],[[[-155.99,20.76],[-156.08,20.64],[-156.42,20.57],[-156.59,20.78],[-156.7,20.86],[-156.71,20.93],[-156.61,21.01],[-156.26,20.92]]],[[[-156.76,21.18],[-156.79,21.07],[-157.33,21.1],[-157.25,21.22]]],[[[-158.03,21.72],[-157.94,21.65],[-157.65,21.32],[-157.71,21.26],[-157.78,21.28],[-158.13,21.31],[-158.25,21.54],[-158.29,21.58]]],[[[-159.36,22.22],[-159.35,21.98],[-159.47,21.88],[-159.8,22.06],[-159.75,22.14],[-159.59,22.24]]],[[[-166.47,60.38],[-165.68,60.29],[-165.58,59.91],[-166.19,59.75],[-166.85,59.94],[-167.45,60.21]]],[[[-153.23,57.97],[-152.56,57.9],[-152.14,57.59],[-153.01,57.12],[-154,56.74],[-154.52,56.99],[-154.67,57.46],[-153.76,57.82]]],[[[-140.99,69.71],[-140.99,66],[-141,60.31],[-140.01,60.28],[-139.04,60],[-138.34,59.56],[-137.45,58.91],[-136.48,59.46],[-135.47,59.79],[-134.95,59.27],[-134.27,58.86],[-133.35,58.41],[-132.73,57.69],[-131.71,56.55],[-130.01,55.92],[-129.98,55.28],[-130.54,54.8],[-131.09,55.18],[-131.97,55.5],[-132.25,56.37],[-133.54,57.18],[-134.08,58.12],[-135.04,58.19],[-136.63,58.21],[-137.8,58.5],[-139.87,59.54],[-140.82,59.73],[-142.57,60.08],[-143.96,60],[-145.93,60.46],[-147.11,60.89],[-148.23,60.67],[-148.02,59.98],[-148.57,59.91],[-149.73,59.71],[-150.61,59.37],[-151.72,59.16],[-151.86,59.74],[-151.41,60.73],[-150.35,61.03],[-150.62,61.28],[-151.89,60.73],[-152.58,60.06],[-154.02,59.35],[-153.29,58.86],[-154.23,58.15],[-155.31,57.73],[-156.31,57.42],[-156.56,56.98],[-158.12,56.46],[-158.43,55.99],[-159.6,55.57],[-160.29,55.64],[-161.22,55.36],[-162.24,55.02],[-163.07,54.69],[-164.79,54.4],[-164.94,54.57],[-163.85,55.04],[-162.87,55.35],[-161.81,55.9],[-160.56,56.01],[-160.07,56.42],[-158.68,57.02],[-158.46,57.22],[-157.72,57.57],[-157.55,58.33],[-157.04,58.92],[-158.19,58.62],[-158.52,58.79],[-159.06,58.42],[-159.71,58.93],[-159.98,58.57],[-160.35,59.07],[-161.36,58.67],[-161.97,58.67],[-162.05,59.27],[-161.87,59.63],[-162.52,59.99],[-163.82,59.8],[-164.66,60.27],[-165.35,60.51],[-165.35,61.07],[-166.12,61.5],[-165.73,62.08],[-164.92,62.63],[-164.56,63.15],[-163.75,63.22],[-163.07,63.06],[-162.26,63.54],[-161.54,63.46],[-160.77,63.77],[-160.96,64.22],[-161.52,64.4],[-160.78,64.79],[-161.39,64.78],[-162.45,64.56],[-162.76,64.34],[-163.55,64.56],[-164.96,64.45],[-166.42,64.69],[-166.85,65.09],[-168.11,65.67],[-166.71,66.09],[-164.47,66.58],[-163.65,66.58],[-163.79,66.08],[-161.68,66.12],[-162.49,66.73],[-163.72,67.12],[-164.43,67.62],[-165.39,68.04],[-166.76,68.36],[-166.2,68.88],[-164.43,68.91],[-163.17,69.37],[-162.93,69.86],[-161.91,70.33],[-160.93,70.45],[-159.04,70.89],[-158.12,70.82],[-156.58,71.36],[-155.07,71.15],[-154.34,70.7],[-153.9,70.89],[-152.21,70.83],[-152.27,70.6],[-150.74,70.43],[-149.72,70.53],[-147.61,70.21],[-145.69,70.12],[-144.92,69.99],[-143.59,70.15],[-142.07,69.85]]],[[[-171.73,63.78],[-171.12,63.59],[-170.49,63.69],[-169.68,63.43],[-168.69,63.3],[-168.77,63.19],[-169.53,62.98],[-170.29,63.19],[-170.67,63.38],[-171.55,63.32],[-171.79,63.41]]]]},{id:`kz`,lon:67.28,lat:48.19,small:!1,parts:[[[[87.36,49.22],[86.6,48.55],[85.77,48.46],[85.72,47.45],[85.16,47],[83.18,47.33],[82.46,45.54],[81.95,45.32],[79.97,44.92],[80.87,43.18],[80.18,42.92],[80.26,42.35],[79.65,42.5],[79.14,42.86],[77.66,42.96],[76,42.99],[75.64,42.88],[74.21,43.3],[73.64,43.09],[73.49,42.5],[71.84,42.85],[71.19,42.7],[70.96,42.27],[70.39,42.08],[69.07,41.38],[68.63,40.67],[68.26,40.66],[67.98,41.14],[66.71,41.17],[66.51,41.99],[66.02,41.99],[66.1,43],[64.9,43.73],[63.19,43.65],[62.01,43.5],[61.06,44.41],[60.24,44.78],[58.69,45.5],[58.5,45.59],[55.93,45],[55.97,41.31],[55.46,41.26],[54.75,42.04],[54.08,42.32],[52.94,42.12],[52.5,41.78],[52.45,42.03],[52.69,42.44],[52.5,42.79],[51.34,43.13],[50.89,44.03],[50.34,44.28],[50.31,44.61],[51.28,44.51],[51.32,45.25],[52.17,45.41],[53.04,45.26],[53.22,46.23],[53.04,46.85],[52.04,46.8],[51.19,47.05],[50.04,46.61],[49.1,46.4],[48.59,46.56],[48.7,47.08],[48.06,47.74],[47.31,47.72],[46.47,48.39],[47.04,49.15],[46.75,49.36],[47.55,50.45],[48.58,49.88],[48.7,50.6],[50.77,51.69],[52.33,51.72],[54.53,51.03],[55.72,50.62],[56.78,51.04],[58.36,51.06],[59.64,50.55],[59.93,50.84],[61.34,50.8],[61.59,51.27],[59.97,51.96],[60.93,52.45],[60.74,52.72],[61.7,52.98],[60.98,53.66],[61.44,54.01],[65.18,54.35],[65.67,54.6],[68.17,54.97],[69.07,55.38],[70.86,55.17],[71.18,54.13],[72.23,54.38],[73.51,54.04],[73.42,53.49],[74.39,53.55],[76.89,54.49],[76.52,54.18],[77.8,53.4],[80.03,50.87],[80.57,51.39],[81.95,50.81],[83.38,51.07],[83.94,50.89],[84.42,50.31],[85.11,50.12],[85.54,49.69],[86.83,49.83]]]]},{id:`uz`,lon:63.2,lat:41.75,small:!1,parts:[[[[55.97,41.31],[55.93,45],[58.5,45.59],[58.69,45.5],[60.24,44.78],[61.06,44.41],[62.01,43.5],[63.19,43.65],[64.9,43.73],[66.1,43],[66.02,41.99],[66.51,41.99],[66.71,41.17],[67.98,41.14],[68.26,40.66],[68.63,40.67],[69.07,41.38],[70.39,42.08],[70.96,42.27],[71.26,42.17],[70.42,41.52],[71.16,41.14],[71.87,41.39],[73.05,40.87],[71.78,40.15],[71.01,40.24],[70.6,40.22],[70.46,40.5],[70.67,40.96],[69.33,40.73],[69.01,40.09],[68.54,39.53],[67.7,39.58],[67.44,39.14],[68.18,38.9],[68.39,38.16],[67.83,37.15],[67.07,37.36],[66.52,37.36],[66.54,37.97],[65.22,38.4],[64.17,38.89],[63.52,39.36],[62.38,40.05],[61.88,41.08],[61.55,41.27],[60.46,41.22],[60.08,41.43],[59.97,42.22],[58.63,42.75],[57.79,42.17],[56.93,41.83],[57.09,41.32]]]]},{id:`pg`,lon:144.33,lat:-6.65,small:!1,parts:[[[[141,-2.6],[142.74,-3.29],[144.58,-3.86],[145.27,-4.37],[145.83,-4.88],[145.98,-5.47],[147.65,-6.08],[147.89,-6.61],[146.97,-6.72],[147.19,-7.39],[148.09,-8.04],[148.73,-9.11],[149.31,-9.07],[149.27,-9.51],[150.04,-9.68],[149.74,-9.87],[150.8,-10.29],[150.69,-10.58],[150.03,-10.65],[149.78,-10.39],[148.92,-10.28],[147.91,-10.13],[147.14,-9.49],[146.57,-8.94],[146.05,-8.07],[144.74,-7.63],[143.9,-7.92],[143.29,-8.25],[143.41,-8.98],[142.63,-9.33],[142.07,-9.16],[141.03,-9.12],[141.02,-5.86]]],[[[152.64,-3.66],[153.02,-3.98],[153.14,-4.5],[152.83,-4.77],[152.64,-4.18],[152.41,-3.79],[151.95,-3.46],[151.38,-3.04],[150.66,-2.74],[150.94,-2.5],[151.48,-2.78],[151.82,-3],[152.24,-3.24]]],[[[151.3,-5.84],[150.75,-6.08],[150.24,-6.32],[149.71,-6.32],[148.89,-6.03],[148.32,-5.75],[148.4,-5.44],[149.3,-5.58],[149.85,-5.51],[150,-5.03],[150.14,-5],[150.24,-5.53],[150.81,-5.46],[151.09,-5.11],[151.65,-4.76],[151.54,-4.17],[152.14,-4.15],[152.34,-4.31],[152.32,-4.87],[151.98,-5.48],[151.46,-5.56]]],[[[154.76,-5.34],[155.06,-5.57],[155.55,-6.2],[156.02,-6.54],[155.88,-6.82],[155.6,-6.92],[155.17,-6.54],[154.73,-5.9],[154.52,-5.14],[154.65,-5.04]]]]},{id:`id`,lon:114.02,lat:-.25,small:!1,parts:[[[[141,-2.6],[141.02,-5.86],[141.03,-9.12],[140.14,-8.3],[139.13,-8.1],[138.88,-8.38],[137.61,-8.41],[138.04,-7.6],[138.67,-7.32],[138.41,-6.23],[137.93,-5.39],[135.99,-4.55],[135.17,-4.46],[133.66,-3.54],[133.37,-4.02],[132.98,-4.11],[132.76,-3.75],[132.75,-3.31],[131.99,-2.82],[133.07,-2.46],[133.78,-2.48],[133.7,-2.21],[132.23,-2.21],[131.84,-1.62],[130.94,-1.43],[130.52,-.94],[131.87,-.7],[132.38,-.37],[133.98,-.78],[134.14,-1.15],[134.42,-2.77],[135.46,-3.37],[136.29,-2.31],[137.44,-1.7],[138.33,-1.7],[139.19,-2.05],[139.93,-2.41]]],[[[124.97,-8.89],[125.07,-9.09],[125.09,-9.39],[124.44,-10.14],[123.58,-10.36],[123.46,-10.24],[123.55,-9.9],[123.98,-9.29]]],[[[134.21,-6.89],[134.11,-6.14],[134.29,-5.78],[134.5,-5.44],[134.73,-5.74],[134.73,-6.21]]],[[[117.88,4.14],[117.31,3.24],[118.05,2.29],[117.87,1.83],[119,.9],[117.81,.78],[117.48,.1],[117.52,-.8],[116.56,-1.49],[116.53,-2.48],[116.15,-4.01],[116,-3.66],[114.86,-4.11],[114.47,-3.5],[113.76,-3.44],[113.26,-3.12],[112.07,-3.48],[111.7,-3],[111.05,-3.05],[110.22,-2.93],[110.07,-1.59],[109.57,-1.31],[109.09,-.46],[108.95,.42],[109.07,1.34],[109.66,2.01],[109.83,1.34],[110.52,.77],[111.16,.98],[111.8,.9],[112.38,1.41],[112.86,1.5],[113.81,1.22],[114.62,1.43],[115.13,2.82],[115.52,3.17],[115.87,4.31],[117.01,4.31]]],[[[129.37,-2.8],[130.47,-3.09],[130.83,-3.86],[129.99,-3.45],[129.16,-3.36],[128.59,-3.43],[127.9,-3.39],[128.13,-2.84]]],[[[126.87,-3.79],[126.18,-3.61],[125.99,-3.18],[127,-3.13],[127.25,-3.46]]],[[[127.93,2.17],[128,1.63],[128.6,1.54],[128.69,1.13],[128.63,.26],[128.12,.36],[127.97,-.25],[128.38,-.78],[128.1,-.9],[127.7,-.27],[127.4,1.01],[127.6,1.81]]],[[[122.93,.88],[124.08,.92],[125.07,1.64],[125.24,1.42],[124.44,.43],[123.68,.24],[122.72,.43],[121.06,.38],[120.18,.24],[120.04,-.52],[120.93,-1.41],[121.47,-.96],[123.34,-.62],[123.26,-1.08],[122.82,-.93],[122.39,-1.52],[121.51,-1.91],[122.45,-3.19],[122.27,-3.53],[123.17,-4.68],[123.16,-5.34],[122.63,-5.63],[122.24,-5.28],[122.72,-4.46],[121.74,-4.85],[121.49,-4.57],[121.62,-4.19],[120.9,-3.6],[120.97,-2.63],[120.3,-2.93],[120.39,-4.1],[120.43,-5.53],[119.8,-5.67],[119.37,-5.38],[119.65,-4.46],[119.5,-3.49],[119.08,-3.49],[118.77,-2.8],[119.18,-2.15],[119.32,-1.35],[119.83,.15],[120.03,.57],[120.89,1.31],[121.67,1.01]]],[[[120.29,-10.26],[118.97,-9.56],[119.9,-9.36],[120.43,-9.67],[120.78,-9.97],[120.71,-10.24]]],[[[121.34,-8.54],[122.01,-8.46],[122.9,-8.09],[122.76,-8.65],[121.25,-8.93],[119.92,-8.81],[119.92,-8.45],[120.71,-8.24]]],[[[118.26,-8.36],[118.88,-8.28],[119.13,-8.71],[117.97,-8.91],[117.28,-9.04],[116.74,-9.03],[117.08,-8.46],[117.63,-8.45],[117.9,-8.09]]],[[[108.49,-6.42],[108.62,-6.78],[110.54,-6.88],[110.76,-6.46],[112.61,-6.95],[112.98,-7.59],[114.48,-7.78],[115.71,-8.37],[114.57,-8.75],[113.46,-8.35],[112.56,-8.38],[111.52,-8.3],[110.59,-8.12],[109.43,-7.74],[108.69,-7.64],[108.28,-7.77],[106.45,-7.36],[106.28,-6.93],[105.36,-6.85],[106.05,-5.9],[107.26,-5.96],[108.07,-6.35]]],[[[104.37,-1.08],[104.54,-1.78],[104.89,-2.34],[105.62,-2.43],[106.11,-3.06],[105.86,-4.31],[105.82,-5.85],[104.71,-5.87],[103.87,-5.04],[102.58,-4.22],[102.16,-3.61],[101.4,-2.8],[100.9,-2.05],[100.14,-.65],[99.26,.18],[98.97,1.04],[98.6,1.82],[97.7,2.45],[97.18,3.31],[96.43,3.87],[95.38,4.97],[95.29,5.48],[95.94,5.44],[97.48,5.25],[98.37,4.27],[99.14,3.59],[99.69,3.17],[100.64,2.1],[101.66,2.08],[102.5,1.4],[103.08,.56],[103.84,.1],[103.44,-.71],[104.01,-1.06]]]]},{id:`ar`,lon:-65.15,lat:-35.22,small:!1,parts:[[[[-68.63,-52.64],[-68.25,-53.1],[-67.75,-53.85],[-66.45,-54.45],[-65.05,-54.7],[-65.5,-55.2],[-66.45,-55.25],[-66.96,-54.9],[-67.56,-54.87],[-68.63,-54.87]]],[[[-57.62,-30.22],[-57.88,-31.02],[-58.14,-32.04],[-58.13,-33.04],[-58.35,-33.26],[-58.43,-33.91],[-58.5,-34.43],[-57.22,-35.29],[-57.36,-35.98],[-56.74,-36.41],[-56.79,-36.9],[-57.75,-38.18],[-59.23,-38.72],[-61.24,-38.93],[-62.34,-38.83],[-62.12,-39.42],[-62.33,-40.17],[-62.15,-40.68],[-62.75,-41.03],[-63.77,-41.17],[-64.73,-40.8],[-65.12,-41.06],[-64.98,-42.06],[-64.3,-42.36],[-63.75,-42.04],[-63.46,-42.56],[-64.38,-42.87],[-65.18,-43.49],[-65.33,-44.5],[-65.57,-45.04],[-66.51,-45.04],[-67.29,-45.55],[-67.58,-46.3],[-66.6,-47.03],[-65.64,-47.24],[-65.99,-48.13],[-67.17,-48.7],[-67.82,-49.87],[-68.73,-50.27],[-69.14,-50.73],[-68.82,-51.77],[-68.15,-52.35],[-68.57,-52.3],[-69.5,-52.14],[-71.92,-52.01],[-72.33,-51.43],[-72.31,-50.68],[-72.97,-50.74],[-73.33,-50.38],[-73.41,-49.32],[-72.65,-48.88],[-72.33,-48.24],[-72.45,-47.74],[-71.92,-46.88],[-71.55,-45.56],[-71.66,-44.97],[-71.22,-44.78],[-71.33,-44.41],[-71.79,-44.21],[-71.46,-43.79],[-71.92,-43.41],[-72.15,-42.25],[-71.75,-42.05],[-71.92,-40.83],[-71.68,-39.81],[-71.41,-38.92],[-70.81,-38.55],[-71.12,-37.58],[-71.12,-36.66],[-70.36,-36.01],[-70.39,-35.17],[-69.82,-34.19],[-69.81,-33.27],[-70.07,-33.09],[-70.53,-31.36],[-69.92,-30.34],[-70.02,-29.37],[-69.66,-28.46],[-69,-27.52],[-68.29,-26.9],[-68.59,-26.51],[-68.38,-26.18],[-68.42,-24.52],[-67.33,-24.03],[-66.98,-22.99],[-67.11,-22.74],[-66.27,-21.83],[-64.96,-22.08],[-64.38,-22.8],[-63.99,-21.99],[-62.85,-22.03],[-62.69,-22.25],[-60.85,-23.88],[-60.03,-24.03],[-58.81,-24.77],[-57.78,-25.16],[-57.63,-25.6],[-58.62,-27.12],[-57.61,-27.4],[-56.49,-27.55],[-55.69,-27.39],[-54.79,-26.62],[-54.63,-25.74],[-54.13,-25.55],[-53.63,-26.12],[-53.65,-26.92],[-54.49,-27.47],[-55.16,-27.88],[-56.29,-28.85]]]]},{id:`cl`,lon:-71.67,lat:-37.35,small:!1,parts:[[[[-68.63,-52.64],[-68.63,-54.87],[-67.56,-54.87],[-66.96,-54.9],[-67.29,-55.3],[-68.15,-55.61],[-68.64,-55.58],[-69.23,-55.5],[-69.96,-55.2],[-71.01,-55.05],[-72.27,-54.49],[-73.28,-53.96],[-74.66,-52.84],[-73.84,-53.05],[-72.43,-53.72],[-71.11,-54.07],[-70.59,-53.62],[-70.27,-52.93],[-69.35,-52.52]]],[[[-69.59,-17.58],[-69.1,-18.26],[-68.97,-18.98],[-68.44,-19.4],[-68.76,-20.37],[-68.22,-21.49],[-67.83,-22.87],[-67.11,-22.74],[-66.98,-22.99],[-67.33,-24.03],[-68.42,-24.52],[-68.38,-26.18],[-68.59,-26.51],[-68.29,-26.9],[-69,-27.52],[-69.66,-28.46],[-70.02,-29.37],[-69.92,-30.34],[-70.53,-31.36],[-70.07,-33.09],[-69.81,-33.27],[-69.82,-34.19],[-70.39,-35.17],[-70.36,-36.01],[-71.12,-36.66],[-71.12,-37.58],[-70.81,-38.55],[-71.41,-38.92],[-71.68,-39.81],[-71.92,-40.83],[-71.75,-42.05],[-72.15,-42.25],[-71.92,-43.41],[-71.46,-43.79],[-71.79,-44.21],[-71.33,-44.41],[-71.22,-44.78],[-71.66,-44.97],[-71.55,-45.56],[-71.92,-46.88],[-72.45,-47.74],[-72.33,-48.24],[-72.65,-48.88],[-73.41,-49.32],[-73.33,-50.38],[-72.97,-50.74],[-72.31,-50.68],[-72.33,-51.43],[-71.92,-52.01],[-69.5,-52.14],[-68.57,-52.3],[-69.46,-52.29],[-69.94,-52.54],[-70.84,-52.9],[-71.01,-53.83],[-71.43,-53.86],[-72.56,-53.53],[-73.7,-52.83],[-74.95,-52.26],[-75.26,-51.63],[-74.98,-51.04],[-75.48,-50.38],[-75.61,-48.67],[-75.18,-47.71],[-74.13,-46.94],[-75.65,-46.65],[-74.69,-45.76],[-74.35,-44.1],[-73.24,-44.45],[-72.72,-42.38],[-73.39,-42.12],[-73.7,-43.37],[-74.33,-43.23],[-74.02,-41.8],[-73.68,-39.94],[-73.22,-39.26],[-73.51,-38.28],[-73.59,-37.16],[-73.17,-37.12],[-72.55,-35.51],[-71.86,-33.91],[-71.44,-32.42],[-71.67,-30.92],[-71.37,-30.1],[-71.49,-28.86],[-70.9,-27.64],[-70.72,-25.71],[-70.4,-23.63],[-70.09,-21.39],[-70.16,-19.76],[-70.37,-18.35],[-69.86,-18.09]]]]},{id:`cd`,lon:23.58,lat:-2.85,small:!1,parts:[[[[29.34,-4.5],[29.52,-5.42],[29.42,-5.94],[29.62,-6.52],[30.2,-7.08],[30.74,-8.34],[30.35,-8.24],[29,-8.41],[28.73,-8.53],[28.45,-9.16],[28.67,-9.61],[28.5,-10.79],[28.37,-11.79],[28.64,-11.97],[29.34,-12.36],[29.62,-12.18],[29.7,-13.26],[28.94,-13.25],[28.52,-12.7],[28.15,-12.27],[27.39,-12.13],[27.16,-11.61],[26.55,-11.93],[25.75,-11.78],[25.42,-11.33],[24.78,-11.24],[24.31,-11.26],[24.26,-10.95],[23.91,-10.93],[23.46,-10.87],[22.84,-11.02],[22.4,-10.99],[22.16,-11.08],[22.21,-9.89],[21.88,-9.52],[21.8,-8.91],[21.95,-8.31],[21.75,-7.92],[21.73,-7.29],[20.51,-7.3],[20.6,-6.94],[20.09,-6.94],[20.04,-7.12],[19.42,-7.16],[19.17,-7.74],[19.02,-7.99],[18.46,-7.85],[18.14,-7.99],[17.47,-8.07],[17.09,-7.54],[16.86,-7.22],[16.57,-6.62],[16.33,-5.88],[13.38,-5.86],[13.02,-5.98],[12.74,-5.97],[12.32,-6.1],[12.18,-5.79],[12.44,-5.68],[12.47,-5.25],[12.63,-4.99],[12.99,-4.78],[13.26,-4.88],[13.6,-4.5],[14.15,-4.51],[14.21,-4.79],[14.58,-4.97],[15.17,-4.34],[15.75,-3.86],[16.01,-3.54],[15.97,-2.71],[16.41,-1.74],[16.86,-1.23],[17.52,-.74],[17.64,-.42],[17.66,-.06],[17.83,.29],[17.78,.86],[17.9,1.74],[18.1,2.37],[18.39,2.9],[18.45,3.5],[18.54,4.2],[18.93,4.71],[19.47,5.03],[20.29,4.69],[20.93,4.32],[21.66,4.22],[22.4,4.03],[22.7,4.63],[22.84,4.71],[23.3,4.61],[24.41,5.11],[24.81,4.9],[25.13,4.93],[25.28,5.17],[25.65,5.26],[26.4,5.15],[27.05,5.13],[27.37,5.23],[27.98,4.41],[28.43,4.29],[28.7,4.46],[29.16,4.39],[29.72,4.6],[29.95,4.17],[30.83,3.51],[30.77,2.34],[31.17,2.2],[30.85,1.85],[30.47,1.58],[30.09,1.06],[29.87,.6],[29.82,-.21],[29.59,-.59],[29.58,-1.34],[29.29,-1.62],[29.26,-2.21],[29.12,-2.29],[29.03,-2.84],[29.28,-3.29]]]]},{id:`so`,lon:45.72,lat:4.75,small:!1,parts:[[[[41.59,-1.68],[40.99,-.86],[40.98,2.78],[41.86,3.92],[42.13,4.23],[42.77,4.25],[43.66,4.96],[44.96,5],[47.79,8],[48.49,8.84],[48.94,9.45],[48.94,9.97],[48.94,10.98],[48.94,11.39],[48.95,11.41],[49.27,11.43],[49.73,11.58],[50.26,11.68],[50.73,12.02],[51.11,12.02],[51.13,11.75],[51.04,11.17],[51.05,10.64],[50.83,10.28],[50.55,9.2],[50.07,8.08],[49.45,6.8],[48.6,5.34],[47.74,4.22],[46.56,2.86],[45.56,2.05],[44.07,1.05],[43.14,.29],[42.04,-.92],[41.81,-1.45]]]]},{id:`ke`,lon:37.79,lat:.6,small:!1,parts:[[[[39.2,-4.68],[37.77,-3.68],[37.7,-3.1],[34.07,-1.06],[33.9,-.95],[33.89,.11],[34.18,.52],[34.67,1.18],[35.04,1.91],[34.59,3.05],[34.48,3.55],[34,4.25],[34.62,4.85],[35.3,5.51],[35.82,5.34],[35.82,4.78],[36.16,4.45],[36.86,4.45],[38.12,3.6],[38.44,3.59],[38.67,3.62],[38.89,3.5],[39.56,3.42],[39.85,3.84],[40.77,4.26],[41.17,3.92],[41.86,3.92],[40.98,2.78],[40.99,-.86],[41.59,-1.68],[40.88,-2.08],[40.64,-2.5],[40.26,-2.57],[40.12,-3.28],[39.8,-3.68],[39.61,-4.35]]]]},{id:`sd`,lon:29.86,lat:15.99,small:!1,parts:[[[[24.57,8.23],[23.81,8.67],[23.46,8.95],[23.39,9.27],[23.56,9.68],[23.55,10.09],[22.98,10.71],[22.87,11.14],[22.88,11.38],[22.51,11.68],[22.5,12.26],[22.29,12.65],[21.94,12.59],[22.04,12.96],[22.3,13.37],[22.18,13.79],[22.51,14.09],[22.3,14.33],[22.57,14.94],[23.02,15.68],[23.89,15.61],[23.84,19.58],[23.85,20],[25,20],[25,22],[29.02,22],[32.9,22],[36.87,22],[37.19,21.02],[36.97,20.84],[37.11,19.81],[37.48,18.61],[37.86,18.37],[38.41,18],[37.9,17.43],[37.17,17.26],[36.85,16.96],[36.75,16.29],[36.32,14.82],[36.43,14.42],[36.27,13.56],[35.87,12.58],[35.26,12.08],[34.83,11.32],[34.73,10.91],[34.26,10.63],[33.96,9.58],[33.98,8.69],[33.96,9.46],[33.82,9.48],[33.84,9.98],[33.72,10.33],[33.21,10.72],[33.09,11.44],[33.21,12.18],[32.74,12.25],[32.68,12.02],[32.07,11.97],[32.32,11.68],[32.4,11.08],[31.85,10.53],[31.35,9.81],[30.84,9.71],[30,10.29],[29.62,10.08],[29.51,9.79],[29,9.6],[28.97,9.4],[27.97,9.4],[27.83,9.6],[27.11,9.64],[26.75,9.47],[26.48,9.55],[25.96,10.14],[25.79,10.41],[25.07,10.27],[24.8,9.81],[24.54,8.92],[24.19,8.73],[23.89,8.62]]]]},{id:`td`,lon:18.58,lat:15.33,small:!1,parts:[[[[23.84,19.58],[23.89,15.61],[23.02,15.68],[22.57,14.94],[22.3,14.33],[22.51,14.09],[22.18,13.79],[22.3,13.37],[22.04,12.96],[21.94,12.59],[22.29,12.65],[22.5,12.26],[22.51,11.68],[22.88,11.38],[22.87,11.14],[22.23,10.97],[21.72,10.57],[21,9.48],[20.06,9.01],[19.09,9.07],[18.81,8.98],[18.91,8.63],[18.39,8.28],[17.97,7.89],[16.71,7.51],[16.46,7.74],[16.29,7.75],[16.1,7.5],[15.28,7.42],[15.44,7.69],[15.12,8.38],[14.98,8.8],[14.55,8.97],[13.96,9.55],[14.17,10.02],[14.63,9.92],[14.91,9.99],[15.47,9.98],[14.92,10.89],[14.96,11.56],[14.9,12.22],[14.5,12.86],[14.6,13.33],[13.96,13.35],[13.96,14],[13.54,14.37],[13.97,15.68],[15.25,16.63],[15.3,17.93],[15.69,19.96],[15.9,20.39],[15.49,20.73],[15.47,21.05],[15.1,21.31],[14.85,22.86],[15.86,23.41],[19.85,21.49]]]]},{id:`ht`,lon:-72.66,lat:18.9,small:!0,parts:[[[[-71.71,19.71],[-71.62,19.17],[-71.7,18.78],[-71.94,18.62],[-71.69,18.32],[-71.71,18.04],[-72.37,18.21],[-72.84,18.14],[-73.45,18.22],[-73.92,18.03],[-74.46,18.34],[-74.37,18.66],[-73.45,18.53],[-72.69,18.45],[-72.33,18.67],[-72.79,19.1],[-72.78,19.48],[-73.41,19.64],[-73.19,19.92],[-72.58,19.87]]]]},{id:`do`,lon:-70.46,lat:18.88,small:!0,parts:[[[[-71.71,18.04],[-71.69,18.32],[-71.94,18.62],[-71.7,18.78],[-71.62,19.17],[-71.71,19.71],[-71.59,19.88],[-70.81,19.88],[-70.21,19.62],[-69.95,19.65],[-69.77,19.29],[-69.22,19.31],[-69.26,19.01],[-68.81,18.98],[-68.32,18.61],[-68.69,18.21],[-69.17,18.42],[-69.62,18.38],[-69.95,18.43],[-70.13,18.25],[-70.52,18.18],[-70.67,18.43],[-71,18.28],[-71.4,17.6],[-71.66,17.76]]]]},{id:`ru`,lon:99.89,lat:61.73,small:!1,parts:[[[[93.78,81.03],[95.94,81.25],[97.88,80.75],[100.19,79.78],[99.94,78.88],[97.76,78.76],[94.97,79.04],[93.31,79.43],[92.54,80.14],[91.18,80.34]]],[[[102.84,79.28],[105.37,78.71],[105.08,78.31],[99.44,77.92],[101.26,79.23],[102.09,79.35]]],[[[138.83,76.14],[141.47,76.09],[145.09,75.56],[144.3,74.82],[140.62,74.85],[138.96,74.61],[136.98,75.26],[137.51,75.95]]],[[[148.22,75.35],[150.73,75.08],[149.58,74.69],[147.98,74.78],[146.12,75.17],[146.36,75.5]]],[[[139.86,73.37],[140.81,73.77],[142.06,73.86],[143.48,73.47],[143.6,73.21],[142.09,73.21],[140.04,73.32]]],[[[44.85,80.59],[46.8,80.77],[48.32,80.78],[48.52,80.51],[49.1,80.75],[50.04,80.92],[51.52,80.7],[51.14,80.55],[49.79,80.42],[48.89,80.34],[48.75,80.18],[47.59,80.01],[46.5,80.25],[47.07,80.56]]],[[[22.73,54.33],[20.89,54.31],[19.66,54.43],[19.89,54.87],[21.27,55.19],[22.31,55.02],[22.76,54.86],[22.65,54.58]]],[[[53.51,73.75],[55.9,74.63],[55.63,75.08],[57.87,75.61],[61.17,76.25],[64.5,76.44],[66.21,76.81],[68.16,76.94],[68.85,76.54],[68.18,76.23],[64.64,75.74],[61.58,75.26],[58.48,74.31],[56.99,73.33],[55.42,72.37],[55.62,71.54],[57.53,70.72],[56.94,70.63],[53.68,70.76],[53.41,71.21],[51.6,71.47],[51.46,72.02],[52.48,72.23],[52.44,72.78],[54.43,73.63]]],[[[142.92,53.7],[143.26,52.74],[143.24,51.76],[143.65,50.75],[144.65,48.98],[143.18,49.31],[142.56,47.86],[143.54,46.84],[143.51,46.14],[142.75,46.74],[142.09,45.97],[141.91,46.81],[142.02,47.78],[141.9,48.86],[142.13,49.61],[142.18,50.95],[141.59,51.94],[141.68,53.3],[142.61,53.76],[142.21,54.23],[142.65,54.37]]],[[[130.78,42.22],[130.64,42.4],[130.63,42.9],[131.14,42.93],[131.29,44.11],[131.03,44.97],[131.88,45.32],[133.1,45.14],[133.77,46.12],[134.11,47.21],[134.5,47.58],[135.02,48.48],[133.37,48.18],[132.51,47.79],[130.99,47.79],[130.58,48.73],[129.4,49.44],[127.66,49.76],[127.29,50.74],[126.94,51.35],[126.56,51.78],[125.95,52.79],[125.07,53.16],[123.57,53.46],[122.24,53.43],[121,53.25],[120.18,52.75],[120.73,52.52],[120.74,51.96],[120.18,51.64],[119.28,50.58],[119.29,50.14],[117.88,49.51],[116.68,49.89],[115.49,49.81],[114.96,50.14],[114.36,50.25],[112.9,49.54],[111.58,49.38],[110.66,49.13],[109.4,49.29],[108.47,49.28],[107.87,49.79],[106.89,50.27],[105.89,50.41],[104.62,50.27],[103.68,50.09],[102.26,50.51],[102.07,51.26],[100.89,51.52],[99.98,51.63],[98.86,52.05],[97.83,51.01],[98.23,50.42],[97.26,49.73],[95.81,49.98],[94.82,50.01],[94.15,50.48],[93.11,50.49],[92.23,50.8],[90.71,50.33],[88.8,49.47],[87.75,49.3],[87.36,49.22],[86.83,49.83],[85.54,49.69],[85.11,50.12],[84.42,50.31],[83.94,50.89],[83.38,51.07],[81.95,50.81],[80.57,51.39],[80.03,50.87],[77.8,53.4],[76.52,54.18],[76.89,54.49],[74.39,53.55],[73.42,53.49],[73.51,54.04],[72.23,54.38],[71.18,54.13],[70.86,55.17],[69.07,55.38],[68.17,54.97],[65.67,54.6],[65.18,54.35],[61.44,54.01],[60.98,53.66],[61.7,52.98],[60.74,52.72],[60.93,52.45],[59.97,51.96],[61.59,51.27],[61.34,50.8],[59.93,50.84],[59.64,50.55],[58.36,51.06],[56.78,51.04],[55.72,50.62],[54.53,51.03],[52.33,51.72],[50.77,51.69],[48.7,50.6],[48.58,49.88],[47.55,50.45],[46.75,49.36],[47.04,49.15],[46.47,48.39],[47.31,47.72],[48.06,47.74],[48.7,47.08],[48.59,46.56],[49.1,46.4],[48.65,45.81],[47.68,45.64],[46.68,44.61],[47.59,43.66],[47.49,42.99],[48.58,41.81],[47.99,41.41],[47.81,41.15],[47.37,41.22],[46.69,41.83],[46.41,41.86],[45.78,42.09],[45.47,42.5],[44.54,42.71],[43.93,42.55],[43.76,42.74],[42.4,43.22],[40.92,43.38],[40.08,43.55],[39.95,43.44],[38.68,44.28],[37.54,44.66],[36.68,45.24],[37.4,45.41],[38.23,46.24],[37.67,46.64],[39.15,47.05],[39.12,47.26],[38.22,47.1],[38.26,47.55],[38.77,47.83],[39.74,47.9],[39.9,48.23],[39.67,48.78],[40.08,49.31],[40.07,49.6],[38.59,49.93],[38.01,49.92],[37.39,50.38],[36.62,50.23],[35.36,50.58],[35.38,50.77],[35.02,51.21],[34.22,51.26],[34.14,51.57],[34.39,51.77],[33.75,52.33],[32.72,52.24],[32.41,52.29],[32.16,52.06],[31.79,52.1],[31.54,52.74],[31.3,53.07],[31.5,53.17],[32.3,53.13],[32.69,53.35],[32.41,53.62],[31.73,53.79],[31.79,53.97],[31.38,54.16],[30.76,54.81],[30.97,55.08],[30.88,55.55],[29.9,55.79],[29.37,55.67],[29.23,55.92],[28.18,56.17],[27.86,56.76],[27.77,57.24],[27.29,57.47],[27.72,57.79],[27.42,58.72],[28.13,59.3],[27.98,59.48],[29.12,60.03],[28.07,60.5],[30.21,61.78],[31.14,62.36],[31.52,62.87],[30.04,63.55],[30.44,64.2],[29.54,64.95],[30.22,65.81],[29.05,66.94],[29.98,67.7],[28.45,68.36],[28.59,69.07],[29.4,69.16],[31.1,69.56],[32.13,69.91],[33.77,69.3],[36.51,69.06],[40.29,67.93],[41.06,67.46],[41.13,66.79],[40.02,66.27],[38.38,66],[33.92,66.76],[33.18,66.63],[34.81,65.9],[34.88,65.44],[34.94,64.41],[36.23,64.11],[37.01,63.85],[37.14,64.33],[36.54,64.76],[37.18,65.14],[39.59,64.52],[40.43,64.76],[39.76,65.5],[42.09,66.48],[43.02,66.42],[43.95,66.07],[44.53,66.76],[43.7,67.35],[44.19,67.95],[43.45,68.57],[46.25,68.25],[46.82,67.69],[45.56,67.57],[45.56,67.01],[46.35,66.67],[47.89,66.88],[48.14,67.52],[50.23,68],[53.72,68.86],[54.47,68.81],[53.49,68.2],[54.73,68.1],[55.44,68.44],[57.32,68.47],[58.8,68.88],[59.94,68.28],[61.08,68.94],[60.03,69.52],[60.55,69.85],[63.5,69.55],[64.89,69.23],[68.51,68.09],[69.18,68.62],[68.16,69.14],[68.14,69.36],[66.93,69.45],[67.26,69.93],[66.72,70.71],[66.7,71.03],[68.54,71.93],[69.2,72.84],[69.94,73.04],[72.59,72.78],[72.79,72.22],[71.85,71.41],[72.47,71.09],[72.79,70.39],[72.56,69.02],[73.67,68.41],[73.24,67.74],[71.28,66.32],[72.42,66.17],[72.82,66.53],[73.92,66.79],[74.19,67.28],[75.05,67.76],[74.47,68.33],[74.94,68.99],[73.84,69.07],[73.6,69.63],[74.4,70.63],[73.1,71.45],[74.89,72.12],[74.66,72.83],[75.16,72.86],[75.68,72.3],[75.29,71.34],[76.36,71.15],[75.9,71.87],[77.58,72.27],[79.65,72.32],[81.5,71.75],[80.61,72.58],[80.51,73.65],[82.25,73.85],[84.66,73.81],[86.82,73.94],[86.01,74.46],[87.17,75.12],[88.31,75.14],[90.26,75.64],[92.9,75.77],[93.24,76.05],[95.86,76.14],[96.68,75.92],[98.92,76.45],[100.76,76.43],[101.04,76.86],[101.99,77.29],[104.35,77.7],[106.07,77.37],[104.71,77.13],[106.97,76.97],[107.24,76.48],[108.15,76.72],[111.08,76.71],[113.33,76.22],[114.13,75.85],[113.89,75.33],[112.78,75.03],[110.15,74.48],[109.4,74.18],[110.64,74.04],[112.12,73.79],[113.02,73.98],[113.53,73.34],[113.97,73.59],[115.57,73.75],[118.78,73.59],[119.02,73.12],[123.2,72.97],[123.26,73.74],[125.38,73.56],[126.98,73.57],[128.59,73.04],[129.05,72.4],[128.46,71.98],[129.71,71.19],[131.29,70.79],[132.25,71.84],[133.86,71.39],[135.56,71.66],[137.5,71.35],[138.23,71.63],[139.87,71.49],[139.15,72.42],[140.47,72.85],[149.5,72.2],[150.35,71.61],[152.97,70.84],[157.01,71.03],[159,70.87],[159.83,70.45],[159.71,69.72],[160.94,69.44],[162.28,69.64],[164.05,69.67],[165.94,69.47],[167.84,69.58],[169.58,68.69],[170.82,69.01],[170.01,69.65],[170.45,70.1],[173.64,69.82],[175.72,69.88],[178.6,69.4],[180,68.96],[182.45,68.2],[185.07,67.21],[184.99,66.58],[185.66,66.34],[185.43,67.06],[188.14,66.91],[190.1,65.98],[189.11,65.54],[187.47,65.44],[187.44,64.46],[187.05,64.25],[186.11,64.28],[185.35,64.63],[184.02,64.92],[183.79,65.36],[182.78,65.52],[181.64,65.39],[181.1,65.74],[181.31,66.11],[180.12,65.87],[180.57,65.4],[180,64.98],[179.99,64.97],[178.71,64.53],[177.41,64.61],[178.31,64.08],[178.91,63.25],[179.37,62.98],[179.49,62.57],[179.23,62.3],[177.36,62.52],[174.57,61.77],[173.68,61.65],[172.15,60.95],[170.7,60.34],[170.33,59.88],[168.9,60.57],[166.29,59.79],[165.84,60.16],[164.88,59.73],[163.54,59.87],[163.22,59.21],[162.02,58.24],[162.05,57.84],[163.19,57.62],[163.06,56.16],[162.13,56.12],[161.7,55.29],[162.12,54.85],[160.37,54.34],[160.02,53.2],[158.53,52.96],[158.23,51.94],[156.79,51.01],[156.42,51.7],[155.99,53.16],[155.43,55.38],[155.92,56.77],[156.76,57.36],[156.81,57.83],[158.36,58.06],[160.15,59.31],[161.87,60.34],[163.67,61.14],[164.47,62.55],[163.26,62.47],[162.66,61.64],[160.12,60.54],[159.3,61.77],[156.72,61.43],[154.22,59.76],[155.04,59.15],[152.81,58.88],[151.26,58.78],[151.34,59.5],[149.78,59.66],[148.55,59.16],[145.49,59.34],[142.2,59.04],[138.96,57.09],[135.13,54.73],[136.7,54.6],[137.19,53.98],[138.16,53.75],[138.8,54.25],[139.9,54.19],[141.35,53.09],[141.38,52.24],[140.6,51.24],[140.51,50.05],[140.06,48.45],[138.56,47],[138.22,46.31],[136.86,45.14],[135.51,43.99],[134.87,43.4],[133.54,42.81],[132.91,42.8],[132.28,43.28],[130.94,42.55]]],[[[-180,71.52],[-179.87,71.56],[-179.02,71.56],[-177.58,71.27],[-177.66,71.13],[-178.69,70.89],[-180,70.83],[-181.1,70.78],[-181.27,71.1]]],[[[33.44,45.97],[33.7,46.22],[34.41,46],[34.73,45.97],[34.86,45.77],[35.01,45.74],[35.02,45.65],[35.51,45.41],[36.53,45.47],[36.33,45.11],[35.24,44.94],[33.88,44.36],[33.33,44.57],[33.55,45.03],[32.45,45.33],[32.63,45.52],[33.59,45.85]]]]},{id:`bs`,lon:-77.92,lat:24.51,small:!0,parts:[[[[-78.98,26.79],[-78.51,26.87],[-77.85,26.84],[-77.82,26.58],[-78.91,26.42]]],[[[-77.79,27.04],[-77,26.59],[-77.17,25.88],[-77.36,26.01],[-77.34,26.53],[-77.79,26.93]]],[[[-78.19,25.21],[-77.89,25.17],[-77.54,24.34],[-77.54,23.76],[-77.78,23.71],[-78.03,24.29],[-78.41,24.57]]]]},{id:`fk`,lon:-59.42,lat:-51.71,small:!0,parts:[[[[-61.2,-51.85],[-60,-51.25],[-59.15,-51.5],[-58.55,-51.1],[-57.75,-51.55],[-58.05,-51.9],[-59.4,-52.2],[-59.85,-51.85],[-60.7,-52.3]]]]},{id:`no`,lon:14.24,lat:64.54,small:!1,parts:[[[[15.14,79.67],[15.52,80.02],[16.99,80.05],[18.25,79.7],[21.54,78.96],[19.03,78.56],[18.47,77.83],[17.6,77.64],[17.12,76.81],[15.91,76.77],[13.76,77.38],[14.67,77.74],[13.17,78.02],[11.22,78.87],[10.45,79.65],[13.17,80.01],[13.72,79.66]]],[[[31.1,69.56],[29.4,69.16],[28.59,69.07],[29.01,69.77],[27.73,70.16],[26.18,69.83],[25.69,69.09],[24.73,68.65],[23.66,68.89],[22.36,68.84],[21.25,69.37],[20.64,69.11],[20.03,69.07],[19.88,68.41],[17.99,68.57],[17.73,68.01],[16.77,68.01],[16.11,67.3],[15.11,66.19],[13.56,64.79],[13.92,64.44],[13.57,64.05],[12.58,64.07],[11.93,63.13],[11.99,61.8],[12.63,61.29],[12.3,60.12],[11.47,59.43],[11.03,58.86],[10.36,59.47],[8.38,58.31],[7.05,58.08],[5.66,58.59],[5.31,59.66],[4.99,61.97],[5.91,62.62],[8.55,63.45],[10.53,64.49],[12.36,65.88],[14.76,67.81],[16.44,68.56],[19.18,69.82],[21.38,70.26],[23.02,70.2],[24.55,71.03],[26.37,70.99],[28.16,71.19],[31.29,70.45],[30,70.19]]],[[[27.41,80.06],[25.93,79.52],[23.02,79.4],[20.08,79.57],[19.9,79.84],[18.46,79.86],[17.37,80.32],[20.46,80.6],[21.91,80.36],[22.92,80.66],[25.45,80.41]]],[[[24.72,77.85],[22.49,77.45],[20.73,77.68],[21.41,77.93],[20.81,78.25],[22.88,78.46],[23.28,78.08]]]]},{id:`gl`,lon:-41.5,lat:74.77,small:!1,parts:[[[[-46.76,82.63],[-43.41,83.23],[-39.9,83.18],[-38.62,83.55],[-35.09,83.65],[-27.1,83.52],[-20.85,82.73],[-22.69,82.34],[-26.52,82.3],[-31.9,82.2],[-31.4,82.02],[-27.86,82.13],[-24.85,81.79],[-22.9,82.09],[-22.07,81.73],[-23.17,81.15],[-20.62,81.52],[-15.77,81.91],[-12.77,81.72],[-12.21,81.29],[-16.28,80.58],[-16.85,80.35],[-20.05,80.18],[-17.73,80.13],[-18.9,79.4],[-19.7,78.75],[-19.67,77.64],[-18.47,76.98],[-20.04,76.94],[-21.68,76.63],[-19.83,76.1],[-19.6,75.25],[-20.67,75.16],[-19.37,74.3],[-21.59,74.22],[-20.44,73.82],[-20.76,73.46],[-22.17,73.31],[-23.57,73.31],[-22.31,72.63],[-22.3,72.18],[-24.28,72.6],[-24.79,72.33],[-23.44,72.08],[-22.13,71.47],[-21.75,70.66],[-23.54,70.47],[-24.31,70.86],[-25.54,71.43],[-25.2,70.75],[-26.36,70.23],[-23.73,70.18],[-22.35,70.13],[-25.03,69.26],[-27.75,68.47],[-30.67,68.12],[-31.78,68.12],[-32.81,67.74],[-34.2,66.68],[-36.35,65.98],[-37.04,65.94],[-38.37,65.69],[-39.81,65.46],[-40.67,64.84],[-40.68,64.14],[-41.19,63.48],[-42.82,62.68],[-42.42,61.9],[-42.87,61.07],[-43.38,60.1],[-44.79,60.04],[-46.26,60.85],[-48.26,60.86],[-49.23,61.41],[-49.9,62.38],[-51.63,63.63],[-52.14,64.28],[-52.28,65.18],[-53.66,66.1],[-53.3,66.84],[-53.97,67.19],[-52.98,68.36],[-51.48,68.73],[-51.08,69.15],[-50.87,69.93],[-52.02,69.57],[-52.56,69.43],[-53.46,69.28],[-54.68,69.61],[-54.75,70.29],[-54.36,70.82],[-53.43,70.84],[-51.39,70.57],[-53.11,71.2],[-54.01,71.55],[-55,71.41],[-55.83,71.66],[-54.72,72.59],[-55.33,72.96],[-56.12,73.65],[-57.33,74.71],[-58.6,75.1],[-58.59,75.52],[-61.27,76.1],[-63.39,76.18],[-66.07,76.14],[-68.5,76.06],[-69.67,76.38],[-71.4,77.01],[-68.78,77.32],[-66.76,77.38],[-71.04,77.64],[-73.3,78.04],[-73.16,78.43],[-69.37,78.91],[-65.71,79.4],[-65.32,79.76],[-68.02,80.12],[-67.15,80.52],[-63.69,81.21],[-62.24,81.32],[-62.65,81.77],[-60.28,82.03],[-57.21,82.19],[-54.14,82.2],[-53.04,81.89],[-50.39,82.44],[-48,82.06],[-46.6,81.99],[-44.52,81.66],[-46.9,82.2]]]]},{id:`tf`,lon:69.53,lat:-49.31,small:!0,parts:[[[[68.94,-48.62],[69.58,-48.94],[70.53,-49.07],[70.56,-49.25],[70.28,-49.71],[68.74,-49.77],[68.72,-49.24],[68.87,-48.83]]]]},{id:`tl`,lon:125.97,lat:-8.77,small:!0,parts:[[[[124.97,-8.89],[125.09,-8.66],[125.95,-8.43],[126.64,-8.4],[126.96,-8.27],[127.34,-8.4],[126.97,-8.67],[125.93,-9.11],[125.09,-9.39],[125.07,-9.09]]]]},{id:`za`,lon:25.12,lat:-28.96,small:!1,parts:[[[[16.35,-28.58],[16.82,-28.08],[17.22,-28.36],[17.39,-28.78],[17.84,-28.86],[18.47,-29.05],[19,-28.97],[19.9,-28.46],[19.9,-24.77],[20.17,-24.92],[20.76,-25.87],[20.67,-26.48],[20.89,-26.83],[21.61,-26.73],[22.11,-26.28],[22.58,-25.98],[22.83,-25.5],[23.31,-25.27],[23.73,-25.39],[24.21,-25.67],[25.03,-25.72],[25.67,-25.49],[25.77,-25.17],[25.94,-24.7],[26.49,-24.62],[26.79,-24.24],[27.12,-23.58],[28.02,-22.83],[29.43,-22.09],[29.84,-22.1],[30.32,-22.27],[30.66,-22.15],[31.19,-22.25],[31.67,-23.66],[31.93,-24.37],[31.75,-25.48],[31.84,-25.84],[31.33,-25.66],[31.04,-25.73],[30.95,-26.02],[30.68,-26.4],[30.68,-26.74],[31.28,-27.29],[31.87,-27.18],[32.07,-26.73],[32.83,-26.74],[32.58,-27.47],[32.46,-28.3],[32.2,-28.75],[31.52,-29.26],[31.33,-29.4],[30.9,-29.91],[30.62,-30.42],[30.05,-31.14],[28.92,-32.17],[28.22,-32.77],[27.46,-33.23],[26.42,-33.62],[25.91,-33.67],[25.78,-33.95],[25.17,-33.8],[24.68,-33.99],[23.59,-33.79],[22.99,-33.92],[22.57,-33.86],[21.54,-34.26],[20.69,-34.42],[20.07,-34.8],[19.61,-34.82],[19.19,-34.46],[18.86,-34.44],[18.42,-34],[18.38,-34.14],[18.24,-33.87],[18.25,-33.28],[17.93,-32.61],[18.25,-32.43],[18.22,-31.66],[17.57,-30.73],[17.07,-29.88],[17.06,-29.88]],[[28.98,-28.96],[28.54,-28.65],[28.07,-28.85],[27.53,-29.24],[27,-29.88],[27.75,-30.64],[28.11,-30.55],[28.29,-30.23],[28.85,-30.07],[29.02,-29.74],[29.32,-29.26]]]]},{id:`ls`,lon:28.17,lat:-29.63,small:!0,parts:[[[[28.98,-28.96],[29.32,-29.26],[29.02,-29.74],[28.85,-30.07],[28.29,-30.23],[28.11,-30.55],[27.75,-30.64],[27,-29.88],[27.53,-29.24],[28.07,-28.85],[28.54,-28.65]]]]},{id:`mx`,lon:-102.58,lat:23.93,small:!1,parts:[[[[-117.13,32.53],[-115.99,32.61],[-114.72,32.72],[-114.81,32.52],[-113.31,32.04],[-111.02,31.33],[-109.04,31.34],[-108.24,31.34],[-108.24,31.75],[-106.51,31.75],[-106.14,31.4],[-105.63,31.08],[-105.04,30.64],[-104.71,30.12],[-104.46,29.57],[-103.94,29.27],[-103.11,28.97],[-102.48,29.76],[-101.66,29.78],[-100.96,29.38],[-100.46,28.7],[-100.11,28.11],[-99.52,27.54],[-99.3,26.84],[-99.02,26.37],[-98.24,26.06],[-97.53,25.84],[-97.14,25.87],[-97.53,24.99],[-97.7,24.27],[-97.78,22.93],[-97.87,22.44],[-97.7,21.9],[-97.39,21.41],[-97.19,20.64],[-96.53,19.89],[-96.29,19.32],[-95.9,18.83],[-94.84,18.56],[-94.43,18.14],[-93.55,18.42],[-92.79,18.53],[-92.04,18.71],[-91.41,18.88],[-90.77,19.28],[-90.53,19.87],[-90.45,20.71],[-90.28,21],[-89.6,21.26],[-88.54,21.49],[-87.66,21.46],[-87.05,21.54],[-86.81,21.33],[-86.85,20.85],[-87.38,20.26],[-87.62,19.65],[-87.44,19.47],[-87.59,19.04],[-87.84,18.26],[-88.09,18.52],[-88.3,18.5],[-88.49,18.49],[-88.85,17.88],[-89.03,18],[-89.15,17.96],[-89.14,17.81],[-90.07,17.82],[-91,17.82],[-91,17.25],[-91.45,17.25],[-91.08,16.92],[-90.71,16.69],[-90.6,16.47],[-90.44,16.41],[-90.46,16.07],[-91.75,16.07],[-92.23,15.25],[-92.09,15.06],[-92.2,14.83],[-92.23,14.54],[-93.36,15.62],[-93.88,15.94],[-94.69,16.2],[-95.25,16.13],[-96.05,15.75],[-96.56,15.65],[-97.26,15.92],[-98.01,16.11],[-98.95,16.57],[-99.7,16.71],[-100.83,17.17],[-101.67,17.65],[-101.92,17.92],[-102.48,17.98],[-103.5,18.29],[-103.92,18.75],[-104.99,19.32],[-105.49,19.95],[-105.73,20.43],[-105.4,20.53],[-105.5,20.82],[-105.27,21.08],[-105.27,21.42],[-105.6,21.87],[-105.69,22.27],[-106.03,22.77],[-106.91,23.77],[-107.92,24.55],[-108.4,25.17],[-109.26,25.58],[-109.44,25.83],[-109.29,26.44],[-109.8,26.68],[-110.39,27.16],[-110.64,27.86],[-111.18,27.94],[-111.76,28.47],[-112.23,28.96],[-112.27,29.27],[-112.81,30.02],[-113.17,30.79],[-113.15,31.17],[-113.87,31.57],[-114.21,31.52],[-114.78,31.8],[-114.94,31.39],[-114.77,30.91],[-114.67,30.16],[-114.33,29.75],[-113.59,29.06],[-113.42,28.83],[-113.27,28.76],[-113.14,28.41],[-112.96,28.43],[-112.76,27.78],[-112.46,27.53],[-112.24,27.17],[-111.62,26.66],[-111.29,25.73],[-110.99,25.29],[-110.71,24.83],[-110.66,24.3],[-110.17,24.27],[-109.77,23.81],[-109.41,23.36],[-109.43,23.19],[-109.85,22.82],[-110.03,22.82],[-110.3,23.43],[-110.95,24],[-111.67,24.49],[-112.18,24.74],[-112.15,25.47],[-112.3,26.01],[-112.78,26.32],[-113.46,26.77],[-113.6,26.64],[-113.85,26.9],[-114.46,27.14],[-115.06,27.72],[-114.98,27.8],[-114.57,27.74],[-114.2,28.12],[-114.16,28.57],[-114.93,29.28],[-115.52,29.56],[-115.89,30.18],[-116.26,30.84],[-116.72,31.64]]]]},{id:`uy`,lon:-56,lat:-32.78,small:!1,parts:[[[[-57.62,-30.22],[-56.98,-30.11],[-55.97,-30.88],[-55.6,-30.85],[-54.57,-31.49],[-53.79,-32.05],[-53.21,-32.73],[-53.65,-33.2],[-53.37,-33.77],[-53.81,-34.4],[-54.93,-34.95],[-55.67,-34.75],[-56.22,-34.86],[-57.14,-34.43],[-57.82,-34.46],[-58.43,-33.91],[-58.35,-33.26],[-58.13,-33.04],[-58.14,-32.04],[-57.88,-31.02]]]]},{id:`br`,lon:-53.05,lat:-10.81,small:!1,parts:[[[[-53.37,-33.77],[-53.65,-33.2],[-53.21,-32.73],[-53.79,-32.05],[-54.57,-31.49],[-55.6,-30.85],[-55.97,-30.88],[-56.98,-30.11],[-57.62,-30.22],[-56.29,-28.85],[-55.16,-27.88],[-54.49,-27.47],[-53.65,-26.92],[-53.63,-26.12],[-54.13,-25.55],[-54.63,-25.74],[-54.43,-25.16],[-54.29,-24.57],[-54.29,-24.02],[-54.65,-23.84],[-55.03,-24],[-55.4,-23.96],[-55.52,-23.57],[-55.61,-22.66],[-55.8,-22.36],[-56.47,-22.09],[-56.88,-22.28],[-57.94,-22.09],[-57.87,-20.73],[-58.17,-20.18],[-57.85,-19.97],[-57.95,-19.4],[-57.67,-18.96],[-57.5,-18.17],[-57.74,-17.55],[-58.28,-17.27],[-58.39,-16.88],[-58.24,-16.3],[-60.16,-16.26],[-60.54,-15.09],[-60.25,-15.08],[-60.26,-14.65],[-60.46,-14.35],[-60.5,-13.78],[-61.08,-13.48],[-61.71,-13.49],[-62.13,-13.2],[-62.8,-13],[-63.2,-12.63],[-64.32,-12.46],[-65.4,-11.57],[-65.32,-10.9],[-65.44,-10.51],[-65.34,-9.76],[-66.65,-9.93],[-67.17,-10.31],[-68.05,-10.71],[-68.27,-11.01],[-68.79,-11.04],[-69.53,-10.95],[-70.09,-11.12],[-70.55,-11.01],[-70.48,-9.49],[-71.3,-10.08],[-72.19,-10.05],[-72.56,-9.52],[-73.23,-9.46],[-73.01,-9.03],[-73.57,-8.42],[-73.99,-7.52],[-73.72,-7.34],[-73.72,-6.92],[-73.12,-6.63],[-73.22,-6.09],[-72.96,-5.74],[-72.89,-5.28],[-71.75,-4.59],[-70.93,-4.4],[-70.8,-4.25],[-69.89,-4.3],[-69.44,-1.56],[-69.42,-1.12],[-69.58,-.55],[-70.02,-.19],[-70.02,.54],[-69.45,.71],[-69.25,.6],[-69.22,.99],[-69.8,1.09],[-69.82,1.72],[-67.87,1.69],[-67.54,2.04],[-67.26,1.72],[-67.06,1.13],[-66.88,1.25],[-66.33,.72],[-65.55,.79],[-65.35,1.1],[-64.61,1.33],[-64.2,1.49],[-64.08,1.92],[-63.37,2.2],[-63.42,2.41],[-64.27,2.5],[-64.41,3.13],[-64.37,3.8],[-64.82,4.06],[-64.63,4.15],[-63.89,4.02],[-63.09,3.77],[-62.8,4.01],[-62.08,4.16],[-60.97,4.54],[-60.6,4.92],[-60.73,5.2],[-60.21,5.24],[-59.98,5.01],[-60.11,4.58],[-59.77,4.42],[-59.54,3.96],[-59.82,3.61],[-59.97,2.76],[-59.72,2.25],[-59.65,1.79],[-59.03,1.32],[-58.54,1.27],[-58.43,1.46],[-58.11,1.51],[-57.66,1.68],[-57.34,1.95],[-56.78,1.86],[-56.54,1.9],[-56,1.82],[-55.91,2.02],[-56.07,2.22],[-55.97,2.51],[-55.57,2.42],[-55.1,2.52],[-54.52,2.31],[-54.09,2.11],[-53.78,2.38],[-53.56,2.33],[-53.42,2.05],[-52.94,2.12],[-52.56,2.5],[-52.25,3.24],[-51.66,4.16],[-51.32,4.2],[-51.07,3.65],[-50.51,1.9],[-49.97,1.74],[-49.95,1.05],[-50.7,.22],[-50.39,-.08],[-48.62,-.23],[-48.58,-1.24],[-47.82,-.58],[-46.57,-.94],[-44.91,-1.55],[-44.42,-2.14],[-44.58,-2.69],[-43.42,-2.38],[-41.47,-2.91],[-39.98,-2.87],[-38.5,-3.7],[-37.22,-4.82],[-36.45,-5.11],[-35.6,-5.15],[-35.24,-5.46],[-34.9,-6.74],[-34.73,-7.34],[-35.13,-9],[-35.64,-9.65],[-37.05,-11.04],[-37.68,-12.17],[-38.42,-13.04],[-38.67,-13.06],[-38.95,-13.79],[-38.88,-15.67],[-39.16,-17.21],[-39.27,-17.87],[-39.58,-18.26],[-39.76,-19.6],[-40.78,-20.9],[-40.95,-21.94],[-41.76,-22.37],[-41.99,-22.97],[-43.08,-22.97],[-44.65,-23.35],[-45.35,-23.8],[-46.47,-24.09],[-47.65,-24.89],[-48.49,-25.88],[-48.64,-26.62],[-48.48,-27.18],[-48.66,-28.19],[-48.89,-28.67],[-49.59,-29.22],[-50.7,-30.99],[-51.58,-31.78],[-52.26,-32.25],[-52.71,-33.2]]]]},{id:`bo`,lon:-64.64,lat:-16.73,small:!1,parts:[[[[-69.53,-10.95],[-68.79,-11.04],[-68.27,-11.01],[-68.05,-10.71],[-67.17,-10.31],[-66.65,-9.93],[-65.34,-9.76],[-65.44,-10.51],[-65.32,-10.9],[-65.4,-11.57],[-64.32,-12.46],[-63.2,-12.63],[-62.8,-13],[-62.13,-13.2],[-61.71,-13.49],[-61.08,-13.48],[-60.5,-13.78],[-60.46,-14.35],[-60.26,-14.65],[-60.25,-15.08],[-60.54,-15.09],[-60.16,-16.26],[-58.24,-16.3],[-58.39,-16.88],[-58.28,-17.27],[-57.74,-17.55],[-57.5,-18.17],[-57.67,-18.96],[-57.95,-19.4],[-57.85,-19.97],[-58.17,-20.18],[-58.18,-19.87],[-59.11,-19.36],[-60.04,-19.34],[-61.79,-19.63],[-62.26,-20.51],[-62.29,-21.05],[-62.69,-22.25],[-62.85,-22.03],[-63.99,-21.99],[-64.38,-22.8],[-64.96,-22.08],[-66.27,-21.83],[-67.11,-22.74],[-67.83,-22.87],[-68.22,-21.49],[-68.76,-20.37],[-68.44,-19.4],[-68.97,-18.98],[-69.1,-18.26],[-69.59,-17.58],[-68.96,-16.5],[-69.39,-15.66],[-69.16,-15.32],[-69.34,-14.95],[-68.95,-14.45],[-68.93,-13.6],[-68.88,-12.9],[-68.67,-12.56]]]]},{id:`pe`,lon:-74.39,lat:-9.19,small:!1,parts:[[[[-69.89,-4.3],[-70.8,-4.25],[-70.93,-4.4],[-71.75,-4.59],[-72.89,-5.28],[-72.96,-5.74],[-73.22,-6.09],[-73.12,-6.63],[-73.72,-6.92],[-73.72,-7.34],[-73.99,-7.52],[-73.57,-8.42],[-73.01,-9.03],[-73.23,-9.46],[-72.56,-9.52],[-72.19,-10.05],[-71.3,-10.08],[-70.48,-9.49],[-70.55,-11.01],[-70.09,-11.12],[-69.53,-10.95],[-68.67,-12.56],[-68.88,-12.9],[-68.93,-13.6],[-68.95,-14.45],[-69.34,-14.95],[-69.16,-15.32],[-69.39,-15.66],[-68.96,-16.5],[-69.59,-17.58],[-69.86,-18.09],[-70.37,-18.35],[-71.38,-17.77],[-71.46,-17.36],[-73.45,-16.36],[-75.24,-15.27],[-76.01,-14.65],[-76.42,-13.82],[-76.26,-13.53],[-77.11,-12.22],[-78.09,-10.38],[-79.04,-8.39],[-79.45,-7.93],[-79.76,-7.19],[-80.54,-6.54],[-81.25,-6.14],[-80.93,-5.69],[-81.41,-4.74],[-81.1,-4.04],[-80.3,-3.4],[-80.19,-3.82],[-80.47,-4.06],[-80.44,-4.43],[-80.03,-4.35],[-79.62,-4.45],[-79.21,-4.96],[-78.64,-4.55],[-78.45,-3.87],[-77.84,-3],[-76.64,-2.61],[-75.54,-1.56],[-75.24,-.91],[-75.37,-.15],[-75.11,-.06],[-74.44,-.53],[-74.12,-1],[-73.66,-1.26],[-73.07,-2.31],[-72.33,-2.44],[-71.78,-2.17],[-71.41,-2.34],[-70.81,-2.26],[-70.05,-2.72],[-70.69,-3.74],[-70.39,-3.77]]]]},{id:`co`,lon:-73.08,lat:3.93,small:!1,parts:[[[[-66.88,1.25],[-67.06,1.13],[-67.26,1.72],[-67.54,2.04],[-67.87,1.69],[-69.82,1.72],[-69.8,1.09],[-69.22,.99],[-69.25,.6],[-69.45,.71],[-70.02,.54],[-70.02,-.19],[-69.58,-.55],[-69.42,-1.12],[-69.44,-1.56],[-69.89,-4.3],[-70.39,-3.77],[-70.69,-3.74],[-70.05,-2.72],[-70.81,-2.26],[-71.41,-2.34],[-71.78,-2.17],[-72.33,-2.44],[-73.07,-2.31],[-73.66,-1.26],[-74.12,-1],[-74.44,-.53],[-75.11,-.06],[-75.37,-.15],[-75.8,.09],[-76.29,.42],[-76.58,.26],[-77.42,.39],[-77.67,.83],[-77.86,.81],[-78.86,1.38],[-78.99,1.69],[-78.62,1.77],[-78.66,2.27],[-78.43,2.63],[-77.93,2.7],[-77.51,3.32],[-77.13,3.85],[-77.5,4.09],[-77.31,4.67],[-77.53,5.58],[-77.32,5.84],[-77.48,6.69],[-77.88,7.22],[-77.75,7.71],[-77.43,7.64],[-77.24,7.94],[-77.47,8.52],[-77.35,8.67],[-76.84,8.64],[-76.08,9.34],[-75.67,9.44],[-75.66,9.77],[-75.48,10.62],[-74.91,11.08],[-74.28,11.1],[-74.2,11.31],[-73.41,11.23],[-72.63,11.73],[-72.24,11.96],[-71.75,12.44],[-71.4,12.38],[-71.14,12.11],[-71.33,11.78],[-71.97,11.61],[-72.23,11.11],[-72.61,10.82],[-72.91,10.45],[-73.03,9.74],[-73.31,9.15],[-72.79,9.08],[-72.66,8.63],[-72.44,8.41],[-72.36,8],[-72.48,7.63],[-72.45,7.42],[-72.2,7.34],[-71.96,6.99],[-70.67,7.09],[-70.09,6.96],[-69.39,6.1],[-68.99,6.21],[-68.27,6.15],[-67.7,6.27],[-67.34,6.1],[-67.52,5.56],[-67.74,5.22],[-67.82,4.5],[-67.62,3.84],[-67.34,3.54],[-67.3,3.32],[-67.81,2.82],[-67.45,2.6],[-67.18,2.25]]]]},{id:`pa`,lon:-80.11,lat:8.53,small:!1,parts:[[[[-77.35,8.67],[-77.47,8.52],[-77.24,7.94],[-77.43,7.64],[-77.75,7.71],[-77.88,7.22],[-78.22,7.51],[-78.43,8.05],[-78.18,8.32],[-78.44,8.39],[-78.62,8.72],[-79.12,9],[-79.56,8.93],[-79.76,8.59],[-80.16,8.33],[-80.38,8.3],[-80.48,8.09],[-80.01,7.55],[-80.28,7.42],[-80.42,7.27],[-80.89,7.22],[-81.06,7.82],[-81.19,7.65],[-81.52,7.71],[-81.72,8.11],[-82.13,8.18],[-82.39,8.29],[-82.82,8.29],[-82.85,8.07],[-82.96,8.22],[-82.91,8.42],[-82.83,8.63],[-82.87,8.81],[-82.72,8.93],[-82.93,9.07],[-82.93,9.48],[-82.55,9.57],[-82.19,9.21],[-82.21,8.99],[-81.81,8.95],[-81.72,9.03],[-81.44,8.79],[-80.95,8.86],[-80.52,9.11],[-79.92,9.31],[-79.57,9.61],[-79.02,9.55],[-79.06,9.46],[-78.5,9.42],[-78.05,9.25],[-77.73,8.95]]]]},{id:`cr`,lon:-84.18,lat:9.97,small:!0,parts:[[[[-82.55,9.57],[-82.93,9.48],[-82.93,9.07],[-82.72,8.93],[-82.87,8.81],[-82.83,8.63],[-82.91,8.42],[-82.96,8.22],[-83.51,8.45],[-83.71,8.66],[-83.59,8.83],[-83.63,9.05],[-83.91,9.29],[-84.3,9.49],[-84.65,9.62],[-84.71,9.91],[-84.98,10.09],[-84.91,9.8],[-85.11,9.56],[-85.34,9.83],[-85.66,9.93],[-85.8,10.14],[-85.79,10.44],[-85.66,10.76],[-85.94,10.9],[-85.71,11.09],[-85.56,11.22],[-84.9,10.95],[-84.67,11.08],[-84.35,11],[-84.19,10.79],[-83.89,10.73],[-83.66,10.94],[-83.4,10.4],[-83.02,9.99]]]]},{id:`ni`,lon:-85.02,lat:12.85,small:!1,parts:[[[[-83.66,10.94],[-83.89,10.73],[-84.19,10.79],[-84.35,11],[-84.67,11.08],[-84.9,10.95],[-85.56,11.22],[-85.71,11.09],[-86.06,11.4],[-86.53,11.81],[-86.74,12.14],[-87.17,12.46],[-87.67,12.91],[-87.56,13.06],[-87.39,12.91],[-87.32,12.98],[-87.01,13.03],[-86.88,13.26],[-86.73,13.26],[-86.76,13.75],[-86.52,13.78],[-86.31,13.77],[-86.1,14.04],[-85.8,13.84],[-85.7,13.96],[-85.51,14.08],[-85.16,14.36],[-85.15,14.56],[-85.05,14.55],[-84.92,14.79],[-84.82,14.82],[-84.65,14.67],[-84.45,14.62],[-84.23,14.75],[-83.98,14.75],[-83.63,14.88],[-83.49,15.02],[-83.15,15],[-83.23,14.9],[-83.29,14.68],[-83.18,14.31],[-83.41,13.97],[-83.52,13.57],[-83.55,13.13],[-83.5,12.87],[-83.47,12.42],[-83.63,12.32],[-83.72,11.89],[-83.65,11.63],[-83.85,11.37],[-83.81,11.1]]]]},{id:`hn`,lon:-86.59,lat:14.82,small:!1,parts:[[[[-83.15,15],[-83.49,15.02],[-83.63,14.88],[-83.98,14.75],[-84.23,14.75],[-84.45,14.62],[-84.65,14.67],[-84.82,14.82],[-84.92,14.79],[-85.05,14.55],[-85.15,14.56],[-85.16,14.36],[-85.51,14.08],[-85.7,13.96],[-85.8,13.84],[-86.1,14.04],[-86.31,13.77],[-86.52,13.78],[-86.76,13.75],[-86.73,13.26],[-86.88,13.26],[-87.01,13.03],[-87.32,12.98],[-87.49,13.3],[-87.79,13.38],[-87.72,13.78],[-87.86,13.89],[-88.07,13.96],[-88.51,13.85],[-88.54,13.98],[-88.84,14.14],[-89.06,14.34],[-89.35,14.42],[-89.15,14.68],[-89.23,14.87],[-89.15,15.07],[-88.68,15.35],[-88.22,15.73],[-88.12,15.69],[-87.9,15.86],[-87.62,15.88],[-87.52,15.8],[-87.37,15.85],[-86.9,15.76],[-86.44,15.78],[-86.12,15.89],[-86,16.01],[-85.68,15.95],[-85.45,15.89],[-85.18,15.91],[-84.98,16],[-84.53,15.86],[-84.37,15.83],[-84.06,15.65],[-83.77,15.42],[-83.41,15.27]]]]},{id:`sv`,lon:-88.87,lat:13.72,small:!0,parts:[[[[-89.35,14.42],[-89.06,14.34],[-88.84,14.14],[-88.54,13.98],[-88.51,13.85],[-88.07,13.96],[-87.86,13.89],[-87.72,13.78],[-87.79,13.38],[-87.9,13.15],[-88.48,13.16],[-88.84,13.26],[-89.26,13.46],[-89.81,13.52],[-90.1,13.74],[-90.06,13.88],[-89.72,14.13],[-89.53,14.25],[-89.59,14.36]]]]},{id:`gt`,lon:-90.37,lat:15.7,small:!1,parts:[[[[-92.23,14.54],[-92.2,14.83],[-92.09,15.06],[-92.23,15.25],[-91.75,16.07],[-90.46,16.07],[-90.44,16.41],[-90.6,16.47],[-90.71,16.69],[-91.08,16.92],[-91.45,17.25],[-91,17.25],[-91,17.82],[-90.07,17.82],[-89.14,17.81],[-89.15,17.02],[-89.23,15.89],[-88.93,15.89],[-88.61,15.71],[-88.52,15.85],[-88.22,15.73],[-88.68,15.35],[-89.15,15.07],[-89.23,14.87],[-89.15,14.68],[-89.35,14.42],[-89.59,14.36],[-89.53,14.25],[-89.72,14.13],[-90.06,13.88],[-90.1,13.74],[-90.61,13.91],[-91.23,13.93],[-91.69,14.13]]]]},{id:`bz`,lon:-88.7,lat:17.2,small:!0,parts:[[[[-89.14,17.81],[-89.15,17.96],[-89.03,18],[-88.85,17.88],[-88.49,18.49],[-88.3,18.5],[-88.3,18.35],[-88.11,18.35],[-88.12,18.08],[-88.29,17.64],[-88.2,17.49],[-88.3,17.13],[-88.24,17.04],[-88.35,16.53],[-88.55,16.27],[-88.73,16.23],[-88.93,15.89],[-89.23,15.89],[-89.15,17.02]]]]},{id:`ve`,lon:-66.17,lat:7.16,small:!1,parts:[[[[-60.73,5.2],[-60.6,4.92],[-60.97,4.54],[-62.08,4.16],[-62.8,4.01],[-63.09,3.77],[-63.89,4.02],[-64.63,4.15],[-64.82,4.06],[-64.37,3.8],[-64.41,3.13],[-64.27,2.5],[-63.42,2.41],[-63.37,2.2],[-64.08,1.92],[-64.2,1.49],[-64.61,1.33],[-65.35,1.1],[-65.55,.79],[-66.33,.72],[-66.88,1.25],[-67.18,2.25],[-67.45,2.6],[-67.81,2.82],[-67.3,3.32],[-67.34,3.54],[-67.62,3.84],[-67.82,4.5],[-67.74,5.22],[-67.52,5.56],[-67.34,6.1],[-67.7,6.27],[-68.27,6.15],[-68.99,6.21],[-69.39,6.1],[-70.09,6.96],[-70.67,7.09],[-71.96,6.99],[-72.2,7.34],[-72.45,7.42],[-72.48,7.63],[-72.36,8],[-72.44,8.41],[-72.66,8.63],[-72.79,9.08],[-73.31,9.15],[-73.03,9.74],[-72.91,10.45],[-72.61,10.82],[-72.23,11.11],[-71.97,11.61],[-71.33,11.78],[-71.36,11.54],[-71.95,11.42],[-71.62,10.97],[-71.63,10.45],[-72.07,9.86],[-71.7,9.07],[-71.26,9.14],[-71.04,9.86],[-71.35,10.21],[-71.4,10.97],[-70.16,11.38],[-70.29,11.85],[-69.94,12.16],[-69.58,11.46],[-68.88,11.44],[-68.23,10.89],[-68.19,10.56],[-67.3,10.55],[-66.23,10.65],[-65.66,10.2],[-64.89,10.08],[-64.33,10.39],[-64.32,10.64],[-63.08,10.7],[-61.88,10.72],[-62.73,10.42],[-62.39,9.95],[-61.59,9.87],[-60.83,9.38],[-60.67,8.58],[-60.15,8.6],[-59.76,8.37],[-60.55,7.78],[-60.64,7.42],[-60.3,7.04],[-60.54,6.86],[-61.16,6.7],[-61.14,6.23],[-61.41,5.96]]]]},{id:`gy`,lon:-58.97,lat:4.79,small:!1,parts:[[[[-56.54,1.9],[-56.78,1.86],[-57.34,1.95],[-57.66,1.68],[-58.11,1.51],[-58.43,1.46],[-58.54,1.27],[-59.03,1.32],[-59.65,1.79],[-59.72,2.25],[-59.97,2.76],[-59.82,3.61],[-59.54,3.96],[-59.77,4.42],[-60.11,4.58],[-59.98,5.01],[-60.21,5.24],[-60.73,5.2],[-61.41,5.96],[-61.14,6.23],[-61.16,6.7],[-60.54,6.86],[-60.3,7.04],[-60.64,7.42],[-60.55,7.78],[-59.76,8.37],[-59.1,8],[-58.48,7.35],[-58.46,6.83],[-58.08,6.81],[-57.54,6.32],[-57.15,5.97],[-57.31,5.07],[-57.92,4.81],[-57.86,4.58],[-58.05,4.06],[-57.6,3.33],[-57.28,3.33],[-57.15,2.77]]]]},{id:`sr`,lon:-55.91,lat:4.12,small:!1,parts:[[[[-54.52,2.31],[-55.1,2.52],[-55.57,2.42],[-55.97,2.51],[-56.07,2.22],[-55.91,2.02],[-56,1.82],[-56.54,1.9],[-57.15,2.77],[-57.28,3.33],[-57.6,3.33],[-58.05,4.06],[-57.86,4.58],[-57.92,4.81],[-57.31,5.07],[-57.15,5.97],[-55.95,5.77],[-55.84,5.95],[-55.03,6.03],[-53.96,5.76],[-54.48,4.9],[-54.4,4.21],[-54.01,3.62],[-54.18,3.19],[-54.27,2.73]]]]},{id:`fr`,lon:2.34,lat:46.61,small:!1,parts:[[[[-51.66,4.16],[-52.25,3.24],[-52.56,2.5],[-52.94,2.12],[-53.42,2.05],[-53.56,2.33],[-53.78,2.38],[-54.09,2.11],[-54.52,2.31],[-54.27,2.73],[-54.18,3.19],[-54.01,3.62],[-54.4,4.21],[-54.48,4.9],[-53.96,5.76],[-53.62,5.65],[-52.88,5.41],[-51.82,4.57]]],[[[6.19,49.46],[6.66,49.2],[8.1,49.02],[7.59,48.33],[7.47,47.62],[7.19,47.45],[6.74,47.54],[6.77,47.29],[6.04,46.73],[6.02,46.27],[6.5,46.43],[6.84,45.99],[6.8,45.71],[7.1,45.33],[6.75,45.03],[7.01,44.25],[7.55,44.13],[7.44,43.69],[6.53,43.13],[4.56,43.4],[3.1,43.07],[2.99,42.47],[1.83,42.34],[.7,42.8],[.34,42.58],[-1.5,43.03],[-1.9,43.42],[-1.38,44.02],[-1.19,46.01],[-2.23,47.06],[-2.96,47.57],[-4.49,47.95],[-4.59,48.68],[-3.3,48.9],[-1.62,48.64],[-1.94,49.78],[-.99,49.35],[1.34,50.13],[1.64,50.95],[2.51,51.15],[2.66,50.8],[3.12,50.78],[3.59,50.38],[4.29,49.91],[4.8,49.99],[5.68,49.53],[5.9,49.44]]],[[[8.75,42.63],[9.39,43.01],[9.56,42.15],[9.23,41.38],[8.78,41.58],[8.54,42.26]]]]},{id:`ec`,lon:-78.38,lat:-1.45,small:!1,parts:[[[[-75.37,-.15],[-75.24,-.91],[-75.54,-1.56],[-76.64,-2.61],[-77.84,-3],[-78.45,-3.87],[-78.64,-4.55],[-79.21,-4.96],[-79.62,-4.45],[-80.03,-4.35],[-80.44,-4.43],[-80.47,-4.06],[-80.19,-3.82],[-80.3,-3.4],[-79.77,-2.66],[-79.99,-2.22],[-80.37,-2.69],[-80.97,-2.25],[-80.77,-1.96],[-80.93,-1.06],[-80.59,-.91],[-80.4,-.28],[-80.02,.36],[-80.09,.77],[-79.54,.98],[-78.86,1.38],[-77.86,.81],[-77.67,.83],[-77.42,.39],[-76.58,.26],[-76.29,.42],[-75.8,.09]]]]},{id:`pr`,lon:-66.48,lat:18.24,small:!0,parts:[[[[-66.28,18.52],[-65.77,18.43],[-65.59,18.23],[-65.85,17.98],[-66.6,17.98],[-67.19,17.95],[-67.24,18.37],[-67.1,18.52]]]]},{id:`jm`,lon:-77.33,lat:18.14,small:!0,parts:[[[[-77.57,18.49],[-76.89,18.4],[-76.37,18.16],[-76.2,17.89],[-76.9,17.87],[-77.2,17.7],[-77.77,17.86],[-78.34,18.23],[-78.22,18.45],[-77.8,18.52]]]]},{id:`cu`,lon:-78.96,lat:21.63,small:!1,parts:[[[[-82.27,23.19],[-81.41,23.12],[-80.62,23.11],[-79.68,22.77],[-79.28,22.4],[-78.35,22.51],[-77.99,22.28],[-77.15,21.66],[-76.52,21.21],[-76.19,21.22],[-75.6,21.02],[-75.67,20.73],[-74.93,20.69],[-74.18,20.28],[-74.3,20.05],[-74.96,19.92],[-75.63,19.87],[-76.32,19.95],[-77.76,19.86],[-77.09,20.41],[-77.49,20.67],[-78.14,20.74],[-78.48,21.03],[-78.72,21.6],[-79.29,21.56],[-80.22,21.83],[-80.52,22.04],[-81.82,22.19],[-82.17,22.39],[-81.79,22.64],[-82.78,22.69],[-83.49,22.17],[-83.91,22.15],[-84.05,21.91],[-84.55,21.8],[-84.97,21.9],[-84.45,22.21],[-84.23,22.57],[-83.78,22.79],[-83.27,22.98],[-82.51,23.08]]]]},{id:`zw`,lon:29.79,lat:-18.91,small:!1,parts:[[[[31.19,-22.25],[30.66,-22.15],[30.32,-22.27],[29.84,-22.1],[29.43,-22.09],[28.79,-21.64],[28.02,-21.49],[27.73,-20.85],[27.73,-20.5],[27.3,-20.39],[26.16,-19.29],[25.85,-18.71],[25.65,-18.54],[25.26,-17.74],[26.38,-17.85],[26.71,-17.96],[27.05,-17.94],[27.6,-17.29],[28.47,-16.47],[28.83,-16.39],[28.95,-16.04],[29.52,-15.65],[30.27,-15.51],[30.34,-15.88],[31.17,-15.86],[31.64,-16.07],[31.85,-16.32],[32.33,-16.39],[32.85,-16.71],[32.85,-17.98],[32.65,-18.67],[32.61,-19.42],[32.77,-19.72],[32.66,-20.31],[32.51,-20.39],[32.24,-21.12]]]]},{id:`bw`,lon:23.77,lat:-22.1,small:!1,parts:[[[[29.43,-22.09],[28.02,-22.83],[27.12,-23.58],[26.79,-24.24],[26.49,-24.62],[25.94,-24.7],[25.77,-25.17],[25.67,-25.49],[25.03,-25.72],[24.21,-25.67],[23.73,-25.39],[23.31,-25.27],[22.83,-25.5],[22.58,-25.98],[22.11,-26.28],[21.61,-26.73],[20.89,-26.83],[20.67,-26.48],[20.76,-25.87],[20.17,-24.92],[19.9,-24.77],[19.9,-21.85],[20.88,-21.81],[20.91,-18.25],[21.66,-18.22],[23.2,-17.87],[23.58,-18.28],[24.22,-17.89],[24.52,-17.89],[25.08,-17.66],[25.26,-17.74],[25.65,-18.54],[25.85,-18.71],[26.16,-19.29],[27.3,-20.39],[27.73,-20.5],[27.73,-20.85],[28.02,-21.49],[28.79,-21.64]]]]},{id:`na`,lon:17.16,lat:-22.1,small:!1,parts:[[[[19.9,-24.77],[19.9,-28.46],[19,-28.97],[18.47,-29.05],[17.84,-28.86],[17.39,-28.78],[17.22,-28.36],[16.82,-28.08],[16.35,-28.58],[15.6,-27.82],[15.21,-27.09],[14.99,-26.12],[14.74,-25.39],[14.41,-23.85],[14.38,-22.66],[14.26,-22.11],[13.87,-21.7],[13.35,-20.87],[12.83,-19.67],[12.61,-19.05],[11.8,-18.07],[11.73,-17.3],[12.22,-17.11],[12.81,-16.94],[13.46,-16.97],[14.06,-17.42],[14.21,-17.35],[18.26,-17.31],[18.96,-17.79],[21.38,-17.93],[23.21,-17.52],[24.04,-17.3],[24.68,-17.35],[25.08,-17.58],[25.08,-17.66],[24.52,-17.89],[24.22,-17.89],[23.58,-18.28],[23.2,-17.87],[21.66,-18.22],[20.91,-18.25],[20.88,-21.81],[19.9,-21.85]]]]},{id:`sn`,lon:-14.51,lat:14.36,small:!1,parts:[[[[-16.71,13.6],[-17.13,14.37],[-17.62,14.73],[-17.18,14.92],[-16.7,15.62],[-16.46,16.14],[-16.12,16.46],[-15.62,16.37],[-15.14,16.59],[-14.58,16.6],[-14.1,16.3],[-13.44,16.04],[-12.83,15.3],[-12.17,14.62],[-12.12,13.99],[-11.93,13.42],[-11.55,13.14],[-11.47,12.75],[-11.51,12.44],[-11.66,12.39],[-12.2,12.47],[-12.28,12.35],[-12.5,12.33],[-13.22,12.58],[-13.7,12.59],[-15.55,12.63],[-15.82,12.52],[-16.15,12.55],[-16.68,12.39],[-16.84,13.15],[-15.93,13.13],[-15.69,13.27],[-15.51,13.28],[-15.14,13.51],[-14.71,13.3],[-14.28,13.28],[-13.84,13.51],[-14.05,13.79],[-14.38,13.63],[-14.69,13.63],[-15.08,13.88],[-15.4,13.86],[-15.63,13.62]]]]},{id:`ml`,lon:-3.54,lat:17.27,small:!1,parts:[[[[-11.51,12.44],[-11.47,12.75],[-11.55,13.14],[-11.93,13.42],[-12.12,13.99],[-12.17,14.62],[-11.84,14.8],[-11.67,15.39],[-11.35,15.41],[-10.65,15.13],[-10.09,15.33],[-9.7,15.26],[-9.55,15.49],[-5.54,15.5],[-5.32,16.2],[-5.49,16.33],[-5.97,20.64],[-6.45,24.96],[-4.92,24.97],[-1.55,22.79],[1.82,20.61],[2.06,20.14],[2.68,19.86],[3.15,19.69],[3.16,19.06],[4.27,19.16],[4.27,16.85],[3.72,16.18],[3.64,15.57],[2.75,15.41],[1.38,15.32],[1.02,14.97],[.38,14.93],[-.26,14.92],[-.52,15.12],[-1.07,14.97],[-2,14.56],[-2.19,14.25],[-2.97,13.8],[-3.11,13.54],[-3.52,13.34],[-4.01,13.47],[-4.28,13.23],[-4.43,12.54],[-5.22,11.71],[-5.2,11.37],[-5.47,10.95],[-5.41,10.37],[-5.82,10.22],[-6.05,10.1],[-6.2,10.52],[-6.49,10.41],[-6.67,10.43],[-6.85,10.14],[-7.62,10.15],[-7.9,10.3],[-8.03,10.21],[-8.34,10.49],[-8.28,10.79],[-8.41,10.91],[-8.62,10.81],[-8.58,11.14],[-8.38,11.39],[-8.79,11.81],[-8.9,12.09],[-9.13,12.31],[-9.33,12.33],[-9.57,12.19],[-9.89,12.06],[-10.16,11.84],[-10.59,11.92],[-10.87,12.18],[-11.04,12.21],[-11.3,12.08],[-11.46,12.08]]]]},{id:`mr`,lon:-10.33,lat:20.21,small:!1,parts:[[[[-17.06,21],[-16.85,21.33],[-12.93,21.33],[-13.12,22.77],[-12.88,23.29],[-11.94,23.37],[-11.97,25.93],[-8.69,25.88],[-8.69,27.4],[-4.92,24.97],[-6.45,24.96],[-5.97,20.64],[-5.49,16.33],[-5.32,16.2],[-5.54,15.5],[-9.55,15.49],[-9.7,15.26],[-10.09,15.33],[-10.65,15.13],[-11.35,15.41],[-11.67,15.39],[-11.84,14.8],[-12.17,14.62],[-12.83,15.3],[-13.44,16.04],[-14.1,16.3],[-14.58,16.6],[-15.14,16.59],[-15.62,16.37],[-16.12,16.46],[-16.46,16.14],[-16.55,16.67],[-16.27,17.17],[-16.15,18.11],[-16.26,19.1],[-16.38,19.59],[-16.28,20.09],[-16.54,20.57]]]]},{id:`bj`,lon:2.34,lat:9.65,small:!1,parts:[[[[2.69,6.26],[1.87,6.14],[1.62,6.83],[1.67,9.13],[1.46,9.34],[1.42,9.83],[1.08,10.18],[.77,10.47],[.9,11],[1.24,11.11],[1.45,11.55],[1.94,11.64],[2.15,11.94],[2.49,12.23],[2.85,12.24],[3.61,11.66],[3.57,11.33],[3.8,10.73],[3.6,10.33],[3.71,10.06],[3.22,9.44],[2.91,9.14],[2.72,8.51],[2.75,7.87]]]]},{id:`ne`,lon:9.32,lat:17.35,small:!1,parts:[[[[14.85,22.86],[15.1,21.31],[15.47,21.05],[15.49,20.73],[15.9,20.39],[15.69,19.96],[15.3,17.93],[15.25,16.63],[13.97,15.68],[13.54,14.37],[13.96,14],[13.96,13.35],[14.6,13.33],[14.5,12.86],[14.21,12.8],[14.18,12.48],[14,12.46],[13.32,13.56],[13.08,13.6],[12.3,13.04],[11.53,13.33],[10.99,13.39],[10.7,13.25],[10.11,13.28],[9.52,12.85],[9.02,12.83],[7.8,13.34],[7.33,13.1],[6.82,13.11],[6.45,13.49],[5.44,13.87],[4.37,13.75],[4.11,13.53],[3.97,12.96],[3.68,12.55],[3.61,11.66],[2.85,12.24],[2.49,12.23],[2.15,11.94],[2.18,12.63],[1.02,12.85],[.99,13.34],[.43,13.99],[.3,14.44],[.38,14.93],[1.02,14.97],[1.38,15.32],[2.75,15.41],[3.64,15.57],[3.72,16.18],[4.27,16.85],[4.27,19.16],[5.68,19.6],[8.57,21.57],[12,23.47],[13.58,23.04],[14.14,22.49]]]]},{id:`ng`,lon:8,lat:9.55,small:!1,parts:[[[[2.69,6.26],[2.75,7.87],[2.72,8.51],[2.91,9.14],[3.22,9.44],[3.71,10.06],[3.6,10.33],[3.8,10.73],[3.57,11.33],[3.61,11.66],[3.68,12.55],[3.97,12.96],[4.11,13.53],[4.37,13.75],[5.44,13.87],[6.45,13.49],[6.82,13.11],[7.33,13.1],[7.8,13.34],[9.02,12.83],[9.52,12.85],[10.11,13.28],[10.7,13.25],[10.99,13.39],[11.53,13.33],[12.3,13.04],[13.08,13.6],[13.32,13.56],[14,12.46],[14.18,12.48],[14.58,12.09],[14.47,11.9],[14.42,11.57],[13.57,10.8],[13.31,10.16],[13.17,9.64],[12.95,9.42],[12.75,8.72],[12.22,8.31],[12.07,7.8],[11.84,7.4],[11.75,6.98],[11.06,6.64],[10.5,7.06],[10.12,7.04],[9.52,6.45],[9.23,6.44],[8.76,5.48],[8.5,4.77],[7.46,4.41],[7.08,4.46],[6.7,4.24],[5.9,4.26],[5.36,4.89],[5.03,5.61],[4.33,6.27],[3.57,6.26]]]]},{id:`cm`,lon:12.61,lat:5.66,small:!1,parts:[[[[14.5,12.86],[14.9,12.22],[14.96,11.56],[14.92,10.89],[15.47,9.98],[14.91,9.99],[14.63,9.92],[14.17,10.02],[13.96,9.55],[14.55,8.97],[14.98,8.8],[15.12,8.38],[15.44,7.69],[15.28,7.42],[14.78,6.41],[14.54,6.23],[14.46,5.45],[14.56,5.03],[14.48,4.73],[14.95,4.21],[15.04,3.85],[15.41,3.33],[15.86,3.01],[15.91,2.56],[16.01,2.27],[15.94,1.73],[15.15,1.96],[14.34,2.23],[13.08,2.27],[12.95,2.32],[12.36,2.19],[11.75,2.33],[11.28,2.26],[9.65,2.28],[9.79,3.07],[9.41,3.73],[8.95,3.9],[8.75,4.35],[8.49,4.5],[8.5,4.77],[8.76,5.48],[9.23,6.44],[9.52,6.45],[10.12,7.04],[10.5,7.06],[11.06,6.64],[11.75,6.98],[11.84,7.4],[12.07,7.8],[12.22,8.31],[12.75,8.72],[12.95,9.42],[13.17,9.64],[13.31,10.16],[13.57,10.8],[14.42,11.57],[14.47,11.9],[14.58,12.09],[14.18,12.48],[14.21,12.8]]]]},{id:`tg`,lon:1,lat:8.44,small:!1,parts:[[[[.9,11],[.77,10.47],[1.08,10.18],[1.42,9.83],[1.46,9.34],[1.67,9.13],[1.62,6.83],[1.87,6.14],[1.06,5.93],[.84,6.28],[.57,6.91],[.49,7.41],[.71,8.31],[.46,8.68],[.37,9.47],[.37,10.19],[-.05,10.71],[.02,11.02]]]]},{id:`gh`,lon:-1.24,lat:7.93,small:!1,parts:[[[[.02,11.02],[-.05,10.71],[.37,10.19],[.37,9.47],[.46,8.68],[.71,8.31],[.49,7.41],[.57,6.91],[.84,6.28],[1.06,5.93],[-.51,5.34],[-1.06,5],[-1.96,4.71],[-2.86,5],[-2.81,5.39],[-3.25,6.25],[-2.98,7.38],[-2.56,8.22],[-2.83,9.64],[-2.96,10.39],[-2.94,10.96],[-1.2,11.01],[-.76,10.94],[-.44,11.1]]]]},{id:`ci`,lon:-5.61,lat:7.55,small:!1,parts:[[[[-8.03,10.21],[-7.9,10.3],[-7.62,10.15],[-6.85,10.14],[-6.67,10.43],[-6.49,10.41],[-6.2,10.52],[-6.05,10.1],[-5.82,10.22],[-5.41,10.37],[-4.96,10.15],[-4.78,9.82],[-4.33,9.61],[-3.98,9.86],[-3.51,9.9],[-2.83,9.64],[-2.56,8.22],[-2.98,7.38],[-3.25,6.25],[-2.81,5.39],[-2.86,5],[-3.31,4.98],[-4.01,5.18],[-4.65,5.17],[-5.83,4.99],[-6.53,4.71],[-7.52,4.34],[-7.71,4.36],[-7.63,5.19],[-7.54,5.31],[-7.57,5.71],[-7.99,6.13],[-8.31,6.19],[-8.6,6.47],[-8.39,6.91],[-8.49,7.4],[-8.44,7.69],[-8.28,7.69],[-8.22,8.12],[-8.3,8.32],[-8.2,8.45],[-7.83,8.58],[-8.08,9.38],[-8.31,9.79],[-8.23,10.13]]]]},{id:`gn`,lon:-11.06,lat:10.45,small:!1,parts:[[[[-13.7,12.59],[-13.22,12.58],[-12.5,12.33],[-12.28,12.35],[-12.2,12.47],[-11.66,12.39],[-11.51,12.44],[-11.46,12.08],[-11.3,12.08],[-11.04,12.21],[-10.87,12.18],[-10.59,11.92],[-10.16,11.84],[-9.89,12.06],[-9.57,12.19],[-9.33,12.33],[-9.13,12.31],[-8.9,12.09],[-8.79,11.81],[-8.38,11.39],[-8.58,11.14],[-8.62,10.81],[-8.41,10.91],[-8.28,10.79],[-8.34,10.49],[-8.03,10.21],[-8.23,10.13],[-8.31,9.79],[-8.08,9.38],[-7.83,8.58],[-8.2,8.45],[-8.3,8.32],[-8.22,8.12],[-8.28,7.69],[-8.44,7.69],[-8.72,7.71],[-8.93,7.31],[-9.21,7.31],[-9.41,7.53],[-9.34,7.93],[-9.75,8.54],[-10.02,8.43],[-10.23,8.41],[-10.51,8.35],[-10.5,8.72],[-10.65,8.98],[-10.62,9.27],[-10.84,9.69],[-11.12,10.05],[-11.92,10.05],[-12.15,9.86],[-12.43,9.84],[-12.6,9.62],[-12.71,9.34],[-13.25,8.9],[-13.69,9.49],[-14.07,9.89],[-14.33,10.02],[-14.58,10.22],[-14.69,10.66],[-14.84,10.88],[-15.13,11.04],[-14.69,11.53],[-14.38,11.51],[-14.12,11.68],[-13.9,11.68],[-13.74,11.81],[-13.83,12.14],[-13.72,12.25]]]]},{id:`gw`,lon:-15.11,lat:12.02,small:!0,parts:[[[[-16.68,12.39],[-16.15,12.55],[-15.82,12.52],[-15.55,12.63],[-13.7,12.59],[-13.72,12.25],[-13.83,12.14],[-13.74,11.81],[-13.9,11.68],[-14.12,11.68],[-14.38,11.51],[-14.69,11.53],[-15.13,11.04],[-15.67,11.46],[-16.09,11.53],[-16.31,11.81],[-16.31,11.96],[-16.61,12.17]]]]},{id:`lr`,lon:-9.41,lat:6.43,small:!1,parts:[[[[-8.44,7.69],[-8.49,7.4],[-8.39,6.91],[-8.6,6.47],[-8.31,6.19],[-7.99,6.13],[-7.57,5.71],[-7.54,5.31],[-7.63,5.19],[-7.71,4.36],[-7.98,4.36],[-9.01,4.83],[-9.91,5.59],[-10.77,6.14],[-11.44,6.79],[-11.2,7.11],[-11.15,7.4],[-10.69,7.94],[-10.23,8.41],[-10.02,8.43],[-9.75,8.54],[-9.34,7.93],[-9.41,7.53],[-9.21,7.31],[-8.93,7.31],[-8.72,7.71]]]]},{id:`sl`,lon:-11.8,lat:8.53,small:!0,parts:[[[[-13.25,8.9],[-12.71,9.34],[-12.6,9.62],[-12.43,9.84],[-12.15,9.86],[-11.92,10.05],[-11.12,10.05],[-10.84,9.69],[-10.62,9.27],[-10.65,8.98],[-10.5,8.72],[-10.51,8.35],[-10.23,8.41],[-10.69,7.94],[-11.15,7.4],[-11.2,7.11],[-11.44,6.79],[-11.71,6.86],[-12.43,7.26],[-12.95,7.8],[-13.12,8.16]]]]},{id:`bf`,lon:-1.78,lat:12.31,small:!1,parts:[[[[-5.41,10.37],[-5.47,10.95],[-5.2,11.37],[-5.22,11.71],[-4.43,12.54],[-4.28,13.23],[-4.01,13.47],[-3.52,13.34],[-3.11,13.54],[-2.97,13.8],[-2.19,14.25],[-2,14.56],[-1.07,14.97],[-.52,15.12],[-.26,14.92],[.38,14.93],[.3,14.44],[.43,13.99],[.99,13.34],[1.02,12.85],[2.18,12.63],[2.15,11.94],[1.94,11.64],[1.45,11.55],[1.24,11.11],[.9,11],[.02,11.02],[-.44,11.1],[-.76,10.94],[-1.2,11.01],[-2.94,10.96],[-2.96,10.39],[-2.83,9.64],[-3.51,9.9],[-3.98,9.86],[-4.33,9.61],[-4.78,9.82],[-4.96,10.15]]]]},{id:`cf`,lon:20.38,lat:6.54,small:!1,parts:[[[[27.37,5.23],[27.05,5.13],[26.4,5.15],[25.65,5.26],[25.28,5.17],[25.13,4.93],[24.81,4.9],[24.41,5.11],[23.3,4.61],[22.84,4.71],[22.7,4.63],[22.4,4.03],[21.66,4.22],[20.93,4.32],[20.29,4.69],[19.47,5.03],[18.93,4.71],[18.54,4.2],[18.45,3.5],[17.81,3.56],[17.13,3.73],[16.54,3.2],[16.01,2.27],[15.91,2.56],[15.86,3.01],[15.41,3.33],[15.04,3.85],[14.95,4.21],[14.48,4.73],[14.56,5.03],[14.46,5.45],[14.54,6.23],[14.78,6.41],[15.28,7.42],[16.1,7.5],[16.29,7.75],[16.46,7.74],[16.71,7.51],[17.97,7.89],[18.39,8.28],[18.91,8.63],[18.81,8.98],[19.09,9.07],[20.06,9.01],[21,9.48],[21.72,10.57],[22.23,10.97],[22.87,11.14],[22.98,10.71],[23.55,10.09],[23.56,9.68],[23.39,9.27],[23.46,8.95],[23.81,8.67],[24.57,8.23],[25.12,7.83],[25.12,7.5],[25.8,6.98],[26.21,6.55],[26.47,5.95],[27.21,5.55]]]]},{id:`cg`,lon:15.13,lat:-.84,small:!1,parts:[[[[18.45,3.5],[18.39,2.9],[18.1,2.37],[17.9,1.74],[17.78,.86],[17.83,.29],[17.66,-.06],[17.64,-.42],[17.52,-.74],[16.86,-1.23],[16.41,-1.74],[15.97,-2.71],[16.01,-3.54],[15.75,-3.86],[15.17,-4.34],[14.58,-4.97],[14.21,-4.79],[14.15,-4.51],[13.6,-4.5],[13.26,-4.88],[12.99,-4.78],[12.62,-4.44],[12.32,-4.61],[11.91,-5.04],[11.09,-3.98],[11.86,-3.43],[11.48,-2.77],[11.82,-2.51],[12.49,-2.39],[12.58,-1.95],[13.11,-2.43],[13.99,-2.47],[14.3,-2],[14.43,-1.33],[14.32,-.55],[13.84,.04],[14.28,1.2],[14.03,1.4],[13.28,1.31],[13,1.83],[13.08,2.27],[14.34,2.23],[15.15,1.96],[15.94,1.73],[16.01,2.27],[16.54,3.2],[17.13,3.73],[17.81,3.56]]]]},{id:`ga`,lon:11.69,lat:-.65,small:!1,parts:[[[[11.28,2.26],[11.75,2.33],[12.36,2.19],[12.95,2.32],[13.08,2.27],[13,1.83],[13.28,1.31],[14.03,1.4],[14.28,1.2],[13.84,.04],[14.32,-.55],[14.43,-1.33],[14.3,-2],[13.99,-2.47],[13.11,-2.43],[12.58,-1.95],[12.49,-2.39],[11.82,-2.51],[11.48,-2.77],[11.86,-3.43],[11.09,-3.98],[10.07,-2.97],[9.41,-2.14],[8.8,-1.11],[8.83,-.78],[9.05,-.46],[9.29,.27],[9.49,1.01],[9.83,1.07],[11.28,1.06]]]]},{id:`gq`,lon:10.36,lat:1.65,small:!0,parts:[[[[9.65,2.28],[11.28,2.26],[11.28,1.06],[9.83,1.07],[9.49,1.01],[9.3,1.16]]]]},{id:`zm`,lon:27.73,lat:-13.4,small:!1,parts:[[[[30.74,-8.34],[31.16,-8.59],[31.56,-8.76],[32.19,-8.93],[32.76,-9.23],[33.23,-9.68],[33.49,-10.53],[33.32,-10.8],[33.11,-11.61],[33.31,-12.44],[32.99,-12.78],[32.69,-13.71],[33.22,-13.97],[30.18,-14.8],[30.27,-15.51],[29.52,-15.65],[28.95,-16.04],[28.83,-16.39],[28.47,-16.47],[27.6,-17.29],[27.05,-17.94],[26.71,-17.96],[26.38,-17.85],[25.26,-17.74],[25.08,-17.66],[25.08,-17.58],[24.68,-17.35],[24.04,-17.3],[23.21,-17.52],[22.56,-16.9],[21.89,-16.08],[21.93,-12.9],[24.02,-12.91],[23.93,-12.57],[24.08,-12.19],[23.9,-11.72],[24.02,-11.24],[23.91,-10.93],[24.26,-10.95],[24.31,-11.26],[24.78,-11.24],[25.42,-11.33],[25.75,-11.78],[26.55,-11.93],[27.16,-11.61],[27.39,-12.13],[28.15,-12.27],[28.52,-12.7],[28.94,-13.25],[29.7,-13.26],[29.62,-12.18],[29.34,-12.36],[28.64,-11.97],[28.37,-11.79],[28.5,-10.79],[28.67,-9.61],[28.45,-9.16],[28.73,-8.53],[29,-8.41],[30.35,-8.24]]]]},{id:`mw`,lon:34.19,lat:-13.17,small:!1,parts:[[[[32.76,-9.23],[33.74,-9.42],[33.94,-9.69],[34.28,-10.16],[34.56,-11.52],[34.28,-12.28],[34.56,-13.58],[34.91,-13.57],[35.27,-13.89],[35.69,-14.61],[35.77,-15.9],[35.34,-16.11],[35.03,-16.8],[34.38,-16.18],[34.31,-15.48],[34.52,-15.01],[34.46,-14.61],[34.07,-14.36],[33.79,-14.45],[33.22,-13.97],[32.69,-13.71],[32.99,-12.78],[33.31,-12.44],[33.11,-11.61],[33.32,-10.8],[33.49,-10.53],[33.23,-9.68]]]]},{id:`mz`,lon:35.47,lat:-17.23,small:!1,parts:[[[[34.56,-11.52],[35.31,-11.44],[36.51,-11.72],[36.78,-11.6],[37.47,-11.57],[37.83,-11.27],[38.43,-11.29],[39.52,-10.9],[40.32,-10.32],[40.48,-10.77],[40.44,-11.76],[40.56,-12.64],[40.6,-14.2],[40.78,-14.69],[40.48,-15.41],[40.09,-16.1],[39.45,-16.72],[38.54,-17.1],[37.41,-17.59],[36.28,-18.66],[35.9,-18.84],[35.2,-19.55],[34.79,-19.78],[34.7,-20.5],[35.18,-21.25],[35.37,-21.84],[35.39,-22.14],[35.56,-22.09],[35.53,-23.07],[35.37,-23.54],[35.61,-23.71],[35.46,-24.12],[35.04,-24.48],[34.22,-24.82],[33.01,-25.36],[32.57,-25.73],[32.66,-26.15],[32.92,-26.22],[32.83,-26.74],[32.07,-26.73],[31.98,-26.29],[31.84,-25.84],[31.75,-25.48],[31.93,-24.37],[31.67,-23.66],[31.19,-22.25],[32.24,-21.12],[32.51,-20.39],[32.66,-20.31],[32.77,-19.72],[32.61,-19.42],[32.65,-18.67],[32.85,-17.98],[32.85,-16.71],[32.33,-16.39],[31.85,-16.32],[31.64,-16.07],[31.17,-15.86],[30.34,-15.88],[30.27,-15.51],[30.18,-14.8],[33.22,-13.97],[33.79,-14.45],[34.07,-14.36],[34.46,-14.61],[34.52,-15.01],[34.31,-15.48],[34.38,-16.18],[35.03,-16.8],[35.34,-16.11],[35.77,-15.9],[35.69,-14.61],[35.27,-13.89],[34.91,-13.57],[34.56,-13.58],[34.28,-12.28]]]]},{id:`sz`,lon:31.39,lat:-26.49,small:!0,parts:[[[[32.07,-26.73],[31.87,-27.18],[31.28,-27.29],[30.68,-26.74],[30.68,-26.4],[30.95,-26.02],[31.04,-25.73],[31.33,-25.66],[31.84,-25.84],[31.98,-26.29]]]]},{id:`ao`,lon:17.5,lat:-12.29,small:!1,parts:[[[[12.99,-4.78],[12.63,-4.99],[12.47,-5.25],[12.44,-5.68],[12.18,-5.79],[11.91,-5.04],[12.32,-4.61],[12.62,-4.44]]],[[[12.32,-6.1],[12.74,-5.97],[13.02,-5.98],[13.38,-5.86],[16.33,-5.88],[16.57,-6.62],[16.86,-7.22],[17.09,-7.54],[17.47,-8.07],[18.14,-7.99],[18.46,-7.85],[19.02,-7.99],[19.17,-7.74],[19.42,-7.16],[20.04,-7.12],[20.09,-6.94],[20.6,-6.94],[20.51,-7.3],[21.73,-7.29],[21.75,-7.92],[21.95,-8.31],[21.8,-8.91],[21.88,-9.52],[22.21,-9.89],[22.16,-11.08],[22.4,-10.99],[22.84,-11.02],[23.46,-10.87],[23.91,-10.93],[24.02,-11.24],[23.9,-11.72],[24.08,-12.19],[23.93,-12.57],[24.02,-12.91],[21.93,-12.9],[21.89,-16.08],[22.56,-16.9],[23.21,-17.52],[21.38,-17.93],[18.96,-17.79],[18.26,-17.31],[14.21,-17.35],[14.06,-17.42],[13.46,-16.97],[12.81,-16.94],[12.22,-17.11],[11.73,-17.3],[11.64,-16.67],[11.78,-15.79],[12.12,-14.88],[12.18,-14.45],[12.5,-13.55],[12.74,-13.14],[13.31,-12.48],[13.64,-12.04],[13.74,-11.3],[13.69,-10.73],[13.39,-10.37],[13.12,-9.77],[12.88,-9.17],[12.93,-8.96],[13.24,-8.56],[12.93,-7.6],[12.73,-6.93],[12.23,-6.29]]]]},{id:`bi`,lon:29.92,lat:-3.38,small:!0,parts:[[[[30.47,-2.41],[30.53,-2.81],[30.74,-3.03],[30.75,-3.36],[30.5,-3.57],[30.12,-4.09],[29.75,-4.45],[29.34,-4.5],[29.28,-3.29],[29.03,-2.84],[29.63,-2.92],[29.94,-2.35]]]]},{id:`il`,lon:35,lat:31.49,small:!0,parts:[[[[35.72,32.71],[35.54,32.39],[35.18,32.53],[34.98,31.87],[35.22,31.75],[34.97,31.62],[34.93,31.35],[35.4,31.49],[35.42,31.1],[34.92,29.5],[34.82,29.76],[34.27,31.22],[34.55,31.55],[34.49,31.61],[34.75,32.07],[34.95,32.83],[35.1,33.08],[35.13,33.09],[35.46,33.09],[35.55,33.26],[35.82,33.28],[35.84,32.87],[35.7,32.72]]]]},{id:`lb`,lon:35.87,lat:33.91,small:!0,parts:[[[[35.82,33.28],[35.55,33.26],[35.46,33.09],[35.13,33.09],[35.48,33.91],[35.98,34.61],[36,34.65],[36.45,34.59],[36.61,34.2],[36.07,33.82]]]]},{id:`mg`,lon:46.69,lat:-19.36,small:!1,parts:[[[[49.54,-12.47],[49.81,-12.9],[50.06,-13.56],[50.22,-14.76],[50.48,-15.23],[50.38,-15.71],[50.2,-16],[49.86,-15.41],[49.67,-15.71],[49.86,-16.45],[49.78,-16.87],[49.5,-17.11],[49.43,-17.95],[49.04,-19.12],[48.55,-20.5],[47.93,-22.39],[47.55,-23.78],[47.1,-24.94],[46.28,-25.18],[45.41,-25.6],[44.83,-25.35],[44.04,-24.99],[43.76,-24.46],[43.7,-23.57],[43.35,-22.78],[43.25,-22.06],[43.43,-21.34],[43.89,-21.16],[43.9,-20.83],[44.38,-20.07],[44.47,-19.44],[44.23,-18.96],[44.04,-18.33],[43.96,-17.41],[44.31,-16.85],[44.45,-16.22],[44.94,-16.18],[45.5,-15.97],[45.87,-15.79],[46.31,-15.78],[46.88,-15.21],[47.71,-14.59],[48,-14.09],[47.87,-13.66],[48.29,-13.78],[48.84,-13.09],[48.87,-12.49],[49.2,-12.04]]]]},{id:`ps`,lon:35.27,lat:31.94,small:!0,parts:[[[[35.4,31.49],[34.93,31.35],[34.97,31.62],[35.22,31.75],[34.98,31.87],[35.18,32.53],[35.54,32.39],[35.54,31.78]]]]},{id:`gm`,lon:-15.43,lat:13.48,small:!0,parts:[[[[-16.71,13.6],[-15.63,13.62],[-15.4,13.86],[-15.08,13.88],[-14.69,13.63],[-14.38,13.63],[-14.05,13.79],[-13.84,13.51],[-14.28,13.28],[-14.71,13.3],[-15.14,13.51],[-15.51,13.28],[-15.69,13.27],[-15.93,13.13],[-16.84,13.15]]]]},{id:`tn`,lon:9.54,lat:34.17,small:!1,parts:[[[[9.48,30.31],[9.06,32.1],[8.44,32.51],[8.43,32.75],[7.61,33.34],[7.53,34.1],[8.14,34.66],[8.38,35.48],[8.22,36.43],[8.42,36.95],[9.51,37.35],[10.21,37.23],[10.18,36.72],[11.03,37.09],[11.1,36.9],[10.6,36.41],[10.59,35.95],[10.94,35.7],[10.81,34.83],[10.15,34.33],[10.34,33.79],[10.86,33.77],[11.11,33.29],[11.49,33.14],[11.43,32.37],[10.95,32.08],[10.64,31.76],[9.95,31.38],[10.06,30.96],[9.97,30.54]]]]},{id:`dz`,lon:2.6,lat:28.19,small:!1,parts:[[[[-8.69,27.4],[-8.66,27.59],[-8.67,27.66],[-8.67,28.84],[-7.06,29.58],[-6.06,29.73],[-5.24,30],[-4.86,30.5],[-3.69,30.9],[-3.65,31.64],[-3.07,31.72],[-2.62,32.09],[-1.31,32.26],[-1.13,32.65],[-1.39,32.86],[-1.73,33.92],[-1.79,34.53],[-2.17,35.17],[-1.21,35.72],[-.13,35.89],[.5,36.3],[1.47,36.61],[3.16,36.78],[4.82,36.86],[5.32,36.72],[6.26,37.11],[7.33,37.12],[7.74,36.89],[8.42,36.95],[8.22,36.43],[8.38,35.48],[8.14,34.66],[7.53,34.1],[7.61,33.34],[8.43,32.75],[8.44,32.51],[9.06,32.1],[9.48,30.31],[9.8,29.42],[9.86,28.96],[9.68,28.14],[9.76,27.69],[9.63,27.14],[9.71,26.51],[9.32,26.09],[9.91,25.37],[9.95,24.94],[10.31,24.38],[10.77,24.56],[11.56,24.1],[12,23.47],[8.57,21.57],[5.68,19.6],[4.27,19.16],[3.16,19.06],[3.15,19.69],[2.68,19.86],[2.06,20.14],[1.82,20.61],[-1.55,22.79],[-4.92,24.97]]]]},{id:`jo`,lon:36.78,lat:31.25,small:!1,parts:[[[[35.54,32.39],[35.72,32.71],[36.83,32.31],[38.79,33.38],[39.2,32.16],[39,32.01],[37,31.51],[38,30.51],[37.67,30.34],[37.5,30],[36.74,29.87],[36.5,29.51],[36.07,29.2],[34.95,29.36],[34.92,29.5],[35.42,31.1],[35.4,31.49],[35.54,31.78]]]]},{id:`ae`,lon:54.21,lat:23.87,small:!1,parts:[[[[51.58,24.24],[51.76,24.29],[51.8,24.02],[52.58,24.18],[53.4,24.15],[54.01,24.12],[54.69,24.8],[55.44,25.44],[56.07,26.06],[56.26,25.71],[56.4,24.93],[55.89,24.92],[55.8,24.27],[55.98,24.13],[55.53,23.93],[55.53,23.53],[55.23,23.11],[55.21,22.71],[55.01,22.5],[52,23],[51.62,24.01]]]]},{id:`qa`,lon:51.18,lat:25.32,small:!0,parts:[[[[50.81,24.75],[50.74,25.48],[51.01,26.01],[51.29,26.12],[51.59,25.8],[51.61,25.22],[51.39,24.63],[51.11,24.56]]]]},{id:`kw`,lon:47.6,lat:29.31,small:!0,parts:[[[[47.98,29.98],[48.18,29.53],[48.09,29.31],[48.42,28.55],[47.71,28.53],[47.46,29],[46.57,29.1],[47.3,30.06]]]]},{id:`iq`,lon:43.76,lat:33.04,small:!1,parts:[[[[39.2,32.16],[38.79,33.38],[41.01,34.42],[41.38,35.63],[41.29,36.36],[41.84,36.61],[42.35,37.23],[42.78,37.39],[43.94,37.26],[44.29,37],[44.77,37.17],[45.42,35.98],[46.08,35.68],[46.15,35.09],[45.65,34.75],[45.42,33.97],[46.11,33.02],[47.34,32.47],[47.85,31.71],[47.68,30.98],[48,30.98],[48.02,30.45],[48.57,29.93],[47.98,29.98],[47.3,30.06],[46.57,29.1],[44.71,29.18],[41.89,31.19],[40.4,31.89]]]]},{id:`om`,lon:56.1,lat:20.58,small:!1,parts:[[[[55.21,22.71],[55.23,23.11],[55.53,23.53],[55.53,23.93],[55.98,24.13],[55.8,24.27],[55.89,24.92],[56.4,24.93],[56.85,24.24],[57.4,23.88],[58.14,23.75],[58.73,23.57],[59.18,22.99],[59.45,22.66],[59.81,22.53],[59.81,22.31],[59.44,21.71],[59.28,21.43],[58.86,21.11],[58.49,20.43],[58.03,20.48],[57.83,20.24],[57.67,19.74],[57.79,19.07],[57.7,18.95],[57.24,18.95],[56.61,18.57],[56.51,18.09],[56.28,17.88],[55.66,17.88],[55.27,17.63],[55.27,17.23],[54.79,16.95],[54.24,17.04],[53.57,16.71],[53.11,16.65],[52.78,17.35],[52,19],[55,20],[55.67,22]]],[[[56.26,25.71],[56.07,26.06],[56.36,26.4],[56.49,26.31],[56.39,25.9]]]]},{id:`vu`,lon:166.91,lat:-15.22,small:!0,parts:[[[[167.22,-15.89],[167.85,-16.47],[167.52,-16.6],[167.18,-16.16]]],[[[166.79,-15.67],[166.65,-15.39],[166.63,-14.63],[167.11,-14.93],[167.27,-15.74],[167,-15.61]]]]},{id:`kh`,lon:104.87,lat:12.68,small:!1,parts:[[[[102.58,12.19],[102.35,13.39],[102.99,14.23],[104.28,14.42],[105.22,14.27],[106.04,13.88],[106.5,14.57],[107.38,14.2],[107.61,13.54],[107.49,12.34],[105.81,11.57],[106.25,10.96],[105.2,10.89],[104.33,10.49],[103.5,10.63],[103.09,11.15]]]]},{id:`th`,lon:101.01,lat:15.02,small:!1,parts:[[[[105.22,14.27],[104.28,14.42],[102.99,14.23],[102.35,13.39],[102.58,12.19],[101.69,12.65],[100.83,12.63],[100.98,13.41],[100.1,13.41],[100.02,12.31],[99.48,10.85],[99.15,9.96],[99.22,9.24],[99.87,9.21],[100.28,8.3],[100.46,7.43],[101.02,6.86],[101.62,6.74],[102.14,6.22],[101.81,5.81],[101.16,5.69],[101.08,6.21],[100.26,6.64],[100.09,6.46],[99.69,6.85],[99.52,7.34],[98.99,7.91],[98.5,8.38],[98.34,7.79],[98.15,8.35],[98.26,8.97],[98.55,9.93],[99.04,10.96],[99.59,11.89],[99.2,12.8],[99.21,13.27],[99.1,13.83],[98.43,14.62],[98.19,15.12],[98.54,15.31],[98.9,16.18],[98.5,16.84],[97.86,17.57],[97.38,18.45],[97.8,18.63],[98.25,19.71],[98.96,19.75],[99.54,20.19],[100.12,20.42],[100.55,20.11],[100.6,19.51],[101.28,19.46],[101.04,18.41],[101.06,17.51],[102.11,18.11],[102.41,17.93],[103,17.96],[103.2,18.31],[103.96,18.24],[104.72,17.43],[104.78,16.44],[105.59,15.57],[105.54,14.72]]]]},{id:`la`,lon:103.75,lat:18.45,small:!1,parts:[[[[107.38,14.2],[106.5,14.57],[106.04,13.88],[105.22,14.27],[105.54,14.72],[105.59,15.57],[104.78,16.44],[104.72,17.43],[103.96,18.24],[103.2,18.31],[103,17.96],[102.41,17.93],[102.11,18.11],[101.06,17.51],[101.04,18.41],[101.28,19.46],[100.6,19.51],[100.55,20.11],[100.12,20.42],[100.33,20.79],[101.18,21.44],[101.27,21.2],[101.8,21.17],[101.65,22.32],[102.17,22.46],[102.75,21.68],[103.2,20.77],[104.44,20.76],[104.82,19.89],[104.18,19.62],[103.9,19.27],[105.09,18.67],[105.93,17.48],[106.56,16.6],[107.31,15.91],[107.56,15.2]]]]},{id:`mm`,lon:96.51,lat:21.02,small:!1,parts:[[[[100.12,20.42],[99.54,20.19],[98.96,19.75],[98.25,19.71],[97.8,18.63],[97.38,18.45],[97.86,17.57],[98.5,16.84],[98.9,16.18],[98.54,15.31],[98.19,15.12],[98.43,14.62],[99.1,13.83],[99.21,13.27],[99.2,12.8],[99.59,11.89],[99.04,10.96],[98.55,9.93],[98.46,10.68],[98.77,11.44],[98.43,12.03],[98.51,13.12],[98.1,13.64],[97.78,14.84],[97.6,16.1],[97.16,16.93],[96.5,16.43],[95.37,15.71],[94.81,15.8],[94.19,16.04],[94.54,17.28],[94.33,18.21],[93.54,19.37],[93.66,19.73],[93.08,19.86],[92.37,20.67],[92.3,21.48],[92.65,21.32],[92.67,22.04],[93.17,22.28],[93.06,22.7],[93.29,23.04],[93.33,24.08],[94.11,23.85],[94.55,24.67],[94.6,25.16],[95.15,26],[95.13,26.57],[96.42,27.26],[97.13,27.08],[97.05,27.7],[97.4,27.88],[97.33,28.26],[97.91,28.34],[98.25,27.75],[98.68,27.51],[98.71,26.74],[98.67,25.92],[97.72,25.08],[97.61,23.9],[98.66,24.06],[98.9,23.14],[99.53,22.95],[99.24,22.12],[99.98,21.74],[100.42,21.56],[101.15,21.85],[101.18,21.44],[100.33,20.79]]]]},{id:`vn`,lon:106.29,lat:16.65,small:!1,parts:[[[[104.33,10.49],[105.2,10.89],[106.25,10.96],[105.81,11.57],[107.49,12.34],[107.61,13.54],[107.38,14.2],[107.56,15.2],[107.31,15.91],[106.56,16.6],[105.93,17.48],[105.09,18.67],[103.9,19.27],[104.18,19.62],[104.82,19.89],[104.44,20.76],[103.2,20.77],[102.75,21.68],[102.17,22.46],[102.71,22.71],[103.5,22.7],[104.48,22.82],[105.33,23.35],[105.81,22.98],[106.72,22.79],[106.57,22.22],[107.04,21.81],[108.05,21.55],[106.71,20.7],[105.88,19.75],[105.66,19.06],[106.43,18],[107.36,16.7],[108.27,16.08],[108.88,15.28],[109.33,13.43],[109.2,11.67],[108.37,11.01],[107.22,10.36],[106.4,9.53],[105.16,8.6],[104.8,9.24],[105.08,9.92]]]]},{id:`kp`,lon:127.16,lat:40.14,small:!1,parts:[[[[130.64,42.4],[130.78,42.22],[130.4,42.28],[129.97,41.94],[129.67,41.6],[129.7,40.88],[129.19,40.66],[129.01,40.48],[128.63,40.19],[127.97,40.03],[127.53,39.76],[127.5,39.32],[127.39,39.21],[127.79,39.05],[128.35,38.61],[128.21,38.37],[127.78,38.3],[127.07,38.26],[126.68,37.81],[126.24,37.84],[126.18,37.75],[125.69,37.94],[125.57,37.75],[125.28,37.67],[125.24,37.86],[124.98,37.95],[124.71,38.11],[124.98,38.55],[125.22,38.67],[125.13,38.85],[125.39,39.39],[125.32,39.55],[124.74,39.66],[124.26,39.93],[125.08,40.57],[126.18,41.11],[126.87,41.82],[127.34,41.5],[128.21,41.47],[128.05,41.99],[129.6,42.42],[130,42.98]]]]},{id:`kr`,lon:127.82,lat:36.43,small:!1,parts:[[[[126.18,37.75],[126.24,37.84],[126.68,37.81],[127.07,38.26],[127.78,38.3],[128.21,38.37],[128.35,38.61],[129.21,37.43],[129.46,36.78],[129.47,35.63],[129.09,35.08],[128.18,34.89],[127.39,34.48],[126.49,34.39],[126.37,34.93],[126.56,35.68],[126.12,36.73],[126.86,36.89]]]]},{id:`mn`,lon:102.95,lat:46.82,small:!1,parts:[[[[87.75,49.3],[88.8,49.47],[90.71,50.33],[92.23,50.8],[93.11,50.49],[94.15,50.48],[94.82,50.01],[95.81,49.98],[97.26,49.73],[98.23,50.42],[97.83,51.01],[98.86,52.05],[99.98,51.63],[100.89,51.52],[102.07,51.26],[102.26,50.51],[103.68,50.09],[104.62,50.27],[105.89,50.41],[106.89,50.27],[107.87,49.79],[108.47,49.28],[109.4,49.29],[110.66,49.13],[111.58,49.38],[112.9,49.54],[114.36,50.25],[114.96,50.14],[115.49,49.81],[116.68,49.89],[116.19,49.13],[115.48,48.14],[115.74,47.73],[116.31,47.85],[117.29,47.7],[118.06,48.07],[118.87,47.75],[119.77,47.05],[119.66,46.69],[118.87,46.8],[117.42,46.67],[116.72,46.39],[115.98,45.73],[114.46,45.34],[113.46,44.81],[112.43,45.01],[111.87,45.1],[111.35,44.46],[111.67,44.07],[111.83,43.74],[111.13,43.41],[110.41,42.87],[109.24,42.52],[107.74,42.48],[106.13,42.14],[104.96,41.6],[104.52,41.91],[103.31,41.91],[101.83,42.51],[100.85,42.66],[99.52,42.52],[97.45,42.75],[96.35,42.73],[95.76,43.32],[95.31,44.24],[94.69,44.35],[93.48,44.98],[92.13,45.12],[90.95,45.29],[90.59,45.72],[90.97,46.89],[90.28,47.69],[88.85,48.07],[88.02,48.6]]]]},{id:`in`,lon:79.59,lat:22.93,small:!1,parts:[[[[97.33,28.26],[97.4,27.88],[97.05,27.7],[97.13,27.08],[96.42,27.26],[95.13,26.57],[95.15,26],[94.6,25.16],[94.55,24.67],[94.11,23.85],[93.33,24.08],[93.29,23.04],[93.06,22.7],[93.17,22.28],[92.67,22.04],[92.14,23.63],[91.87,23.62],[91.71,22.99],[91.16,23.5],[91.47,24.07],[91.91,24.13],[92.38,24.98],[91.8,25.15],[90.87,25.13],[89.92,25.27],[89.83,25.96],[89.35,26.02],[88.56,26.45],[88.21,25.77],[88.93,25.24],[88.31,24.87],[88.08,24.5],[88.7,24.23],[88.53,23.63],[88.88,22.88],[89.03,22.06],[88.89,21.69],[88.21,21.7],[86.98,21.5],[87.03,20.74],[86.5,20.15],[85.06,19.48],[83.94,18.3],[83.19,17.67],[82.19,17.02],[82.19,16.56],[81.69,16.31],[80.79,15.95],[80.33,15.9],[80.02,15.14],[80.23,13.84],[80.29,13.01],[79.86,12.06],[79.86,10.36],[79.34,10.31],[78.89,9.55],[79.19,9.22],[78.28,8.93],[77.94,8.25],[77.54,7.97],[76.59,8.9],[76.13,10.3],[75.75,11.31],[75.4,11.78],[74.86,12.74],[74.62,13.99],[74.44,14.62],[73.53,15.99],[73.12,17.93],[72.82,19.21],[72.82,20.42],[72.63,21.36],[71.17,20.76],[70.47,20.88],[69.17,22.09],[69.64,22.45],[69.35,22.84],[68.18,23.69],[68.84,24.36],[71.04,24.36],[70.84,25.21],[70.28,25.72],[70.17,26.49],[69.51,26.94],[70.62,27.99],[71.78,27.91],[72.82,28.96],[73.45,29.98],[74.42,30.98],[74.41,31.69],[75.26,32.27],[74.45,32.77],[74.1,33.44],[73.75,34.32],[74.24,34.75],[75.76,34.51],[76.87,34.65],[77.84,35.49],[78.91,34.32],[78.81,33.51],[79.21,32.99],[79.18,32.48],[78.46,32.62],[78.74,31.52],[79.72,30.88],[81.11,30.18],[80.48,29.73],[80.09,28.79],[81.06,28.42],[82,27.93],[83.3,27.36],[84.67,27.24],[85.25,26.73],[86.02,26.63],[87.23,26.4],[88.06,26.41],[88.17,26.81],[88.04,27.45],[88.12,27.88],[88.73,28.09],[88.81,27.3],[88.84,27.1],[89.74,26.72],[90.37,26.88],[91.22,26.81],[92.03,26.84],[92.11,27.45],[91.7,27.77],[92.5,27.9],[93.41,28.64],[94.57,29.28],[95.41,29.03],[96.12,29.45],[96.59,28.83],[96.25,28.41]]]]},{id:`bd`,lon:90.27,lat:23.84,small:!1,parts:[[[[92.67,22.04],[92.65,21.32],[92.3,21.48],[92.37,20.67],[92.08,21.19],[92.03,21.7],[91.84,22.18],[91.42,22.77],[90.5,22.8],[90.59,22.39],[90.27,21.84],[89.85,22.04],[89.7,21.86],[89.42,21.97],[89.03,22.06],[88.88,22.88],[88.53,23.63],[88.7,24.23],[88.08,24.5],[88.31,24.87],[88.93,25.24],[88.21,25.77],[88.56,26.45],[89.35,26.02],[89.83,25.96],[89.92,25.27],[90.87,25.13],[91.8,25.15],[92.38,24.98],[91.91,24.13],[91.47,24.07],[91.16,23.5],[91.71,22.99],[91.87,23.62],[92.14,23.63]]]]},{id:`bt`,lon:90.47,lat:27.43,small:!0,parts:[[[[91.7,27.77],[92.11,27.45],[92.03,26.84],[91.22,26.81],[90.37,26.88],[89.74,26.72],[88.84,27.1],[88.81,27.3],[89.48,28.04],[90.02,28.3],[90.73,28.06],[91.26,28.04]]]]},{id:`np`,lon:84.01,lat:28.24,small:!1,parts:[[[[88.12,27.88],[88.04,27.45],[88.17,26.81],[88.06,26.41],[87.23,26.4],[86.02,26.63],[85.25,26.73],[84.67,27.24],[83.3,27.36],[82,27.93],[81.06,28.42],[80.09,28.79],[80.48,29.73],[81.11,30.18],[81.52,30.42],[82.33,30.11],[83.34,29.46],[83.9,29.32],[84.24,28.84],[85.01,28.64],[85.82,28.2],[86.95,27.97]]]]},{id:`pk`,lon:69.41,lat:29.97,small:!1,parts:[[[[77.84,35.49],[76.87,34.65],[75.76,34.51],[74.24,34.75],[73.75,34.32],[74.1,33.44],[74.45,32.77],[75.26,32.27],[74.41,31.69],[74.42,30.98],[73.45,29.98],[72.82,28.96],[71.78,27.91],[70.62,27.99],[69.51,26.94],[70.17,26.49],[70.28,25.72],[70.84,25.21],[71.04,24.36],[68.84,24.36],[68.18,23.69],[67.44,23.95],[67.15,24.66],[66.37,25.42],[64.53,25.24],[62.91,25.22],[61.5,25.08],[61.88,26.24],[63.32,26.76],[63.23,27.22],[62.75,27.38],[62.73,28.26],[61.77,28.7],[61.37,29.3],[60.87,29.83],[62.55,29.32],[63.55,29.47],[64.15,29.34],[64.35,29.56],[65.05,29.47],[66.35,29.89],[66.38,30.74],[66.94,31.3],[67.68,31.3],[67.79,31.58],[68.56,31.71],[68.93,31.62],[69.32,31.9],[69.26,32.5],[69.69,33.11],[70.32,33.36],[69.93,34.02],[70.88,33.99],[71.16,34.35],[71.11,34.73],[71.61,35.15],[71.5,35.65],[71.26,36.07],[71.85,36.51],[72.92,36.72],[74.07,36.84],[74.58,37.02],[75.16,37.13],[75.9,36.67],[76.19,35.9]]]]},{id:`af`,lon:66.09,lat:33.86,small:!1,parts:[[[[66.52,37.36],[67.07,37.36],[67.83,37.15],[68.14,37.02],[68.86,37.34],[69.19,37.15],[69.52,37.61],[70.12,37.59],[70.27,37.73],[70.38,38.14],[70.81,38.49],[71.35,38.26],[71.24,37.95],[71.54,37.91],[71.45,37.07],[71.84,36.74],[72.19,36.95],[72.64,37.05],[73.26,37.5],[73.95,37.42],[74.98,37.42],[75.16,37.13],[74.58,37.02],[74.07,36.84],[72.92,36.72],[71.85,36.51],[71.26,36.07],[71.5,35.65],[71.61,35.15],[71.11,34.73],[71.16,34.35],[70.88,33.99],[69.93,34.02],[70.32,33.36],[69.69,33.11],[69.26,32.5],[69.32,31.9],[68.93,31.62],[68.56,31.71],[67.79,31.58],[67.68,31.3],[66.94,31.3],[66.38,30.74],[66.35,29.89],[65.05,29.47],[64.35,29.56],[64.15,29.34],[63.55,29.47],[62.55,29.32],[60.87,29.83],[61.78,30.74],[61.7,31.38],[60.94,31.55],[60.86,32.18],[60.54,32.98],[60.96,33.53],[60.53,33.68],[60.8,34.4],[61.21,35.65],[62.23,35.27],[62.98,35.4],[63.19,35.86],[63.98,36.01],[64.55,36.31],[64.74,37.11],[65.59,37.3],[65.75,37.66],[66.22,37.39]]]]},{id:`tj`,lon:71.03,lat:38.58,small:!1,parts:[[[[67.83,37.15],[68.39,38.16],[68.18,38.9],[67.44,39.14],[67.7,39.58],[68.54,39.53],[69.01,40.09],[69.33,40.73],[70.67,40.96],[70.46,40.5],[70.6,40.22],[71.01,40.24],[70.65,39.94],[69.56,40.1],[69.46,39.53],[70.55,39.6],[71.78,39.28],[73.68,39.43],[73.93,38.51],[74.26,38.61],[74.86,38.38],[74.83,37.99],[74.98,37.42],[73.95,37.42],[73.26,37.5],[72.64,37.05],[72.19,36.95],[71.84,36.74],[71.45,37.07],[71.54,37.91],[71.24,37.95],[71.35,38.26],[70.81,38.49],[70.38,38.14],[70.27,37.73],[70.12,37.59],[69.52,37.61],[69.19,37.15],[68.86,37.34],[68.14,37.02]]]]},{id:`kg`,lon:74.62,lat:41.51,small:!1,parts:[[[[70.96,42.27],[71.19,42.7],[71.84,42.85],[73.49,42.5],[73.64,43.09],[74.21,43.3],[75.64,42.88],[76,42.99],[77.66,42.96],[79.14,42.86],[79.65,42.5],[80.26,42.35],[80.12,42.12],[78.54,41.58],[78.19,41.19],[76.91,41.07],[76.53,40.43],[75.47,40.56],[74.78,40.37],[73.82,39.89],[73.96,39.66],[73.68,39.43],[71.78,39.28],[70.55,39.6],[69.46,39.53],[69.56,40.1],[70.65,39.94],[71.01,40.24],[71.78,40.15],[73.05,40.87],[71.87,41.39],[71.16,41.14],[70.42,41.52],[71.26,42.17]]]]},{id:`tm`,lon:59.27,lat:39.09,small:!1,parts:[[[[52.5,41.78],[52.94,42.12],[54.08,42.32],[54.75,42.04],[55.46,41.26],[55.97,41.31],[57.09,41.32],[56.93,41.83],[57.79,42.17],[58.63,42.75],[59.97,42.22],[60.08,41.43],[60.46,41.22],[61.55,41.27],[61.88,41.08],[62.38,40.05],[63.52,39.36],[64.17,38.89],[65.22,38.4],[66.54,37.97],[66.52,37.36],[66.22,37.39],[65.75,37.66],[65.59,37.3],[64.74,37.11],[64.55,36.31],[63.98,36.01],[63.19,35.86],[62.98,35.4],[62.23,35.27],[61.21,35.65],[61.12,36.49],[60.38,36.53],[59.23,37.41],[58.44,37.52],[57.33,38.03],[56.62,38.12],[56.18,37.94],[55.51,37.96],[54.8,37.39],[53.92,37.2],[53.74,37.91],[53.88,38.95],[53.1,39.29],[53.36,39.98],[52.7,40.03],[52.92,40.88],[53.86,40.63],[54.74,40.95],[54.01,41.55],[53.72,42.12],[52.92,41.87],[52.81,41.13]]]]},{id:`ir`,lon:54.29,lat:32.52,small:!1,parts:[[[[48.57,29.93],[48.02,30.45],[48,30.98],[47.68,30.98],[47.85,31.71],[47.34,32.47],[46.11,33.02],[45.42,33.97],[45.65,34.75],[46.15,35.09],[46.08,35.68],[45.42,35.98],[44.77,37.17],[44.22,37.97],[44.42,38.28],[44.11,39.43],[44.79,39.71],[44.95,39.34],[45.46,38.87],[46.14,38.74],[46.51,38.77],[47.68,39.51],[48.06,39.58],[48.35,39.29],[48.01,38.79],[48.63,38.27],[48.88,38.32],[49.2,37.58],[50.15,37.37],[50.84,36.87],[52.26,36.7],[53.83,36.96],[53.92,37.2],[54.8,37.39],[55.51,37.96],[56.18,37.94],[56.62,38.12],[57.33,38.03],[58.44,37.52],[59.23,37.41],[60.38,36.53],[61.12,36.49],[61.21,35.65],[60.8,34.4],[60.53,33.68],[60.96,33.53],[60.54,32.98],[60.86,32.18],[60.94,31.55],[61.7,31.38],[61.78,30.74],[60.87,29.83],[61.37,29.3],[61.77,28.7],[62.73,28.26],[62.75,27.38],[63.23,27.22],[63.32,26.76],[61.88,26.24],[61.5,25.08],[59.61,25.38],[58.52,25.61],[57.4,25.74],[56.97,26.97],[56.49,27.14],[55.72,26.96],[54.72,26.48],[53.49,26.81],[52.48,27.58],[51.52,27.87],[50.85,28.81],[50.11,30.15],[49.58,29.99],[48.94,30.32]]]]},{id:`sy`,lon:38.54,lat:35.01,small:!1,parts:[[[[35.72,32.71],[35.7,32.72],[35.84,32.87],[35.82,33.28],[36.07,33.82],[36.61,34.2],[36.45,34.59],[36,34.65],[35.9,35.41],[36.15,35.82],[36.42,36.04],[36.69,36.26],[36.74,36.82],[37.07,36.62],[38.17,36.9],[38.7,36.71],[39.52,36.72],[40.68,37.09],[41.21,37.07],[42.35,37.23],[41.84,36.61],[41.29,36.36],[41.38,35.63],[41.01,34.42],[38.79,33.38],[36.83,32.31]]]]},{id:`am`,lon:45,lat:40.22,small:!0,parts:[[[[46.51,38.77],[46.14,38.74],[45.74,39.32],[45.74,39.47],[45.3,39.47],[45,39.74],[44.79,39.71],[44.4,40],[43.66,40.25],[43.75,40.74],[43.58,41.09],[44.97,41.25],[45.18,40.99],[45.56,40.81],[45.36,40.56],[45.89,40.22],[45.61,39.9],[46.04,39.63],[46.48,39.46]]]]},{id:`se`,lon:16.6,lat:62.81,small:!1,parts:[[[[11.03,58.86],[11.47,59.43],[12.3,60.12],[12.63,61.29],[11.99,61.8],[11.93,63.13],[12.58,64.07],[13.57,64.05],[13.92,64.44],[13.56,64.79],[15.11,66.19],[16.11,67.3],[16.77,68.01],[17.73,68.01],[17.99,68.57],[19.88,68.41],[20.03,69.07],[20.64,69.11],[21.98,68.62],[23.54,67.94],[23.57,66.4],[23.9,66.01],[22.18,65.72],[21.21,65.03],[21.37,64.41],[19.78,63.61],[17.85,62.75],[17.12,61.34],[17.83,60.64],[18.79,60.08],[17.87,58.95],[16.83,58.72],[16.45,57.04],[15.88,56.1],[14.67,56.2],[14.1,55.41],[12.94,55.36],[12.62,56.31],[11.79,57.44]]]]},{id:`by`,lon:27.98,lat:53.51,small:!1,parts:[[[[28.18,56.17],[29.23,55.92],[29.37,55.67],[29.9,55.79],[30.88,55.55],[30.97,55.08],[30.76,54.81],[31.38,54.16],[31.79,53.97],[31.73,53.79],[32.41,53.62],[32.69,53.35],[32.3,53.13],[31.5,53.17],[31.3,53.07],[31.54,52.74],[31.79,52.1],[30.93,52.04],[30.62,51.82],[30.56,51.32],[30.16,51.42],[29.26,51.37],[28.99,51.6],[28.62,51.43],[28.24,51.57],[27.46,51.59],[26.34,51.83],[25.33,51.91],[24.55,51.89],[24.01,51.62],[23.53,51.58],[23.51,52.02],[23.2,52.49],[23.8,52.69],[23.81,53.09],[23.53,53.47],[23.48,53.91],[24.45,53.91],[25.54,54.28],[25.77,54.85],[26.59,55.17],[26.49,55.61],[27.1,55.78]]]]},{id:`ua`,lon:31.23,lat:49.15,small:!1,parts:[[[[31.79,52.1],[32.16,52.06],[32.41,52.29],[32.72,52.24],[33.75,52.33],[34.39,51.77],[34.14,51.57],[34.22,51.26],[35.02,51.21],[35.38,50.77],[35.36,50.58],[36.62,50.23],[37.39,50.38],[38.01,49.92],[38.59,49.93],[40.07,49.6],[40.08,49.31],[39.67,48.78],[39.9,48.23],[39.74,47.9],[38.77,47.83],[38.26,47.55],[38.22,47.1],[37.42,47.02],[36.76,46.7],[35.82,46.65],[34.96,46.27],[35.01,45.74],[34.86,45.77],[34.73,45.97],[34.41,46],[33.7,46.22],[33.44,45.97],[33.3,46.08],[31.74,46.33],[31.67,46.71],[30.75,46.58],[30.38,46.03],[29.6,45.29],[29.15,45.46],[28.68,45.3],[28.23,45.49],[28.49,45.6],[28.66,45.94],[28.94,46.26],[28.86,46.44],[29.07,46.52],[29.17,46.38],[29.76,46.35],[30.03,46.42],[29.84,46.53],[29.91,46.67],[29.56,46.93],[29.41,47.35],[29.05,47.51],[29.12,47.85],[28.67,48.12],[28.26,48.16],[27.52,48.47],[26.86,48.37],[26.62,48.22],[26.2,48.22],[25.95,47.99],[25.21,47.89],[24.87,47.74],[24.4,47.98],[23.76,47.99],[23.14,48.1],[22.71,47.88],[22.64,48.15],[22.08,48.42],[22.28,48.83],[22.56,49.09],[22.78,49.03],[22.52,49.48],[23.43,50.31],[23.92,50.43],[24.03,50.71],[23.53,51.58],[24.01,51.62],[24.55,51.89],[25.33,51.91],[26.34,51.83],[27.46,51.59],[28.24,51.57],[28.62,51.43],[28.99,51.6],[29.26,51.37],[30.16,51.42],[30.56,51.32],[30.62,51.82],[30.93,52.04]]]]},{id:`pl`,lon:19.31,lat:52.15,small:!1,parts:[[[[23.48,53.91],[23.53,53.47],[23.81,53.09],[23.8,52.69],[23.2,52.49],[23.51,52.02],[23.53,51.58],[24.03,50.71],[23.92,50.43],[23.43,50.31],[22.52,49.48],[22.78,49.03],[22.56,49.09],[21.61,49.47],[20.89,49.33],[20.42,49.43],[19.82,49.22],[19.32,49.57],[18.91,49.44],[18.85,49.5],[18.39,49.99],[17.65,50.05],[17.56,50.36],[16.87,50.47],[16.72,50.22],[16.18,50.42],[16.24,50.7],[15.49,50.78],[15.02,51.11],[14.61,51.75],[14.69,52.09],[14.44,52.63],[14.07,52.98],[14.35,53.25],[14.12,53.76],[14.8,54.05],[16.36,54.51],[17.62,54.85],[18.62,54.68],[18.7,54.44],[19.66,54.43],[20.89,54.31],[22.73,54.33],[23.24,54.22]]]]},{id:`at`,lon:14.07,lat:47.61,small:!1,parts:[[[[16.98,48.12],[16.9,47.72],[16.34,47.71],[16.53,47.5],[16.2,46.85],[16.01,46.68],[15.14,46.66],[14.63,46.43],[13.81,46.51],[12.38,46.77],[12.15,47.11],[11.17,46.94],[11.05,46.75],[10.44,46.89],[9.93,46.92],[9.48,47.1],[9.63,47.35],[9.6,47.52],[9.89,47.58],[10.4,47.3],[10.54,47.57],[11.42,47.52],[12.14,47.7],[12.62,47.67],[12.93,47.47],[13.03,47.64],[12.88,48.29],[13.24,48.42],[13.6,48.88],[14.34,48.56],[14.9,48.96],[15.26,49.04],[16.03,48.73],[16.5,48.79],[16.96,48.6],[16.88,48.47]]]]},{id:`hu`,lon:19.36,lat:47.2,small:!1,parts:[[[[22.08,48.42],[22.64,48.15],[22.71,47.88],[22.1,47.67],[21.63,46.99],[21.02,46.32],[20.22,46.13],[19.6,46.17],[18.83,45.91],[18.46,45.76],[17.63,45.95],[16.88,46.38],[16.57,46.5],[16.37,46.84],[16.2,46.85],[16.53,47.5],[16.34,47.71],[16.9,47.72],[16.98,48.12],[17.49,47.87],[17.86,47.76],[18.7,47.88],[18.78,48.08],[19.18,48.11],[19.66,48.27],[19.77,48.2],[20.24,48.33],[20.48,48.56],[20.8,48.62],[21.87,48.32]]]]},{id:`md`,lon:28.41,lat:47.2,small:!0,parts:[[[[26.62,48.22],[26.86,48.37],[27.52,48.47],[28.26,48.16],[28.67,48.12],[29.12,47.85],[29.05,47.51],[29.41,47.35],[29.56,46.93],[29.91,46.67],[29.84,46.53],[30.03,46.42],[29.76,46.35],[29.17,46.38],[29.07,46.52],[28.86,46.44],[28.94,46.26],[28.66,45.94],[28.49,45.6],[28.23,45.49],[28.05,45.95],[28.16,46.37],[28.13,46.81],[27.55,47.41],[27.23,47.83],[26.92,48.12]]]]},{id:`ro`,lon:24.94,lat:45.86,small:!1,parts:[[[[28.23,45.49],[28.68,45.3],[29.15,45.46],[29.6,45.29],[29.63,45.04],[29.14,44.82],[28.84,44.91],[28.56,43.71],[27.97,43.81],[27.24,44.18],[26.07,43.94],[25.57,43.69],[24.1,43.74],[23.33,43.9],[22.94,43.82],[22.66,44.24],[22.47,44.41],[22.71,44.58],[22.46,44.7],[22.15,44.48],[21.56,44.77],[21.48,45.18],[20.87,45.42],[20.76,45.74],[20.22,46.13],[21.02,46.32],[21.63,46.99],[22.1,47.67],[22.71,47.88],[23.14,48.1],[23.76,47.99],[24.4,47.98],[24.87,47.74],[25.21,47.89],[25.95,47.99],[26.2,48.22],[26.62,48.22],[26.92,48.12],[27.23,47.83],[27.55,47.41],[28.13,46.81],[28.16,46.37],[28.05,45.95]]]]},{id:`lt`,lon:23.88,lat:55.28,small:!1,parts:[[[[26.49,55.61],[26.59,55.17],[25.77,54.85],[25.54,54.28],[24.45,53.91],[23.48,53.91],[23.24,54.22],[22.73,54.33],[22.65,54.58],[22.76,54.86],[22.31,55.02],[21.27,55.19],[21.05,56.03],[22.2,56.34],[23.88,56.27],[24.86,56.37],[25,56.16],[25.53,56.1]]]]},{id:`lv`,lon:24.84,lat:56.81,small:!1,parts:[[[[27.29,57.47],[27.77,57.24],[27.86,56.76],[28.18,56.17],[27.1,55.78],[26.49,55.61],[25.53,56.1],[25,56.16],[24.86,56.37],[23.88,56.27],[22.2,56.34],[21.05,56.03],[21.09,56.78],[21.58,57.41],[22.52,57.75],[23.32,57.01],[24.12,57.03],[24.31,57.79],[25.17,57.97],[25.6,57.85],[26.46,57.48]]]]},{id:`ee`,lon:25.83,lat:58.64,small:!1,parts:[[[[27.98,59.48],[28.13,59.3],[27.42,58.72],[27.72,57.79],[27.29,57.47],[26.46,57.48],[25.6,57.85],[25.17,57.97],[24.31,57.79],[24.43,58.38],[24.06,58.26],[23.43,58.61],[23.34,59.19],[24.6,59.47],[25.86,59.61],[26.95,59.45]]]]},{id:`de`,lon:10.29,lat:51.13,small:!1,parts:[[[[14.12,53.76],[14.35,53.25],[14.07,52.98],[14.44,52.63],[14.69,52.09],[14.61,51.75],[15.02,51.11],[14.57,51],[14.31,51.12],[14.06,50.93],[13.34,50.73],[12.97,50.48],[12.24,50.27],[12.41,49.97],[12.52,49.55],[13.03,49.31],[13.6,48.88],[13.24,48.42],[12.88,48.29],[13.03,47.64],[12.93,47.47],[12.62,47.67],[12.14,47.7],[11.42,47.52],[10.54,47.57],[10.4,47.3],[9.89,47.58],[9.6,47.52],[8.52,47.83],[8.32,47.61],[7.47,47.62],[7.59,48.33],[8.1,49.02],[6.66,49.2],[6.19,49.46],[6.24,49.9],[6.04,50.13],[6.16,50.8],[5.99,51.85],[6.59,51.85],[6.84,52.23],[7.09,53.14],[6.91,53.48],[7.1,53.69],[7.94,53.75],[8.12,53.53],[8.8,54.02],[8.57,54.4],[8.53,54.96],[9.28,54.83],[9.92,54.98],[9.94,54.6],[10.95,54.36],[10.94,54.01],[11.96,54.2],[12.52,54.47],[13.65,54.08]]]]},{id:`bg`,lon:25.2,lat:42.75,small:!1,parts:[[[[22.66,44.24],[22.94,43.82],[23.33,43.9],[24.1,43.74],[25.57,43.69],[26.07,43.94],[27.24,44.18],[27.97,43.81],[28.56,43.71],[28.04,43.29],[27.68,42.58],[28,42.01],[27.14,42.14],[26.12,41.83],[26.11,41.33],[25.2,41.23],[24.49,41.58],[23.69,41.31],[22.95,41.34],[22.88,42],[22.38,42.32],[22.55,42.46],[22.44,42.58],[22.61,42.9],[22.98,43.21],[22.5,43.64],[22.41,44.01]]]]},{id:`gr`,lon:22.56,lat:39.34,small:!1,parts:[[[[26.29,35.3],[26.16,35],[24.72,34.92],[24.73,35.09],[23.51,35.28],[23.7,35.71],[24.25,35.37],[25.03,35.43],[25.77,35.35],[25.75,35.18]]],[[[22.95,41.34],[23.69,41.31],[24.49,41.58],[25.2,41.23],[26.11,41.33],[26.12,41.83],[26.6,41.56],[26.29,40.94],[26.06,40.82],[25.45,40.85],[24.92,40.95],[23.72,40.69],[24.41,40.12],[23.9,39.96],[23.34,39.96],[22.82,40.48],[22.63,40.26],[22.85,39.66],[23.35,39.19],[22.97,38.97],[23.53,38.51],[24.02,38.22],[24.04,37.65],[23.11,37.92],[23.41,37.41],[22.78,37.3],[23.15,36.42],[22.49,36.41],[21.67,36.84],[21.3,37.64],[21.12,38.31],[20.73,38.77],[20.22,39.34],[20.15,39.63],[20.62,40.11],[20.67,40.44],[21,40.58],[21.02,40.84],[21.67,40.93],[22.06,41.15],[22.6,41.13],[22.76,41.3]]]]},{id:`tr`,lon:35.39,lat:38.99,small:!1,parts:[[[[44.77,37.17],[44.29,37],[43.94,37.26],[42.78,37.39],[42.35,37.23],[41.21,37.07],[40.68,37.09],[39.52,36.72],[38.7,36.71],[38.17,36.9],[37.07,36.62],[36.74,36.82],[36.69,36.26],[36.42,36.04],[36.15,35.82],[35.78,36.28],[36.16,36.65],[35.55,36.56],[34.71,36.8],[34.03,36.22],[32.51,36.11],[31.7,36.64],[30.62,36.68],[30.39,36.26],[29.7,36.15],[28.73,36.68],[27.64,36.66],[27.05,37.65],[26.32,38.21],[26.8,38.99],[26.17,39.46],[27.28,40.42],[28.82,40.46],[29.24,41.22],[31.15,41.09],[32.35,41.74],[33.51,42.02],[35.17,42.04],[36.91,41.33],[38.35,40.95],[39.51,41.1],[40.37,41.01],[41.55,41.54],[42.62,41.58],[43.58,41.09],[43.75,40.74],[43.66,40.25],[44.4,40],[44.79,39.71],[44.11,39.43],[44.42,38.28],[44.22,37.97]]],[[[26.12,41.83],[27.14,42.14],[28,42.01],[28.11,41.62],[28.99,41.3],[28.81,41.06],[27.62,41],[27.19,40.69],[26.36,40.15],[26.04,40.62],[26.06,40.82],[26.29,40.94],[26.6,41.56]]]]},{id:`al`,lon:20.03,lat:41.14,small:!0,parts:[[[[21.02,40.84],[21,40.58],[20.67,40.44],[20.62,40.11],[20.15,39.63],[19.98,39.69],[19.96,39.91],[19.41,40.25],[19.32,40.73],[19.4,41.41],[19.54,41.72],[19.37,41.88],[19.31,42.2],[19.74,42.69],[19.8,42.5],[20.07,42.59],[20.28,42.32],[20.52,42.22],[20.59,41.86],[20.46,41.52],[20.6,41.09]]]]},{id:`hr`,lon:16.57,lat:45.02,small:!1,parts:[[[[16.57,46.5],[16.88,46.38],[17.63,45.95],[18.46,45.76],[18.83,45.91],[19.07,45.52],[19.39,45.24],[19.01,44.86],[18.55,45.08],[17.86,45.07],[17,45.23],[16.53,45.21],[16.32,45],[15.96,45.23],[15.75,44.82],[16.24,44.35],[16.46,44.04],[16.91,43.67],[17.3,43.45],[17.67,43.03],[18.56,42.65],[18.45,42.48],[17.51,42.85],[16.93,43.21],[16.01,43.51],[15.18,44.24],[15.38,44.32],[14.92,44.74],[14.9,45.08],[14.26,45.23],[13.95,44.8],[13.66,45.14],[13.68,45.48],[13.71,45.5],[14.41,45.47],[14.6,45.64],[14.93,45.47],[15.33,45.45],[15.32,45.73],[15.67,45.83],[15.77,46.24]]]]},{id:`ch`,lon:8.12,lat:46.79,small:!1,parts:[[[[9.6,47.52],[9.63,47.35],[9.48,47.1],[9.93,46.92],[10.44,46.89],[10.36,46.48],[9.92,46.31],[9.18,46.44],[8.97,46.04],[8.49,46],[8.32,46.16],[7.76,45.82],[7.27,45.78],[6.84,45.99],[6.5,46.43],[6.02,46.27],[6.04,46.73],[6.77,47.29],[6.74,47.54],[7.19,47.45],[7.47,47.62],[8.32,47.61],[8.52,47.83]]]]},{id:`lu`,lon:5.97,lat:49.76,small:!0,parts:[[[[6.04,50.13],[6.24,49.9],[6.19,49.46],[5.9,49.44],[5.68,49.53],[5.78,50.09]]]]},{id:`be`,lon:4.58,lat:50.65,small:!0,parts:[[[[6.16,50.8],[6.04,50.13],[5.78,50.09],[5.68,49.53],[4.8,49.99],[4.29,49.91],[3.59,50.38],[3.12,50.78],[2.66,50.8],[2.51,51.15],[3.31,51.35],[4.05,51.27],[4.97,51.47],[5.61,51.04]]]]},{id:`nl`,lon:5.51,lat:52.3,small:!0,parts:[[[[6.91,53.48],[7.09,53.14],[6.84,52.23],[6.59,51.85],[5.99,51.85],[6.16,50.8],[5.61,51.04],[4.97,51.47],[4.05,51.27],[3.31,51.35],[3.83,51.62],[4.71,53.09],[6.08,53.51]]]]},{id:`pt`,lon:-8.06,lat:39.63,small:!1,parts:[[[[-9.03,41.88],[-8.67,42.14],[-8.26,42.28],[-8.01,41.79],[-7.42,41.79],[-7.25,41.92],[-6.67,41.88],[-6.39,41.38],[-6.85,41.11],[-6.86,40.33],[-7.03,40.19],[-7.07,39.71],[-7.5,39.63],[-7.1,39.03],[-7.37,38.37],[-7.03,38.08],[-7.17,37.8],[-7.54,37.43],[-7.45,37.1],[-7.86,36.84],[-8.38,36.98],[-8.9,36.87],[-8.75,37.65],[-8.84,38.27],[-9.29,38.36],[-9.53,38.74],[-9.45,39.39],[-9.05,39.76],[-8.98,40.16],[-8.77,40.76],[-8.79,41.18],[-8.99,41.54]]]]},{id:`es`,lon:-3.62,lat:40.35,small:!1,parts:[[[[-7.45,37.1],[-7.54,37.43],[-7.17,37.8],[-7.03,38.08],[-7.37,38.37],[-7.1,39.03],[-7.5,39.63],[-7.07,39.71],[-7.03,40.19],[-6.86,40.33],[-6.85,41.11],[-6.39,41.38],[-6.67,41.88],[-7.25,41.92],[-7.42,41.79],[-8.01,41.79],[-8.26,42.28],[-8.67,42.14],[-9.03,41.88],[-8.98,42.59],[-9.39,43.03],[-7.98,43.75],[-6.76,43.57],[-5.41,43.57],[-4.35,43.4],[-3.52,43.46],[-1.9,43.42],[-1.5,43.03],[.34,42.58],[.7,42.8],[1.83,42.34],[2.99,42.47],[3.04,41.89],[2.09,41.23],[.81,41.01],[.72,40.68],[.11,40.12],[-.28,39.31],[.11,38.74],[-.47,38.29],[-.68,37.64],[-1.44,37.44],[-2.15,36.67],[-3.41,36.66],[-4.37,36.68],[-5,36.32],[-5.38,35.95],[-5.87,36.03],[-6.24,36.37],[-6.52,36.94]]]]},{id:`ie`,lon:-8.01,lat:53.18,small:!0,parts:[[[[-6.2,53.87],[-6.03,53.15],[-6.79,52.26],[-8.56,51.67],[-9.98,51.82],[-9.17,52.86],[-9.69,53.88],[-8.33,54.67],[-7.57,55.13],[-7.37,54.6],[-7.57,54.06],[-6.95,54.07]]]]},{id:`nc`,lon:165.53,lat:-21.26,small:!0,parts:[[[[165.78,-21.08],[166.6,-21.7],[167.12,-22.16],[166.74,-22.4],[166.19,-22.13],[165.47,-21.68],[164.83,-21.15],[164.17,-20.45],[164.03,-20.11],[164.46,-20.12],[165.02,-20.46],[165.46,-20.8]]]]},{id:`sb`,lon:159.11,lat:-7.9,small:!0,parts:[[[[162.12,-10.48],[162.4,-10.83],[161.7,-10.82],[161.32,-10.21],[161.92,-10.45]]],[[[161.68,-9.6],[161.53,-9.78],[160.79,-8.92],[160.58,-8.32],[160.92,-8.32],[161.28,-9.12]]],[[[160.85,-9.87],[160.46,-9.9],[159.85,-9.79],[159.64,-9.64],[159.7,-9.24],[160.36,-9.4],[160.69,-9.61]]],[[[159.64,-8.02],[159.88,-8.34],[159.92,-8.54],[159.13,-8.11],[158.59,-7.75],[158.21,-7.42],[158.36,-7.32],[158.82,-7.56]]],[[[157.14,-7.02],[157.54,-7.35],[157.34,-7.4],[156.9,-7.18],[156.49,-6.77],[156.54,-6.6]]]]},{id:`nz`,lon:170.51,lat:-43.99,small:!1,parts:[[[[176.89,-40.07],[176.51,-40.61],[176.01,-41.29],[175.24,-41.69],[175.07,-41.43],[174.65,-41.28],[175.23,-40.46],[174.9,-39.91],[173.82,-39.51],[173.85,-39.15],[174.57,-38.8],[174.74,-38.03],[174.7,-37.38],[174.29,-36.71],[174.32,-36.53],[173.84,-36.12],[173.06,-35.24],[172.63,-34.53],[173.01,-34.45],[173.55,-35.01],[174.33,-35.27],[174.61,-36.16],[175.34,-37.21],[175.36,-36.53],[175.81,-36.8],[175.96,-37.56],[176.76,-37.88],[177.44,-37.96],[178.01,-37.58],[178.52,-37.7],[178.28,-38.58],[177.97,-39.17],[177.21,-39.15],[176.94,-39.45],[177.03,-39.88]]],[[[169.67,-43.56],[170.52,-43.03],[171.13,-42.51],[171.57,-41.77],[171.95,-41.51],[172.1,-40.96],[172.8,-40.49],[173.02,-40.92],[173.25,-41.33],[173.96,-40.93],[174.25,-41.35],[174.25,-41.77],[173.88,-42.23],[173.22,-42.97],[172.71,-43.37],[173.08,-43.85],[172.31,-43.87],[171.45,-44.24],[171.18,-44.9],[170.62,-45.91],[169.83,-46.36],[169.33,-46.64],[168.41,-46.62],[167.76,-46.29],[166.68,-46.22],[166.51,-45.85],[167.05,-45.11],[168.3,-44.12],[168.95,-43.94]]]]},{id:`au`,lon:134.38,lat:-25.56,small:!1,parts:[[[[147.69,-40.81],[148.29,-40.87],[148.36,-42.06],[148.02,-42.41],[147.91,-43.21],[147.56,-42.94],[146.87,-43.64],[146.66,-43.58],[146.05,-43.55],[145.43,-42.69],[145.3,-42.03],[144.72,-41.16],[144.74,-40.7],[145.4,-40.79],[146.36,-41.14],[146.91,-41]]],[[[126.15,-32.22],[125.09,-32.73],[124.22,-32.96],[124.03,-33.48],[123.66,-33.89],[122.81,-33.91],[122.18,-34],[121.3,-33.82],[120.58,-33.93],[119.89,-33.98],[119.3,-34.51],[119.01,-34.46],[118.5,-34.75],[118.03,-35.06],[117.29,-35.03],[116.62,-35.03],[115.56,-34.39],[115.03,-34.2],[115.05,-33.62],[115.54,-33.49],[115.71,-33.26],[115.68,-32.9],[115.8,-32.21],[115.69,-31.61],[115.16,-30.6],[115,-30.03],[115.04,-29.46],[114.64,-28.81],[114.62,-28.52],[114.17,-28.12],[114.05,-27.33],[113.48,-26.54],[113.34,-26.12],[113.78,-26.55],[113.44,-25.62],[113.94,-25.91],[114.23,-26.3],[114.22,-25.79],[113.72,-25],[113.63,-24.68],[113.39,-24.38],[113.5,-23.81],[113.71,-23.56],[113.84,-23.06],[113.74,-22.47],[114.15,-21.76],[114.22,-22.52],[114.65,-21.83],[115.46,-21.49],[115.95,-21.07],[116.71,-20.7],[117.16,-20.62],[117.44,-20.75],[118.23,-20.37],[118.84,-20.26],[118.99,-20.04],[119.25,-19.95],[119.8,-19.98],[120.86,-19.68],[121.4,-19.24],[121.65,-18.71],[122.24,-18.2],[122.29,-17.8],[122.31,-17.26],[123.01,-16.41],[123.43,-17.27],[123.86,-17.07],[123.5,-16.6],[123.82,-16.11],[124.26,-16.33],[124.38,-15.57],[124.93,-15.08],[125.17,-14.68],[125.67,-14.51],[125.69,-14.23],[126.13,-14.35],[126.14,-14.1],[126.58,-13.95],[127.07,-13.82],[127.8,-14.28],[128.36,-14.87],[128.98,-14.88],[129.62,-14.97],[129.41,-14.42],[129.89,-13.62],[130.34,-13.36],[130.18,-13.11],[130.62,-12.54],[131.22,-12.18],[131.73,-12.3],[132.58,-12.11],[132.56,-11.6],[131.82,-11.27],[132.36,-11.13],[133.02,-11.38],[133.55,-11.79],[134.39,-12.04],[134.68,-11.94],[135.3,-12.25],[135.88,-11.96],[136.26,-12.05],[136.49,-11.86],[136.95,-12.35],[136.68,-12.89],[136.31,-13.29],[135.96,-13.32],[136.08,-13.72],[135.78,-14.22],[135.43,-14.72],[135.5,-15],[136.3,-15.55],[137.07,-15.87],[137.58,-16.22],[138.3,-16.81],[138.59,-16.81],[139.11,-17.06],[139.26,-17.37],[140.22,-17.71],[140.87,-17.37],[141.07,-16.83],[141.27,-16.39],[141.4,-15.84],[141.7,-15.04],[141.56,-14.56],[141.63,-14.27],[141.52,-13.7],[141.65,-12.94],[141.84,-12.74],[141.69,-12.41],[141.93,-11.88],[142.12,-11.33],[142.14,-11.04],[142.52,-10.67],[142.8,-11.16],[142.87,-11.78],[143.12,-11.9],[143.16,-12.33],[143.52,-12.83],[143.6,-13.4],[143.56,-13.76],[143.92,-14.55],[144.56,-14.17],[144.9,-14.59],[145.37,-14.99],[145.27,-15.43],[145.49,-16.29],[145.64,-16.78],[145.89,-16.91],[146.16,-17.76],[146.06,-18.28],[146.39,-18.96],[147.47,-19.48],[148.18,-19.96],[148.85,-20.39],[148.72,-20.63],[149.29,-21.26],[149.68,-22.34],[150.08,-22.12],[150.48,-22.56],[150.73,-22.4],[150.9,-23.46],[151.61,-24.08],[152.07,-24.46],[152.86,-25.27],[153.14,-26.07],[153.16,-26.64],[153.09,-27.26],[153.57,-28.11],[153.51,-28.99],[153.34,-29.46],[153.07,-30.35],[153.09,-30.92],[152.89,-31.64],[152.45,-32.55],[151.71,-33.04],[151.34,-33.82],[151.01,-34.31],[150.71,-35.17],[150.33,-35.67],[150.08,-36.42],[149.95,-37.11],[150,-37.43],[149.42,-37.77],[148.31,-37.81],[147.38,-38.22],[146.92,-38.61],[146.32,-39.04],[145.49,-38.59],[144.88,-38.42],[145.03,-37.9],[144.49,-38.09],[143.61,-38.81],[142.75,-38.54],[142.18,-38.38],[141.61,-38.31],[140.64,-38.02],[139.99,-37.4],[139.81,-36.64],[139.58,-36.14],[139.08,-35.73],[138.12,-35.61],[138.45,-35.13],[138.21,-34.39],[137.72,-35.08],[136.83,-35.26],[137.35,-34.71],[137.51,-34.13],[137.89,-33.64],[137.81,-32.9],[137,-33.75],[136.37,-34.09],[135.99,-34.89],[135.21,-34.48],[135.24,-33.95],[134.61,-33.22],[134.09,-32.85],[134.27,-32.62],[132.99,-32.01],[132.29,-31.98],[131.33,-31.5],[129.53,-31.59],[128.24,-31.95],[127.1,-32.28]]]]},{id:`lk`,lon:80.67,lat:7.7,small:!0,parts:[[[[81.79,7.52],[81.64,6.48],[81.22,6.2],[80.35,5.97],[79.87,6.76],[79.7,8.2],[80.15,9.82],[80.84,9.27],[81.31,8.56]]]]},{id:`cn`,lon:103.86,lat:36.61,small:!1,parts:[[[[109.48,18.2],[108.65,18.51],[108.63,19.37],[109.12,19.82],[110.21,20.1],[110.79,20.08],[111.01,19.7],[110.57,19.26],[110.34,18.68]]],[[[80.26,42.35],[80.18,42.92],[80.87,43.18],[79.97,44.92],[81.95,45.32],[82.46,45.54],[83.18,47.33],[85.16,47],[85.72,47.45],[85.77,48.46],[86.6,48.55],[87.36,49.22],[87.75,49.3],[88.02,48.6],[88.85,48.07],[90.28,47.69],[90.97,46.89],[90.59,45.72],[90.95,45.29],[92.13,45.12],[93.48,44.98],[94.69,44.35],[95.31,44.24],[95.76,43.32],[96.35,42.73],[97.45,42.75],[99.52,42.52],[100.85,42.66],[101.83,42.51],[103.31,41.91],[104.52,41.91],[104.96,41.6],[106.13,42.14],[107.74,42.48],[109.24,42.52],[110.41,42.87],[111.13,43.41],[111.83,43.74],[111.67,44.07],[111.35,44.46],[111.87,45.1],[112.43,45.01],[113.46,44.81],[114.46,45.34],[115.98,45.73],[116.72,46.39],[117.42,46.67],[118.87,46.8],[119.66,46.69],[119.77,47.05],[118.87,47.75],[118.06,48.07],[117.29,47.7],[116.31,47.85],[115.74,47.73],[115.48,48.14],[116.19,49.13],[116.68,49.89],[117.88,49.51],[119.29,50.14],[119.28,50.58],[120.18,51.64],[120.74,51.96],[120.73,52.52],[120.18,52.75],[121,53.25],[122.24,53.43],[123.57,53.46],[125.07,53.16],[125.95,52.79],[126.56,51.78],[126.94,51.35],[127.29,50.74],[127.66,49.76],[129.4,49.44],[130.58,48.73],[130.99,47.79],[132.51,47.79],[133.37,48.18],[135.02,48.48],[134.5,47.58],[134.11,47.21],[133.77,46.12],[133.1,45.14],[131.88,45.32],[131.03,44.97],[131.29,44.11],[131.14,42.93],[130.63,42.9],[130.64,42.4],[130,42.98],[129.6,42.42],[128.05,41.99],[128.21,41.47],[127.34,41.5],[126.87,41.82],[126.18,41.11],[125.08,40.57],[124.26,39.93],[122.87,39.64],[122.13,39.17],[121.05,38.9],[121.59,39.36],[121.38,39.75],[122.17,40.42],[121.64,40.95],[120.77,40.59],[119.64,39.9],[119.02,39.25],[118.04,39.2],[117.53,38.74],[118.06,38.06],[118.88,37.9],[118.91,37.45],[119.7,37.16],[120.82,37.87],[121.71,37.48],[122.36,37.46],[122.52,36.93],[121.1,36.65],[120.64,36.11],[119.66,35.61],[119.15,34.91],[120.23,34.36],[120.62,33.38],[121.23,32.46],[121.91,31.69],[121.89,30.95],[121.27,30.68],[121.5,30.14],[122.09,29.83],[121.94,29.02],[121.68,28.23],[121.13,28.14],[120.39,27.05],[119.58,25.74],[118.66,24.55],[117.28,23.63],[115.89,22.78],[114.76,22.67],[114.15,22.22],[113.81,22.55],[113.24,22.05],[111.84,21.55],[110.79,21.4],[110.44,20.34],[109.89,20.28],[109.63,21.01],[109.86,21.39],[108.52,21.71],[108.05,21.55],[107.04,21.81],[106.57,22.22],[106.72,22.79],[105.81,22.98],[105.33,23.35],[104.48,22.82],[103.5,22.7],[102.71,22.71],[102.17,22.46],[101.65,22.32],[101.8,21.17],[101.27,21.2],[101.18,21.44],[101.15,21.85],[100.42,21.56],[99.98,21.74],[99.24,22.12],[99.53,22.95],[98.9,23.14],[98.66,24.06],[97.61,23.9],[97.72,25.08],[98.67,25.92],[98.71,26.74],[98.68,27.51],[98.25,27.75],[97.91,28.34],[97.33,28.26],[96.25,28.41],[96.59,28.83],[96.12,29.45],[95.41,29.03],[94.57,29.28],[93.41,28.64],[92.5,27.9],[91.7,27.77],[91.26,28.04],[90.73,28.06],[90.02,28.3],[89.48,28.04],[88.81,27.3],[88.73,28.09],[88.12,27.88],[86.95,27.97],[85.82,28.2],[85.01,28.64],[84.24,28.84],[83.9,29.32],[83.34,29.46],[82.33,30.11],[81.52,30.42],[81.11,30.18],[79.72,30.88],[78.74,31.52],[78.46,32.62],[79.18,32.48],[79.21,32.99],[78.81,33.51],[78.91,34.32],[77.84,35.49],[76.19,35.9],[75.9,36.67],[75.16,37.13],[74.98,37.42],[74.83,37.99],[74.86,38.38],[74.26,38.61],[73.93,38.51],[73.68,39.43],[73.96,39.66],[73.82,39.89],[74.78,40.37],[75.47,40.56],[76.53,40.43],[76.91,41.07],[78.19,41.19],[78.54,41.58],[80.12,42.12]]]]},{id:`tw`,lon:120.98,lat:23.74,small:!0,parts:[[[[121.78,24.39],[121.18,22.79],[120.75,21.97],[120.22,22.81],[120.11,23.56],[120.69,24.54],[121.5,25.3],[121.95,25]]]]},{id:`it`,lon:12.22,lat:43.47,small:!1,parts:[[[[10.44,46.89],[11.05,46.75],[11.17,46.94],[12.15,47.11],[12.38,46.77],[13.81,46.51],[13.7,46.02],[13.94,45.59],[13.14,45.74],[12.33,45.38],[12.38,44.89],[12.26,44.6],[12.59,44.09],[13.53,43.59],[14.03,42.76],[15.14,41.96],[15.92,41.96],[16.17,41.74],[15.89,41.54],[16.79,41.18],[17.52,40.88],[18.38,40.36],[18.48,40.17],[18.29,39.81],[17.74,40.28],[16.87,40.44],[16.45,39.8],[17.17,39.43],[17.05,38.9],[16.63,38.84],[16.1,37.99],[15.68,37.91],[15.69,38.22],[15.89,38.75],[16.11,38.96],[15.72,39.54],[15.41,40.05],[15,40.17],[14.7,40.61],[14.06,40.79],[13.63,41.19],[12.89,41.25],[12.11,41.71],[11.19,42.36],[10.51,42.93],[10.2,43.92],[9.7,44.04],[8.89,44.37],[8.43,44.23],[7.85,43.77],[7.44,43.69],[7.55,44.13],[7.01,44.25],[6.75,45.03],[7.1,45.33],[6.8,45.71],[6.84,45.99],[7.27,45.78],[7.76,45.82],[8.32,46.16],[8.49,46],[8.97,46.04],[9.18,46.44],[9.92,46.31],[10.36,46.48]]],[[[14.76,38.14],[15.52,38.23],[15.16,37.44],[15.31,37.13],[15.1,36.62],[14.33,37],[13.83,37.1],[12.43,37.61],[12.57,38.13],[13.74,38.04]]],[[[8.71,40.9],[9.21,41.21],[9.81,40.5],[9.67,39.18],[9.21,39.24],[8.81,38.91],[8.43,39.17],[8.39,40.38],[8.16,40.95]]]]},{id:`dk`,lon:9.31,lat:56.22,small:!0,parts:[[[[9.92,54.98],[9.28,54.83],[8.53,54.96],[8.12,55.52],[8.09,56.54],[8.26,56.81],[8.54,57.11],[9.42,57.17],[9.78,57.45],[10.58,57.73],[10.55,57.22],[10.25,56.89],[10.37,56.61],[10.91,56.46],[10.67,56.08],[10.37,56.19],[9.65,55.47]]],[[[12.37,56.11],[12.69,55.61],[12.09,54.8],[11.04,55.36],[10.9,55.78]]]]},{id:`gb`,lon:-2.66,lat:53.89,small:!1,parts:[[[[-6.2,53.87],[-6.95,54.07],[-7.57,54.06],[-7.37,54.6],[-7.57,55.13],[-6.73,55.17],[-5.66,54.56]]],[[[-3.09,53.4],[-2.95,53.98],[-3.62,54.6],[-3.63,54.61],[-4.84,54.79],[-5.08,55.06],[-4.72,55.51],[-5.05,55.78],[-5.59,55.31],[-5.65,56.27],[-6.15,56.78],[-5.79,57.82],[-5.01,58.63],[-4.21,58.55],[-3,58.63],[-4.07,57.55],[-3.05,57.69],[-1.96,57.68],[-2.22,56.87],[-3.12,55.97],[-2.09,55.91],[-2.01,55.8],[-1.11,54.62],[-.43,54.46],[.19,53.32],[.47,52.93],[1.68,52.74],[1.56,52.1],[1.05,51.81],[1.45,51.29],[.55,50.77],[-.79,50.78],[-2.49,50.5],[-2.96,50.7],[-3.62,50.23],[-4.54,50.34],[-5.24,49.96],[-5.78,50.16],[-4.31,51.21],[-3.41,51.43],[-3.42,51.43],[-4.98,51.59],[-5.27,51.99],[-4.22,52.3],[-4.77,52.84],[-4.58,53.5]]]]},{id:`is`,lon:-18.76,lat:65.07,small:!1,parts:[[[[-14.51,66.46],[-14.74,65.81],[-13.61,65.13],[-14.91,64.36],[-17.79,63.68],[-18.66,63.5],[-19.97,63.64],[-22.76,63.96],[-21.78,64.4],[-23.96,64.89],[-22.19,65.08],[-22.23,65.38],[-24.33,65.61],[-23.65,66.26],[-22.13,66.41],[-20.58,65.73],[-19.06,66.28],[-17.8,65.99],[-16.17,66.53]]]]},{id:`az`,lon:47.68,lat:40.28,small:!1,parts:[[[[46.41,41.86],[46.69,41.83],[47.37,41.22],[47.81,41.15],[47.99,41.41],[48.58,41.81],[49.11,41.28],[49.62,40.57],[50.09,40.53],[50.39,40.26],[49.57,40.18],[49.39,39.4],[49.22,39.05],[48.86,38.82],[48.88,38.32],[48.63,38.27],[48.01,38.79],[48.35,39.29],[48.06,39.58],[47.68,39.51],[46.51,38.77],[46.48,39.46],[46.04,39.63],[45.61,39.9],[45.89,40.22],[45.36,40.56],[45.56,40.81],[45.18,40.99],[44.97,41.25],[45.22,41.41],[45.96,41.12],[46.5,41.06],[46.64,41.18],[46.15,41.72]]],[[[46.14,38.74],[45.46,38.87],[44.95,39.34],[44.79,39.71],[45,39.74],[45.3,39.47],[45.74,39.47],[45.74,39.32]]]]},{id:`ge`,lon:43.48,lat:42.16,small:!1,parts:[[[[39.95,43.44],[40.08,43.55],[40.92,43.38],[42.4,43.22],[43.76,42.74],[43.93,42.55],[44.54,42.71],[45.47,42.5],[45.78,42.09],[46.41,41.86],[46.15,41.72],[46.64,41.18],[46.5,41.06],[45.96,41.12],[45.22,41.41],[44.97,41.25],[43.58,41.09],[42.62,41.58],[41.55,41.54],[41.7,41.96],[41.45,42.64],[40.88,43.01],[40.32,43.13]]]]},{id:`ph`,lon:121.54,lat:15.75,small:!1,parts:[[[[120.83,12.7],[120.32,13.47],[121.18,13.43],[121.53,13.07],[121.26,12.21]]],[[[122.59,9.98],[122.84,10.26],[122.95,10.88],[123.5,10.94],[123.34,10.27],[124.08,11.23],[123.98,10.28],[123.62,9.95],[123.31,9.32],[123,9.02],[122.38,9.71]]],[[[126.38,8.41],[126.48,7.75],[126.54,7.19],[126.2,6.27],[125.83,7.29],[125.36,6.79],[125.68,6.05],[125.4,5.58],[124.22,6.16],[123.94,6.89],[124.24,7.36],[123.61,7.83],[123.3,7.42],[122.82,7.46],[122.09,6.9],[121.92,7.19],[122.31,8.04],[122.94,8.32],[123.49,8.69],[123.84,8.24],[124.6,8.51],[124.76,8.96],[125.47,8.99],[125.41,9.76],[126.22,9.29],[126.31,8.78]]],[[[118.5,9.32],[117.18,8.37],[117.67,9.07],[118.39,9.68],[118.99,10.38],[119.51,11.37],[119.69,10.55],[119.03,10]]],[[[122.34,18.22],[122.17,17.81],[122.51,17.09],[122.25,16.26],[121.66,15.93],[121.51,15.13],[121.73,14.33],[122.26,14.22],[122.7,14.34],[123.95,13.78],[123.85,13.24],[124.18,13],[124.08,12.54],[123.3,13.03],[122.93,13.55],[122.67,13.19],[122.04,13.78],[121.13,13.64],[120.63,13.86],[120.68,14.27],[120.99,14.53],[120.69,14.76],[120.56,14.4],[120.07,14.97],[119.92,15.41],[119.88,16.36],[120.29,16.03],[120.39,17.6],[120.71,18.51],[121.32,18.5],[121.94,18.22],[122.24,18.48]]],[[[122.04,11.42],[121.88,11.89],[122.48,11.58],[123.12,11.58],[123.1,11.17],[122.64,10.74],[122,10.44],[121.97,10.91]]],[[[125.5,12.16],[125.78,11.05],[125.01,11.31],[125.03,10.98],[125.28,10.36],[124.8,10.13],[124.76,10.84],[124.46,10.89],[124.3,11.49],[124.89,11.42],[124.88,11.79],[124.27,12.56],[125.23,12.54]]]]},{id:`my`,lon:114.67,lat:3.55,small:!1,parts:[[[[100.09,6.46],[100.26,6.64],[101.08,6.21],[101.16,5.69],[101.81,5.81],[102.14,6.22],[102.37,6.13],[102.96,5.53],[103.38,4.85],[103.44,4.18],[103.33,3.73],[103.43,3.38],[103.5,2.79],[103.86,2.52],[104.25,1.63],[104.23,1.29],[103.52,1.23],[102.57,1.97],[101.39,2.76],[101.27,3.27],[100.69,3.94],[100.56,4.77],[100.2,5.31],[100.31,6.04]]],[[[117.88,4.14],[117.01,4.31],[115.87,4.31],[115.52,3.17],[115.13,2.82],[114.62,1.43],[113.81,1.22],[112.86,1.5],[112.38,1.41],[111.8,.9],[111.16,.98],[110.52,.77],[109.83,1.34],[109.66,2.01],[110.4,1.66],[111.17,1.85],[111.37,2.7],[111.8,2.89],[113,3.1],[113.71,3.89],[114.21,4.53],[114.66,4.01],[114.87,4.35],[115.35,4.32],[115.4,4.95],[115.45,5.45],[116.22,6.14],[116.73,6.92],[117.13,6.93],[117.64,6.42],[117.69,5.99],[118.35,5.71],[119.18,5.41],[119.11,5.02],[118.44,4.97],[118.62,4.48]]]]},{id:`bn`,lon:114.92,lat:4.69,small:!0,parts:[[[[115.45,5.45],[115.4,4.95],[115.35,4.32],[114.87,4.35],[114.66,4.01],[114.21,4.53],[114.6,4.9]]]]},{id:`si`,lon:14.94,lat:46.13,small:!0,parts:[[[[13.81,46.51],[14.63,46.43],[15.14,46.66],[16.01,46.68],[16.2,46.85],[16.37,46.84],[16.57,46.5],[15.77,46.24],[15.67,45.83],[15.32,45.73],[15.33,45.45],[14.93,45.47],[14.6,45.64],[14.41,45.47],[13.71,45.5],[13.94,45.59],[13.7,46.02]]]]},{id:`fi`,lon:26.21,lat:64.5,small:!1,parts:[[[[28.59,69.07],[28.45,68.36],[29.98,67.7],[29.05,66.94],[30.22,65.81],[29.54,64.95],[30.44,64.2],[30.04,63.55],[31.52,62.87],[31.14,62.36],[30.21,61.78],[28.07,60.5],[26.26,60.42],[24.5,60.06],[22.87,59.85],[22.29,60.39],[21.32,60.72],[21.54,61.7],[21.06,62.61],[21.54,63.19],[22.44,63.82],[24.73,64.9],[25.4,65.11],[25.3,65.53],[23.9,66.01],[23.57,66.4],[23.54,67.94],[21.98,68.62],[20.64,69.11],[21.25,69.37],[22.36,68.84],[23.66,68.89],[24.73,68.65],[25.69,69.09],[26.18,69.83],[27.73,70.16],[29.01,69.77]]]]},{id:`sk`,lon:19.51,lat:48.73,small:!1,parts:[[[[22.56,49.09],[22.28,48.83],[22.08,48.42],[21.87,48.32],[20.8,48.62],[20.48,48.56],[20.24,48.33],[19.77,48.2],[19.66,48.27],[19.18,48.11],[18.78,48.08],[18.7,47.88],[17.86,47.76],[17.49,47.87],[16.98,48.12],[16.88,48.47],[16.96,48.6],[17.1,48.82],[17.54,48.8],[17.89,48.9],[17.91,49],[18.11,49.04],[18.17,49.27],[18.4,49.31],[18.56,49.49],[18.85,49.5],[18.91,49.44],[19.32,49.57],[19.82,49.22],[20.42,49.43],[20.89,49.33],[21.61,49.47]]]]},{id:`cz`,lon:15.34,lat:49.78,small:!1,parts:[[[[15.02,51.11],[15.49,50.78],[16.24,50.7],[16.18,50.42],[16.72,50.22],[16.87,50.47],[17.56,50.36],[17.65,50.05],[18.39,49.99],[18.85,49.5],[18.56,49.49],[18.4,49.31],[18.17,49.27],[18.11,49.04],[17.91,49],[17.89,48.9],[17.54,48.8],[17.1,48.82],[16.96,48.6],[16.5,48.79],[16.03,48.73],[15.26,49.04],[14.9,48.96],[14.34,48.56],[13.6,48.88],[13.03,49.31],[12.52,49.55],[12.41,49.97],[12.24,50.27],[12.97,50.48],[13.34,50.73],[14.06,50.93],[14.31,51.12],[14.57,51]]]]},{id:`er`,lon:38.67,lat:15.43,small:!1,parts:[[[[36.43,14.42],[36.32,14.82],[36.75,16.29],[36.85,16.96],[37.17,17.26],[37.9,17.43],[38.41,18],[38.99,16.84],[39.27,15.92],[39.81,15.44],[41.18,14.49],[41.73,13.92],[42.28,13.34],[42.59,13],[43.08,12.7],[42.78,12.46],[42.35,12.54],[42.01,12.87],[41.6,13.45],[41.15,13.77],[40.9,14.12],[40.03,14.52],[39.34,14.53],[39.1,14.74],[38.51,14.51],[37.91,14.96],[37.59,14.21]]]]},{id:`jp`,lon:136.89,lat:36.02,small:!1,parts:[[[[141.88,39.18],[140.96,38.17],[140.98,37.14],[140.6,36.34],[140.77,35.84],[140.25,35.14],[138.97,34.67],[137.22,34.61],[135.79,33.46],[135.12,33.85],[135.08,34.6],[133.34,34.38],[132.16,33.9],[130.99,33.89],[132,33.15],[131.33,31.45],[130.69,31.03],[130.2,31.42],[130.45,32.32],[129.82,32.61],[129.41,33.3],[130.36,33.6],[130.88,34.23],[131.89,34.75],[132.62,35.43],[134.61,35.73],[135.68,35.53],[136.72,37.3],[137.39,36.83],[138.86,37.83],[139.43,38.22],[140.05,39.44],[139.88,40.56],[140.31,41.2],[141.37,41.38],[141.92,39.99]]],[[[144.61,43.96],[145.32,44.38],[145.54,43.26],[144.06,42.99],[143.18,41.99],[141.61,42.68],[141.07,41.59],[139.96,41.57],[139.82,42.56],[140.31,43.33],[141.38,43.39],[141.67,44.77],[141.97,45.55],[143.14,44.51],[143.91,44.17]]],[[[132.37,33.46],[132.93,34.06],[133.49,33.94],[133.91,34.36],[134.64,34.15],[134.77,33.81],[134.2,33.2],[133.79,33.52],[133.28,33.29],[133.02,32.7],[132.36,32.99]]]]},{id:`py`,lon:-58.39,lat:-23.25,small:!1,parts:[[[[-58.17,-20.18],[-57.87,-20.73],[-57.94,-22.09],[-56.88,-22.28],[-56.47,-22.09],[-55.8,-22.36],[-55.61,-22.66],[-55.52,-23.57],[-55.4,-23.96],[-55.03,-24],[-54.65,-23.84],[-54.29,-24.02],[-54.29,-24.57],[-54.43,-25.16],[-54.63,-25.74],[-54.79,-26.62],[-55.69,-27.39],[-56.49,-27.55],[-57.61,-27.4],[-58.62,-27.12],[-57.63,-25.6],[-57.78,-25.16],[-58.81,-24.77],[-60.03,-24.03],[-60.85,-23.88],[-62.69,-22.25],[-62.29,-21.05],[-62.26,-20.51],[-61.79,-19.63],[-60.04,-19.34],[-59.11,-19.36],[-58.18,-19.87]]]]},{id:`ye`,lon:47.53,lat:15.91,small:!1,parts:[[[[52,19],[52.78,17.35],[53.11,16.65],[52.39,16.38],[52.19,15.94],[52.17,15.6],[51.17,15.18],[49.57,14.71],[48.68,14],[48.24,13.95],[47.94,14.01],[47.35,13.59],[46.72,13.4],[45.88,13.35],[45.63,13.29],[45.41,13.03],[45.14,12.95],[44.99,12.7],[44.49,12.72],[44.17,12.59],[43.48,12.64],[43.22,13.22],[43.25,13.77],[43.09,14.06],[42.89,14.8],[42.6,15.21],[42.81,15.26],[42.7,15.72],[42.82,15.91],[42.78,16.35],[43.22,16.67],[43.12,17.09],[43.38,17.58],[43.79,17.32],[44.06,17.41],[45.22,17.43],[45.4,17.33],[46.37,17.23],[46.75,17.28],[47,16.95],[47.47,17.12],[48.18,18.17],[49.12,18.62]]]]},{id:`sa`,lon:44.52,lat:24.12,small:!1,parts:[[[[34.95,29.36],[36.07,29.2],[36.5,29.51],[36.74,29.87],[37.5,30],[37.67,30.34],[38,30.51],[37,31.51],[39,32.01],[39.2,32.16],[40.4,31.89],[41.89,31.19],[44.71,29.18],[46.57,29.1],[47.46,29],[47.71,28.53],[48.42,28.55],[48.81,27.69],[49.3,27.46],[49.47,27.11],[50.15,26.69],[50.21,26.28],[50.11,25.94],[50.24,25.61],[50.53,25.33],[50.66,25],[50.81,24.75],[51.11,24.56],[51.39,24.63],[51.58,24.24],[51.62,24.01],[52,23],[55.01,22.5],[55.21,22.71],[55.67,22],[55,20],[52,19],[49.12,18.62],[48.18,18.17],[47.47,17.12],[47,16.95],[46.75,17.28],[46.37,17.23],[45.4,17.33],[45.22,17.43],[44.06,17.41],[43.79,17.32],[43.38,17.58],[43.12,17.09],[43.22,16.67],[42.78,16.35],[42.65,16.77],[42.35,17.08],[42.27,17.47],[41.76,17.83],[41.22,18.67],[40.94,19.49],[40.25,20.17],[39.8,20.34],[39.14,21.29],[39.02,21.99],[39.07,22.58],[38.49,23.69],[38.03,24.08],[37.49,24.29],[37.15,24.86],[37.21,25.08],[36.93,25.6],[36.64,25.83],[36.25,26.57],[35.64,27.38],[35.13,28.06],[34.63,28.06],[34.79,28.61],[34.83,28.96]]]]},{id:``,lon:33.55,lat:35.27,small:!0,parts:[[[[32.73,35.14],[32.8,35.14],[32.95,35.39],[33.67,35.37],[34.58,35.67],[33.9,35.25],[33.98,35.06],[33.87,35.09],[33.68,35.02],[33.53,35.04],[33.47,35],[33.46,35.1],[33.38,35.16],[33.19,35.17],[32.92,35.09]]]]},{id:`cy`,lon:33.04,lat:34.91,small:!0,parts:[[[[32.73,35.14],[32.92,35.09],[33.19,35.17],[33.38,35.16],[33.46,35.1],[33.47,35],[33.53,35.04],[33.68,35.02],[33.87,35.09],[33.98,35.06],[34,34.98],[32.98,34.57],[32.49,34.7],[32.26,35.1]]]]},{id:`ma`,lon:-8.42,lat:29.89,small:!1,parts:[[[[-2.17,35.17],[-1.79,34.53],[-1.73,33.92],[-1.39,32.86],[-1.13,32.65],[-1.31,32.26],[-2.62,32.09],[-3.07,31.72],[-3.65,31.64],[-3.69,30.9],[-4.86,30.5],[-5.24,30],[-6.06,29.73],[-7.06,29.58],[-8.67,28.84],[-8.67,27.66],[-8.82,27.66],[-8.79,27.12],[-9.41,27.09],[-9.74,26.86],[-10.19,26.86],[-10.55,26.99],[-11.39,26.88],[-11.72,26.1],[-12.03,26.03],[-12.5,24.77],[-13.89,23.69],[-14.22,22.31],[-14.63,21.86],[-14.75,21.5],[-17,21.42],[-17.02,21.42],[-16.97,21.89],[-16.59,22.16],[-16.26,22.68],[-16.33,23.02],[-15.98,23.72],[-15.42,24.36],[-15.09,24.52],[-14.82,25.1],[-14.8,25.64],[-14.44,26.25],[-13.78,26.62],[-13.14,27.64],[-13.12,27.65],[-12.62,28.04],[-11.69,28.15],[-10.9,28.83],[-10.4,29.1],[-9.56,29.93],[-9.82,31.18],[-9.43,32.04],[-9.3,32.57],[-8.66,33.24],[-7.66,33.7],[-6.91,34.11],[-6.24,35.15],[-5.93,35.76],[-5.19,35.76],[-4.59,35.33],[-3.64,35.4],[-2.6,35.18]]]]},{id:`eg`,lon:29.84,lat:26.51,small:!1,parts:[[[[36.87,22],[32.9,22],[29.02,22],[25,22],[25,25.68],[25,29.24],[24.7,30.04],[24.96,30.66],[24.8,31.09],[25.17,31.57],[26.49,31.59],[27.46,31.32],[28.45,31.03],[28.91,30.87],[29.68,31.19],[30.09,31.47],[30.98,31.56],[31.69,31.43],[31.96,30.93],[32.19,31.26],[32.99,31.02],[33.77,30.97],[34.27,31.22],[34.82,29.76],[34.92,29.5],[34.64,29.1],[34.43,28.34],[34.16,27.82],[33.92,27.65],[33.59,27.97],[33.14,28.42],[32.42,29.85],[32.32,29.76],[32.73,28.7],[33.35,27.7],[34.1,26.14],[34.47,25.6],[34.8,25.03],[35.69,23.93],[35.49,23.75],[35.53,23.1],[36.69,22.21]]]]},{id:`ly`,lon:17.97,lat:27,small:!1,parts:[[[[25,22],[25,20],[23.85,20],[23.84,19.58],[19.85,21.49],[15.86,23.41],[14.85,22.86],[14.14,22.49],[13.58,23.04],[12,23.47],[11.56,24.1],[10.77,24.56],[10.31,24.38],[9.95,24.94],[9.91,25.37],[9.32,26.09],[9.71,26.51],[9.63,27.14],[9.76,27.69],[9.68,28.14],[9.86,28.96],[9.8,29.42],[9.48,30.31],[9.97,30.54],[10.06,30.96],[9.95,31.38],[10.64,31.76],[10.95,32.08],[11.43,32.37],[11.49,33.14],[12.66,32.79],[13.08,32.88],[13.92,32.71],[15.24,32.27],[15.71,31.38],[16.61,31.18],[18.02,30.76],[19.09,30.27],[19.58,30.53],[20.05,30.99],[19.82,31.75],[20.13,32.24],[20.85,32.71],[21.54,32.84],[22.89,32.64],[23.24,32.19],[23.61,32.19],[23.93,32.02],[24.92,31.9],[25.17,31.57],[24.8,31.09],[24.96,30.66],[24.7,30.04],[25,29.24],[25,25.68]]]]},{id:`et`,lon:39.55,lat:8.65,small:!1,parts:[[[[47.79,8],[44.96,5],[43.66,4.96],[42.77,4.25],[42.13,4.23],[41.86,3.92],[41.17,3.92],[40.77,4.26],[39.85,3.84],[39.56,3.42],[38.89,3.5],[38.67,3.62],[38.44,3.59],[38.12,3.6],[36.86,4.45],[36.16,4.45],[35.82,4.78],[35.82,5.34],[35.3,5.51],[34.71,6.59],[34.25,6.83],[34.08,7.23],[33.57,7.71],[32.95,7.78],[33.29,8.36],[33.82,8.38],[33.98,8.69],[33.96,9.58],[34.26,10.63],[34.73,10.91],[34.83,11.32],[35.26,12.08],[35.87,12.58],[36.27,13.56],[36.43,14.42],[37.59,14.21],[37.91,14.96],[38.51,14.51],[39.1,14.74],[39.34,14.53],[40.03,14.52],[40.9,14.12],[41.15,13.77],[41.6,13.45],[42.01,12.87],[42.35,12.54],[42,12.1],[41.66,11.63],[41.74,11.36],[41.76,11.05],[42.31,11.03],[42.55,11.11],[42.78,10.93],[42.56,10.57],[42.93,10.02],[43.3,9.54],[43.68,9.18],[46.95,8]]]]},{id:`dj`,lon:42.5,lat:11.77,small:!0,parts:[[[[42.35,12.54],[42.78,12.46],[43.08,12.7],[43.32,12.39],[43.29,11.98],[42.72,11.74],[43.14,11.46],[42.78,10.93],[42.55,11.11],[42.31,11.03],[41.76,11.05],[41.74,11.36],[41.66,11.63],[42,12.1]]]]},{id:``,lon:46.23,lat:9.76,small:!1,parts:[[[[48.95,11.41],[48.94,11.39],[48.94,10.98],[48.94,9.97],[48.94,9.45],[48.49,8.84],[47.79,8],[46.95,8],[43.68,9.18],[43.3,9.54],[42.93,10.02],[42.56,10.57],[42.78,10.93],[43.14,11.46],[43.47,11.28],[43.67,10.86],[44.12,10.45],[44.61,10.44],[45.56,10.7],[46.64,10.82],[47.53,11.13],[48.02,11.19],[48.38,11.38]]]]},{id:`ug`,lon:32.36,lat:1.3,small:!1,parts:[[[[33.9,-.95],[31.87,-1.03],[30.77,-1.01],[30.42,-1.14],[29.82,-1.44],[29.58,-1.34],[29.59,-.59],[29.82,-.21],[29.87,.6],[30.09,1.06],[30.47,1.58],[30.85,1.85],[31.17,2.2],[30.77,2.34],[30.83,3.51],[31.25,3.78],[31.88,3.56],[32.69,3.79],[33.39,3.79],[34,4.25],[34.48,3.55],[34.59,3.05],[35.04,1.91],[34.67,1.18],[34.18,.52],[33.89,.11]]]]},{id:`rw`,lon:29.92,lat:-2.01,small:!0,parts:[[[[30.42,-1.14],[30.81,-1.7],[30.76,-2.29],[30.47,-2.41],[29.94,-2.35],[29.63,-2.92],[29.03,-2.84],[29.12,-2.29],[29.26,-2.21],[29.29,-1.62],[29.58,-1.34],[29.82,-1.44]]]]},{id:`ba`,lon:17.82,lat:44.18,small:!0,parts:[[[[18.56,42.65],[17.67,43.03],[17.3,43.45],[16.91,43.67],[16.46,44.04],[16.24,44.35],[15.75,44.82],[15.96,45.23],[16.32,45],[16.53,45.21],[17,45.23],[17.86,45.07],[18.55,45.08],[19.01,44.86],[19.37,44.86],[19.12,44.42],[19.6,44.04],[19.45,43.57],[19.22,43.52],[19.03,43.43],[18.71,43.2]]]]},{id:`mk`,lon:21.7,lat:41.61,small:!0,parts:[[[[22.38,42.32],[22.88,42],[22.95,41.34],[22.76,41.3],[22.6,41.13],[22.06,41.15],[21.67,40.93],[21.02,40.84],[20.6,41.09],[20.46,41.52],[20.59,41.86],[20.72,41.85],[20.76,42.05],[21.35,42.21],[21.58,42.25],[21.92,42.3]]]]},{id:`rs`,lon:20.82,lat:44.23,small:!1,parts:[[[[18.83,45.91],[19.6,46.17],[20.22,46.13],[20.76,45.74],[20.87,45.42],[21.48,45.18],[21.56,44.77],[22.15,44.48],[22.46,44.7],[22.71,44.58],[22.47,44.41],[22.66,44.24],[22.41,44.01],[22.5,43.64],[22.98,43.21],[22.61,42.9],[22.44,42.58],[22.55,42.46],[22.38,42.32],[21.92,42.3],[21.58,42.25],[21.54,42.32],[21.66,42.44],[21.77,42.68],[21.63,42.68],[21.44,42.86],[21.27,42.91],[21.14,43.07],[20.96,43.13],[20.81,43.27],[20.63,43.22],[20.5,42.88],[20.26,42.81],[20.34,42.9],[19.96,43.11],[19.63,43.21],[19.49,43.35],[19.22,43.52],[19.45,43.57],[19.6,44.04],[19.12,44.42],[19.37,44.86],[19.01,44.86],[19.39,45.24],[19.07,45.52]]]]},{id:`me`,lon:19.29,lat:42.79,small:!0,parts:[[[[20.07,42.59],[19.8,42.5],[19.74,42.69],[19.31,42.2],[19.37,41.88],[19.16,41.96],[18.88,42.28],[18.45,42.48],[18.56,42.65],[18.71,43.2],[19.03,43.43],[19.22,43.52],[19.49,43.35],[19.63,43.21],[19.96,43.11],[20.34,42.9],[20.26,42.81]]]]},{id:``,lon:20.89,lat:42.58,small:!0,parts:[[[[20.59,41.86],[20.52,42.22],[20.28,42.32],[20.07,42.59],[20.26,42.81],[20.5,42.88],[20.63,43.22],[20.81,43.27],[20.96,43.13],[21.14,43.07],[21.27,42.91],[21.44,42.86],[21.63,42.68],[21.77,42.68],[21.66,42.44],[21.54,42.32],[21.58,42.25],[21.35,42.21],[20.76,42.05],[20.72,41.85]]]]},{id:`tt`,lon:-61.33,lat:10.43,small:!0,parts:[[[[-61.68,10.76],[-61.11,10.89],[-60.9,10.85],[-60.94,10.11],[-61.77,10],[-61.95,10.09],[-61.66,10.37]]]]},{id:`ss`,lon:30.2,lat:7.29,small:!1,parts:[[[[30.83,3.51],[29.95,4.17],[29.72,4.6],[29.16,4.39],[28.7,4.46],[28.43,4.29],[27.98,4.41],[27.37,5.23],[27.21,5.55],[26.47,5.95],[26.21,6.55],[25.8,6.98],[25.12,7.5],[25.12,7.83],[24.57,8.23],[23.89,8.62],[24.19,8.73],[24.54,8.92],[24.8,9.81],[25.07,10.27],[25.79,10.41],[25.96,10.14],[26.48,9.55],[26.75,9.47],[27.11,9.64],[27.83,9.6],[27.97,9.4],[28.97,9.4],[29,9.6],[29.51,9.79],[29.62,10.08],[30,10.29],[30.84,9.71],[31.35,9.81],[31.85,10.53],[32.4,11.08],[32.32,11.68],[32.07,11.97],[32.68,12.02],[32.74,12.25],[33.21,12.18],[33.09,11.44],[33.21,10.72],[33.72,10.33],[33.84,9.98],[33.82,9.48],[33.96,9.46],[33.98,8.69],[33.82,8.38],[33.29,8.36],[32.95,7.78],[33.57,7.71],[34.08,7.23],[34.25,6.83],[34.71,6.59],[35.3,5.51],[34.62,4.85],[34,4.25],[33.39,3.79],[32.69,3.79],[31.88,3.56],[31.25,3.78]]]]},{id:`va`,lon:12.44,lat:41.91,small:!0,parts:[[[[12.44,41.9],[12.43,41.9],[12.43,41.91],[12.44,41.91]]]]},{id:`fm`,lon:158.23,lat:6.89,small:!0,parts:[[[[162.98,5.32],[162.99,5.28],[162.93,5.3],[162.92,5.32],[162.96,5.34]]],[[[138.14,9.5],[138.07,9.42],[138.06,9.45],[138.08,9.49],[138.12,9.55],[138.15,9.58],[138.19,9.59],[138.21,9.55],[138.18,9.51]]],[[[151.65,7.35],[151.64,7.33],[151.58,7.34],[151.57,7.35],[151.6,7.36],[151.61,7.38],[151.59,7.38],[151.61,7.39],[151.63,7.39],[151.64,7.38],[151.65,7.36]]],[[[151.88,7.43],[151.87,7.43],[151.85,7.43],[151.86,7.46],[151.87,7.47],[151.88,7.47],[151.91,7.46],[151.91,7.45]]],[[[158.31,6.81],[158.26,6.79],[158.18,6.8],[158.16,6.88],[158.13,6.9],[158.13,6.94],[158.19,6.98],[158.3,6.95],[158.33,6.89],[158.31,6.85]]]]},{id:`mh`,lon:171.19,lat:7.1,small:!0,parts:[[[[169.64,5.83],[169.61,5.8],[169.59,5.8],[169.61,5.82],[169.63,5.86],[169.65,5.94],[169.7,5.98],[169.74,6.01],[169.73,5.98],[169.67,5.94]]],[[[168.83,7.31],[168.81,7.29],[168.72,7.3],[168.67,7.32],[168.68,7.34],[168.76,7.32]]],[[[171.58,7.05],[171.62,7.03],[171.69,7.03],[171.76,6.97],[171.73,6.98],[171.69,7],[171.66,7.01],[171.62,7.01],[171.59,7.02]]],[[[171.1,7.14],[171.23,7.09],[171.39,7.11],[171.37,7.1],[171.31,7.08],[171.26,7.07],[171.23,7.07],[171.2,7.07],[171.1,7.11],[171.04,7.16],[171.05,7.17]]],[[[166.89,11.15],[166.86,11.15],[166.85,11.15],[166.86,11.17],[166.89,11.17],[166.9,11.16]]]]},{id:`mp`,lon:145.74,lat:15.18,small:!0,parts:[[[[145.71,18.76],[145.68,18.73],[145.65,18.75],[145.64,18.81],[145.69,18.8],[145.71,18.79]]],[[[145.71,16.34],[145.69,16.33],[145.66,16.34],[145.64,16.35],[145.63,16.38],[145.7,16.38],[145.72,16.36]]],[[[145.26,14.16],[145.22,14.11],[145.18,14.12],[145.16,14.14],[145.15,14.16],[145.23,14.19],[145.27,14.18]]],[[[145.78,18.08],[145.73,18.06],[145.79,18.16],[145.81,18.17],[145.84,18.14]]],[[[145.75,15.13],[145.75,15.11],[145.7,15.11],[145.68,15.12],[145.71,15.21],[145.79,15.26],[145.82,15.27],[145.79,15.22],[145.78,15.18]]],[[[145.66,14.97],[145.62,14.92],[145.59,15],[145.59,15.03],[145.62,15.06],[145.65,15.06]]]]},{id:`vi`,lon:-64.78,lat:17.74,small:!0,parts:[[[[-64.85,18.33],[-64.92,18.32],[-65.02,18.37],[-64.94,18.38],[-64.89,18.37]]],[[[-64.66,18.35],[-64.73,18.33],[-64.77,18.33],[-64.79,18.34],[-64.75,18.37]]],[[[-64.77,17.79],[-64.68,17.75],[-64.58,17.75],[-64.69,17.71],[-64.89,17.7],[-64.89,17.77]]]]},{id:`gu`,lon:144.77,lat:13.44,small:!0,parts:[[[[144.74,13.26],[144.7,13.26],[144.66,13.29],[144.65,13.31],[144.65,13.43],[144.79,13.53],[144.84,13.62],[144.87,13.61],[144.91,13.6],[144.94,13.57],[144.78,13.41]]]]},{id:`as`,lon:-170.72,lat:-14.31,small:!0,parts:[[[[-170.73,-14.35],[-170.77,-14.36],[-170.82,-14.31],[-170.72,-14.28],[-170.69,-14.26],[-170.57,-14.27],[-170.64,-14.28]]]]},{id:`gs`,lon:-36.69,lat:-54.36,small:!0,parts:[[[[-26.26,-58.43],[-26.26,-58.49],[-26.42,-58.44],[-26.45,-58.42],[-26.4,-58.38],[-26.3,-58.38],[-26.28,-58.4]]],[[[-37.1,-54.07],[-37.01,-54.11],[-36.93,-54.08],[-36.85,-54.08],[-36.8,-54.1],[-36.76,-54.11],[-36.7,-54.11],[-36.61,-54.19],[-36.65,-54.26],[-36.54,-54.25],[-36.45,-54.31],[-36.41,-54.3],[-36.39,-54.28],[-36.33,-54.25],[-36.29,-54.29],[-36.24,-54.36],[-36.17,-54.38],[-36.12,-54.46],[-36.07,-54.55],[-36.03,-54.57],[-35.97,-54.57],[-35.89,-54.56],[-35.92,-54.64],[-35.91,-54.71],[-35.8,-54.76],[-35.87,-54.79],[-35.94,-54.83],[-36.08,-54.87],[-36.12,-54.85],[-36.25,-54.78],[-36.31,-54.69],[-36.44,-54.57],[-36.47,-54.53],[-36.51,-54.51],[-36.63,-54.5],[-36.74,-54.47],[-36.82,-54.4],[-36.85,-54.37],[-36.89,-54.34],[-37.01,-54.34],[-37.08,-54.31],[-37.16,-54.27],[-37.5,-54.16],[-37.63,-54.17],[-37.69,-54.13],[-37.69,-54.08],[-37.62,-54.04],[-37.91,-54.03],[-38.02,-54.01],[-37.95,-54],[-37.54,-53.99],[-37.38,-53.98],[-37.37,-54.01],[-37.23,-54.06]]]]},{id:`io`,lon:72.45,lat:-7.33,small:!0,parts:[[[[72.49,-7.38],[72.47,-7.42],[72.43,-7.43],[72.41,-7.33],[72.35,-7.26],[72.37,-7.26],[72.43,-7.3],[72.45,-7.4],[72.47,-7.37],[72.46,-7.34],[72.47,-7.31],[72.47,-7.28],[72.43,-7.23],[72.45,-7.22],[72.49,-7.26],[72.5,-7.29]]]]},{id:`sh`,lon:-5.72,lat:-15.96,small:!0,parts:[[[[-5.69,-16],[-5.78,-16],[-5.78,-15.96],[-5.71,-15.91],[-5.66,-15.91],[-5.66,-15.97]]],[[[-14.37,-7.97],[-14.4,-7.98],[-14.41,-7.97],[-14.42,-7.94],[-14.4,-7.91],[-14.38,-7.88],[-14.36,-7.89],[-14.33,-7.91],[-14.3,-7.93],[-14.32,-7.96]]]]},{id:`pn`,lon:-128.32,lat:-24.36,small:!0,parts:[[[[-128.29,-24.4],[-128.3,-24.41],[-128.32,-24.4],[-128.34,-24.37],[-128.35,-24.34],[-128.33,-24.32],[-128.3,-24.33],[-128.29,-24.36]]]]},{id:`ai`,lon:-63.06,lat:18.22,small:!0,parts:[[[[-63,18.22],[-63.16,18.17],[-63.15,18.2],[-63.03,18.27],[-62.98,18.27]]]]},{id:`ky`,lon:-81.28,lat:19.32,small:!0,parts:[[[[-81.37,19.35],[-81.34,19.33],[-81.3,19.34],[-81.28,19.36],[-81.13,19.35],[-81.11,19.3],[-81.23,19.3],[-81.28,19.28],[-81.31,19.27],[-81.41,19.28],[-81.42,19.37],[-81.39,19.38]]],[[[-79.98,19.71],[-79.99,19.7],[-80.02,19.71],[-80.1,19.67],[-80.12,19.67],[-80.12,19.68],[-80.1,19.7],[-80.08,19.71],[-80.07,19.71],[-80.02,19.72],[-79.99,19.72]]],[[[-79.82,19.71],[-79.87,19.7],[-79.9,19.7],[-79.83,19.74],[-79.8,19.76],[-79.79,19.77],[-79.77,19.77],[-79.74,19.76],[-79.74,19.75]]]]},{id:`bm`,lon:-64.75,lat:32.31,small:!0,parts:[[[[-64.73,32.29],[-64.82,32.26],[-64.85,32.26],[-64.86,32.27],[-64.77,32.31],[-64.69,32.39],[-64.67,32.38]]]]},{id:`vg`,lon:-64.62,lat:18.42,small:!0,parts:[[[[-64.4,18.46],[-64.42,18.46],[-64.44,18.46],[-64.44,18.47],[-64.42,18.51],[-64.32,18.52]]],[[[-64.59,18.4],[-64.67,18.4],[-64.69,18.41],[-64.65,18.44],[-64.57,18.45],[-64.55,18.44]]],[[[-64.29,18.74],[-64.27,18.71],[-64.28,18.71],[-64.34,18.73],[-64.38,18.73],[-64.4,18.74],[-64.41,18.75],[-64.32,18.75]]]]},{id:`tc`,lon:-71.74,lat:21.81,small:!0,parts:[[[[-71.66,21.76],[-71.66,21.75],[-71.72,21.79],[-71.83,21.79],[-71.85,21.84],[-71.8,21.85],[-71.67,21.83],[-71.64,21.79]]],[[[-71.88,21.84],[-71.9,21.83],[-71.96,21.86],[-71.96,21.89],[-71.98,21.89],[-72.02,21.92],[-72.01,21.95],[-71.93,21.95],[-71.9,21.86]]],[[[-72.33,21.85],[-72.22,21.8],[-72.15,21.8],[-72.14,21.79],[-72.18,21.78],[-72.19,21.77],[-72.3,21.75],[-72.33,21.76],[-72.34,21.8]]]]},{id:`ms`,lon:-62.18,lat:16.74,small:!0,parts:[[[[-62.15,16.74],[-62.15,16.68],[-62.22,16.7],[-62.22,16.75],[-62.19,16.81],[-62.17,16.81]]]]},{id:`je`,lon:-2.13,lat:49.22,small:!0,parts:[[[[-2.02,49.23],[-2.01,49.18],[-2.05,49.17],[-2.09,49.19],[-2.17,49.19],[-2.24,49.18],[-2.22,49.27],[-2.08,49.25]]]]},{id:`gg`,lon:-2.57,lat:49.47,small:!0,parts:[[[[-2.51,49.49],[-2.55,49.43],[-2.64,49.45],[-2.65,49.47],[-2.54,49.51],[-2.52,49.51]]]]},{id:`im`,lon:-4.54,lat:54.22,small:!0,parts:[[[[-4.41,54.18],[-4.61,54.06],[-4.7,54.08],[-4.76,54.07],[-4.79,54.07],[-4.75,54.12],[-4.7,54.22],[-4.61,54.27],[-4.51,54.38],[-4.43,54.41],[-4.39,54.4],[-4.38,54.39],[-4.34,54.27],[-4.39,54.22]]]]},{id:`to`,lon:-175.22,lat:-21.17,small:!0,parts:[[[[-175.16,-21.17],[-175.15,-21.17],[-175.13,-21.14],[-175.08,-21.13],[-175.08,-21.16],[-175.16,-21.26],[-175.2,-21.22],[-175.33,-21.16],[-175.36,-21.11],[-175.32,-21.07],[-175.32,-21.1],[-175.3,-21.11],[-175.23,-21.12],[-175.16,-21.15],[-175.2,-21.16]]],[[[-173.95,-18.64],[-173.99,-18.7],[-174.01,-18.7],[-174.05,-18.66],[-174.07,-18.64],[-174,-18.57],[-173.97,-18.57],[-173.92,-18.59],[-173.92,-18.61]]],[[[-174.91,-21.3],[-174.92,-21.45],[-174.97,-21.38],[-174.97,-21.35],[-174.92,-21.3]]]]},{id:`sg`,lon:103.82,lat:1.36,small:!0,parts:[[[[103.97,1.33],[103.82,1.27],[103.65,1.33],[103.7,1.42],[103.82,1.45],[103.91,1.42],[103.96,1.39],[104,1.37]]]]},{id:`sc`,lon:55.48,lat:-4.66,small:!0,parts:[[[[55.54,-4.69],[55.54,-4.79],[55.5,-4.75],[55.48,-4.7],[55.42,-4.65],[55.38,-4.61],[55.46,-4.56]]]]},{id:`st`,lon:6.61,lat:.24,small:!0,parts:[[[[7.43,1.57],[7.39,1.54],[7.34,1.56],[7.33,1.6],[7.39,1.68],[7.41,1.7],[7.44,1.68],[7.45,1.66],[7.45,1.63]]],[[[6.66,.12],[6.56,.05],[6.52,.07],[6.5,.12],[6.47,.23],[6.48,.28],[6.53,.34],[6.63,.4],[6.69,.41],[6.75,.33],[6.75,.24]]]]},{id:`sm`,lon:12.46,lat:43.94,small:!0,parts:[[[[12.49,43.9],[12.43,43.89],[12.4,43.94],[12.44,43.98],[12.5,43.99],[12.52,43.95]]]]},{id:`ws`,lon:-172.44,lat:-13.63,small:!0,parts:[[[[-172.33,-13.47],[-172.22,-13.56],[-172.18,-13.68],[-172.22,-13.8],[-172.33,-13.77],[-172.48,-13.8],[-172.54,-13.79],[-172.66,-13.64],[-172.74,-13.58],[-172.78,-13.52],[-172.67,-13.52],[-172.51,-13.48]]],[[[-171.45,-14.05],[-171.73,-14.05],[-171.86,-14],[-171.91,-14],[-172.03,-13.91],[-172.05,-13.86],[-171.99,-13.82],[-171.86,-13.81],[-171.6,-13.88],[-171.57,-13.94],[-171.51,-13.95],[-171.46,-13.98],[-171.45,-14.02]]]]},{id:`vc`,lon:-61.19,lat:13.25,small:!0,parts:[[[[-61.17,13.16],[-61.2,13.14],[-61.28,13.21],[-61.27,13.29],[-61.22,13.33],[-61.18,13.36],[-61.14,13.36],[-61.12,13.29],[-61.13,13.2]]],[[[-61.23,12.99],[-61.24,12.98],[-61.23,12.98],[-61.24,12.98],[-61.25,12.98],[-61.26,12.99],[-61.28,12.99],[-61.28,13],[-61.26,12.99],[-61.24,13],[-61.24,13.01],[-61.25,13.01],[-61.25,13.02],[-61.24,13.03],[-61.21,13.04],[-61.2,13.05],[-61.2,13.04],[-61.21,13.02]]],[[[-61.34,12.7],[-61.34,12.69],[-61.35,12.7],[-61.34,12.7],[-61.34,12.71],[-61.34,12.72],[-61.34,12.73],[-61.33,12.73],[-61.32,12.74],[-61.32,12.73],[-61.31,12.72],[-61.32,12.72],[-61.32,12.71],[-61.33,12.7]]]]},{id:`lc`,lon:-60.97,lat:13.89,small:!0,parts:[[[[-60.9,13.82],[-60.95,13.72],[-61.06,13.78],[-61.07,13.87],[-61.06,13.92],[-61,14.01],[-60.94,14.07],[-60.91,14.09],[-60.89,14.01]]]]},{id:`kn`,lon:-62.75,lat:17.33,small:!0,parts:[[[[-62.53,17.12],[-62.58,17.1],[-62.62,17.13],[-62.61,17.2],[-62.57,17.2],[-62.53,17.17]]],[[[-62.63,17.24],[-62.66,17.23],[-62.7,17.29],[-62.78,17.3],[-62.84,17.34],[-62.84,17.35],[-62.84,17.37],[-62.83,17.39],[-62.79,17.4],[-62.71,17.35],[-62.67,17.29],[-62.64,17.26]]]]},{id:`pw`,lon:134.58,lat:7.51,small:!0,parts:[[[[131.17,3.03],[131.15,3.02],[131.14,3.02],[131.14,3.04],[131.15,3.05],[131.17,3.06],[131.19,3.06],[131.19,3.04]]],[[[134.6,7.38],[134.54,7.36],[134.51,7.44],[134.52,7.53],[134.56,7.59],[134.6,7.62],[134.61,7.62],[134.65,7.71],[134.66,7.66],[134.63,7.5],[134.6,7.44]]]]},{id:`nu`,lon:-169.87,lat:-19.05,small:!0,parts:[[[[-169.8,-19.08],[-169.91,-19.14],[-169.95,-19.07],[-169.91,-18.99],[-169.86,-18.97],[-169.83,-18.97],[-169.79,-19.04]]]]},{id:`ck`,lon:-159.79,lat:-21.22,small:!0,parts:[[[[-159.74,-21.25],[-159.77,-21.25],[-159.81,-21.24],[-159.84,-21.24],[-159.84,-21.23],[-159.83,-21.2],[-159.81,-21.19],[-159.77,-21.19],[-159.74,-21.21],[-159.74,-21.24]]]]},{id:`aw`,lon:-69.98,lat:12.52,small:!0,parts:[[[[-69.9,12.45],[-69.9,12.42],[-69.94,12.44],[-70,12.5],[-70.07,12.55],[-70.05,12.6],[-70.04,12.61],[-69.97,12.57],[-69.91,12.48]]]]},{id:`cw`,lon:-68.97,lat:12.19,small:!0,parts:[[[[-68.75,12.06],[-68.8,12.05],[-69,12.14],[-69.15,12.3],[-69.16,12.38],[-69.12,12.37],[-69.08,12.34],[-69.01,12.23],[-68.83,12.16]]]]},{id:`nr`,lon:166.93,lat:-.52,small:!0,parts:[[[[166.96,-.52],[166.94,-.55],[166.92,-.55],[166.91,-.52],[166.91,-.5],[166.94,-.49],[166.96,-.5]]]]},{id:`mc`,lon:7.41,lat:43.75,small:!0,parts:[[[[7.44,43.75],[7.38,43.73],[7.38,43.75],[7.4,43.77],[7.41,43.77],[7.44,43.76]]]]},{id:`mu`,lon:57.57,lat:-20.28,small:!0,parts:[[[[57.65,-20.48],[57.52,-20.51],[57.38,-20.5],[57.33,-20.45],[57.32,-20.43],[57.36,-20.41],[57.36,-20.34],[57.39,-20.23],[57.42,-20.18],[57.49,-20.14],[57.52,-20.06],[57.58,-20],[57.66,-19.99],[57.74,-20.1],[57.79,-20.21],[57.78,-20.33],[57.72,-20.37],[57.71,-20.44]]]]},{id:`mt`,lon:14.44,lat:35.89,small:!0,parts:[[[[14.57,35.85],[14.53,35.82],[14.44,35.82],[14.35,35.87],[14.35,35.98],[14.45,35.96],[14.54,35.89]]],[[[14.31,36.03],[14.25,36.01],[14.19,36.04],[14.18,36.06],[14.26,36.08],[14.3,36.06],[14.32,36.04]]]]},{id:`mv`,lon:73.41,lat:3.26,small:!0,parts:[[[[73.42,3.23],[73.4,3.23],[73.38,3.25],[73.38,3.27],[73.4,3.29],[73.43,3.29],[73.44,3.27],[73.44,3.25]]],[[[73.51,4.17],[73.5,4.15],[73.48,4.16],[73.47,4.17],[73.48,4.19],[73.49,4.21],[73.5,4.23],[73.52,4.25],[73.53,4.24],[73.53,4.23],[73.52,4.21],[73.52,4.19]]]]},{id:`li`,lon:9.53,lat:47.14,small:!0,parts:[[[[9.58,47.06],[9.5,47.06],[9.49,47.06],[9.48,47.1],[9.48,47.17],[9.53,47.27],[9.54,47.25],[9.54,47.23],[9.55,47.21],[9.56,47.19],[9.57,47.16],[9.6,47.13],[9.61,47.11],[9.6,47.08]]]]},{id:`ki`,lon:-157.37,lat:1.85,small:!0,parts:[[[[172.97,3.13],[172.91,3.1],[172.89,3.1],[172.96,3.15],[172.96,3.14]]],[[[172.84,3.05],[172.77,3.01],[172.75,3.03],[172.78,3.03],[172.83,3.07],[172.89,3.07],[172.88,3.05]]],[[[173.02,1.85],[173.02,1.82],[172.97,1.89],[172.93,1.93],[172.93,1.94],[172.95,1.93],[172.97,1.91],[172.98,1.9]]],[[[173.03,1.72],[172.99,1.71],[173.02,1.73],[173.03,1.75],[173.02,1.81],[173.04,1.8],[173.04,1.78],[173.04,1.74]]],[[[173.03,1.01],[173.09,.97],[173.08,.95],[173.06,.92],[172.99,.84],[172.97,.84],[173.04,.92],[173.07,.96],[173.03,1],[173.01,.99],[172.99,1.02],[173.01,1.02]]],[[[174.51,-.8],[174.48,-.83],[174.46,-.8],[174.48,-.77],[174.45,-.65],[174.41,-.63],[174.38,-.59],[174.39,-.59],[174.44,-.63],[174.47,-.64],[174.5,-.73]]],[[[174.77,-1.21],[174.78,-1.26],[174.75,-1.26],[174.75,-1.24],[174.74,-1.19],[174.72,-1.13],[174.74,-1.15],[174.77,-1.19]]],[[[173.04,1.34],[173.01,1.34],[173.03,1.36],[173.14,1.38],[173.15,1.39],[173.17,1.38],[173.17,1.36],[173.16,1.36],[173.11,1.36],[173.06,1.35]]],[[[169.55,-.87],[169.54,-.88],[169.52,-.87],[169.52,-.85],[169.54,-.85],[169.56,-.86]]],[[[-172.21,-4.51],[-172.21,-4.52],[-172.2,-4.52],[-172.18,-4.51],[-172.19,-4.52],[-172.22,-4.53],[-172.23,-4.51],[-172.21,-4.49],[-172.2,-4.49],[-172.2,-4.5],[-172.21,-4.5]]],[[[-171.09,-3.13],[-171.09,-3.14],[-171.1,-3.14],[-171.09,-3.13],[-171.09,-3.12],[-171.08,-3.12]]],[[[-171.23,-4.46],[-171.24,-4.47],[-171.26,-4.47],[-171.26,-4.46],[-171.26,-4.45],[-171.25,-4.44],[-171.24,-4.44],[-171.23,-4.45]]],[[[-174.51,-4.67],[-174.5,-4.69],[-174.5,-4.7],[-174.51,-4.69],[-174.52,-4.69],[-174.53,-4.68],[-174.52,-4.69],[-174.51,-4.68],[-174.52,-4.67],[-174.53,-4.67],[-174.54,-4.66],[-174.53,-4.66]]],[[[-154.95,-4.09],[-154.96,-4.09],[-154.97,-4.09],[-154.99,-4.07],[-155.02,-4.05],[-154.99,-4.04],[-154.95,-4.03],[-154.94,-4.04],[-154.95,-4.06]]],[[[-151.78,-11.44],[-151.79,-11.46],[-151.81,-11.45],[-151.82,-11.43],[-151.82,-11.41],[-151.81,-11.39],[-151.8,-11.39],[-151.79,-11.41]]],[[[-155.87,-5.63],[-155.89,-5.63],[-155.92,-5.63],[-155.93,-5.62],[-155.93,-5.61],[-155.92,-5.61],[-155.91,-5.61],[-155.87,-5.61],[-155.86,-5.62]]],[[[-157.34,1.86],[-157.18,1.74],[-157.25,1.73],[-157.42,1.79],[-157.58,1.9],[-157.53,1.93],[-157.51,1.89],[-157.43,1.85],[-157.39,1.93],[-157.37,1.95],[-157.49,2.03],[-157.44,2.02],[-157.32,1.97]]],[[[-159.34,3.92],[-159.26,3.84],[-159.27,3.8],[-159.33,3.8],[-159.36,3.81],[-159.31,3.82],[-159.31,3.84],[-159.33,3.86],[-159.35,3.88],[-159.37,3.88],[-159.38,3.85],[-159.41,3.87],[-159.39,3.9],[-159.37,3.92]]],[[[-171.7,-2.77],[-171.67,-2.79],[-171.64,-2.81],[-171.63,-2.85],[-171.63,-2.86],[-171.65,-2.86],[-171.67,-2.84],[-171.69,-2.83],[-171.7,-2.82],[-171.68,-2.82],[-171.66,-2.84],[-171.64,-2.85],[-171.64,-2.83],[-171.66,-2.8],[-171.67,-2.79],[-171.69,-2.78],[-171.71,-2.77],[-171.72,-2.78],[-171.73,-2.77],[-171.72,-2.77],[-171.72,-2.76]]]]},{id:`gd`,lon:-61.68,lat:12.12,small:!0,parts:[[[[-61.72,12.01],[-61.78,12.01],[-61.76,12.05],[-61.75,12.11],[-61.71,12.19],[-61.66,12.24],[-61.61,12.22],[-61.63,12.05]]]]},{id:`pm`,lon:-56.33,lat:46.95,small:!0,parts:[[[[-56.15,46.76],[-56.17,46.75],[-56.24,46.77],[-56.21,46.8],[-56.18,46.81],[-56.15,46.81],[-56.14,46.8],[-56.14,46.78]]],[[[-56.27,46.84],[-56.35,46.79],[-56.39,46.82],[-56.38,46.85],[-56.33,46.92],[-56.34,46.94],[-56.39,47.07],[-56.38,47.09],[-56.36,47.1],[-56.29,47.07],[-56.28,47.03],[-56.31,46.95],[-56.29,46.9],[-56.26,46.86]]]]},{id:`wf`,lon:-178.13,lat:-14.28,small:!0,parts:[[[[-176.16,-13.33],[-176.18,-13.34],[-176.19,-13.3],[-176.17,-13.24],[-176.15,-13.22],[-176.13,-13.27]]],[[[-178.05,-14.32],[-178.1,-14.32],[-178.16,-14.31],[-178.19,-14.26],[-178.18,-14.23],[-178.14,-14.24],[-178.11,-14.28],[-178.05,-14.3]]]]},{id:`mf`,lon:-63.06,lat:18.09,small:!0,parts:[[[[-63.01,18.07],[-63.12,18.07],[-63.11,18.09],[-63.06,18.12],[-63.02,18.11],[-63.01,18.1]]]]},{id:`bl`,lon:-62.84,lat:17.9,small:!0,parts:[[[[-62.83,17.88],[-62.85,17.87],[-62.86,17.88],[-62.87,17.9],[-62.88,17.91],[-62.87,17.92],[-62.8,17.91],[-62.81,17.9],[-62.82,17.88]]]]},{id:`pf`,lon:-149.42,lat:-17.66,small:!0,parts:[[[[-151.47,-16.66],[-151.48,-16.67],[-151.51,-16.65],[-151.51,-16.62],[-151.51,-16.57],[-151.46,-16.6],[-151.44,-16.62]]],[[[-149.81,-17.55],[-149.85,-17.57],[-149.89,-17.55],[-149.9,-17.53],[-149.91,-17.5],[-149.9,-17.47],[-149.81,-17.47],[-149.78,-17.49]]],[[[-151.41,-16.88],[-151.45,-16.88],[-151.48,-16.86],[-151.48,-16.76],[-151.47,-16.74],[-151.41,-16.77],[-151.37,-16.86]]],[[[-149.32,-17.69],[-149.18,-17.74],[-149.15,-17.81],[-149.18,-17.86],[-149.26,-17.85],[-149.29,-17.82],[-149.34,-17.73],[-149.48,-17.75],[-149.58,-17.73],[-149.63,-17.62],[-149.63,-17.56],[-149.61,-17.53],[-149.51,-17.5],[-149.38,-17.52],[-149.33,-17.59]]],[[[-139.02,-9.69],[-138.87,-9.75],[-138.83,-9.74],[-138.87,-9.79],[-139.02,-9.82],[-139.07,-9.85],[-139.13,-9.83],[-139.16,-9.77]]],[[[-139.06,-9.93],[-139.13,-10.01],[-139.14,-9.93],[-139.11,-9.92],[-139.08,-9.92]]],[[[-138.65,-10.52],[-138.69,-10.53],[-138.69,-10.43],[-138.64,-10.45],[-138.62,-10.46],[-138.63,-10.49]]],[[[-140.07,-8.91],[-140.17,-8.93],[-140.22,-8.93],[-140.25,-8.85],[-140.24,-8.8],[-140.22,-8.78],[-140.06,-8.8],[-140.04,-8.84],[-140.05,-8.87]]],[[[-140.08,-9.43],[-140.1,-9.44],[-140.14,-9.38],[-140.14,-9.36],[-140.07,-9.33],[-140.03,-9.34]]],[[[-140.81,-17.86],[-140.8,-17.88],[-140.84,-17.87],[-140.85,-17.87],[-140.85,-17.83],[-140.82,-17.79],[-140.8,-17.75],[-140.76,-17.72],[-140.69,-17.68],[-140.65,-17.67],[-140.64,-17.68],[-140.65,-17.68],[-140.78,-17.75],[-140.81,-17.8],[-140.83,-17.84],[-140.83,-17.85]]],[[[-139.56,-8.94],[-139.62,-8.95],[-139.63,-8.9],[-139.61,-8.87],[-139.58,-8.86],[-139.54,-8.88],[-139.51,-8.9],[-139.51,-8.92]]],[[[-140.68,-18.38],[-140.67,-18.42],[-140.69,-18.4],[-140.77,-18.36],[-140.78,-18.34]]],[[[-140.83,-18.19],[-140.82,-18.22],[-140.86,-18.2],[-140.9,-18.15],[-140.96,-18.09],[-140.97,-18.06],[-140.93,-18.08],[-140.89,-18.12]]],[[[-136.3,-18.55],[-136.31,-18.57],[-136.32,-18.55],[-136.34,-18.53],[-136.38,-18.51],[-136.44,-18.49],[-136.46,-18.48],[-136.48,-18.47],[-136.46,-18.46],[-136.43,-18.47],[-136.38,-18.5],[-136.33,-18.52]]],[[[-136.97,-18.34],[-136.97,-18.36],[-137.07,-18.27],[-137.03,-18.27]]],[[[-138.51,-20.86],[-138.53,-20.88],[-138.52,-20.85],[-138.55,-20.79],[-138.57,-20.79],[-138.55,-20.77],[-138.51,-20.81]]],[[[-142.51,-16.1],[-142.53,-16.11],[-142.51,-16.03],[-142.48,-16.02]]],[[[-143.44,-16.62],[-143.39,-16.67],[-143.46,-16.64],[-143.55,-16.62],[-143.52,-16.61],[-143.46,-16.61]]],[[[-143.57,-16.64],[-143.61,-16.64],[-143.71,-16.58],[-143.67,-16.58],[-143.61,-16.62]]],[[[-145.05,-15.86],[-145.06,-15.9],[-145.08,-15.86],[-145.14,-15.79],[-145.16,-15.76],[-145.13,-15.76]]],[[[-145.49,-16.33],[-145.48,-16.35],[-145.5,-16.35],[-145.54,-16.3],[-145.55,-16.25],[-145.58,-16.2],[-145.61,-16.17],[-145.61,-16.13],[-145.61,-16.08],[-145.58,-16.16],[-145.54,-16.22],[-145.52,-16.28]]]]},{id:`ax`,lon:19.94,lat:60.23,small:!0,parts:[[[[19.99,60.35],[20.02,60.35],[20.03,60.36],[20.09,60.35],[20.17,60.31],[20.18,60.29],[20.24,60.28],[20.26,60.26],[20.19,60.19],[20.15,60.19],[20.13,60.2],[20.07,60.19],[20.04,60.18],[20.03,60.15],[20.03,60.09],[19.8,60.08],[19.74,60.1],[19.67,60.23],[19.69,60.27],[19.74,60.28],[19.78,60.29],[19.78,60.21],[19.85,60.22],[19.87,60.27],[19.87,60.3],[19.86,60.32],[19.81,60.33],[19.79,60.35],[19.82,60.39],[19.89,60.41],[19.95,60.36]]],[[[19.66,60.19],[19.67,60.17],[19.63,60.17],[19.6,60.16],[19.58,60.14],[19.54,60.14],[19.52,60.18],[19.55,60.24],[19.63,60.25]]],[[[20.61,60.04],[20.6,60.02],[20.52,60.01],[20.49,60.03],[20.41,60.03],[20.4,60.04],[20.43,60.06],[20.49,60.08],[20.57,60.07]]]]},{id:`dm`,lon:-61.36,lat:15.44,small:!0,parts:[[[[-61.28,15.25],[-61.38,15.23],[-61.41,15.4],[-61.48,15.53],[-61.47,15.6],[-61.46,15.63],[-61.32,15.58],[-61.28,15.53],[-61.25,15.37]]]]},{id:`fo`,lon:-6.88,lat:62.17,small:!0,parts:[[[[-6.62,61.81],[-6.64,61.77],[-6.67,61.77],[-6.76,61.81],[-6.84,61.84],[-6.86,61.86],[-6.89,61.9],[-6.84,61.9],[-6.79,61.9],[-6.66,61.86],[-6.63,61.83]]],[[[-6.7,61.44],[-6.68,61.41],[-6.7,61.42],[-6.77,61.45],[-6.89,61.54],[-6.93,61.6],[-6.94,61.63],[-6.91,61.63],[-6.88,61.6],[-6.77,61.58],[-6.74,61.57],[-6.74,61.54],[-6.71,61.5]]],[[[-7.19,62.14],[-7.1,62.1],[-7.07,62.07],[-7.12,62.05],[-7.18,62.04],[-7.26,62.05],[-7.38,62.07],[-7.42,62.14],[-7.34,62.14],[-7.23,62.15]]],[[[-6.63,62.23],[-6.65,62.09],[-6.7,62.09],[-6.77,62.13],[-6.82,62.14],[-6.84,62.12],[-6.84,62.1],[-6.81,62.08],[-6.72,61.99],[-6.72,61.96],[-6.73,61.95],[-6.81,61.98],[-7.01,62.09],[-7.17,62.28],[-6.96,62.32],[-6.8,62.27]]],[[[-6.41,62.26],[-6.45,62.19],[-6.53,62.2],[-6.54,62.21],[-6.56,62.22],[-6.55,62.28],[-6.55,62.36],[-6.47,62.29]]]]},{id:`km`,lon:43.34,lat:-11.66,small:!0,parts:[[[[44.48,-12.08],[44.53,-12.22],[44.53,-12.32],[44.51,-12.36],[44.46,-12.34],[44.38,-12.25],[44.22,-12.17],[44.29,-12.17],[44.34,-12.17],[44.38,-12.17],[44.41,-12.12],[44.41,-12.09],[44.45,-12.07]]],[[[43.79,-12.31],[43.86,-12.37],[43.66,-12.34],[43.63,-12.29],[43.63,-12.25],[43.7,-12.26]]],[[[43.47,-11.9],[43.45,-11.92],[43.36,-11.86],[43.3,-11.84],[43.23,-11.75],[43.26,-11.43],[43.28,-11.39],[43.3,-11.37],[43.34,-11.37],[43.39,-11.41],[43.38,-11.61],[43.45,-11.75],[43.49,-11.86]]]]},{id:`mo`,lon:113.51,lat:22.22,small:!0,parts:[[[[113.48,22.2],[113.48,22.22],[113.49,22.24],[113.53,22.25],[113.55,22.22],[113.5,22.2],[113.49,22.2]]]]},{id:`hk`,lon:114.14,lat:22.44,small:!0,parts:[[[[114.01,22.51],[114.02,22.51],[114.05,22.54],[114.1,22.55],[114.12,22.57],[114.19,22.57],[114.23,22.55],[114.27,22.54],[114.29,22.5],[114.28,22.46],[114.32,22.44],[114.34,22.4],[114.29,22.37],[114.29,22.33],[114.27,22.3],[114.14,22.35],[114.03,22.38],[113.94,22.37],[113.9,22.4],[113.9,22.43],[114.01,22.48]]],[[[114.23,22.21],[114.21,22.2],[114.14,22.27],[114.13,22.29],[114.19,22.3],[114.25,22.26],[114.25,22.23]]],[[[114,22.21],[113.88,22.21],[113.85,22.22],[113.84,22.24],[113.88,22.28],[114.04,22.33],[114,22.28]]]]},{id:`cv`,lon:-23.64,lat:15.08,small:!0,parts:[[[[-25.17,16.95],[-25.27,16.93],[-25.31,16.94],[-25.32,17.02],[-25.34,17.07],[-25.34,17.09],[-25.11,17.19],[-25.04,17.18],[-24.98,17.1],[-25.02,17.05]]],[[[-23.45,15.01],[-23.51,14.92],[-23.64,14.92],[-23.7,14.96],[-23.78,15.08],[-23.78,15.17],[-23.75,15.24],[-23.76,15.31],[-23.75,15.33],[-23.71,15.32],[-23.7,15.27],[-23.58,15.16],[-23.54,15.14]]],[[[-24.89,16.82],[-24.97,16.79],[-25.02,16.8],[-25.09,16.83],[-25.07,16.87],[-24.99,16.91],[-24.94,16.92],[-24.89,16.85]]],[[[-22.92,16.24],[-22.83,16.22],[-22.8,16.23],[-22.75,16.22],[-22.69,16.17],[-22.68,16.11],[-22.71,16.04],[-22.82,15.99],[-22.88,15.99],[-22.96,16.04],[-22.92,16.15]]],[[[-24.31,14.86],[-24.38,14.82],[-24.44,14.83],[-24.49,14.87],[-24.52,14.93],[-24.5,14.98],[-24.39,15.04],[-24.33,15.02],[-24.29,14.93]]],[[[-24.09,16.62],[-24.05,16.59],[-24.03,16.57],[-24.09,16.56],[-24.24,16.6],[-24.28,16.58],[-24.32,16.49],[-24.4,16.62],[-24.39,16.66],[-24.38,16.68],[-24.27,16.65]]],[[[-22.89,16.66],[-22.92,16.61],[-22.96,16.68],[-22.98,16.7],[-22.99,16.81],[-22.93,16.84],[-22.91,16.84],[-22.91,16.73]]],[[[-23.18,15.14],[-23.21,15.13],[-23.25,15.18],[-23.24,15.24],[-23.25,15.26],[-23.21,15.32],[-23.14,15.32],[-23.12,15.27],[-23.12,15.17]]]]},{id:`bb`,lon:-59.56,lat:13.18,small:!0,parts:[[[[-59.49,13.08],[-59.52,13.06],[-59.61,13.1],[-59.64,13.15],[-59.65,13.3],[-59.59,13.32],[-59.49,13.2],[-59.43,13.15]]]]},{id:`bh`,lon:50.54,lat:26.04,small:!0,parts:[[[[50.61,25.88],[50.58,25.81],[50.54,25.83],[50.47,25.97],[50.49,26.06],[50.45,26.19],[50.47,26.23],[50.56,26.25],[50.59,26.24],[50.56,26.2],[50.61,26.12],[50.62,26]]]]},{id:`hm`,lon:73.52,lat:-53.09,small:!0,parts:[[[[73.71,-53.14],[73.59,-53.19],[73.46,-53.18],[73.41,-53.15],[73.33,-53.03],[73.28,-53.02],[73.26,-52.99],[73.25,-52.98],[73.31,-52.97],[73.39,-53],[73.59,-53.03],[73.73,-53.09],[73.84,-53.11],[73.8,-53.13]]]]},{id:`nf`,lon:167.95,lat:-29.05,small:!0,parts:[[[[167.94,-29.02],[167.96,-29.03],[167.98,-29.03],[167.99,-29.04],[167.99,-29.06],[167.98,-29.08],[167.97,-29.08],[167.97,-29.09],[167.96,-29.09],[167.96,-29.1],[167.95,-29.08],[167.94,-29.07],[167.93,-29.07],[167.93,-29.08],[167.92,-29.08],[167.92,-29.07],[167.91,-29.06],[167.91,-29.05],[167.91,-29.04],[167.93,-29.04],[167.93,-29.03],[167.92,-29.03],[167.91,-29.03],[167.92,-29.01]]]]},{id:`ag`,lon:-61.79,lat:17.08,small:!0,parts:[[[[-61.72,17.04],[-61.75,17],[-61.86,17.01],[-61.88,17.06],[-61.89,17.1],[-61.82,17.17],[-61.74,17.14],[-61.71,17.11],[-61.68,17.1],[-61.68,17.07],[-61.7,17.05]]],[[[-61.75,17.57],[-61.76,17.55],[-61.84,17.6],[-61.87,17.69],[-61.86,17.7],[-61.85,17.71],[-61.82,17.7],[-61.78,17.69],[-61.75,17.66]]]]},{id:`ad`,lon:1.56,lat:42.54,small:!0,parts:[[[[1.7,42.5],[1.68,42.5],[1.59,42.46],[1.54,42.44],[1.49,42.43],[1.45,42.44],[1.43,42.46],[1.43,42.5],[1.42,42.53],[1.42,42.55],[1.43,42.6],[1.46,42.62],[1.5,42.64],[1.57,42.64],[1.71,42.6],[1.74,42.58],[1.74,42.56],[1.72,42.53]]]]},{id:`sx`,lon:-63.06,lat:18.05,small:!0,parts:[[[[-63.12,18.07],[-63.01,18.07],[-63.01,18.04],[-63.02,18.02],[-63.09,18.04],[-63.12,18.06]]]]}]},Ml=18,Nl=105,Pl=1,Fl=1.008,Il=1.02,Ll=1.055,Rl=`
  varying vec3 vNormal;
  varying vec3 vWorld;
  void main() {
    vec4 worldPos = modelMatrix * vec4(position, 1.0);
    vWorld = worldPos.xyz;
    vNormal = normalize(mat3(modelMatrix) * normal);
    gl_Position = projectionMatrix * viewMatrix * worldPos;
  }
`,zl=`
  varying vec3 vNormal;
  varying vec3 vWorld;
  uniform vec3 uColor;
  uniform float uOpacity;
  uniform float uGlow;
  void main() {
    vec3 n = normalize(vNormal);
    vec3 viewDir = normalize(cameraPosition - vWorld);
    float rim = pow(1.0 - max(dot(n, viewDir), 0.0), 2.15);
    vec3 col = mix(uColor, vec3(0.72, 0.96, 1.0), rim * uGlow);
    gl_FragColor = vec4(col, uOpacity);
  }
`,Bl=`
  varying vec3 vNormal;
  void main() {
    vNormal = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`,Vl=`
  varying vec3 vNormal;
  void main() {
    float rim = pow(1.0 - max(dot(normalize(vNormal), vec3(0.0, 0.0, 1.0)), 0.0), 1.65);
    vec3 deep = vec3(0.012, 0.028, 0.05);
    vec3 edge = vec3(0.09, 0.2, 0.32);
    gl_FragColor = vec4(mix(deep, edge, rim), 1.0);
  }
`,Hl=`
  varying vec3 vNormal;
  void main() {
    vNormal = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`,Ul=`
  varying vec3 vNormal;
  void main() {
    float rim = pow(0.58 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 3.1);
    float glow = clamp(rim, 0.0, 1.0);
    vec3 col = mix(vec3(0.13, 0.78, 0.86), vec3(0.55, 0.32, 1.0), glow);
    gl_FragColor = vec4(col, 1.0) * glow;
  }
`;function Wl(e,t,n){let r=(90-t)*Math.PI/180,i=(e+180)*Math.PI/180,a=Math.sin(r);return new J(-n*a*Math.cos(i),n*Math.cos(r),n*a*Math.sin(i))}function Gl(e){if(e.length>1){let t=e[0],n=e[e.length-1];if(t&&n&&t[0]===n[0]&&t[1]===n[1])return e.slice(0,-1)}return e}function Kl(e,t,n){let r=t.clone().sub(e),i=n.clone().sub(e),a=r.cross(i),o=e.clone().add(t).add(n);return a.dot(o)<0?[e,n,t]:[e,t,n]}function ql(e,t,n,r,i){let a=e.distanceTo(t),o=t.distanceTo(n),s=n.distanceTo(e),c=Math.max(a,o,s);if(!(c<1e-5||c>1.55)){if(c>.26&&i<4){let a=e.length(),o=(e,t)=>e.clone().add(t).multiplyScalar(.5).normalize().multiplyScalar(a),s=o(e,t),c=o(t,n),l=o(n,e);ql(e,s,l,r,i+1),ql(t,c,s,r,i+1),ql(n,l,c,r,i+1),ql(s,c,l,r,i+1)}else r.push(e.x,e.y,e.z,t.x,t.y,t.z,n.x,n.y,n.z)}}function Jl(e,t,r){let i=Gl(e[0]??[]);if(i.length<3)return;let a=pe([i,...e.slice(1).map(Gl).filter(e=>e.length>=3)]);if(a.vertices.length<6)return;let o=n(a.vertices,a.holes,a.dimensions),s=[];for(let e=0;e<a.vertices.length;e+=a.dimensions){let n=a.vertices[e],r=a.vertices[e+1];if(n===void 0||r===void 0||!Number.isFinite(n)||!Number.isFinite(r))return;s.push(Wl(n,r,t))}for(let e=0;e<o.length;e+=3){let t=s[o[e]??-1],n=s[o[e+1]??-1],i=s[o[e+2]??-1];if(!t||!n||!i)continue;let[a,c,l]=Kl(t,n,i);ql(a,c,l,r,0)}}function Yl(e,t,n){let r=Gl(e[0]??[]);if(r.length<2)return;let i=[],a=(e,n)=>{Number.isFinite(e)&&Number.isFinite(n)&&i.push(Wl(e,n,t))};for(let e=0;e<r.length;e+=1){let t=r[e],n=r[(e+1)%r.length];if(!t||!n)continue;let i=(n[0]??0)-(t[0]??0),o=(n[1]??0)-(t[1]??0),s=Math.max(1,Math.ceil(Math.hypot(i,o)/5));for(let e=0;e<s;e+=1){let n=e/s;a((t[0]??0)+i*n,(t[1]??0)+o*n)}}a(r[0]?.[0]??0,r[0]?.[1]??0);for(let e=0;e<i.length-1;e+=1){let t=i[e],r=i[e+1];!t||!r||t.distanceTo(r)>1.15||n.push(t.x,t.y,t.z,r.x,r.y,r.z)}}function Xl(e){if(e.length<6)return null;let t=new ei;return t.setAttribute(`position`,new zr(new Float32Array(e),3)),t}function Zl(e,t){let n=Xl(e);return!n||e.length<9?null:(n.computeVertexNormals(),new wi(n,t))}function Ql(e,t){let n=Xl(e);return n?new Wi(n,t):null}function $l(e){return new J((e>>16&255)/255,(e>>8&255)/255,(e&255)/255)}function eu(e,t,n){return new pa({uniforms:{uColor:{value:$l(e)},uOpacity:{value:t},uGlow:{value:n}},vertexShader:Rl,fragmentShader:zl,transparent:t<1,depthWrite:!0,polygonOffset:!0,polygonOffsetFactor:1,polygonOffsetUnits:1})}function tu(e,t){return new Mi({color:e,transparent:!0,opacity:t,depthWrite:!1,toneMapped:!1})}function nu(){let e=[],t=1.014,n=(n,r,i,a,o)=>{let s=Wl(r,n,t);for(let c=1;c<=o;c+=1){let l=c/o,u=Wl(r+(a-r)*l,n+(i-n)*l,t);s.distanceTo(u)<1.15&&e.push(s.x,s.y,s.z,u.x,u.y,u.z),s=u}};for(let e=-60;e<=60;e+=30)n(e,-180,e,180,48);for(let e=-180;e<180;e+=30)n(-75,e,75,e,30);return e}function ru(e){if(!e||typeof e!=`object`)return!1;let t=e;return typeof t.cc==`string`&&typeof t.name==`string`&&typeof t.region==`string`&&typeof t.href==`string`&&typeof t.flag==`string`&&typeof t.lat==`number`&&typeof t.lon==`number`&&Array.isArray(t.isos)}function iu(e,t,n){return Math.min(n,Math.max(t,e))}function au(){let e=document.querySelector(`[data-cc-map]`);if(!e||e.dataset.ready===`true`)return;e.dataset.ready=`true`;let t=e.querySelector(`[data-cc-globe-wrap]`),n=e.querySelector(`[data-cc-globe]`),r=e.querySelector(`[data-cc-fallback]`),i=e.querySelector(`[data-cc-map-copy]`),a=e.querySelector(`[data-cc-map-flag]`),o=e.querySelector(`[data-cc-map-go]`),s=e.querySelector(`[data-cc-jump]`);if(!t||!n||!i||!a||!o)return;let c=()=>{e.dataset.globe=`off`,r&&(r.hidden=!1)},l=[];try{let e=JSON.parse(decodeURIComponent(n.dataset.markets??``));Array.isArray(e)&&(l=e.filter(ru))}catch{c();return}let u;try{u=new Al({canvas:n,alpha:!0,antialias:!0,powerPreference:`high-performance`})}catch{c();return}if(!u.getContext()){c();return}let d=window.matchMedia(`(pointer: coarse)`),f=window.matchMedia(`(prefers-reduced-motion: reduce)`),p=()=>d.matches,m=()=>f.matches;u.setPixelRatio(Math.min(window.devicePixelRatio||1,p()?1.5:2)),u.setClearColor(0,0);let h=new or,g=new Ua(30,1,.08,50),_=new Qn,v=new Qn;h.add(_),_.add(v);let y=new Map;for(let e of l)for(let t of e.isos)y.set(t,e);let b=eu(7163391,1,.42),x=eu(2282478,1,.72),S=eu(6974086,.3,.08),C=eu(1779768,1,.22),w=tu(10156031,.82),T=tu(16056063,.95),E=tu(10156031,.14),D=tu(14411765,.16),O=new Map,k=e=>{let t=O.get(e.cc);if(t)return t;let n={cc:e.cc,name:e.name,region:e.region,must:e.must,href:e.href,flag:e.flag,lat:e.lat,lon:e.lon,meshes:[],lines:null,marker:null};return O.set(e.cc,n),n},A=[],j=[],ee=new Map,M=new Map;for(let e of jl.countries){let t=y.get(e.id),n=t?ee.get(t.cc)??[]:A,r=t?M.get(t.cc)??[]:j;t&&(ee.has(t.cc)||ee.set(t.cc,n),M.has(t.cc)||M.set(t.cc,r));let i=t?Fl:Pl,a=t?Il:1.004;try{for(let t of e.parts)Jl(t,i,n),Yl(t,a,r)}catch{continue}}let te=Zl(A,C);te&&v.add(te);let ne=Ql(j,D);ne&&v.add(ne);let N=new wi(new ia(.985,64,48),new pa({vertexShader:Bl,fragmentShader:Vl,depthWrite:!0}));v.add(N);let re=Ql(nu(),tu(9133302,.32));re&&v.add(re);let P=new ia(.016,14,10),ie=new ia(.016,12,8),ae=new ia(.05,10,8),F=new fi({color:6090751,toneMapped:!1}),oe=new fi({color:16777215,toneMapped:!1}),I=new fi({color:6090751,transparent:!0,opacity:.25,toneMapped:!1}),se=new fi({color:2279382,transparent:!0,opacity:.38,blending:2,depthWrite:!1,toneMapped:!1}),ce=new fi({transparent:!0,opacity:0,depthWrite:!1,colorWrite:!1}),le=[];for(let e of l){let t=k(e),n=Zl(ee.get(e.cc)??[],b);n&&(n.userData.market=t,n.userData.kind=`land`,t.meshes.push(n),v.add(n),le.push(n));let r=Ql(M.get(e.cc)??[],w);if(r&&(t.lines=r,v.add(r)),e.small){let n=Wl(e.lon,e.lat,Ll),r=new Qn;r.position.copy(n);let i=new wi(P,F),a=new wi(ie,se);a.scale.setScalar(2.5),a.raycast=()=>void 0;let o=new wi(ae,ce);o.userData.market=t,o.userData.kind=`mark`,i.raycast=()=>void 0,r.add(a,i,o),t.marker=r,v.add(r),le.push(o)}}let ue=new wi(new ia(1.13,64,48),new pa({vertexShader:Hl,fragmentShader:Ul,side:1,blending:2,transparent:!0,depthWrite:!1}));h.add(ue);let de=new Float32Array(1260);for(let e=0;e<420;e+=1){let t=new J().randomDirection().multiplyScalar(7.5+Math.random()*4);de[e*3]=t.x,de[e*3+1]=t.y,de[e*3+2]=t.z}let fe=new ei;fe.setAttribute(`position`,new zr(de,3));let pe=new Xi(fe,new Gi({color:12042464,size:.028,transparent:!0,opacity:.55,depthWrite:!1,sizeAttenuation:!0,toneMapped:!1}));h.add(pe);let me=Wl(Nl,Ml,1).normalize();v.quaternion.setFromUnitVectors(me,new J(0,0,1));let L=1,he=``,R=null,ge=null,_e=0,ve=!1,z=!1,ye=0,B=null,be=!0,xe=()=>{let e=Math.tan(g.fov*Math.PI/360),t=1.18;return Math.max(t/e,t/(e*Math.max(g.aspect,.35)))},Se=()=>{g.position.z=iu(xe()*L,1.75,9)},Ce=()=>{let e=ge??R;for(let t of O.values()){let n=t===e,r=!he||t.region===he,i=n?x:r?b:S;for(let e of t.meshes)e.material=i;t.lines&&(t.lines.material=n?T:r?w:E);let a=t.marker?.children[1],o=t.marker?.children[0];a&&a instanceof wi&&(a.material=n?oe:r?F:I),o&&(o.visible=r)}},we=e=>{if(i.replaceChildren(),!e){i.textContent=p()?`点一下亮色国家，再点「进入」`:`点选亮色国家，查看合规要求`,a.hidden=!0,o.hidden=!0,o.removeAttribute(`href`);return}let t=document.createElement(`strong`);t.textContent=e.name;let n=document.createElement(`span`);n.textContent=`${e.region} · ${e.must} 项必办`,i.append(t,n),a.hidden=!1,a.src=e.flag,o.hidden=!1,o.href=e.href},V=t=>{for(let n of e.querySelectorAll(`[data-cc-region]`))n.setAttribute(`aria-pressed`,n.dataset.ccRegion===t?`true`:`false`)},Te=(e,t,n,r)=>{let i=new tn().setFromUnitVectors(Wl(t,e,1).normalize(),new J(0,0,1));z=!r,m()?(v.quaternion.copy(i),_.rotation.set(0,0,0),L=n,Se(),B=null):B={fromQ:v.quaternion.clone(),toQ:i,fromX:_.rotation.x,fromY:_.rotation.y,fromMul:L,toMul:n,t0:performance.now(),dur:760,resume:r}},Ee=()=>{he=``,V(`all`),Ce(),we(ge),Te(Ml,Nl,1,!0)},De=new co,Oe=new q,ke=e=>{let t=n.getBoundingClientRect();if(!t.width||!t.height)return null;Oe.x=(e.clientX-t.left)/t.width*2-1,Oe.y=-((e.clientY-t.top)/t.height)*2+1,De.setFromCamera(Oe,g);let r=De.intersectObjects(le,!1).filter(e=>e.point.dot(g.position)>0&&e.object.userData.market);return(r.find(e=>e.object.userData.kind===`land`)??r[0])?.object.userData.market??null},H=()=>{let e=t.clientWidth,n=t.clientHeight;e&&n&&(g.aspect=e/n,g.updateProjectionMatrix(),u.setSize(e,n,!1),Se())};new ResizeObserver(()=>H()).observe(t),H(),Ce(),we(null);let U=new Map,Ae=null,je=!1,Me=0,Ne=0,Pe=0,Fe=()=>{let e=[...U.values()],t=e[0],n=e[1];return!t||!n?0:Math.hypot(t.x-n.x,t.y-n.y)};n.addEventListener(`pointerdown`,e=>{(e.pointerType!==`mouse`||e.button===0)&&(U.set(e.pointerId,{x:e.clientX,y:e.clientY}),U.size>=2?(Pe=Fe(),Ae=null,je=!0,B=null,ve=!0):(Ae=e.pointerId,je=!1,Me=e.clientX,Ne=e.clientY))}),n.addEventListener(`pointermove`,e=>{let t=U.get(e.pointerId);if(!t){!p()&&e.pointerType!==`touch`&&(R=ke(e),Ce(),ge||we(R));return}let r=e.clientX-t.x,i=e.clientY-t.y;if(t.x=e.clientX,t.y=e.clientY,U.size>=2&&Pe>0){let e=Fe();e>0&&(L=iu(Pe/e*L,.46,1.7),Pe=e,Se());return}if(Ae!==e.pointerId||!je&&Math.hypot(e.clientX-Me,e.clientY-Ne)<6)return;je||(je=!0,n.setPointerCapture(e.pointerId),n.classList.add(`is-panning`),ve=!0,B=null);let a=n.clientWidth||1;_.rotation.y+=r/a*Math.PI*1.2,_.rotation.x=iu(_.rotation.x+i/a*Math.PI*1.2,-.65,.65)}),n.addEventListener(`pointerup`,e=>{let t=Ae!==e.pointerId||je,r=U.has(e.pointerId);if(U.delete(e.pointerId),U.size<2&&(Pe=0),Ae!==e.pointerId||(Ae=null,ve=U.size>0,n.classList.remove(`is-panning`),!r))return;if(t){ye=performance.now()+1500;return}let i=ke(e);i?p()?ge?.cc===i.cc?window.location.href=i.href:(ge=i,_e=performance.now(),we(i),Ce()):window.location.href=i.href:p()&&(ge=null,we(null),Ce())}),n.addEventListener(`pointercancel`,e=>{U.delete(e.pointerId),Ae===e.pointerId&&(Ae=null,ve=!1,je=!0,n.classList.remove(`is-panning`),ye=performance.now()+1500)}),n.addEventListener(`pointerleave`,()=>{Ae!==null||p()||(R=null,Ce(),we(ge))}),n.addEventListener(`wheel`,e=>{e.preventDefault();let t=e.deltaMode===1?e.deltaY*16:e.deltaY;L=iu(L*Math.exp(t*.0011),.46,1.7),Se()},{passive:!1}),n.addEventListener(`keydown`,e=>{let t=.14;e.key===`ArrowLeft`||e.key===`ArrowRight`?(B=null,_.rotation.y+=e.key===`ArrowRight`?t:-.14,ye=performance.now()+1500,e.preventDefault()):e.key===`ArrowUp`||e.key===`ArrowDown`?(B=null,_.rotation.x=iu(_.rotation.x+(e.key===`ArrowDown`?t:-.14),-.65,.65),e.preventDefault()):e.key===`+`||e.key===`=`?(L=iu(L*.84,.46,1.7),Se(),e.preventDefault()):e.key===`-`||e.key===`_`?(L=iu(L*1.18,.46,1.7),Se(),e.preventDefault()):e.key===`0`||e.key===`Home`?(Ee(),e.preventDefault()):e.key===`Enter`&&ge&&(window.location.href=ge.href)}),n.addEventListener(`webglcontextlost`,e=>{e.preventDefault(),be=!1,c()});for(let t of e.querySelectorAll(`[data-cc-zoom]`))t.addEventListener(`click`,()=>{let e=t.dataset.ccZoom;e===`in`?(L=iu(L*.82,.46,1.7),Se()):e===`out`?(L=iu(L*1.2,.46,1.7),Se()):Ee()});for(let t of e.querySelectorAll(`[data-cc-region]`))t.addEventListener(`click`,()=>{let e=t.dataset.ccRegion??`all`;if(e===`all`){Ee();return}let n=Number(t.dataset.lat),r=Number(t.dataset.lon);Number.isFinite(n)&&Number.isFinite(r)&&(he=e,V(e),Ce(),Te(n,r,.68,!1))});s?.addEventListener(`change`,()=>{s.value&&(window.location.href=s.value)}),o.addEventListener(`click`,e=>{performance.now()-_e<350&&e.preventDefault()}),document.addEventListener(`visibilitychange`,()=>{be=!document.hidden});let Ie=t=>{if(!be)requestAnimationFrame(Ie);else{if(B){let e=iu((t-B.t0)/B.dur,0,1),n=e<.5?2*e*e:1-(-2*e+2)**2/2;v.quaternion.slerpQuaternions(B.fromQ,B.toQ,n),_.rotation.y=B.fromY*(1-n),_.rotation.x=B.fromX*(1-n),L=B.fromMul+(B.toMul-B.fromMul)*n,Se(),e>=1&&(v.quaternion.copy(B.toQ),_.rotation.set(0,0,0),L=B.toMul,Se(),z=!B.resume,B=null)}else!m()&&!ve&&!z&&t>ye&&(_.rotation.y+=.0018);if(!m()){let e=1+Math.sin(t*.004)*.14;for(let t of O.values()){if(!t.marker)continue;let n=t===(ge??R);t.marker.scale.setScalar(n?1.4:e)}}u.render(h,g),e.dataset.globe!==`on`&&(e.dataset.globe=`on`),requestAnimationFrame(Ie)}};requestAnimationFrame(Ie)}au();