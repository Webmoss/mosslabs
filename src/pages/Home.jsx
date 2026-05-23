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
      <ScrollProgress />
      <Navbar />
      <HeroSection />
      <ServicesSection />
      <WorkSection />
      <TestimonialsSection />
      <PricingSection />
      <BlogSection onPostClick={setSelectedPost} />
      <ContactSection />
      <Footer />
      <BlogPostModal post={selectedPost} onClose={() => setSelectedPost(null)} />
    </div>
  );
}
