export interface WordDefinition {
  word: string
  phonetic?: string
  phonetics: Array<{
    text?: string
    audio?: string
  }>
  meanings: Array<{
    partOfSpeech: string
    definitions: Array<{
      definition: string
      example?: string
      synonyms?: string[]
      antonyms?: string[]
    }>
    synonyms?: string[]
    antonyms?: string[]
  }>
}

export async function fetchWordDefinition(word: string): Promise<WordDefinition[]> {
  const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)

  if (!response.ok) {
    throw new Error("Word not found")
  }

  return response.json()
}

export const dailyWords = [
  "serendipity",
  "ephemeral",
  "mellifluous",
  "petrichor",
  "wanderlust",
  "eloquent",
  "resilient",
  "authentic",
  "innovative",
  "compassionate",
  "ambitious",
  "meticulous",
  "versatile",
  "profound",
  "magnificent",
  "brilliant",
  "graceful",
  "harmonious",
  "inspiring",
  "luminous",
  "peaceful",
  "radiant",
  "serene",
  "tranquil",
  "vibrant",
  "wisdom",
  "courage",
  "kindness",
  "patience",
  "gratitude",
]

export function getDailyWord(): string {
  const today = new Date()
  const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000)
  return dailyWords[dayOfYear % dailyWords.length]
}
