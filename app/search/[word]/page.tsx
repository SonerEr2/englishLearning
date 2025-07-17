"use client"

import { useQuery } from "@tanstack/react-query"
import { motion } from "framer-motion"
import Link from "next/link"
import { WordCard } from "@/components/word-card"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { fetchWordDefinition } from "@/lib/api"
import { ArrowLeft, AlertCircle } from "lucide-react"

interface SearchPageProps {
  params: { word: string }
}

export default function SearchPage({ params }: SearchPageProps) {
  const decodedWord = decodeURIComponent(params.word)

  const {
    data: wordData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["word", decodedWord],
    queryFn: () => fetchWordDefinition(decodedWord),
  })

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
        <Button variant="ghost" asChild>
          <Link href="/" className="flex items-center space-x-2">
            <ArrowLeft className="h-4 w-4" />
            <span>Ana Sayfaya Dön</span>
          </Link>
        </Button>
      </motion.div>

      <div className="flex justify-center">
        {isLoading ? (
          <Card className="w-full max-w-2xl">
            <CardContent className="pt-6 space-y-4">
              <Skeleton className="h-8 w-48" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </CardContent>
          </Card>
        ) : error ? (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Card className="w-full max-w-2xl">
              <CardContent className="pt-6 text-center space-y-4">
                <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto" />
                <h2 className="text-xl font-semibold">Kelime Bulunamadı</h2>
                <p className="text-muted-foreground">
                  "{decodedWord}" kelimesi sözlükte bulunamadı. Lütfen yazımını kontrol edin.
                </p>
                <Button asChild>
                  <Link href="/">Yeni Arama Yap</Link>
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ) : wordData && wordData[0] ? (
          <WordCard wordData={wordData[0]} />
        ) : null}
      </div>
    </div>
  )
}
