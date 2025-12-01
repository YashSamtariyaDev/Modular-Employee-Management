import React from 'react';
import styles from './Modal.module.css';

type Props = { open: boolean; onClose: () => void; children: React.ReactNode };

export default function Modal({ open, onClose, children }: Props) {
  if (!open) return null;
  return (
    <div className={styles['modal-backdrop']} onClick={onClose}>
      <div className={styles['modal-content']} onClick={e => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}
