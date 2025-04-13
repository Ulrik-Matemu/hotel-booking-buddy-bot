
import { useState } from "react";
import { MessageSquare, X } from "lucide-react";
import { cn } from "@/lib/utils";
import ChatWindow from "./ChatWindow";
import { Button } from "@/components/ui/button";

const ChatButton = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isChatOpen ? (
        <div 
          className={cn(
            "absolute bottom-16 right-0 mb-2 w-[350px] h-[500px] max-h-[80vh] shadow-lg rounded-lg overflow-hidden bg-white",
            isChatOpen ? "animate-slide-in-bottom" : "animate-slide-out-bottom"
          )}
        >
          <ChatWindow onClose={toggleChat} />
        </div>
      ) : null}
      
      <Button 
        onClick={toggleChat} 
        size="lg"
        className={cn(
          "rounded-full w-14 h-14 shadow-lg flex items-center justify-center",
          isChatOpen ? "bg-destructive hover:bg-destructive/90" : "bg-primary hover:bg-primary/90"
        )}
      >
        {isChatOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <MessageSquare className="h-6 w-6" />
        )}
      </Button>
    </div>
  );
};

export default ChatButton;
