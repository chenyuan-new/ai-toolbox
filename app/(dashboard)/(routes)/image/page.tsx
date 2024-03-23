"use client";
import { z } from "zod";
import { Download, ImageIcon, Link } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/Image";
import { Heading } from "@/components/heading";
import { formScheme } from "./constants";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRef, useState } from "react";
import Empty from "@/components/empty";
import { Loader } from "@/components/loader";
import { cn } from "@/lib/utils";

import { useRouter } from "next/navigation";
import { Card, CardFooter } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import ImageUploader from "@/components/image-uploader";

type FormSchemeType = z.infer<typeof formScheme>;

const ConversationPage = () => {
  const [image, setImage] = useState<string>("");
  const uploadedImage = useRef<File | null>(null);
  const router = useRouter();
  const form = useForm<FormSchemeType>({
    resolver: zodResolver(formScheme),
    defaultValues: {
      prompt: "",
    },
  });

  const isLoading = form.formState.isSubmitting;
  const onSubmit = async (values: FormSchemeType) => {
    const formData = new FormData();
    try {
      formData.append("prompt", values.prompt);
      uploadedImage.current && formData.append("image", uploadedImage.current);
      const response = await fetch("/api/image", {
        method: "POST",
        // headers: {
        //   "content-type": "multipart/form-data",
        // },
        body: formData,
      });
      const imageBlob = await response.blob();
      const url = URL.createObjectURL(imageBlob);
      console.log(imageBlob, "\n", url);
      setImage(url);
    } catch (e) {
      console.log(e);
    } finally {
      // https://nextjs.org/docs/app/api-reference/functions/use-router#userouter
      // 更新rsc？ 不影响 client
      router.refresh();
    }
  };

  return (
    <div>
      <Heading
        title="Image"
        description="image generation"
        icon={ImageIcon}
        iconColor="text-violet-500"
        bgColor="bg-violet-500/10"
      />
      <div className="px-4 lg:px-8">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm flex flex-col gap-4"
          >
            <FormField
              name="prompt"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl className="m-0 p-0">
                    <Textarea
                      className="focus-visible:ring-0 focus-visible:ring-transparent"
                      disabled={isLoading}
                      placeholder=" how is the weather?"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <div className="flex items-center justify-between">
              <Button>Generate</Button>
              <ImageUploader
                afterUpload={async (e) => {
                  console.log('e', e.target.files)
                  const file = e.target.files?.[0];
                  if (file) {
                    uploadedImage.current = file;
                  }
                }}
                icon={Link}
                label="attach image"
                clearUpload={() => {
                  uploadedImage.current = null;
                }}
              />
            </div>
          </form>
        </Form>
      </div>
      <div className="space-y-4 mt-4 px-4 lg:px-8">
        {isLoading && (
          <div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted">
            <Loader />
          </div>
        )}
        {image.length === 0 && !isLoading && (
          <Empty label="no image generated." />
        )}
        {!!image && !isLoading && (
          <Card key={image} className="rounded-lg overflow-hidden">
            <div className="relative aspect-square">
              <Image alt="image" fill src={image} />
            </div>
            <CardFooter className="p-2">
              <Button
                className="w-full"
                variant="secondary"
                onClick={() => window.open(image)}
              >
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
            </CardFooter>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ConversationPage;
