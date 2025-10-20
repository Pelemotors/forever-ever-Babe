מעולה. הנה **PRD מלא ומקיף מהתחלה**—מותאם ל-**React + Vite** (לא Next), כולל כל מה שננעל עד עכשיו + מפת תכנים ברורה.

כשתאשר—תוכל להדביק את כל ה־PRD לפקודה בקורסור (הוראות בסוף), ואז נעבור למשימות עם TaskMaster.

---

# PRD — Happy 29 – Ira (React + Vite)

## תקציר מנהלים

אתר־יומולדת בעברית (RTL), אינטימי, רומנטי ומצחיק עבור אירָה (29). האתר נפתח במסך התחברות עם 3 רולים (admin/ira/guests), ומציג: דף בית (Hero), “הסיפור שלנו”, “סיפורים שלנו”, ספר ברכות עם מדיה ומודרציה, ציר־זמן, גלריה, ועמוד פלייליסט עם Desert Rose. התוכן מנוהל מקבצי JSON (MVP), עם מסלול שדרוג ל-Supabase (DB+Storage) במקרה שנרצה שיתוף ברכות אמיתי ושמירת קבצים.

---

## מטרות

* ליצור חוויה מרגשת ואישית שמרגישה “שלנו”, לא שיווקית.
* לאגד סיפורים, בדיחות פנימיות, ותוכן מאושר מכל המשפחה והחברים.
* לאפשר “נעילה עד תאריך” לתכנים מסוימים (blur + ספירה לאחור).
* להישאר פשוטים טכנית (MVP), עם מסלול שדרוג ברור.

---

## תחום (Scope)

כלול ב-MVP:

* אימות בסיסי לפי רולים (בצד לקוח; ENV): admin / ira / guests.
* דפי תוכן: Home, Story, Stories(+StoryView), Guestbook, Timeline, Gallery, Playlist, Admin, Login.
* ניהול תוכן מ־JSON תחת `src/content`.
* ספר ברכות עם מודרציה דמו (persist בזיכרון/LocalStorage לפיתוח).
* עיצוב RTL, רספונסיבי, טיפוגרפיה עברית, “רומנטי + קולנועי לילי (Desert Rose)”.
* מיתוג tagline: `forever&everbabe`.

לא כלול ב-MVP (אבל מתוכנן לשדרוג):

* Supabase Auth + Storage + DB אמיתי.
* העלאות קבצים אמיתיות (ב-MVP נשתמש בדמו/LocalStorage).
* עריכת תוכן מתוך Admin (ב-MVP קריאה בלבד ל־content.json).

---

## רולים והרשאות

* **admin (אתה)**: כניסה ייעודית; אישור/דחיית ברכות; צפייה ב-pending; תצוגת סטטוסים; תצוגת תכנים נעולים; (MVP: ללא כתיבה חזרה לקבצים).
* **ira (אירָה)**: צפייה בתוכן מאושר; העלאת ברכה; אין מודרציה; אינה רואה נעולים לפני תאריך.
* **guests (אורחים)**: צפייה בתוכן מאושר; השארת ברכה (pending); אין גישה ל־Admin.

---

## תסריטי שימוש מרכזיים

* כאורח, אני מתחבר בעמוד /login עם פרטי Guests ורואה את האתר; אני יכול להשאיר ברכה עם תמונה/וידאו קצר (דמו), והיא תופיע אחרי אישור Admin.
* כאירָה, אני רואה את כל האזורים המאושרים, קוראת סיפורים, מטיילת בגלריה, מאזינה ל־Desert Rose, ומשאירה ברכה משלי.
* כ-admin, אני מאשר/דוחה ברכות בלוח Admin; אני רואה תכנים נעולים (לבדיקה/בקרה).
* כמשתמש, אני רואה תוכן “נעול עד תאריך” ככרטיס מטושטש עם ספירה לאחור.

---

## ארכיטקטורה וטכנולוגיות

* **React 18 + Vite + TypeScript**
* **React Router v6**
* **TailwindCSS** (RTL מלא)
* **Zustand**: session state (role, user), תוכן טעון.
* **dayjs**: תאריכים/ספירות לאחור.
* **Zod**: ולידציה לטפסים.
* (שדרוג אפשרי) **Supabase**: Auth + Storage + DB.

מבנה תיקיות:

```
src/
  main.tsx, App.tsx, router.tsx
  components/
    auth/LoginForm.tsx
    layout/Header.tsx, Footer.tsx
    ui/{Card, Button, Badge, Modal, Toast}.tsx
    common/LockedCard.tsx
    stories/{StoryCard}.tsx
    guestbook/{GreetingForm, GreetingList}.tsx
    timeline/TimelineItem.tsx
    gallery/{GalleryGrid, FilterBar}.tsx
  pages/
    Home.tsx
    Story.tsx
    Stories.tsx
    StoryView.tsx
    Guestbook.tsx
    Timeline.tsx
    Gallery.tsx
    Playlist.tsx
    Admin.tsx
    Login.tsx
  state/
    useSession.ts
    useContent.ts
  content/
    content.json       ← טקסטים מרכזיים שאושרו
  lib/
    auth.ts            ← אימות ENV (MVP)
    time.ts            ← dayjs utils
    validators.ts      ← סכמות zod
  styles/
    index.css          ← Tailwind + RTL
public/
  media/hero_gal_kids.jpg
```

---

## מידע/דאטה — JSON Schemas (MVP)

### content.json (קובץ יחיד מרוכז)

```ts
type Content = {
  branding: { tagline: string };
  hero: { title: string; subtitle: string; cta: string; image: string; image_alt: string };
  story: {
    title: string;
    intro: string[];          // פסקאות פתיח שלך
    house_rules: string[];    // כללים לבית
    gratitude: string[];      // "מודה עלייך"
    habits: string[];         // "הרגלים של אנחנו"
    playlist: { blurb: string };
  };
  stories: {
    id: string;
    title: string;
    status: "public" | "private" | null | "unlockAt";
    unlockAt?: string | null; // ISO
    body: string[];           // פסקאות
  }[];
}
```

### greetings (ב־state דמו)

```ts
type Greeting = {
  id: string;
  fromName: string;
  message: string;
  mediaUrl?: string;
  status: "pending" | "approved" | "rejected";
  createdAt: string; // ISO
}
```

### timeline.json / gallery.json (אם נוסיף בהמשך)

* Timeline item: `{ date:string, title:string, text:string, mediaId?:string, aiGenerate?:boolean }`
* Gallery item: `{ url:string, alt:string, tags:string[] }`

---

## אימות (MVP)

* טופס /login שולף שלישיית ENV דרך Vite:

  * `ADMIN_USERNAME` / `ADMIN_PASSWORD`
  * `IRA_USERNAME` / `IRA_PASSWORD`
  * `GUEST_USERNAME` / `GUEST_PASSWORD`
* בדיקה בצד הלקוח בלבד (מספיק לאתר פרטי/משפחתי).
* שמירת session ב־localStorage: `{ role, username, ts }`.
* **שדרוג מומלץ**: Supabase Auth (RLS) כשנרצה אבטחה אמיתית.

---

## ניווט (Routes) ותכולה

### `/login`

* טופס 2 שדות + CTA.
* hint קטן: `forever&everbabe`.
* שגיאה: “שם משתמש או סיסמה שגויים”.

### `/` (Home)

* Hero: כותרת, תת־כותרת, CTA, תמונה (שלך עם הילדים).
* Badge tagline עדין: `forever&everbabe`.

### `/story`

* “הסיפור שלנו” (הפתיח שלך **מילה במילה**).
* “כללים לבית” (2 כללים שנעלו).
* “מודה עלייך” (4 שורות שנעלו).
* בלוק “הרגלים של אנחנו” (רשימה שנעלו).
* טקסט פלייליסט: Desert Rose (blurb).

### `/stories`

* גריד כרטיסיות קצרות.
* `/stories/:id` — עמוד מלא לסיפור.
* סטטוסים: public / unlockAt (נעול עד תאריך) / private (מוסתר).
* **קיים**: “החופשה הראשונה (גרמניה)”; “טוסטים וסלט”.

### `/guestbook`

* טופס: fromName (חופשי), message (1–500), media אופציונלי (image/video).
* ולידציה zod, מגבלת גודל `MAX_UPLOAD_MB`, `ALLOWED_MIME`.
* לאחר שליחה: toast “התקבל! יופיע אחרי אישור”.
* רשימת ברכות במצב `approved` בלבד.

### `/timeline`

* מציג תחנות (כשיימלא).
* תמונות חסרות → אפשר לציין `aiGenerate:true` כתזכורת לעתיד.

### `/gallery`

* Grid רספונסיבי, מסננים (אנחנו / פלא / מיראל / יום־יום).

### `/playlist`

* טקסט קצר + Embed Desert Rose.
* אפשר להוסיף “mini-player” דביק (לא חובה).

### `/admin`

* טבלת ברכות לפי סטטוס (pending/approved/rejected).
* פעולות: Approve / Reject (דמו, בזיכרון).
* צפייה בתוכן נעול (לבדיקה).
* (Plus — לא ב-MVP): שינוי טקסטים/ניהול משתמשים.

---

## UI/UX

* RTL מלא, Heebo/Rubik (עברית), גדלי פונטים קריאים.
* סגנון: “רומנטי + קולנועי לילי (Desert Rose)”: קרמים/ורדרד עדין/בורדו־זהב מושתק, וינייטה קלה.
* כרטיסיות רכות (rounded-2xl), צל עדין, מרווח נדיב.
* אנימציות fade/slide עדינות (150–250ms).
* LockedCard: blur + ספירה לאחור.
* Toast מוצלח אחרי שליחה.

נגישות:

* alt לתמונות; פוקוס־סטייטים; ניגודיות תקינה; כפתור “חזרה למעלה”.

---

## תכנים שננעלו (Mapping → UI)

### Hero

* כותרת: “הבית שלנו מתחיל בך”
* תת־כותרת (3 שורות):
  “התחלנו כחברים, ומצאנו את הדרך להיות בית.
  פלא, מיראל, והרבה רגעים קטנים שמחזיקים אותנו.
  זה המקום שבחרנו להגיד תודה ולהזכיר לך: את המרכז שלנו.”
* CTA: “נכנסים לחגוג”
* תמונה: `/media/hero_gal_kids.jpg`
* alt: “גל עם פלא ומיראל מחובקים, רגע משפחתי בבית”
* tagline: `forever&everbabe`

### Story (עמוד)

* פתיח — **מילה במילה** (כל הפסקאות ששלחת).
* **House Rules**

  1. “לא לתקשר — אבל באמת זה: פחות לדבר, יותר להקשיב לשני.”
  2. “לחזור עם חלב הביתה שומר על שלום בית”
* **Gratitude (“מודה עלייך”)**

  1. “תודה על הקפה שטעים רק אם הוא איתך, ועל החיוך כשלא קל.”
  2. “תודה על פלא—איך שאת מגדלת אותו איתי, באמת, גם ברגעים הקשים.”
  3. “תודה על מיראל—על המנוע החדש של אושר ומתיקות בבית.”
  4. “ותודה על מי שאת—המרכז שלנו.”
* **Habits (“הרגלים של אנחנו”)**

  * “טוסטים וסלט בערב= ערב רומנטי’.”
  * “קפה טעים רק כשאת לידי.”
  * “לארוחות שחיתות יש חוקים: מגזימים ביחד, מתחרטים ביחד, צוחקים ביחד.”
  * “לחזור עם חלב הביתה מהעבודה = אהבת אמת ונאמנות.”
  * “נסיעה בלילה עם Desert Rose שווה יותר מכל תוכנית.”
  * “אם אני אומר “קראתי במאמר…”, את יודעת שאני מנסה לגנוב משהו—וצוחקת.”
  * “כשאין מילים, יש חיבוק.”
* **Playlist blurb**:
  “יש שירים שהם זמן. Desert Rose הוא שלנו—לילה רגוע, כביש פתוח, ושקט שמבין אותנו.”

### Stories (עמוד + פריטים)

* **“החופשה הראשונה (גרמניה)”** — גוף הטקסט שלך, מילה במילה. (status: `public`)
* **“טוסטים וסלט”** — גוף הטקסט שלך, מילה במילה. (status: `public`)

*(נוכל להוסיף “קפה (שאני בכלל שונא)”, “ג’אנק עד שמתפוצצים” כשתשלח/תאשר טקסטים.)*

---

## קבצי תוכן (MVP)

* `src/content/content.json` — **הקובץ המרוכז** שכבר בניתי לך (כולל הכל שננעל).
  *(אם תרצה, אפשר לפצל בהמשך לקבצים נפרדים stories.json/timeline.json).*

---

## .env (Vite) — placeholders

```
VITE_APP_NAME="Happy 29 – Ira"
VITE_BASE_URL=<https://your-vercel-domain.vercel.app או http://localhost:5173>

# Auth (MVP – client side)
ADMIN_USERNAME=<gal-admin>
ADMIN_PASSWORD=<סיסמה חזקה>
IRA_USERNAME=<ira>
IRA_PASSWORD=<סיסמה של אירה>
GUEST_USERNAME=<family>
GUEST_PASSWORD=<סיסמה משותפת>

# Uploads (client validation only)
MAX_UPLOAD_MB=20
ALLOWED_MIME=image/jpeg,image/png,video/mp4

# (Optional) Supabase
VITE_SUPABASE_URL=<אם נרצה שדרוג>
VITE_SUPABASE_ANON_KEY=<אם נרצה שדרוג>
```

---

## קריטריוני קבלה (DoD)

* /login פועל; שלושה רולים מזוהים; ניתוב חסום ללא התחברות.
* / מציג Hero לפי content.json, כולל תמונה.
* /story מציג את כל הבלוקים (intro/house_rules/gratitude/habits/playlist blurb).
* /stories מציג כרטיסיות; /stories/:id מציג סיפור מלא.
* /guestbook: אפשר להוסיף ברכה; admin מאשר/דוחה; רק approved מוצגים.
* LockedCard עובד (לסיפורים עתידיים עם unlockAt).
* RTL מלא; מובייל תקין; נגישות בסיסית.
* פריסה ל-Vercel עם ENV מולאו.

---

## סיכונים והפחתה

* **אימות בלקוח**: רגיש. הפחתה: אתר פרטי בלבד; לשדרוג—Supabase Auth.
* **העלאות דמו**: לא שומר אמיתי. הפחתה: לעבור ל־Storage בהמשך אם צריך.
* **ניהול תוכן ידני**: לעבור ל־Admin כתיבה בהמשך.

---

## Milestones (הצעה קצרה)

1. שלד פרויקט + Router + Login + Session.
2. Home + Story (טעינת content.json).
3. Stories + StoryView + LockedCard.
4. Guestbook (דמו) + Admin (מודרציה).
5. Playlist + Gallery + Timeline (סטטי).
6. Polish + Deploy ל־Vercel.

---

# הקובץ content.json (מרוכז, עדכני)

> זהו בדיוק הקובץ המאוחד עם כל מה שננעלנו עליו (כבר נתתי לך גרסה בתגובה קודמת). אם תרצה, אשגר שוב כאן 1:1.

---

## איך להריץ בקורסור

הדבק את ה־PRD הזה בפקודת יצירת PRD:

```
@create-prd.md
[הדבק כאן את כל ה־PRD מהכותרת: "PRD — Happy 29 – Ira (React + Vite)" ועד הסוף]
```

אחרי שנוצר PRD:

```
npx task-master parse-prd ".taskmaster/docs/prd.txt"
npx task-master list --tag master --with-subtasks
```
