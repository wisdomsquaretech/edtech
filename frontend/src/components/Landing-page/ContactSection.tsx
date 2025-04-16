 import React, {useState} from "react";

const ContactSection = () =>{
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
      });
    
      const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value
        });
      };
    
      const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Form submission logic would go here
        console.log('Form submitted:', formData);
      };

    return(
        <div>
            <section id="contact" className="py-20 bg-blue-50">
                <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div>
                    <h2 className="text-4xl font-bold text-gray-800 mb-6">Let's Collaborate</h2>
                    <p className="text-xl text-gray-600 mb-8">
                        Are you a school administrator interested in bringing our program to your students? Or a volunteer looking to make a difference? Reach out to us today and join our mission to bridge cultures through language learning.
                    </p>
                    
                    <div className="space-y-6">
                        <div className="flex items-center">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                            <i className="fas fa-envelope text-blue-600"></i>
                        </div>
                        <div>
                            <p className="text-gray-500 text-sm">Email us at</p>
                            <p className="text-gray-800 font-medium">contact@educonnect.org</p>
                        </div>
                        </div>
                        
                        <div className="flex items-center">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                            <i className="fas fa-phone-alt text-blue-600"></i>
                        </div>
                        <div>
                            <p className="text-gray-500 text-sm">Call us at</p>
                            <p className="text-gray-800 font-medium">+1 (555) 123-4567</p>
                        </div>
                        </div>
                        
                        <div className="flex items-center">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                            <i className="fas fa-map-marker-alt text-blue-600"></i>
                        </div>
                        <div>
                            <p className="text-gray-500 text-sm">Our headquarters</p>
                            <p className="text-gray-800 font-medium">San Francisco, CA, United States</p>
                        </div>
                        </div>
                    </div>
                    </div>
                    
                    <div>
                    <div className="bg-white rounded-lg shadow-lg p-8">
                        <h3 className="text-2xl font-bold text-gray-800 mb-6">Send Us a Message</h3>
                        
                        <form onSubmit={handleSubmit}>
                        <div className="mb-6">
                            <label htmlFor="name" className="block text-gray-700 mb-2">Full Name</label>
                            <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Your name"
                            required
                            />
                        </div>
                        
                        <div className="mb-6">
                            <label htmlFor="email" className="block text-gray-700 mb-2">Email Address</label>
                            <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Your email"
                            required
                            />
                        </div>
                        
                        <div className="mb-6">
                            <label htmlFor="message" className="block text-gray-700 mb-2">Message</label>
                            <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleInputChange}
                            rows={5}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="How can we help you?"
                            required
                            ></textarea>
                        </div>
                        
                        <button
                            type="submit"
                            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-button font-medium transition duration-300 w-full whitespace-nowrap cursor-pointer"
                        >
                            Send Message
                        </button>
                        </form>
                    </div>
                    </div>
                </div>
                </div>
            </section>
        </div>
    );
};

export default ContactSection;