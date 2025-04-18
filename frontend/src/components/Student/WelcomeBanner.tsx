import React from "react";

interface BannerProps {
  user: any; // 🔁 Replace 'any' with actual user type if known
}
const WelcomeBanner: React.FC<BannerProps> = ({ user }) => {
  const user1 = {
    name: "Alex Johnson",
    streak: 15,
    credits: 45,
    completedLessons: 12,
    profileImage: "https://readdy.ai/api/search-image?query=professional%20portrait%20of%20a%20teenage%20student%20with%20a%20friendly%20smile%2C%20diverse%20background%2C%20high%20quality%20professional%20headshot%20on%20simple%20light%20blue%20background%2C%20looking%20at%20camera&width=100&height=100&seq=profile1&orientation=squarish",
  };

  return (
    <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
          <img
            src={user1.profileImage}
            alt="Profile"
            className="h-20 w-20 rounded-full object-cover border-4 border-white"
          />
          <div className="flex-1">
            <h2 className="text-3xl font-bold">Hello, {user?.name}!</h2>
            <p className="text-blue-100 mt-1">Welcome back to your learning dashboard</p>
          </div>
          <div className="flex space-x-4">
            {[
              { label: "Day Streak", value: user1.streak },
              { label: "Credits", value: user1.credits },
              { label: "Lessons", value: user1.completedLessons },
            ].map((stat, i) => (
              <div key={i} className="bg-white bg-opacity-20 rounded-lg p-3 text-center">
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-xs uppercase tracking-wide">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeBanner;
