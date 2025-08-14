/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'img.freepik.com',
        port: '',
        pathname: '/**',
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
    ],
  },
}

module.exports = nextConfig
