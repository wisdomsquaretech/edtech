import Image from "next/image";
// import Link from 'next/link';
import { useRouter } from 'next/navigation';

    const Registration = () =>{

    const router = useRouter();
    
    const handleRegisterClick = (type: "student" | "tutor") => {
        router.push(`/registration?type=${type}`);
      };
    
    return(
        <div>
            <section id="register" className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Join Our Global Community</h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                    Whether you're looking to tutor or learn, we have a place for you.
                    </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {/* Tutor Registration */}
                    <div className="bg-blue-50 rounded-lg shadow-lg p-8 border border-blue-100">
                    <div className="mb-6">
                        <img 
                        src="https://public.readdy.ai/ai/img_res/727caf8fdb9c5217b846e9c95ea483e9.jpg" 
                        alt="Become a Tutor" 
                        className="w-full h-48 object-cover object-top rounded-lg"
                        />
                        {/* <Image   src="/images/Education.jpg" alt="Global Education Connection"
                        layout="fill" objectFit="cover" objectPosition="top"  /> */}
                
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Become a Tutor</h3>
                    <ul className="mb-6 space-y-2">
                        <li className="flex items-start">
                        <i className="fas fa-check-circle text-green-500 mt-1 mr-2"></i>
                        <span>Earn volunteer hours for college applications</span>
                        </li>
                        <li className="flex items-start">
                        <i className="fas fa-check-circle text-green-500 mt-1 mr-2"></i>
                        <span>Develop teaching and leadership skills</span>
                        </li>
                        <li className="flex items-start">
                        <i className="fas fa-check-circle text-green-500 mt-1 mr-2"></i>
                        <span>Connect with students from different cultures</span>
                        </li>
                        <li className="flex items-start">
                        <i className="fas fa-check-circle text-green-500 mt-1 mr-2"></i>
                        <span>Flexible scheduling to fit your availability</span>
                        </li>
                    </ul>
                    <button onClick={()=>handleRegisterClick("tutor")} className="w-full py-3 bg-blue-600 text-white font-bold rounded-button hover:bg-blue-700 transition duration-300 whitespace-nowrap cursor-pointer">
                        Register as a Tutor
                    </button>
                    </div>
                    
                    {/* Student Registration */}
                    <div className="bg-blue-50 rounded-lg shadow-lg p-8 border border-blue-100">
                    <div className="mb-6">
                        <img 
                        src="https://public.readdy.ai/ai/img_res/9ffc3ab7fdd0b66002b2f2aa84825d1a.jpg" 
                        alt="Join as Student" 
                        className="w-full h-48 object-cover object-top rounded-lg"
                        />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Join as a Student</h3>
                    <ul className="mb-6 space-y-2">
                        <li className="flex items-start">
                        <i className="fas fa-check-circle text-green-500 mt-1 mr-2"></i>
                        <span>Free 1-on-1 English tutoring sessions</span>
                        </li>
                        <li className="flex items-start">
                        <i className="fas fa-check-circle text-green-500 mt-1 mr-2"></i>
                        <span>Practice with native English speakers</span>
                        </li>
                        <li className="flex items-start">
                        <i className="fas fa-check-circle text-green-500 mt-1 mr-2"></i>
                        <span>Learn about American culture</span>
                        </li>
                        <li className="flex items-start">
                        <i className="fas fa-check-circle text-green-500 mt-1 mr-2"></i>
                        <span>Multilingual platform support</span>
                        </li>
                    </ul>
                    
                    <button onClick={()=>handleRegisterClick("student")} className="w-full py-3 bg-blue-600 text-white font-bold rounded-button hover:bg-blue-700 transition duration-300 whitespace-nowrap cursor-pointer">
                        Register as a Student
                    </button>
                    
                    <p className="text-center mt-4 text-sm text-gray-600">
                        Use your school code to register
                    </p>
                    </div>
                </div>
                </div>
            </section>

        </div>
    );
};

export default Registration;