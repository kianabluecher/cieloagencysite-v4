import { Download, ExternalLink, Upload, CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { projectId, publicAnonKey } from '../../utils/supabase/info';

// Import ALL assets from the entire site
// Logos & Branding
import logo1 from 'figma:asset/fb1b0fde222dc3b383d7395c4b9fc43a6db37bcd.png';
import logo2 from 'figma:asset/661ab0f38883658ac215134f7a2580521ca30949.png';
import logo3 from 'figma:asset/a4bc550a23aeaa39674095c933d4dbb7739973d3.png';
import logo4 from 'figma:asset/3acf091f0d2cf1009a76013a38ee85bba600e999.png';
import logo5 from 'figma:asset/21b618833049aaf2f0604595402c6b7d92d120b1.png';
import logo6 from 'figma:asset/bb78df57a783f1cb762fc62a64063109dcddb04e.png';
import logo7 from 'figma:asset/88d7ce755633105c90e62d8bfebe92c242bb3099.png';
import cieloLogo from 'figma:asset/f5ffcf57ca4f4f9d093dc30416ff6cec00f08b1d.png';
import cieloLogoBlack from 'figma:asset/aac9ea24336380213e0d0543a8f002bef7eda579.png';
import signupImage from 'figma:asset/5da311bd486110d77bf1c4c137991ab9cdbf8d73.png';
import whiteHouseLogo from 'figma:asset/6612dbb672696e33b6b0c9b1322cf727c64b9f12.png';

// Home Page
import heroBg from 'figma:asset/aa31cd96ccbff96e6edfe2bd37e99104aa943b45.png';

// Portfolio Images
import sustainableCredit from 'figma:asset/889e624eeede5a73236ef970c77c776d999a2acb.png';
import mastLegal from 'figma:asset/4a4a284c08c4e6597692602869d74834a28d749d.png';
import portfolioImage1 from 'figma:asset/f5a00a97b78dd390039f12d0ebe7beaea23626cb.png';
import portfolioImage2 from 'figma:asset/de7a2be995fb5993aa3d9ae2178616e0bb77ed38.png';
import portfolioImage3 from 'figma:asset/558cce532186e50c532e0ab6ccda7a555b1237f1.png';
import portfolioImage4 from 'figma:asset/248e1e8c3cee5f005c6ae06ae5f2668165c1544b.png';
import mezcalTequila from 'figma:asset/291f3e0593b4d292522a70d11d3977c51df2a464.png';
import portfolioImage6 from 'figma:asset/9186936c1dec3675326e3919db84f1be7e0cca4f.png';
import recoverFaster from 'figma:asset/a92365d5807be518840ba7c3328de879544a9d34.png';
import portfolioImage7 from 'figma:asset/21d704d082f04f6c941098a0abad0599efa03c58.png';
import portfolioImage8 from 'figma:asset/272f3c502abb9398ce96d663999c33a46f673607.png';
import portfolioImage9 from 'figma:asset/3c7ade12f182f6f2dc0faa07627e0ee1f4b1d41b.png';

// About Page
import img26 from 'figma:asset/a6166bceabea14e3e0f01416350b7f1f7fc5d76f.png';
import img27 from 'figma:asset/d23ca8d8409fc454a9cf0f1e4737be19d9c45964.png';
import img28 from 'figma:asset/2b5c6273b86f27e8f5aa434f0c6cc7b3d26c57d4.png';
import img29 from 'figma:asset/61421c170abd05c3cb0c71f7215cd67d401067ca.png';
import img210 from 'figma:asset/21e74063021aae208507930303fe8a1823d593eb.png';
import img211 from 'figma:asset/f6f542d01a2dabb5b3aaba662025dae394f4b383.png';
import img212 from 'figma:asset/3f2cf83b142408821fbe7d0608109ebdd83481f5.png';
import img220 from 'figma:asset/28de67f58ed2752a8653f9ab37085d89498364d8.png';
import img222 from 'figma:asset/8584f88f390f3d0ba9bd467e12055ef54fefd30d.png';
import img221 from 'figma:asset/34235b78ddcec77afa2fbe9d4d1483acafb0db85.png';
import img223 from 'figma:asset/8cdd4aa0d8b4fb9be31546822638beffa9d70a52.png';
import img213 from 'figma:asset/38e143108cd1c04b747fa4287cdb509bb112a5bc.png';
import img214 from 'figma:asset/4672c96cd7ff6d76a1a358460a9b0799791a0cff.png';
import img215 from 'figma:asset/ee7de827e029f02e711f3478d1c00f8a7a823542.png';
import img216 from 'figma:asset/fb43ff7c2e14690d2d98f5c4d4ee71ece079d176.png';
import img217 from 'figma:asset/831fbb0cbf29de524f9de52d0324f4aed305ce2b.png';
import img218 from 'figma:asset/966f200e7742f2c18d4be242ee949472883e7706.png';
import img219 from 'figma:asset/f9613908e8e0f7f072907cbd73fbdcdd43e9ab08.png';
import img224 from 'figma:asset/b666e5e41b33102cb0f244e227156da53db18901.png';
import img225 from 'figma:asset/f1baecee6240a5f8f7ddfc00518f8f666166bf0d.png';
import img226 from 'figma:asset/ad1829d3292a46b793bd79dcf266692a84caa0f0.png';
import imgKristy from 'figma:asset/ec88088efc3fa9e640490beef6b5fcf9cfb10ec5.png';
import imgElle from 'figma:asset/8d0b3f96fce600839290b06b9f01a1237b02e08e.png';
import imgNancy from 'figma:asset/7f5a462c91d5b9d6c7f2ec661d3332bb76b24f03.png';

// Brand Management & Brand Web
import heroImage from 'figma:asset/065329b54364b11ee40b7618a7cf56650c20ac10.png';
import ctaImage1 from 'figma:asset/de7a2be995fb5993aa3d9ae2178616e0bb77ed38.png';
import ctaImage2 from 'figma:asset/b72b93f7c525266f61bcb9df9ec77f3051d24777.png';
import ctaImage3 from 'figma:asset/8e23726acfbc3cab59b5a3320f7e06f9caf5c6d3.png';

// Testimonials
import testimonial1 from 'figma:asset/ddf83294279cfe8096153436c061b4dc42396654.png';
import testimonial2 from 'figma:asset/8b7c37d31d601b65ed3752b404c4cfaf5e6ea5e6.png';
import testimonial3 from 'figma:asset/4abfe953bf56366d226ba0165f9307f04ce7fc35.png';
import testimonial4 from 'figma:asset/ce5f62968a5b3f84556c7c1fd7b3fa45f63ae65f.png';
import testimonial5 from 'figma:asset/bc1c4920eda8d7dde731866e248a233fa2f21102.png';
import testimonial6 from 'figma:asset/2c920610e0d55c3784e392fbdbca2b6d1b2e1327.png';
import testimonial7 from 'figma:asset/0f3ded31bd4fd25d463cb8fa5bff48cba2bf75fe.png';
import testimonial8 from 'figma:asset/748ceae8749212dac1d2fac2b786f9030c9a53fb.png';
import testimonial9 from 'figma:asset/327d9f7a777342593d22acfae7d8018f982aea55.png';
import testimonial10 from 'figma:asset/5857b76116b41ba8d53e7b60a9e981609e1ab8f0.png';
import testimonial11 from 'figma:asset/af941fb68130ecb47b6139cbbbabb7bd7fcb759b.png';

// BrandWeb Slideshow
import slideshowImage1 from 'figma:asset/be98b779baafe58a8bee21975cad48444001e608.png';
import slideshowImage2 from 'figma:asset/f0531d3ae1b7a1068a755b0c99217c5e82a7b973.png';
import slideshowImage3 from 'figma:asset/55739d58c8b5b75d67d52626c556a0bb33f8a78e.png';
import slideshowImage4 from 'figma:asset/1f910a4ee5c289b0af76d0eac60408340fa80849.png';
import slideshowImage5 from 'figma:asset/f686a249c1718993a830172e145cd6636a7926ee.png';
import slideshowImage6 from 'figma:asset/0477d4edbfdbd6c8bbe5ef8e3ac9dc1f234f5ca7.png';
import slideshowImage7 from 'figma:asset/663c86d01f88e9c35b4cac984f390d995ba1a75e.png';
import slideshowImage8 from 'figma:asset/283254e6ec2a1498d7cb6220854f1a837b103437.png';
import slideshowImage9 from 'figma:asset/4aa02273dc62a36a2b95403f4dbfe17fd6eef79f.png';
import slideshowImage10 from 'figma:asset/a809e824badf41a97cbcdec8082c9d8412c8b485.png';
import slideshowImage11 from 'figma:asset/ddc482eeed2faca4e5bfafd4618336ee6ddfe182.png';
import slideshowImage12 from 'figma:asset/3ea87e9cdeedcf96c777dd30227795ca5f999be8.png';
import slideshowImage13 from 'figma:asset/a64a032f4bcf60c4bb46cd18d67372ebf6c556bb.png';
import slideshowImage14 from 'figma:asset/5dfc26702f194c28d2b6aa00cdb77fece88f373c.png';

// BrandWeb Additional
import offeringDesktop from 'figma:asset/700308635aa6876b747f7a84c309b55e3c8ebf77.png';
import offeringMobile from 'figma:asset/d7d4cb63b69cc2c7e228d55e246f54669cca2077.png';
import brandImage1 from 'figma:asset/39b99eb0f13ebdc52ff8d41f4dd7ac83be50f17a.png';
import brandImage2 from 'figma:asset/8f60698e2eba8ab2fc4a33e8e7f3d7b89fb59e7b.png';
import brandImage3 from 'figma:asset/54e9f1c4ba3f22c6cdb2c8f5ffdf3b856a0fae2f.png';
import workflowImage1 from 'figma:asset/e55bd76d0bbef5bdb3cdd2cfee3ed8a5d6e02f28.png';
import workflowImage2 from 'figma:asset/08da4ca1aefa3aef4dc1a28a7e8d05aa8d7835a9.png';
import workflowImage3 from 'figma:asset/e4c45e1ea80cf2f26b6854e7e2b2e3c0d1fe0b80.png';
import workflowImage4 from 'figma:asset/6d66ef6e0a99d44bc87b3fb1cc7c1e16ac10bd87.png';
import scalarNorthMountain from 'figma:asset/554045f310c8f5b61551f303a10fafd7d67db9ec.png';
import acenosStrategy from 'figma:asset/3c0d57ea332182c7192689beda1f03fa2083c46b.png';
import scalarNorthWebsite from 'figma:asset/ee5523ac979bb0f3763a9951b544841714391035.png';
import mastWebsite from 'figma:asset/946a7eecd3f36e5644616ff772864c20a6823748.png';
import aetoliaBrand from 'figma:asset/c5c8b4d724c9695c78142a078b7530a77c26855b.png';
import aetoliaFullIdentity from 'figma:asset/5477e718fd457d9e5428968963429e3401f4328b.png';
import scalarNorthSplit from 'figma:asset/5751461f346bdbf0297a5bf883d381de3ef9edc8.png';
import acenosBrandStrategy from 'figma:asset/d47e3d785b203c3cc782586e14c30c82f7f0c31d.png';
import brandMaintenanceDiagram from 'figma:asset/c0dfbb0a68f4abb44aa9d41e5f4af55d448c3b42.png';
import heroBackground from 'figma:asset/3e5752e2f0a2eb209df784ce4e825165e308c03e.png';

// Brand Audit
import brandPositioningImage from 'figma:asset/e7e1bbde15bd0c5396f2b5fb8a3a06b2acea2371.png';
import socialMediaImage from 'figma:asset/6ab0e151b7620a766532be50659157e9bd9e422c.png';
import gtmStrategyImage from 'figma:asset/413ea813b98bea5bc59fc12209522f1ea9a12274.png';
import leadGenImage from 'figma:asset/d60bc7cc23bf1020e9fbfcf12c0fd7fe8c5cf677.png';

// Consulting
import titleBg from 'figma:asset/83505d4e5565e4473b6190351d3fc3ab66243d40.png';
import consultingCTAImage from 'figma:asset/7047ae2b3693ff38a9096fd1dd276d40e5a786df.png';

// Design Subscription & AI
import aiConsultingImg from 'figma:asset/d29e5e34f231f64dcf35bc47e11b9037117788a4.png';

// Discovery
import discoveryHero from 'figma:asset/e74826ef601ca6a16c112b25e97e0fb99aa22c55.png';

// Influencer Marketing
import gradientImage from 'figma:asset/c3989c843be0633f0ffa6ac28de69385d59e0f6d.png';
import influencerHero from 'figma:asset/6b381b584774972902344f11922c7ee740a3621a.png';
import influencerWork1 from 'figma:asset/b64be276de761ec5193b30114e55756054a6dcee.png';
import influencerWork2 from 'figma:asset/2bd78fd04143170d08177b0e9665ad5486bd6083.png';
import influencerWork3 from 'figma:asset/949ad76adea82d4f5c89fc1eaba81b1eac7c733d.png';

// Jobs
import ctaBackground from 'figma:asset/f3b72bc87106d8e597bf5a6acca2bd5b4c9e779c.png';

// Landing Pages
import exampleImage from 'figma:asset/9142790aa463db35d5d8af2a4b6b8be7e3192654.png';

// Lead Gen
import dashboardImage from 'figma:asset/33921b43d8a6c5e9f92d0491154af6f888b5689a.png';
import icpImage from 'figma:asset/d491e869fe4d6cd4929c049cacf4ed1f5e61adc6.png';
import leadsImage from 'figma:asset/9588e968299be22ecf1783cb625f6f72768ffb11.png';
import calendarImage from 'figma:asset/6f906cfc52f581bfc83a8aa4a4fe1e7e456001f5.png';

// Pitch Deck
import pitchDeckCover from 'figma:asset/58cf27cc59963914bf07a7e763f59a90754cc143.png';

// Rapid Delivery
import ctaImage4 from 'figma:asset/4b0919d6d9a433652010c66adcdb1c4f9e0151f0.png';
import ctaImage5 from 'figma:asset/bee1ef4fe595a7417543bd48c2fc415cf3f13a96.png';
import slideImage1 from 'figma:asset/e834cdb69e621575e5d6afb2b7ac02ae53981c77.png';
import slideImage2 from 'figma:asset/ca23bc9d0126da8c71957e375371a1a920b5ad11.png';
import slideImage3 from 'figma:asset/c159ad20a8eba2895bee86964b07c89cb155ed47.png';
import slideImage4 from 'figma:asset/257fcfe47ce90ad77dda495b18963e1e9114bd43.png';
import slideImage5 from 'figma:asset/a72dbf73fbb5bc646e1cc07b4e2100d14eca5565.png';
import slideImage6 from 'figma:asset/2dbcaf0e06c19c41a47b3bdde03ab061135020ce.png';
import collageImage1 from 'figma:asset/ffdb039dbe0b498dcffc2af2d827fe7d969ef1f3.png';
import collageImage2 from 'figma:asset/c3d7961f7b0645bd73bb84a8f554ef95f5bd4211.png';
import collageImage3 from 'figma:asset/123e2e28935288d2a9c6cad4f148237f12d6b6ba.png';
import collageImage4 from 'figma:asset/221f4bb3f1111d00394c80e794abf288d2773320.png';
import collageImage5 from 'figma:asset/d511048b3f5deea33ac5f71b09ecea817046ddaa.png';
import collageImage6 from 'figma:asset/e649646f6db1e3f62bf5dd7a7423dc766627f020.png';
import collageImage7 from 'figma:asset/716c184b3d785fa466fbc801c80ce0c27f2d3c63.png';
import collageImage8 from 'figma:asset/6dd37e33b693743ff48e5521896158737b8fb10b.png';
import deliverableImage1 from 'figma:asset/b9e345ec421b58a1d76a4ff1b3b25dbafa50813e.png';
import deliverableImage2 from 'figma:asset/5abfdf27d0f229758c9acc179c6def3bb3bb2b63.png';
import deliverableImage3 from 'figma:asset/5d2033302d8f311e6f565f2d62113a60ea4e4e48.png';

// Request Proposal
import specialistImage from 'figma:asset/8f2a7a22fd950748341dcb791ae7c147bc4f6fae.png';

// SEO Testimonials
import seoTestimonial1 from 'figma:asset/5a4d69e0e31d054e0e18f0cd66db652976a7d68c.png';
import seoTestimonial2 from 'figma:asset/8d2a2fc6c6ac95d07e7a97f4d2c5dcc9b7ce5a89.png';
import seoTestimonial3 from 'figma:asset/4f8ad6c48d77c99d57eca8fcd51af5aec5639f0b.png';
import seoTestimonial4 from 'figma:asset/bfd5b2ce41e90fa36ed3dfd7a0f18c31d2e05ea7.png';
import seoTestimonial5 from 'figma:asset/61b5c6c6a0bdb93e1a5f2cf93b8abe43a83b5d1e.png';

interface AssetInfo {
  name: string;
  url: string;
  pages: string[];
  hash: string;
  supabaseUrl?: string;
  uploadStatus?: 'pending' | 'uploading' | 'success' | 'error';
  uploadError?: string;
}

export function ImageDownload() {
  const [assets, setAssets] = useState<AssetInfo[]>([
    // Core Branding
    { name: 'CIELO Logo (White)', url: cieloLogo, hash: 'f5ffcf57ca4f4f9d093dc30416ff6cec00f08b1d', pages: ['Header', 'Footer'] },
    { name: 'CIELO Logo (Black)', url: cieloLogoBlack, hash: 'aac9ea24336380213e0d0543a8f002bef7eda579', pages: ['Header', 'Footer'] },
    { name: 'Signup Form Image', url: signupImage, hash: '5da311bd486110d77bf1c4c137991ab9cdbf8d73', pages: ['Header'] },
    { name: 'White House Logo', url: whiteHouseLogo, hash: '6612dbb672696e33b6b0c9b1322cf727c64b9f12', pages: ['Home'] },
    
    // Brand Logos
    { name: 'Brand Logo 1', url: logo1, hash: 'fb1b0fde222dc3b383d7395c4b9fc43a6db37bcd', pages: ['BrandsShowcase', 'BrandWeb'] },
    { name: 'Brand Logo 2', url: logo2, hash: '661ab0f38883658ac215134f7a2580521ca30949', pages: ['BrandsShowcase', 'BrandWeb'] },
    { name: 'Brand Logo 3', url: logo3, hash: 'a4bc550a23aeaa39674095c933d4dbb7739973d3', pages: ['BrandsShowcase', 'BrandWeb'] },
    { name: 'Brand Logo 4', url: logo4, hash: '3acf091f0d2cf1009a76013a38ee85bba600e999', pages: ['BrandsShowcase', 'BrandWeb'] },
    { name: 'Brand Logo 5', url: logo5, hash: '21b618833049aaf2f0604595402c6b7d92d120b1', pages: ['BrandsShowcase', 'BrandWeb'] },
    { name: 'Brand Logo 6', url: logo6, hash: 'bb78df57a783f1cb762fc62a64063109dcddb04e', pages: ['BrandsShowcase'] },
    { name: 'Brand Logo 7', url: logo7, hash: '88d7ce755633105c90e62d8bfebe92c242bb3099', pages: ['BrandWeb'] },
    
    // Home Page
    { name: 'Hero Background', url: heroBg, hash: 'aa31cd96ccbff96e6edfe2bd37e99104aa943b45', pages: ['Home'] },
    
    // Portfolio Preview
    { name: 'Sustainable Credit', url: sustainableCredit, hash: '889e624eeede5a73236ef970c77c776d999a2acb', pages: ['PortfolioPreview'] },
    { name: 'MAST Legal', url: mastLegal, hash: '4a4a284c08c4e6597692602869d74834a28d749d', pages: ['PortfolioPreview'] },
    { name: 'Portfolio Image 1', url: portfolioImage1, hash: 'f5a00a97b78dd390039f12d0ebe7beaea23626cb', pages: ['PortfolioPreview'] },
    { name: 'Portfolio Image 2', url: portfolioImage2, hash: 'de7a2be995fb5993aa3d9ae2178616e0bb77ed38', pages: ['PortfolioPreview', 'BrandManagement'] },
    { name: 'Portfolio Image 3', url: portfolioImage3, hash: '558cce532186e50c532e0ab6ccda7a555b1237f1', pages: ['PortfolioPreview'] },
    { name: 'Portfolio Image 4', url: portfolioImage4, hash: '248e1e8c3cee5f005c6ae06ae5f2668165c1544b', pages: ['PortfolioPreview'] },
    { name: 'Mezcal Tequila', url: mezcalTequila, hash: '291f3e0593b4d292522a70d11d3977c51df2a464', pages: ['PortfolioPreview'] },
    { name: 'Portfolio Image 6', url: portfolioImage6, hash: '9186936c1dec3675326e3919db84f1be7e0cca4f', pages: ['PortfolioPreview'] },
    { name: 'Recover Faster', url: recoverFaster, hash: 'a92365d5807be518840ba7c3328de879544a9d34', pages: ['PortfolioPreview'] },
    { name: 'Portfolio Image 7', url: portfolioImage7, hash: '21d704d082f04f6c941098a0abad0599efa03c58', pages: ['PortfolioPreview'] },
    { name: 'Portfolio Image 8', url: portfolioImage8, hash: '272f3c502abb9398ce96d663999c33a46f673607', pages: ['PortfolioPreview'] },
    { name: 'Portfolio Image 9', url: portfolioImage9, hash: '3c7ade12f182f6f2dc0faa07627e0ee1f4b1d41b', pages: ['PortfolioPreview'] },
    
    // About Page Team
    { name: 'About Image 26', url: img26, hash: 'a6166bceabea14e3e0f01416350b7f1f7fc5d76f', pages: ['About'] },
    { name: 'About Image 27', url: img27, hash: 'd23ca8d8409fc454a9cf0f1e4737be19d9c45964', pages: ['About'] },
    { name: 'About Image 28', url: img28, hash: '2b5c6273b86f27e8f5aa434f0c6cc7b3d26c57d4', pages: ['About'] },
    { name: 'About Image 29', url: img29, hash: '61421c170abd05c3cb0c71f7215cd67d401067ca', pages: ['About'] },
    { name: 'About Image 210', url: img210, hash: '21e74063021aae208507930303fe8a1823d593eb', pages: ['About', 'AIDesignBranding', 'Multiple Service Pages'] },
    { name: 'About Image 211', url: img211, hash: 'f6f542d01a2dabb5b3aaba662025dae394f4b383', pages: ['About'] },
    { name: 'About Image 212', url: img212, hash: '3f2cf83b142408821fbe7d0608109ebdd83481f5', pages: ['About'] },
    { name: 'About Image 220', url: img220, hash: '28de67f58ed2752a8653f9ab37085d89498364d8', pages: ['About'] },
    { name: 'About Image 221', url: img221, hash: '34235b78ddcec77afa2fbe9d4d1483acafb0db85', pages: ['About'] },
    { name: 'About Image 222', url: img222, hash: '8584f88f390f3d0ba9bd467e12055ef54fefd30d', pages: ['About'] },
    { name: 'About Image 223', url: img223, hash: '8cdd4aa0d8b4fb9be31546822638beffa9d70a52', pages: ['About'] },
    { name: 'About Image 213', url: img213, hash: '38e143108cd1c04b747fa4287cdb509bb112a5bc', pages: ['About'] },
    { name: 'About Image 214', url: img214, hash: '4672c96cd7ff6d76a1a358460a9b0799791a0cff', pages: ['About'] },
    { name: 'About Image 215', url: img215, hash: 'ee7de827e029f02e711f3478d1c00f8a7a823542', pages: ['About'] },
    { name: 'About Image 216', url: img216, hash: 'fb43ff7c2e14690d2d98f5c4d4ee71ece079d176', pages: ['About'] },
    { name: 'About Image 217', url: img217, hash: '831fbb0cbf29de524f9de52d0324f4aed305ce2b', pages: ['About'] },
    { name: 'About Image 218', url: img218, hash: '966f200e7742f2c18d4be242ee949472883e7706', pages: ['About'] },
    { name: 'About Image 219', url: img219, hash: 'f9613908e8e0f7f072907cbd73fbdcdd43e9ab08', pages: ['About'] },
    { name: 'About Image 224', url: img224, hash: 'b666e5e41b33102cb0f244e227156da53db18901', pages: ['About'] },
    { name: 'About Image 225', url: img225, hash: 'f1baecee6240a5f8f7ddfc00518f8f666166bf0d', pages: ['About'] },
    { name: 'About Image 226', url: img226, hash: 'ad1829d3292a46b793bd79dcf266692a84caa0f0', pages: ['About'] },
    { name: 'Team - Kristy', url: imgKristy, hash: 'ec88088efc3fa9e640490beef6b5fcf9cfb10ec5', pages: ['About'] },
    { name: 'Team - Elle', url: imgElle, hash: '8d0b3f96fce600839290b06b9f01a1237b02e08e', pages: ['About'] },
    { name: 'Team - Nancy', url: imgNancy, hash: '7f5a462c91d5b9d6c7f2ec661d3332bb76b24f03', pages: ['About'] },
    
    // Hero Images
    { name: 'Hero Image (Generic)', url: heroImage, hash: '065329b54364b11ee40b7618a7cf56650c20ac10', pages: ['AdCreatives', 'BrandManagement'] },
    
    // CTA Images
    { name: 'CTA Image 1', url: ctaImage1, hash: 'de7a2be995fb5993aa3d9ae2178616e0bb77ed38', pages: ['BrandManagement', 'BrandWeb', 'RapidDelivery'] },
    { name: 'CTA Image 2', url: ctaImage2, hash: 'b72b93f7c525266f61bcb9df9ec77f3051d24777', pages: ['BrandManagement', 'BrandWeb', 'RapidDelivery'] },
    { name: 'CTA Image 3', url: ctaImage3, hash: '8e23726acfbc3cab59b5a3320f7e06f9caf5c6d3', pages: ['BrandManagement', 'BrandWeb', 'RapidDelivery'] },
    { name: 'CTA Image 4', url: ctaImage4, hash: '4b0919d6d9a433652010c66adcdb1c4f9e0151f0', pages: ['RapidDelivery'] },
    { name: 'CTA Image 5', url: ctaImage5, hash: 'bee1ef4fe595a7417543bd48c2fc415cf3f13a96', pages: ['RapidDelivery'] },
    
    // Testimonials
    { name: 'Testimonial 1', url: testimonial1, hash: 'ddf83294279cfe8096153436c061b4dc42396654', pages: ['BrandManagement', 'BrandWeb'] },
    { name: 'Testimonial 2', url: testimonial2, hash: '8b7c37d31d601b65ed3752b404c4cfaf5e6ea5e6', pages: ['BrandManagement', 'BrandWeb'] },
    { name: 'Testimonial 3', url: testimonial3, hash: '4abfe953bf56366d226ba0165f9307f04ce7fc35', pages: ['BrandManagement', 'BrandWeb'] },
    { name: 'Testimonial 4', url: testimonial4, hash: 'ce5f62968a5b3f84556c7c1fd7b3fa45f63ae65f', pages: ['BrandManagement', 'BrandWeb'] },
    { name: 'Testimonial 5', url: testimonial5, hash: 'bc1c4920eda8d7dde731866e248a233fa2f21102', pages: ['BrandManagement', 'BrandWeb'] },
    { name: 'Testimonial 6', url: testimonial6, hash: '2c920610e0d55c3784e392fbdbca2b6d1b2e1327', pages: ['BrandManagement', 'BrandWeb'] },
    { name: 'Testimonial 7', url: testimonial7, hash: '0f3ded31bd4fd25d463cb8fa5bff48cba2bf75fe', pages: ['BrandManagement', 'BrandWeb'] },
    { name: 'Testimonial 8', url: testimonial8, hash: '748ceae8749212dac1d2fac2b786f9030c9a53fb', pages: ['BrandManagement', 'BrandWeb'] },
    { name: 'Testimonial 9', url: testimonial9, hash: '327d9f7a777342593d22acfae7d8018f982aea55', pages: ['BrandManagement', 'BrandWeb'] },
    { name: 'Testimonial 10', url: testimonial10, hash: '5857b76116b41ba8d53e7b60a9e981609e1ab8f0', pages: ['BrandManagement', 'BrandWeb'] },
    { name: 'Testimonial 11', url: testimonial11, hash: 'af941fb68130ecb47b6139cbbbabb7bd7fcb759b', pages: ['BrandManagement', 'BrandWeb'] },
    
    // BrandWeb Slideshow
    { name: 'Slideshow 1', url: slideshowImage1, hash: 'be98b779baafe58a8bee21975cad48444001e608', pages: ['BrandWeb'] },
    { name: 'Slideshow 2', url: slideshowImage2, hash: 'f0531d3ae1b7a1068a755b0c99217c5e82a7b973', pages: ['BrandWeb'] },
    { name: 'Slideshow 3', url: slideshowImage3, hash: '55739d58c8b5b75d67d52626c556a0bb33f8a78e', pages: ['BrandWeb'] },
    { name: 'Slideshow 4', url: slideshowImage4, hash: '1f910a4ee5c289b0af76d0eac60408340fa80849', pages: ['BrandWeb', 'BrandAudit', 'LetsTalk'] },
    { name: 'Slideshow 5', url: slideshowImage5, hash: 'f686a249c1718993a830172e145cd6636a7926ee', pages: ['BrandWeb'] },
    { name: 'Slideshow 6', url: slideshowImage6, hash: '0477d4edbfdbd6c8bbe5ef8e3ac9dc1f234f5ca7', pages: ['BrandWeb', 'BrandAudit', 'LetsTalk'] },
    { name: 'Slideshow 7', url: slideshowImage7, hash: '663c86d01f88e9c35b4cac984f390d995ba1a75e', pages: ['BrandWeb'] },
    { name: 'Slideshow 8', url: slideshowImage8, hash: '283254e6ec2a1498d7cb6220854f1a837b103437', pages: ['BrandWeb'] },
    { name: 'Slideshow 9', url: slideshowImage9, hash: '4aa02273dc62a36a2b95403f4dbfe17fd6eef79f', pages: ['BrandWeb'] },
    { name: 'Slideshow 10', url: slideshowImage10, hash: 'a809e824badf41a97cbcdec8082c9d8412c8b485', pages: ['BrandWeb'] },
    { name: 'Slideshow 11', url: slideshowImage11, hash: 'ddc482eeed2faca4e5bfafd4618336ee6ddfe182', pages: ['BrandWeb'] },
    { name: 'Slideshow 12', url: slideshowImage12, hash: '3ea87e9cdeedcf96c777dd30227795ca5f999be8', pages: ['BrandWeb'] },
    { name: 'Slideshow 13', url: slideshowImage13, hash: 'a64a032f4bcf60c4bb46cd18d67372ebf6c556bb', pages: ['BrandWeb'] },
    { name: 'Slideshow 14', url: slideshowImage14, hash: '5dfc26702f194c28d2b6aa00cdb77fece88f373c', pages: ['BrandWeb'] },
    
    // BrandWeb Additional
    { name: 'Offering Desktop', url: offeringDesktop, hash: '700308635aa6876b747f7a84c309b55e3c8ebf77', pages: ['BrandWeb'] },
    { name: 'Offering Mobile', url: offeringMobile, hash: 'd7d4cb63b69cc2c7e228d55e246f54669cca2077', pages: ['BrandWeb'] },
    { name: 'Brand Image 1', url: brandImage1, hash: '39b99eb0f13ebdc52ff8d41f4dd7ac83be50f17a', pages: ['BrandWeb'] },
    { name: 'Brand Image 2', url: brandImage2, hash: '8f60698e2eba8ab2fc4a33e8e7f3d7b89fb59e7b', pages: ['BrandWeb'] },
    { name: 'Brand Image 3', url: brandImage3, hash: '54e9f1c4ba3f22c6cdb2c8f5ffdf3b856a0fae2f', pages: ['BrandWeb'] },
    { name: 'Workflow 1', url: workflowImage1, hash: 'e55bd76d0bbef5bdb3cdd2cfee3ed8a5d6e02f28', pages: ['BrandWeb'] },
    { name: 'Workflow 2', url: workflowImage2, hash: '08da4ca1aefa3aef4dc1a28a7e8d05aa8d7835a9', pages: ['BrandWeb'] },
    { name: 'Workflow 3', url: workflowImage3, hash: 'e4c45e1ea80cf2f26b6854e7e2b2e3c0d1fe0b80', pages: ['BrandWeb'] },
    { name: 'Workflow 4', url: workflowImage4, hash: '6d66ef6e0a99d44bc87b3fb1cc7c1e16ac10bd87', pages: ['BrandWeb'] },
    { name: 'Scalar North Mountain', url: scalarNorthMountain, hash: '554045f310c8f5b61551f303a10fafd7d67db9ec', pages: ['BrandWeb'] },
    { name: 'Acenos Strategy', url: acenosStrategy, hash: '3c0d57ea332182c7192689beda1f03fa2083c46b', pages: ['BrandWeb'] },
    { name: 'Scalar North Website', url: scalarNorthWebsite, hash: 'ee5523ac979bb0f3763a9951b544841714391035', pages: ['BrandWeb'] },
    { name: 'MAST Website', url: mastWebsite, hash: '946a7eecd3f36e5644616ff772864c20a6823748', pages: ['BrandWeb'] },
    { name: 'Aetolia Brand', url: aetoliaBrand, hash: 'c5c8b4d724c9695c78142a078b7530a77c26855b', pages: ['BrandWeb'] },
    { name: 'Aetolia Full Identity', url: aetoliaFullIdentity, hash: '5477e718fd457d9e5428968963429e3401f4328b', pages: ['BrandWeb'] },
    { name: 'Scalar North Split', url: scalarNorthSplit, hash: '5751461f346bdbf0297a5bf883d381de3ef9edc8', pages: ['BrandWeb'] },
    { name: 'Acenos Brand Strategy', url: acenosBrandStrategy, hash: 'd47e3d785b203c3cc782586e14c30c82f7f0c31d', pages: ['BrandWeb'] },
    { name: 'Brand Maintenance Diagram', url: brandMaintenanceDiagram, hash: 'c0dfbb0a68f4abb44aa9d41e5f4af55d448c3b42', pages: ['BrandWeb'] },
    { name: 'Hero Background', url: heroBackground, hash: '3e5752e2f0a2eb209df784ce4e825165e308c03e', pages: ['BrandWeb'] },
    
    // Brand Audit
    { name: 'Brand Positioning', url: brandPositioningImage, hash: 'e7e1bbde15bd0c5396f2b5fb8a3a06b2acea2371', pages: ['BrandAudit'] },
    { name: 'Social Media Strategy', url: socialMediaImage, hash: '6ab0e151b7620a766532be50659157e9bd9e422c', pages: ['BrandAudit'] },
    { name: 'GTM Strategy', url: gtmStrategyImage, hash: '413ea813b98bea5bc59fc12209522f1ea9a12274', pages: ['BrandAudit'] },
    { name: 'Lead Gen Strategy', url: leadGenImage, hash: 'd60bc7cc23bf1020e9fbfcf12c0fd7fe8c5cf677', pages: ['BrandAudit'] },
    
    // Consulting
    { name: 'Consulting Title BG', url: titleBg, hash: '83505d4e5565e4473b6190351d3fc3ab66243d40', pages: ['Consulting'] },
    { name: 'Consulting CTA', url: consultingCTAImage, hash: '7047ae2b3693ff38a9096fd1dd276d40e5a786df', pages: ['ConsultingCTA'] },
    
    // AI & Design Subscription
    { name: 'AI Consulting Hero', url: aiConsultingImg, hash: 'd29e5e34f231f64dcf35bc47e11b9037117788a4', pages: ['AIConsulting', 'DesignSubscription'] },
    
    // Discovery
    { name: 'Discovery Hero', url: discoveryHero, hash: 'e74826ef601ca6a16c112b25e97e0fb99aa22c55', pages: ['DiscoveryLanding'] },
    
    // Influencer Marketing
    { name: 'Gradient Image', url: gradientImage, hash: 'c3989c843be0633f0ffa6ac28de69385d59e0f6d', pages: ['InfluencerMarketing'] },
    { name: 'Influencer Hero', url: influencerHero, hash: '6b381b584774972902344f11922c7ee740a3621a', pages: ['InfluencerMarketing'] },
    { name: 'Influencer Work 1', url: influencerWork1, hash: 'b64be276de761ec5193b30114e55756054a6dcee', pages: ['InfluencerMarketing'] },
    { name: 'Influencer Work 2', url: influencerWork2, hash: '2bd78fd04143170d08177b0e9665ad5486bd6083', pages: ['InfluencerMarketing'] },
    { name: 'Influencer Work 3', url: influencerWork3, hash: '949ad76adea82d4f5c89fc1eaba81b1eac7c733d', pages: ['InfluencerMarketing'] },
    
    // Jobs
    { name: 'Jobs CTA Background', url: ctaBackground, hash: 'f3b72bc87106d8e597bf5a6acca2bd5b4c9e779c', pages: ['Jobs'] },
    
    // Landing
    { name: 'Landing Example', url: exampleImage, hash: '9142790aa463db35d5d8af2a4b6b8be7e3192654', pages: ['LandingSocialMedia'] },
    
    // Lead Gen
    { name: 'Dashboard', url: dashboardImage, hash: '33921b43d8a6c5e9f92d0491154af6f888b5689a', pages: ['LeadGen'] },
    { name: 'ICP Image', url: icpImage, hash: 'd491e869fe4d6cd4929c049cacf4ed1f5e61adc6', pages: ['LeadGen'] },
    { name: 'Leads Image', url: leadsImage, hash: '9588e968299be22ecf1783cb625f6f72768ffb11', pages: ['LeadGen'] },
    { name: 'Calendar Image', url: calendarImage, hash: '6f906cfc52f581bfc83a8aa4a4fe1e7e456001f5', pages: ['LeadGen'] },
    
    // Pitch Deck
    { name: 'Pitch Deck Cover', url: pitchDeckCover, hash: '58cf27cc59963914bf07a7e763f59a90754cc143', pages: ['PitchDeckDesign'] },
    
    // Rapid Delivery
    { name: 'Rapid Slide 1', url: slideImage1, hash: 'e834cdb69e621575e5d6afb2b7ac02ae53981c77', pages: ['RapidDelivery'] },
    { name: 'Rapid Slide 2', url: slideImage2, hash: 'ca23bc9d0126da8c71957e375371a1a920b5ad11', pages: ['RapidDelivery'] },
    { name: 'Rapid Slide 3', url: slideImage3, hash: 'c159ad20a8eba2895bee86964b07c89cb155ed47', pages: ['RapidDelivery'] },
    { name: 'Rapid Slide 4', url: slideImage4, hash: '257fcfe47ce90ad77dda495b18963e1e9114bd43', pages: ['RapidDelivery'] },
    { name: 'Rapid Slide 5', url: slideImage5, hash: 'a72dbf73fbb5bc646e1cc07b4e2100d14eca5565', pages: ['RapidDelivery'] },
    { name: 'Rapid Slide 6', url: slideImage6, hash: '2dbcaf0e06c19c41a47b3bdde03ab061135020ce', pages: ['RapidDelivery'] },
    { name: 'Collage 1', url: collageImage1, hash: 'ffdb039dbe0b498dcffc2af2d827fe7d969ef1f3', pages: ['RapidDelivery'] },
    { name: 'Collage 2', url: collageImage2, hash: 'c3d7961f7b0645bd73bb84a8f554ef95f5bd4211', pages: ['RapidDelivery'] },
    { name: 'Collage 3', url: collageImage3, hash: '123e2e28935288d2a9c6cad4f148237f12d6b6ba', pages: ['RapidDelivery'] },
    { name: 'Collage 4', url: collageImage4, hash: '221f4bb3f1111d00394c80e794abf288d2773320', pages: ['RapidDelivery'] },
    { name: 'Collage 5', url: collageImage5, hash: 'd511048b3f5deea33ac5f71b09ecea817046ddaa', pages: ['RapidDelivery'] },
    { name: 'Collage 6', url: collageImage6, hash: 'e649646f6db1e3f62bf5dd7a7423dc766627f020', pages: ['RapidDelivery'] },
    { name: 'Collage 7', url: collageImage7, hash: '716c184b3d785fa466fbc801c80ce0c27f2d3c63', pages: ['RapidDelivery'] },
    { name: 'Collage 8', url: collageImage8, hash: '6dd37e33b693743ff48e5521896158737b8fb10b', pages: ['RapidDelivery'] },
    { name: 'Deliverable 1', url: deliverableImage1, hash: 'b9e345ec421b58a1d76a4ff1b3b25dbafa50813e', pages: ['RapidDelivery'] },
    { name: 'Deliverable 2', url: deliverableImage2, hash: '5abfdf27d0f229758c9acc179c6def3bb3bb2b63', pages: ['RapidDelivery'] },
    { name: 'Deliverable 3', url: deliverableImage3, hash: '5d2033302d8f311e6f565f2d62113a60ea4e4e48', pages: ['RapidDelivery'] },
    
    // Request Proposal
    { name: 'Specialist Image', url: specialistImage, hash: '8f2a7a22fd950748341dcb791ae7c147bc4f6fae', pages: ['RequestProposal'] },
    
    // SEO Testimonials
    { name: 'SEO Testimonial 1', url: seoTestimonial1, hash: '5a4d69e0e31d054e0e18f0cd66db652976a7d68c', pages: ['SeoGeo'] },
    { name: 'SEO Testimonial 2', url: seoTestimonial2, hash: '8d2a2fc6c6ac95d07e7a97f4d2c5dcc9b7ce5a89', pages: ['SeoGeo'] },
    { name: 'SEO Testimonial 3', url: seoTestimonial3, hash: '4f8ad6c48d77c99d57eca8fcd51af5aec5639f0b', pages: ['SeoGeo'] },
    { name: 'SEO Testimonial 4', url: seoTestimonial4, hash: 'bfd5b2ce41e90fa36ed3dfd7a0f18c31d2e05ea7', pages: ['SeoGeo'] },
    { name: 'SEO Testimonial 5', url: seoTestimonial5, hash: '61b5c6c6a0bdb93e1a5f2cf93b8abe43a83b5d1e', pages: ['SeoGeo'] },
  ]);

  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({ current: 0, total: 0 });

  const handleUploadAll = async () => {
    setIsUploading(true);
    setUploadProgress({ current: 0, total: assets.length });

    try {
      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-27c238f7/assets/upload-batch`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`,
        },
        body: JSON.stringify({
          assets: assets.map(asset => ({
            url: asset.url,
            hash: asset.hash,
            name: asset.name,
          })),
        }),
      });

      const data = await response.json();

      if (data.success) {
        // Update assets with Supabase URLs
        setAssets(prevAssets => {
          const updatedAssets = [...prevAssets];
          data.results.forEach((result: any) => {
            const index = updatedAssets.findIndex(a => a.hash === result.hash);
            if (index !== -1) {
              updatedAssets[index] = {
                ...updatedAssets[index],
                supabaseUrl: result.url,
                uploadStatus: result.success ? 'success' : 'error',
                uploadError: result.error,
              };
            }
          });
          return updatedAssets;
        });

        alert(`Upload complete!\n✅ Success: ${data.summary.success}\n❌ Errors: ${data.summary.errors}`);
      } else {
        alert(`Upload failed: ${data.error}`);
      }
    } catch (error: any) {
      console.error('Upload error:', error);
      alert(`Upload failed: ${error.message}`);
    } finally {
      setIsUploading(false);
    }
  };

  const handleDownload = async (url: string, filename: string) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = `${filename}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error('Download failed:', error);
      // Fallback: open in new tab
      window.open(url, '_blank');
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-white py-32 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12 space-y-4">
          <p className="text-xs uppercase tracking-[0.2em] text-orange-400 font-medium font-['Geist_Mono']">
            Asset Manager
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl text-white tracking-tight font-light leading-tight">
            Image Assets
          </h1>
          <p className="text-zinc-400 text-base md:text-lg leading-relaxed max-w-2xl">
            All Figma assets used across the CIELO Agency platform. Click to download or view the asset URL.
          </p>
          <div className="flex items-center gap-3 text-sm text-green-400 bg-green-950/20 border border-green-900/30 rounded-lg px-4 py-3 max-w-2xl">
            <CheckCircle className="w-5 h-5 flex-shrink-0" />
            <p>
              <strong className="font-medium">Auto-Upload Enabled:</strong> All 155 assets are automatically uploaded to Supabase Storage when the server starts.
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
          <div className="bg-zinc-950/50 border border-zinc-800/60 rounded-xl p-6">
            <p className="text-zinc-500 text-xs uppercase tracking-wider font-['Geist_Mono'] mb-2">Total Assets</p>
            <p className="text-3xl font-light text-white">{assets.length}</p>
          </div>
          <div className="bg-zinc-950/50 border border-zinc-800/60 rounded-xl p-6">
            <p className="text-zinc-500 text-xs uppercase tracking-wider font-['Geist_Mono'] mb-2">Pages</p>
            <p className="text-3xl font-light text-white">{new Set(assets.flatMap(a => a.pages)).size}</p>
          </div>
          <div className="bg-zinc-950/50 border border-zinc-800/60 rounded-xl p-6">
            <p className="text-zinc-500 text-xs uppercase tracking-wider font-['Geist_Mono'] mb-2">Format</p>
            <p className="text-3xl font-light text-white">PNG</p>
          </div>
          <div className="bg-zinc-950/50 border border-zinc-800/60 rounded-xl p-6">
            <p className="text-zinc-500 text-xs uppercase tracking-wider font-['Geist_Mono'] mb-2">Hosted on Supabase</p>
            <p className="text-3xl font-light text-white">{assets.filter(a => a.uploadStatus === 'success').length}</p>
          </div>
        </div>

        {/* Upload All Button */}
        <div className="mb-8 flex justify-center">
          <button
            onClick={handleUploadAll}
            disabled={isUploading}
            className="px-8 py-4 bg-orange-500 hover:bg-orange-600 disabled:bg-zinc-700 disabled:cursor-not-allowed text-white font-medium rounded-xl transition-all flex items-center gap-3"
          >
            {isUploading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Uploading {uploadProgress.current}/{uploadProgress.total}...</span>
              </>
            ) : (
              <>
                <Upload className="w-5 h-5" />
                <span>Upload All Assets to Supabase</span>
              </>
            )}
          </button>
        </div>

        {/* Asset Table */}
        <div className="bg-zinc-950 border border-zinc-800/60 rounded-2xl overflow-hidden">
          {/* Table Header */}
          <div className="grid grid-cols-12 gap-4 p-6 bg-zinc-900/50 border-b border-zinc-800">
            <div className="col-span-1">
              <p className="text-xs uppercase tracking-wider font-['Geist_Mono'] text-zinc-500">#</p>
            </div>
            <div className="col-span-1">
              <p className="text-xs uppercase tracking-wider font-['Geist_Mono'] text-zinc-500">Preview</p>
            </div>
            <div className="col-span-2">
              <p className="text-xs uppercase tracking-wider font-['Geist_Mono'] text-zinc-500">Name</p>
            </div>
            <div className="col-span-2">
              <p className="text-xs uppercase tracking-wider font-['Geist_Mono'] text-zinc-500">Used In</p>
            </div>
            <div className="col-span-3">
              <p className="text-xs uppercase tracking-wider font-['Geist_Mono'] text-zinc-500">Supabase URL</p>
            </div>
            <div className="col-span-3">
              <p className="text-xs uppercase tracking-wider font-['Geist_Mono'] text-zinc-500">Actions</p>
            </div>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-zinc-800/60">
            {assets.map((asset, index) => (
              <div key={asset.hash} className="grid grid-cols-12 gap-4 p-6 hover:bg-zinc-900/30 transition-colors">
                {/* Index */}
                <div className="col-span-1 flex items-center">
                  <p className="text-sm text-zinc-500 font-['Geist_Mono']">{String(index + 1).padStart(3, '0')}</p>
                </div>

                {/* Preview */}
                <div className="col-span-1 flex items-center">
                  <div className="w-16 h-16 bg-zinc-900 rounded-lg border border-zinc-800 overflow-hidden flex items-center justify-center">
                    <img 
                      src={asset.supabaseUrl || asset.url} 
                      alt={asset.name}
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                </div>

                {/* Name */}
                <div className="col-span-2 flex flex-col justify-center">
                  <p className="text-sm text-white font-medium mb-1">{asset.name}</p>
                  <p className="text-xs text-zinc-500 font-['Geist_Mono'] truncate">{asset.hash.slice(0, 8)}...</p>
                </div>

                {/* Pages */}
                <div className="col-span-2 flex items-center">
                  <div className="flex flex-wrap gap-1">
                    {asset.pages.slice(0, 2).map((page) => (
                      <span 
                        key={page}
                        className="inline-block text-[10px] px-2 py-1 bg-zinc-900 border border-zinc-800 text-zinc-400 rounded font-['Geist_Mono'] uppercase"
                      >
                        {page}
                      </span>
                    ))}
                    {asset.pages.length > 2 && (
                      <span className="inline-block text-[10px] px-2 py-1 bg-zinc-900 border border-zinc-800 text-zinc-400 rounded font-['Geist_Mono']">
                        +{asset.pages.length - 2}
                      </span>
                    )}
                  </div>
                </div>

                {/* Supabase URL */}
                <div className="col-span-3 flex items-center">
                  {asset.uploadStatus === 'success' && asset.supabaseUrl ? (
                    <div className="flex items-center gap-2 w-full">
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                      <a
                        href={asset.supabaseUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-green-400 hover:text-green-300 font-['Geist_Mono'] truncate underline"
                      >
                        {asset.supabaseUrl.split('/').pop()}
                      </a>
                    </div>
                  ) : asset.uploadStatus === 'error' ? (
                    <div className="flex items-center gap-2">
                      <XCircle className="w-4 h-4 text-red-500" />
                      <span className="text-xs text-red-400 font-['Geist_Mono']">Upload failed</span>
                    </div>
                  ) : (
                    <span className="text-xs text-zinc-600 font-['Geist_Mono']">Not uploaded</span>
                  )}
                </div>

                {/* Actions */}
                <div className="col-span-3 flex items-center gap-2">
                  <button
                    onClick={() => handleDownload(asset.supabaseUrl || asset.url, asset.name)}
                    className="flex items-center gap-2 px-3 py-2 bg-white/5 hover:bg-white/10 border border-zinc-800 hover:border-zinc-700 rounded-lg transition-all text-sm text-white group"
                  >
                    <Download className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform" />
                    <span className="font-['Geist_Mono'] text-xs">Download</span>
                  </button>
                  <button
                    onClick={() => window.open(asset.supabaseUrl || asset.url, '_blank')}
                    className="flex items-center gap-2 px-3 py-2 bg-white/5 hover:bg-white/10 border border-zinc-800 hover:border-zinc-700 rounded-lg transition-all text-sm text-white group"
                  >
                    <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    <span className="font-['Geist_Mono'] text-xs">View</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-12 bg-zinc-950/50 border border-zinc-800/60 rounded-xl p-8">
          <h2 className="text-xl text-white font-light mb-4">How to Use These Assets</h2>
          <div className="space-y-4 text-zinc-400 text-sm leading-relaxed">
            <p>
              <strong className="text-white">Upload to Supabase:</strong> Click "Upload All Assets to Supabase" to automatically migrate all Figma assets to your Supabase Storage bucket. This makes them accessible from any platform, not just Figma Make.
            </p>
            <p>
              <strong className="text-white">Download:</strong> Click the "Download" button to save the image to your computer. If uploaded to Supabase, it will download from there instead.
            </p>
            <p>
              <strong className="text-white">View:</strong> Click the "View" button to open the full-size image in a new tab.
            </p>
            <p>
              <strong className="text-white">Asset Hash:</strong> The hash below each asset name is the unique Figma identifier. Use this to locate the asset in the codebase.
            </p>
            <p>
              <strong className="text-white">Figma Make Import Format:</strong> <code className="text-orange-400 font-['Geist_Mono'] text-xs bg-zinc-900 px-2 py-1 rounded">import assetName from 'figma:asset/[hash].png'</code>
            </p>
            <p>
              <strong className="text-white">Supabase Import Format:</strong> After uploading, use: <code className="text-green-400 font-['Geist_Mono'] text-xs bg-zinc-900 px-2 py-1 rounded">https://[your-project].supabase.co/storage/v1/object/public/make-27c238f7-assets/[hash].png</code>
            </p>
            <p>
              <strong className="text-white">For Replit/Other Platforms:</strong> Once uploaded to Supabase, copy the Supabase URL and replace all <code className="text-orange-400 font-['Geist_Mono'] text-xs bg-zinc-900 px-1 rounded">figma:asset</code> imports with the Supabase URLs. The images will work on any platform.
            </p>
          </div>
        </div>

        {/* Download All */}
        <div className="mt-8 flex justify-center">
          <button
            onClick={() => {
              assets.forEach((asset, index) => {
                setTimeout(() => {
                  handleDownload(asset.url, asset.name);
                }, index * 500); // Stagger downloads
              });
            }}
            className="px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-xl transition-all flex items-center gap-3"
          >
            <Download className="w-5 h-5" />
            <span>Download All {assets.length} Assets</span>
          </button>
        </div>
      </div>
    </div>
  );
}
