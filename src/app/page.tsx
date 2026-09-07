import Image from "next/image";
import Link from "next/link";
import Carousel from "@/components/Carousel";
import VerseCarousel from "@/components/VerseCarousel";
import { leadershipData, ministries } from "@/data/mock";
import { getPublishedPublications } from "@/lib/content/publications";
import { getPublishedReviews } from "@/lib/content/public";

export default async function Home() {
  const [publications, reviews] = await Promise.all([getPublishedPublications(), getPublishedReviews()]);
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-ink">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 15% 25%, var(--gold) 0, transparent 40%), radial-gradient(circle at 85% 75%, var(--gold) 0, transparent 35%)",
          }}
        />
        <div className="relative mx-auto grid max-w-7xl lg:items-start items-center gap-14 px-6 pb-20 pt-10 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:pb-28 ">
          <div>
            <p className="flex items-center gap-3 text-[12px] font-semibold uppercase tracking-[0.3em] text-gold-light">
              <span className="h-px w-8 bg-gold" /> Covenant Leadership Ministry International
            </p>
            <h1 className="mt-6 font-display text-[2.6rem] font-semibold leading-[1.08] text-parchment sm:text-6xl">
              Raising Kingdom
              <br /> <span className="italic text-gold-light">leaders.</span>
            </h1>
            <p className="mt-6 max-w-lg text-[16px] leading-relaxed text-parchment/70">
              CLMI reconciles leaders and politicians in both
              private and public office to God, through a deeper understanding of their calling and
              the application of His word to practical leadership realities.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <Link
                href="/join"
                className="bg-gold px-7 py-3.5 text-[13px] font-semibold uppercase tracking-widest text-ink transition-colors hover:bg-gold-light"
              >
                Join CLMI
              </Link>
              <Link
                href="/about"
                className="border border-parchment/30 px-7 py-3.5 text-[13px] font-semibold uppercase tracking-widest text-parchment transition-colors hover:border-gold hover:text-gold-light"
              >
                Discover Who We Are
              </Link>
            </div>
            <div className="mt-14 grid grid-cols-3 gap-6 border-t border-white/10 pt-8">
              {[
                ["Seminars", "Leadership Develoment"],
                ["BIP", "Believers in Politics Confrences"],
                ["Outreach", "Targeted Community Engagement and community-focused projects"],
              ].map(([n, l]) => (
                <div key={n}>
                  <div className="font-display text-xl font-semibold text-gold-light">{n}</div>
                  <div className="mt-1 text-[12px] leading-snug text-parchment/55">{l}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[34rem]">
            <div className="absolute -inset-6 rounded-[2rem] border border-gold/30 bg-gold/5 blur-3xl" />
            <VerseCarousel />
          </div>
        </div>
      </section>

      {/* WELCOME FROM THE PRESIDENT */}
      <section className="relative overflow-hidden bg-parchment py-24">
        <div className="pointer-events-none absolute inset-x-0 top-5 text-center text-[4.5rem] font-semibold uppercase tracking-[0.18em] text-ink/5 md:text-[6rem]">
          Raising Kingdom Leaders
        </div>
        
        <div className="mx-auto grid max-w-6xl items-start gap-14 px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
          <div className="relative mx-auto w-full max-w-sm lg:mx-0">
            <div className="relative aspect-[3/4] w-full overflow-hidden">
              <Image
                src={leadershipData.president.image}
                alt={leadershipData.president.name}
                fill
                className="object-cover grayscale"
              />
            </div>
            <div className="mt-4 border-l-2 border-gold pl-4">
              <div className="font-display text-lg font-semibold text-ink">{leadershipData.president.name}</div>
              <div className="text-[12px] uppercase tracking-widest text-indigo">{leadershipData.president.title}</div>
            </div>
          </div>
          <div>
            <p className="text-[12px] font-semibold uppercase tracking-[0.3em] text-indigo">A Word From Our President</p>
            <h2 className="mt-4 font-display text-3xl font-semibold text-ink sm:text-4xl">
              &ldquo;Every leader carries an assignment before they carry a title.&rdquo;
            </h2>
            <div className="mt-8 space-y-5 text-[15px] leading-relaxed text-charcoal/80">
              <p>
                Beloved, it is with great joy that I welcome you into the fellowship of Covenant Leadership
                Ministry International. We are not a church, but a covenant platform raised to reconcile
                leaders and politicians — in both the private and public sector — to God&rsquo;s agenda for
                their calling.
              </p>
              <p>
                If you carry influence in a boardroom, a chamber, a ministry office or a community, this
                ministry exists for you. Here you will find teaching, fellowship and a community of leaders
                pursuing scriptural correctness as a way of governance and life.
              </p>
              <p>We look forward to walking this journey with you, as we raise saints to be kings.</p>
            </div>
            <p className="mt-8 font-display text-xl italic text-ink">— {leadershipData.president.name}</p>
            <Link
              href="/leadership"
              className="mt-6 inline-flex items-center gap-2 text-[13px] font-semibold uppercase tracking-widest text-indigo hover:text-gold"
            >
              Meet the Leadership <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* MINISTRIES TEASER */}
      <section className="relative overflow-hidden bg-parchment-dim py-24">
       
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="flex items-end justify-between gap-6">
            <div>
              <p className="text-[12px] font-semibold uppercase tracking-[0.3em] text-indigo">What We Do</p>
              <h2 className="mt-3 font-display text-3xl font-semibold text-ink sm:text-4xl">Our Ministry Arms</h2>
            </div>
            <Link href="/ministries" className="hidden text-[13px] font-semibold uppercase tracking-widest text-indigo hover:text-gold sm:block">
              All Ministries →
            </Link>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {Object.values(ministries).map((m) => (
              <div key={m.name} className="group border border-line bg-white/50 p-8 transition-colors hover:border-gold">
                <span className="seal">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M12 3L14 9L20 9L15 13L17 19L12 15.5L7 19L9 13L4 9L10 9L12 3Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" /></svg>
                </span>
                <h3 className="mt-5 font-display text-xl font-semibold text-ink">{m.name}</h3>
                <p className="mt-3 text-[14px] leading-relaxed text-charcoal/70">{m.tagline}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PUBLICATIONS CAROUSEL */}
      <section className="relative overflow-hidden bg-parchment py-24">
        <div className="pointer-events-none absolute left-8 top-10 hidden text-[5rem] font-semibold uppercase tracking-[0.18em] text-ink/5 lg:block">
          Raising Kingdom Leaders
        </div>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex items-end justify-between gap-6">
            <div>
              <p className="text-[12px] font-semibold uppercase tracking-[0.3em] text-indigo">Kingdom Testament Chronicles</p>
              <h2 className="mt-3 font-display text-3xl font-semibold text-ink sm:text-4xl">Latest Publications</h2>
            </div>
            <Link href="/publications" className="hidden text-[13px] font-semibold uppercase tracking-widest text-indigo hover:text-gold sm:block">
              View All →
            </Link>
          </div>

          <div className="mt-12">
            <Carousel>
              {publications.map((p) => (
                <Link
                  key={p.slug}
                  href={`/publications/${p.slug}`}
                  className="group w-[300px] shrink-0 snap-start sm:w-[360px]"
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-indigo">
                    <Image
                      src={p.image}
                      alt={p.title}
                      fill
                      unoptimized={p.image.includes("supabase.co")}
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="mt-4">
                    <div className="text-[11px] uppercase tracking-widest text-indigo/70">{p.date}</div>
                    <h3 className="mt-2 font-display text-lg font-semibold text-ink group-hover:text-indigo">
                      {p.title}
                    </h3>
                    <p className="mt-2 line-clamp-2 text-[13px] leading-relaxed text-charcoal/65">{p.excerpt}</p>
                  </div>
                </Link>
              ))}
            </Carousel>
          </div>
        </div>
      </section>

      {/* REVIEWS SECTION — outside endorsements */}
      <section className="bg-ink py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center">
            <p className="text-[12px] font-semibold uppercase tracking-[0.3em] text-gold-light">What Others Say</p>
            <h2 className="mt-3 font-display text-3xl font-semibold text-parchment sm:text-4xl">External Reviews</h2>
          </div>
          <div className="mt-12">
            {reviews.length ? <Carousel>
              {reviews.map((r) => (
                <div
                  key={r.id}
                  className="flex w-[300px] shrink-0 snap-start flex-col border border-white/10 bg-white/5 p-7 sm:w-[340px]"
                >
                  <svg width="26" height="20" viewBox="0 0 26 20" fill="none" className="text-gold-light">
                    <path d="M0 20V11.6C0 4.9 3.9 0.8 10 0L11 3.5C7.4 4.5 5.5 6.8 5.3 10H10V20H0ZM15 20V11.6C15 4.9 18.9 0.8 25 0L26 3.5C22.4 4.5 20.5 6.8 20.3 10H25V20H15Z" fill="currentColor" />
                  </svg>
                  <p className="mt-4 flex-1 text-[14px] leading-relaxed text-parchment/75">{r.quote}</p>
                  <div className="mt-6 flex items-center gap-3">
                    <div className="relative h-11 w-11 overflow-hidden rounded-full">
                      <Image src={r.image} alt={r.name} fill unoptimized={r.image.includes("supabase.co")} className="object-cover" />
                    </div>
                    <div>
                      <div className="font-display text-sm font-semibold text-parchment">{r.name}</div>
                      <div className="text-[11px] text-parchment/50">{r.organization}</div>
                    </div>
                  </div>
                </div>
              ))}
            </Carousel> : <div className="border border-white/10 bg-white/5 px-6 py-12 text-center"><p className="font-display text-xl italic text-parchment/70">Reviews from our external partners will appear here.</p><p className="mt-2 text-[12px] uppercase tracking-widest text-parchment/40">No reviews published yet</p></div>}
            <div className="mt-4 text-center">
              <Link href="/testimonies" className="text-[13px] font-semibold uppercase tracking-widest text-gold-light hover:text-parchment">
                See Member Testimonies →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
