-- הוספת עמודת media_url לטבלת greetings (אם עדיין לא קיימת)
ALTER TABLE greetings 
ADD COLUMN IF NOT EXISTS media_url TEXT;

-- הצמדת תמונה לברכה של טטיאנה
UPDATE greetings 
SET media_url = '/media/tatiana bless.jpg'
WHERE id = '8c28bf22-5df7-48b2-a4c4-ded0b9a21e3b';

-- בדיקה שהעדכון הצליח
SELECT id, full_name, content, media_url, status 
FROM greetings 
WHERE id = '8c28bf22-5df7-48b2-a4c4-ded0b9a21e3b';
