
import { Button } from "@/components/ui/button";
import { Hotel, Phone, Menu } from "lucide-react";

const HotelHeader = () => {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-40">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Hotel className="h-8 w-8 text-primary mr-2" />
            <span className="text-xl font-semibold text-primary">Luxury Hotel Demo</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-6">
            <a href="#" className="text-gray-700 hover:text-primary font-medium transition-colors">Rooms</a>
            <a href="#" className="text-gray-700 hover:text-primary font-medium transition-colors">Amenities</a>
            <a href="#" className="text-gray-700 hover:text-primary font-medium transition-colors">Dining</a>
            <a href="#" className="text-gray-700 hover:text-primary font-medium transition-colors">Gallery</a>
            <a href="#" className="text-gray-700 hover:text-primary font-medium transition-colors">Contact</a>
          </div>
          
          <div className="hidden md:flex items-center space-x-2">
            <div className="flex items-center text-gray-700">
              <Phone className="h-4 w-4 mr-2" />
              <span>1-800-HOTEL</span>
            </div>
            <Button className="bg-secondary hover:bg-secondary/90 text-secondary-foreground">
              Book Now
            </Button>
          </div>
          
          <div className="md:hidden">
            <Button variant="ghost" size="sm">
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HotelHeader;
