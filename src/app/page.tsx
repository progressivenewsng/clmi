import Image from "next/image";
import Link from "next/link";
import Carousel from "@/components/Carousel";
import VerseCarousel from "@/components/VerseCarousel";
import WordForYouHomeCarousel from "@/components/WordForYouHomeCarousel";
import { leadershipData, ministries } from "@/data/mock";
import { getPublishedPublications } from "@/lib/content/publications";
import { getPublishedReviews } from "@/lib/content/public";

export default async function Home() {
  const [publications, leadershipNuggets, wordForYou, reviews] = await Promise.all([
    getPublishedPublications("ktc"),
    getPublishedPublications("leadership_nuggets"),
    getPublishedPublications("word_for_you"),
    getPublishedReviews(),
  ]);
  const reversedPublications = [...publications].reverse();
  const latestWordForYou = wordForYou.slice(0, 7).map(({ slug, title, verseText, verseReference }) => ({
    slug,
    title,
    verseText: verseText || "",
    verseReference: verseReference || "",
  }));
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
        <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-5 pb-14 pt-8 sm:gap-12 sm:px-6 sm:pb-16 sm:pt-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start lg:gap-14 lg:px-8 lg:pb-28 lg:pt-12">
          <div className="min-w-0">
            <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.3em] text-gold-light sm:text-[12px]">
              <span className="h-px w-8 bg-gold" /> Covenant Leadership Ministry International
            </p>
            <h1 className="mt-5 font-display text-[2rem] font-semibold leading-[1.1] text-parchment sm:text-[2.6rem] md:text-5xl lg:text-6xl">
              Raising Kingdom
              <br /> <span className="italic text-gold-light">leaders.</span>
            </h1>
            <p className="mt-5 max-w-lg text-[15px] leading-relaxed text-parchment/70 sm:mt-6 sm:text-[16px]">
              Covenant Leadership Ministry International (CLMI) also known as Believers in Politics (BiP)is a non-denominational platform aimed at reconciling leaders in both private and public sector to God through a deeper understanding of their calling and Gods agenda and application of the word of god to practical leadership realities.
            </p>
            <div className="mt-8 flex flex-wrap gap-3 sm:mt-9 sm:gap-4">
              <Link
                href="/join"
                className="bg-gold px-6 py-3 text-[12px] font-semibold uppercase tracking-widest text-ink transition-colors hover:bg-gold-light sm:px-7 sm:py-3.5 sm:text-[13px]"
              >
                Join CLMI
              </Link>
              <Link
                href="/about"
                className="border border-parchment/30 px-6 py-3 text-[12px] font-semibold uppercase tracking-widest text-parchment transition-colors hover:border-gold hover:text-gold-light sm:px-7 sm:py-3.5 sm:text-[13px]"
              >
                Discover Who We Are
              </Link>
            </div>

          </div>

          <div className="relative mx-auto min-w-0 w-full max-w-xl lg:max-w-[34rem]">
            <div className="absolute -inset-3 rounded-[2rem] border border-gold/30 bg-gold/5 blur-3xl sm:-inset-5" />
            <VerseCarousel />
          </div>
        </div>
      </section>

      {/* THE WORD FOR YOU */}
      <section className="overflow-hidden bg-ink text-parchment">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 sm:gap-12 sm:py-20 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:gap-20 lg:px-8 lg:py-24">
          <div className="relative">
           <h2 className="mt-5 max-w-lg font-display text-4xl font-semibold leading-tight text-parchment sm:text-5xl lg:text-6xl">
              The Word <span className="block italic text-gold-light">for You</span>
            </h2>
            <div className="mt-7 h-px w-20 bg-gold" />
            <Link href="/publications/the-word-for-you" className="mt-7 inline-flex items-center gap-3 text-[12px] font-semibold uppercase tracking-widest text-parchment/75 transition-colors hover:text-gold-light">
              Explore all editions <span aria-hidden>→</span>
            </Link>
          </div>
          <WordForYouHomeCarousel publications={latestWordForYou} />
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
                className="object-cover grayscale scale-75"
              />
            </div>
            <div className="mt-4 border-l-2 border-gold pl-4">
              <div className="font-display text-lg font-semibold text-ink">{leadershipData.president.name}</div>
              <div className="text-[12px] uppercase tracking-widest text-indigo">{leadershipData.president.title}</div>
            </div>
          </div>
          <div>
            <h1 className="text-[40px] font-semibold uppercase tracking-[0.3em] text-indigo">A Word From Our President</h1>
            <div className="mt-3 space-y-5 text-[20px] leading-relaxed text-charcoal/80">
              <p>
                Welcome to Covenant Leadership Ministry International (CLMI), also known as Believers in Politics (BiP), a divine platform committed to reconciling leaders in the public and private sectors, including politicians, to God through a deeper understanding of their calling, His divine agenda, and the practical application of His Word to leadership and governance.
              </p>
              <p>
                At CLMI, we believe that leadership is more than a position of authority; it is a divine responsibility and an opportunity to fulfil God's purpose on earth. Our vision is to see men and women in positions of influence become instruments of righteousness, integrity, excellence, justice, and transformation in their spheres of leadership. We are committed to raising spiritually grounded leaders who will allow biblical principles to shape their decisions, relationships, policies, and service to humanity.
              </p>
              <p>
                We recognise the Church of Jesus Christ as God's established institution for spiritual growth, discipleship, and the nurturing of believers. Therefore, CLMI is not a church, does not seek to establish one, and has no denominational or political ambition. Rather, we exist to complement the work of existing churches, support their soul-winning efforts, and encourage our members to remain committed and active in their respective congregations. Every soul won through our outreaches is encouraged to become established in a Bible-believing church, where they can continue to grow in faith and fulfil their Christian calling.
              </p>
              <p>
                Our mission is anchored in the conviction that the principles of God's Kingdom must find practical expression in leadership, public service, business, politics, and every sphere of human endeavour. We seek to equip leaders to understand that their positions are opportunities to serve God and humanity, promote the common good, and advance values that strengthen individuals, institutions, and nations.
                Through our monthly fellowships, public lectures, national leadership convention, and international leadership convention, we provide opportunities for spiritual edification, leadership development, fellowship, and the exchange of ideas on applying God's Word to contemporary leadership challenges. We welcome men and women who desire to align their leadership journeys with God's purposes and make a lasting, positive impact on their generation.
              </p>
              <p>
                As we pursue this vision, we encourage every member to remain faithful to their local church, honour God with their resources, and embrace a life of service, accountability, and spiritual maturity. CLMI does not collect tithes; members are encouraged to pay their tithes to their respective churches. Any voluntary offering or partnership support to CLMI is additional to their regular church giving.
                My prayer is that, through this ministry, God will raise a generation of leaders who are spiritually mature, intellectually equipped, morally upright, and courageous enough to represent His Kingdom wherever they are called to serve.
                Together, let us pursue God's agenda for leadership, contribute to the transformation of our society, and fulfil our responsibility as ambassadors of Christ.
                Welcome to CLMI—where faith meets leadership, purpose inspires service, and saints are raised to be kings.
              </p>
              
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
              {reversedPublications.map((p) => (
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

      {/* LEADERSHIP NUGGETS */}
      <section className="relative overflow-hidden bg-parchment-dim py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex items-end justify-between gap-6">
            <div>
              <p className="text-[12px] font-semibold uppercase tracking-[0.3em] text-indigo">Publications</p>
              <h2 className="mt-3 font-display text-3xl font-semibold text-ink sm:text-4xl">Leadership Nuggets</h2>
            </div>
            <Link href="/publications/leadership-nuggets" className="hidden text-[13px] font-semibold uppercase tracking-widest text-indigo hover:text-gold sm:block">
              View All →
            </Link>
          </div>
          <div className="mt-10">
            {leadershipNuggets.length ? <Carousel>
              {leadershipNuggets.map((publication) => (
                <Link key={publication.slug} href={`/publications/${publication.slug}`} className="group w-[300px] shrink-0 snap-start sm:w-[360px]">
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-indigo">
                    <Image src={publication.image} alt={publication.title} fill unoptimized={publication.image.includes("supabase.co")} className="object-cover transition-transform duration-500 group-hover:scale-105" />
                  </div>
                  <div className="mt-4">
                    <div className="text-[11px] uppercase tracking-widest text-indigo/70">{publication.date} · {publication.author}</div>
                    <h3 className="mt-2 font-display text-lg font-semibold text-ink group-hover:text-indigo">{publication.title}</h3>
                  </div>
                </Link>
              ))}
            </Carousel> : <p className="border-y border-line py-10 text-[14px] text-charcoal/60">New Leadership Nuggets editions will appear here.</p>}
          </div>
          <Link href="/publications/leadership-nuggets" className="mt-6 inline-block text-[12px] font-semibold uppercase tracking-widest text-indigo hover:text-gold sm:hidden">View all Leadership Nuggets →</Link>
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
