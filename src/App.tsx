import { motion } from "motion/react";
import { Star, MapPin, Phone, Mail, Instagram, Facebook, Twitter, ChevronRight, Menu as MenuIcon, X } from "lucide-react";
import { useState, useEffect } from "react";

// --- Types ---
interface Dish {
  name: string;
  description: string;
  price: string;
  image: string;
}

interface MenuItem {
  name: string;
  description: string;
  price: string;
}

interface Review {
  name: string;
  rating: number;
  comment: string;
}

interface Job {
  title: string;
  description: string;
}

// --- Data ---
const SIGNATURE_DISHES: Dish[] = [
  {
    name: "Truffle Infused Risotto",
    description: "Creamy Arborio rice with wild mushrooms and fresh black truffle shavings.",
    price: "₹1,250",
    image: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?q=80&w=800&auto=format&fit=crop"
  },
  {
    name: "Saffron Glazed Sea Bass",
    description: "Pan-seared Chilean sea bass with a delicate saffron reduction and asparagus.",
    price: "₹1,850",
    image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?q=80&w=800&auto=format&fit=crop"
  },
  {
    name: "Wagyu Beef Carpaccio",
    description: "Thinly sliced A5 Wagyu with capers, parmesan, and cold-pressed olive oil.",
    price: "₹2,100",
    image: "https://images.unsplash.com/photo-1514327605112-b887c0e61c0a?q=80&w=800&auto=format&fit=crop"
  },
  {
    name: "Deconstructed Tiramisu",
    description: "A modern take on the classic with espresso-soaked sponge and mascarpone foam.",
    price: "₹750",
    image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?q=80&w=800&auto=format&fit=crop"
  },
  {
    name: "Lobster Thermidor",
    description: "Succulent lobster meat in a rich brandy-infused cream sauce, baked to perfection.",
    price: "₹2,450",
    image: "https://images.unsplash.com/photo-1553243599-c0395c738d01?q=80&w=800&auto=format&fit=crop"
  },
  {
    name: "Smoked Duck Breast",
    description: "Cherry-wood smoked duck with a balsamic cherry glaze and parsnip purée.",
    price: "₹1,650",
    image: "https://images.unsplash.com/photo-1511910849309-0dffb8785146?q=80&w=800&auto=format&fit=crop"
  }
];

const MENU_CATEGORIES = {
  Starters: [
    { name: "Burrata with Heirloom Tomatoes", description: "Creamy burrata, basil pesto, and aged balsamic.", price: "₹850" },
    { name: "Crispy Calamari", description: "Lightly battered squid with lemon aioli.", price: "₹750" },
    { name: "Wild Mushroom Soup", description: "Velvety cream of mushroom with truffle oil.", price: "₹650" },
    { name: "Tuna Tartare", description: "Fresh tuna with avocado and soy-ginger dressing.", price: "₹950" }
  ],
  "Main Course": [
    { name: "Herb-Crusted Lamb Chops", description: "Grilled lamb with mint jelly and roasted vegetables.", price: "₹1,950" },
    { name: "Pan-Seared Scallops", description: "Jumbo scallops with pea purée and pancetta.", price: "₹1,750" },
    { name: "Roasted Corn-Fed Chicken", description: "Thyme-infused chicken with garlic mash.", price: "₹1,450" },
    { name: "Vegetable Wellington", description: "Seasonal vegetables in puff pastry with red wine jus.", price: "₹1,250" }
  ],
  Desserts: [
    { name: "Valrhona Chocolate Fondant", description: "Warm chocolate cake with vanilla bean gelato.", price: "₹650" },
    { name: "Lemon Meringue Tart", description: "Zesty lemon curd with toasted meringue.", price: "₹550" },
    { name: "Crème Brûlée", description: "Classic vanilla custard with caramelized sugar.", price: "₹600" },
    { name: "Artisanal Cheese Platter", description: "Selection of local and imported cheeses.", price: "₹850" }
  ],
  Beverages: [
    { name: "Aurora Signature Cocktail", description: "Gin, elderflower, and fresh cucumber.", price: "₹750" },
    { name: "Vintage Cabernet Sauvignon", description: "Full-bodied red with notes of oak.", price: "₹1,200/glass" },
    { name: "Sparkling Elderflower Pressé", description: "Refreshing non-alcoholic mocktail.", price: "₹450" },
    { name: "Single Origin Espresso", description: "Rich and aromatic coffee.", price: "₹250" }
  ]
};

const REVIEWS: Review[] = [
  { name: "Ananya Sharma", rating: 5, comment: "An absolutely magical evening. The truffle risotto is to die for, and the service is impeccable." },
  { name: "Vikram Malhotra", rating: 5, comment: "The best fine dining experience in Bangalore. The ambience is sophisticated yet warm." },
  { name: "Priya Das", rating: 4, comment: "Exquisite food presentation. The sea bass was cooked to perfection. Highly recommended." }
];

const JOBS: Job[] = [
  { title: "Bartender", description: "Crafting signature cocktails and providing exceptional bar service." },
  { title: "Head Chef", description: "Leading our culinary team to maintain the highest standards of excellence." },
  { title: "Server", description: "Delivering a seamless and elegant dining experience to our guests." },
  { title: "Manager", description: "Overseeing daily operations and ensuring guest satisfaction." }
];

const GALLERY_IMAGES = [
  "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1550966842-28c2e200ee91?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1544148103-0773bf10d330?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?q=80&w=800&auto=format&fit=crop"
];

// --- Components ---

const SectionTitle = ({ title, subtitle, light = false }: { title: string; subtitle?: string; light?: boolean }) => (
  <div className="text-center mb-16">
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`text-4xl md:text-5xl font-display mb-4 ${light ? 'text-white' : 'text-gold'}`}
    >
      {title}
    </motion.h2>
    {subtitle && (
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="text-gray-400 max-w-2xl mx-auto italic font-serif text-lg"
      >
        {subtitle}
      </motion.p>
    )}
    <div className="w-24 h-1 bg-gold mx-auto mt-6"></div>
  </div>
);

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "Menu", href: "#menu" },
    { name: "About Us", href: "#about" },
    { name: "Careers", href: "#careers" },
    { name: "Order Online", href: "#order", external: true },
    { name: "Reservations", href: "#reservations" },
  ];

  return (
    <div className="min-h-screen bg-charcoal selection:bg-gold selection:text-charcoal">
      {/* Header */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-charcoal/95 backdrop-blur-md py-4 shadow-xl border-b border-white/5' : 'bg-transparent py-8'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <a href="#home" className="text-2xl md:text-3xl font-display tracking-widest text-gold font-bold">
            AURORA DINING
          </a>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.external ? "https://www.swiggy.com" : link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
                className="text-sm uppercase tracking-widest font-medium hover:text-gold transition-colors duration-300"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Mobile Menu Toggle */}
          <button className="lg:hidden text-gold" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={28} /> : <MenuIcon size={28} />}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:hidden absolute top-full left-0 w-full bg-charcoal border-b border-white/10 py-8 px-6 space-y-6 flex flex-col items-center"
          >
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.external ? "https://www.swiggy.com" : link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-lg uppercase tracking-widest font-medium hover:text-gold"
              >
                {link.name}
              </a>
            ))}
          </motion.div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=1920&auto=format&fit=crop" 
            alt="Aurora Ambience" 
            className="w-full h-full object-cover scale-105"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-black/60"></div>
        </div>

        <div className="relative z-10 text-center px-6 max-w-4xl">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-gold uppercase tracking-[0.3em] text-sm font-semibold mb-6 block"
          >
            Welcome to Aurora
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-8xl font-display text-white mb-8 leading-tight"
          >
            An Elevated Fine <br /> Dining Experience
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-gray-300 text-lg md:text-xl font-serif italic mb-12 max-w-2xl mx-auto"
          >
            Where culinary excellence meets unforgettable moments. Discover a world of crafted flavors in the heart of Bangalore.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <a href="#reservations" className="px-10 py-4 bg-gold text-charcoal font-bold uppercase tracking-widest hover:bg-white transition-all duration-300 rounded-sm w-full sm:w-auto">
              Reserve a Table
            </a>
            <a href="#menu" className="px-10 py-4 border border-white/30 text-white font-bold uppercase tracking-widest hover:bg-white hover:text-charcoal transition-all duration-300 rounded-sm w-full sm:w-auto">
              Explore Menu
            </a>
          </motion.div>
        </div>

        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-gold opacity-50"
        >
          <div className="w-px h-16 bg-gradient-to-b from-gold to-transparent"></div>
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 px-6 bg-deep-brown/20">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-gold uppercase tracking-widest text-sm font-semibold mb-4 block">Our Story</span>
              <h2 className="text-4xl md:text-6xl font-display mb-8 text-white">Crafting Memories, One Plate at a Time</h2>
              <p className="text-gray-400 text-lg leading-relaxed mb-8 font-serif italic">
                Founded with a vision to redefine fine dining in Bangalore, Aurora Dining is more than just a restaurant. It's a sanctuary for those who appreciate the art of gastronomy. Our commitment is to inspire change through culinary excellence, ensuring every guest leaves with a story to tell.
              </p>
              
              <div className="grid grid-cols-2 gap-8 mb-12">
                <div className="border-l-2 border-gold pl-6">
                  <h4 className="text-2xl font-display text-gold mb-2">15+</h4>
                  <p className="text-xs uppercase tracking-widest text-gray-500">Years of Excellence</p>
                </div>
                <div className="border-l-2 border-gold pl-6">
                  <h4 className="text-2xl font-display text-gold mb-2">3</h4>
                  <p className="text-xs uppercase tracking-widest text-gray-500">Michelin Star Chefs</p>
                </div>
              </div>

              <div className="space-y-8">
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-gold">
                    <img src="https://picsum.photos/seed/ceo/200" alt="Founder" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                  <div>
                    <h5 className="text-xl font-display text-white">Rajiv Vardhan</h5>
                    <p className="text-sm text-gold uppercase tracking-widest">Founder & CEO</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-gold">
                    <img src="https://picsum.photos/seed/chef1/200" alt="Chef" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                  <div>
                    <h5 className="text-xl font-display text-white">Chef Marco Rossi</h5>
                    <p className="text-sm text-gold uppercase tracking-widest">Executive Head Chef</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-4"
            >
              <div className="space-y-4">
                <img src="https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=600&auto=format&fit=crop" alt="Ambience 1" className="w-full h-64 object-cover rounded-sm" referrerPolicy="no-referrer" />
                <img src="https://images.unsplash.com/photo-1550966842-28c2e200ee91?q=80&w=600&auto=format&fit=crop" alt="Food 1" className="w-full h-80 object-cover rounded-sm" referrerPolicy="no-referrer" />
              </div>
              <div className="space-y-4 pt-12">
                <img src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=600&auto=format&fit=crop" alt="Ambience 2" className="w-full h-80 object-cover rounded-sm" referrerPolicy="no-referrer" />
                <img src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=600&auto=format&fit=crop" alt="Food 2" className="w-full h-64 object-cover rounded-sm" referrerPolicy="no-referrer" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Signature Dishes */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <SectionTitle 
            title="Signature Dishes" 
            subtitle="A curated selection of our most beloved creations, crafted with passion and precision."
          />
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {SIGNATURE_DISHES.map((dish, idx) => (
              <motion.div 
                key={dish.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group cursor-pointer"
              >
                <div className="relative overflow-hidden mb-6 aspect-[4/5]">
                  <img 
                    src={dish.image} 
                    alt={dish.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500"></div>
                  <div className="absolute bottom-6 right-6 bg-gold text-charcoal px-4 py-2 font-bold text-lg">
                    {dish.price}
                  </div>
                </div>
                <h3 className="text-2xl font-display text-white mb-2 group-hover:text-gold transition-colors">{dish.name}</h3>
                <p className="text-gray-400 font-serif italic text-sm leading-relaxed">{dish.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section id="menu" className="py-24 px-6 bg-deep-brown/10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl -mr-48 -mt-48"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl -ml-48 -mb-48"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <SectionTitle 
            title="The Menu" 
            subtitle="Explore our seasonal menu featuring the finest ingredients sourced from local artisans."
          />

          <div className="grid lg:grid-cols-2 gap-x-20 gap-y-16">
            {Object.entries(MENU_CATEGORIES).map(([category, items], catIdx) => (
              <motion.div 
                key={category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: catIdx * 0.1 }}
              >
                <h3 className="text-3xl font-display text-gold mb-10 border-b border-gold/20 pb-4 inline-block">{category}</h3>
                <div className="space-y-8">
                  {items.map((item) => (
                    <div key={item.name} className="flex justify-between items-start group">
                      <div className="max-w-[80%]">
                        <h4 className="text-xl font-display text-white mb-1 group-hover:text-gold transition-colors">{item.name}</h4>
                        <p className="text-gray-500 text-sm font-serif italic">{item.description}</p>
                      </div>
                      <span className="text-gold font-medium">{item.price}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-20 text-center">
            <a href="#order" className="inline-flex items-center gap-2 text-gold uppercase tracking-[0.2em] font-bold hover:gap-4 transition-all duration-300">
              Order Online <ChevronRight size={20} />
            </a>
          </div>
        </div>
      </section>

      {/* Reservation Section */}
      <section id="reservations" className="py-24 px-6 bg-charcoal relative">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1920&auto=format&fit=crop" 
            alt="Reservation Background" 
            className="w-full h-full object-cover opacity-20"
            referrerPolicy="no-referrer"
          />
        </div>
        
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="bg-deep-brown/40 backdrop-blur-xl p-8 md:p-16 border border-white/5 rounded-sm shadow-2xl">
            <SectionTitle 
              title="Make a Reservation" 
              subtitle="Secure your table for an evening of culinary delight. We look forward to hosting you."
              light
            />
            
            <form className="grid md:grid-cols-2 gap-8" onSubmit={(e) => e.preventDefault()}>
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-gold font-semibold">Number of Guests</label>
                <select className="w-full bg-white/5 border border-white/10 p-4 text-white focus:outline-none focus:border-gold transition-colors">
                  <option className="bg-charcoal">1 Guest</option>
                  <option className="bg-charcoal">2 Guests</option>
                  <option className="bg-charcoal">4 Guests</option>
                  <option className="bg-charcoal">6+ Guests</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-gold font-semibold">Date</label>
                <input type="date" className="w-full bg-white/5 border border-white/10 p-4 text-white focus:outline-none focus:border-gold transition-colors" />
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-gold font-semibold">Time</label>
                <select className="w-full bg-white/5 border border-white/10 p-4 text-white focus:outline-none focus:border-gold transition-colors">
                  <option className="bg-charcoal">7:00 PM</option>
                  <option className="bg-charcoal">8:00 PM</option>
                  <option className="bg-charcoal">9:00 PM</option>
                  <option className="bg-charcoal">10:00 PM</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-gold font-semibold">Phone Number</label>
                <input type="tel" placeholder="+91 00000 00000" className="w-full bg-white/5 border border-white/10 p-4 text-white focus:outline-none focus:border-gold transition-colors" />
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="text-xs uppercase tracking-widest text-gold font-semibold">Full Name</label>
                <input type="text" placeholder="Your Name" className="w-full bg-white/5 border border-white/10 p-4 text-white focus:outline-none focus:border-gold transition-colors" />
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="text-xs uppercase tracking-widest text-gold font-semibold">Email Address</label>
                <input type="email" placeholder="your@email.com" className="w-full bg-white/5 border border-white/10 p-4 text-white focus:outline-none focus:border-gold transition-colors" />
              </div>
              <div className="md:col-span-2 pt-6">
                <button className="w-full bg-gold text-charcoal py-5 font-bold uppercase tracking-widest hover:bg-white transition-all duration-300 rounded-sm">
                  Confirm Reservation
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Careers Section */}
      <section id="careers" className="py-24 px-6 bg-deep-brown/5">
        <div className="max-w-7xl mx-auto">
          <SectionTitle 
            title="Join Our Team" 
            subtitle="Be part of a passionate team dedicated to delivering excellence. We're always looking for talented individuals to join the Aurora family."
          />

          <div className="grid md:grid-cols-2 gap-8">
            {JOBS.map((job, idx) => (
              <motion.div 
                key={job.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="p-8 border border-white/10 bg-white/5 hover:border-gold/50 transition-all duration-500 group"
              >
                <h4 className="text-2xl font-display text-white mb-4 group-hover:text-gold transition-colors">{job.title}</h4>
                <p className="text-gray-400 mb-8 font-serif italic">{job.description}</p>
                <button className="text-gold uppercase tracking-widest text-sm font-bold flex items-center gap-2 hover:gap-4 transition-all">
                  Apply Now <ChevronRight size={16} />
                </button>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-16 text-center">
            <p className="text-gray-500 font-serif italic">
              Don't see a position for you? Send your resume to <a href="mailto:careers@auroradining.com" className="text-gold border-b border-gold/30">careers@auroradining.com</a>
            </p>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-24 px-6 bg-charcoal">
        <div className="max-w-7xl mx-auto">
          <SectionTitle 
            title="Gallery" 
            subtitle="A glimpse into the world of Aurora. From our kitchen to your table."
          />
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {GALLERY_IMAGES.map((img, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className="relative aspect-square overflow-hidden group"
              >
                <img 
                  src={img} 
                  alt={`Gallery ${idx}`} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gold/0 group-hover:bg-gold/20 transition-colors duration-500"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-24 px-6 bg-deep-brown/20">
        <div className="max-w-7xl mx-auto">
          <SectionTitle 
            title="Guest Experiences" 
            subtitle="What our guests have to say about their time at Aurora Dining."
          />
          
          <div className="grid md:grid-cols-3 gap-10">
            {REVIEWS.map((review, idx) => (
              <motion.div 
                key={review.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="text-center p-10 bg-charcoal/50 border border-white/5 relative"
              >
                <div className="flex justify-center gap-1 mb-6">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} size={16} className="fill-gold text-gold" />
                  ))}
                </div>
                <p className="text-gray-300 italic font-serif text-lg leading-relaxed mb-8">"{review.comment}"</p>
                <h5 className="text-gold uppercase tracking-widest text-sm font-bold">{review.name}</h5>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Order Online CTA */}
      <section id="order" className="py-24 px-6 bg-gold text-charcoal text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-display mb-8">Bring Aurora Home</h2>
          <p className="text-lg mb-12 font-serif italic opacity-80">
            Experience our signature dishes from the comfort of your home. Fast, fresh, and delivered with care.
          </p>
          <a 
            href="https://www.swiggy.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-block px-12 py-5 bg-charcoal text-white font-bold uppercase tracking-widest hover:bg-white hover:text-charcoal transition-all duration-300 rounded-sm"
          >
            Order Now
          </a>
        </div>
      </section>

      {/* Visit Us Section */}
      <section className="py-24 px-6 bg-charcoal">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-6xl font-display mb-10 text-gold">Visit Us</h2>
              
              <div className="space-y-10">
                <div className="flex gap-6">
                  <MapPin className="text-gold shrink-0" size={28} />
                  <div>
                    <h5 className="text-xl font-display text-white mb-2">Location</h5>
                    <p className="text-gray-400 font-serif italic">123 Lavelle Road, Bangalore, <br /> Karnataka 560001, India</p>
                  </div>
                </div>
                
                <div className="flex gap-6">
                  <div className="text-gold shrink-0">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                  </div>
                  <div>
                    <h5 className="text-xl font-display text-white mb-2">Opening Hours</h5>
                    <div className="grid grid-cols-2 gap-x-12 gap-y-2 text-gray-400 font-serif italic">
                      <span>Lunch</span>
                      <span>12:00 PM - 3:30 PM</span>
                      <span>Dinner</span>
                      <span>7:00 PM - 11:30 PM</span>
                      <span>Mon - Sun</span>
                      <span>Open Daily</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-6">
                  <Phone className="text-gold shrink-0" size={28} />
                  <div>
                    <h5 className="text-xl font-display text-white mb-2">Contact</h5>
                    <p className="text-gray-400 font-serif italic">+91 80 4567 8900</p>
                    <p className="text-gray-400 font-serif italic">info@auroradining.com</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="h-[500px] bg-white/5 border border-white/10 rounded-sm overflow-hidden relative"
            >
              {/* Placeholder for Map */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-10">
                <MapPin size={48} className="text-gold mb-6 opacity-50" />
                <h4 className="text-2xl font-display text-white mb-4">Find Us on the Map</h4>
                <p className="text-gray-500 font-serif italic mb-8">We are located in the heart of Bangalore's vibrant dining district.</p>
                <div className="w-full h-full absolute inset-0 bg-[url('https://images.unsplash.com/photo-1526772662000-3f88f10405ff?q=80&w=1000&auto=format&fit=crop')] bg-cover opacity-20 grayscale"></div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-6 bg-deep-brown border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-16 mb-16">
            <div className="md:col-span-2">
              <a href="#home" className="text-3xl font-display tracking-widest text-gold font-bold mb-6 block">
                AURORA DINING
              </a>
              <p className="text-gray-400 font-serif italic text-lg max-w-md leading-relaxed">
                Step into a world of enchanting beauty with culinary excellence and crafted experiences. Our passion is your pleasure.
              </p>
              <div className="flex gap-6 mt-8">
                <a href="#" className="text-gray-500 hover:text-gold transition-colors"><Instagram size={24} /></a>
                <a href="#" className="text-gray-500 hover:text-gold transition-colors"><Facebook size={24} /></a>
                <a href="#" className="text-gray-500 hover:text-gold transition-colors"><Twitter size={24} /></a>
              </div>
            </div>
            
            <div>
              <h5 className="text-gold uppercase tracking-widest text-sm font-bold mb-8">Quick Links</h5>
              <ul className="space-y-4">
                {navLinks.map(link => (
                  <li key={link.name}>
                    <a href={link.href} className="text-gray-500 hover:text-white transition-colors text-sm uppercase tracking-widest">{link.name}</a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h5 className="text-gold uppercase tracking-widest text-sm font-bold mb-8">Contact Info</h5>
              <ul className="space-y-4 text-gray-500 font-serif italic">
                <li>123 Lavelle Road, Bangalore</li>
                <li>+91 80 4567 8900</li>
                <li>info@auroradining.com</li>
              </ul>
            </div>
          </div>
          
          <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-gray-600 text-sm">© 2026 Aurora Dining. All Rights Reserved.</p>
            <div className="flex gap-8 text-gray-600 text-xs uppercase tracking-widest">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
