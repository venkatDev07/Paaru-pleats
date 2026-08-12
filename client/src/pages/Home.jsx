import Hero from '../components/home/Hero'
import WhyChooseUs from '../components/home/WhyChooseUs'
import WorkHighlights from '../components/home/WorkHighlights'
import ContactCTA from '../components/home/ContactCTA'

function Home() {
    return (
        <div className="pt-16">
            <Hero />
            <WhyChooseUs />
            <WorkHighlights />
            <ContactCTA />
        </div>
    )
}

export default Home