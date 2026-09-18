import { useState } from "react";
import { RevealOnScroll } from "../RevealOnScroll"
import emailjs from '@emailjs/browser';

export const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    })


    // Initialize EmailJS with your public key
    const sendEmail = (e) => {  
        e.preventDefault();


        emailjs.sendForm(
            import.meta.env.VITE_SERVICE_ID, 
            import.meta.env.VITE_TEMPLATE_ID, 
            e.target, 
            import.meta.env.VITE_PUBLIC_KEY)
            .then(() => {
                alert("Message sent successfully!");
                setFormData({
                    name: '',
                    email: '',
                    message: ''
                });
            })
            .catch((error) => {
                console.error(error.text);
                alert("Failed to send message. Please try again later.");
            });
    }
  return (
    <section id="contact" className="min-h-screen flex items-center justify-center py-20">
    <RevealOnScroll>
        <div className="px-4 w-150">
            <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-blue-500 to-cyan-400
            bg-clip-text text-transparent text-center">Contact Me</h2>
            <div className="rounded-xl p-8 border-white/10 border hover:-translate-y-1 transition-all">
            <p className="text-gray-300 mb-6">
                I'm always open to new opportunities and collaborations. If you'd like to get in touch, feel free to reach out!
            </p>
            <form className="space-y-6" onSubmit={sendEmail}>
                <div className="relative">
                <input 
                type="text" id="name" name="name" 
                value={formData.name}
                required placeholder="Your Name" 
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full p-3 rounded-lg bg-gray-800 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div className="relative">
                <input type="email" placeholder="Your Email" 
                id="email" name="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full p-3 rounded-lg bg-gray-800 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div className="relative">
                <textarea 
                placeholder="Your Message..." rows="4" 
                id="message" name="message"
                value={formData.message}
                required
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full p-3 rounded-lg bg-gray-800 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
                <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-lg transition-colors">Send Message</button>
                </div>
            </form>
            </div>
        </div>
    </RevealOnScroll>
    </section>
  )
}
