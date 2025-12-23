'use client';
 
import { useState, useEffect } from 'react';
 
interface Person {
  id: string;
  name: string;
  role: string;
  avatar: string | null;
  isFollowing: boolean;
}
 
export default function RightSideBar() {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  // Get initials for placeholder
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  // Construct profile URL
  const getProfileUrl = (profileUrl?: string | null): string | null => {
    if (!profileUrl || profileUrl.trim() === '') return null;
    if (profileUrl.startsWith('http')) return profileUrl;
    if (profileUrl.startsWith('/') && !profileUrl.startsWith('/assets')) {
      return `http://localhost:3001${profileUrl}`;
    }
    return profileUrl;
  };

  // Fetch current user ID and users from database
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // First, get current user ID
        let userId: string | null = null;
        const userIdentifier = localStorage.getItem('userEmail');
        if (userIdentifier) {
          try {
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

            if (response.ok) {
              const data = await response.json();
              if (data.success && data.user) {
                userId = data.user.id;
                setCurrentUserId(data.user.id);
              }
            }
          } catch (error) {
            console.error('Error fetching current user ID:', error);
          }
        }

        // Then fetch users (excluding current user if found)
        const excludeParam = userId ? `&excludeUserId=${userId}` : '';
        const response = await fetch(
          `http://localhost:3001/api/signup/users?limit=10${excludeParam}`
        );

        if (!response.ok) {
          console.error('Failed to fetch users');
          setPeople([]);
          return;
        }

        const data = await response.json();
        if (data.success && data.users) {
          const transformedPeople: Person[] = data.users.map((user: any) => ({
            id: user.id,
            name: user.full_name || user.username || 'User',
            role: user.user_type ? user.user_type.charAt(0).toUpperCase() + user.user_type.slice(1).toLowerCase() : 'User',
            avatar: getProfileUrl(user.profile_url),
            isFollowing: false,
          }));
          setPeople(transformedPeople);
        } else {
          setPeople([]);
        }
      } catch (error) {
        console.error('Error fetching users:', error);
        setPeople([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
 
  const handleFollow = (id: string) => {
    setPeople(prevPeople =>
      prevPeople.map(person =>
        person.id === id
          ? { ...person, isFollowing: !person.isFollowing }
          : person
      )
    );
  };
 
  return (
    <div className="w-96 bg-white border-l border-gray-200 overflow-y-auto mr-10 rounded-lg">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">
          People you may know
        </h2>
      </div>
 
      {/* People List */}
      <div className="divide-y divide-gray-200">
        {loading ? (
          <div className="p-4 text-center text-gray-500 text-sm">
            Loading...
          </div>
        ) : people.length === 0 ? (
          <div className="p-4 text-center text-gray-500 text-sm">
            No users found
          </div>
        ) : (
          people.map(person => (
            <div
              key={person.id}
              className="p-4 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                {/* Avatar */}
                <div className="w-12 h-12 rounded-full bg-gray-200 flex-shrink-0 overflow-hidden flex items-center justify-center">
                  {person.avatar ? (
                    <img
                      src={person.avatar}
                      alt={person.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-gray-600 font-semibold text-sm">
                      {getInitials(person.name)}
                    </span>
                  )}
                </div>
 
                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-gray-500 mb-0.5">{person.role}</p>
                  <p className="text-sm font-semibold text-gray-900 truncate">
                    {person.name}
                  </p>
                </div>
 
                {/* Follow Button */}
                <button
                  onClick={() => handleFollow(person.id)}
                  className={`px-4 py-1.5 text-sm font-medium rounded-full border transition-colors flex-shrink-0 ${
                    person.isFollowing
                      ? 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200'
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {person.isFollowing ? 'Following' : 'Follow'}
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}