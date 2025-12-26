'use client';

import { useState, useEffect } from 'react';

export function usePdfThumbnail(file, scale = 0.5) {
  const [thumbnail, setThumbnail] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!file) return;

    const generateThumbnail = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const pdfjsLib = await import('pdfjs-dist');
        pdfjsLib.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;

        const arrayBuffer = await file.arrayBuffer();
        const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

        setPageCount(pdf.numPages);

        const page = await pdf.getPage(1);
        const viewport = page.getViewport({ scale });

        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.width = viewport.width;
        canvas.height = viewport.height;

        await page.render({ canvasContext: context, viewport }).promise;

        setThumbnail(canvas.toDataURL('image/png'));
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    generateThumbnail();
  }, [file, scale]);

  return { thumbnail, pageCount, isLoading, error };
}
