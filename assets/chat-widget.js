(()=>{if(document.getElementById("dp-chat-launcher"))return;
const style=document.createElement("style");
style.textContent=`
#dp-chat-launcher{position:fixed!important;right:24px!important;bottom:24px!important;z-index:9998!important;width:58px!important;height:58px!important;border:1px solid #d4af37!important;border-radius:50%!important;background:#0d1b2a!important;color:#d4af37!important;box-shadow:0 12px 34px #0007!important;cursor:pointer!important;font:26px Georgia!important;display:grid!important;place-items:center!important}
#dp-chat-panel{position:fixed!important;right:24px!important;bottom:94px!important;z-index:9999!important;width:min(410px,calc(100vw - 32px))!important;height:min(590px,calc(100dvh - 120px))!important;display:none!important;grid-template-rows:76px minmax(0,1fr) 62px 34px!important;align-content:stretch!important;gap:0!important;background:#0d1b2a!important;color:#f7f3e9!important;border:1px solid #d4af37!important;border-radius:22px!important;overflow:hidden!important;box-shadow:0 24px 80px #0008!important;font:14px/1.45 Arial,sans-serif!important}
#dp-chat-panel.open{display:grid!important}
#dp-chat-panel .dp-head{grid-row:1!important;min-height:76px!important;height:76px!important;padding:14px 18px!important;background:#17283d!important;display:flex!important;align-items:center!important;justify-content:space-between!important;gap:12px!important;border:0!important}
#dp-chat-panel .dp-head strong{display:block!important;font:25px Georgia!important;color:#d4af37!important;line-height:1.1!important}
#dp-chat-panel .dp-head small{display:block!important;margin-top:4px!important;color:#c2ccd6!important;font:12px Arial!important}
#dp-chat-panel .dp-close{width:34px!important;height:34px!important;flex:0 0 34px!important;border:1px solid #ffffff30!important;border-radius:50%!important;background:#0d1b2a!important;color:#f7f3e9!important;font-size:20px!important;cursor:pointer!important}
#dp-chat-panel .dp-log{grid-row:2!important;min-height:0!important;padding:18px!important;overflow-y:auto!important;display:flex!important;flex-direction:column!important;align-items:stretch!important;gap:12px!important;background:#0d1b2a!important}
#dp-chat-panel .dp-welcome{padding:13px 15px!important;border:1px solid #d4af3728!important;border-radius:14px 14px 14px 4px!important;background:#192b41!important;color:#f7f3e9!important;max-width:92%!important}
#dp-chat-panel .dp-quick{display:flex!important;flex-wrap:wrap!important;gap:7px!important}
#dp-chat-panel .dp-quick button{border:1px solid #d4af3766!important;border-radius:20px!important;background:transparent!important;color:#e6c45c!important;padding:7px 10px!important;font-size:11px!important;cursor:pointer!important}
#dp-chat-panel .dp-msg{max-width:88%!important;padding:11px 13px!important;border-radius:14px!important;white-space:pre-wrap!important;overflow-wrap:anywhere!important}
#dp-chat-panel .dp-msg.bot{background:#192b41!important;color:#f7f3e9!important;align-self:start!important;border-bottom-left-radius:4px!important}
#dp-chat-panel .dp-msg.user{background:#d4af37!important;color:#0d1b2a!important;align-self:end!important;border-bottom-right-radius:4px!important}
#dp-chat-panel .dp-form{grid-row:3!important;display:flex!important;align-items:center!important;gap:8px!important;padding:10px 12px!important;border-top:1px solid #ffffff20!important;background:#111f30!important}
#dp-chat-panel .dp-form input{flex:1!important;width:0!important;min-width:0!important;height:42px!important;background:#17283b!important;color:white!important;border:1px solid #ffffff38!important;padding:0 12px!important;border-radius:10px!important;font-size:13px!important}
#dp-chat-panel .dp-form button{height:42px!important;background:#d4af37!important;color:#101a27!important;border:0!important;border-radius:10px!important;padding:0 16px!important;font-weight:700!important;cursor:pointer!important}
#dp-chat-panel .dp-note{grid-row:4!important;font-size:10px!important;color:#9eacba!important;padding:6px 14px 9px!important;background:#111f30!important}
@media(max-width:600px){#dp-chat-panel{right:10px!important;bottom:82px!important;width:calc(100vw - 20px)!important;height:min(590px,calc(100dvh - 100px))!important}#dp-chat-launcher{right:16px!important;bottom:16px!important}}
/* Reset global site section spacing so the chat chrome anchors to the panel edges. */
#dp-chat-panel{box-sizing:border-box!important;margin:0!important;padding:0!important;min-height:0!important;align-content:stretch!important;grid-template-rows:76px minmax(0,1fr) 62px 34px!important}
#dp-chat-panel>.dp-head{position:relative!important;top:0!important;flex:none!important;margin:0!important}
#dp-chat-panel>.dp-log{margin:0!important}
#dp-chat-panel>.dp-form{position:relative!important;bottom:0!important;margin:0!important;align-self:end!important}
#dp-chat-panel>.dp-note{margin:0!important;align-self:stretch!important}

`;
document.head.append(style);
const mk=()=>Math.random().toString(36).slice(2)+Date.now().toString(36);
let v=localStorage.dpVisitor||(localStorage.dpVisitor=mk()),ss=sessionStorage.dpSession||(sessionStorage.dpSession=mk());
const meta=()=>({visitor_id:v,session_id:ss,page_path:location.pathname,referrer:document.referrer?new URL(document.referrer).hostname:"",device_type:matchMedia("(max-width:700px)").matches?"mobile":"desktop"});
fetch("/api/track",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(meta())}).catch(()=>{});
const launcher=document.createElement("button");launcher.id="dp-chat-launcher";launcher.type="button";launcher.setAttribute("aria-label","Open DP Travel assistant");launcher.textContent="✦";
const panel=document.createElement("section");panel.id="dp-chat-panel";panel.setAttribute("aria-label","DP Travel Assistant");
panel.innerHTML='<header class="dp-head"><div><strong>DP Travel Assistant</strong><small>Travel guidance, made simpler</small></div><button class="dp-close" type="button" aria-label="Close chat">×</button></header><div class="dp-log" aria-live="polite"><div class="dp-welcome">Hello! I can help you get started with travel, visa assistance, attestation and document verification.</div><div class="dp-quick"><button type="button">Visa assistance</button><button type="button">Attestation</button><button type="button">Track a document</button></div></div><form class="dp-form"><input maxlength="500" aria-label="Your question" placeholder="Type your question…" required><button type="submit">Send</button></form><div class="dp-note">Please do not share passport numbers or sensitive identity details.</div>';
document.body.append(launcher,panel);
const log=panel.querySelector(".dp-log"),form=panel.querySelector("form"),input=form.querySelector("input"),send=form.querySelector("button");
const add=(t,c)=>{const el=document.createElement("div");el.className="dp-msg "+c;el.textContent=t;log.append(el);log.scrollTop=log.scrollHeight};
const toggle=open=>{panel.classList.toggle("open",open);launcher.setAttribute("aria-expanded",String(open));if(open)input.focus()};
launcher.onclick=()=>toggle(!panel.classList.contains("open"));panel.querySelector(".dp-close").onclick=()=>toggle(false);
panel.querySelectorAll(".dp-quick button").forEach(btn=>btn.onclick=()=>{input.value=btn.textContent;form.requestSubmit()});
form.onsubmit=async e=>{e.preventDefault();const message=input.value.trim();if(!message)return;input.value="";add(message,"user");send.disabled=true;send.textContent="…";try{const r=await fetch("/api/chat",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({...meta(),message})}),d=await r.json();add(d.reply||"Please contact us at +91 93508 82057.","bot")}catch(_){add("Chat is temporarily unavailable. Please WhatsApp +91 93508 82057.","bot")}finally{send.disabled=false;send.textContent="Send";input.focus()}};
})();