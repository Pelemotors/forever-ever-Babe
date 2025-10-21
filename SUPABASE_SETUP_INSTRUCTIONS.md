# הוראות הגדרת Supabase

## שלב 1: הרצת SQL
1. היכנס ל-Supabase Dashboard
2. לך ל-SQL Editor
3. העתק והדבק את התוכן של `supabase_setup.sql`
4. לחץ על "Run"

## שלב 2: הגדרת Storage Bucket
1. לך ל-Storage ב-Supabase Dashboard
2. לחץ על "New bucket"
3. שם: `uploads`
4. סמן "Public bucket"
5. File size limit: `50MB`
6. Allowed MIME types: `image/*,video/*`
7. לחץ על "Create bucket"

## שלב 3: הגדרת אימיילי אדמין
✅ **אוטומטי!** הקוד כבר מוגדר לזהות `gal@admin.com` כאדמין.

אם תרצה להוסיף עוד אדמינים, עדכן את הפונקציה `is_admin()` ב-SQL:
```sql
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN auth.jwt() ->> 'email' IN ('gal@admin.com', 'ira@example.com');
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

## שלב 4: בדיקת ההגדרות
1. לך ל-Table Editor
2. וודא שיש לך 2 טבלאות: `greetings` ו-`media`
3. לך ל-Storage
4. וודא שיש bucket בשם `uploads`

## מבנה הנתונים

### טבלת greetings:
- `id` - מזהה ייחודי
- `full_name` - שם מלא (חובה)
- `email` - אימייל (אופציונלי)
- `content` - תוכן הברכה (חובה)
- `post_id` - מזהה פוסט (אופציונלי)
- `status` - סטטוס: pending/approved/rejected
- `created_at` - תאריך יצירה
- `approved_at` - תאריך אישור
- `approved_by` - מי אישר

### טבלת media:
- `id` - מזהה ייחודי
- `greeting_id` - קישור לברכה
- `file_path` - נתיב הקובץ ב-Storage
- `file_name` - שם הקובץ המקורי
- `file_size` - גודל הקובץ
- `mime_type` - סוג הקובץ
- `uploaded_by` - מי העלה
- `created_at` - תאריך העלאה

## הרשאות:
- **אורחים**: יכולים ליצור ברכות, לא יכולים לראות ברכות אחרות
- **אדמין**: יכול לראות הכל, לאשר/לדחות/למחוק, להעלות מדיה
- **מדיה**: כולם יכולים לראות, רק אדמין יכול להעלות/למחוק
