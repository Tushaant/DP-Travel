const crypto = require("crypto");
const { neon } = require("@neondatabase/serverless");
const databaseUrl = process.env.DATABASE_URL;
let client;
function sql() { if (!databaseUrl) throw new Error("DATABASE_URL is not configured"); if (!client) client = neon(databaseUrl); return client; }
function json(res, status, data) { res.statusCode=status; res.setHeader("Content-Type","application/json; charset=utf-8"); res.setHeader("Cache-Control","no-store"); res.end(JSON.stringify(data)); }
function ready() { return Boolean(databaseUrl); }
async function writeVisit(x) { return sql()`INSERT INTO dp_page_visits (visitor_id,session_id,page_path,referrer,device_type) VALUES (${x.visitor_id},${x.session_id},${x.page_path},${x.referrer},${x.device_type})`; }
async function writeMessage(x) { return sql()`INSERT INTO dp_chat_messages (visitor_id,session_id,page_path,role,message) VALUES (${x.visitor_id},${x.session_id},${x.page_path},${x.role},${x.message})`; }
function token() { const p=Buffer.from(JSON.stringify({exp:Date.now()+28800000})).toString("base64url"); return p+"."+crypto.createHmac("sha256",process.env.ADMIN_SESSION_SECRET).update(p).digest("base64url"); }
function auth(req) { const secret=process.env.ADMIN_SESSION_SECRET; if(!secret)return false; const c=(req.headers.cookie||"").split(";").map(x=>x.trim()).find(x=>x.startsWith("dp_admin=")); if(!c)return false; const a=decodeURIComponent(c.slice(9)).split("."); if(a.length!==2)return false; const e=crypto.createHmac("sha256",secret).update(a[0]).digest(); let g; try{g=Buffer.from(a[1],"base64url")}catch(_){return false} if(g.length!==e.length||!crypto.timingSafeEqual(g,e))return false; try{return JSON.parse(Buffer.from(a[0],"base64url").toString()).exp>Date.now()}catch(_){return false} }
function passwordMatches(input) { const a=Buffer.from(String(process.env.ADMIN_PASSWORD||"")),b=Buffer.from(String(input||"")); return a.length>0&&a.length===b.length&&crypto.timingSafeEqual(a,b); }
module.exports={json,ready,sql,writeVisit,writeMessage,token,auth,passwordMatches};
