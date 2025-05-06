import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="Home Energy Management">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>

            {/* Navigation Bar */}
            <nav className="fixed w-full bg-white/90 backdrop-blur-md shadow-sm z-50 dark:bg-gray-900/90">
                <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                        <svg className="w-8 h-8 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        <span className="text-xl font-bold text-gray-800 dark:text-white">HEMS</span>
                    </div>
                    <div className="hidden md:flex space-x-8">
                        <a href="#home" className="text-gray-600 hover:text-yellow-500 dark:text-gray-300 dark:hover:text-yellow-400 transition">Home</a>
                        <a href="#features" className="text-gray-600 hover:text-yellow-500 dark:text-gray-300 dark:hover:text-yellow-400 transition">Why Choose Us</a>
                        <a href="#team" className="text-gray-600 hover:text-yellow-500 dark:text-gray-300 dark:hover:text-yellow-400 transition">Our Team</a>
                        <a href="#how-it-works" className="text-gray-600 hover:text-yellow-500 dark:text-gray-300 dark:hover:text-yellow-400 transition">How It Works</a>
                        <a href="#contact" className="text-gray-600 hover:text-yellow-500 dark:text-gray-300 dark:hover:text-yellow-400 transition">Contact</a>
                    </div>
                    <div className="flex items-center space-x-4">
                        {auth.user ? (
                            <Link href={route('dashboard')} className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition">
                                Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link href={route('login')} className="px-4 py-2 text-gray-600 hover:text-yellow-500 dark:text-gray-300 dark:hover:text-yellow-400 transition">
                                    Login
                                </Link>
                                <Link href={route('register')} className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition">
                                    Register
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section id="home" className="min-h-screen pt-32 pb-20 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center">
                <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center">
                    <div className="md:w-1/2 mb-12 md:mb-0">
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-6">
                            Smart <span className="text-yellow-500">Energy</span> Management
                        </h1>
                        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                            The Smart Household Electrical Energy Management System is an IoT and AI-powered solution
                            that monitors real-time electricity consumption, provides energy-saving recommendations, and allows 
                            users to control smart devices remotely via a web and mobile platform.
                        </p>
                        <p className="text-lg text-gray-600 dark:text-gray-300 mb-10 leading-relaxed">
                            We aim to have future Rwandans aware of best energy usage metrics and management.
                            Let's strive to achieve it.
                        </p>
                        {!auth.user && (
                            <Link href={route('register')} className="inline-block px-8 py-3 bg-yellow-500 text-white font-medium rounded-lg hover:bg-yellow-600 transition duration-300 shadow-lg hover:shadow-xl">
                                Get Started
                            </Link>
                        )}
                    </div>
                    <div className="md:w-1/2 flex justify-center">
                        <img src="/images/homeback.png" alt="Energy Dashboard" className="rounded-xl shadow-2xl max-w-full h-auto" />
                    </div>
                </div>
            </section>

            {/* Why Choose Us Section */}
            <section id="features" className="py-20 bg-white dark:bg-gray-800">
                <div className="max-w-7xl mx-auto px-6">
                    <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-16">Why Choose Our Solution</h2>
                    <div className="grid md:grid-cols-3 gap-10">
                        {[
                            {
                                icon: '⚡',
                                title: 'Real-time Monitoring',
                                description: 'Track your energy consumption in real-time with our intuitive dashboard'
                            },
                            {
                                icon: '🤖',
                                title: 'AI Recommendations',
                                description: 'Get personalized suggestions to reduce your energy bills'
                            },
                            {
                                icon: '📱',
                                title: 'Remote Control',
                                description: 'Manage your devices from anywhere using our mobile app'
                            }
                        ].map((feature, index) => (
                            <div key={index} className="bg-gray-50 dark:bg-gray-700 p-8 rounded-xl shadow-md hover:shadow-lg transition">
                                <div className="text-4xl mb-4">{feature.icon}</div>
                                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">{feature.title}</h3>
                                <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Our Team Section */}
            <section id="team" className="py-20 bg-gray-50 dark:bg-gray-900">
                <div className="max-w-7xl mx-auto px-6 ">
                    <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-16">Our Expert Team</h2>
                    <div className="grid md:grid-cols-4 gap-8">
                        {[
                            {
                                name: 'NIYOKWIZERA JEAN D AMOUR',
                                role: 'Software developer [Full Stack]',        
                                image: '/images/damour.jpg'                             
                            },
                            {
                                name: 'Esther UWINGENEYE',
                                role: 'Software Analyst and Designer',
                                image: '/images/esther.jpg'
                            },
                            {
                                name: 'Dr Eric HITIMANA',
                                role: 'Supervisor [PhD] & Lecturer',                                
                                image: '/images/hitimana.jpg'
                            }
                        ].map((member, index) => (
                            <div key={index} className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition">
                                <img src={member.image} alt={member.name} className="w-full h-64 object-cover" />
                                <div className="p-6">
                                    <h3 className="text-xl font-semibold text-gray-800 dark:text-white">{member.name}</h3>
                                    <p className="text-yellow-500">{member.role}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section id="how-it-works" className="py-20 bg-white dark:bg-gray-800">
                <div className="max-w-7xl mx-auto px-6">
                    <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-16">How It Works</h2>
                    <div className="relative">
                        <div className="hidden md:block absolute left-1/2 top-0 h-full w-1 bg-yellow-500 transform -translate-x-1/2"></div>
                        {[
                            {
                                step: '1',
                                title: 'Install Our IOT Devices',
                                image: '/images/s1.png',
                                description: 'Our technician installs the smart IOT energy meter in your home where you want to measure'
                            },
                            {
                                step: '2',
                                title: 'Connect Devices',
                                image: '/images/connect.jpg',
                                description: 'Connect your appliances to our smart devices and configure them using our app'
                            },
                            {
                                step: '3',
                                title: 'Monitor & Control',
                                image: '/images/images.jpg',
                                description: 'Use our app to monitor usage and control devices remotely'
                            },
                            {
                                step: '4',
                                title: 'Save Energy',
                                image: '/images/save.jpg',
                                description: 'Follow our AI recommendations to reduce consumption'
                            }
                        ].map((step, index) => (
                            <div key={index} className={`mb-12 md:flex ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center`}>
                                <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'} mb-6 md:mb-0`}>
                                    <div className="bg-yellow-500 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mb-4">
                                        {step.step}
                                    </div>
                                    <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-3">{step.title}</h3>
                                    <p className="text-gray-600 dark:text-gray-300">{step.description}</p>
                                </div>
                                <div className="md:w-1/2">
                                    <img src={`${step.image}`} alt={`Step ${step.step}`} className="rounded-xl shadow-md w-full" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact & Footer Section */}
            <section id="contact" className="py-16 bg-gray-900 text-white">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid md:grid-cols-3 gap-12 mb-12">
                        <div>
                            <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
                            <p className="mb-4 text-gray-300">Email: niyokwizerajd123@gmail.com</p>
                            <p className="mb-4 text-gray-300">Phone: +250 784422138</p>
                            <p className="text-gray-300">Address: Kigali, Rwanda</p>
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
                            <ul className="space-y-2">
                                <li><a href="#home" className="text-gray-300 hover:text-yellow-400 transition">Home</a></li>
                                <li><a href="#features" className="text-gray-300 hover:text-yellow-400 transition">Features</a></li>
                                <li><a href="#team" className="text-gray-300 hover:text-yellow-400 transition">Our Team</a></li>
                                <li><a href="#how-it-works" className="text-gray-300 hover:text-yellow-400 transition">How It Works</a></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold  mb-4">Newsletter</h3>
                            <p className="mb-4 text-gray-300">Subscribe to get updates on energy saving tips</p>
                            <div className="flex">
                                <input type="email" placeholder="Your email" className="px-4 py-2 rounded-l-md w-full text-white-50 " />
                                <button className="bg-yellow-500 px-4 py-2 rounded-r-md hover:bg-yellow-600 transition">Subscribe</button>
                            </div>
                        </div>
                    </div>
                    <div className="border-t border-gray-700 pt-8 text-center text-gray-400">
                        <p>© {new Date().getFullYear()} Home Energy Management System. All rights reserved.</p>
                    </div>
                </div>
            </section>
        </>
    );
}