// app/page.tsx veya pages/index.tsx

import dynamic from 'next/dynamic'

// ⛔️ SSR'yi devre dışı bırakıyoruz!
const WebcamFaceTracker = dynamic(() => import('./components/FaceTracker'), {
  ssr: false,
  loading: () => <p>Yükleniyor...</p>,
})

export default function HomePage() {
  return (
    <main>
      <h1>Canlı Yüz Analizi</h1>
      <WebcamFaceTracker />
    </main>
  )
}
