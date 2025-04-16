const HowItWork = () =>{
    return(
        <div>
            <section id="how-it-works" className="py-20 bg-blue-50">
                <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-gray-800 mb-4">How It Works</h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                    Our platform connects three key groups to create meaningful educational experiences across borders.
                    </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Students Card */}
                    <div className="bg-white rounded-lg shadow-lg p-8 text-center hover:shadow-xl transition duration-300">
                    <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <i className="fas fa-user-graduate text-3xl text-blue-600"></i>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">Students</h3>
                    <p className="text-gray-600">
                        Students join through their schools in South Korea and Mexico to receive free 1-on-1 English tutoring sessions with U.S. high school volunteers.
                    </p>
                    <div className="mt-6 flex justify-center">
                        <img 
                        src="https://public.readdy.ai/ai/img_res/243be0284059cd597e2920282a818731.jpg" 
                        alt="Students learning" 
                        className="rounded-lg w-full h-48 object-cover object-top"
                        />
                    </div>
                    </div>
                    
                    {/* Tutors Card */}
                    <div className="bg-white rounded-lg shadow-lg p-8 text-center hover:shadow-xl transition duration-300">
                    <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <i className="fas fa-chalkboard-teacher text-3xl text-blue-600"></i>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">Tutors</h3>
                    <p className="text-gray-600">
                        U.S. high school students volunteer as tutors, earning community service hours while sharing their language skills and learning about new cultures.
                    </p>
                    <div className="mt-6 flex justify-center">
                        <img 
                        src="https://public.readdy.ai/ai/img_res/84c201d221b041ebb04f019af30164c5.jpg" 
                        alt="Tutors teaching" 
                        className="rounded-lg w-full h-48 object-cover object-top"
                        />
                    </div>
                    </div>
                    
                    {/* School Coordinators Card */}
                    <div className="bg-white rounded-lg shadow-lg p-8 text-center hover:shadow-xl transition duration-300">
                    <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <i className="fas fa-school text-3xl text-blue-600"></i>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">School Coordinators</h3>
                    <p className="text-gray-600">
                        Teachers and administrators help implement the program at their schools, providing access codes to students and monitoring educational progress.
                    </p>
                    <div className="mt-6 flex justify-center">
                        <img 
                        src="https://public.readdy.ai/ai/img_res/5dbcd1a0b0917902cc4ed64820e61549.jpg" 
                        alt="School coordinators" 
                        className="rounded-lg w-full h-48 object-cover object-top"
                        />
                    </div>
                    </div>
                </div>
                
                <div className="mt-16 text-center">
                    <p className="text-xl text-blue-700 font-medium">
                    Our platform supports English, Spanish, and Korean to ensure seamless communication for all participants.
                    </p>
                </div>
                </div>
            </section>
        </div>
    );
};

export default HowItWork;