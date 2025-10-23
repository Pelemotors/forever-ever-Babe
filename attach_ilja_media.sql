-- הצמדת תמונה לברכה של איליה
-- עדכון הברכה עם קישור לתמונה

UPDATE greetings 
SET media_url = '/media/ilja.jpg'
WHERE id = '7050ceea-cff7-423b-abb9-f2487c5b224f';

-- בדיקה שהעדכון הצליח
SELECT id, full_name, content, media_url, status 
FROM greetings 
WHERE id = '7050ceea-cff7-423b-abb9-f2487c5b224f';
