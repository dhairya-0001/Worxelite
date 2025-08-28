import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Lenis from 'lenis'

function WithLenis({ children }){
  useEffect(() => {
    const lenis = new Lenis({ duration: 1.1, smoothWheel: true, easing: (t) => 1 - Math.pow(1 - t, 3) })
    let rafId
    const raf = (time) => { lenis.raf(time); rafId = requestAnimationFrame(raf) }
    rafId = requestAnimationFrame(raf)
    return () => cancelAnimationFrame(rafId)
  }, [])
  return children
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <WithLenis>
      <App />
    </WithLenis>
  </StrictMode>,
)
