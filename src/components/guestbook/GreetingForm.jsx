import { useState } from 'react';
import { Upload, X, Image as ImageIcon, Video } from 'lucide-react';
import { toast } from 'react-hot-toast';
import useGreetings from '../../state/useGreetings';
import { greetingSchema, validateFile } from '../../lib/validators';
import Input from '../ui/Input';
import Textarea from '../ui/Textarea';
import Button from '../ui/Button';
import Card from '../ui/Card';

const GreetingForm = () => {
  const [formData, setFormData] = useState({
    fromName: '',
    message: '',
  });
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const { addGreeting } = useGreetings();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    // Validate file
    const validation = validateFile(selectedFile);
    if (!validation.valid) {
      toast.error(validation.error);
      return;
    }

    setFile(selectedFile);

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview({
        url: reader.result,
        type: selectedFile.type,
      });
    };
    reader.readAsDataURL(selectedFile);
  };

  const removeFile = () => {
    setFile(null);
    setPreview(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setLoading(true);

    try {
      // Validate with Zod
      const validatedData = greetingSchema.parse({
        fromName: formData.fromName,
        message: formData.message,
        mediaUrl: preview?.url || '',
      });

      // Add greeting
      addGreeting({
        fromName: validatedData.fromName,
        message: validatedData.message,
        mediaUrl: validatedData.mediaUrl || undefined,
      });

      // Success!
      toast.success('הברכה נשלחה בהצלחה! היא תופיע לאחר אישור.');

      // Reset form
      setFormData({ fromName: '', message: '' });
      setFile(null);
      setPreview(null);

    } catch (error) {
      if (error.errors) {
        // Zod validation errors
        const newErrors = {};
        error.errors.forEach(err => {
          newErrors[err.path[0]] = err.message;
        });
        setErrors(newErrors);
      } else {
        toast.error('אירעה שגיאה. נסה שוב.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="p-8">
      <h3 className="text-2xl font-bold text-romantic-burgundy mb-6">
        השאירו ברכה
      </h3>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name */}
        <Input
          label="שם מלא"
          name="fromName"
          value={formData.fromName}
          onChange={handleChange}
          error={errors.fromName}
          placeholder="הכניסו את שמכם"
          required
        />

        {/* Message */}
        <Textarea
          label="הודעה"
          name="message"
          value={formData.message}
          onChange={handleChange}
          error={errors.message}
          placeholder="כתבו ברכה, מסר או זכרון מיוחד..."
          rows={6}
          maxLength={500}
          showCount
          required
        />

        {/* File Upload */}
        <div>
          <label className="block text-sm font-medium text-romantic-burgundy mb-2">
            תמונה או וידאו (אופציונלי)
          </label>
          
          {!preview ? (
            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-romantic-burgundy/20 border-dashed rounded-xl cursor-pointer hover:border-romantic-burgundy/40 transition-colors">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Upload className="w-10 h-10 mb-3 text-romantic-burgundy/40" />
                <p className="text-sm text-romantic-burgundy/60">
                  לחצו להעלאת קובץ
                </p>
                <p className="text-xs text-romantic-burgundy/40 mt-1">
                  תמונה או וידאו עד 20MB
                </p>
              </div>
              <input
                type="file"
                className="hidden"
                accept="image/jpeg,image/png,video/mp4"
                onChange={handleFileChange}
              />
            </label>
          ) : (
            <div className="relative rounded-xl overflow-hidden">
              {preview.type.startsWith('video/') ? (
                <video 
                  src={preview.url} 
                  controls 
                  className="w-full max-h-64 object-cover"
                />
              ) : (
                <img 
                  src={preview.url} 
                  alt="תצוגה מקדימה" 
                  className="w-full max-h-64 object-cover"
                />
              )}
              <button
                type="button"
                onClick={removeFile}
                className="absolute top-2 left-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
              >
                <X size={20} />
              </button>
            </div>
          )}
        </div>

        {/* Submit */}
        <Button
          type="submit"
          variant="primary"
          size="lg"
          loading={loading}
          className="w-full"
        >
          שלח ברכה
        </Button>

        <p className="text-xs text-romantic-burgundy/60 text-center">
          הברכה תופיע באתר לאחר אישור
        </p>
      </form>
    </Card>
  );
};

export default GreetingForm;

