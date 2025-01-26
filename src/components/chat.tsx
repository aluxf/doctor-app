"use client"
import * as React from "react"

import { Button } from "@/components/ui/button"
import {
    ChatBubble,
    ChatBubbleAvatar,
    ChatBubbleMessage,
  } from "@/components/ui/chat/chat-bubble";
  import { ChatInput } from "@/components/ui/chat/chat-input";
  import {
    ExpandableChat,
    ExpandableChatHeader,
    ExpandableChatBody,
    ExpandableChatFooter,
  } from "@/components/ui/chat/expandable-chat";
  import { ChatMessageList } from "@/components/ui/chat/chat-message-list";
import { useRef } from "react";
import { Input } from "./ui/input";
import { Separator } from "@radix-ui/react-select";

const appointment_data = {
    doctor: "Dr. Alex Fooladi",
    date: "2025-01-24",
    type: "General Consultation",
    time: "14:00",
    description: "I need a prescription for my allergies",
    additional_information: "I have been sneezing a lot lately"
}

export function AppointmentChat() {
    const [input, setInput] = React.useState("");
    const formRef = useRef<HTMLFormElement>(null);


    
    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(input);
        setInput("");
    }
    
    return (
        <div className="flex flex-col h-full w-screen p-2 items-center">
            <ChatMessageList className="">
                <ChatBubble className="max-w-[80%]" variant="sent">
                        <ChatBubbleAvatar src="" fallback="🤖" />
                        <ChatBubbleMessage>
                            {appointment_data.type}
                        </ChatBubbleMessage>
                </ChatBubble>
                <ChatBubble className="max-w-[80%]" variant="sent">
                        <ChatBubbleAvatar src="" fallback="🤖" />
                        <ChatBubbleMessage>
                            {appointment_data.description}
                        </ChatBubbleMessage>
                </ChatBubble>

            </ChatMessageList>
            <footer className="w-full">

                <form ref={formRef} className="flex relative gap-2" onSubmit={onSubmit}>
                    <Input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className="min-h-12 bg-background shadow-none "
                    />
                    <Button
                        className="absolute top-1/2 right-2 transform  -translate-y-1/2"
                        type="submit"
                        size="icon"
                    >
                    </Button>
                </form>
            </footer>

        </div>
        
    )
  }
