import { useEffect, useState } from 'react'
import { Heart, MapPin, Plus, ImagePlus } from 'lucide-react'
import Layout from '../components/layout/Layout'
import timeline from '../content/timeline.json'

const dateLabel = date => new Intl.DateTimeFormat('he-IL', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(`${date}T12:00:00`))

export default function MemoryBook() {
  const [memories, setMemories] = useState([])
  const [open, setOpen] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [preview, setPreview] = useState(null)
  const [file, setFile] = useState(null)
  const [form, setForm] = useState({ date: new Date().toISOString().slice(0, 10), title: '', story: '', place: '' })

  const load = async () => {
    const response = await fetch('/api/memories')
    if (response.ok) setMemories(await response.json())
    else setError('לא הצלחנו לטעון את הזיכרונות. נסו לרענן את הדף.')
  }
  useEffect(() => { load() }, [])
  useEffect(() => () => { if (preview) URL.revokeObjectURL(preview) }, [preview])

  const save = async event => {
    event.preventDefault()
    setSaving(true)
    setError('')
    try {
      let media = null, media_type = null
      if (file) {
        const upload = await fetch('/api/uploads', { method: 'POST', headers: { 'Content-Type': file.type }, body: file })
        if (!upload.ok) throw new Error(upload.status === 413 ? 'הקובץ גדול מדי. אפשר להעלות עד 25MB.' : 'העלאת המדיה נכשלה.')
        ;({ url: media, type: media_type } = await upload.json())
      }
      const response = await fetch('/api/memories', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...form, media, media_type }) })
      if (!response.ok) throw new Error('שמירת הזיכרון נכשלה. בדקו את הפרטים ונסו שוב.')
      await load()
      setForm({ date: new Date().toISOString().slice(0, 10), title: '', story: '', place: '' })
      setFile(null)
      setPreview(null)
      setOpen(false)
    } catch (cause) { setError(cause.message) }
    finally { setSaving(false) }
  }

  const items = [...memories.map(item => ({ ...item, image: item.media, description: item.story, custom: true })), ...timeline].sort((a, b) => b.date.localeCompare(a.date))
  return <Layout>
    <div className="memory-book" dir="rtl">
      <section className="memory-hero">
        <span className="memory-eyebrow">FOR EVER & EVER BABE · THE STORY CONTINUES</span>
        <Heart className="memory-heart" fill="currentColor" size={30} />
        <h1>הסיפור שלנו<br /><em>עוד נכתב.</em></h1>
        <p>כל רגע קטן הופך לפרק. כאן שומרים את הרגעים שעוד נרצה לספר.</p>
        <button className="memory-primary" onClick={() => setOpen(value => !value)}><Plus size={19} /> {open ? 'סגירה' : 'להוסיף רגע משלנו'}</button>
      </section>

      {open && <section className="memory-editor" aria-label="זיכרון חדש">
        <div><span className="memory-eyebrow">פרק חדש בסיפור שלנו</span><h2>איזה רגע תרצי לשמור?</h2><p>תמונה, משפט קטן, תאריך — והוא כאן לתמיד.</p></div>
        <form onSubmit={save} className="memory-form">
          <label>שם הרגע<input required maxLength="120" value={form.title} onChange={event => setForm({ ...form, title: event.target.value })} placeholder="למשל, הפעם הראשונה ש..." /></label>
          <div className="memory-form-row"><label>מתי זה קרה?<input required type="date" value={form.date} onChange={event => setForm({ ...form, date: event.target.value })} /></label><label>איפה? <span>(לא חובה)</span><input maxLength="120" value={form.place} onChange={event => setForm({ ...form, place: event.target.value })} placeholder="בבית, בטיול, בדרך..." /></label></div>
          <label>הסיפור מאחורי הרגע<textarea required maxLength="4000" rows="5" value={form.story} onChange={event => setForm({ ...form, story: event.target.value })} placeholder="מה הרגשת? מה הצחיק אתכם? מה כדאי שלא נשכח?" /></label>
          <label className="memory-upload"><ImagePlus size={26} /><span>{file ? file.name : 'לבחור תמונה או סרטון'}</span><small>כולל תמונות iPhone וסרטון עד 25MB</small><input type="file" accept="image/jpeg,image/png,image/webp,image/heic,image/heif,video/mp4,video/webm" onChange={event => { const selected = event.target.files?.[0]; if (selected?.size > 25 * 1024 * 1024) { setError('הקובץ גדול מדי. אפשר להעלות עד 25MB.'); return } setFile(selected || null); setPreview(selected ? URL.createObjectURL(selected) : null); setError('') }} /></label>
          {preview && (file?.type.startsWith('video/') ? <video controls src={preview} className="memory-preview" /> : <img src={preview} alt="תצוגה מקדימה של הזיכרון" className="memory-preview" />)}
          {error && <p role="alert" className="memory-error">{error}</p>}
          <button disabled={saving} className="memory-primary" type="submit">{saving ? 'שומרים את הרגע...' : 'לשמור בספר שלנו'}</button>
        </form>
      </section>}
      {!open && error && <p role="alert" className="memory-error">{error}</p>}

      <section className="memory-timeline"><div className="memory-section-title"><span className="memory-eyebrow">הפרקים שלנו</span><h2>מההתחלה ועד הרגע הבא</h2><p>{items.length} רגעים שכדאי לזכור</p></div>
        <div className="memory-list">{items.map((item, index) => <article className="memory-card" key={item.id}>
          <div className="memory-number">{String(items.length - index).padStart(2, '0')}</div>
          <div className="memory-image">{item.image ? item.media_type?.startsWith('video/') ? <video controls preload="metadata" src={item.image} /> : <img loading="lazy" src={item.image} alt={item.title} /> : <div className="memory-image-empty"><Heart size={42} /></div>}</div>
          <div className="memory-copy"><span className="memory-eyebrow">{dateLabel(item.date)}</span><h3>{item.title}</h3>{item.place && <div className="memory-place"><MapPin size={15} />{item.place}</div>}<p>{item.description}</p><span className="memory-signature">{item.custom ? `נשמר על ידי ${item.created_by === 'ira' ? 'אירה' : 'גל'} ♥` : 'מתוך הסיפור שלנו ♥'}</span></div>
        </article>)}</div>
      </section>
    </div>
  </Layout>
}
