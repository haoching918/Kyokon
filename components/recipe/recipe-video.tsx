interface RecipeVideoProps {
  videoUrl?: string;
  className?: string;
}

function extractYouTubeId(url: string): string | null {
  const regExp =
    /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
}

export function RecipeVideo({ videoUrl, className }: RecipeVideoProps) {
  if (!videoUrl) return null;

  const videoId = extractYouTubeId(videoUrl);

  return (
    <section className={`mt-16 ${className || ""}`}>
      <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
        {videoId ? (
          <iframe
            className="absolute top-0 left-0 w-full h-full"
            src={`https://www.youtube.com/embed/${videoId}`}
            title="Recipe Video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        ) : (
          <div className="aspect-video w-full flex items-center justify-center text-slate-500">
            Invalid or unsupported video URL. Please provide a valid YouTube
            link.
          </div>
        )}
      </div>
    </section>
  );
}
