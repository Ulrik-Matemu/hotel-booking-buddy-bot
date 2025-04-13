
import { useState, useRef, useEffect } from "react";
import { Send, Hotel, Calendar, Clock, Coffee, Wifi, Map } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import ChatMessage from "./ChatMessage";
import QuickReplyButton from "./QuickReplyButton";

export interface Message {
  id: string;
  content: string;
  sender: "user" | "bot";
  timestamp: Date;
}

interface ChatWindowProps {
  onClose: () => void;
}

const initialMessages: Message[] = [
  {
    id: "welcome-msg",
    content: "Hello! Welcome to our hotel. How can I assist you today?",
    sender: "bot",
    timestamp: new Date(),
  },
];

const generateQuickReplies = (currentState: string) => {
  switch (currentState) {
    case "initial":
      return [
        { id: "book-room", label: "Book a room", icon: <Hotel className="h-4 w-4 mr-1" /> },
        { id: "check-availability", label: "Check availability", icon: <Calendar className="h-4 w-4 mr-1" /> },
        { id: "hotel-info", label: "Hotel information", icon: <Info className="h-4 w-4 mr-1" /> },
        { id: "contact", label: "Contact hotel", icon: <Phone className="h-4 w-4 mr-1" /> },
      ];
    case "booking":
      return [
        { id: "room-standard", label: "Standard Room", icon: <Bed className="h-4 w-4 mr-1" /> },
        { id: "room-deluxe", label: "Deluxe Room", icon: <BedDouble className="h-4 w-4 mr-1" /> },
        { id: "room-suite", label: "Executive Suite", icon: <Home className="h-4 w-4 mr-1" /> },
      ];
    case "hotel-info":
      return [
        { id: "amenities", label: "Amenities", icon: <Coffee className="h-4 w-4 mr-1" /> },
        { id: "check-in", label: "Check-in/out times", icon: <Clock className="h-4 w-4 mr-1" /> },
        { id: "wifi", label: "WiFi info", icon: <Wifi className="h-4 w-4 mr-1" /> },
        { id: "location", label: "Location & Directions", icon: <Map className="h-4 w-4 mr-1" /> },
      ];
    default:
      return [
        { id: "go-back", label: "Back to main menu", icon: null },
      ];
  }
};

const ChatWindow = ({ onClose }: ChatWindowProps) => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [chatState, setChatState] = useState("initial");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const quickReplies = generateQuickReplies(chatState);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() === "") return;
    
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      content: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setLoading(true);
    
    // Simulate bot response
    setTimeout(() => {
      processUserMessage(userMessage.content);
      setLoading(false);
    }, 1000);
  };

  const handleQuickReplyClick = (replyId: string) => {
    let content = "";
    
    // Find the quick reply text from the ID
    const reply = quickReplies.find(r => r.id === replyId);
    if (reply) {
      content = reply.label;
    }
    
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      content,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);
    
    // Process the quick reply
    setTimeout(() => {
      processQuickReply(replyId);
      setLoading(false);
    }, 800);
  };

  const processQuickReply = (replyId: string) => {
    let response = "";
    
    switch (replyId) {
      case "book-room":
        setChatState("booking");
        response = "What type of room would you like to book? Please select from the options below:";
        break;
      case "room-standard":
        setChatState("dates");
        response = "You've selected a Standard Room. Our Standard Room features a queen-size bed, private bathroom, and complimentary WiFi. When would you like to check in?";
        break;
      case "room-deluxe":
        setChatState("dates");
        response = "You've selected a Deluxe Room. Our Deluxe Room includes a king-size bed, spacious bathroom with bathtub, work desk, and city views. When would you like to check in?";
        break;
      case "room-suite":
        setChatState("dates");
        response = "You've selected an Executive Suite. Our Executive Suite offers a separate living area, king-size bed, premium amenities, and panoramic views. When would you like to check in?";
        break;
      case "check-availability":
        setChatState("availability");
        response = "Please let me know your desired check-in and check-out dates, and I'll check our availability for you.";
        break;
      case "hotel-info":
        setChatState("hotel-info");
        response = "What would you like to know about our hotel?";
        break;
      case "amenities":
        setChatState("initial");
        response = "Our hotel features a swimming pool, fitness center, spa, restaurant, bar, business center, and complimentary high-speed WiFi throughout the property.";
        break;
      case "check-in":
        setChatState("initial");
        response = "Check-in time is 3:00 PM and check-out time is 12:00 PM. Early check-in and late check-out may be available upon request, subject to availability.";
        break;
      case "wifi":
        setChatState("initial");
        response = "Complimentary high-speed WiFi is available throughout the hotel. The network name is 'Hotel_Guest' and the password will be provided during check-in.";
        break;
      case "location":
        setChatState("initial");
        response = "Our hotel is located in the city center, just 15 minutes from the international airport. We're within walking distance of major attractions, shopping, and dining options.";
        break;
      case "contact":
        setChatState("initial");
        response = "You can contact our hotel at: Phone: +1-555-123-4567, Email: info@luxuryhotel.com, or visit our website at www.luxuryhotel.com.";
        break;
      case "go-back":
        setChatState("initial");
        response = "What else can I help you with today?";
        break;
      default:
        setChatState("initial");
        response = "I'm not sure I understand. How can I help you today?";
    }
    
    addBotMessage(response);
  };

  const processUserMessage = (message: string) => {
    const lowerMessage = message.toLowerCase();
    let response = "";
    
    if (lowerMessage.includes("book") || lowerMessage.includes("reservation") || lowerMessage.includes("room")) {
      setChatState("booking");
      response = "What type of room would you like to book? Please select from the options below:";
    }
    else if (lowerMessage.includes("price") || lowerMessage.includes("cost") || lowerMessage.includes("rate")) {
      response = "Our room rates start at $150 per night for a Standard Room, $250 for a Deluxe Room, and $350 for an Executive Suite. Rates may vary based on dates and availability.";
    }
    else if (lowerMessage.includes("breakfast") || lowerMessage.includes("dining") || lowerMessage.includes("restaurant")) {
      response = "Our hotel offers a complimentary breakfast buffet from 6:30 AM to 10:30 AM daily. We also have an on-site restaurant serving lunch and dinner from 12:00 PM to 10:00 PM.";
    }
    else if (lowerMessage.includes("check in") || lowerMessage.includes("check out") || lowerMessage.includes("time")) {
      response = "Check-in time is 3:00 PM and check-out time is 12:00 PM. Early check-in and late check-out may be available upon request.";
    }
    else if (lowerMessage.includes("cancel") || lowerMessage.includes("refund")) {
      response = "Our cancellation policy allows free cancellation up to 48 hours before check-in. Please contact our reservation desk for assistance with your specific booking.";
    }
    else if (lowerMessage.includes("thank")) {
      response = "You're welcome! Is there anything else I can help you with?";
    }
    else if (lowerMessage.includes("hello") || lowerMessage.includes("hi") || lowerMessage.includes("hey")) {
      response = "Hello! How can I assist you with your hotel needs today?";
    }
    else {
      response = "I'm not sure I understand. Could you please rephrase your question or select one of our quick reply options below?";
    }
    
    addBotMessage(response);
  };

  const addBotMessage = (content: string) => {
    const botMessage: Message = {
      id: `bot-${Date.now()}`,
      content,
      sender: "bot",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, botMessage]);
  };

  const handleBookingComplete = () => {
    toast({
      title: "Booking request submitted",
      description: "A hotel representative will contact you to confirm your reservation.",
    });
    
    addBotMessage("Thank you for your booking request. A hotel representative will contact you shortly to confirm your reservation. Is there anything else I can help you with?");
    setChatState("initial");
  };

  return (
    <div className="flex flex-col h-full">
      <div className="bg-primary text-white p-3 flex justify-between items-center">
        <div className="flex items-center">
          <Hotel className="h-5 w-5 mr-2" />
          <span className="font-semibold">Hotel Concierge</span>
        </div>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onClose}
          className="text-white hover:bg-primary/50 h-8 w-8 p-0"
        >
          <X className="h-5 w-5" />
        </Button>
      </div>
      
      <div className="flex-1 p-3 overflow-y-auto bg-accent/30">
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
        
        {loading && (
          <div className="flex justify-start mb-3">
            <div className="bg-muted rounded-lg px-4 py-2 max-w-[80%]">
              <div className="flex space-x-2">
                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "0s" }}></div>
                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      {quickReplies.length > 0 && (
        <div className="flex flex-wrap gap-2 p-3 bg-white border-t">
          {quickReplies.map((reply) => (
            <QuickReplyButton
              key={reply.id}
              onClick={() => handleQuickReplyClick(reply.id)}
            >
              {reply.icon}
              {reply.label}
            </QuickReplyButton>
          ))}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="p-3 border-t flex gap-2 bg-white">
        <Input
          type="text"
          placeholder="Type your message..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          disabled={loading}
          className="flex-1"
        />
        <Button type="submit" disabled={loading || inputValue.trim() === ""}>
          <Send className="h-4 w-4" />
        </Button>
      </form>
    </div>
  );
};

// Define missing Lucide icons
const Bed = (props: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M2 4v16" />
    <path d="M2 8h18a2 2 0 0 1 2 2v10" />
    <path d="M2 17h20" />
    <path d="M6 8v9" />
  </svg>
);

const BedDouble = (props: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M2 4v16" />
    <path d="M2 8h18a2 2 0 0 1 2 2v10" />
    <path d="M2 17h20" />
    <path d="M6 8v9" />
    <path d="M14 8v9" />
  </svg>
);

const Info = (props: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="12" x2="12" y1="16" y2="12" />
    <line x1="12" x2="12.01" y1="8" y2="8" />
  </svg>
);

const Phone = (props: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

export default ChatWindow;
