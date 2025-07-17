"use client"

import { useQuery } from "@tanstack/react-query"
import { motion } from "framer-motion"
import { WordSearch } from "@/components/word-search"
import { WordCard } from "@/components/word-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { fetchWordDefinition, getDailyWord } from "@/lib/api"
import { Calendar, TrendingUp } from "lucide-react"

export default function HomePage() {
  const dailyWord = getDailyWord()

  const {
    data: wordData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["daily-word", dailyWord],
    queryFn: () => fetchWordDefinition(dailyWord),
  })

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">İngilizce Kelime Öğrenme</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Her gün yeni kelimeler öğrenin, anlamlarını keşfedin ve İngilizce dil becerinizi geliştirin.
        </p>
      </motion.div>

      {/* Search Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex justify-center"
      >
        <WordSearch />
      </motion.div>

      {/* Daily Word Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="space-y-4"
      >
        <div className="flex items-center justify-center space-x-2">
          <Calendar className="h-5 w-5" />
          <h2 className="text-2xl font-semibold">Günün Kelimesi</h2>
        </div>

        <div className="flex justify-center">
          {isLoading ? (
            <Card className="w-full max-w-2xl">
              <CardHeader>
                <Skeleton className="h-8 w-48" />
              </CardHeader>
              <CardContent className="space-y-4">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </CardContent>
            </Card>
          ) : error ? (
            <Card className="w-full max-w-2xl">
              <CardContent className="pt-6">
                <p className="text-center text-muted-foreground">Günün kelimesi yüklenirken bir hata oluştu.</p>
              </CardContent>
            </Card>
          ) : wordData && wordData[0] ? (
            <WordCard wordData={wordData[0]} showLearnButton={true} />
          ) : null}
        </div>
      </motion.div>

     
    </div>
  )
}
