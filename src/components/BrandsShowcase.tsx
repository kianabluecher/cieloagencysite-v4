import { OverlappingCircles } from './OverlappingCircles';
import logo1 from 'figma:asset/fb1b0fde222dc3b383d7395c4b9fc43a6db37bcd.png';
import logo2 from 'figma:asset/661ab0f38883658ac215134f7a2580521ca30949.png';
import logo3 from 'figma:asset/a4bc550a23aeaa39674095c933d4dbb7739973d3.png';
import logo4 from 'figma:asset/3acf091f0d2cf1009a76013a38ee85bba600e999.png';
import logo5 from 'figma:asset/21b618833049aaf2f0604595402c6b7d92d120b1.png';
import logo6 from 'figma:asset/bb78df57a783f1cb762fc62a64063109dcddb04e.png';

export function BrandsShowcase() {
  // Brand logos
  const brands = [
    { name: 'Brand 1', image: logo1 },
    { name: 'Brand 2', image: logo2 },
    { name: 'Brand 3', image: logo3 },
    { name: 'Brand 4', image: logo4 },
    { name: 'Brand 5', image: logo5 },
    { name: 'Brand 6', image: logo6 },
  ];

  // Split brands into two rows to avoid showing same logo at same time
  const row1Brands = [brands[0], brands[1], brands[2]];
  const row2Brands = [brands[3], brands[4], brands[5]];

  // Duplicate brands for seamless infinite scroll
  const duplicatedBrands = [...brands, ...brands, ...brands];
  const duplicatedRow1 = [...row1Brands, ...row1Brands, ...row1Brands];
  const duplicatedRow2 = [...row2Brands, ...row2Brands, ...row2Brands];

  return (
    <section className="px-6 md:pt-2 pb-[130px] border-t border-[#1f2228] overflow-visible pt-[56px] pr-[21px] pl-[21px]">
      <div className="max-w-7xl mx-auto overflow-visible">
        {/* Brands Section */}
        <div className="mb-12 md:mb-20 relative">
          {/* Mobile - Slideshow */}
          <div className="md:hidden">
            {/* Text heading */}
            <p className="font-['Geist_Mono'] text-white text-sm uppercase tracking-wider leading-relaxed mb-8">
              SOME OF THE BRANDS WE HAVE<br />
              BUILT AND WORKED WITH
            </p>
            
            {/* Scrolling logos */}
            <div className="relative overflow-hidden">
              {/* Grey gradients on both ends */}
              <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#0a0a0a] to-transparent pointer-events-none z-10" />
              <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#0a0a0a] to-transparent pointer-events-none z-10" />
              
              {/* Two rows of scrolling logos */}
              <div className="space-y-1">
                {/* First row - scrolls left (logos 1-3) */}
                <div 
                  className="flex items-center gap-8 py-3"
                  style={{
                    animation: 'brandScroll 15s linear infinite',
                  }}
                >
                  {duplicatedRow1.map((brand, index) => (
                    <div 
                      key={`row1-${brand.name}-${index}`}
                      className="flex items-center justify-center shrink-0"
                    >
                      <img 
                        src={brand.image} 
                        alt={brand.name}
                        className="h-20 w-auto opacity-40 object-contain"
                      />
                    </div>
                  ))}
                </div>
                
                {/* Second row - scrolls right (logos 4-6) */}
                <div 
                  className="flex items-center gap-8 py-3"
                  style={{
                    animation: 'brandScrollReverse 15s linear infinite',
                  }}
                >
                  {duplicatedRow2.map((brand, index) => (
                    <div 
                      key={`row2-${brand.name}-${index}`}
                      className="flex items-center justify-center shrink-0"
                    >
                      <img 
                        src={brand.image} 
                        alt={brand.name}
                        className="h-20 w-auto opacity-40 object-contain"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Desktop - Scrolling Brand Logos */}
          <div className="hidden md:block relative overflow-hidden">
            {/* Text overlay on left */}
            <div className="absolute left-0 top-0 bottom-0 flex items-center z-20 pointer-events-none">
              <p className="font-['Geist_Mono'] text-white text-sm uppercase tracking-wider leading-relaxed">
                SOME OF THE BRANDS WE HAVE<br />
                BUILT AND WORKED WITH
              </p>
            </div>
            
            {/* Grey gradients on both ends */}
            <div className="absolute left-0 top-0 bottom-0 w-96 md:w-[700px] bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/90 to-transparent pointer-events-none z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-32 md:w-48 bg-gradient-to-l from-[#0a0a0a] to-transparent pointer-events-none z-10" />
            
            {/* Scrolling container */}
            <div 
              className="flex items-center gap-6 md:gap-8 pt-8 pb-16"
              style={{
                animation: 'brandScroll 12s linear infinite',
              }}
            >
              {duplicatedBrands.map((brand, index) => (
                <div 
                  key={`${brand.name}-${index}`}
                  className="flex items-center justify-center shrink-0"
                >
                  <img 
                    src={brand.image} 
                    alt={brand.name}
                    className="h-16 md:h-24 w-auto opacity-40 hover:opacity-60 transition-opacity"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Everything You Need Section */}
        <div className="relative pt-12 md:pt-40 lg:pt-56 pb-8 md:pb-3 flex justify-center">
          <OverlappingCircles />
        </div>
      </div>
    </section>
  );
}