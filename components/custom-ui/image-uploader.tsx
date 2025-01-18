import { CldUploadWidget } from "next-cloudinary";
import { Button } from "@/components/ui/button";
import { Paperclip, Trash } from "lucide-react";
import Image from "next/image";

interface ImageUploaderProps {
  value: string[];
  onChange: (value: string[]) => void;
  onRemove: () => void;
}
export const ImageUploader: React.FC<ImageUploaderProps> = ({
  value,
  onChange,
  onRemove,
}) => {
  const onUpload = (result: any) => {
    onChange(result.info.secure_url);
  };

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center gap-4">
        {value.map((url) => (
          <div key={url} className="relative w-[200px] h-[200px]">
            <div className="absolute top-0 right-0 z-10">
              <Button onClick={() => onRemove()} size="sm" className="bg-red-600 text-white">
                <Trash className="h-5 w-5" />
              </Button>
            </div>
            <Image
              src={url}
              alt="collection"
              className="rounded-lg object-cover"
              fill
            />
          </div>
        ))}
      </div>
      <CldUploadWidget uploadPreset="mizou-images" onSuccess={onUpload}>
        {({ open }) => {
          return (
            <Button
              variant="outline"
              onClick={() => open()}
              className=" w-1/3 ml-4"
            >
              <Paperclip className="w-5 h-5" />
              Upload Image
            </Button>
          );
        }}
      </CldUploadWidget>
    </div>
  );
}; 