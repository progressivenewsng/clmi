import PageHero from "@/components/PageHero";
import Accordion, { type AccordionSection } from "@/components/Accordion";

const sections: AccordionSection[] = [
  {
    id: "who-are-we",
    title: "Who Are We",
    content: (
      <div className="space-y-4">
        <p>
          Covenant Leadership Ministry International (CLMI) also known as Believers in Politics (BiP)is a non-denominational platform aimed at reconciling leaders in both private and public sector to God through a deeper understanding of their calling and Gods agenda and application of the word of god to practical leadership realities. 
        </p>
        <p>
          CLMI is to service all churches of Christ and not to plant a church. It will encourage its members to grow and be more dedicated to the service of God in their churches. New converts to Christ through any of CLMI outreaches and activities would be encouraged to attend any of the existing churches of Christ. CLMI does not have any political ambition but to support existing churches, complement the efforts of these churches to win souls for Christ and to establish such souls in their churches. CLMI is not in any competition with the church of Christ either locally, denominationally or internationally but rather to join in the fulfilment of the end-time agenda of God. CLMI is committed to raising saints to be kings. 
        </p>
        <p>
          CLMI is not to collect tithes as all members are to pay their tithes to their churches. Whatever offering or partnership donations made to CLMI is voluntary and in excess of their regular offering and tithe to their church. CLMI holds monthly fellowship across all the major towns and cities across all nations of the world. This fellowship meetings hold every third Sundays of the month 5 – 7 pm. Also, CLMI holds biannual public lecture every second and last quarer of the year, one national leadership convention holds third quarter of the year and biennal International Leadership convention.
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
          <span className="font-semibold text-ink">Vision Statement—</span> To raise a generation of spiritually grounded, purpose-driven, and transformational leaders in the public and private sectors who understand their divine calling, embody the principles of God's Kingdom, and influence society through godly leadership, integrity, excellence, and service—raising saints to be kings and advancing God's end-time agenda.
        </p>
        <p>
          <span className="font-semibold text-ink">Mission Statement—</span> Covenant Leadership Ministry International (CLMI), also known as Believers in Politics (BiP), exists to reconcile leaders in politics, government, business, and other spheres of influence to God through the teaching and practical application of His Word to leadership and governance.
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
        <li>Reconnecting Leaders to God: Helping leaders discover their divine calling, understand God's agenda, and fulfil their leadership responsibilities according to biblical principles.</li>
        <li>Promoting Godly Leadership: Equipping leaders with the spiritual, moral, and practical values necessary to lead with integrity, wisdom, accountability, excellence, and a spirit of service.</li>
        <li>Supporting the Church of Christ: Complementing the work of existing churches in evangelism, discipleship, and soul-winning, while encouraging members to remain active and committed to their respective local churches.</li>
        <li>Raising Kingdom Ambassadors: Developing spiritually mature believers who will represent Christ effectively and influence politics, governance, business, and society for the advancement of God's Kingdom.</li>
        <li>Fostering Leadership Development: Providing platforms for fellowship, public lectures, leadership conventions, and capacity development that connect biblical truth with contemporary leadership challenges.</li>
        <li>Advancing God's End-Time Agenda: Partnering with the wider Body of Christ, without denominational competition or partisan political ambition, to establish believers in the faith and promote God's purposes in every sphere of human endeavour.</li>
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
