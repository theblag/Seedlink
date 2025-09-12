import React from 'react'
import { useNavigate, Link } from 'react-router-dom'

const Landing = () => {
  const navigate = useNavigate()
  
  return (
    <div className="min-h-screen bg-bg-primary text-white">
      {/* Hero Section */}
      <header className="container mx-auto px-4 py-8 flex justify-between items-center">
        <div className="text-2xl font-bold">
          <span className="tracking-wide">VisioBiz<span className="text-gold-primary font-extrabold">AI</span></span>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="py-16 md:py-24 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="md:w-1/2 space-y-6">
                <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                  Empower Local Businesses with <span className="text-gold-primary">AI + AR</span> Technology
                </h1>
                <p className="text-lg md:text-xl opacity-90">
                  VisioBiz AI helps local Indian businesses create immersive, trustworthy digital storefronts with just a few photos or videos.
                </p>
                <div className="pt-4">
                  <button 
                    onClick={() => navigate('/signin')} 
                    className="bg-gold-primary text-black px-6 py-3 rounded-lg font-medium text-lg hover:bg-gold-light transition-all hover:-translate-y-1 shadow-lg"
                  >
                    Get Started
                  </button>
                </div>
              </div>
              <div className="md:w-1/2 flex justify-center">
                <div className="w-full max-w-md h-80 bg-teal/20 rounded-xl flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-teal/30 to-gold-primary/30 z-0"></div>
                  <div className="z-10 text-center p-6">
                    <div className="text-5xl mb-4">🏪✨</div>
                    <p className="text-xl font-medium">AR Store Preview</p>
                    <p className="opacity-80">Interactive 360° experience</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-black/30 px-4">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold text-center mb-12">Core <span className="text-gold-primary">Features</span></h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="bg-bg-primary p-6 rounded-xl border border-gold-primary/30 hover:border-gold-primary/70 transition-all hover:-translate-y-1 shadow-md">
                <div className="text-gold-primary text-4xl mb-4">🔄</div>
                <h3 className="text-xl font-bold mb-2">AI Photo-to-AR Store</h3>
                <p className="opacity-80">Upload 4-5 photos and get a 360° AR-like walkthrough preview of your shop.</p>
              </div>
              
              {/* Feature 2 */}
              <div className="bg-bg-primary p-6 rounded-xl border border-gold-primary/30 hover:border-gold-primary/70 transition-all hover:-translate-y-1 shadow-md">
                <div className="text-gold-primary text-4xl mb-4">📊</div>
                <h3 className="text-xl font-bold mb-2">Smart Catalog Generation</h3>
                <p className="opacity-80">AI automatically detects items from photos and creates structured listings.</p>
              </div>
              
              {/* Feature 3 */}
              <div className="bg-bg-primary p-6 rounded-xl border border-gold-primary/30 hover:border-gold-primary/70 transition-all hover:-translate-y-1 shadow-md">
                <div className="text-gold-primary text-4xl mb-4">🤖</div>
                <h3 className="text-xl font-bold mb-2">AI Shop Assistant</h3>
                <p className="opacity-80">Each shop gets its own AI agent trained on the shop's data to assist customers.</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Business?</h2>
            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">Join thousands of local businesses already using VisioBiz AI to create immersive digital experiences.</p>
            <button 
              onClick={() => navigate('/signup')} 
              className="bg-teal text-white px-8 py-3 rounded-lg font-medium text-lg hover:opacity-90 transition-all hover:-translate-y-1 shadow-lg"
            >
              Create Your Account
            </button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-black/40 py-8 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              <div className="text-xl font-bold">
                <span>VisioBiz<span className="text-gold-primary">AI</span></span>
              </div>
              <p className="opacity-70 text-sm">Empowering local businesses with AI technology</p>
            </div>
            <div className="flex gap-6">
              <Link to="/about" className="text-white hover:text-gold-light">About</Link>
              <Link to="/features" className="text-white hover:text-gold-light">Features</Link>
              <Link to="/contact" className="text-white hover:text-gold-light">Contact</Link>
            </div>
          </div>
          <div className="mt-8 text-center opacity-60 text-sm">
            © {new Date().getFullYear()} VisioBiz AI. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Landing
