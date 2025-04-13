
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <div className="relative">
      <div 
        className="w-full h-[500px] bg-cover bg-center"
        style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80')",
          backgroundBlendMode: "overlay",
          backgroundColor: "rgba(0, 0, 0, 0.3)"
        }}
      >
        <div className="container mx-auto h-full flex flex-col items-center justify-center text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Experience Luxury & Comfort</h1>
          <p className="text-xl mb-6 max-w-xl">Discover our premium hotel with world-class amenities and exceptional service</p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-black font-semibold">
              Book Your Stay
            </Button>
            <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/20">
              Explore Rooms
            </Button>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 -mt-16 relative z-10">
          {[
            { title: "Luxury Rooms", description: "Elegantly designed rooms with modern amenities" },
            { title: "Fine Dining", description: "Award-winning restaurant with gourmet cuisine" },
            { title: "Premium Spa", description: "Relax and rejuvenate with our wellness services" }
          ].map((feature, index) => (
            <div 
              key={index} 
              className="bg-white p-6 rounded-lg shadow-lg"
            >
              <h3 className="text-lg font-bold text-primary mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
