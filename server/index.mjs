import { createServer } from 'node:http'
import { DatabaseSync } from 'node:sqlite'
import { createHash, randomBytes, randomUUID, scryptSync, timingSafeEqual } from 'node:crypto'
import { mkdir, readFile, writeFile, stat } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const storage = process.env.MEMORY_DATA_DIR || path.join(root, 'private-data')
await mkdir(path.join(storage, 'uploads'), { recursive: true, mode: 0o700 })
const db = new DatabaseSync(path.join(storage, 'memories.sqlite'))
db.exec(`CREATE TABLE IF NOT EXISTS users (name TEXT PRIMARY KEY, salt TEXT NOT NULL, hash TEXT NOT NULL);
CREATE TABLE IF NOT EXISTS sessions (token_hash TEXT PRIMARY KEY, name TEXT NOT NULL, expires INTEGER NOT NULL);
CREATE TABLE IF NOT EXISTS memories (id TEXT PRIMARY KEY, date TEXT NOT NULL, title TEXT NOT NULL, story TEXT NOT NULL, place TEXT NOT NULL, media TEXT, media_type TEXT, created_by TEXT NOT NULL, created_at TEXT NOT NULL);`)
db.exec(`CREATE TABLE IF NOT EXISTS greetings (id TEXT PRIMARY KEY, full_name TEXT NOT NULL, email TEXT, content TEXT NOT NULL, post_id TEXT, status TEXT NOT NULL DEFAULT 'pending', created_at TEXT NOT NULL, approved_at TEXT, approved_by TEXT);`)

if (process.argv[2] === 'set-password') {
  const [name, password] = process.argv.slice(3)
  if (!['gal', 'ira'].includes(name) || !password || password.length < 16) throw new Error('Expected gal|ira and password of at least 16 characters')
  const salt = randomBytes(32).toString('hex')
  db.prepare('INSERT INTO users VALUES (?,?,?) ON CONFLICT(name) DO UPDATE SET salt=excluded.salt, hash=excluded.hash').run(name, salt, scryptSync(password, salt, 64).toString('hex'))
  db.prepare('DELETE FROM sessions WHERE name=?').run(name)
  process.exit(0)
}

const sha = value => createHash('sha256').update(value).digest('hex')
const respond = (res, status, data) => { res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' }); res.end(JSON.stringify(data)) }
const consume = async (req, limit) => { const chunks=[]; let total=0; for await (const chunk of req) { total+=chunk.length; if (total>limit) throw new Error('too_large'); chunks.push(chunk) } return Buffer.concat(chunks) }
const loginPage = `<!doctype html><html lang="he" dir="rtl"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>הסיפור שלנו ממשיך</title><style>body{margin:0;min-height:100vh;display:grid;place-items:center;background:linear-gradient(130deg,#321d30,#8b4556);font:18px system-ui;color:#512f3b}main{background:#fff8f0;border-radius:28px;padding:40px;max-width:380px;width:calc(100% - 64px);text-align:center;box-shadow:0 25px 80px #24101e66}h1{font:40px Georgia,serif}input,button{box-sizing:border-box;width:100%;font:inherit;padding:14px;margin:8px 0;border-radius:12px;border:1px solid #d6bdc4}button{background:#722f37;color:white;cursor:pointer}small{color:#775b65}</style><main><div style="font-size:48px">♥</div><h1>הסיפור שלנו ממשיך</h1><p>מקום פרטי לרגעים שלנו</p><form action="/api/login" method="post"><input name="name" placeholder="שם משתמש" autocomplete="username" required><input name="password" type="password" placeholder="סיסמה" autocomplete="current-password" required><button>להיכנס לספר הזיכרונות</button></form><small>For Ever & Ever Babe</small></main></html>`
const getSession = req => {
  const token = /(?:^|; )memory_session=([a-f0-9]{64})/.exec(req.headers.cookie || '')?.[1]
  return token && db.prepare('SELECT name FROM sessions WHERE token_hash=? AND expires>?').get(sha(token), Date.now())?.name
}
const loginAttempts = new Map()
const types = { '.html':'text/html; charset=utf-8', '.js':'text/javascript; charset=utf-8', '.css':'text/css; charset=utf-8', '.jpg':'image/jpeg', '.png':'image/png', '.webp':'image/webp', '.heic':'image/heic', '.heif':'image/heif', '.mp4':'video/mp4', '.webm':'video/webm', '.svg':'image/svg+xml', '.ico':'image/x-icon' }
const serve = async (res, filename) => { try { const bytes=await readFile(filename); res.writeHead(200, { 'Content-Type': types[path.extname(filename)] || 'application/octet-stream', 'Cache-Control':'private, max-age=3600', 'X-Content-Type-Options':'nosniff' }); res.end(bytes) } catch { respond(res, 404, { error:'not_found' }) } }

createServer(async (req, res) => {
  res.setHeader('X-Robots-Tag', 'noindex, nofollow')
  res.setHeader('X-Frame-Options', 'DENY')
  const url = new URL(req.url, 'http://localhost')
  try {
    if (!['GET', 'HEAD'].includes(req.method) && req.headers.origin && ![`https://${req.headers.host}`, `http://127.0.0.1:${process.env.PORT || 3897}`].includes(req.headers.origin)) return respond(res, 403, { error:'origin' })
    if (url.pathname === '/api/login' && req.method === 'POST') {
      const ip = req.socket.remoteAddress || 'unknown'
      const attempt = loginAttempts.get(ip) || { count: 0, until: Date.now() + 600000 }
      if (attempt.until < Date.now()) { attempt.count = 0; attempt.until = Date.now() + 600000 }
      if (attempt.count >= 8) return respond(res, 429, { error: 'try_later' })
      const form = new URLSearchParams((await consume(req, 2048)).toString())
      const name = form.get('name')?.trim().toLowerCase()
      const row = db.prepare('SELECT salt,hash FROM users WHERE name=?').get(name)
      const candidate = scryptSync(form.get('password') || '', row?.salt || 'invalid', 64)
      if (!row || !timingSafeEqual(candidate, Buffer.from(row.hash,'hex'))) { attempt.count++; loginAttempts.set(ip,attempt); res.writeHead(303, { Location:'/?login=failed' }); return res.end() }
      loginAttempts.delete(ip)
      const token = randomBytes(32).toString('hex')
      db.prepare('INSERT INTO sessions VALUES (?,?,?)').run(sha(token), name, Date.now()+30*86400000)
      res.writeHead(303, { Location:'/', 'Set-Cookie':`memory_session=${token}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=2592000` }); return res.end()
    }
    const name = getSession(req)
    if (!name) { if (url.pathname.startsWith('/api/')) return respond(res,401,{error:'login_required'}); res.writeHead(200, {'Content-Type':'text/html; charset=utf-8','Cache-Control':'no-store'}); return res.end(loginPage) }
    if (url.pathname === '/api/session') return respond(res,200,{name})
    if (url.pathname === '/api/logout' && req.method === 'POST') { const token=/(?:^|; )memory_session=([a-f0-9]{64})/.exec(req.headers.cookie || '')?.[1]; if (token) db.prepare('DELETE FROM sessions WHERE token_hash=?').run(sha(token)); res.writeHead(303,{Location:'/', 'Set-Cookie':'memory_session=; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=0'}); return res.end() }
    if (url.pathname === '/api/memories' && req.method === 'GET') return respond(res,200,db.prepare('SELECT * FROM memories ORDER BY date DESC, created_at DESC').all())
    if (url.pathname === '/api/greetings' && req.method === 'GET') return respond(res,200,db.prepare('SELECT * FROM greetings ORDER BY created_at DESC').all())
    if (url.pathname === '/api/greetings' && req.method === 'POST') {
      const { fullName, email='', message, postId=null } = JSON.parse((await consume(req,8192)).toString())
      if (!fullName?.trim() || fullName.length>120 || !message?.trim() || message.length>4000 || email.length>254) return respond(res,400,{error:'invalid_greeting'})
      const id=randomUUID(), created_at=new Date().toISOString()
      db.prepare('INSERT INTO greetings (id,full_name,email,content,post_id,status,created_at) VALUES (?,?,?,?,?,?,?)').run(id,fullName.trim(),email,message.trim(),postId,'pending',created_at)
      return respond(res,201,{id,full_name:fullName,email,content:message,post_id:postId,status:'pending',created_at})
    }
    if (url.pathname.startsWith('/api/greetings/') && ['PATCH','DELETE'].includes(req.method)) {
      if (name !== 'gal') return respond(res,403,{error:'admin_only'})
      const id=url.pathname.slice('/api/greetings/'.length)
      if (!/^[a-f0-9-]{36}$/.test(id)) return respond(res,404,{error:'not_found'})
      if (req.method==='DELETE') { db.prepare('DELETE FROM greetings WHERE id=?').run(id); return respond(res,200,{ok:true}) }
      const { status }=JSON.parse((await consume(req,1024)).toString())
      if (!['approved','rejected'].includes(status)) return respond(res,400,{error:'invalid_status'})
      db.prepare('UPDATE greetings SET status=?, approved_at=?, approved_by=? WHERE id=?').run(status,new Date().toISOString(),name,id)
      return respond(res,200,db.prepare('SELECT * FROM greetings WHERE id=?').get(id))
    }
    if (url.pathname === '/api/memories' && req.method === 'POST') {
      const { date, title, story, place='', media=null, media_type=null } = JSON.parse((await consume(req,8192)).toString())
      if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || Number.isNaN(Date.parse(`${date}T00:00:00Z`)) || !title?.trim() || title.length>120 || !story?.trim() || story.length>4000 || typeof place!=='string' || place.length>120 || (media && !/^\/uploads\/[a-f0-9-]{36}\.(jpg|png|webp|heic|heif|mp4|webm)$/.test(media))) return respond(res,400,{error:'invalid_memory'})
      const id=randomUUID()
      db.prepare('INSERT INTO memories VALUES (?,?,?,?,?,?,?,?,?)').run(id,date,title.trim(),story.trim(),place.trim(),media,media_type,name,new Date().toISOString())
      return respond(res,201,{id})
    }
    if (url.pathname === '/api/uploads' && req.method === 'POST') {
      const type=req.headers['content-type']?.split(';')[0]
      const ext={'image/jpeg':'jpg','image/png':'png','image/webp':'webp','image/heic':'heic','image/heif':'heif','video/mp4':'mp4','video/webm':'webm'}[type]
      if (!ext) return respond(res,415,{error:'unsupported_media'})
      const bytes=await consume(req,25*1024*1024), signature=bytes.subarray(0,16)
      const valid=type==='image/jpeg' ? signature[0]===255&&signature[1]===216 : type==='image/png' ? signature.subarray(0,8).equals(Buffer.from('89504e470d0a1a0a','hex')) : type==='image/webp' ? signature.toString('ascii',0,4)==='RIFF'&&signature.toString('ascii',8,12)==='WEBP' : type==='image/heic'||type==='image/heif' ? signature.toString('ascii',4,8)==='ftyp'&&['heic','heix','mif1','heif'].includes(signature.toString('ascii',8,12)) : type==='video/mp4' ? signature.toString('ascii',4,8)==='ftyp' : signature.subarray(0,4).equals(Buffer.from('1a45dfa3','hex'))
      if (!valid) return respond(res,415,{error:'invalid_media'})
      const filename=`${randomUUID()}.${ext}`
      await writeFile(path.join(storage,'uploads',filename),bytes,{flag:'wx',mode:0o600})
      return respond(res,201,{url:`/uploads/${filename}`,type})
    }
    if (url.pathname.startsWith('/uploads/')) { if (!/^\/uploads\/[a-f0-9-]{36}\.(jpg|png|webp|heic|heif|mp4|webm)$/.test(url.pathname)) return respond(res,404,{error:'not_found'}); return serve(res,path.join(storage,url.pathname.slice(1))) }
    if (url.pathname.startsWith('/api/')) return respond(res,404,{error:'not_found'})
    if (!['GET','HEAD'].includes(req.method)) return respond(res,405,{error:'method'})
    const base=path.join(root,'dist'), filename=path.resolve(base,'.'+url.pathname)
    if (!filename.startsWith(base+path.sep) && filename!==base) return respond(res,404,{error:'not_found'})
    const info=await stat(filename).catch(()=>null)
    return serve(res,info?.isFile()?filename:path.join(base,'index.html'))
  } catch (error) { return respond(res,error.message==='too_large'?413:400,{error:error.message==='too_large'?'too_large':'invalid_request'}) }
}).listen(Number(process.env.PORT || 3897),'127.0.0.1')
