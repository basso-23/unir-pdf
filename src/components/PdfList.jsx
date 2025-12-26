'use client';

import PdfCard from './PdfCard';

export default function PdfList({ pdfs, onMoveUp, onMoveDown }) {
  if (pdfs.length === 0) {
    return null;
  }

  return (
    <div className="pdf-list">
      <div className="pdf-list-header">
        <h2 className="pdf-list-title">Archivos PDF</h2>
        <span className="pdf-list-count">{pdfs.length} archivo{pdfs.length > 1 ? 's' : ''}</span>
      </div>

      <div className="pdf-list-items">
        {pdfs.map((pdf, index) => (
          <PdfCard
            key={pdf.id}
            pdf={pdf}
            onMoveUp={() => onMoveUp(index)}
            onMoveDown={() => onMoveDown(index)}
            isFirst={index === 0}
            isLast={index === pdfs.length - 1}
          />
        ))}
      </div>
    </div>
  );
}
