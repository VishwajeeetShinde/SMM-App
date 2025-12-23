
export interface BrandDetails {
  name: string;
  industry: string;
  targetAudience: string;
  tone: string;
  uniqueValueProp: string;
  competitors?: string[];
}

export interface MarketAnalysis {
  competitorsAnalysis: string;
  marketOpportunities: string;
  brandPositioningAdvice: string;
  contentPillars: { title: string; description: string }[];
  sources: { web: { uri: string; title: string } }[];
}

export type PostType = 'Single Image' | 'Carousel' | 'Continuation Carousel' | 'Infographic' | 'Guide';

export interface GeneratedPost {
  id: string;
  title: string;
  caption: string;
  hashtags: string[];
  keywords: string[];
  imagePrompt: string;
  imageUrl?: string;
  type: PostType;
  status: 'draft' | 'scheduled' | 'published';
  scheduledAt?: string;
  platforms?: string[];
}

export type AppStep = 'brand' | 'research' | 'pillars' | 'typeSelection' | 'generation' | 'scheduler' | 'dashboard';
