import React, { useState } from 'react';
import {
  Clock,
  Send,
  Search,
  Filter,
  RotateCw,
  ChevronDown,
  Star
} from 'lucide-react';
import '../styles/dashboard.css';

export default function Dashboard({
  user,
  emails,
  onNavigate,
  onSelectEmail,
  onLogout
}) {
  const [activeTab, setActiveTab] = useState('Scheduled');
  const [searchTerm, setSearchTerm] = useState('');
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [starredIds, setStarredIds] = useState([]);

  const scheduledCount = emails.filter((e) => e.status === 'Scheduled').length;
  const sentCount = emails.filter((e) => e.status === 'Sent').length;

  const visibleEmails = emails.filter((item) => {
    const matchesTab = item.status === activeTab;
    if (!matchesTab) return false;

    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    const recipient = (item.recipientDisplay || (Array.isArray(item.recipients) ? item.recipients.join(' ') : item.recipients) || '').toLowerCase();
    const subject = (item.subject || '').toLowerCase();
    const body = (item.body || '').toLowerCase();

    return recipient.includes(term) || subject.includes(term) || body.includes(term);
  });

  const toggleStar = (e, id) => {
    e.stopPropagation();
    setStarredIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const getInitials = (name) => {
    if (!name) return 'OB';
    const parts = name.trim().split(' ');
    if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    return parts[0].slice(0, 2).toUpperCase();
  };

  return (
    <div className="dashboard-layout">
      <aside className="dashboard-sidebar">
        <div className="logo-container">
          <span className="logo-text">ONB</span>
        </div>

        <div
          className="user-profile-card"
          onClick={() => setShowUserMenu(!showUserMenu)}
        >
          <div className="user-avatar-circle">
            {getInitials(user?.name)}
          </div>
          <div className="user-info">
            <span className="user-name">{user?.name || 'Oliver Brown'}</span>
            <span className="user-email">{user?.email || 'oliver.brown@domain.io'}</span>
          </div>
          <ChevronDown size={14} className="user-chevron" />

          {showUserMenu && (
            <div className="user-dropdown-menu">
              <button
                className="user-dropdown-item"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowUserMenu(false);
                  onLogout();
                }}
              >
                Sign out
              </button>
            </div>
          )}
        </div>

        <button
          className="btn-compose-action"
          onClick={() => onNavigate('compose')}
        >
          Compose
        </button>

        <div className="nav-section-title">CORE</div>
        <div className="nav-list">
          <button
            className={`nav-item ${activeTab === 'Scheduled' ? 'active' : ''}`}
            onClick={() => setActiveTab('Scheduled')}
          >
            <Clock size={16} className="nav-item-icon" />
            <span className="nav-item-label">Scheduled</span>
            <span className="nav-item-badge">{scheduledCount || 12}</span>
          </button>

          <button
            className={`nav-item ${activeTab === 'Sent' ? 'active' : ''}`}
            onClick={() => setActiveTab('Sent')}
          >
            <Send size={16} className="nav-item-icon" />
            <span className="nav-item-label">Sent</span>
            <span className="nav-item-badge">{sentCount || 785}</span>
          </button>
        </div>
      </aside>

      <main className="dashboard-main">
        <div className="dashboard-topbar">
          <div className="search-bar">
            <Search size={16} className="search-icon" />
            <input
              type="text"
              className="search-input"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="topbar-actions">
            <button className="topbar-icon-btn" title="Filter">
              <Filter size={16} />
            </button>
            <button
              className="topbar-icon-btn"
              title="Refresh"
              onClick={() => setSearchTerm('')}
            >
              <RotateCw size={16} />
            </button>
          </div>
        </div>

        <div className="email-list-container">
          {visibleEmails.map((email) => {
            const isStarred = starredIds.includes(email.id);
            return (
              <div
                key={email.id}
                className="email-row"
                onClick={() => onSelectEmail(email.id)}
              >
                <div className="email-recipient">
                  {email.recipientDisplay || `To: ${email.recipients?.[0] || 'Unknown'}`}
                </div>

                {activeTab === 'Scheduled' ? (
                  <div className="email-schedule-badge">
                    <Clock size={11} />
                    <span>{email.timeBadge || 'Tue 9:15:12 AM'}</span>
                  </div>
                ) : (
                  <div className="email-sent-badge">Sent</div>
                )}

                <div className="email-content-snippet">
                  <span className="email-subject">{email.subject}</span>
                  <span> - </span>
                  <span>{email.body ? email.body.replace(/\n+/g, ' ').slice(0, 90) : ''}</span>
                </div>

                <button
                  className={`email-star-btn ${isStarred ? 'starred' : ''}`}
                  onClick={(e) => toggleStar(e, email.id)}
                  title="Star email"
                >
                  <Star
                    size={16}
                    fill={isStarred ? '#f59e0b' : 'none'}
                    stroke={isStarred ? '#f59e0b' : '#d1d5db'}
                  />
                </button>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
