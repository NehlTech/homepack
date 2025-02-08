"use client";

import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";

interface UploaderProps {
  imgURL: string;
  setImgURL: React.Dispatch<React.SetStateAction<string | any>>;
  img?: string;
}
export const ImageUploader = ({ imgURL, setImgURL }: UploaderProps) => {
  return (
    <CldUploadWidget
      uploadPreset="homepack-hms"
      onSuccess={(res: any, { widget }) => {
        const uploadedImageUrl = res?.info?.secure_url;
        console.log("displaying image");
        console.log("This is the image:" + uploadedImageUrl);
        if (uploadedImageUrl) {
          setImgURL(uploadedImageUrl);
        }
        widget.close();
      }}
    >
      {({ open }) => {
        return (
          <div className="flex gap-4 z-[999]">
            <Image
              src={imgURL || "/profile.png"}
              width={60}
              height={60}
              alt="profile picture"
              className="w-20 h-20 rounded-full object-cover"
            />

            <div>
              <div className="flex items-center gap-3">
                <Button
                  onClick={() => open()}
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="pl-0 text-[#DAA520] text-base font-normal"
                >
                  Upload Photo
                </Button>
              </div>
              <p className="text-sm text-gray-500">
                Upload profile image, it's best if it has the same length and
                height.
              </p>
            </div>
          </div>
        );
      }}
    </CldUploadWidget>
  );
};
