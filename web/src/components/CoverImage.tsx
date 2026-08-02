import { cn } from "@/lib/cn";
import type { Book } from "@/lib/types";

type Props = {
  book: Book;
  /** Display width hint for sizes attribute */
  sizes?: string;
  className?: string;
  imgClassName?: string;
  priority?: boolean;
  /** card = thumbs srcset; hero/product = full webp + jpg fallback */
  variant?: "card" | "product";
  alt?: string;
};

/**
 * Cover with CLS-safe dimensions (2:3), WebP srcset for retina, JPG fallback.
 */
export function CoverImage({
  book,
  sizes = "(max-width:640px) 45vw, (max-width:1024px) 28vw, 220px",
  className,
  imgClassName,
  priority = false,
  variant = "card",
  alt,
}: Props) {
  const base = book.coverFile.replace(/\.(webp|jpg|png)$/i, "");
  const fullWebp = `/covers/${base}.webp`;
  const fullJpg = `/covers/${base}.jpg`;
  const label = alt || `Обложка книги «${book.title}»`;

  if (variant === "product") {
    return (
      <picture className={cn("block overflow-hidden", className)}>
        <source type="image/webp" srcSet={fullWebp} />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={fullJpg}
          alt={label}
          width={720}
          height={1080}
          className={cn("h-full w-full object-cover", imgClassName)}
          decoding={priority ? "sync" : "async"}
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "auto"}
        />
      </picture>
    );
  }

  // Card: responsive thumbs (1x / 1.5x / 2x+)
  const src180 = `/covers/thumbs/${base}-w180.webp`;
  const src280 = `/covers/thumbs/${base}-w280.webp`;
  const src360 = `/covers/thumbs/${base}-w360.webp`;
  const src560 = `/covers/thumbs/${base}-w560.webp`;

  return (
    <picture className={cn("block overflow-hidden", className)}>
      <source
        type="image/webp"
        srcSet={`${src180} 180w, ${src280} 280w, ${src360} 360w, ${src560} 560w`}
        sizes={sizes}
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src280}
        alt={label}
        width={280}
        height={420}
        className={cn("h-full w-full object-cover", imgClassName)}
        decoding="async"
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        sizes={sizes}
      />
    </picture>
  );
}
