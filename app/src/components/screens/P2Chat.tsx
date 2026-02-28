"use client";

import { useState } from "react";
import type { Story } from "@/types/narrative";
import styles from "./P2Chat.module.css";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface P2ChatProps {
  story: Story;
}

export default function P2Chat({ story }: P2ChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: `I can help you explore "${story.title}" in depth. Ask me about the events, structural forces, competing narratives, or gaps in coverage.`,
    },
  ]);
  const [input, setInput] = useState("");

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = { role: "user", content: input.trim() };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    // Placeholder: echo-style response grounded in story data
    const assistantMessage: Message = {
      role: "assistant",
      content: `[Placeholder] This response would be grounded in the narrative graph for "${story.title}", covering ${story.events.length} events, ${story.forces.length} structural forces, and ${story.gaps.length} identified gaps. AI chat integration is planned for a future phase.`,
    };
    setTimeout(() => {
      setMessages((prev) => [...prev, assistantMessage]);
    }, 400);
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h2>Deep Dive</h2>
        <p className={styles.headerSub}>{story.title}</p>
      </header>

      <div className={styles.messages}>
        {messages.map((msg, i) => (
          <div
            key={i}
            className={
              msg.role === "user" ? styles.msgUser : styles.msgAssistant
            }
          >
            <p>{msg.content}</p>
          </div>
        ))}
      </div>

      <form className={styles.inputBar} onSubmit={handleSend}>
        <input
          className={styles.input}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask a question about this story..."
        />
        <button type="submit" className={styles.sendBtn}>
          Send
        </button>
      </form>
    </div>
  );
}
