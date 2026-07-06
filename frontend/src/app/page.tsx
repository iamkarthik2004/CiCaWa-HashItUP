import Link from 'next/link';
import { Recycle, Users, ShoppingBag, MessageSquare } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-500 to-emerald-600 flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-4xl bg-white/10 backdrop-blur-md rounded-2xl p-8 lg:p-12 shadow-2xl border border-white/10 text-white">
        {/* Hero Section */}
        <div className="text-center mb-10">
          <div className="flex justify-center mb-6">
            <div className="bg-white/20 rounded-full p-5 shadow-inner">
              <Recycle className="h-16 w-16 text-white" />
            </div>
          </div>
          <h1 className="text-5xl font-extrabold tracking-tight mb-4">CiCaWa</h1>
          <p className="text-2xl font-light opacity-90 mb-3">Waste Management Platform</p>
          <p className="text-base opacity-75 max-w-lg mx-auto">
            Turn your waste into value, connect with workers, and make a difference in your community.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <FeatureCard 
            icon={<Recycle className="h-6 w-6" />}
            title="Waste Pickup"
            description="AI-powered waste classification and pickup requests."
          />
          <FeatureCard 
            icon={<Users className="h-6 w-6" />}
            title="Connect Workers"
            description="Find and coordinate with nearby Haritha Karma workers."
          />
          <FeatureCard 
            icon={<ShoppingBag className="h-6 w-6" />}
            title="Marketplace"
            description="Buy and sell recycled materials and upcycled products."
          />
          <FeatureCard 
            icon={<MessageSquare className="h-6 w-6" />}
            title="Real-time Chat"
            description="Directly chat with workers, buyers, and sellers."
          />
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
          <Link
            href="/auth/login"
            className="flex-1 bg-white text-emerald-600 py-3.5 px-6 rounded-xl font-bold text-center text-lg shadow-lg hover:bg-emerald-50 transition-all duration-200"
          >
            Sign In
          </Link>
          <Link
            href="/auth/register"
            className="flex-1 bg-emerald-700 text-white py-3.5 px-6 rounded-xl font-bold text-center text-lg border-2 border-emerald-400 hover:bg-emerald-800 transition-all duration-200"
          >
            Get Started
          </Link>
        </div>
      </div>

      {/* Bottom Info */}
      <div className="mt-8 max-w-md w-full px-4">
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-white/80 text-sm text-center border border-white/5">
          <p>
            Join thousands of users making waste management efficient and profitable.
          </p>
        </div>
      </div>
    </div>
  );
}

function FeatureCard({ 
  icon, 
  title, 
  description 
}: { 
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-white/10 rounded-xl p-5 border border-white/10 hover:bg-white/20 transition-all duration-200">
      <div className="text-emerald-300 mb-3 bg-white/10 w-10 h-10 rounded-lg flex items-center justify-center">{icon}</div>
      <h3 className="font-bold text-lg text-white mb-1.5">{title}</h3>
      <p className="text-sm text-white opacity-85 leading-relaxed">{description}</p>
    </div>
  );
}