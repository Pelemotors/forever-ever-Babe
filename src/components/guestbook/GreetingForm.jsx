import { useState } from 'react';
import { toast } from 'react-hot-toast';
import useGreetings from '../../state/useGreetings';
import { greetingSchema } from '../../lib/validators';
import Input from '../ui/Input';
import Textarea from '../ui/Textarea';
import Button from '../ui/Button';
import Card from '../ui/Card';

const GreetingForm = () => {
  const [formData, setFormData] = useState({
    fromName: '',
    message: '',
  });
  // Guests no longer upload media via form
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

  // No file handlers needed

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setLoading(true);

    try {
      // Validate with Zod
      const validatedData = greetingSchema.parse({
        fromName: formData.fromName,
        message: formData.message,
      });

      // Add greeting
      addGreeting({
        fromName: validatedData.fromName,
        message: validatedData.message,
      });

      // Success!
      toast.success('הברכה נשלחה בהצלחה! תודה על המילים החמות 💕');

      // Reset form
      setFormData({ fromName: '', message: '' });

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

        {/* WhatsApp note instead of upload */}
        <p className="text-sm text-romantic-burgundy/70 bg-romantic-peach/20 rounded-lg p-4">
          רוצים לצרף תמונה או סרטון? שלחו לוואטסאפ במספר{' '}
          <a
            className="underline font-medium"
            href={`https://wa.me/972${(import.meta.env.VITE_CONTACT_WHATSAPP || '0504650155').replace(/[^\d]/g, '').replace(/^0/, '')}`}
            target="_blank"
            rel="noreferrer"
          >
            {import.meta.env.VITE_CONTACT_WHATSAPP || '050-4650155'}
          </a>{' '}
          ונעלה בשבילכם.
        </p>

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
          תודה על הברכה החמה! 💕
        </p>
      </form>
    </Card>
  );
};

export default GreetingForm;

