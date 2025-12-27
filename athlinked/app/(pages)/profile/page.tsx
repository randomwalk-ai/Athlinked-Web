'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import RightSideBar from '@/components/RightSideBar';
import HomeHerosection from '@/components/Home/Herosection';
import Post, { type PostData } from '@/components/Post';
import EditProfileModal from '@/components/Profile/EditProfileModel';


interface CurrentUser {
  id: string;
  full_name: string;
  profile_url?: string;
  username?: string;
}

interface ProfileData {
  userId: string;
  fullName: string | null;
  profileImage: string | null;
  coverImage: string | null;
  bio: string | null;
  education: string | null;
  primarySport: string | null;
  sportsPlayed: string | null;
}

export default function Profile() {
  const [posts, setPosts] = useState<PostData[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [showEditProfile, setShowEditProfile] = useState(false);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:3001/api/posts?page=1&limit=50');
      
      if (!response.ok) {
        console.error('Failed to fetch posts:', response.status, response.statusText);
        const text = await response.text();
        console.error('Response text:', text.substring(0, 200));
        setPosts([]);
        return;
      }

      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        console.error('Non-JSON response from posts API');
        const text = await response.text();
        console.error('Response text:', text.substring(0, 200));
        setPosts([]);
        return;
      }

      const data = await response.json();
      console.log('Posts API response:', data);
      
      if (data.success && data.posts) {
        const transformedPosts: PostData[] = data.posts.map((post: any) => ({
          id: post.id,
          username: post.username || 'User',
          user_profile_url: (post.user_profile_url && post.user_profile_url.trim() !== '') ? post.user_profile_url : null,
          user_id: post.user_id,
          post_type: post.post_type,
          caption: post.caption,
          media_url: post.media_url,
          article_title: post.article_title,
          article_body: post.article_body,
          event_title: post.event_title,
          event_date: post.event_date,
          event_location: post.event_location,
          like_count: post.like_count || 0,
          comment_count: post.comment_count || 0,
          save_count: post.save_count || 0,
          created_at: post.created_at,
        }));
        console.log('Transformed posts:', transformedPosts.length);
        setPosts(transformedPosts);
      } else {
        console.error('Posts API returned unsuccessful response:', data);
        setPosts([]);
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
    fetchCurrentUser();
  }, []);

  useEffect(() => {
    if (currentUserId) {
      fetchProfileData();
    }
  }, [currentUserId]);

  const fetchProfileData = async () => {
    if (!currentUserId) return;
    
    try {
      console.log('Fetching profile data for userId:', currentUserId);
      const response = await fetch(`http://localhost:3001/api/profile/${currentUserId}`);
      if (response.ok) {
        const data = await response.json();
        console.log('Profile data fetched:', data);
        setProfileData(data);
      } else {
        console.log('No profile data found, will use defaults');
        setProfileData(null);
      }
    } catch (error) {
      console.error('Error fetching profile data:', error);
      setProfileData(null);
    }
  };

  const fetchCurrentUser = async () => {
    try {
      const userIdentifier = localStorage.getItem('userEmail');
      if (!userIdentifier) {
        return;
      }

      let response;
      if (userIdentifier.startsWith('username:')) {
        const username = userIdentifier.replace('username:', '');
        response = await fetch(
          `http://localhost:3001/api/signup/user-by-username/${encodeURIComponent(username)}`
        );
      } else {
        response = await fetch(
          `http://localhost:3001/api/signup/user/${encodeURIComponent(userIdentifier)}`
        );
      }

      if (!response.ok) {
        return;
      }

      const data = await response.json();
      if (data.success && data.user) {
        setCurrentUserId(data.user.id);
        setCurrentUser({
          id: data.user.id,
          full_name: data.user.full_name || data.user.username || 'User',
          profile_url: data.user.profile_url,
          username: data.user.username,
        });
      }
    } catch (error) {
      console.error('Error fetching current user:', error);
    }
  };

  const handlePostCreated = () => {
    fetchPosts();
  };

  // Construct profile URL - return undefined if no profileUrl exists (don't use default)
  const getProfileUrl = (profileUrl?: string | null): string | undefined => {
    if (!profileUrl || profileUrl.trim() === '') return undefined;
    if (profileUrl.startsWith('http')) return profileUrl;
    if (profileUrl.startsWith('/') && !profileUrl.startsWith('/assets')) {
      return `http://localhost:3001${profileUrl}`;
    }
    return profileUrl;
  };
  
  // Get initials for placeholder
  const getInitials = (name?: string) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="h-screen bg-[#D4D4D4] flex flex-col overflow-hidden">
      <Header
        userName={currentUser?.full_name}
        userProfileUrl={getProfileUrl(currentUser?.profile_url)}
      />

      <main className="flex flex-1 w-full mt-5 overflow-hidden">
        {/* Left Side - Edit Profile Modal (3/4 width) */}
        <div className="hidden lg:block flex-[3] flex-shrink-0 border-r  border-gray-200 overflow-hidden px-6">
          <EditProfileModal
            open={true}
            asSidebar={true}
            onClose={() => setShowEditProfile(false)}
            userData={{
              full_name: currentUser?.full_name,
              username: currentUser?.username,
              profile_url: profileData?.profileImage 
                ? (profileData.profileImage.startsWith('http') 
                    ? profileData.profileImage 
                    : `http://localhost:3001${profileData.profileImage}`)
                : currentUser?.profile_url,
              background_image_url: profileData?.coverImage
                ? (profileData.coverImage.startsWith('http')
                    ? profileData.coverImage
                    : `http://localhost:3001${profileData.coverImage}`)
                : null,
              user_type: 'coach',
              location: 'Rochester, NY', // You can fetch this from user data
              age: 35, // You can fetch this from user data
              followers_count: 10000,
              sports_played: profileData?.sportsPlayed 
                ? profileData.sportsPlayed.replace(/[{}"']/g, '') // Remove curly brackets and quotes
                : '',
              primary_sport: profileData?.primarySport || '',
              profile_completion: 60,
              bio: profileData?.bio || '',
              education: profileData?.education || '',
            }}
            onSave={async (data) => {
              console.log('Profile saved:', data);
              try {
                if (!currentUserId) {
                  console.error('No user ID available');
                  return;
                }

                // Prepare data for API
                const profileData: {
                  userId: string;
                  bio?: string;
                  education?: string;
                  primarySport?: string;
                  profileImageUrl?: string;
                  coverImageUrl?: string;
                } = {
                  userId: currentUserId,
                };

                // Handle text fields - allow empty strings to clear the field
                console.log('Received data from EditProfilePopup:', {
                  bio: data.bio,
                  education: data.education,
                  bioUndefined: data.bio === undefined,
                  educationUndefined: data.education === undefined,
                });
                
                if (data.bio !== undefined) {
                  profileData.bio = data.bio || undefined; // Convert empty string to undefined
                }
                if (data.education !== undefined) {
                  profileData.education = data.education || undefined; // Convert empty string to undefined
                }
                
                console.log('Profile data being sent to API:', profileData);
                
                // Handle sports - parse from sports_played string (take first sport as primary)
                if (data.sports_played) {
                  const sports = data.sports_played.split(',').map(s => s.trim()).filter(Boolean);
                  if (sports.length > 0) profileData.primarySport = sports[0];
                }

                // Handle image files - upload them first
                if (data.profile_url instanceof File) {
                  const formData = new FormData();
                  formData.append('file', data.profile_url);
                  
                  // Upload profile image
                  const uploadResponse = await fetch('http://localhost:3001/api/profile/upload', {
                    method: 'POST',
                    body: formData,
                  });
                  
                  if (uploadResponse.ok) {
                    const uploadData = await uploadResponse.json();
                    if (uploadData.success && uploadData.fileUrl) {
                      profileData.profileImageUrl = uploadData.fileUrl;
                    }
                  }
                } else if (typeof data.profile_url === 'string') {
                  profileData.profileImageUrl = data.profile_url;
                }

                if (data.background_image_url instanceof File) {
                  const formData = new FormData();
                  formData.append('file', data.background_image_url);
                  
                  // Upload cover image
                  const uploadResponse = await fetch('http://localhost:3001/api/profile/upload', {
                    method: 'POST',
                    body: formData,
                  });
                  
                  if (uploadResponse.ok) {
                    const uploadData = await uploadResponse.json();
                    if (uploadData.success && uploadData.fileUrl) {
                      profileData.coverImageUrl = uploadData.fileUrl;
                    }
                  }
                } else if (typeof data.background_image_url === 'string') {
                  profileData.coverImageUrl = data.background_image_url;
                }

                // Call profile API
                const response = await fetch('http://localhost:3001/api/profile', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(profileData),
                });

                if (!response.ok) {
                  const errorData = await response.json();
                  console.error('Failed to save profile:', errorData);
                  alert('Failed to save profile: ' + (errorData.message || 'Unknown error'));
                  return;
                }

                const result = await response.json();
                console.log('Profile saved successfully:', result);
                
                // Refresh user data and profile data
                fetchCurrentUser();
                fetchProfileData();
              } catch (error) {
                console.error('Error saving profile:', error);
                alert('Error saving profile. Please try again.');
              }
            }}
          />
        </div>

        {/* Right Side - Sidebar (1/4 width) */}
        <div className="hidden lg:flex flex-1 flex-shrink-0">
          <RightSideBar />
        </div>
      </main>
    </div>
  );
}
