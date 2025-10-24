-- הצמדת תמונה לברכה של הילה בסון
-- עדכון הברכה עם קישור לתמונה

UPDATE greetings 
SET media_url = '/media/HILA GREETING.jpg'
WHERE id = '677c1b11-09fd-403e-9a7f-f2e17acfb378';

-- בדיקה שהעדכון הצליח
SELECT id, full_name, content, media_url, status 
FROM greetings 
WHERE id = '677c1b11-09fd-403e-9a7f-f2e17acfb378';
