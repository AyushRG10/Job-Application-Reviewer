'use client';

import { useState } from 'react';
import { MapPin, Briefcase, Plus, X, Linkedin, LogOut, Mail } from 'lucide-react';

export default function ProfilePage() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Mock User Data
    const [user, setUser] = useState({
        name: 'Jordan Taylor',
        email: 'jordan.taylor@example.com',
        role: 'Senior Software Engineer',
        location: 'San Francisco, CA',
        bio: 'Passionate about building scalable web applications and intuitive user experiences.',
        linkedin: 'https://linkedin.com/in/jordan-taylor',
        skills: ['React', 'TypeScript', 'Node.js', 'AWS', 'GraphQL', 'System Design']
    });

    const [newSkill, setNewSkill] = useState('');
    const [isEditing, setIsEditing] = useState(false);

    // Handlers
    const handleLogin = (provider: string) => {
        // Simulate auth
        setIsLoggedIn(true);
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
    };

    const addSkill = () => {
        if (newSkill && !user.skills.includes(newSkill)) {
            setUser({ ...user, skills: [...user.skills, newSkill] });
            setNewSkill('');
        }
    };

    const removeSkill = (skillToRemove: string) => {
        setUser({ ...user, skills: user.skills.filter(s => s !== skillToRemove) });
    };

    // --- LOGIN VIEW ---
    if (!isLoggedIn) {
        return (
            <div className="p-6 max-w-md mx-auto min-h-[80vh] flex flex-col items-center justify-center space-y-6">
                <div className="text-center space-y-2">
                    <h1 className="text-3xl font-bold text-gray-900">Welcome Back</h1>
                    <p className="text-gray-500">Sign in to manage your profile and applications</p>
                </div>

                <div className="w-full space-y-3">
                    <button
                        onClick={() => handleLogin('google')}
                        className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 p-3 rounded-lg hover:bg-gray-50 transition shadow-sm font-medium text-gray-700"
                    >
                        <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5" />
                        Sign in with Google
                    </button>

                    <button
                        onClick={() => handleLogin('email')}
                        className="w-full flex items-center justify-center gap-3 bg-green-700 text-white p-3 rounded-lg hover:bg-green-800 transition shadow-sm font-medium"
                    >
                        <Mail className="w-5 h-5" />
                        Sign in with Email
                    </button>
                </div>

                <p className="text-xs text-center text-gray-400">
                    By continuing, you agree to our Terms of Service and Privacy Policy.
                </p>
            </div>
        );
    }

    // --- PROFILE VIEW ---
    return (
        <div className="p-6 max-w-4xl mx-auto space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">My Profile</h1>
                <button onClick={handleLogout} className="text-sm text-gray-500 hover:text-red-600 flex items-center gap-1">
                    <LogOut className="w-4 h-4" /> Sign Out
                </button>
            </div>

            {/* Main Profile Card */}
            <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm relative">
                <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="absolute top-6 right-6 text-sm text-green-700 font-medium hover:underline"
                >
                    {isEditing ? 'Done' : 'Edit Profile'}
                </button>

                <div className="flex flex-col md:flex-row gap-6">
                    {/* Avatar */}
                    <div className="flex-shrink-0">
                        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 shadow-md" />
                    </div>

                    {/* Fields */}
                    <div className="flex-1 space-y-4">
                        <div>
                            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Full Name</label>
                            {isEditing ? (
                                <input
                                    type="text"
                                    value={user.name}
                                    onChange={e => setUser({ ...user, name: e.target.value })}
                                    className="w-full mt-1 p-2 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-500 bg-gray-50"
                                />
                            ) : (
                                <h2 className="text-xl font-bold text-gray-900">{user.name}</h2>
                            )}
                        </div>

                        <div>
                            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Job Title</label>
                            {isEditing ? (
                                <input
                                    type="text"
                                    value={user.role}
                                    onChange={e => setUser({ ...user, role: e.target.value })}
                                    className="w-full mt-1 p-2 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-500 bg-gray-50"
                                />
                            ) : (
                                <p className="text-gray-600 font-medium">{user.role}</p>
                            )}
                        </div>

                        <div>
                            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Bio</label>
                            {isEditing ? (
                                <textarea
                                    value={user.bio}
                                    onChange={e => setUser({ ...user, bio: e.target.value })}
                                    className="w-full mt-1 p-2 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-500 bg-gray-50"
                                    rows={3}
                                />
                            ) : (
                                <p className="text-gray-600 leading-relaxed">{user.bio}</p>
                            )}
                        </div>

                        {/* LinkedIn Field */}
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <Linkedin className="w-4 h-4 text-[#0077b5]" />
                                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide">LinkedIn Profile</label>
                            </div>
                            {isEditing ? (
                                <input
                                    type="url"
                                    value={user.linkedin}
                                    onChange={e => setUser({ ...user, linkedin: e.target.value })}
                                    className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-500 bg-gray-50"
                                    placeholder="https://linkedin.com/in/..."
                                />
                            ) : (
                                <a href={user.linkedin} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline break-all">
                                    {user.linkedin}
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Skills Section - Editable */}
            <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm">
                <h3 className="font-bold text-gray-900 mb-4">Skills & Expertise</h3>

                <div className="flex flex-wrap gap-2 mb-4">
                    {user.skills.map(skill => (
                        <span key={skill} className="group px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium flex items-center gap-2 pr-2">
                            {skill}
                            <button
                                onClick={() => removeSkill(skill)}
                                className="text-gray-400 hover:text-red-500 focus:outline-none transition"
                            >
                                <X className="w-3 h-3" />
                            </button>
                        </span>
                    ))}
                </div>

                <div className="flex gap-2">
                    <input
                        type="text"
                        value={newSkill}
                        onChange={e => setNewSkill(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && addSkill()}
                        placeholder="Add a skill (e.g. Python)"
                        className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
                    />
                    <button
                        onClick={addSkill}
                        className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-black transition flex items-center gap-2"
                    >
                        <Plus className="w-4 h-4" /> Add
                    </button>
                </div>
            </div>
        </div>
    );
}
