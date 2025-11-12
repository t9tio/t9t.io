"use client";
import React, { useEffect, useState } from "react";

interface TypewriterProps {
  words: string[];
  typingSpeed?: number; // ms per character when typing
  deletingSpeed?: number; // ms per character when deleting
  pauseBetween?: number; // pause after typing a word before deleting
  className?: string;
}

// Cycles through provided words by typing them out, deleting, then moving to next.
// Keeps (does not delete) the final word once typed.
export const Typewriter: React.FC<TypewriterProps> = ({
  words,
  typingSpeed = 80,
  deletingSpeed = 60,
  pauseBetween = 1000,
  className = "",
}) => {
  const [display, setDisplay] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (words.length === 0) return;
    const currentWord = words[wordIndex];
    const isLastWord = wordIndex === words.length - 1;

    if (isLastWord && !isDeleting && display === currentWord) {
      // Final word typed and should remain.
      setDone(true);
      return;
    }

    let timeout: number;

    if (!isDeleting) {
      // Typing phase
      if (display.length < currentWord.length) {
        timeout = window.setTimeout(() => {
          setDisplay(currentWord.slice(0, display.length + 1));
        }, typingSpeed);
      } else {
        // Word fully typed, schedule delete unless last word
        if (!isLastWord) {
          timeout = window.setTimeout(() => setIsDeleting(true), pauseBetween);
        } else {
          // Last word stays
          setDone(true);
        }
      }
    } else {
      // Deleting phase
      if (display.length > 0) {
        timeout = window.setTimeout(() => {
          setDisplay(currentWord.slice(0, display.length - 1));
        }, deletingSpeed);
      } else {
        // Move to next word
        setIsDeleting(false);
        setWordIndex((i) => i + 1);
      }
    }

    return () => clearTimeout(timeout);
  }, [display, isDeleting, wordIndex, words, typingSpeed, deletingSpeed, pauseBetween]);

  return (
    <span className={className}>
      {display}
      {!done && <span className="inline-block w-px animate-pulse bg-black dark:bg-zinc-50 ml-0.5" />}
    </span>
  );
};

export default Typewriter;
