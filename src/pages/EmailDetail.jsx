import React, { useState } from 'react';
import {
  ArrowLeft,
  Star,
  Trash2,
  Tag,
  ChevronDown,
  FileText,
  Download
} from 'lucide-react';
import '../styles/email-detail.css';

export default function EmailDetail({
  email,
  onBack,
  onDelete
}) {
  const [isStarred, setIsStarred] = useState(false);

  const subject = email?.subject || 'Oliver, hello there! | MJWYT44 BM#52W01';
  const senderName = email?.senderName || 'Amanda Clark';
  const senderEmail = email?.from || 'amanda@example.com';
  const dateDisplay = email?.dateDisplay || email?.timeBadge || 'Nov 3, 10:23 AM';

  const attachments = email?.attachments && email.attachments.length > 0 ? email.attachments : [
    { name: 'Tennis_Coach_Profile.png', size: '1.2 MB' },
    { name: 'Tennis_Coach_Profile2.png', size: '1.2 MB' }
  ];

  return (
    <div className="email-detail-container">
      <header className="detail-header">
        <div className="detail-header-left">
          <button className="btn-detail-back" onClick={onBack} title="Back">
            <ArrowLeft size={18} />
          </button>
          <h2 className="detail-email-subject">{subject}</h2>
        </div>

        <div className="detail-header-right">
          <button
            className="detail-icon-btn"
            title="Star"
            onClick={() => setIsStarred(!isStarred)}
          >
            <Star
              size={16}
              fill={isStarred ? '#f59e0b' : 'none'}
              stroke={isStarred ? '#f59e0b' : '#9ca3af'}
            />
          </button>
          <button
            className="detail-icon-btn"
            title="Delete"
            onClick={() => {
              if (email?.id) onDelete(email.id);
              onBack();
            }}
          >
            <Trash2 size={16} />
          </button>
          <button className="detail-icon-btn" title="Tag">
            <Tag size={16} />
          </button>
          <div className="detail-user-badge">OB</div>
        </div>
      </header>

      <div className="detail-sender-row">
        <div className="detail-sender-left">
          <div className="sender-circle-avatar">
            {senderName.charAt(0).toUpperCase()}
          </div>
          <div className="sender-details">
            <div className="sender-name-line">
              <span className="sender-name">{senderName}</span>
              <span className="sender-address">&lt;{senderEmail}&gt;</span>
            </div>
            <div className="sender-to-line">
              <span>To me</span>
              <ChevronDown size={12} />
            </div>
          </div>
        </div>

        <div className="detail-date">{dateDisplay}</div>
      </div>

      <div className="detail-body">
        <p>Hey Oliver,</p>
        <p>You've just RECEIVED something</p>

        <div className="detail-highlight-card">
          <div className="highlight-title">
            ⚡ Extremely Exclusive—Only 4 Spots Worldwide Per Year | $25,000 Investment ⚡
          </div>
          <div className="highlight-subtitle">
            To explore securing your private transformation, simply reply right now with 'FLY OUT FIX' -
          </div>
        </div>

        <p>Your coach for world-class performance,</p>
        <p>Grant</p>
        <p>P.S. Always remember that you can develop world class technique!</p>
      </div>

      <div className="detail-attachments-row">
        {attachments.map((att, idx) => (
          <div key={idx} className="detail-attachment-file-card">
            <div className="attachment-icon-wrap">
              <FileText size={20} color="#00a854" />
            </div>
            <div className="attachment-file-info">
              <div className="attachment-name" title={att.name}>
                {att.name}
              </div>
              <div className="attachment-size">{att.size}</div>
            </div>
            <button className="attachment-download-btn" title="Download file">
              <Download size={14} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
