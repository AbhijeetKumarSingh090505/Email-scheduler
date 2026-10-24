import React, { useState } from 'react';
import {
  ArrowLeft,
  Paperclip,
  Clock,
  Upload,
  Calendar,
  ChevronDown,
  Undo,
  Redo,
  Bold,
  Italic,
  Underline,
  AlignLeft,
  List,
  ListOrdered,
  Outdent,
  Indent,
  Quote,
  Strikethrough,
  Link2,
  FileText,
  X
} from 'lucide-react';
import '../styles/compose.css';

export default function ComposeEmail({ user, onSave, onCancel, initialData }) {
  const [fromEmail] = useState(user?.email || 'oliver.brown@domain.io');
  const [recipients, setRecipients] = useState(
    initialData?.recipients || ['tame@jmail.com', 'lame@jmail.com', 'dame@jmail.com']
  );
  const [newRecipient, setNewRecipient] = useState('');
  const [subject, setSubject] = useState(initialData?.subject || '');
  const [delaySec, setDelaySec] = useState('00');
  const [hourlyLimit, setHourlyLimit] = useState('00');
  const [body, setBody] = useState(initialData?.body || '');

  const [attachments, setAttachments] = useState(
    initialData?.attachments || [{ name: 'Document_Brief.pdf', size: '1.2 MB' }]
  );

  const [showSendLater, setShowSendLater] = useState(false);
  const [selectedPreset, setSelectedPreset] = useState('Tomorrow, 10:00 AM');
  const [scheduledTime, setScheduledTime] = useState(initialData?.timeBadge || null);

  const handleAddRecipient = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const val = newRecipient.trim();
      if (val && !recipients.includes(val)) {
        setRecipients([...recipients, val]);
        setNewRecipient('');
      }
    }
  };

  const handleRemoveRecipient = (index) => {
    setRecipients(recipients.filter((_, i) => i !== index));
  };

  const handleUploadList = () => {
    setRecipients(['tame@jmail.com', 'lame@jmail.com', 'dame@jmail.com', 'alex@corp.io', 'sarah@apex.com']);
  };

  const handleDoneSchedule = () => {
    setScheduledTime(selectedPreset);
    setShowSendLater(false);
  };

  const handleSend = () => {
    const isScheduled = Boolean(scheduledTime);
    const newEmail = {
      id: initialData?.id || `email_${Date.now()}`,
      from: fromEmail,
      recipientDisplay: recipients.length > 0 ? `To: ${recipients[0]}` : 'To: Recipient',
      recipients: recipients,
      subject: subject || 'Untitled Subject',
      body: body || 'No content',
      status: isScheduled ? 'Scheduled' : 'Sent',
      timeBadge: scheduledTime || 'Tue 9:15:12 AM',
      attachments: attachments,
      dateDisplay: 'Just now'
    };
    onSave(newEmail);
  };

  return (
    <div className="compose-container">
      <header className="compose-header">
        <div className="compose-header-left">
          <button className="btn-compose-back" onClick={onCancel} title="Back">
            <ArrowLeft size={18} />
          </button>
          <h2 className="compose-title">Compose New Email</h2>
        </div>

        <div className="compose-header-right">
          <button
            className="compose-icon-btn"
            title="Attach File"
            onClick={() => {
              const fileName = `Attachment_${attachments.length + 1}.pdf`;
              setAttachments([...attachments, { name: fileName, size: '850 KB' }]);
            }}
          >
            <Paperclip size={18} />
            {attachments.length > 0 && (
              <span className="compose-icon-badge">{attachments.length}</span>
            )}
          </button>

          <button
            className="compose-icon-btn"
            title="Schedule / Send Later"
            onClick={() => setShowSendLater(!showSendLater)}
          >
            <Clock size={18} />
          </button>

          <button className="btn-send-action" onClick={handleSend}>
            {scheduledTime ? 'Send Later' : 'Send'}
          </button>
        </div>
      </header>

      <div className="compose-fields-section">
        <div className="field-row">
          <span className="field-label">From</span>
          <div className="field-content">
            <div className="from-pill">
              <span>{fromEmail}</span>
              <ChevronDown size={14} color="#6b7280" />
            </div>
          </div>
        </div>

        <div className="field-row">
          <span className="field-label">To</span>
          <div className="field-content">
            <div className="recipient-tags-wrap">
              {recipients.slice(0, 3).map((r, i) => (
                <span key={i} className="recipient-tag">
                  {r}
                  <X
                    size={12}
                    style={{ cursor: 'pointer' }}
                    onClick={() => handleRemoveRecipient(i)}
                  />
                </span>
              ))}
              {recipients.length > 3 && (
                <span className="recipient-more-badge">
                  +{recipients.length - 3}
                </span>
              )}
              <input
                type="text"
                className="recipient-input"
                placeholder={recipients.length === 0 ? "recipient@example.com" : ""}
                value={newRecipient}
                onChange={(e) => setNewRecipient(e.target.value)}
                onKeyDown={handleAddRecipient}
              />
            </div>

            <button
              type="button"
              className="btn-upload-list"
              onClick={handleUploadList}
            >
              <Upload size={14} />
              <span>Upload List</span>
            </button>
          </div>
        </div>

        <div className="field-row">
          <span className="field-label">Subject</span>
          <div className="field-content">
            <input
              type="text"
              className="field-input-clean"
              placeholder="Subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
          </div>
        </div>

        <div className="scheduling-settings-row">
          <div className="setting-item">
            <span>Delay between 2 emails</span>
            <input
              type="text"
              className="setting-number-input"
              value={delaySec}
              onChange={(e) => setDelaySec(e.target.value)}
            />
          </div>

          <div className="setting-item">
            <span>Hourly Limit</span>
            <input
              type="text"
              className="setting-number-input"
              value={hourlyLimit}
              onChange={(e) => setHourlyLimit(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="editor-container">
        <div className="formatting-toolbar">
          <button className="toolbar-btn" title="Undo"><Undo size={14} /></button>
          <button className="toolbar-btn" title="Redo"><Redo size={14} /></button>
          <div className="toolbar-divider" />
          <button className="toolbar-btn" title="Font Size">TT <ChevronDown size={10} /></button>
          <div className="toolbar-divider" />
          <button className="toolbar-btn" title="Bold"><Bold size={14} /></button>
          <button className="toolbar-btn" title="Italic"><Italic size={14} /></button>
          <button className="toolbar-btn" title="Underline"><Underline size={14} /></button>
          <div className="toolbar-divider" />
          <button className="toolbar-btn" title="Align"><AlignLeft size={14} /><ChevronDown size={10} /></button>
          <div className="toolbar-divider" />
          <button className="toolbar-btn" title="Numbered List"><ListOrdered size={14} /></button>
          <button className="toolbar-btn" title="Bullet List"><List size={14} /></button>
          <button className="toolbar-btn" title="Outdent"><Outdent size={14} /></button>
          <button className="toolbar-btn" title="Indent"><Indent size={14} /></button>
          <button className="toolbar-btn" title="Quote"><Quote size={14} /></button>
          <button className="toolbar-btn" title="Link"><Link2 size={14} /></button>
          <button className="toolbar-btn" title="Strikethrough"><Strikethrough size={14} /></button>
        </div>

        <textarea
          className="editor-textarea"
          placeholder="Type Your Reply..."
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />

        {attachments.length > 0 && (
          <div className="compose-attachment-preview">
            {attachments.map((att, i) => (
              <div key={i} className="compose-file-tag">
                <FileText size={14} color="#00a854" />
                <span className="file-tag-name">{att.name}</span>
                <span className="file-tag-size">({att.size})</span>
                <button
                  type="button"
                  className="file-tag-remove-btn"
                  onClick={() => setAttachments(attachments.filter((_, idx) => idx !== i))}
                  title="Remove attachment"
                >
                  <X size={12} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {showSendLater && (
        <div className="send-later-popover">
          <h4 className="send-later-title">Send Later</h4>

          <div
            className="date-picker-box"
            onClick={() => setSelectedPreset('Custom date & time')}
          >
            <span>Pick date & time</span>
            <Calendar size={15} />
          </div>

          <div className="preset-options-list">
            {[
              'Tomorrow',
              'Tomorrow, 10:00 AM',
              'Tomorrow, 11:00 AM',
              'Tomorrow, 3:00 PM'
            ].map((option) => (
              <button
                key={option}
                type="button"
                className={`preset-option-btn ${selectedPreset === option ? 'selected' : ''}`}
                onClick={() => setSelectedPreset(option)}
              >
                {option}
              </button>
            ))}
          </div>

          <div className="send-later-footer">
            <button
              type="button"
              className="btn-modal-cancel"
              onClick={() => setShowSendLater(false)}
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn-modal-done"
              onClick={handleDoneSchedule}
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
