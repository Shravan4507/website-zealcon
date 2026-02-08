import './events.css'

const dayPasses = [
    {
        id: 1,
        title: 'DAY 1',
        image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&q=80',
        price: '₹0',
        features: [
            'Access to all Technical Events',
            'Morning Refreshments',
            'Entry to Coding Hackathon',
            'Networking Lunch',
            'Evening Cultural Showcase'
        ]
    },
    {
        id: 2,
        title: 'DAY 2',
        image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80',
        price: '₹0',
        features: [
            'Robotics Workshop Access',
            'Industrial Expert Talk',
            'Gaming Tournament Entry',
            'Delegate Kit & Goodies',
            'Celebrity Night Pass'
        ]
    },
    {
        id: 3,
        title: 'DAY 3',
        image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=600&q=80',
        price: '₹10',
        features: [
            'Grand Finale Competitions',
            'Award Ceremony Entry',
            'Gala Dinner & Social',
            'Participation Certificate',
            'Access to Career Fair'
        ]
    }
]

function Events() {
    return (
        <section className="events" id="events">
            <div className="events__content">
                <h2 className="events__title">Events</h2>

                <div className="events__grid">
                    {dayPasses.map((day) => (
                        <div key={day.id} className="event-card">
                            <div className="event-card__image-container">
                                <img src={day.image} alt={day.title} className="event-card__image" />
                            </div>
                            <h3 className="event-card__title">{day.title}</h3>
                            <ul className="event-card__features">
                                {day.features.map((feature, idx) => (
                                    <li key={idx}>{feature}</li>
                                ))}
                            </ul>
                            <div className="event-card__price">{day.price}</div>
                            <div className="event-card__actions">
                                <button className="event-card__btn event-card__btn--explore">
                                    Explore
                                </button>
                                <button className="event-card__btn event-card__btn--select">
                                    Select
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Events
