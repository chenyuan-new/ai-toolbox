"use client";

import { useRef, useState, type ChangeEvent } from "react";
import { CircleX, type LucideIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface ImageUploaderProps {
  icon: LucideIcon;
  afterUpload: (e: ChangeEvent<HTMLInputElement>) => void;
  clearUpload: () => void;
  label?: string;
}

const ImageUploader = ({
  icon: Icon,
  afterUpload,
  clearUpload,
  label,
}: ImageUploaderProps) => {
  const [imageSrc, setImageSrc] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="flex justify-center gap-x-2">
      <Button
        type="button"
        variant="ghost"
        className="flex justify-center gap-2 bg-slate-100 hover:bg-slate-300"
        onClick={() => {
          console.log("click");
          inputRef.current?.click();
        }}
      >
        <Icon className="w-4 h-4" /> {label}
        <Input
          ref={inputRef}
          id="image"
          type="file"
          className="hidden"
          accept=".jpg, .jpeg, .png"
          onChange={(e) => {
            console.log(2, "2", e);
            afterUpload(e);
            const file = e.target.files?.[0];
            if (file) {
              const url = URL.createObjectURL(file);
              setImageSrc(url);
            }
          }}
        />
      </Button>
      {imageSrc && (
        <div className="relative w-10 h-10">
          <Image src={imageSrc} alt="uploaded image" fill />
          <CircleX
            onClick={() => {
              clearUpload();
              // https://stackoverflow.com/questions/12030686/html-input-file-selection-event-not-firing-upon-selecting-the-same-file
              inputRef.current && (inputRef.current.value = "");
              setImageSrc("");
            }}
            className="absolute right-0 top-0 translate-x-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 cursor-pointer"
          />
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
