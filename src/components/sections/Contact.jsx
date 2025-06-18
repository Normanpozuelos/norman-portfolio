import { RevealOnScroll } from "../RevealOnScroll"
import emailjs from 'emailjs-com';

export const Contact = () => {

    const sendEmail = (e) => {  
        e.preventDefault();

        const SERVICE_ID = "service_9r96f06";
        const TEMPLATE_ID = "template_rd5fxwc";
        const PUBLIC_KEY = "jziEyITRdWb-vidrU";
        emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, e.target, PUBLIC_KEY)
            .then((result) => {
                console.log(result.text);
                alert("Message sent successfully!");
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
            <form className="space-y-6">
                <div className="relative">
                <input type="text" id="name" name="name" required placeholder="Your Name" className="w-full p-3 rounded-lg bg-gray-800 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div className="relative">
                <input type="email" placeholder="Your Email" className="w-full p-3 rounded-lg bg-gray-800 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div className="relative">
                <textarea placeholder="Your Message..." rows="4" className="w-full p-3 rounded-lg bg-gray-800 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
                <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-lg transition-colors">Send Message</button>
                </div>
            </form>
            </div>
        </div>
    </RevealOnScroll>
    </section>
  )
}
