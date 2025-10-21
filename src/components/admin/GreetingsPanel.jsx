import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, Trash2, User, Calendar, Image as ImageIcon } from 'lucide-react';
import { toast } from 'react-hot-toast';
import useGreetings from '../../state/useGreetings';
import { formatDate } from '../../lib/time';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import Modal from '../ui/Modal';

const GreetingsPanel = () => {
  const { getAll, countByStatus, approveGreeting, rejectGreeting, deleteGreeting } = useGreetings();
  const [filter, setFilter] = useState('all');
  const [selectedGreeting, setSelectedGreeting] = useState(null);
  
  const allGreetings = getAll();
  const stats = countByStatus();

  const filteredGreetings = filter === 'all' 
    ? allGreetings 
    : allGreetings.filter(g => g.status === filter);

  const handleApprove = (id) => {
    approveGreeting(id);
    toast.success('ברכה אושרה!');
  };

  const handleReject = (id) => {
    rejectGreeting(id);
    toast.success('ברכה נדחתה');
  };

  const handleDelete = (id) => {
    if (confirm('האם אתה בטוח שברצונך למחוק ברכה זו?')) {
      deleteGreeting(id);
      setSelectedGreeting(null);
      toast.success('ברכה נמחקה');
    }
  };

  const getStatusVariant = (status) => {
    switch (status) {
      case 'approved': return 'success';
      case 'rejected': return 'danger';
      case 'pending': return 'warning';
      default: return 'default';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'approved': return 'מאושר';
      case 'rejected': return 'נדחה';
      case 'pending': return 'ממתין';
      default: return status;
    }
  };

  return (
    <div>
      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-8">
        <Card className="p-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-romantic-burgundy mb-2">
              {stats.total}
            </div>
            <div className="text-sm text-romantic-burgundy/60">סה"כ</div>
          </div>
        </Card>
        <Card className="p-6 bg-yellow-50">
          <div className="text-center">
            <div className="text-3xl font-bold text-yellow-700 mb-2">
              {stats.pending}
            </div>
            <div className="text-sm text-yellow-600">ממתינים</div>
          </div>
        </Card>
        <Card className="p-6 bg-green-50">
          <div className="text-center">
            <div className="text-3xl font-bold text-green-700 mb-2">
              {stats.approved}
            </div>
            <div className="text-sm text-green-600">מאושרים</div>
          </div>
        </Card>
        <Card className="p-6 bg-red-50">
          <div className="text-center">
            <div className="text-3xl font-bold text-red-700 mb-2">
              {stats.rejected}
            </div>
            <div className="text-sm text-red-600">נדחים</div>
          </div>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex gap-2 mb-6 flex-wrap">
        <Button
          variant={filter === 'all' ? 'primary' : 'ghost'}
          size="sm"
          onClick={() => setFilter('all')}
        >
          הכל ({stats.total})
        </Button>
        <Button
          variant={filter === 'pending' ? 'primary' : 'ghost'}
          size="sm"
          onClick={() => setFilter('pending')}
        >
          ממתינים ({stats.pending})
        </Button>
        <Button
          variant={filter === 'approved' ? 'primary' : 'ghost'}
          size="sm"
          onClick={() => setFilter('approved')}
        >
          מאושרים ({stats.approved})
        </Button>
        <Button
          variant={filter === 'rejected' ? 'primary' : 'ghost'}
          size="sm"
          onClick={() => setFilter('rejected')}
        >
          נדחים ({stats.rejected})
        </Button>
      </div>

      {/* Greetings List */}
      {filteredGreetings.length === 0 ? (
        <Card className="p-12 text-center">
          <p className="text-romantic-burgundy/60">אין ברכות בקטגוריה זו</p>
        </Card>
      ) : (
        <div className="space-y-4">
          {filteredGreetings.map((greeting, index) => (
            <motion.div
              key={greeting.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="p-6">
                <div className="flex items-start justify-between gap-4">
                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-full bg-romantic-burgundy/10 flex items-center justify-center flex-shrink-0">
                        <User size={20} className="text-romantic-burgundy" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-romantic-burgundy truncate">
                          {greeting.full_name}
                        </h4>
                        <div className="flex items-center gap-2 text-xs text-romantic-burgundy/60">
                          <Calendar size={12} />
                          <span>{formatDate(greeting.created_at, 'D/M/YY HH:mm')}</span>
                          <Badge variant={getStatusVariant(greeting.status)} size="sm">
                            {getStatusLabel(greeting.status)}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    <p className="text-romantic-burgundy/80 mb-3 line-clamp-2">
                      {greeting.content}
                    </p>

                    {greeting.mediaUrl && (
                      <div className="flex items-center gap-2 text-sm text-romantic-burgundy/60">
                        <ImageIcon size={16} />
                        <span>מדיה מצורפת</span>
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col sm:flex-row gap-2 flex-shrink-0">
                    {greeting.status !== 'approved' && (
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => handleApprove(greeting.id)}
                        className="gap-1"
                      >
                        <CheckCircle size={16} />
                        אשר
                      </Button>
                    )}
                    {greeting.status !== 'rejected' && (
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleReject(greeting.id)}
                        className="gap-1"
                      >
                        <XCircle size={16} />
                        דחה
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedGreeting(greeting)}
                    >
                      צפה
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(greeting.id)}
                      className="text-red-500 hover:text-red-600"
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {/* Preview Modal */}
      <Modal
        isOpen={!!selectedGreeting}
        onClose={() => setSelectedGreeting(null)}
        title="תצוגת ברכה"
        size="lg"
      >
        {selectedGreeting && (
          <div>
            <div className="mb-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 rounded-full bg-romantic-burgundy/10 flex items-center justify-center">
                  <User size={24} className="text-romantic-burgundy" />
                </div>
                <div>
                  <h3 className="font-bold text-romantic-burgundy text-lg">
                    {selectedGreeting.full_name}
                  </h3>
                  <div className="text-sm text-romantic-burgundy/60">
                    {formatDate(selectedGreeting.created_at, 'D MMMM YYYY, HH:mm')}
                  </div>
                </div>
              </div>
              <Badge variant={getStatusVariant(selectedGreeting.status)}>
                {getStatusLabel(selectedGreeting.status)}
              </Badge>
            </div>

            <p className="text-romantic-burgundy/90 leading-relaxed mb-4 whitespace-pre-wrap">
              {selectedGreeting.content}
            </p>

            {selectedGreeting.mediaUrl && (
              <div className="rounded-xl overflow-hidden mb-6">
                {selectedGreeting.mediaUrl.includes('video') || selectedGreeting.mediaUrl.endsWith('.mp4') ? (
                  <video 
                    src={selectedGreeting.mediaUrl} 
                    controls 
                    className="w-full max-h-96 object-cover"
                  />
                ) : (
                  <img 
                    src={selectedGreeting.mediaUrl} 
                    alt="תמונה מצורפת" 
                    className="w-full max-h-96 object-cover"
                  />
                )}
              </div>
            )}

            <div className="flex gap-3">
              {selectedGreeting.status !== 'approved' && (
                <Button
                  variant="secondary"
                  onClick={() => {
                    handleApprove(selectedGreeting.id);
                    setSelectedGreeting(null);
                  }}
                  className="flex-1 gap-2"
                >
                  <CheckCircle size={18} />
                  אשר
                </Button>
              )}
              {selectedGreeting.status !== 'rejected' && (
                <Button
                  variant="danger"
                  onClick={() => {
                    handleReject(selectedGreeting.id);
                    setSelectedGreeting(null);
                  }}
                  className="flex-1 gap-2"
                >
                  <XCircle size={18} />
                  דחה
                </Button>
              )}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default GreetingsPanel;

