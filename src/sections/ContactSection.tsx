import { useState } from 'react';
import {
  Phone,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  MessageSquare
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import RevealOnScroll from '../components/RevealOnScroll';

// Obfuscate email to prevent simple scraping
// FormSubmit.co ID for secure submission without exposing email in network requests
const FORMSUBMIT_ID = '130c27e5fcdd9462a03f1b42c90e7de2';

const contactInfo = [
  {
    icon: <Phone className="w-6 h-6" />,
    title: 'Phone',
    content: '(850) 619-8613',
    href: 'tel:850-619-8613',
    description: 'Call us anytime!',
  },
  {
    icon: <MapPin className="w-6 h-6" />,
    title: 'Location',
    content: 'Pace, FL 32571',
    href: '#',
    description: 'Serving the Florida Panhandle',
  },
  {
    icon: <Clock className="w-6 h-6" />,
    title: 'Hours',
    content: 'Mon-Fri: 7am-6pm',
    href: '#',
    description: 'Sat: 8am-4pm | 24/7 Emergency',
  },
];

const serviceAreas = [
  'Milton', 'Pensacola', 'Gulf Breeze', 'Navarre', 'Pace', 'Cantonment'
];

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Using FormSubmit.co for secure email delivery without a backend
      const response = await fetch(`https://formsubmit.co/ajax/${FORMSUBMIT_ID}`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          ...formData,
          _subject: `New Website Lead from ${formData.name}`, // Email subject line
          _template: 'table', // Nice table format
        })
      });

      if (response.ok) {
        setIsSubmitted(true);
        setFormData({ name: '', phone: '', email: '', service: '', message: '' });

        // Reset success message after 5 seconds
        setTimeout(() => {
          setIsSubmitted(false);
        }, 5000);
      } else {
        console.error("Form submission failed");
        alert("Something went wrong. Please try calling us directly.");
      }
    } catch (error) {
      console.error("Form error:", error);
      alert("Something went wrong. Please try calling us directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <section
      id="contact"
      className="relative w-full py-20 md:py-32 bg-gradient-to-b from-navy to-navy-dark overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute bottom-0 right-0 w-1/3 h-1/2 bg-aqua/5 rounded-full blur-3xl" />
        <div className="absolute top-0 left-0 w-1/4 h-1/3 bg-coral/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-12 xl:px-16">
        {/* Section Header */}
        <RevealOnScroll effect="fade-up">
          <div className="text-center mb-16">
            <span className="inline-block text-coral font-semibold text-sm uppercase tracking-wider mb-4 animate-pulse">
              Get In Touch
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl text-white mb-6">
              Ready to Get It
              <span className="block text-gradient-aqua">Fixed?</span>
            </h2>
            <p className="text-lg text-white/70 max-w-2xl mx-auto">
              Tell us what&apos;s going on. We&apos;ll reply fast with next steps and a free estimate.
            </p>
          </div>
        </RevealOnScroll>

        <div className="grid lg:grid-cols-5 gap-12 items-start">
          {/* Contact Info - Left Side */}
          <div className="lg:col-span-2 space-y-6">
            {/* Contact Cards */}
            <div className="grid sm:grid-cols-2 gap-4">
              {contactInfo.map((info, index) => (
                <RevealOnScroll key={info.title} effect="fade-right" delay={index * 100}>
                  <a
                    href={info.href}
                    className="glass-card p-5 group hover:border-aqua/50 transition-all duration-300 block h-full transform hover:-translate-y-1 hover:shadow-lg hover:shadow-aqua/5"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-navy-light text-sunset rounded-xl flex items-center justify-center group-hover:bg-sunset group-hover:text-white transition-all duration-300 shadow-inner">
                        {info.icon}
                      </div>
                      <div>
                        <p className="text-white/50 text-sm mb-1">{info.title}</p>
                        <p className="text-white font-semibold group-hover:text-aqua transition-colors break-words text-sm sm:text-base">
                          {info.content}
                        </p>
                        <p className="text-white/40 text-xs mt-1">{info.description}</p>
                      </div>
                    </div>
                  </a>
                </RevealOnScroll>
              ))}
            </div>

            {/* Service Areas */}
            <RevealOnScroll effect="fade-right" delay={400}>
              <div className="glass-card p-6 hover:border-aqua/30 transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <MapPin className="w-5 h-5 text-aqua" />
                  <h3 className="text-white font-coda font-bold text-lg">Service Areas</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {serviceAreas.map((area) => (
                    <span
                      key={area}
                      className="px-3 py-1 bg-white/5 text-white/70 text-sm rounded-full hover:bg-aqua/20 hover:text-aqua transition-colors cursor-default border border-white/5 hover:border-aqua/20"
                    >
                      {area}
                    </span>
                  ))}
                </div>
              </div>
            </RevealOnScroll>

            {/* Emergency Banner */}
            <RevealOnScroll effect="fade-right" delay={500}>
              <div className="bg-gradient-to-r from-sunset to-coral p-6 rounded-3xl transform hover:scale-[1.02] transition-transform duration-300 shadow-lg shadow-coral/20">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                    <Phone className="w-7 h-7 text-white animate-pulse" />
                  </div>
                  <div>
                    <p className="text-white font-coda font-bold text-xl">24/7 Emergency Service</p>
                    <p className="text-white/90 text-sm font-medium">Plumbing emergency? Call now!</p>
                  </div>
                </div>
              </div>
            </RevealOnScroll>
          </div>

          {/* Contact Form - Right Side */}
          <div className="lg:col-span-3">
            <RevealOnScroll effect="fade-left" delay={200}>
              <div className="glass-card p-8 border-white/10 hover:border-aqua/20 transition-colors duration-500">
                {isSubmitted ? (
                  <div className="text-center py-12 animate-in fade-in zoom-in duration-500">
                    <div className="w-24 h-24 bg-aqua/20 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle2 className="w-12 h-12 text-aqua" />
                    </div>
                    <h3 className="text-3xl font-coda font-bold text-white mb-3">
                      Message Sent!
                    </h3>
                    <p className="text-white/70 text-lg">
                      Thanks for reaching out. We&apos;ll get back to you within 24 hours.
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center gap-4 mb-8">
                      <div className="w-14 h-14 bg-navy-light rounded-2xl flex items-center justify-center border border-white/10 shadow-inner">
                        <MessageSquare className="w-7 h-7 text-coral" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-coda font-bold text-white">Send Us a Message</h3>
                        <p className="text-white/50">Free estimate, no obligation</p>
                      </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid sm:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label htmlFor="name" className="text-white/70 text-sm font-medium ml-1">Name</label>
                          <Input
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Your name"
                            required
                            disabled={isSubmitting}
                            className="bg-navy-dark/50 border-white/10 text-white placeholder:text-white/20 focus:border-aqua/50 focus:ring-aqua/20 h-12 rounded-xl"
                          />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="phone" className="text-white/70 text-sm font-medium ml-1">Phone</label>
                          <Input
                            id="phone"
                            name="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="(850) 555-0199"
                            required
                            disabled={isSubmitting}
                            className="bg-navy-dark/50 border-white/10 text-white placeholder:text-white/20 focus:border-aqua/50 focus:ring-aqua/20 h-12 rounded-xl"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="email" className="text-white/70 text-sm font-medium ml-1">Email</label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="your@email.com"
                          disabled={isSubmitting}
                          className="bg-navy-dark/50 border-white/10 text-white placeholder:text-white/20 focus:border-aqua/50 focus:ring-aqua/20 h-12 rounded-xl"
                        />
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="service" className="text-white/70 text-sm font-medium ml-1">Service Needed</label>
                        <div className="relative">
                          <select
                            id="service"
                            name="service"
                            value={formData.service}
                            onChange={handleChange}
                            disabled={isSubmitting}
                            className="w-full h-12 px-4 rounded-xl bg-navy-dark/50 border border-white/10 text-white focus:border-aqua/50 focus:ring-4 focus:ring-aqua/10 outline-none appearance-none cursor-pointer transition-all"
                          >
                            <option value="" className="bg-navy">Select a service...</option>
                            <option value="leak" className="bg-navy">Leak Detection & Repair</option>
                            <option value="drain" className="bg-navy">Drain Cleaning</option>
                            <option value="water-heater" className="bg-navy">Water Heater Service</option>
                            <option value="fixture" className="bg-navy">Fixture Installation</option>
                            <option value="sewer" className="bg-navy">Sewer Line Service</option>
                            <option value="emergency" className="bg-navy">Emergency Repair</option>
                            <option value="other" className="bg-navy">Other</option>
                          </select>
                          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-white/50">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="message" className="text-white/70 text-sm font-medium ml-1">Message</label>
                        <Textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          placeholder="Tell us about your plumbing issue..."
                          rows={4}
                          disabled={isSubmitting}
                          className="bg-navy-dark/50 border-white/10 text-white placeholder:text-white/20 focus:border-aqua/50 focus:ring-aqua/20 rounded-xl resize-none"
                        />
                      </div>

                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full btn-primary h-14 text-lg font-bold shadow-lg shadow-aqua/20 hover:shadow-aqua/40 hover:-translate-y-1 transition-all duration-300 rounded-xl disabled:opacity-50 disabled:hover:translate-y-0"
                      >
                        {isSubmitting ? (
                          <span className="flex items-center">
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Sending...
                          </span>
                        ) : (
                          <>
                            <Send className="w-5 h-5 mr-2" />
                            Send Message
                          </>
                        )}
                      </Button>

                      <p className="text-center text-white/30 text-xs">
                        By submitting, you agree to our privacy policy. We never share your information.
                      </p>
                    </form>
                  </>
                )}
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
