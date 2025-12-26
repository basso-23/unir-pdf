'use client';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { HiMenu, HiX, HiDocument } from 'react-icons/hi';
import { usePdfThumbnail } from '@/hooks/usePdfThumbnail';

export default function PdfCard({ pdf, onRemove }) {
  const { thumbnail, pageCount, isLoading } = usePdfThumbnail(pdf.file);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: pdf.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`pdf-card ${isDragging ? 'pdf-card--dragging' : ''}`}
    >
      <div className="pdf-card-drag-handle" {...attributes} {...listeners}>
        <HiMenu />
      </div>

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

      <div className="pdf-card-actions">
        <button
          type="button"
          className="pdf-card-remove-btn"
          onClick={() => onRemove(pdf.id)}
          aria-label="Eliminar PDF"
        >
          <HiX />
        </button>
      </div>
    </div>
  );
}
