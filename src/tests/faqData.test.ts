import { describe, it, expect } from 'vitest';
import {
  printCollateralFAQs,
  videoMotionFAQs,
  photographyFAQs,
  packagingDesignFAQs,
  cgiCampaignsFAQs,
  aiContentFAQs,
  eventBrandingFAQs,
  emailMarketingFAQs,
  creativeDirectionFAQs,
  seoGeoFAQs,
  rapidDeliveryFAQs,
} from '../utils/faq-data';

const allFaqSets = [
  { name: 'printCollateralFAQs', data: printCollateralFAQs },
  { name: 'videoMotionFAQs', data: videoMotionFAQs },
  { name: 'photographyFAQs', data: photographyFAQs },
  { name: 'packagingDesignFAQs', data: packagingDesignFAQs },
  { name: 'cgiCampaignsFAQs', data: cgiCampaignsFAQs },
  { name: 'aiContentFAQs', data: aiContentFAQs },
  { name: 'eventBrandingFAQs', data: eventBrandingFAQs },
  { name: 'emailMarketingFAQs', data: emailMarketingFAQs },
  { name: 'creativeDirectionFAQs', data: creativeDirectionFAQs },
  { name: 'seoGeoFAQs', data: seoGeoFAQs },
  { name: 'rapidDeliveryFAQs', data: rapidDeliveryFAQs },
];

describe('FAQ data exports', () => {
  it.each(allFaqSets)('$name is a non-empty array', ({ data }) => {
    expect(Array.isArray(data)).toBe(true);
    expect(data.length).toBeGreaterThan(0);
  });

  it.each(allFaqSets)('$name entries have question and answer strings', ({ data }) => {
    for (const faq of data) {
      expect(typeof faq.question).toBe('string');
      expect(faq.question.length).toBeGreaterThan(0);
      expect(typeof faq.answer).toBe('string');
      expect(faq.answer.length).toBeGreaterThan(0);
    }
  });

  it.each(allFaqSets)('$name questions end with "?"', ({ data }) => {
    for (const faq of data) {
      expect(faq.question.endsWith('?')).toBe(true);
    }
  });

  it.each(allFaqSets)('$name has no duplicate questions', ({ data }) => {
    const questions = data.map(f => f.question);
    const unique = new Set(questions);
    expect(unique.size).toBe(questions.length);
  });

  it('all FAQ sets have at least 5 entries', () => {
    for (const { name, data } of allFaqSets) {
      expect(data.length, `${name} should have >= 5 entries`).toBeGreaterThanOrEqual(5);
    }
  });
});
