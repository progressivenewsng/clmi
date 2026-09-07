import PageHero from "@/components/PageHero";
import Accordion, { type AccordionSection } from "@/components/Accordion";

const sections: AccordionSection[] = [
  {
    id: "who-are-we",
    title: "Who Are We",
    content: (
      <div className="space-y-4">
        <p>
          Covenant Leadership Ministry International (CLMI), also known as Believers in Politics (BiP), is a
          non-denominational platform aimed at reconciling leaders in both the private and public sector, and
          politicians, to God through a deeper understanding of their calling and God&rsquo;s agenda — and the
          application of the word of God to practical leadership realities.
        </p>
        <p>
          CLMI exists to service all churches of Christ, not to plant a church. It encourages members to grow
          and be more dedicated to the service of God in their own churches. New converts to Christ through
          any CLMI outreach or activity are encouraged to join an existing church of Christ.
        </p>
        <p>
          CLMI has no political ambition. Its role is to support existing churches and complement their
          efforts to win souls for Christ and establish those souls within their churches — joining, not
          competing, in the fulfilment of God&rsquo;s end-time agenda.
        </p>
        <p>
          CLMI does not collect tithes; members pay tithes to their own churches. Offerings and partnership
          donations to CLMI are entirely voluntary and in excess of a member&rsquo;s regular giving.
        </p>
        <p>
          CLMI holds monthly fellowship across major towns and cities in every nation it is present, every
          third Sunday of the month, 5–7pm. It also holds a biannual public lecture (second and last quarter
          of the year), a National Leadership Convention (third quarter), and a biennial International
          Leadership Convention.
        </p>
      </div>
    ),
  },
  {
    id: "vision-mission",
    title: "Vision & Mission",
    content: (
      <div className="space-y-4">
        <p>
          <span className="font-semibold text-ink">Vision —</span> A generation of leaders and politicians,
          across every sector and every nation, governing from a full understanding of their calling as an
          assignment from God.
        </p>
        <p>
          <span className="font-semibold text-ink">Mission —</span> To reconcile leaders and politicians to
          God by teaching, fellowship and practical application of scripture to leadership realities — raising
          saints to be kings.
        </p>
      </div>
    ),
  },
  {
    id: "mandate",
    title: "Our Mandate",
    content: (
      <p>
        CLMI is committed to raising saints to be kings — equipping believers already in, or called to,
        positions of leadership and political office to occupy those spaces as an extension of their walk
        with God, complementing (never competing with) the local church.
      </p>
    ),
  },
  {
    id: "strategy",
    title: "Our Strategy",
    content: (
      <ul className="space-y-3">
        {[
          ["LOVE and FAITH", "is our banner (weapon)."],
          ["The WORD OF GOD", "is our driving force."],
          ["SCRIPTURAL CORRECTNESS", "is our goal."],
          ["RIGHTEOUS LEADERSHIP", "is our call."],
          ["KINGDOM PRINCIPLES", "is our guide."],
          ["GOD'S DIVINE AGENDA", "is our commission."],
        ].map(([a, b]) => (
          <li key={a} className="flex gap-2">
            <span className="font-display font-semibold text-indigo">{a}</span>
            <span>{b}</span>
          </li>
        ))}
      </ul>
    ),
  },
  {
    id: "aims-objectives",
    title: "Aims & Objectives",
    content: (
      <ul className="list-disc space-y-3 pl-5 marker:text-gold">
        <li>Provide a basis for Christian fellowship among all leaders and politicians everywhere, through a platform not attached to any single church but drawing from all churches of Christ — servicing existing churches rather than starting one.</li>
        <li>Embark on evangelical outreaches and programmes worldwide to win souls for Christ, particularly those in positions of power and authority, preparing them for the second coming of our Lord Jesus Christ.</li>
        <li>Organise meetings, prayer sessions and fellowship for the promotion of the Kingdom of God on earth.</li>
        <li>Reconcile all men with God and promote the sustenance of fellowship between them.</li>
        <li>Organise teachings, trainings, seminars, public lectures and conventions to facilitate the understanding and application of the word of God to life realities and societal issues.</li>
        <li>Publish Christian literature — books, tracts, magazines, periodicals, journals and more — in line with our aims and objectives.</li>
        <li>Provide opportunity for leaders and politicians to fellowship and discuss practical realities in their call, identifying how to apply scriptural principles and solutions to them.</li>
        <li>Bring to clear perspective the limitless applicability of the word of God to practical politics, demonstrating God&rsquo;s plan and agenda for the politics of men and nations.</li>
        <li>Broadcast and advertise CLMI programmes and beliefs through all media.</li>
        <li>Promote mutual understanding, love and unity among men.</li>
        <li>Promote and propagate the participation of more Christians — old and young — in politics.</li>
        <li>Promote help, charity and support towards all people across nations.</li>
        <li>Intercede for Nigeria.</li>
        <li>Undertake all other lawful things that promote the Kingdom of God and the ministry&rsquo;s objectives.</li>
      </ul>
    ),
  },
  {
    id: "doctrinal-statement",
    title: "Our Doctrinal Statement",
    content: (
      <p>
        We do not hold to doctrines as a testament or a creed, for the whole Bible and scripture therein is
        our creed. Whereas we recognise the existence of many different interpretations among churches,
        denominations and Christians, CLMI affirms the basic beliefs that unite our members — and all genuine
        Christian believers — making it possible for the work of God to be effectively carried out. This also
        facilitates the admission of unbelievers and new converts into the fellowship, and ultimately into any
        church of God. Even so, we state our beliefs for the avoidance of doubt, as a basic threshold and
        requirement for eligibility into CLMI.
      </p>
    ),
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About CLMI"
        title="A Covenant Platform, Not a Church"
        description="Understand who we are, what we stand for, and the mandate that drives everything CLMI does."
      />
      <section className="relative overflow-hidden bg-parchment py-16">
        <div className="absolute left-10 top-20 hidden w-64 border-l-2 border-gold/50 pl-4 text-[13px] font-display italic leading-relaxed text-ink/45 lg:block">
          "Call upon me in the day of trouble: I will deliver thee, and thou shalt glorify me." Psalm 50:15
        </div>
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <Accordion sections={sections} />
        </div>
      </section>
    </>
  );
}
