"use client";
import { z } from "zod";
import { MessageSquare } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ReactMarkdown from "react-markdown";

import { Heading } from "@/components/heading";
import { formScheme } from "./constants";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Empty from "@/components/empty";
import { Loader } from "@/components/loader";
import { cn } from "@/lib/utils";
import { UserAvatar } from "@/components/user-avatar";
import { BotAvatar } from "@/components/bot-avatar";
import { useRouter } from "next/navigation";
import { Textarea } from "@/components/ui/textarea";
import { useProModal } from "@/hooks/use-pro-modal";
import { useToast } from "@/components/ui/use-toast";

type FormSchemeType = z.infer<typeof formScheme>;
type ChatMessageType = { role: "user" | "assistant"; content: string };

const ConversationPage = () => {
  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  const router = useRouter();
  const proModal = useProModal();
  const { toast } = useToast();
  const form = useForm<FormSchemeType>({
    resolver: zodResolver(formScheme),
    defaultValues: {
      prompt: "",
    },
  });

  const isLoading = form.formState.isSubmitting;
  const onSubmit = async (values: FormSchemeType) => {
    try {
      const userPrompt = {
        role: "user",
        content: values.prompt,
      } as ChatMessageType;
      const newMessages = [...messages, userPrompt];

      const response = await fetch("/api/conversation", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          prompts: newMessages,
        }),
      });
      if (!response.ok) {
        throw new Error(response.status.toString());
      }
      const data = await response.json();
      setMessages((current) => [
        ...current,
        userPrompt,
        data as { role: "assistant"; content: string },
      ]);
      form.reset();
    } catch (e) {
      if (e!.message === "403") {
        proModal.onOpen();
      } else {
        toast({
          title: "Uh oh! Something went wrong.",
          description: "There was a problem with your request.",
        });
      }
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
        title="Conversation"
        description="conversation"
        icon={MessageSquare}
        iconColor="text-violet-500"
        bgColor="bg-violet-500/10"
      />
      <div className="px-4 lg:px-8">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2 items-center"
          >
            <FormField
              name="prompt"
              render={({ field }) => (
                <FormItem className="col-span-12 lg:col-span-10">
                  <FormControl className="m-0 p-0">
                    <Textarea
                      className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                      disabled={isLoading}
                      placeholder="how is the weather?"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button className="col-span-12 lg:col-span-2 w-full">
              Generate
            </Button>
          </form>
        </Form>
      </div>
      <div className="space-y-4 mt-4 px-4 lg:px-8">
        {isLoading && (
          <div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted">
            <Loader />
          </div>
        )}
        {messages.length === 0 && !isLoading && (
          <Empty label="no conversation started." />
        )}
        <div className="flex flex-col-reverse gap-y-4">
          {messages.map((message) => (
            <div
              key={message.content}
              className={cn(
                "p-8 w-full flex items-start gap-x-8 rounded-lg",
                message.role === "user"
                  ? "bg-white border border-black/10"
                  : "bg-muted"
              )}
            >
              {message.role === "user" ? <UserAvatar /> : <BotAvatar />}
              <p className="text-sm">
                <ReactMarkdown
                  className="text-sm overflow-hidden leading-7"
                  components={{
                    pre: ({ node, ...props }) => (
                      <div className="overflow-auto w-full my-2 bg-black/10 p-2 rounded-lg">
                        <pre {...props} />
                      </div>
                    ),
                    code: ({ node, ...props }) => (
                      <code className="bg-black/10 rounded-lg p-1" {...props} />
                    ),
                  }}
                >
                  {message.content}
                </ReactMarkdown>
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ConversationPage;
