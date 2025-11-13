import { Clock, Calendar, UserPlus, Phone, MapPin, Shield, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Clock,
      title: "Real-time Updates",
      description: "Live doctor availability status",
    },
    {
      icon: Calendar,
      title: "Queue Tracking",
      description: "Know your position in line",
    },
    {
      icon: UserPlus,
      title: "Easy Booking",
      description: "Book appointments in seconds",
    },
  ];

  const premiumFeatures = [
    {
      icon: Clock,
      title: "Real-time Doctor Availability",
      description: "Check if your doctor is available, busy, or offline before you leave home.",
    },
    {
      icon: Calendar,
      title: "Live Queue Updates",
      description: "See the current queue status and estimated waiting time for each doctor.",
    },
    {
      icon: UserPlus,
      title: "Instant Appointments",
      description: "Book appointments directly through the app and get immediate confirmation.",
    },
    {
      icon: Phone,
      title: "Appointment Reminders",
      description: "Get SMS and in-app notifications before your scheduled appointment.",
    },
    {
      icon: MapPin,
      title: "Find Nearby Clinics",
      description: "Discover and filter clinics and hospitals near your location.",
    },
    {
      icon: Shield,
      title: "Secure Medical History",
      description: "Maintain your medical records securely for future references.",
    },
  ];

  const howItWorks = [
    {
      step: "01",
      title: "Search for a Doctor",
      description: "Find the right healthcare professional based on specialty, location, and availability.",
    },
    {
      step: "02",
      title: "Check Real-time Availability",
      description: "View the doctor's current status and queue length before making a decision.",
    },
    {
      step: "03",
      title: "Book Your Appointment",
      description: "Schedule a visit with just a few taps and receive a confirmation instantly.",
    },
    {
      step: "04",
      title: "Track Your Queue Position",
      description: "Monitor your position in the queue in real-time and arrive just when you're needed.",
    },
  ];

  const testimonials = [
    {
      name: "Rahul Mehta",
      role: "Software Developer",
      text: "Fikar Plus has completely changed how I visit doctors. No more waiting for hours in crowded waiting rooms!",
      rating: 5,
    },
    {
      name: "Priya Singh",
      role: "Marketing Manager",
      text: "As a busy professional, I appreciate Fikar Plus lets me plan my doctor visits around my schedule.",
      rating: 5,
    },
    {
      name: "Amit Gupta",
      role: "Business Owner",
      text: "The queue updates are incredibly accurate. I know exactly when to leave home to see my doctor.",
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex items-center">
              <span className="text-2xl font-bold italic text-foreground">fikar</span>
              <div className="relative">
                <div className="h-6 w-6 rounded-full bg-primary flex items-center justify-center">
                  <span className="text-white text-lg font-bold">+</span>
                </div>
              </div>
            </div>
          </div>
          <Button variant="outline" onClick={() => navigate("/login")}>
            Login
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <Badge variant="secondary" className="mb-4">
              #1 Doctor Queue Management App in India
            </Badge>
            <h1 className="text-5xl font-bold text-foreground mb-6 leading-tight">
              Instant Access to Healthcare –{" "}
              <span className="text-primary">No Lines, No Delays</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Fikar Plus shows <span className="text-primary font-semibold">real-time doctor availability</span> and{" "}
              <span className="text-primary font-semibold">live queue updates</span>, helping you save time spent
              waiting in clinics and reducing crowding in hospitals.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {features.map((feature, index) => (
                <Card key={index} className="bg-accent/50">
                  <CardContent className="pt-6">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          <div className="relative">
            <Card className="bg-gradient-to-br from-primary/5 to-accent/30 border-2">
              <CardContent className="p-8">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-4">Doctors Near You</h3>
                    <div className="space-y-3">
                      {[
                        { name: "Dr. Sharma", specialty: "Cardiologist", distance: "2.3 km", status: "Available", statusColor: "success" },
                        { name: "Dr. Patel", specialty: "Pediatrician", distance: "3.1 km", status: "Queue: 3", statusColor: "warning" },
                        { name: "Dr. Kumar", specialty: "Neurologist", distance: "1.5 km", status: "Offline", statusColor: "muted" },
                      ].map((doctor, index) => (
                        <Card key={index} className="bg-card">
                          <CardContent className="p-4">
                            <div className="flex items-center gap-4">
                              <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center text-white font-bold">
                                {doctor.name.split(" ")[1][0]}
                              </div>
                              <div className="flex-1">
                                <p className="font-semibold">{doctor.name}</p>
                                <p className="text-sm text-muted-foreground">{doctor.specialty} • {doctor.distance}</p>
                              </div>
                              <Badge variant={doctor.statusColor === "success" ? "default" : "secondary"} className={doctor.statusColor === "success" ? "bg-success" : ""}>
                                {doctor.status}
                              </Badge>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-semibold">Your Appointment</h3>
                      <Badge className="bg-info">Active</Badge>
                    </div>
                    <Card className="bg-primary/5 border-primary">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-4">
                          <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center text-white font-bold">
                            DS
                          </div>
                          <div className="flex-1">
                            <p className="font-semibold">Dr. Sharma</p>
                            <p className="text-sm text-muted-foreground">Cardiologist</p>
                            <p className="text-sm text-primary font-medium">Today at 2:30 PM</p>
                          </div>
                        </div>
                        <div className="mt-4 flex items-center gap-2">
                          <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-white font-bold text-sm">
                            2
                          </div>
                          <span className="text-sm font-medium">Your position in queue</span>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Premium Features Section */}
      <section className="py-20 bg-accent/30">
        <div className="container">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4">
              Premium Features
            </Badge>
            <h2 className="text-4xl font-bold mb-4">
              Everything You Need for <span className="text-primary">Hassle-free</span> Doctor Visits
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Fikar Plus provides a comprehensive solution to make healthcare more accessible and efficient.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {premiumFeatures.map((feature, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
                    <feature.icon className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground mb-4">{feature.description}</p>
                  <Button variant="link" className="p-0 text-primary">
                    Learn more →
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4">
              Simple Process
            </Badge>
            <h2 className="text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Fikar Plus makes your doctor visits simple and stress-free in just a few easy steps.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {howItWorks.map((item, index) => (
              <div key={index} className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="h-14 w-14 rounded-2xl bg-primary flex items-center justify-center text-white font-bold text-xl">
                    {item.step}
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-accent/30">
        <div className="container">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4">
              TESTIMONIALS
            </Badge>
            <h2 className="text-4xl font-bold mb-4">What Our Users Say</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Fikar Plus is making a difference in the lives of patients and healthcare providers across Gwalior.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-warning text-warning" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-6 italic">"{testimonial.text}"</p>
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center text-white font-bold">
                      {testimonial.name[0]}
                    </div>
                    <div>
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-primary/80">
        <div className="container text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to save time at your next doctor's visit?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Join Fikar Plus today and never waste time waiting in clinics again.
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" variant="secondary">
              App Store
            </Button>
            <Button size="lg" variant="secondary">
              Google Play
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t py-12">
        <div className="container">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl font-bold italic">fikar</span>
                <div className="h-6 w-6 rounded-full bg-primary flex items-center justify-center">
                  <span className="text-white text-lg font-bold">+</span>
                </div>
              </div>
              <p className="text-muted-foreground mb-4">
                Save valuable time with real-time doctor availability and queue updates at your fingertips.
              </p>
              <div className="text-sm text-muted-foreground">
                <p className="font-semibold mb-2">Coming soon to:</p>
                <div className="flex gap-2">
                  <Badge variant="outline">App Store</Badge>
                  <Badge variant="outline">Google Play</Badge>
                </div>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-primary mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-muted-foreground hover:text-primary">Home</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary">Features</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary">How It Works</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-primary mb-4">Portals</h3>
              <ul className="space-y-2">
                <li><a href="/login" className="text-muted-foreground hover:text-primary">Doctor Portal</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-primary mb-4">Contact Us</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="font-semibold mb-1">Email</p>
                  <p className="text-muted-foreground">plusfikar@gmail.com</p>
                </div>
                <div>
                  <p className="font-semibold mb-1">Phone</p>
                  <p className="text-muted-foreground">+91 7240445755, +91 9302861671</p>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <p>© 2025 Fikar Plus. All rights reserved.</p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-primary">Privacy Policy</a>
              <a href="#" className="hover:text-primary">Terms of Service</a>
              <a href="#" className="hover:text-primary">Cookie Policy</a>
            </div>
            <p>Made with ❤️ in India</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
