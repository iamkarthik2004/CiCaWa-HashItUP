import Link from 'next/link';
import { 
  Recycle, Users, ShoppingBag, MessageSquare, 
  Leaf, ArrowRight, User, Plus, Home, MapPin, Search 
} from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#07130c] font-sans overflow-hidden text-gray-200">
      
      {/* Background ambient light */}
      <div className="absolute top-0 right-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[800px] h-[800px] rounded-full bg-emerald-900/20 blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-green-900/20 blur-[100px]" />
      </div>

      {/* Navbar */}
      <nav className="relative z-50 flex items-center justify-between px-6 lg:px-16 py-6 border-b border-white/5 bg-[#07130c]/80 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.5)]">
            <Recycle className="text-black w-6 h-6" />
          </div>
          <span className="text-xl font-bold text-white tracking-tight">CiCaWa</span>
        </div>
        
        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          <Link href="/" className="text-emerald-400 border-b-2 border-emerald-400 pb-1">Home</Link>
          <Link href="/about" className="text-gray-400 hover:text-white transition-colors">About</Link>
          <Link href="/features" className="text-gray-400 hover:text-white transition-colors">Features</Link>
          <Link href="/marketplace" className="text-gray-400 hover:text-white transition-colors">Marketplace</Link>
          <Link href="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link>
        </div>

        <div className="flex items-center gap-4">
          <Link 
            href="/auth/login" 
            className="hidden sm:flex items-center gap-2 px-5 py-2.5 rounded-xl border border-white/10 hover:bg-white/5 text-white text-sm font-medium transition-colors"
          >
            <User className="w-4 h-4" />
            Sign In
          </Link>
          <Link 
            href="/auth/register" 
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black text-sm font-bold transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_25px_rgba(16,185,129,0.5)]"
          >
            Get Started
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </nav>

      {/* Main Hero Section */}
      <main className="relative z-10 flex flex-col lg:flex-row items-center px-6 lg:px-16 pt-16 pb-24 max-w-7xl mx-auto gap-12 lg:gap-8">
        
        {/* Left Column - Content */}
        <div className="flex-1 w-full flex flex-col items-center lg:items-start text-center lg:text-left">
          
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-emerald-800/60 bg-emerald-900/30 text-emerald-400 text-xs font-semibold tracking-wide mb-8">
            <Leaf className="w-3.5 h-3.5" />
            Smart Waste. Clean Future.
          </div>

          <h1 className="text-6xl sm:text-7xl font-extrabold tracking-tight mb-2">
            <span className="text-emerald-500">CiCaWa</span>
          </h1>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
            Waste Management Platform
          </h2>
          
          <p className="text-gray-400 text-lg mb-10 max-w-xl leading-relaxed">
            Turn your waste into value, connect with workers, and make a difference in your community.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-2xl mb-12">
            <FeatureCard 
              icon={<Recycle className="w-5 h-5" />}
              title="Waste Pickup"
              description="AI-powered waste classification and pickup requests."
            />
            <FeatureCard 
              icon={<Users className="w-5 h-5" />}
              title="Connect Workers"
              description="Find and coordinate with nearby Haritha Karma workers."
            />
            <FeatureCard 
              icon={<ShoppingBag className="w-5 h-5" />}
              title="Marketplace"
              description="Buy and sell recycled materials and upcycled products."
            />
            <FeatureCard 
              icon={<MessageSquare className="w-5 h-5" />}
              title="Real-time Chat"
              description="Directly chat with workers, buyers, and sellers."
            />
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <Link
              href="/auth/login"
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white text-black px-8 py-3.5 rounded-xl font-bold text-base hover:bg-gray-100 transition-colors"
            >
              <User className="w-5 h-5" />
              Sign In
            </Link>
            <Link
              href="/auth/register"
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-emerald-500 text-black px-8 py-3.5 rounded-xl font-bold text-base hover:bg-emerald-400 transition-colors shadow-[0_0_20px_rgba(16,185,129,0.2)]"
            >
              Get Started
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          <div className="mt-8 flex items-center gap-3 text-sm text-gray-500 font-medium">
            <Users className="w-4 h-4 text-emerald-500" />
            Join thousands of users making waste management efficient and profitable.
          </div>
        </div>

        {/* Right Column - Illustration / Mockup */}
        <div className="flex-1 w-full flex justify-center lg:justify-end items-center relative mt-12 lg:mt-0">
          
          {/* Mockup glowing background */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[500px] bg-emerald-500/20 blur-[100px] rounded-full pointer-events-none" />

          {/* AI Powered Badge Floating */}
          <div className="absolute bottom-16 right-0 lg:-left-12 z-20 bg-[#122119] border border-emerald-900/50 p-4 rounded-2xl shadow-2xl backdrop-blur-md hidden sm:block w-56 animate-bounce" style={{animationDuration: '3s'}}>
            <div className="flex items-center gap-2 text-emerald-400 font-bold mb-1">
              <Leaf className="w-4 h-4" />
              AI Powered
            </div>
            <p className="text-xs text-gray-400 leading-relaxed">
              Smart classification for a cleaner tomorrow.
            </p>
          </div>

          {/* Mobile Phone Mockup */}
          <div className="relative z-10 w-[300px] h-[620px] bg-[#f2f7f4] rounded-[2.5rem] border-[8px] border-[#1a2e22] shadow-[20px_20px_60px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col">
            {/* Phone Notch */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-[#1a2e22] rounded-b-xl z-20" />
            
            {/* Phone Content (App UI) */}
            <div className="flex-1 flex flex-col text-gray-800 px-5 pt-12 pb-6 overflow-hidden bg-gradient-to-b from-[#e3efe8] to-[#f4f9f6]">
              
              {/* App Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-1.5">
                  <Recycle className="w-5 h-5 text-emerald-600" />
                  <span className="font-bold text-sm tracking-tight">CiCaWa</span>
                </div>
                <div className="w-8 h-8 rounded-full bg-emerald-200 border-2 border-emerald-500 overflow-hidden" />
              </div>

              {/* Welcome text */}
              <h3 className="font-bold text-xl mb-1 flex items-center gap-2">
                Welcome Back! <Leaf className="text-emerald-500 w-5 h-5" />
              </h3>
              
              {/* Stats Card */}
              <div className="bg-white rounded-2xl p-4 shadow-sm border border-emerald-100 mt-4 mb-6 relative overflow-hidden">
                <div className="absolute right-[-20px] bottom-[-20px] w-24 h-24 bg-emerald-50 rounded-full blur-xl" />
                <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Today's impact</h4>
                <div className="flex justify-between items-end relative z-10">
                  <div className="space-y-3">
                    <div>
                      <p className="text-[10px] text-gray-400">You've recycled</p>
                      <p className="font-bold text-emerald-600">12.5 kg</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-gray-400">CO₂ Reduced</p>
                      <p className="font-bold text-emerald-600">25.4 kg</p>
                    </div>
                  </div>
                  <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center">
                    <Leaf className="text-emerald-500 w-8 h-8" />
                  </div>
                </div>
              </div>

              {/* Quick Access */}
              <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Quick Access</h4>
              <div className="grid grid-cols-4 gap-2 mb-6 text-center">
                <div className="flex flex-col items-center gap-1">
                  <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center mb-1"><Recycle className="w-5 h-5" /></div>
                  <span className="text-[9px] font-medium leading-tight">Waste<br/>Pickup</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-500 flex items-center justify-center mb-1"><Users className="w-5 h-5" /></div>
                  <span className="text-[9px] font-medium leading-tight">Connect<br/>Workers</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-500 flex items-center justify-center mb-1"><ShoppingBag className="w-5 h-5" /></div>
                  <span className="text-[9px] font-medium leading-tight">Marketplace</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-500 flex items-center justify-center mb-1"><MessageSquare className="w-5 h-5" /></div>
                  <span className="text-[9px] font-medium leading-tight">Chat</span>
                </div>
              </div>

              {/* Recent Activity */}
              <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Recent Activity</h4>
              <div className="bg-white rounded-2xl p-3 shadow-sm border border-emerald-100 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                  <Recycle className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <p className="text-[11px] font-bold">Waste Pickup Completed</p>
                  <p className="text-[10px] text-gray-500">Biodegradable Waste</p>
                  <p className="text-[9px] text-gray-400 mt-1">Today, 10:30 AM</p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold text-emerald-600">+150 pt</p>
                  <p className="text-[10px] font-medium mt-1">2.5 kg</p>
                </div>
              </div>

            </div>

            {/* Bottom Nav */}
            <div className="h-16 bg-white border-t border-gray-100 flex justify-between items-center px-6 text-gray-400 z-20">
              <div className="flex flex-col items-center gap-1 text-emerald-500">
                <Home className="w-5 h-5" />
                <span className="text-[8px] font-bold">Home</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <ShoppingBag className="w-5 h-5" />
                <span className="text-[8px] font-bold">Market</span>
              </div>
              <div className="relative -top-4 w-12 h-12 rounded-full bg-emerald-500 text-black flex items-center justify-center shadow-lg shadow-emerald-500/40">
                <Plus className="w-6 h-6" />
              </div>
              <div className="flex flex-col items-center gap-1">
                <MessageSquare className="w-5 h-5" />
                <span className="text-[8px] font-bold">Chat</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <User className="w-5 h-5" />
                <span className="text-[8px] font-bold">Profile</span>
              </div>
            </div>
            
            {/* Home Indicator */}
            <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-24 h-1 bg-gray-300 rounded-full z-30" />
          </div>
        </div>
      </main>



    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="bg-[#0b1811] border border-white/5 rounded-2xl p-5 hover:bg-[#102218] hover:border-emerald-900/50 transition-all duration-300 group">
      <div className="w-10 h-10 rounded-xl bg-[#12261b] group-hover:bg-emerald-900/40 flex items-center justify-center text-emerald-500 mb-4 transition-colors">
        {icon}
      </div>
      <h3 className="font-bold text-white mb-2">{title}</h3>
      <p className="text-sm text-gray-400 leading-relaxed">{description}</p>
    </div>
  );
}
