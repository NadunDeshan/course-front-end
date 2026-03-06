import { BsTelephone, BsEnvelope, BsGeoAlt } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

export default function ContactPage() {
  const navigate = useNavigate();
  return (
    <div className="w-full min-h-screen p-6 bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
       <div className="flex  justify-between items-center mb-2">
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 rounded-xl bg-white/20 text-white hover:bg-white/30"
        >
          ← Back
        </button>
      </div>
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 py-10">
        <h1 className="text-4xl font-bold text-center">Contact Us</h1>
        <p className="text-center text-white/70 mt-3">
          Have questions about our products? Get in touch with RIDEX
          Accessories.
        </p>
      </div>

      {/* Contact Section */}
      <div className="max-w-7xl mx-auto px-4 pb-14 grid md:grid-cols-2 gap-8">
        {/* Contact Info */}
        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-lg">
          <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>

          <div className="space-y-5">
            <div className="flex items-center gap-4">
              <BsGeoAlt className="text-accent text-2xl" />
              <div>
                <p className="font-semibold">Address</p>
                <p className="text-white/70">
                  62 Sama Road, Rathmalana, Sri Lanka
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <BsTelephone className="text-accent text-2xl" />
              <div>
                <p className="font-semibold">Phone</p>
                <p className="text-white/70">+94 77 523 25 36</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <BsEnvelope className="text-accent text-2xl" />
              <div>
                <p className="font-semibold">Email</p>
                <p className="text-white/70">support@ridex.lk</p>
              </div>
            </div>
          </div>

          {/* Map placeholder */}
          <div className="mt-8 rounded-2xl overflow-hidden border border-white/10">
            <iframe
              title="map"
              src="https://maps.google.com/maps?q=6°48'27.4N 79°52'27.2E&z=15&output=embed"
              className="w-full h-[250px]"
            ></iframe>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-lg">
          <h2 className="text-2xl font-bold mb-6">Send Message</h2>

          <form className="space-y-4">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/10 outline-none focus:border-accent"
            />

            <input
              type="email"
              placeholder="Your Email"
              className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/10 outline-none focus:border-accent"
            />

            <textarea
              rows="5"
              placeholder="Your Message"
              className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/10 outline-none focus:border-accent"
            ></textarea>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-accent font-bold hover:brightness-110 transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
