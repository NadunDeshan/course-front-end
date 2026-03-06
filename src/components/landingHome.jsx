import { Link } from "react-router-dom";

/* ✅ Premium Background (blobs + grid + noise) */
function PremiumBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none ">
      
      {/* soft gradient base */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_15%,rgba(250,129,47,0.22),transparent_35%),radial-gradient(circle_at_85%_25%,rgba(0,0,0,0.06),transparent_38%),radial-gradient(circle_at_50%_90%,rgba(250,129,47,0.18),transparent_40%)]" />
 
      {/* animated grid  */}
      <div className="absolute inset-0 opacity-[0.35] gridMove" />

      {/* glow blobs */}
      <div className="blob blobA" />
      <div className="blob blobB" />
      <div className="blob blobC" />

     {/* subtle noise overlay */}
      <div className="absolute inset-0 noise opacity-[0.06]" />

      <style>{`
        .gridMove{
          background-image:
            linear-gradient(rgba(0,0,0,0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,0,0,0.06) 1px, transparent 1px);
          background-size: 44px 44px;
          animation: gridMove 18s linear infinite;
          mask-image: radial-gradient(circle at 50% 20%, black 20%, transparent 70%);
        }
        @keyframes gridMove{
          from{ background-position: 0 0; }
          to{ background-position: 44px 44px; }
        }

        .blob{
          position:absolute;
          width: 520px;
          height: 520px;
          border-radius: 999px;
          filter: blur(60px);
          background: rgba(250,129,47,0.28);
          animation: floaty 12s ease-in-out infinite;
        }
        .blobA{ top:-180px; left:-180px; animation-duration: 12s; }
        .blobB{ top:120px; right:-220px; animation-duration: 15s; opacity:0.23; }
        .blobC{ bottom:-240px; left:35%; animation-duration: 18s; opacity:0.18; }

        @keyframes floaty{
          0%,100%{ transform: translate(0,0) scale(1); }
          50%{ transform: translate(34px,-24px) scale(1.06); }
        }

        .noise{
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='120' height='120' filter='url(%23n)' opacity='.35'/%3E%3C/svg%3E");
          mix-blend-mode: multiply;
        }
      `}</style> 

 </div>
  );
}

function Badge({ text }) {
  return (
    <span className="text-xs font-extrabold text-secondary/80 bg-white/60 border border-secondary/10 px-3 py-1.5 rounded-full">
      {text}
    </span>
  );
}

function FeatureCard({ title, desc, icon }) {
  return (
    <div className="bg-white/60 backdrop-blur border border-secondary/10 rounded-3xl p-6 shadow-sm hover:shadow-md transition">
      <div className="w-12 h-12 rounded-2xl bg-accent/15 flex items-center justify-center text-accent text-2xl">
        {icon}
      </div>
      <h3 className="mt-4 text-lg font-extrabold text-secondary">{title}</h3>
      <p className="mt-2 text-sm text-secondary/70 leading-6">{desc}</p>
    </div>
  );
}

function ProductPreviewCard({ name, note, price }) {
  return (
    <div className="group bg-white/60 border border-secondary/10 rounded-3xl p-5 shadow-sm hover:shadow-md transition overflow-hidden relative">
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-accent/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition" />
      <div className="relative">
        <p className="text-xs font-extrabold text-accent bg-accent/10 border border-accent/20 px-3 py-1.5 rounded-full inline-flex">
          BEST SELLER
        </p>
        <h4 className="mt-4 text-lg font-extrabold text-secondary">{name}</h4>
        <p className="mt-2 text-sm text-secondary/70">{note}</p>
        <div className="mt-5 flex items-end justify-between">
          <p className="text-xl font-extrabold text-accent">LKR {price}</p>
          <Link
            to="/products"
            className="text-sm font-extrabold text-secondary hover:text-accent transition"
          >
            View →
          </Link>
        </div>
      </div>
    </div>
  );
}

function Testimonial({ name, text }) {
  return (
    <div className="bg-white/60 backdrop-blur border border-secondary/10 rounded-3xl p-6 shadow-sm">
      <p className="text-sm text-secondary/80 leading-6">“{text}”</p>
      <p className="mt-4 text-sm font-extrabold text-secondary">{name}</p>
      <p className="text-xs text-secondary/60">Verified Customer</p>
    </div>
  );
}

export default function PremiumHome() {
  return (
    <div className="w-full ">
      {/* HERO */}
      <section className="relative">
        <PremiumBackground />

        <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 pt-12 pb-14">
          <div className="flex flex-col lg:flex-row gap-10 items-center">
            {/* Left */}
            <div className="w-full lg:w-[56%]">
              <div className="flex flex-wrap gap-2">
                <Badge text="Premium Bike Accessories" />
                <Badge text="Fast Delivery" />
                <Badge text="Trusted Quality" />
              </div>

              <h1 className="mt-6 text-3xl sm:text-5xl font-extrabold tracking-tight text-secondary">
                Make your bike look{" "}
                <span className="text-accent">premium</span> — ride safer, ride
                smarter.
              </h1>

              <p className="mt-4 text-sm sm:text-base text-secondary/75 leading-7 max-w-2xl">
                RIDEX ACCESSORIES brings modern gear: LED upgrades, phone mounts,
                gloves, mirrors, and more — clean design, strong quality, and a
                smooth shopping experience.
              </p>

              <div className="mt-7 flex flex-col sm:flex-row gap-3">
                <Link
                  to="/products"
                  className="h-12 px-6 rounded-2xl bg-accent text-white font-extrabold
                             flex items-center justify-center shadow-sm
                             hover:opacity-95 active:scale-[0.99] transition"
                >
                  Shop Products
                </Link>

                <Link
                  to="/cart"
                  className="h-12 px-6 rounded-2xl bg-white/70 text-secondary font-extrabold
                             border border-secondary/10 flex items-center justify-center
                             hover:bg-white transition"
                >
                  Go to Cart
                </Link>
              </div>

              {/* Quick trust stats */}
              <div className="mt-8 grid grid-cols-3 gap-3 max-w-lg">
                <div className="bg-white/60 border border-secondary/10 rounded-2xl p-4 text-center">
                  <p className="text-xl font-extrabold text-secondary">Fast</p>
                  <p className="text-xs text-secondary/70 mt-1">Dispatch</p>
                </div>
                <div className="bg-white/60 border border-secondary/10 rounded-2xl p-4 text-center">
                  <p className="text-xl font-extrabold text-secondary">Premium</p>
                  <p className="text-xs text-secondary/70 mt-1">Quality</p>
                </div>
                <div className="bg-white/60 border border-secondary/10 rounded-2xl p-4 text-center">
                  <p className="text-xl font-extrabold text-secondary">Secure</p>
                  <p className="text-xs text-secondary/70 mt-1">Checkout</p>
                </div>
              </div>
            </div>

            {/* Right: premium showcase card */}
            <div className="w-full lg:w-[44%]">
              <div className="bg-white/60 backdrop-blur border border-secondary/10 rounded-[28px] p-5 sm:p-6 shadow-sm">
                <div className="rounded-3xl overflow-hidden border border-secondary/10 bg-primary/60">
                  <div className="p-6">
                    <p className="text-sm font-extrabold text-secondary">
                      Featured Picks
                    </p>
                    <p className="text-xs text-secondary/70 mt-1">
                      Customer favorites — clean, modern, durable
                    </p>

                    <div className="mt-5 grid gap-3">
                      {[
                        { t: "Phone Mount Pro", s: "Anti-shake • Metal build" },
                        { t: "LED Headlight Kit", s: "Bright • Long life • Stylish" },
                        { t: "Rider Gloves", s: "Grip • Comfort • Safety" },
                      ].map((x, i) => (
                        <div
                          key={i}
                          className="flex items-center justify-between gap-3 bg-white/60 border border-secondary/10 rounded-2xl p-4"
                        >
                          <div>
                            <p className="font-extrabold text-secondary">{x.t}</p>
                            <p className="text-xs text-secondary/70 mt-1">{x.s}</p>
                          </div>
                          <span className="text-xs font-extrabold text-accent bg-accent/10 border border-accent/20 px-3 py-1.5 rounded-full">
                            HOT
                          </span>
                        </div>
                      ))}
                    </div>

                    <Link
                      to="/products"
                      className="mt-5 h-12 w-full rounded-2xl bg-secondary text-white font-extrabold
                                 flex items-center justify-center hover:opacity-95 transition"
                    >
                      View All Products
                    </Link>
                  </div>
                </div>
              </div>

              <p className="text-xs text-secondary/60 mt-3 text-center">
                Smooth UI • Mobile-friendly • Quick checkout
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-12">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-secondary">
              Why riders choose RIDEX
            </h2>
            <p className="text-secondary/70 mt-2 text-sm">
              Modern look + practical gear, built for real riders.
            </p>
          </div>
          <Link to="/products" className="text-accent font-extrabold hidden sm:block">
            Browse →
          </Link>
        </div>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <FeatureCard icon="⚡" title="Fast Delivery" desc="Quick dispatch with careful packaging." />
          <FeatureCard icon="🛡️" title="Quality & Safety" desc="Durable materials, rider-first designs." />
          <FeatureCard icon="💳" title="Easy Checkout" desc="Simple cart flow with clear prices." />
        </div>
      </section>

      {/* BEST SELLERS PREVIEW (UI only for now) */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 pb-12">
        <div className="bg-accent/10 border border-secondary/10 rounded-3xl p-6 sm:p-8">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-secondary">
                Best sellers
              </h2>
              <p className="text-secondary/70 mt-2 text-sm">
                Premium picks that customers love.
              </p>
            </div>
            <Link to="/products" className="text-accent font-extrabold hidden sm:block">
              See all →
            </Link>
          </div>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <ProductPreviewCard
              name="Phone Mount Pro"
              note="Strong grip • Smooth style • Anti-shake"
              price="4,950"
            />
            <ProductPreviewCard
              name="LED Headlight Kit"
              note="High brightness • Clean beam • Durable"
              price="7,990"
            />
            <ProductPreviewCard
              name="Rider Gloves"
              note="Comfort fit • Strong grip • Safe"
              price="2,850"
            />
          </div>

          <div className="mt-6">
            <Link
              to="/products"
              className="inline-flex items-center justify-center h-12 px-6 rounded-2xl bg-accent text-white font-extrabold
                         hover:opacity-95 transition"
            >
              Explore Products
            </Link>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 pb-14">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-secondary">
          What customers say
        </h2>
        <p className="text-secondary/70 mt-2 text-sm">
          Trusted by riders who love clean, premium accessories.
        </p>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <Testimonial
            name="Kavindu"
            text="Phone mount is super stable and looks premium on my bike."
          />
          <Testimonial
            name="Shenal"
            text="Fast delivery and quality is really good. Great packaging too."
          />
          <Testimonial
            name="Nimesh"
            text="Checkout is easy. LED kit is super bright and clean."
          />
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 pb-16">
        <div className="bg-secondary text-white rounded-3xl p-8 sm:p-10 overflow-hidden relative">
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/10 rounded-full blur-2xl" />
          <div className="relative">
            <h2 className="text-2xl sm:text-3xl font-extrabold">
              Ready to upgrade your ride?
            </h2>
            <p className="mt-2 text-white/80 text-sm sm:text-base max-w-2xl">
              Browse RIDEX accessories and enjoy a smooth, modern shopping experience.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <Link
                to="/products"
                className="h-12 px-6 rounded-2xl bg-accent text-white font-extrabold
                           flex items-center justify-center hover:opacity-95 transition"
              >
                Shop Now
              </Link>
              <Link
                to="/contact"
                className="h-12 px-6 rounded-2xl bg-white/10 border border-white/20 text-white font-extrabold
                           flex items-center justify-center hover:bg-white/15 transition"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="w-full border-t border-secondary/10 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-sm text-secondary/70">
            © {new Date().getFullYear()} RIDEX ACCESSORIES. All rights reserved.
          </p>
          <div className="flex gap-4 text-sm font-extrabold">
            <Link className="text-secondary/70 hover:text-accent transition" to="/products">
              Products
            </Link>
            <Link className="text-secondary/70 hover:text-accent transition" to="/about">
              About
            </Link>
            <Link className="text-secondary/70 hover:text-accent transition" to="/contact">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
 

   


//   return (
//     <div className="bg-white/60 backdrop-blur border border-secondary/10 rounded-3xl p-6 shadow-sm hover:shadow-md transition">
//       <div className="w-12 h-12 rounded-2xl bg-accent/15 flex items-center justify-center text-accent text-2xl">
//         {icon}
//       </div>
//       <h3 className="mt-4 text-lg font-extrabold text-secondary">{title}</h3>
//       <p className="mt-2 text-sm text-secondary/70 leading-6">{desc}</p>
//     </div>
//   );
// }

// function CategoryCard({ title, desc }) {
//   return (
//     <div className="group bg-white/60 backdrop-blur border border-secondary/10 rounded-3xl p-6 shadow-sm hover:shadow-md transition overflow-hidden relative">
//       <div className="absolute -top-20 -right-20 w-48 h-48 bg-accent/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition" />
//       <h3 className="text-lg font-extrabold text-secondary">{title}</h3>
//       <p className="mt-2 text-sm text-secondary/70 leading-6">{desc}</p>
//       <div className="mt-4 inline-flex items-center gap-2 text-accent font-bold">
//         Explore <span className="transition group-hover:translate-x-1">→</span>
//       </div>
//     </div>
//   );
// }

// function Testimonial({ name, text }) {
//   return (
//     <div className="bg-white/60 backdrop-blur border border-secondary/10 rounded-3xl p-6 shadow-sm">
//       <p className="text-sm text-secondary/80 leading-6">“{text}”</p>
//       <p className="mt-4 text-sm font-extrabold text-secondary">{name}</p>
//       <p className="text-xs text-secondary/60">Verified Customer</p>
//     </div>
//   );
// }

// export default function LandingHome() {
//   return (
//     <div className="w-full">
//       {/* ✅ Animated Background Section */}
//       <section className="relative overflow-hidden">
//         {/* Background image overlay (optional) */}
//         <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(250,129,47,0.25),transparent_35%),radial-gradient(circle_at_80%_20%,rgba(0,0,0,0.06),transparent_35%),radial-gradient(circle_at_50%_90%,rgba(250,129,47,0.20),transparent_40%)]" />

//         {/* Floating blobs */}
//         <div className="absolute inset-0 pointer-events-none">
//           <div className="blob blob-1" />
//           <div className="blob blob-2" />
//           <div className="blob blob-3" />
//         </div>

//         <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 pt-12 pb-14">
//           {/* Hero */}
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
//             <div>
//               <p className="inline-flex items-center gap-2 text-xs font-extrabold text-accent bg-accent/10 border border-accent/20 px-3 py-1.5 rounded-full">
//                 RIDEX ACCESSORIES • Premium Bike Gear
//               </p>

//               <h1 className="mt-5 text-3xl sm:text-5xl font-extrabold tracking-tight text-secondary">
//                 Upgrade your ride with{" "}
//                 <span className="text-accent">modern</span> accessories.
//               </h1>

//               <p className="mt-4 text-secondary/75 text-sm sm:text-base leading-7 max-w-xl">
//                 Helmets, gloves, lights, phone mounts, mirrors, and more — chosen
//                 for comfort, safety, and style. Built for riders who want a clean,
//                 premium look.
//               </p>

//               <div className="mt-7 flex flex-col sm:flex-row gap-3">
//                 <Link
//                   to="/products"
//                   className="h-12 px-6 rounded-2xl bg-accent text-white font-extrabold
//                              flex items-center justify-center shadow-sm
//                              hover:opacity-95 active:scale-[0.99] transition"
//                 >
//                   Shop Products
//                 </Link>

//                 <Link
//                   to="/contact"
//                   className="h-12 px-6 rounded-2xl bg-white/70 text-secondary font-extrabold
//                              border border-secondary/10 flex items-center justify-center
//                              hover:bg-white transition"
//                 >
//                   Contact Us
//                 </Link>
//               </div>

//               {/* mini stats */}
//               <div className="mt-8 grid grid-cols-3 gap-3 max-w-lg">
//                 <div className="bg-white/60 border border-secondary/10 rounded-2xl p-4 text-center">
//                   <p className="text-xl font-extrabold text-secondary">Fast</p>
//                   <p className="text-xs text-secondary/70 mt-1">Delivery</p>
//                 </div>
//                 <div className="bg-white/60 border border-secondary/10 rounded-2xl p-4 text-center">
//                   <p className="text-xl font-extrabold text-secondary">Quality</p>
//                   <p className="text-xs text-secondary/70 mt-1">Materials</p>
//                 </div>
//                 <div className="bg-white/60 border border-secondary/10 rounded-2xl p-4 text-center">
//                   <p className="text-xl font-extrabold text-secondary">Secure</p>
//                   <p className="text-xs text-secondary/70 mt-1">Checkout</p>
//                 </div>
//               </div>
//             </div>

//             {/* Right side “product showcase” card */}
//             <div className="w-full">
//               <div className="bg-white/60 backdrop-blur border border-secondary/10 rounded-[28px] p-5 sm:p-6 shadow-sm">
//                 <div className="rounded-3xl overflow-hidden border border-secondary/10 bg-primary/60">
//                   <div className="p-6">
//                     <p className="text-sm font-extrabold text-secondary">
//                       Featured Picks
//                     </p>
//                     <p className="text-xs text-secondary/70 mt-1">
//                       Customer favorites this week
//                     </p>

//                     <div className="mt-5 grid grid-cols-1 gap-3">
//                       {[
//                         { name: "LED Headlight Kit", note: "Bright • Durable • Clean look" },
//                         { name: "Phone Mount Pro", note: "Anti-shake • Metal build" },
//                         { name: "Rider Gloves", note: "Grip • Comfort • Safety" },
//                       ].map((p, idx) => (
//                         <div
//                           key={idx}
//                           className="flex items-center justify-between gap-3 bg-white/60 border border-secondary/10 rounded-2xl p-4"
//                         >
//                           <div>
//                             <p className="font-extrabold text-secondary">{p.name}</p>
//                             <p className="text-xs text-secondary/70 mt-1">{p.note}</p>
//                           </div>
//                           <span className="text-xs font-extrabold text-accent bg-accent/10 border border-accent/20 px-3 py-1.5 rounded-full">
//                             HOT
//                           </span>
//                         </div>
//                       ))}
//                     </div>

//                     <Link
//                       to="/products"
//                       className="mt-5 h-12 w-full rounded-2xl bg-secondary text-white font-extrabold
//                                  flex items-center justify-center hover:opacity-95 transition"
//                     >
//                       View All Products
//                     </Link>
//                   </div>
//                 </div>
//               </div>

//               <p className="text-xs text-secondary/60 mt-3 text-center">
//                 Smooth shopping • Mobile-friendly • Quick checkout
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* ✅ CSS for animated blobs */}
//         <style>{`
//           .blob{
//             position:absolute;
//             width:420px;
//             height:420px;
//             border-radius:999px;
//             filter: blur(40px);
//             opacity:0.55;
//             animation: floaty 10s ease-in-out infinite;
//             background: rgba(250,129,47,0.35);
//           }
//           .blob-1{ top:-120px; left:-120px; animation-duration: 11s; }
//           .blob-2{ top:120px; right:-140px; animation-duration: 13s; opacity:0.45; }
//           .blob-3{ bottom:-160px; left:35%; animation-duration: 15s; opacity:0.35; }
//           @keyframes floaty {
//             0%,100% { transform: translate(0,0) scale(1); }
//             50% { transform: translate(30px, -20px) scale(1.05); }
//           }
//         `}</style>
//       </section>

//       {/* Features */}
//       <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-12">
//         <div className="flex items-end justify-between gap-4">
//           <div>
//             <h2 className="text-2xl sm:text-3xl font-extrabold text-secondary">
//               Why RIDEX?
//             </h2>
//             <p className="text-secondary/70 mt-2 text-sm">
//               Designed for riders who want premium style + safety.
//             </p>
//           </div>
//           <Link to="/products" className="text-accent font-extrabold hidden sm:block">
//             Browse → 
//           </Link>
//         </div>

//         <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//           <FeatureCard
//             icon="⚡"
//             title="Fast Delivery"
//             desc="Quick dispatch with careful packaging so your gear arrives safe."
//           />
//           <FeatureCard
//             icon="🛡️"
//             title="Quality & Safety"
//             desc="Accessories chosen for durability, comfort, and rider safety."
//           />
//           <FeatureCard
//             icon="💳"
//             title="Easy Checkout"
//             desc="Simple cart flow with clear pricing and smooth ordering."
//           />
//         </div>
//       </section>

//       {/* Categories */}
//       <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 pb-12">
//         <div className="bg-accent/10 border border-secondary/10 rounded-3xl p-6 sm:p-8">
//           <h2 className="text-2xl sm:text-3xl font-extrabold text-secondary">
//             Shop by category
//           </h2>
//           <p className="text-secondary/70 mt-2 text-sm">
//             Find what you need faster with clean categories.
//           </p>

//           <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//             <CategoryCard title="Lighting" desc="LED kits, indicators, and visibility upgrades." />
//             <CategoryCard title="Safety Gear" desc="Gloves, helmets, guards, and essentials." />
//             <CategoryCard title="Phone & Mounts" desc="Premium mounts, holders, and chargers." />
//           </div>

//           <div className="mt-6">
//             <Link
//               to="/products"
//               className="inline-flex items-center justify-center h-12 px-6 rounded-2xl bg-accent text-white font-extrabold
//                          hover:opacity-95 transition"
//             >
//               Explore Products
//             </Link>
//           </div>
//         </div>
//       </section>

//       {/* Testimonials */}
//       <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 pb-14">
//         <h2 className="text-2xl sm:text-3xl font-extrabold text-secondary">
//           What customers say
//         </h2>
//         <p className="text-secondary/70 mt-2 text-sm">
//           Simple, clean, and trusted by riders.
//         </p>

//         <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
//           <Testimonial
//             name="Kavindu"
//             text="The phone mount is solid. No shaking, and it looks premium on my bike."
//           />
//           <Testimonial
//             name="Shenal"
//             text="Fast delivery and the quality is really good. Packaging also perfect."
//           />
//           <Testimonial
//             name="Nimesh"
//             text="Clean UI, easy checkout. The LED kit is super bright!"
//           />
//         </div>
//       </section>

//       {/* Final CTA */}
//       <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 pb-16">
//         <div className="bg-secondary text-white rounded-3xl p-8 sm:p-10 overflow-hidden relative">
//           <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/10 rounded-full blur-2xl" />
//           <div className="relative">
//             <h2 className="text-2xl sm:text-3xl font-extrabold">
//               Ready to upgrade your ride?
//             </h2>
//             <p className="mt-2 text-white/80 text-sm sm:text-base max-w-2xl">
//               Browse RIDEX accessories and enjoy a smooth, modern shopping experience.
//             </p>
//             <div className="mt-6 flex flex-col sm:flex-row gap-3">
//               <Link
//                 to="/products"
//                 className="h-12 px-6 rounded-2xl bg-accent text-white font-extrabold
//                            flex items-center justify-center hover:opacity-95 transition"
//               >
//                 Shop Now
//               </Link>
//               <Link
//                 to="/about"
//                 className="h-12 px-6 rounded-2xl bg-white/10 border border-white/20 text-white font-extrabold
//                            flex items-center justify-center hover:bg-white/15 transition"
//               >
//                 Learn More
//               </Link>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="w-full border-t border-secondary/10 py-8">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 flex flex-col sm:flex-row items-center justify-between gap-3">
//           <p className="text-sm text-secondary/70">
//             © {new Date().getFullYear()} RIDEX ACCESSORIES. All rights reserved.
//           </p>
//           <div className="flex gap-4 text-sm font-bold">
//             <Link className="text-secondary/70 hover:text-accent transition" to="/products">
//               Products
//             </Link>
//             <Link className="text-secondary/70 hover:text-accent transition" to="/contact">
//               Contact
//             </Link>
//             <Link className="text-secondary/70 hover:text-accent transition" to="/about">
//               About
//             </Link>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// }