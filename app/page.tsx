"use client"

import { Download, Play, ArrowLeft, Wrench } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { headingNow } from "./fonts"

const VIDEO_URL = "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Vls%20On%202-CstJqg1suVb6nbagY29HvwGXGmqs1g.mp4"
const APK_URL = encodeURI("/images/ASpy.apk")

type PhoneId = "samsung" | "motorola" | "xiaomi" | "iphone"

const PHONE_VIDEO_URLS: Partial<Record<PhoneId, string>> = {
  samsung: encodeURI("/images/SAMSUNG.mp4"),
  motorola: encodeURI("/images/HELLO MOTO.mp4"),
  xiaomi: encodeURI("/images/XIAOMI.mp4"),
}

const getVideoUrlForPhone = (phoneId: PhoneId) => PHONE_VIDEO_URLS[phoneId] ?? VIDEO_URL

const PHONE_OPTIONS = [
  { id: "samsung", name: "Samsung", logo: "/images/samsung.png" },
  { id: "motorola", name: "Motorola", logo: "/images/motorola-logo.png" },
  { id: "xiaomi", name: "Xiaomi", logo: "/images/xiaomi-logo-282021-29.png" },
  { id: "iphone", name: "iPhone", logo: "/images/apple-logo.png" },
]

export default function VideoPage() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [showPhoneOptions, setShowPhoneOptions] = useState(false)
  const [selectedPhone, setSelectedPhone] = useState<string | null>(null)
  const [showDownloadButton, setShowDownloadButton] = useState(false)
  const [isPlayingSecondVideo, setIsPlayingSecondVideo] = useState(false)
  const [showHeroCaption, setShowHeroCaption] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const secondVideoRef = useRef<HTMLVideoElement>(null)
  const downloadTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const timeoutId = setTimeout(() => setShowHeroCaption(true), 1000)
    return () => clearTimeout(timeoutId)
  }, [])

  const handleTimeUpdate = () => {
    if (videoRef.current && videoRef.current.currentTime >= 27 && !showPhoneOptions) {
      setShowPhoneOptions(true)
    }
  }

  const handlePlayClick = () => {
    if (videoRef.current) {
      videoRef.current.volume = 1
      videoRef.current.play()
      setIsPlaying(true)
    }
  }

  const handleSecondVideoPlayClick = () => {
    if (secondVideoRef.current) {
      secondVideoRef.current.volume = 1
      secondVideoRef.current.play()
      setIsPlayingSecondVideo(true)
    }
  }

  const handleVideoPlay = () => setIsPlaying(true)
  const handleVideoPause = () => setIsPlaying(false)

  const handleSecondVideoPlay = () => setIsPlayingSecondVideo(true)
  const handleSecondVideoPause = () => setIsPlayingSecondVideo(false)

  const handlePhoneSelect = (phoneId: string) => {
    setSelectedPhone(phoneId)
    setShowDownloadButton(false)
    setIsPlayingSecondVideo(false)

    if (downloadTimeoutRef.current) {
      clearTimeout(downloadTimeoutRef.current)
    }

    downloadTimeoutRef.current = setTimeout(() => {
      setShowDownloadButton(true)
    }, 5000)
  }

  const handleBack = () => {
    setSelectedPhone(null)
    setShowDownloadButton(false)
    setIsPlayingSecondVideo(false)

    if (downloadTimeoutRef.current) {
      clearTimeout(downloadTimeoutRef.current)
      downloadTimeoutRef.current = null
    }
  }

  if (selectedPhone === "iphone") {
    return (
      <main className="min-h-screen bg-black/90 flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-3xl flex flex-col items-center gap-6">
          <button
            onClick={handleBack}
            className="self-start flex items-center gap-2 text-white hover:text-red-500 transition-colors mb-2"
          >
            <ArrowLeft className="w-6 h-6" />
            <span className="font-semibold">Voltar</span>
          </button>

          <div className="flex flex-col items-center gap-6 py-16">
            <Wrench className="w-24 h-24 text-yellow-500" />
            <h2 className="text-white text-3xl font-bold text-center">Em Manutenção</h2>
            <p className="text-neutral-400 text-center text-lg">
              Esta opção está temporariamente indisponível. Por favor, tente novamente mais tarde.
            </p>
          </div>
        </div>
      </main>
    )
  }

  if (selectedPhone) {
    const phone = PHONE_OPTIONS.find((p) => p.id === selectedPhone)
    const showWhatsApp = selectedPhone === "samsung" || selectedPhone === "motorola" || selectedPhone === "xiaomi"
    return (
      <main className="min-h-screen bg-black/90 flex flex-col items-center justify-center p-4">
        {showWhatsApp && (
          <a
            href="https://wa.me/31973316306"
            aria-label="Falar no WhatsApp"
            className="fixed left-4 bottom-4 z-50 inline-flex h-10 w-10 items-center justify-center rounded-full border border-emerald-300/30 bg-[#25D366]/25 text-[#25D366] backdrop-blur hover:bg-[#25D366]/35 transition-colors"
          >
            <svg viewBox="0 0 32 32" className="h-5 w-5" fill="currentColor" aria-hidden="true">
              <path d="M19.11 17.39c-.27-.14-1.58-.78-1.83-.87-.25-.09-.43-.14-.61.14-.18.27-.7.87-.86 1.05-.16.18-.32.2-.59.07-.27-.14-1.14-.42-2.17-1.34-.8-.71-1.34-1.58-1.5-1.86-.16-.27-.02-.42.12-.55.12-.12.27-.32.41-.48.14-.16.18-.27.27-.45.09-.18.05-.34-.02-.48-.07-.14-.61-1.47-.84-2.01-.22-.53-.45-.46-.61-.47-.16-.01-.34-.01-.52-.01-.18 0-.48.07-.73.34-.25.27-.96.94-.96 2.29s.98 2.65 1.12 2.83c.14.18 1.93 2.95 4.68 4.13.65.28 1.16.45 1.55.57.65.21 1.25.18 1.72.11.53-.08 1.58-.65 1.81-1.27.22-.62.22-1.16.16-1.27-.07-.11-.25-.18-.52-.32z"/>
              <path d="M26.67 5.33C23.84 2.5 20.08.94 16.08.94 7.93.94 1.33 7.54 1.33 15.69c0 2.61.68 5.16 1.98 7.4L1.2 30.94l8.02-2.1c2.18 1.19 4.64 1.82 7.16 1.82h.01c8.15 0 14.75-6.6 14.75-14.75 0-3.99-1.56-7.75-4.39-10.58zm-10.59 22.8h-.01c-2.21 0-4.38-.59-6.27-1.72l-.45-.27-4.76 1.25 1.27-4.64-.29-.48a12.36 12.36 0 0 1-1.89-6.58C3.68 8.9 9.29 3.29 16.08 3.29c3.3 0 6.4 1.29 8.73 3.62a12.27 12.27 0 0 1 3.62 8.73c0 6.79-5.61 12.49-12.35 12.49z"/>
            </svg>
          </a>
        )}
        <div className="w-full max-w-3xl flex flex-col items-center gap-6">
          {/* Back Button */}
          <button
            onClick={handleBack}
            className="self-start flex items-center gap-2 text-white hover:text-red-500 transition-colors mb-2"
          >
            <ArrowLeft className="w-6 h-6" />
            <span className="font-semibold">Voltar</span>
          </button>

          <h2 className="text-white text-xl font-bold">{phone?.name}</h2>

          {/* Second Video Player */}
          <div
            className="relative w-full max-w-sm md:max-w-md rounded-lg overflow-hidden border border-neutral-800"
            style={{ aspectRatio: "9 / 16" }}
          >
            <video
              ref={secondVideoRef}
              className="w-full h-full object-cover"
              controls
              controlsList="nodownload nofullscreen"
              disablePictureInPicture
              onPlay={handleSecondVideoPlay}
              onPause={handleSecondVideoPause}
            >
              <source src={getVideoUrlForPhone(selectedPhone as PhoneId)} type="video/mp4" />
              Seu navegador não suporta a reprodução de vídeo.
            </video>

            {!isPlayingSecondVideo && (
              <button
                onClick={handleSecondVideoPlayClick}
                className="absolute inset-0 flex items-center justify-center bg-black/40 transition-opacity hover:bg-black/50"
                aria-label="Reproduzir vídeo"
              >
                <div className="w-20 h-20 md:w-24 md:h-24 bg-red-600 rounded-full flex items-center justify-center shadow-lg shadow-red-600/50 hover:scale-110 transition-transform">
                  <Play className="w-10 h-10 md:w-12 md:h-12 text-white fill-white ml-1" />
                </div>
              </button>
            )}
          </div>

          {/* Download Button - appears at 30 seconds */}
          {showDownloadButton && (
            <a
              href={APK_URL}
              download="ASpy.apk"
              className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors animate-pulse"
            >
              <Download className="w-5 h-5" />
              Download
            </a>
          )}
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-black/90 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-3xl flex flex-col items-center gap-6">
        {/* Video Player */}
        <div className="relative w-full">
          <div
            className={
              "pointer-events-none absolute inset-x-0 bottom-full mb-2 z-10 flex h-[clamp(180px,34vw,320px)] sm:h-[clamp(120px,16vw,220px)] md:h-[clamp(96px,10vw,170px)] lg:h-[clamp(88px,8vw,150px)] items-center justify-center px-3 transition-all duration-700 ease-out " +
              (showHeroCaption ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-3")
            }
          >
            <div
              className={
                headingNow.className +
                " w-full max-w-[92%] text-center text-white leading-[0.9] drop-shadow-[0_3px_18px_rgba(0,0,0,0.85)] text-[clamp(40px,9vw,84px)] sm:text-[clamp(30px,5vw,72px)] md:text-[clamp(26px,3.6vw,60px)] lg:text-[clamp(24px,3vw,56px)]"
              }
            >
              <div>Monitore cada movimento</div>
              <div>e conversa com a tecnologia</div>
              <div>de ponta com nosso app.</div>
            </div>
          </div>

          <div className="relative w-full aspect-video rounded-lg overflow-hidden border border-neutral-800">
          <video
            ref={videoRef}
            className="w-full h-full object-cover cursor-pointer"
            onClick={() => {
              if (videoRef.current) {
                if (videoRef.current.paused) {
                  videoRef.current.play()
                  setIsPlaying(true)
                } else {
                  videoRef.current.pause()
                  setIsPlaying(false)
                }
              }
            }}
            onPlay={handleVideoPlay}
            onPause={handleVideoPause}
            onTimeUpdate={handleTimeUpdate}
          >
            <source src={VIDEO_URL} type="video/mp4" />
            Seu navegador não suporta a reprodução de vídeo.
          </video>

          {!isPlaying && !showPhoneOptions && (
            <button
              onClick={handlePlayClick}
              className="absolute inset-0 flex items-center justify-center bg-black/40 transition-opacity hover:bg-black/50"
              aria-label="Reproduzir vídeo"
            >
              <div className="w-20 h-20 md:w-24 md:h-24 bg-red-600 rounded-full flex items-center justify-center shadow-lg shadow-red-600/50 hover:scale-110 transition-transform">
                <Play className="w-10 h-10 md:w-12 md:h-12 text-white fill-white ml-1" />
              </div>
            </button>
          )}
          </div>
        </div>

        {/* Phone Options - appear at 27 seconds */}
        {showPhoneOptions && (
          <div className="w-full">
            <h3 className="text-white text-center text-xl font-bold mb-4">Escolha seu celular:</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {PHONE_OPTIONS.map((phone) => (
                <button
                  key={phone.id}
                  onClick={() => handlePhoneSelect(phone.id)}
                  className="bg-white border border-neutral-700 hover:border-red-600 rounded-xl p-4 flex flex-col items-center gap-3 transition-all hover:scale-105"
                >
                  <div className="w-20 h-20 relative flex items-center justify-center">
                    <Image src={phone.logo || "/placeholder.svg"} alt={phone.name} fill className="object-contain" />
                  </div>
                  <span className="text-black font-semibold">{phone.name}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
