
import { cn } from "@/lib/utils";
import { Message } from "./ChatWindow";

interface ChatMessageProps {
  message: Message;
}

const ChatMessage = ({ message }: ChatMessageProps) => {
  const isBot = message.sender === "bot";
  
  return (
    <div 
      className={cn(
        "mb-3 flex",
        isBot ? "justify-start" : "justify-end"
      )}
    >
      <div 
        className={cn(
          "px-4 py-2 rounded-lg max-w-[80%] animate-bounce-in",
          isBot 
            ? "bg-white text-foreground shadow-sm" 
            : "bg-primary text-white"
        )}
      >
        {message.content}
      </div>
    </div>
  );
};

export default ChatMessage;
