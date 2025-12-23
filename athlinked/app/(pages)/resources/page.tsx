'use client';

import { useState } from 'react';
import { Upload, ExternalLink, X, Play, Link2 } from 'lucide-react';
import NavigationBar from '@/components/NavigationBar';
import RightSideBar from '@/components/RightSideBar';

type TabType = 'guides' | 'videos' | 'templates';

interface Resource {
  id: string;
  title: string;
  image: string;
  link?: string;
  type?: 'image' | 'video' | 'pdf' | 'article';
}

export default function ManageResourcesPage() {
  const [activeTab, setActiveTab] = useState<TabType>('guides');
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [showUrlModal, setShowUrlModal] = useState(false);
  const [articleUrl, setArticleUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Initial data with real images from Unsplash (free to use)
  const initialGuidesData: Resource[] = [
    {
      id: '1',
      title: 'Varsity Soccer League Finals',
      image:
        'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=500&h=300&fit=crop',
      link: 'https://example.com/article-1',
      type: 'article',
    },
    {
      id: '2',
      title: 'Next-Gen Athlete Training',
      image:
        'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=500&h=300&fit=crop',
      link: 'https://example.com/article-2',
      type: 'article',
    },
    {
      id: '3',
      title: 'Holistic Wellness for Athletes',
      image:
        'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=500&h=300&fit=crop',
      link: 'https://example.com/article-3',
      type: 'article',
    },
    {
      id: '4',
      title: 'Mastering Mental Toughness',
      image:
        'https://images.unsplash.com/photo-1487956382158-bb926046304a?w=500&h=300&fit=crop',
      link: 'https://example.com/article-4',
      type: 'article',
    },
    {
      id: '5',
      title: 'Nutrition for Peak Performance',
      image:
        'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=500&h=300&fit=crop',
      link: 'https://example.com/article-5',
      type: 'article',
    },
    {
      id: '6',
      title: 'Effective Recovery Techniques',
      image:
        'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=500&h=300&fit=crop',
      link: 'https://example.com/article-6',
      type: 'article',
    },
  ];

  const initialVideosData: Resource[] = [
    {
      id: '1',
      title: 'Basketball Training Fundamentals',
      image:
        'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=500&h=300&fit=crop',
      link: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      type: 'video',
    },
    {
      id: '2',
      title: 'Soccer Skills & Techniques',
      image:
        'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=500&h=300&fit=crop',
      link: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
      type: 'video',
    },
    {
      id: '3',
      title: 'Strength & Conditioning Workout',
      image:
        'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=500&h=300&fit=crop',
      link: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
      type: 'video',
    },
    {
      id: '4',
      title: 'Track & Field Sprint Training',
      image:
        'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=500&h=300&fit=crop',
      link: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
      type: 'video',
    },
  ];

  const initialTemplatesData: Resource[] = [
    {
      id: '1',
      title: 'Training Schedule Template',
      image:
        'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=500&h=300&fit=crop',
      link: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
      type: 'pdf',
    },
    {
      id: '2',
      title: 'Performance Tracking Sheet',
      image:
        'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=500&h=300&fit=crop',
      link: 'https://www.africau.edu/images/default/sample.pdf',
      type: 'pdf',
    },
  ];

  // State for each tab's data
  const [guidesData, setGuidesData] = useState<Resource[]>(initialGuidesData);
  const [videosData, setVideosData] = useState<Resource[]>(initialVideosData);
  const [templatesData, setTemplatesData] =
    useState<Resource[]>(initialTemplatesData);

  const getCurrentData = () => {
    switch (activeTab) {
      case 'guides':
        return guidesData;
      case 'videos':
        return videosData;
      case 'templates':
        return templatesData;
      default:
        return guidesData;
    }
  };

  const handleDelete = (id: string) => {
    // Remove the item based on active tab
    switch (activeTab) {
      case 'guides':
        setGuidesData(guidesData.filter(item => item.id !== id));
        break;
      case 'videos':
        setVideosData(videosData.filter(item => item.id !== id));
        break;
      case 'templates':
        setTemplatesData(templatesData.filter(item => item.id !== id));
        break;
    }
  };

  const scrapeArticleMetadata = async (url: string) => {
    try {
      // Use a CORS proxy to fetch the article
      const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`;
      const response = await fetch(proxyUrl);
      const data = await response.json();
      const html = data.contents;

      // Create a temporary DOM element to parse the HTML
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');

      // Extract title
      let title =
        doc
          .querySelector('meta[property="og:title"]')
          ?.getAttribute('content') ||
        doc
          .querySelector('meta[name="twitter:title"]')
          ?.getAttribute('content') ||
        doc.querySelector('title')?.textContent ||
        'Untitled Article';

      // Extract image
      let image =
        doc
          .querySelector('meta[property="og:image"]')
          ?.getAttribute('content') ||
        doc
          .querySelector('meta[name="twitter:image"]')
          ?.getAttribute('content') ||
        doc.querySelector('img')?.getAttribute('src') ||
        'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=500&h=300&fit=crop';

      // Make sure image URL is absolute
      if (image && !image.startsWith('http')) {
        const urlObj = new URL(url);
        image = urlObj.origin + (image.startsWith('/') ? '' : '/') + image;
      }

      return { title, image };
    } catch (error) {
      console.error('Error scraping article:', error);
      return {
        title: 'Article',
        image:
          'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=500&h=300&fit=crop',
      };
    }
  };

  const handleAddArticle = async () => {
    if (!articleUrl.trim()) return;

    setIsLoading(true);

    try {
      const { title, image } = await scrapeArticleMetadata(articleUrl);

      const newArticle: Resource = {
        id: Date.now().toString() + Math.random(),
        title: title,
        image: image,
        link: articleUrl,
        type: 'article',
      };

      setGuidesData([...guidesData, newArticle]);
      setShowUrlModal(false);
      setArticleUrl('');
    } catch (error) {
      console.error('Error adding article:', error);
      alert('Failed to add article. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpload = () => {
    // For guides tab, show URL modal
    if (activeTab === 'guides') {
      setShowUrlModal(true);
      return;
    }

    // For other tabs, use file upload
    const fileInput = document.createElement('input');
    fileInput.type = 'file';

    // Set accept attribute based on active tab
    switch (activeTab) {
      case 'videos':
        fileInput.accept = 'video/*';
        break;
      case 'templates':
        fileInput.accept = '.pdf,application/pdf';
        break;
    }

    fileInput.multiple = true;

    fileInput.onchange = (e: Event) => {
      const target = e.target as HTMLInputElement;
      const files = target.files;

      if (files) {
        Array.from(files).forEach(file => {
          if (file.type === 'application/pdf') {
            // For PDFs, use blob URL directly
            const blobUrl = URL.createObjectURL(file);
            const thumbnailUrl =
              'https://images.unsplash.com/photo-1568667256549-094345857637?w=500&h=300&fit=crop';

            const newResource: Resource = {
              id: Date.now().toString() + Math.random(),
              title: file.name.replace(/\.[^/.]+$/, ''),
              image: thumbnailUrl,
              link: blobUrl,
              type: 'pdf',
            };

            setTemplatesData(prev => [...prev, newResource]);
          } else if (file.type.startsWith('video/')) {
            // For videos, create blob URL and generate thumbnail
            const blobUrl = URL.createObjectURL(file);

            const video = document.createElement('video');
            video.src = blobUrl;
            video.currentTime = 1;

            video.onloadeddata = () => {
              const canvas = document.createElement('canvas');
              canvas.width = video.videoWidth;
              canvas.height = video.videoHeight;
              const ctx = canvas.getContext('2d');

              if (ctx) {
                ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
                const thumbnailUrl = canvas.toDataURL('image/jpeg');

                const newResource: Resource = {
                  id: Date.now().toString() + Math.random(),
                  title: file.name.replace(/\.[^/.]+$/, ''),
                  image: thumbnailUrl,
                  link: blobUrl,
                  type: 'video',
                };

                setVideosData(prev => [...prev, newResource]);
              }
            };
          }
        });
      }
    };

    fileInput.click();
  };

  const handleCardClick = (resource: Resource) => {
    if (resource.type === 'video' && resource.link) {
      setSelectedVideo(resource.link);
    } else if (resource.type === 'pdf' && resource.link) {
      window.open(resource.link, '_blank');
    } else if (resource.type === 'article' && resource.link) {
      window.open(resource.link, '_blank');
    }
  };

  const closeVideoModal = () => {
    setSelectedVideo(null);
  };

  const closeUrlModal = () => {
    setShowUrlModal(false);
    setArticleUrl('');
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Navigation Bar */}
      <NavigationBar activeItem="resource" userName="Athlete Name" />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Tabs Navigation */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-center gap-8">
              <button
                onClick={() => setActiveTab('guides')}
                className={`px-6 py-4 text-sm font-medium relative transition-colors ${
                  activeTab === 'guides'
                    ? 'text-[#CB9729]'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Guides & Articles
                {activeTab === 'guides' && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#CB9729]" />
                )}
              </button>
              <button
                onClick={() => setActiveTab('videos')}
                className={`px-6 py-4 text-sm font-medium relative transition-colors ${
                  activeTab === 'videos'
                    ? 'text-[#CB9729]'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Video Library
                {activeTab === 'videos' && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#CB9729]" />
                )}
              </button>
              <button
                onClick={() => setActiveTab('templates')}
                className={`px-6 py-4 text-sm font-medium relative transition-colors ${
                  activeTab === 'templates'
                    ? 'text-[#CB9729]'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Templates
                {activeTab === 'templates' && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#CB9729]" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-7xl mx-auto p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-semibold text-gray-900">
                Manage Resources
              </h1>
              <button
                onClick={handleUpload}
                className="flex items-center gap-2 bg-[#CB9729] text-white px-5 py-2.5 rounded-lg hover:bg-[#B88624] transition-colors shadow-sm"
              >
                {activeTab === 'guides' ? (
                  <>
                    <Upload className="w-4 h-4" />
                    <span className="font-medium">Upload</span>
                  </>
                ) : (
                  <>
                    <Upload className="w-4 h-4" />
                    <span className="font-medium">Upload</span>
                  </>
                )}
              </button>
            </div>

            {/* Resource Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {getCurrentData().map(resource => (
                <div
                  key={resource.id}
                  className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
                >
                  {/* Image Container */}
                  <div className="relative h-48 bg-gray-100">
                    <img
                      src={resource.image}
                      alt={resource.title}
                      className="w-full h-full object-cover cursor-pointer"
                      onClick={() => handleCardClick(resource)}
                    />
                    {/* Play Icon for Videos */}
                    {resource.type === 'video' && (
                      <div
                        className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 cursor-pointer"
                        onClick={() => handleCardClick(resource)}
                      >
                        <div className="w-16 h-16 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors">
                          <Play
                            className="w-8 h-8 text-white ml-1"
                            fill="currentColor"
                          />
                        </div>
                      </div>
                    )}
                    {/* Delete Button */}
                    <button
                      onClick={e => {
                        e.stopPropagation();
                        handleDelete(resource.id);
                      }}
                      className="absolute top-3 right-3 w-7 h-7 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors shadow-md z-10"
                      aria-label="Delete resource"
                    >
                      <X className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>

                  {/* Card Content */}
                </div>
              ))}
            </div>

            {/* Empty State */}
            {getCurrentData().length === 0 && (
              <div className="text-center py-16">
                <p className="text-gray-500 text-base mb-2">
                  No resources available
                </p>
                <p className="text-gray-400 text-sm">
                  {activeTab === 'guides'
                    ? 'Click Add Article URL to add new content'
                    : 'Click Upload to add new content'}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Right Sidebar */}
      <RightSideBar />

      {/* Article URL Modal */}
      {showUrlModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          onClick={closeUrlModal}
        >
          <div
            className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">
                Upload Article
              </h2>
              <button
                onClick={closeUrlModal}
                className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            <div className="mb-4">
              <input
                type="url"
                value={articleUrl}
                onChange={e => setArticleUrl(e.target.value)}
                placeholder="Enter URL"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#CB9729] focus:border-transparent outline-none"
                disabled={isLoading}
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={closeUrlModal}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium text-gray-700"
                disabled={isLoading}
              >
                Cancel
              </button>
              <button
                onClick={handleAddArticle}
                disabled={!articleUrl.trim() || isLoading}
                className="flex-1 px-4 py-2 bg-[#CB9729] text-white rounded-lg hover:bg-[#B88624] transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Adding...' : 'Share'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Video Modal */}
      {selectedVideo && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
          onClick={closeVideoModal}
        >
          <button
            onClick={closeVideoModal}
            className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors z-10"
            aria-label="Close video"
          >
            <X className="w-6 h-6 text-gray-600" />
          </button>
          <div className="w-full max-w-6xl" onClick={e => e.stopPropagation()}>
            <video
              src={selectedVideo}
              controls
              autoPlay
              className="w-full h-auto rounded-lg shadow-2xl"
            >
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      )}
    </div>
  );
}
