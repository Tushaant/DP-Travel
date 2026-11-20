const {json,ready,sql,auth}=require("./_lib");
const day=(v)=>/^\d{4}-\d{2}-\d{2}$/.test(String(v||""))?String(v):null;
module.exports=async(req,res)=>{
 if(req.method!=="GET")return json(res,405,{error:"Method not allowed"});
 if(!auth(req))return json(res,401,{error:"Please sign in"});
 if(!ready())return json(res,503,{error:"Database is not connected. Add DATABASE_URL in Vercel."});
 try{
  const db=sql(),now=new Date(),to=day(req.query?.to)||now.toISOString().slice(0,10);
  const from=day(req.query?.from)||new Date(now.getTime()-29*86400000).toISOString().slice(0,10);
  const start=from+"T00:00:00.000Z",end=new Date(new Date(to+"T00:00:00.000Z").getTime()+86400000).toISOString();
  const [s,d,t,p,m,c,l,u]=await Promise.all([
   db`SELECT COUNT(*)::int visits,COUNT(DISTINCT visitor_id)::int unique_visitors,COUNT(DISTINCT session_id)::int sessions FROM dp_page_visits WHERE created_at>=${start}::timestamptz AND created_at<${end}::timestamptz`,
   db`SELECT TO_CHAR(created_at AT TIME ZONE 'UTC','YYYY-MM-DD') AS visit_day,COUNT(*)::int count FROM dp_page_visits WHERE created_at>=${start}::timestamptz AND created_at<${end}::timestamptz GROUP BY visit_day ORDER BY visit_day`,
   db`SELECT CASE WHEN message~*'(attest|apostille|mea|mofa|embassy|hrd)' THEN 'Attestation' WHEN message~*'(dataflow|wes|icas|nnas|verification)' THEN 'Verification' WHEN message~*'(track|status|reference)' THEN 'Document tracking' WHEN message~*'(visa|travel|tour|flight|hotel)' THEN 'Travel & visa' ELSE 'Other' END topic,COUNT(*)::int count FROM dp_chat_messages WHERE role='user' AND created_at>=${start}::timestamptz AND created_at<${end}::timestamptz GROUP BY topic ORDER BY count DESC`,
   db`SELECT page_path,COUNT(*)::int count FROM dp_page_visits WHERE created_at>=${start}::timestamptz AND created_at<${end}::timestamptz GROUP BY page_path ORDER BY count DESC LIMIT 8`,
   db`SELECT id,visitor_id,session_id,page_path,role,message,created_at FROM dp_chat_messages WHERE created_at>=${start}::timestamptz AND created_at<${end}::timestamptz ORDER BY created_at DESC LIMIT 300`,
   db`SELECT COUNT(*)::int count FROM dp_chat_messages WHERE role='user' AND created_at>=${start}::timestamptz AND created_at<${end}::timestamptz`,
   db`SELECT COUNT(*)::int count,COUNT(DISTINCT visitor_id)::int visitors FROM dp_enquiries WHERE created_at>=${start}::timestamptz AND created_at<${end}::timestamptz`,
   db`SELECT COUNT(*)::int count FROM dp_chat_messages u WHERE u.role='user' AND u.created_at>=${start}::timestamptz AND u.created_at<${end}::timestamptz AND NOT EXISTS (SELECT 1 FROM dp_chat_messages a WHERE a.session_id=u.session_id AND a.role='assistant' AND a.created_at>u.created_at)`
  ]);
  const leads=await db`SELECT id,name,phone,destination,service,source,created_at,status FROM dp_enquiries WHERE created_at>=${start}::timestamptz AND created_at<${end}::timestamptz ORDER BY created_at DESC LIMIT 300`;
  const conversion=s[0].unique_visitors?Number((l[0].visitors/s[0].unique_visitors*100).toFixed(1)):0;
  return json(res,200,{range:{from,to},stats:{...s[0],chat_queries:c[0].count,leads:l[0].count,conversion,unanswered:u[0].count},daily:d.map(x=>[x.visit_day,x.count]),topics:t.map(x=>[x.topic,x.count]),top_pages:p.map(x=>[x.page_path,x.count]),messages:m,leads});
 }catch(e){console.error("admin-data",e);return json(res,500,{error:"Unable to load analytics"})}
};