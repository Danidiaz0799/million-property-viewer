/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: '**',
      },
    ],
    domains: [
      'i.ytimg.com',
      'encrypted-tbn0.gstatic.com',
      'yt3.ggpht.com',
      'img.youtube.com',
      'media.istockphoto.com',
      'images.unsplash.com',
      'cdn.pixabay.com',
      'lh3.googleusercontent.com',
      'static.wikia.nocookie.net',
      'm.media-amazon.com',
      's3.amazonaws.com',
      'res.cloudinary.com',
      'placehold.co',
      'img.freepik.com',
      'www.viacelere.com',
      'conaltura.com',
      'picsum.photos',
      'via.placeholder.com',
    ],
  },
}

module.exports = nextConfig
