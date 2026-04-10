import { IndustrySubpageTemplate } from '../IndustrySubpageTemplate';
import img210 from "figma:asset/21e74063021aae208507930303fe8a1823d593eb.png";

interface GraphicDesignServicesProps {
  onNavigate: (page: string, slug?: string) => void;
}

export function GraphicDesignServices({ onNavigate }: GraphicDesignServicesProps) {
  return (
    <IndustrySubpageTemplate
      category="Graphic Design Services"
      headline="Graphic Design That Communicates"
      subheadline="Design isn't decoration. It's communication."
      heroImage="https://images.unsplash.com/photo-1626785774573-4b799315345d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
      description="Bad design costs you customers before they read a word. Amateur graphics signal amateur business. Your competitors with professional design win by default. CIELO provides comprehensive graphic design services that elevate your brand across every touchpoint—from pitch decks to packaging."
      realityText="Your PowerPoint decks look like 1999. Marketing materials scream 'template.' Presentation design undermines your message. No consistent visual identity. DIY graphics hurt credibility."
      deliverables={[
        { title: "Marketing Collateral Design", description: "Brochures, flyers, posters, banners, trade show materials" },
        { title: "Presentation Design Services", description: "Pitch decks, sales presentations, investor decks, conference talks" },
        { title: "Infographic Design Services", description: "Data visualization, process diagrams, educational graphics" },
        { title: "Packaging Design Services", description: "Product packaging, labels, boxes, bags, inserts" },
        { title: "Print Design", description: "Business cards, letterhead, folders, catalogs, annual reports" },
        { title: "Digital Graphics", description: "Social media graphics, email headers, website graphics, digital ads" }
      ]}
      whoThisIsFor="Established businesses, startups, nonprofits, corporate teams, sales organizations"
      timeline="1–3 weeks"
      investment="Starting at $2K per design project"
      ctaHeadline="Elevate every visual touchpoint."
      ctaButtonText="Start Design Project"
      faqs={[
        { question: "What's included in presentation design?", answer: "Custom slide templates, data visualization, brand-aligned graphics, master slide setup, and editable source files for future presentations." },
        { question: "Do you provide print-ready files?", answer: "Yes. All print projects include high-resolution PDFs, proper bleeds, color profiles (CMYK), and printer specifications for flawless production." },
        { question: "Can you design infographics from our data?", answer: "Absolutely. We transform complex data, processes, and concepts into clear, engaging infographics that communicate effectively." },
        { question: "Do you offer ongoing design support?", answer: "Yes. Monthly retainers provide on-demand design support for marketing materials, presentations, social graphics, and digital assets." }
      ]}
      strategist={{
        name: "Emily Torres",
        title: "Visual Communication Designer",
        image: img210,
        calloutText: "Design communicates before words do",
        calloutDescription: "I've designed 1,000+ assets for brands that needed to communicate complex ideas clearly and convert prospects visually."
      }}
      onNavigate={onNavigate}
    />
  );
}