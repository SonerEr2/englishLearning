"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"

interface SavedWord {
  word: string
  definition: string
  partOfSpeech: string
  savedAt: string
}

interface LearnedWord {
  word: string
  learnedAt: string
}

interface WordStore {
  savedWords: SavedWord[]
  learnedWords: LearnedWord[]
  addSavedWord: (word: SavedWord) => void
  removeSavedWord: (word: string) => void
  addLearnedWord: (word: string) => void
  isWordSaved: (word: string) => boolean
  isWordLearned: (word: string) => boolean
}

export const useWordStore = create<WordStore>()(
  persist(
    (set, get) => ({
      savedWords: [],
      learnedWords: [],

      addSavedWord: (word) =>
        set((state) => ({
          savedWords: [...state.savedWords.filter((w) => w.word !== word.word), word],
        })),

      removeSavedWord: (word) =>
        set((state) => ({
          savedWords: state.savedWords.filter((w) => w.word !== word),
        })),

      addLearnedWord: (word) =>
        set((state) => ({
          learnedWords: [
            ...state.learnedWords.filter((w) => w.word !== word),
            {
              word,
              learnedAt: new Date().toISOString(),
            },
          ],
        })),

      isWordSaved: (word) => get().savedWords.some((w) => w.word === word),
      isWordLearned: (word) => get().learnedWords.some((w) => w.word === word),
    }),
    {
      name: "word-storage",
    },
  ),
)
