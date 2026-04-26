"use client";

import { useState, useRef } from "react";
import { uploadRecipeImages } from "@/utils/upload-images";
import { X, UploadCloud, Info, Loader2, ImagePlus } from "lucide-react";

interface ImageUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUploadComplete: (urls: string[]) => void;
  multiple?: boolean;
}

export function ImageUploadModal({
  isOpen,
  onClose,
  onUploadComplete,
  multiple = false,
}: ImageUploadModalProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleUpload = async (files: File[]) => {
    if (!files.length) return;

    setIsUploading(true);
    try {
      const urls = await uploadRecipeImages(files, "recipes");
      onUploadComplete(urls);
      onClose();
    } catch (err) {
      console.error(err);
      alert("Failed to upload image. Check console for details.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleUpload(Array.from(e.target.files));
    }
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const onDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files) {
      handleUpload(Array.from(e.dataTransfer.files));
    }
  };

  // Keep colors aligned with the original Kyokon theme + Stitch minimalist design
  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 max-w-2xl w-full shadow-2xl rounded-xl overflow-hidden animate-in fade-in zoom-in duration-300">
        {/* Modal Header */}
        <div className="px-8 py-6 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center bg-white dark:bg-slate-900">
          <h2 className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white uppercase">
            Add Recipe Visual
          </h2>
          <button
            type="button"
            onClick={onClose}
            disabled={isUploading}
            className="text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-8 space-y-8 bg-slate-50 dark:bg-slate-950">
          {/* Drop Zone */}
          <div
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            onDrop={onDrop}
            onClick={() => !isUploading && fileInputRef.current?.click()}
            className={`group relative aspect-video border-2 border-dashed transition-all flex flex-col items-center justify-center text-center p-12 cursor-pointer rounded-xl bg-white dark:bg-slate-900
              ${isDragOver ? "border-zinc-800 dark:border-white bg-zinc-50 dark:bg-slate-800" : "border-slate-300 dark:border-slate-700 hover:border-zinc-800 dark:hover:border-slate-500"}
              ${isUploading ? "opacity-50 cursor-not-allowed" : ""}
            `}
          >
            {isUploading ? (
              <div className="flex flex-col items-center justify-center space-y-4">
                <Loader2
                  className="animate-spin text-zinc-800 dark:text-white"
                  size={48}
                />
                <p className="text-lg font-bold text-zinc-800 dark:text-white">
                  Uploading & Compressing...
                </p>
              </div>
            ) : (
              <>
                <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <UploadCloud
                    className="text-zinc-800 dark:text-slate-300"
                    size={32}
                  />
                </div>
                <div>
                  <p className="text-lg font-bold text-zinc-900 dark:text-white mb-1">
                    Drag and drop your photography here
                  </p>
                  <p className="text-sm text-slate-500">
                    Supports high-res RAW, JPG, or PNG (Max 25MB)
                  </p>
                </div>
              </>
            )}

            <input
              ref={fileInputRef}
              className="hidden"
              type="file"
              multiple={multiple}
              accept="image/*"
              onChange={handleFileChange}
              disabled={isUploading}
            />
          </div>

          {!isUploading && (
            <>
              {/* Divider */}
              <div className="flex items-center space-x-4">
                <div className="h-px bg-slate-200 dark:bg-slate-800 grow"></div>
                <span className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">
                  Or select manually
                </span>
                <div className="h-px bg-slate-200 dark:bg-slate-800 grow"></div>
              </div>

              {/* Actions */}
              <div className="flex flex-col space-y-4">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 py-4 rounded-full font-bold shadow-lg shadow-zinc-900/20 hover:opacity-90 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                >
                  <ImagePlus size={18} />
                  Upload your own image
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="w-full bg-transparent text-slate-500 py-3 font-bold hover:text-zinc-900 dark:hover:text-white transition-colors text-sm uppercase tracking-widest"
                >
                  Cancel
                </button>
              </div>
            </>
          )}
        </div>

        {/* Modal Footer */}
        <div className="bg-slate-100 dark:bg-slate-900/50 px-8 py-4 flex items-center gap-3 border-t border-slate-200 dark:border-slate-800/50">
          <Info className="text-slate-500 flex-shrink-0" size={18} />
          <p className="text-[10px] text-slate-500 font-medium leading-relaxed uppercase tracking-widest">
            By uploading, you confirm that you own the rights to this image or
            have permission to use it for editorial purposes.
          </p>
        </div>
      </div>
    </div>
  );
}
