# 🎂 Happy 29 – Ira

אתר יום הולדת מיוחד ומרגש שנבנה באהבה ליום ההולדת ה-29 של אירה ❤️

## forever&everbabe

---

## 📋 תיאור הפרויקט

אתר אינטימי ורומנטי בעברית (RTL) הכולל:
- 🏠 דף בית Hero מרשים
- 📖 הסיפור שלנו - המסע המשותף
- 📚 סיפורים שלנו - זכרונות מיוחדים
- 💌 ספר ברכות עם מודרציה
- ⏰ ציר זמן של הרגעים החשובים
- 🖼️ גלריית תמונות מפוארת
- 🎵 פלייליסט עם השירים שלנו
- 🔐 מערכת אימות מובנית
- 👑 לוח ניהול למנהל

---

## 🚀 התחלה מהירה

### 1. התקנת חבילות

```bash
npm install
```

### 2. הגדרת משתני סביבה

הקובץ `.env` כבר קיים עם ערכים דמו. **עדכנו את הסיסמאות!**

```env
VITE_ADMIN_USERNAME=gal-admin
VITE_ADMIN_PASSWORD=סיסמה-חזקה-כאן
VITE_IRA_USERNAME=ira
VITE_IRA_PASSWORD=סיסמה-של-אירה
VITE_GUEST_USERNAME=family
VITE_GUEST_PASSWORD=סיסמה-לאורחים
```

### 3. הרצה בסביבת פיתוח

```bash
npm run dev
```

האתר יפתח בכתובת: `http://localhost:5173`

---

## 🎨 עיצוב ופלטת צבעים

האתר בנוי בסגנון רומנטי-קולנועי עם פלטת צבעים חמה:
- **Burgundy** (#8B4556) - צבע עיקרי
- **Rose/Blush** (#FFE5E5, #FFB6C1) - גוונים עדינים
- **Gold** (#D4AF37, #B89968) - מבטאים
- **Cream** (#FFF8F0) - רקע

---

## 📁 מבנה הפרויקט

```
src/
├── components/         # כל הקומפוננטות
│   ├── auth/          # אימות והגנות
│   ├── layout/        # Header, Footer, Layout
│   ├── ui/            # UI components בסיסיים
│   ├── common/        # LockedCard, LoadingSpinner
│   ├── stories/       # קומפוננטות סיפורים
│   ├── guestbook/     # ספר ברכות
│   ├── timeline/      # ציר זמן
│   ├── gallery/       # גלריה
│   ├── playlist/      # פלייליסט
│   └── admin/         # לוח ניהול
├── pages/             # כל הדפים
├── state/             # Zustand stores
├── lib/               # Utilities (auth, time, validators, content)
├── content/           # קבצי JSON עם תוכן
│   ├── content.json   # תוכן מרכזי
│   ├── timeline.json  # ציר זמן
│   ├── gallery.json   # גלריה
│   └── playlist.json  # פלייליסט
└── styles/            # CSS גלובלי
```

---

## 📝 עריכת תוכן

### סיפורים והתוכן המרכזי

ערכו את `src/content/content.json`:
- **branding.tagline** - המוטו שלכם
- **hero** - דף הבית
- **story** - הסיפור שלכם (intro, house_rules, gratitude, habits)
- **stories** - סיפורים ספציפיים

### תמונות

1. הוסיפו תמונות ל-`public/media/`
2. עדכנו את הנתיבים ב-`content.json` וב-`gallery.json`
3. תמונת Hero: `public/media/hero_gal_kids.jpg`

### ציר הזמן

ערכו את `src/content/timeline.json`:
- הוסיפו/הסירו אירועים
- עדכנו תאריכים וטקסטים

### גלריה

ערכו את `src/content/gallery.json`:
- הוסיפו נתיבי תמונות
- הגדירו tags לסינון
- תמיכה ב-tags: "אנחנו", "פלא", "מיראל", "יום-יום"

### פלייליסט

ערכו את `src/content/playlist.json`:
- הוסיפו שירים עם YouTube ID
- עדכנו תיאורים

---

## 🔐 מערכת האימות

האתר כולל 3 רולים:
- **Admin** - גישה מלאה + מודרציה
- **Ira** - גישה לכל התוכן
- **Guest** - גישה רגילה

### כניסה:
נתבו ל-`/login` והזינו פרטים מה-`.env`

---

## 💌 ספר ברכות

- אורחים יכולים להשאיר ברכות עם תמונה/וידאו
- ברכות נשמרות ב-LocalStorage (MVP)
- רק Admin יכול לאשר/לדחות
- רק ברכות מאושרות יופיעו באתר

---

## 🚢 פרסום ל-Vercel

### שלב 1: דחיפה ל-Git

```bash
git init
git add .
git commit -m "Initial commit - Happy 29 Ira site"
git branch -M main
git remote add origin <your-repo-url>
git push -u origin main
```

### שלב 2: חיבור Vercel

1. היכנסו ל-[Vercel](https://vercel.com)
2. "Import Project" ← בחרו את הריפוזיטורי
3. Vite יזוהה אוטומטית
4. הוסיפו משתני ENV:
   - VITE_ADMIN_USERNAME
   - VITE_ADMIN_PASSWORD
   - VITE_IRA_USERNAME
   - VITE_IRA_PASSWORD
   - VITE_GUEST_USERNAME
   - VITE_GUEST_PASSWORD
   - VITE_MAX_UPLOAD_MB
   - VITE_ALLOWED_MIME

### שלב 3: Deploy!

לחצו Deploy וזהו! 🎉

---

## 🛠️ טכנולוגיות

- **React 18** - ספרייה מרכזית
- **Vite** - Build tool מהיר
- **React Router v6** - ניווט
- **Zustand** - State management
- **TailwindCSS** - עיצוב
- **Framer Motion** - אנימציות
- **dayjs** - ניהול זמנים
- **Zod** - ולידציה
- **react-hot-toast** - התראות
- **Lucide React** - אייקונים

---

## 📦 שדרוגים עתידיים אפשריים

- **Supabase** - Authentication + Storage + Database אמיתי
- **העלאות קבצים** - שמירה בענן (לא LocalStorage)
- **עריכת תוכן** - ממשק Admin מלא
- **שיתוף** - אפשרות שיתוף בסושיאל

---

## ❤️ נבנה באהבה

פרויקט זה נבנה במיוחד ליום ההולדת ה-29 של אירה.

**forever&everbabe** 💕

---

## 🐛 תיקון בעיות

### האתר לא עולה?
```bash
npm install
npm run dev
```

### שגיאת import של content.json?
ודאו שהקובץ בנתיב הנכון: `src/content/content.json`

### Tailwind לא עובד?
```bash
npm install -D tailwindcss postcss autoprefixer
```

### תמונות לא נטענות?
ודאו שהן בתוך `public/media/` והנתיב בהתאם

---

**יום הולדת שמח אירה! 🎂✨**

