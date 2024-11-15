// SpotifyEmbed.tsx

import { QuartzComponent } from "./types"

const SpotifyEmbed: QuartzComponent = () => {
  return (
    <iframe
      style={{ borderRadius: "12px" }}
      src="https://open.spotify.com/embed/album/4R6FV9NSzhPihHR0h4pI93?utm_source=generator"
      width="100%"
      height="352"
      frameBorder="0"
      allowFullScreen
      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      loading="lazy"
    ></iframe>
  )
}

export default SpotifyEmbed
