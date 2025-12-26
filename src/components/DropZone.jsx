'use client';

import { useState } from 'react';
import { HiDocumentAdd } from 'react-icons/hi';

const MAX_FILES = 20;

export default function DropZone({ onFilesAdded, disabled, currentCount }) {
  const [isDragActive, setIsDragActive] = useState(false);

  const remainingSlots = MAX_FILES - currentCount;

  const handleFiles = (files) => {
    const pdfFiles = Array.from(files).filter(
      (file) => file.type === 'application/pdf'
    );

    if (pdfFiles.length === 0) return;

    const filesToAdd = pdfFiles.slice(0, remainingSlots);
    if (filesToAdd.length > 0) {
      onFilesAdded(filesToAdd);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    if (!disabled && remainingSlots > 0) {
      setIsDragActive(true);
    }
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragActive(false);
    if (!disabled && remainingSlots > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleChange = (e) => {
    if (e.target.files) {
      handleFiles(e.target.files);
      e.target.value = '';
    }
  };

  const isDisabled = disabled || remainingSlots <= 0;

  return (
    <div
      className={`dropzone ${isDragActive ? 'dropzone--active' : ''} ${isDisabled ? 'dropzone--disabled' : ''}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="dropzone-icon">
        <HiDocumentAdd />
      </div>
      <p className="dropzone-text">
        {remainingSlots <= 0
          ? 'Limite alcanzado'
          : 'Arrastra tus archivos PDF aqui'}
      </p>
      <p className="dropzone-text-secondary">
        {remainingSlots <= 0
          ? `Maximo ${MAX_FILES} archivos permitidos`
          : `o haz clic para seleccionar (${remainingSlots} restantes)`}
      </p>
      <input
        type="file"
        accept="application/pdf"
        multiple
        onChange={handleChange}
        disabled={isDisabled}
        className="dropzone-input"
      />
    </div>
  );
}
