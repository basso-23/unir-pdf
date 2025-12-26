'use client';

import { useReducer, useCallback } from 'react';
import { arrayMove } from '@dnd-kit/sortable';
import DropZone from '@/components/DropZone';
import PdfList from '@/components/PdfList';
import ActionButtons from '@/components/ActionButtons';
import { mergePdfs, downloadPdf } from '@/utils/pdfUtils';
import { HiExclamationCircle } from 'react-icons/hi';

const initialState = {
  pdfs: [],
  isMerging: false,
  error: null,
};

function pdfReducer(state, action) {
  switch (action.type) {
    case 'ADD_PDFS':
      return {
        ...state,
        pdfs: [
          ...state.pdfs,
          ...action.payload.map((file, index) => ({
            id: `${Date.now()}-${index}`,
            file,
            name: file.name,
          })),
        ],
        error: null,
      };

    case 'REMOVE_PDF':
      return {
        ...state,
        pdfs: state.pdfs.filter((pdf) => pdf.id !== action.payload),
      };

    case 'REORDER_PDFS':
      const oldIndex = state.pdfs.findIndex((p) => p.id === action.payload.activeId);
      const newIndex = state.pdfs.findIndex((p) => p.id === action.payload.overId);
      return {
        ...state,
        pdfs: arrayMove(state.pdfs, oldIndex, newIndex),
      };

    case 'SET_MERGING':
      return {
        ...state,
        isMerging: action.payload,
      };

    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
        isMerging: false,
      };

    case 'CLEAR_ALL':
      return initialState;

    default:
      return state;
  }
}

export default function Home() {
  const [state, dispatch] = useReducer(pdfReducer, initialState);
  const { pdfs, isMerging, error } = state;

  const handleFilesAdded = useCallback((files) => {
    dispatch({ type: 'ADD_PDFS', payload: files });
  }, []);

  const handleRemove = useCallback((id) => {
    dispatch({ type: 'REMOVE_PDF', payload: id });
  }, []);

  const handleReorder = useCallback((activeId, overId) => {
    dispatch({ type: 'REORDER_PDFS', payload: { activeId, overId } });
  }, []);

  const handleClear = useCallback(() => {
    dispatch({ type: 'CLEAR_ALL' });
  }, []);

  const handleMerge = useCallback(async () => {
    if (pdfs.length < 2) return;

    dispatch({ type: 'SET_MERGING', payload: true });

    try {
      const files = pdfs.map((pdf) => pdf.file);
      const mergedPdfBytes = await mergePdfs(files);
      downloadPdf(mergedPdfBytes, 'documento-unido.pdf');
      dispatch({ type: 'SET_MERGING', payload: false });
    } catch (err) {
      dispatch({
        type: 'SET_ERROR',
        payload: 'Error al unir los PDFs. Por favor, intenta de nuevo.',
      });
    }
  }, [pdfs]);

  return (
    <div className="app-container">
      <header className="app-header">
        <h1 className="app-header-title">Unir PDF</h1>
        <p className="app-header-subtitle">
          Combina multiples archivos PDF en uno solo
        </p>
      </header>

      <main className="app-main">
        <DropZone
          onFilesAdded={handleFilesAdded}
          disabled={isMerging}
          currentCount={pdfs.length}
        />

        {error && (
          <div className="message message--error">
            <span className="message-icon">
              <HiExclamationCircle />
            </span>
            {error}
          </div>
        )}

        <PdfList pdfs={pdfs} onReorder={handleReorder} onRemove={handleRemove} />

        <ActionButtons
          onMerge={handleMerge}
          onClear={handleClear}
          disabled={isMerging}
          isMerging={isMerging}
          pdfCount={pdfs.length}
        />
      </main>
    </div>
  );
}
