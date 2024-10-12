import React, { createContext, useState, useEffect, useContext } from 'react';

// Create the FlashcardContext
const FlashcardContext = createContext();

// API URL (replace with your actual URL)
const API_URL = 'https://script.google.com/macros/s/AKfycbzHW8feShgEWJxeSknWqp3tFneCuGwkxhT6oAKTAvj9ntmJKvvfbvsNxRUQLJqu1BdIrw/exec';

// Flashcard Provider Component
export const FlashcardProvider = ({ children }) => {
  const [chapters, setChapters] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch data from API
    fetch(API_URL)
      .then(response => response.json())
      .then(data => {
        categorizeFlashcards(data.results);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  // Function to categorize flashcards by chapter
  const categorizeFlashcards = (results) => {
    const chapterGroups = {};
    results.forEach(item => {
      if (!chapterGroups[item.Chapter]) {
        chapterGroups[item.Chapter] = [];
      }
      chapterGroups[item.Chapter].push(item);
    });
    setChapters(chapterGroups);
  };

  return (
    <FlashcardContext.Provider value={{ chapters, loading }}>
      {children}
    </FlashcardContext.Provider>
  );
};

// Custom hook to use the Flashcard context
export const useFlashcards = () => useContext(FlashcardContext);

