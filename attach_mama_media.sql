-- הצמדת תמונה לברכה של אמא
-- עדכון הברכה עם קישור לתמונה

UPDATE greetings 
SET media_url = '/media/teenage IRA.jpg'
WHERE id = 'f7a40267-9c60-43ba-90be-5375a2561055';

-- בדיקה שהעדכון הצליח
SELECT id, full_name, content, media_url, status 
FROM greetings 
WHERE id = 'f7a40267-9c60-43ba-90be-5375a2561055';
