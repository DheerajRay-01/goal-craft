"use client";

type Props = {
  url?: string;
};

export default function FileActions({ url }: Props) {
  if (!url) return null;

  const isPdf = url.endsWith(".pdf");

  const getDownloadUrl = (url: string) => {
    if (url.includes("/upload/")) {
      return url.replace("/upload/", "/upload/fl_attachment/");
    }

    if (url.includes("/raw/upload/")) {
      return url.replace("/raw/upload/", "/raw/upload/fl_attachment/");
    }

    return url;
  };

  return (
    <div className="flex items-center gap-3">
      {/* 👁 View */}
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm text-blue-600 hover:underline"
      >
        View
      </a>

      {/* ⬇ Download */}
      <a
        href={getDownloadUrl(url)}
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm font-medium text-primary hover:underline"
      >
        Download
      </a>

      {/* 🔥 Inline Preview (optional for PDF) */}
      {isPdf && (
        <button
          onClick={() => window.open(url, "_blank")}
          className="text-xs text-gray-500 hover:underline"
        >
          Preview
        </button>
      )}
    </div>
  );
}