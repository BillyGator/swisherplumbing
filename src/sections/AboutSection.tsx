import { useRef } from 'react';
import {
  Shield,
  Clock,
  DollarSign,
  Award,
  Star,
  MapPin,
  Users,
  ThumbsUp
} from 'lucide-react';
import RevealOnScroll from '../components/RevealOnScroll';

const stats = [
  { number: '23+', label: 'Years Experience', icon: <Award className="w-6 h-6" /> },
  { number: '10K+', label: 'Happy Customers', icon: <Users className="w-6 h-6" /> },
  { number: '24/7', label: 'Emergency Service', icon: <Clock className="w-6 h-6" /> },
  { number: '100%', label: 'Satisfaction Guarantee', icon: <ThumbsUp className="w-6 h-6" /> },
];

const values = [
  {
    icon: <Shield className="w-10 h-10" />,
    title: 'Licensed & Insured',
    description: 'Florida-licensed plumbers, fully background-checked and insured for your peace of mind.',
  },
  {
    icon: <Clock className="w-10 h-10" />,
    title: 'Same-Day Service',
    description: 'Most repairs scheduled the day you call. We respect your time and urgency.',
  },
  {
    icon: <DollarSign className="w-10 h-10" />,
    title: 'Upfront Pricing',
    description: 'Clear, honest estimates before any work begins. No surprises, ever.',
  },
];

const testimonials = [
  {
    name: 'Morgan T.',
    location: 'Milton, FL',
    rating: 5,
    text: 'Fast, clean, and honest. Fixed our kitchen leak the same day. The pelican mascot on their truck made my kids smile!',
  },
  {
    name: 'Darnell K.',
    location: 'Pensacola, FL',
    rating: 5,
    text: 'They explained everything and stayed on budget. Highly recommend Swisher for any plumbing needs.',
  },
  {
    name: 'Sandy V.',
    location: 'Gulf Breeze, FL',
    rating: 5,
    text: 'Our office go-to for maintenance. Reliable, easy to schedule, and always professional.',
  },
];

const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative w-full py-20 md:py-32 overflow-hidden"
    >
      {/* Image Background */}
      <div className="absolute inset-0 w-full h-full">
        <img
          src="/images/SectionBackground.png"
          alt="Background"
          className="w-full h-full object-cover opacity-90"
        />
        {/* Subtle overlay for text readability */}
        <div className="absolute inset-0 bg-navy/20" />
      </div>

      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-12 xl:px-16">
        {/* Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-20">
          {stats.map((stat, index) => (
            <RevealOnScroll key={stat.label} delay={index * 100}>
              <div
                className="glass-card p-6 text-center group border border-white/10 hover:border-sand/50 transition-all duration-300 h-full flex flex-col items-center justify-center transform hover:-translate-y-2 hover:shadow-xl hover:shadow-sunset/20 rounded-[28px]"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-white/10 text-sand rounded-xl mb-3 group-hover:scale-110 transition-transform duration-500 backdrop-blur-sm border border-white/10">
                  {stat.icon}
                </div>
                <p className="text-3xl md:text-4xl font-coda font-bold text-white mb-1">
                  {stat.number}
                </p>
                <p className="text-sm text-sand/80 font-medium">{stat.label}</p>
              </div>
            </RevealOnScroll>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-20">
          {/* Left: Story */}
          <RevealOnScroll effect="fade-right">
            <div>
              <span className="inline-block text-coral font-semibold text-sm uppercase tracking-wider mb-4 animate-pulse">
                About Swisher Plumbing
              </span>
              <h2 className="text-4xl md:text-5xl text-white mb-6 leading-tight">
                Your Local Florida
                <span className="block text-gradient-aqua">Plumbing Experts</span>
              </h2>
              <div className="space-y-4 text-white/90 text-lg font-medium">
                <p>
                  Founded in Pace, Florida, Swisher Plumbing has been serving the Florida Panhandle with pride since 2017. What started as a one-truck operation has grown into a full-service plumbing company, but we&apos;ve never lost our small-town values.
                </p>
                <p>
                  Our friendly pelican mascot represents our commitment to bringing a smile to every job—because plumbing problems are stressful enough without a grumpy plumber! We believe in honest work, fair prices, and treating every customer like a neighbor.
                </p>
                <p>
                  Whether it&apos;s a dripping faucet or a full commercial installation, we bring the same level of care and expertise to every project. That&apos;s the Swisher difference.
                </p>
              </div>

              <div className="flex items-center gap-4 mt-8">
                <div className="flex items-center gap-2 text-white font-bold">
                  <MapPin className="w-5 h-5 text-sand" />
                  <span>Pace, FL</span>
                </div>
                <div className="w-px h-6 bg-white/20" />
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-sand text-sand" />
                  ))}
                  <span className="text-white/80 ml-2 font-medium">5.0 Rating</span>
                </div>
              </div>
            </div>
          </RevealOnScroll>

          {/* Right: Values */}
          <div className="space-y-6">
            {values.map((value, index) => (
              <RevealOnScroll key={value.title} effect="fade-left" delay={(index + 2) * 100}>
                <div
                  className="glass-card p-6 flex items-start gap-5 group border border-white/10 hover:border-sand/50 transition-all duration-500 transform hover:-translate-x-2 hover:shadow-lg hover:shadow-sunset/10 rounded-[28px]"
                >
                  <div className="flex-shrink-0 w-16 h-16 bg-white/10 text-sand rounded-2xl flex items-center justify-center group-hover:bg-sand group-hover:text-navy transition-all duration-500 group-hover:rotate-6 shadow-inner border border-white/10 backdrop-blur-md">
                    {value.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-coda font-bold text-white mb-2 group-hover:text-sand transition-colors">
                      {value.title}
                    </h3>
                    <p className="text-white/70 group-hover:text-white/90 transition-colors">{value.description}</p>
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <RevealOnScroll effect="fade-up" delay={400}>
          <div>
            <h3 className="text-2xl md:text-3xl font-coda font-bold text-white text-center mb-10">
              What Our Neighbors Are Saying
            </h3>

            <div className="grid md:grid-cols-3 gap-6">
              {testimonials.map((testimonial, index) => (
                <div
                  key={testimonial.name}
                  className="glass-card p-8 relative group border border-white/10 hover:border-sand/40 transition-all duration-500 transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-sunset/10 rounded-[28px]"
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  {/* Quote mark */}
                  <div className="absolute -top-4 -left-2 text-8xl text-white/5 font-serif leading-none group-hover:text-sand/20 transition-colors duration-500">
                    &ldquo;
                  </div>

                  {/* Rating */}
                  <div className="flex gap-1 mb-6 relative z-10">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-sand text-sand animate-pulse-slow" style={{ animationDelay: `${i * 200}ms` }} />
                    ))}
                  </div>

                  <p className="text-white/80 mb-8 relative z-10 italic leading-relaxed font-medium">
                    &ldquo;{testimonial.text}&rdquo;
                  </p>

                  <div className="flex items-center gap-4 relative z-10">
                    <div className="w-12 h-12 bg-gradient-to-br from-sand to-coral rounded-full flex items-center justify-center text-navy font-coda font-bold text-lg shadow-lg">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-white font-semibold">{testimonial.name}</p>
                      <p className="text-white/50 text-sm flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {testimonial.location}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
};

export default AboutSection;
