import { useState } from 'react';
import Navbar from '@/components/mosslabs/Navbar';
import HeroSection from '@/components/mosslabs/HeroSection';
import ServicesSection from '@/components/mosslabs/ServicesSection';
import WorkSection from '@/components/mosslabs/WorkSection';
import PricingSection from '@/components/mosslabs/PricingSection';
import TestimonialsSection from '@/components/mosslabs/TestimonialsSection';
import BlogSection from '@/components/mosslabs/BlogSection';
import ContactSection from '@/components/mosslabs/ContactSection';
import Footer from '@/components/mosslabs/Footer';
import BlogPostModal from '@/components/mosslabs/BlogPostModal';
import ScrollProgress from '@/components/mosslabs/ScrollProgress';

export default function Home() {
  const [selectedPost, setSelectedPost] = useState(null);

  return (
    <div className="mesh-bg min-h-screen w-full min-w-0 overflow-x-clip">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[300] focus:rounded-lg focus:bg-moss-neon focus:px-4 focus:py-2 focus:font-space focus:text-sm focus:font-semibold focus:text-moss-void focus:outline-none focus:ring-2 focus:ring-moss-dew focus:ring-offset-2 focus:ring-offset-moss-void"
      >
        Skip to main content
      </a>
      <ScrollProgress />
      <Navbar />
      <main id="main" tabIndex={-1} className="outline-none">
        <HeroSection />
        <ServicesSection />
        <WorkSection />
        <TestimonialsSection />
        <PricingSection />
        <BlogSection onPostClick={setSelectedPost} />
        <ContactSection />
      </main>
      <Footer />
      <BlogPostModal post={selectedPost} onClose={() => setSelectedPost(null)} />
    </div>
  );
}
