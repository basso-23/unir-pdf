'use client';

import { HiChevronUp, HiChevronDown, HiDocument } from 'react-icons/hi';
import { usePdfThumbnail } from '@/hooks/usePdfThumbnail';

export default function PdfCard({ pdf, onMoveUp, onMoveDown, isFirst, isLast }) {
  const { thumbnail, pageCount, isLoading } = usePdfThumbnail(pdf.file);

  return (
    <div className="pdf-card">
      <div className="pdf-card-thumbnail">
        {isLoading ? (
          <div className="thumbnail-placeholder thumbnail-loading">
            <HiDocument />
          </div>
        ) : thumbnail ? (
          <img src={thumbnail} alt={pdf.name} />
        ) : (
          <div className="thumbnail-placeholder">
            <HiDocument />
          </div>
        )}
      </div>

      <div className="pdf-card-info">
        <p className="pdf-card-name">{pdf.name}</p>
        <p className="pdf-card-pages">
          {pageCount > 0 ? `${pageCount} pagina${pageCount > 1 ? 's' : ''}` : 'Cargando...'}
        </p>
      </div>

      <div className="pdf-card-arrows">
        <button
          type="button"
          className="pdf-card-arrow-btn"
          onClick={onMoveUp}
          disabled={isFirst}
          aria-label="Mover arriba"
        >
          <HiChevronUp />
        </button>
        <button
          type="button"
          className="pdf-card-arrow-btn"
          onClick={onMoveDown}
          disabled={isLast}
          aria-label="Mover abajo"
        >
          <HiChevronDown />
        </button>
      </div>
    </div>
  );
}
