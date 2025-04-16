import React from "react";

const Footer = () =>{
    return(
        <div>
            <footer className="bg-blue-900 text-white py-12">
                <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                    <div className="text-2xl font-bold mb-4">
                        <i className="fas fa-globe-americas mr-2"></i>
                        EduConnect
                    </div>
                    <p className="text-blue-200 mb-4">
                        Bridging cultures through language learning since 2023.
                    </p>
                    <div className="flex space-x-4">
                        <a href="#" className="text-white hover:text-blue-200 cursor-pointer">
                        <i className="fab fa-facebook-f"></i>
                        </a>
                        <a href="#" className="text-white hover:text-blue-200 cursor-pointer">
                        <i className="fab fa-twitter"></i>
                        </a>
                        <a href="#" className="text-white hover:text-blue-200 cursor-pointer">
                        <i className="fab fa-instagram"></i>
                        </a>
                        <a href="#" className="text-white hover:text-blue-200 cursor-pointer">
                        <i className="fab fa-linkedin-in"></i>
                        </a>
                    </div>
                    </div>
                    
                    <div>
                    <h4 className="text-lg font-bold mb-4">Quick Links</h4>
                    <ul className="space-y-2">
                        <li><a href="#" className="text-blue-200 hover:text-white cursor-pointer">About Us</a></li>
                        <li><a href="#how-it-works" className="text-blue-200 hover:text-white cursor-pointer">How It Works</a></li>
                        <li><a href="#register" className="text-blue-200 hover:text-white cursor-pointer">Register</a></li>
                        <li><a href="#contact" className="text-blue-200 hover:text-white cursor-pointer">Contact</a></li>
                    </ul>
                    </div>
                    
                    <div>
                    <h4 className="text-lg font-bold mb-4">Resources</h4>
                    <ul className="space-y-2">
                        <li><a href="#" className="text-blue-200 hover:text-white cursor-pointer">Tutor Resources</a></li>
                        <li><a href="#" className="text-blue-200 hover:text-white cursor-pointer">Student Materials</a></li>
                        <li><a href="#" className="text-blue-200 hover:text-white cursor-pointer">School Implementation</a></li>
                        <li><a href="#" className="text-blue-200 hover:text-white cursor-pointer">FAQ</a></li>
                    </ul>
                    </div>
                    
                    <div>
                    <h4 className="text-lg font-bold mb-4">Legal</h4>
                    <ul className="space-y-2">
                        <li><a href="#" className="text-blue-200 hover:text-white cursor-pointer">Privacy Policy</a></li>
                        <li><a href="#" className="text-blue-200 hover:text-white cursor-pointer">Terms of Service</a></li>
                        <li><a href="#" className="text-blue-200 hover:text-white cursor-pointer">Cookie Policy</a></li>
                        <li><a href="#" className="text-blue-200 hover:text-white cursor-pointer">Accessibility</a></li>
                    </ul>
                    </div>
                </div>
                
                <div className="border-t border-blue-800 mt-12 pt-8 text-center text-blue-200">
                    <p>© 2025 EduConnect. All rights reserved. | Last updated: April 10, 2025</p>
                </div>
                </div>
            </footer>
        </div>
    );
};

export default Footer;