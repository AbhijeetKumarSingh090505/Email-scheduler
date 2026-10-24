import React, { useState, useEffect } from 'react';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ComposeEmail from './pages/ComposeEmail';
import EmailDetail from './pages/EmailDetail';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

const INITIAL_EMAILS = [
  {
    id: 'email_1',
    from: 'oliver.brown@domain.io',
    recipientDisplay: 'To: John Smith',
    recipients: ['john.smith@domain.io'],
    subject: 'Meeting follow-up - Scheduled',
    body: 'Hi John, just wanted to follow up on our meeting...',
    status: 'Scheduled',
    timeBadge: 'Tue 9:15:12 AM',
    dateDisplay: 'Nov 3, 10:23 AM',
    attachments: [
      { name: 'Tennis_Coach_Profile.png', size: '1.2 MB' },
      { name: 'Tennis_Coach_Profile2.png', size: '1.2 MB' }
    ]
  },
  {
    id: 'email_2',
    from: 'oliver.brown@domain.io',
    recipientDisplay: 'To: Olive',
    recipients: ['olive@domain.io'],
    subject: "Ramit, great to meet you - you'll love it",
    body: 'Hi Olive, just wanted to follow up on our meeting...',
    status: 'Scheduled',
    timeBadge: 'Thu 8:15:12 PM',
    dateDisplay: 'Nov 3, 10:23 AM',
    attachments: [
      { name: 'Tennis_Coach_Profile.png', size: '1.2 MB' },
      { name: 'Tennis_Coach_Profile2.png', size: '1.2 MB' }
    ]
  },
  {
    id: 'email_3',
    from: 'oliver.brown@domain.io',
    recipientDisplay: 'To: Sarah Wilson',
    recipients: ['sarah.wilson@domain.io'],
    subject: 'Re: Project Update',
    body: 'Thanks for the update, Sarah. Looks good!',
    status: 'Sent',
    timeBadge: 'Yesterday',
    dateDisplay: 'Nov 2, 4:15 PM',
    attachments: []
  },
  {
    id: 'email_4',
    from: 'oliver.brown@domain.io',
    recipientDisplay: 'To: Support',
    recipients: ['support@domain.io'],
    subject: 'Issue with login',
    body: 'I am having trouble logging in to the dashboard...',
    status: 'Sent',
    timeBadge: 'Oct 28',
    dateDisplay: 'Oct 28, 2:30 PM',
    attachments: []
  }
];

export default function App() {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('onb_user');
    return saved ? JSON.parse(saved) : {
      name: 'Oliver Brown',
      email: 'oliver.brown@domain.io'
    };
  });

  const [emails, setEmails] = useState(() => {
    const saved = localStorage.getItem('onb_emails');
    return saved ? JSON.parse(saved) : INITIAL_EMAILS;
  });

  const [currentRoute, setCurrentRoute] = useState('dashboard');
  const [selectedEmailId, setSelectedEmailId] = useState(null);
  const [editingEmail, setEditingEmail] = useState(null);
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    localStorage.setItem('onb_emails', JSON.stringify(emails));
  }, [emails]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('onb_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('onb_user');
    }
  }, [user]);

  const showToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  };

  const handleLogin = (userData) => {
    setUser(userData);
    setCurrentRoute('dashboard');
    showToast(`Welcome back, ${userData.name}!`, 'success');
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentRoute('login');
  };

  const handleSaveEmail = (emailData) => {
    setEmails((prev) => [emailData, ...prev]);
    setCurrentRoute('dashboard');
    showToast(
      emailData.status === 'Scheduled'
        ? 'Email scheduled successfully!'
        : 'Email sent successfully!'
    );
  };

  const handleDeleteEmail = (id) => {
    setEmails((prev) => prev.filter((e) => e.id !== id));
    if (selectedEmailId === id) {
      setSelectedEmailId(null);
      setCurrentRoute('dashboard');
    }
    showToast('Email removed.', 'info');
  };

  const selectedEmail = emails.find((e) => e.id === selectedEmailId);

  if (!user || currentRoute === 'login') {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <>
      {currentRoute === 'dashboard' && (
        <Dashboard
          user={user}
          emails={emails}
          onNavigate={(route) => {
            if (route === 'compose') setEditingEmail(null);
            setCurrentRoute(route);
          }}
          onSelectEmail={(id) => {
            setSelectedEmailId(id);
            setCurrentRoute('detail');
          }}
          onLogout={handleLogout}
        />
      )}

      {currentRoute === 'compose' && (
        <ComposeEmail
          user={user}
          initialData={editingEmail}
          onSave={handleSaveEmail}
          onCancel={() => {
            setEditingEmail(null);
            setCurrentRoute('dashboard');
          }}
        />
      )}

      {currentRoute === 'detail' && (
        <EmailDetail
          email={selectedEmail}
          onBack={() => setCurrentRoute('dashboard')}
          onDelete={handleDeleteEmail}
        />
      )}

      <div className="toast-container">
        {toasts.map((t) => (
          <div key={t.id} className="toast">
            {t.type === 'success' && <CheckCircle2 size={16} color="#00a854" />}
            {t.type === 'info' && <Info size={16} color="#3b82f6" />}
            {t.type === 'error' && <AlertCircle size={16} color="#ef4444" />}
            <span style={{ flex: 1, fontSize: '13px' }}>{t.message}</span>
            <button
              onClick={() => setToasts((prev) => prev.filter((x) => x.id !== t.id))}
              style={{ background: 'transparent', color: '#9ca3af', padding: '2px' }}
            >
              <X size={14} />
            </button>
          </div>
        ))}
      </div>
    </>
  );
}
