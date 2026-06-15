import Head from "next/head";
import { ChatPanel } from "@/components/chatbot/ChatPanel";

export default function ChatPage() {
  return (
    <>
      <Head>
        <title>Zavior Assistant | Zavior Technologies</title>
      </Head>
      <div className="container mx-auto flex min-h-[calc(100dvh-5rem)] px-4 pb-8 pt-24 lg:px-8 lg:pb-12 lg:pt-28">
        <div className="mx-auto flex w-full max-w-4xl flex-col gap-5">
          <section>
            <p className="mb-2 text-sm font-medium uppercase tracking-wide text-primary">
              Zavior Assistant
            </p>
            <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              Chat with Zavior Technologies
            </h1>
          </section>
          <ChatPanel
            variant="page"
            className="h-[min(720px,calc(100dvh-13rem))] min-h-[420px] w-full sm:min-h-[520px]"
          />
        </div>
      </div>
    </>
  );
}
