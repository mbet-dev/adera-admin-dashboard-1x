import React, { useState } from 'react';

interface SettingsProps {
    theme: string;
    setTheme: (theme: string) => void;
}

const ThemePreview: React.FC<{ mode: 'Light' | 'Dark' | 'System' }> = ({ mode }) => {
    if (mode === 'Light') {
        return <div className="w-16 h-10 bg-white border-2 border-gray-300 rounded-md shadow-inner"></div>;
    }
    if (mode === 'Dark') {
        return <div className="w-16 h-10 bg-gray-800 border-2 border-gray-600 rounded-md shadow-inner"></div>;
    }
    // System
    return (
        <div className="w-16 h-10 rounded-md border-2 border-gray-400 overflow-hidden shadow-inner">
            <div className="w-full h-full flex">
                <div className="w-1/2 h-full bg-white"></div>
                <div className="w-1/2 h-full bg-gray-800"></div>
            </div>
        </div>
    );
};

const Settings: React.FC<SettingsProps> = ({ theme, setTheme }) => {
    const [profile, setProfile] = useState({ name: 'Admin User', email: 'admin@adera.com' });
    const [password, setPassword] = useState({ current: '', new: '', confirm: '' });
    const [notifications, setNotifications] = useState({
        newSignups: true,
        failedDeliveries: true,
        monthlyReports: false,
    });

    const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setProfile({ ...profile, [e.target.name]: e.target.value });
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword({ ...password, [e.target.name]: e.target.value });
    };

    const handleNotificationToggle = (key: keyof typeof notifications) => {
        setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const Toggle: React.FC<{ enabled: boolean, onChange: () => void }> = ({ enabled, onChange }) => (
        <button
            type="button"
            className={`${enabled ? 'bg-teal-500' : 'bg-gray-200 dark:bg-gray-600'} relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 focus:ring-offset-white dark:focus:ring-offset-gray-800`}
            role="switch"
            aria-checked={enabled}
            onClick={onChange}
        >
            <span className={`${enabled ? 'translate-x-6' : 'translate-x-1'} inline-block w-4 h-4 transform bg-white rounded-full transition-transform`} />
        </button>
    );

    return (
        <div className="space-y-8 max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white tracking-tight">Settings</h1>

            {/* Profile Settings */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Profile</h2>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Manage your personal information and password.</p>
                </div>
                <form className="p-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</label>
                            <input type="text" name="name" id="name" value={profile.name} onChange={handleProfileChange} className="mt-1 w-full bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg py-2 px-3 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500" />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email Address</label>
                            <input type="email" name="email" id="email" value={profile.email} onChange={handleProfileChange} className="mt-1 w-full bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg py-2 px-3 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500" />
                        </div>
                    </div>
                    <div className="border-t border-gray-200 dark:border-gray-700 pt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                         <div>
                            <label htmlFor="current" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Current Password</label>
                            <input type="password" name="current" id="current" value={password.current} onChange={handlePasswordChange} className="mt-1 w-full bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg py-2 px-3 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500" />
                        </div>
                         <div>
                            <label htmlFor="new" className="block text-sm font-medium text-gray-700 dark:text-gray-300">New Password</label>
                            <input type="password" name="new" id="new" value={password.new} onChange={handlePasswordChange} className="mt-1 w-full bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg py-2 px-3 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500" />
                        </div>
                         <div>
                            <label htmlFor="confirm" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Confirm New Password</label>
                            <input type="password" name="confirm" id="confirm" value={password.confirm} onChange={handlePasswordChange} className="mt-1 w-full bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg py-2 px-3 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500" />
                        </div>
                    </div>
                     <div className="flex justify-end">
                        <button type="button" onClick={() => alert('Profile changes saved!')} className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded-lg transition-colors">
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>

            {/* Notification Settings */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Notifications</h2>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Control how you receive notifications from the platform.</p>
                </div>
                <div className="p-6 divide-y divide-gray-200 dark:divide-gray-700">
                    <div className="py-4 flex items-center justify-between">
                        <div>
                            <p className="font-medium text-gray-900 dark:text-white">New Shop Sign-ups</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Get notified when a new partner shop applies.</p>
                        </div>
                        <Toggle enabled={notifications.newSignups} onChange={() => handleNotificationToggle('newSignups')} />
                    </div>
                    <div className="py-4 flex items-center justify-between">
                        <div>
                            <p className="font-medium text-gray-900 dark:text-white">Failed Deliveries</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Receive an alert for any failed delivery attempt.</p>
                        </div>
                        <Toggle enabled={notifications.failedDeliveries} onChange={() => handleNotificationToggle('failedDeliveries')} />
                    </div>
                    <div className="py-4 flex items-center justify-between">
                        <div>
                            <p className="font-medium text-gray-900 dark:text-white">Monthly Reports</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Get a summary of financial and operational performance each month.</p>
                        </div>
                        <Toggle enabled={notifications.monthlyReports} onChange={() => handleNotificationToggle('monthlyReports')} />
                    </div>
                </div>
            </div>

            {/* Appearance Settings */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Appearance</h2>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Customize the look and feel of your dashboard.</p>
                </div>
                <div className="p-6">
                    <fieldset>
                        <legend className="text-base font-medium text-gray-900 dark:text-white">Theme</legend>
                        <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
                            {(['Light', 'Dark', 'System'] as const).map(mode => (
                                <label key={mode} className={`relative p-4 flex cursor-pointer rounded-lg border-2 ${theme === mode.toLowerCase() ? 'border-teal-500 ring-2 ring-teal-500' : 'border-gray-300 dark:border-gray-600'} focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-white dark:focus-within:ring-offset-gray-800 focus-within:ring-teal-500`}>
                                    <input type="radio" name="theme" value={mode.toLowerCase()} checked={theme === mode.toLowerCase()} onChange={(e) => setTheme(e.target.value)} className="sr-only" />
                                    <div className="w-full flex flex-col items-center justify-center gap-3">
                                        <ThemePreview mode={mode} />
                                        <p className="font-semibold text-gray-900 dark:text-white">{mode}</p>
                                    </div>
                                </label>
                            ))}
                        </div>
                    </fieldset>
                </div>
            </div>
        </div>
    );
};

export default Settings;