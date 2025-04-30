import Image from "next/image";

type ArticleImageProps = {
  imageUrl: string | null;
  title: string;
  height?: number;
};

const ArticleImage = ({ imageUrl, title, height = 350 }: ArticleImageProps) => {
  return (
    <div className="mb-3 max-w-full relative" style={{ height: `${height}px` }}>
      {imageUrl ? (
        <Image
          src={imageUrl}
          alt={title}
          width={700}
          height={height}
          className="rounded-lg object-contain w-full"
        />
      ) : (
        <div className="absolute top-0 left-0 bg-[#af0000] text-white h-full w-full text-sm px-2 py-1 rounded-lg">
          <div className="flex h-full flex-col justify-between items-center py-4">
            <Image
              src={"/brand/the-civic-diary-long-white.jpeg"}
              alt={title}
              width={350}
              height={200}
              className="rounded-lg object-contain my-2"
            />
            <div>
              <p className="text-lg font-bold">{title}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ArticleImage;
