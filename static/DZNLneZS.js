import{d as W,a as X,T as G,r as c,U as J,L as K,u as Q,j as Z,t as tt,v as et,x as t,y as n,M as e,V as p,W as x,X as g,ai as _,Y as k,B as b,$ as ot,a0 as st}from"./BmZGITcj.js";import{n as nt}from"./DP16PUbO.js";const lt={class:"px-3"},at={class:"m-auto mt-4 max-w-[800px] rounded-md bg-pink-100 p-2 shadow-lg md:p-10"},rt={class:"mb-4 border-2 border-black bg-white p-2"},dt=t("div",{class:"my-2 text-2xl font-bold"},"確認資料",-1),ut=t("div",{class:"mt-1 text-lg font-bold"},"租借時間 :",-1),ct=t("div",{class:"mt-1 text-lg font-bold"},"租借人數 :",-1),it=t("div",{class:"mt-1 text-lg font-bold"},"租借時數 :",-1),pt=t("div",{class:"mt-1 text-lg font-bold"},"姓名 :",-1),vt=t("div",{class:"mt-1 text-lg font-bold"},"電話 :",-1),mt=t("div",{class:"mt-1 text-lg font-bold"},"信箱 :",-1),ft=t("div",{class:"mt-1 text-lg font-bold"},"備註 :",-1),ht={class:"border-2 border-black bg-white p-2"},xt=t("div",{class:"my-2 text-2xl font-bold"},"付款資訊",-1),gt={class:"mb-2"},_t=t("div",{class:"font-bold"},[t("span",{class:"text-red-800"},"*"),b("信用卡號")],-1),bt={class:"mb-2"},yt=t("div",{class:"font-bold"},[t("span",{class:"text-red-800"},"*"),b("有效月年")],-1),wt={class:"flex"},St={class:"mb-2"},Dt=t("div",{class:"font-bold"},[t("span",{class:"text-red-800"},"*"),b("安全碼")],-1),$t={class:"text-end text-xl font-bold"},qt=t("div",{class:"my-3 mr-4 w-fit cursor-pointer rounded-sm bg-gray-100 px-2 py-1 text-black"}," 修改資料 ",-1),kt=W({__name:"pay",setup(Ct){const{$firebaseDb:M}=X(),T=M,U=G(),y=c();J(U,o=>{o?y.value=o:y.value=null});const a=K(),N=Q(),w=a.query.name,S=a.query.phone,D=a.query.mail,$=a.query.date,q=a.query.time,C=a.query.people,h=a.query.hours,I=a.query.notice,i=c(),r=c(),v=c(),d=c(),m=c(),u=c(),f=c();function B(){if(m.value="",u.value="",f.value="",!i.value){m.value="信用卡號不得為空";return}if(i.value.replace(/\s+/g,"").length!==16){m.value="信用卡號必須為16位";return}if(!r.value||!v.value){u.value="有效月年不得為空";return}if(r.value.length!==2||v.value.length!==2){u.value="有效月年必須為2位";return}if(!z(r.value)){u.value="請輸入正確的有效月年";return}if(!d.value){f.value="安全碼不得為空";return}if(d.value.length!==3){f.value="安全碼必須為3位";return}const o=nt(10),s=ot(T,"users",y.value.uid,"rents",o);st(s,{name:w,phone:S,mail:D,date:$,time:q,people:C,hours:h,notice:I,price:V.value,ID:o,orderTime:R(),state:"預約成功"}).then(()=>{N.push({path:"/rent/complete",query:{name:w,phone:S,mail:D,date:$,time:q,people:C,hours:h,notice:I,price:V.value,ID:o}})})}function R(){const o=new Date,s=o.getFullYear(),l=String(o.getMonth()+1).padStart(2,"0"),F=String(o.getDate()).padStart(2,"0"),H=String(o.getHours()).padStart(2,"0"),O=String(o.getMinutes()).padStart(2,"0"),P=String(o.getSeconds()).padStart(2,"0");return`${s}-${l}-${F}T${H}:${O}:${P}`}function Y(){i.value=i.value.replace(/\s+/g,"").replace(/[^0-9]/gi,"").replace(/(.{4})/g,"$1 ").trim()}function A(){v.value=d.value.replace(/\D/g,"")}function j(){r.value=r.value.replace(/\D/g,"")}function L(){d.value=d.value.replace(/\D/g,"")}function z(o){const s=parseInt(o,10);return s>=1&&s<=12}const V=Z(()=>E(1500*Number(h)));function E(o){return o.toLocaleString()}return(o,s)=>(tt(),et("div",lt,[t("div",at,[t("div",rt,[dt,ut,t("div",null,n(e($))+" "+n(e(q)),1),ct,t("div",null,n(e(C)),1),it,t("div",null,n(e(h)),1),pt,t("div",null,n(e(w)),1),vt,t("div",null,n(e(S)),1),mt,t("div",null,n(e(D)),1),ft,t("div",null,n(e(I)),1)]),t("div",ht,[xt,t("div",gt,[_t,p(t("input",{"onUpdate:modelValue":s[0]||(s[0]=l=>g(i)?i.value=l:null),type:"text",placeholder:"請輸入信用卡號",class:_(["my-1 w-full border py-1 pl-2",{error:e(m)}]),maxlength:"19",onInput:Y},null,34),[[x,e(i)]]),p(t("div",{class:"text-sm text-red-800"},n(e(m)),513),[[k,e(m)]])]),t("div",bt,[yt,t("div",wt,[p(t("input",{"onUpdate:modelValue":s[1]||(s[1]=l=>g(r)?r.value=l:null),type:"text",placeholder:"月",class:_(["my-1 mr-3 w-full border py-1 pl-2",{error:e(u)}]),maxlength:"2",onInput:j},null,34),[[x,e(r)]]),p(t("input",{"onUpdate:modelValue":s[2]||(s[2]=l=>g(v)?v.value=l:null),type:"text",placeholder:"年",class:_(["my-1 w-full border py-1 pl-2",{error:e(u)}]),maxlength:"2",onInput:A},null,34),[[x,e(v)]])]),p(t("div",{class:"text-sm text-red-800"},n(e(u)),513),[[k,e(u)]])]),t("div",St,[Dt,p(t("input",{"onUpdate:modelValue":s[3]||(s[3]=l=>g(d)?d.value=l:null),type:"text",placeholder:"請輸入安全碼",class:_(["my-1 w-full border py-1 pl-2",{error:e(f)}]),maxlength:"3",onInput:L},null,34),[[x,e(d)]]),p(t("div",{class:"text-sm text-red-800"},n(e(f)),513),[[k,e(f)]])]),t("div",$t,[b(" 總費用 "),t("span",null,"$"+n(e(V)),1)])])]),t("div",{class:"flex justify-center"},[qt,t("div",{class:"my-3 w-fit cursor-pointer rounded-sm bg-amber-800 px-2 py-1 text-white",onClick:B}," 完成 ")])]))}});export{kt as default};
