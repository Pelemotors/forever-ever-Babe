import { isUnlocked } from './time';

// Filter stories by visibility
export const filterStories = (stories, userRole = 'guest') => {
  return stories.filter(story => {
    // Private stories - only admin can see
    if (story.status === 'private') {
      return userRole === 'admin';
    }

    // Public stories - everyone can see
    if (story.status === 'public') {
      return true;
    }

    // Locked stories - check unlock date
    if (story.unlockAt) {
      const unlocked = isUnlocked(story.unlockAt);
      // If locked, only admin can see
      if (!unlocked) {
        return userRole === 'admin';
      }
      return true;
    }

    // Default: show public
    return true;
  });
};

// Check if story should be displayed as locked
export const shouldShowAsLocked = (story, userRole = 'guest') => {
  if (userRole === 'admin') return false; // Admin sees everything unlocked
  
  if (story.unlockAt) {
    return !isUnlocked(story.unlockAt);
  }
  
  return false;
};

// Get story excerpt
export const getStoryExcerpt = (story, maxLength = 150) => {
  if (!story.body || story.body.length === 0) return '';
  
  const firstParagraph = story.body[0];
  if (firstParagraph.length <= maxLength) return firstParagraph;
  
  return firstParagraph.substring(0, maxLength) + '...';
};

// Sort stories by date or custom order
export const sortStories = (stories, sortBy = 'date') => {
  if (sortBy === 'date') {
    return [...stories].sort((a, b) => {
      const dateA = a.createdAt ? new Date(a.createdAt) : new Date();
      const dateB = b.createdAt ? new Date(b.createdAt) : new Date();
      return dateB - dateA; // Newest first
    });
  }
  
  return stories; // Keep original order
};

export default {
  filterStories,
  shouldShowAsLocked,
  getStoryExcerpt,
  sortStories,
};

