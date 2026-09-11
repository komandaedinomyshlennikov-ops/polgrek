import { cn } from "@/lib/cn";
import type { Book } from "@/lib/types";

type Props = {
  book: Book;
  sizes?: string;
  className?: string;
  imgClassName?: string;
  priority?: boolean;
  variant?: "card" | "product";
  alt?: string;
};

/**
 * Cover always fills a 2:3 frame. Width comes from the parent;
 * height follows. Image never blows the layout on small screens.
 */
export function CoverImage({
  book,
  sizes = "(max-width:640px) 40vw, (max-width:1024px) 28vw, 220px",
  className,
  imgClassName,
  priority = false,
  variant = "card",
  alt,
}: Props) {
  const base = book.coverFile.replace(/\.(webp|jpg|png)$/i, "");
  const fullWebp = `/covers/${base}.webp`;
  const fullJpg = `/covers/${base}.jpg`;
  const label = alt || `Обложка книги «${book.title}» Пола Грэка`;
  const pictureClass = cn("relative block aspect-[2/3] w-full overflow-hidden", className);
  const imgClass = cn("absolute inset-0 h-full w-full object-cover", imgClassName);

  if (variant === "product") {
    return (
      <picture className={pictureClass}>
        <source
          type="image/webp"
          srcSet={`${fullWebp} 720w`}
          sizes={sizes}
        />
        <img
          src={fullJpg}
          alt={label}
          width={720}
          height={1080}
          className={imgClass}
          decoding={priority ? "sync" : "async"}
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "auto"}
          sizes={sizes}
        />
      </picture>
    );
  }

  const src180 = `/covers/thumbs/${base}-w180.webp`;
  const src280 = `/covers/thumbs/${base}-w280.webp`;
  const src360 = `/covers/thumbs/${base}-w360.webp`;
  const src560 = `/covers/thumbs/${base}-w560.webp`;

  return (
    <picture className={pictureClass}>
      <source
        type="image/webp"
        srcSet={`${src180} 180w, ${src280} 280w, ${src360} 360w, ${src560} 560w, ${fullWebp} 720w`}
        sizes={sizes}
      />
      <img
        src={src280}
        alt={label}
        width={280}
        height={420}
        className={imgClass}
        decoding="async"
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        sizes={sizes}
      />
    </picture>
  );
}
