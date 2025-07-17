"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useWordStore } from "@/lib/store"
import { Heart, Trash2, BookOpen, Calendar } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function MyWordsPage() {
  const { savedWords, learnedWords, removeSavedWord } = useWordStore()
  const { toast } = useToast()

  const handleRemoveWord = (word: string) => {
    removeSavedWord(word)
    toast({
      title: "Kelime kaldırıldı",
      description: `"${word}" kelimelerinizden kaldırıldı.`,
    })
  }

  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center space-y-4">
        <h1 className="text-3xl font-bold tracking-tight">Kelimelerim</h1>
        <p className="text-muted-foreground">Kaydettiğiniz ve öğrendiğiniz kelimeleri burada bulabilirsiniz.</p>
      </motion.div>

      {/* Learned Words Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="space-y-4"
      >
        <div className="flex items-center space-x-2">
          <BookOpen className="h-5 w-5 text-green-600" />
          <h2 className="text-xl font-semibold">Öğrenilen Kelimeler</h2>
          <Badge className="bg-green-500 hover:bg-green-600">{learnedWords.length}</Badge>
        </div>

        {learnedWords.length === 0 ? (
          <Card>
            <CardContent className="pt-6 text-center">
              <p className="text-muted-foreground">
                Henüz öğrendiğiniz kelime yok. Günün kelimesini öğrenmeye başlayın!
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {learnedWords.map((word, index) => (
              <motion.div
                key={word.word}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card>
                  <CardContent className="pt-4">
                    <div className="space-y-2">
                      <h3 className="font-semibold text-lg">{word.word}</h3>
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        <span>{new Date(word.learnedAt).toLocaleDateString("tr-TR")}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>

      {/* Saved Words Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="space-y-4"
      >
        <div className="flex items-center space-x-2">
          <Heart className="h-5 w-5 text-red-500" />
          <h2 className="text-xl font-semibold">Kaydedilen Kelimeler</h2>
          <Badge variant="secondary">{savedWords.length}</Badge>
        </div>

        {savedWords.length === 0 ? (
          <Card>
            <CardContent className="pt-6 text-center">
              <p className="text-muted-foreground">
                Henüz kaydettiğiniz kelime yok. Kelime ararken kalp ikonuna tıklayarak kelimeleri kaydedebilirsiniz.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {savedWords.map((word, index) => (
              <motion.div
                key={word.word}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <CardTitle className="text-xl">{word.word}</CardTitle>
                        <Badge variant="outline">{word.partOfSpeech}</Badge>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleRemoveWord(word.word)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm leading-relaxed">{word.definition}</p>
                    <div className="flex items-center space-x-2 mt-3 text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      <span>{new Date(word.savedAt).toLocaleDateString("tr-TR")}</span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  )
}
