// Función para generar SVG placeholder
function generatePropertySVG(width: number, height: number, color: string, text: string): string {
  return `data:image/svg+xml,${encodeURIComponent(`
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="${color}"/>
      <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="24" font-weight="bold" 
            text-anchor="middle" dominant-baseline="central" fill="white">
        ${text}
      </text>
    </svg>
  `)}`
}

export { generatePropertySVG };
