import { create } from 'zustand';
import contentData from '../content.json';

const useContent = create((set, get) => ({
  content: contentData,
  loading: false,
  error: null,

  // Get hero data
  getHero: () => {
    const { content } = get();
    return content.hero;
  },

  // Get branding
  getBranding: () => {
    const { content } = get();
    return content.branding;
  },

  // Get story
  getStory: () => {
    const { content } = get();
    return content.story;
  },

  // Get all stories
  getStories: () => {
    const { content } = get();
    return content.stories || [];
  },

  // Get story by ID
  getStoryById: (id) => {
    const { content } = get();
    const stories = content.stories || [];
    return stories.find(story => story.id === id);
  },

  // Get public stories only
  getPublicStories: () => {
    const { content } = get();
    const stories = content.stories || [];
    return stories.filter(story => {
      if (story.status === 'private') return false;
      if (story.status === 'public') return true;
      if (story.unlockAt) {
        const unlockDate = new Date(story.unlockAt);
        return new Date() >= unlockDate;
      }
      return true;
    });
  },

  // Check if story is unlocked
  isStoryUnlocked: (story) => {
    if (story.status === 'private') return false;
    if (story.status === 'public') return true;
    if (story.unlockAt) {
      const unlockDate = new Date(story.unlockAt);
      return new Date() >= unlockDate;
    }
    return true;
  },

  // Reload content (for future use)
  reloadContent: async () => {
    set({ loading: true, error: null });
    try {
      // In MVP, we're using static import
      // In future, could fetch from API
      set({ content: contentData, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
}));

export default useContent;

