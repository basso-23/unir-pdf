'use client';

import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import PdfCard from './PdfCard';

export default function PdfList({ pdfs, onReorder, onRemove }) {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      onReorder(active.id, over.id);
    }
  };

  if (pdfs.length === 0) {
    return null;
  }

  return (
    <div className="pdf-list">
      <div className="pdf-list-header">
        <h2 className="pdf-list-title">Archivos PDF</h2>
        <span className="pdf-list-count">{pdfs.length} archivo{pdfs.length > 1 ? 's' : ''}</span>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={pdfs.map((p) => p.id)} strategy={verticalListSortingStrategy}>
          <div className="pdf-list-items">
            {pdfs.map((pdf) => (
              <PdfCard key={pdf.id} pdf={pdf} onRemove={onRemove} />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
}
