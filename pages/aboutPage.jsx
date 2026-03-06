import { Link, useNavigate,  } from "react-router-dom";
import { BsShieldCheck, BsTruck, BsStar, BsTools } from "react-icons/bs";

export default function AboutPage() {
  const navigate = useNavigate();
  return (
    <div className="w-full min-h-[calc(100vh-100px)]  bg-gradient-to-br from-gray-900 via-gray-800 to-black">
       <div className="flex justify-between  p-6 items-center mb-6">
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 rounded-xl bg-white/20 text-white hover:bg-white/30"
        >
          ← Back
        </button>
      </div>
      {/* Hero */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-10 pb-8">
        <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 sm:p-10">
          <p className="text-white/70 font-semibold tracking-wide">
            RIDEX ACCESSORIES
          </p>
          <h1 className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white">
            Built for riders. Designed for performance.
          </h1>
          <p className="mt-4 max-w-3xl text-white/70 leading-relaxed">
            At RIDEX Accessories, we bring high-quality motorbike accessories
            that improve your ride — from safety gear to stylish upgrades. Our
            goal is simple: give riders reliable products, fair prices, and a
            smooth shopping experience.
          </p>

          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <Link
              to="/products"
              className="inline-flex items-center justify-center px-5 py-3 rounded-2xl bg-accent text-white font-bold
              shadow-md shadow-black/30 hover:brightness-110 transition active:scale-[0.98]"
            >
              Explore Products
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center px-5 py-3 rounded-2xl bg-white/10 text-white font-semibold
              border border-white/15 hover:bg-white/15 transition active:scale-[0.98]"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* Stats / Highlights */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <InfoCard
            icon={<BsStar className="text-2xl text-tertiary" />}
            title="Top Quality"
            text="Carefully selected products with durable materials and trusted brands."
          />
          <InfoCard
            icon={<BsShieldCheck className="text-2xl text-tertiary" />}
            title="Rider Safety"
            text="Accessories that support safety, comfort, and long-distance confidence."
          />
          <InfoCard
            icon={<BsTruck className="text-2xl text-tertiary" />}
            title="Fast Delivery"
            text="Quick order processing with reliable delivery options."
          />
          <InfoCard
            icon={<BsTools className="text-2xl text-tertiary" />}
            title="Support & Service"
            text="Friendly customer support and help choosing the right accessory."
          />
        </div>
      </section>

      {/* Mission + Vision */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 sm:p-8">
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Our Mission
            </h2>
            <p className="mt-3 text-white/70 leading-relaxed">
              To provide riders with premium motorbike accessories that enhance
              performance, comfort, and style — while keeping quality and value
              at the center of everything we do.
            </p>
            <ul className="mt-5 space-y-3 text-white/75">
              <li className="flex gap-3">
                <span className="mt-1 h-2 w-2 rounded-full bg-tertiary" />
                High-quality accessories for every rider level
              </li>
              <li className="flex gap-3">
                <span className="mt-1 h-2 w-2 rounded-full bg-tertiary" />
                Fair pricing with trusted product sourcing
              </li>
              <li className="flex gap-3">
                <span className="mt-1 h-2 w-2 rounded-full bg-tertiary" />
                Smooth shopping experience with support
              </li>
            </ul>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 sm:p-8">
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Our Vision
            </h2>
            <p className="mt-3 text-white/70 leading-relaxed">
              To become the most trusted motorbike accessories store by building
              a community of riders who love performance upgrades and safe,
              stylish riding.
            </p>

            <div className="mt-6 rounded-2xl border border-white/10 bg-black/30 p-5">
              <p className="text-white font-semibold">What makes us different?</p>
              <p className="mt-2 text-white/70 leading-relaxed">
                We focus on clean product quality, genuine recommendations, and
                modern UI so ordering feels easy and professional.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-14">
        <div className="rounded-3xl border border-white/10 bg-gradient-to-r from-white/10 to-white/5 p-6 sm:p-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5">
          <div>
            <h3 className="text-2xl font-extrabold text-white">
              Ready to upgrade your ride?
            </h3>
            <p className="mt-2 text-white/70">
              Browse accessories and find the perfect match for your bike.
            </p>
          </div>

          <Link
            to="/products"
            className="inline-flex items-center justify-center px-6 py-3 rounded-2xl bg-accent text-white font-bold
            shadow-md shadow-black/30 hover:brightness-110 transition active:scale-[0.98]"
          >
            Shop Now
          </Link>
        </div>
      </section>
    </div>
  );
}

function InfoCard({ icon, title, text }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6">
      <div className="flex items-center gap-3">
        <div className="h-12 w-12 rounded-2xl bg-white/10 flex items-center justify-center">
          {icon}
        </div>
        <h3 className="text-white font-bold text-lg">{title}</h3>
      </div>
      <p className="mt-3 text-white/70 leading-relaxed">{text}</p>
    </div>
  );
}