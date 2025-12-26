'use client';

import { HiDocumentDuplicate, HiTrash } from 'react-icons/hi';

export default function ActionButtons({
  onMerge,
  onClear,
  disabled,
  isMerging,
  pdfCount,
}) {
  if (pdfCount === 0) {
    return null;
  }

  return (
    <div className="actions-container">
      <button
        type="button"
        className="btn btn-primary"
        onClick={onMerge}
        disabled={disabled || pdfCount < 2}
      >
        {isMerging ? (
          <>
            <span className="spinner" />
            Uniendo...
          </>
        ) : (
          <>
            <span className="btn-icon">
              <HiDocumentDuplicate />
            </span>
            Unir PDFs
          </>
        )}
      </button>

      <button
        type="button"
        className="btn btn-secondary"
        onClick={onClear}
        disabled={disabled}
      >
        <span className="btn-icon">
          <HiTrash />
        </span>
        Limpiar
      </button>
    </div>
  );
}
