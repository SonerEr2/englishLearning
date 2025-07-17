"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { useWordStore } from "@/lib/store"
import type { WordDefinition } from "@/lib/api"
import { Heart, Volume2, BookOpen, Check } from "lucide-react"

interface WordCardProps {
  wordData: WordDefinition
  showLearnButton?: boolean
}

export function WordCard({ wordData, showLearnButton = false }: WordCardProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const { toast } = useToast()
  const { addSavedWord, removeSavedWord, addLearnedWord, isWordSaved, isWordLearned } = useWordStore()

  const isSaved = isWordSaved(wordData.word)
  const isLearned = isWordLearned(wordData.word)

  const playAudio = () => {
    const audioUrl = wordData.phonetics.find((p) => p.audio)?.audio
    if (audioUrl) {
      setIsPlaying(true)
      const audio = new Audio(audioUrl)
      audio.onended = () => setIsPlaying(false)
      audio.onerror = () => {
        setIsPlaying(false)
        toast({
          title: "Ses oynatılamadı",
          description: "Ses dosyası bulunamadı veya oynatılamadı.",
          variant: "destructive",
        })
      }
      audio.play()
    } else {
      toast({
        title: "Ses bulunamadı",
        description: "Bu kelime için ses dosyası mevcut değil.",
        variant: "destructive",
      })
    }
  }

  const toggleSaved = () => {
    if (isSaved) {
      removeSavedWord(wordData.word)
      toast({
        title: "Kelime kaldırıldı",
        description: `"${wordData.word}" kelimelerinizden kaldırıldı.`,
      })
    } else {
      const firstMeaning = wordData.meanings[0]
      const firstDefinition = firstMeaning.definitions[0]

      addSavedWord({
        word: wordData.word,
        definition: firstDefinition.definition,
        partOfSpeech: firstMeaning.partOfSpeech,
        savedAt: new Date().toISOString(),
      })

      toast({
        title: "Kelime kaydedildi",
        description: `"${wordData.word}" kelimelerinize eklendi.`,
      })
    }
  }

  const markAsLearned = () => {
    addLearnedWord(wordData.word)
    toast({
      title: "Tebrikler!",
      description: `"${wordData.word}" kelimesini öğrendiniz!`,
    })
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <CardTitle className="text-3xl font-bold">{wordData.word}</CardTitle>
              {wordData.phonetic && (
                <Badge variant="secondary" className="text-sm">
                  {wordData.phonetic}
                </Badge>
              )}
              {isLearned && (
                <Badge className="bg-green-500 hover:bg-green-600">
                  <Check className="h-3 w-3 mr-1" />
                  Öğrenildi
                </Badge>
              )}
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="icon" onClick={playAudio} disabled={isPlaying}>
                <Volume2 className="h-4 w-4" />
              </Button>
              <Button variant={isSaved ? "default" : "outline"} size="icon" onClick={toggleSaved}>
                <Heart className={`h-4 w-4 ${isSaved ? "fill-current" : ""}`} />
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {wordData.meanings.map((meaning, index) => (
            <div key={index} className="space-y-3">
              <Badge variant="outline" className="text-sm">
                {meaning.partOfSpeech}
              </Badge>

              <div className="space-y-2">
                {meaning.definitions.slice(0, 3).map((def, defIndex) => (
                  <div key={defIndex} className="border-l-2 border-primary/20 pl-4">
                    <p className="text-sm leading-relaxed">{def.definition}</p>
                    {def.example && <p className="text-sm text-muted-foreground italic mt-1">Örnek: "{def.example}"</p>}
                  </div>
                ))}
              </div>

              {meaning.synonyms && meaning.synonyms.length > 0 && (
                <div>
                  <p className="text-sm font-medium mb-2">Eş anlamlılar:</p>
                  <div className="flex flex-wrap gap-1">
                    {meaning.synonyms.slice(0, 5).map((synonym, synIndex) => (
                      <Badge key={synIndex} variant="secondary" className="text-xs">
                        {synonym}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {meaning.antonyms && meaning.antonyms.length > 0 && (
                <div>
                  <p className="text-sm font-medium mb-2">Zıt anlamlılar:</p>
                  <div className="flex flex-wrap gap-1">
                    {meaning.antonyms.slice(0, 5).map((antonym, antIndex) => (
                      <Badge key={antIndex} variant="destructive" className="text-xs">
                        {antonym}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}

          {showLearnButton && !isLearned && (
            <div className="pt-4 border-t">
              <Button onClick={markAsLearned} className="w-full">
                <BookOpen className="h-4 w-4 mr-2" />
                Bu kelimeyi öğrendim
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}
