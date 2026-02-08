import ChromaGrid from '../../components/chroma-grid/ChromaGrid'
import './team.css'

const ALL_MEMBERS = [
    // Core Leadership
    {
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&h=300&auto=format&fit=crop',
        title: 'Aryan Sharma',
        subtitle: 'Festival Convener',
        location: 'Core Leadership',
        handle: '@aryan_sharma',
        borderColor: '#5227FF',
        gradient: 'linear-gradient(145deg, #5227FF, #000)',
        url: '#'
    },
    {
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=300&h=300&auto=format&fit=crop',
        title: 'Sanya Malhotra',
        subtitle: 'Technical Head',
        location: 'Core Leadership',
        handle: '@sanya_tech',
        borderColor: '#d9ff00',
        gradient: 'linear-gradient(180deg, #d9ff00, #000)',
        url: '#'
    },
    {
        image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=300&h=300&auto=format&fit=crop',
        title: 'Rohan Verma',
        subtitle: 'Management Lead',
        location: 'Core Leadership',
        handle: '@rohan_verma',
        borderColor: '#5227FF',
        gradient: 'linear-gradient(145deg, #5227FF, #000)',
        url: '#'
    },
    // Technical & Design
    {
        image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=300&h=300&auto=format&fit=crop',
        title: 'Ishaan Gupta',
        subtitle: 'Full Stack Developer',
        location: 'Technical & Design',
        handle: '@ishaan_dev',
        borderColor: '#d9ff00',
        gradient: 'linear-gradient(210deg, #d9ff00, #000)',
        url: '#'
    },
    {
        image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&h=300&auto=format&fit=crop',
        title: 'Ananya Deshpande',
        subtitle: 'Chief Designer',
        location: 'Technical & Design',
        handle: '@ananya_design',
        borderColor: '#5227FF',
        gradient: 'linear-gradient(165deg, #5227FF, #000)',
        url: '#'
    },
    {
        image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=300&h=300&auto=format&fit=crop',
        title: 'Vikram Singh',
        subtitle: 'UI/UX Lead',
        location: 'Technical & Design',
        handle: '@vikram_ux',
        borderColor: '#d9ff00',
        gradient: 'linear-gradient(195deg, #d9ff00, #000)',
        url: '#'
    },
    // Marketing & PR
    {
        image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=300&h=300&auto=format&fit=crop',
        title: 'Kritika Roy',
        subtitle: 'PR Coordinator',
        location: 'Marketing & PR',
        handle: '@kritika_pr',
        borderColor: '#5227FF',
        gradient: 'linear-gradient(225deg, #5227FF, #000)',
        url: '#'
    },
    {
        image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=300&h=300&auto=format&fit=crop',
        title: 'Sahil Kapoor',
        subtitle: 'Marketing Head',
        location: 'Marketing & PR',
        handle: '@sahil_mkt',
        borderColor: '#d9ff00',
        gradient: 'linear-gradient(135deg, #d9ff00, #000)',
        url: '#'
    }
]

function Team() {
    return (
        <main className="team-page">
            <header className="team-header">
                <h1>The Visionaries</h1>
                <p>Meet the dedicated team working behind the scenes to make Zealcon '26 the biggest technology festival of the year. Passion, innovation, and coordination is what defines us.</p>
            </header>

            <div className="team-container" style={{ position: 'relative', minHeight: '800px' }}>
                <ChromaGrid
                    items={ALL_MEMBERS}
                    radius={400}
                    damping={0.5}
                    fadeOut={0.8}
                    columns={3}
                />
            </div>
        </main>
    )
}

export default Team
