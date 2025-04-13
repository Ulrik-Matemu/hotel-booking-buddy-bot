
import ChatButton from "@/components/ChatButton";
import HotelHeader from "@/components/HotelHeader";
import HeroSection from "@/components/HeroSection";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <HotelHeader />
      <main className="flex-1">
        <HeroSection />
        
        <section className="py-12 container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Welcome to Luxury Hotel</h2>
          <p className="text-gray-600 text-center max-w-3xl mx-auto mb-8">
            Nestled in the heart of the city, our hotel offers a perfect blend of elegance, comfort, and exceptional service. 
            Whether you're visiting for business or leisure, our dedicated team is committed to making your stay memorable.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80" 
                alt="Luxurious room" 
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Luxurious Accommodations</h3>
                <p className="text-gray-600 mb-4">
                  Our rooms and suites are designed with your comfort in mind, featuring premium bedding, 
                  modern amenities, and stunning views to enhance your stay.
                </p>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80" 
                alt="Hotel amenities" 
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Premium Amenities</h3>
                <p className="text-gray-600 mb-4">
                  Enjoy our world-class facilities including a spa, fitness center, indoor swimming pool, 
                  and exquisite dining options during your stay.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <footer className="bg-primary text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4">Luxury Hotel</h3>
              <p className="text-sm text-white/80">
                123 Elegant Street<br />
                Cityville, State 12345<br />
                Phone: 1-800-HOTEL<br />
                Email: info@luxuryhotel.com
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm text-white/80">
                <li><a href="#" className="hover:text-secondary transition-colors">Rooms & Suites</a></li>
                <li><a href="#" className="hover:text-secondary transition-colors">Dining</a></li>
                <li><a href="#" className="hover:text-secondary transition-colors">Amenities</a></li>
                <li><a href="#" className="hover:text-secondary transition-colors">Special Offers</a></li>
                <li><a href="#" className="hover:text-secondary transition-colors">Contact Us</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-bold mb-4">Newsletter</h3>
              <p className="text-sm text-white/80 mb-4">
                Subscribe to our newsletter for special offers and updates.
              </p>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Your email" 
                  className="px-3 py-2 text-sm text-black rounded-l-md w-full"
                />
                <button className="bg-secondary px-3 py-2 rounded-r-md text-black font-medium">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-white/20 text-center text-sm text-white/60">
            <p>&copy; {new Date().getFullYear()} Luxury Hotel. All rights reserved.</p>
          </div>
        </div>
      </footer>
      
      <ChatButton />
    </div>
  );
};

export default Index;
