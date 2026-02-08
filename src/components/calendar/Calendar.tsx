import { useState, useRef, useEffect } from 'react'
import './Calendar.css'

interface CalendarProps {
    value: string // YYYY-MM-DD
    onChange: (value: string) => void
    label?: string
    placeholder?: string
    required?: boolean
    readOnly?: boolean
}

const Calendar = ({
    value,
    onChange,
    label,
    placeholder = "Select Date",
    required = false,
    readOnly = false
}: CalendarProps) => {
    const [isOpen, setIsOpen] = useState(false)
    const [viewDate, setViewDate] = useState(value ? new Date(value) : new Date())
    const [viewMode, setViewMode] = useState<'days' | 'months' | 'years'>('days')
    const dropdownRef = useRef<HTMLDivElement>(null)

    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ]

    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

    // Generate years range (e.g., from 1950 to currentYear + 10)
    const currentYear = new Date().getFullYear()
    const years = Array.from({ length: 100 }, (_, i) => currentYear - 80 + i)

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false)
                setViewMode('days')
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    const getDaysInMonth = (year: number, month: number) => {
        return new Date(year, month + 1, 0).getDate()
    }

    const getFirstDayOfMonth = (year: number, month: number) => {
        return new Date(year, month, 1).getDay()
    }


    const handleDateSelect = (day: number) => {
        const selectedDate = new Date(viewDate.getFullYear(), viewDate.getMonth(), day)
        const year = selectedDate.getFullYear()
        const month = String(selectedDate.getMonth() + 1).padStart(2, '0')
        const date = String(selectedDate.getDate()).padStart(2, '0')
        onChange(`${year}-${month}-${date}`)
        setIsOpen(false)
    }

    const handleMonthSelect = (monthIndex: number) => {
        setViewDate(new Date(viewDate.getFullYear(), monthIndex, 1))
        setViewMode('days')
    }

    const handleYearSelect = (year: number) => {
        setViewDate(new Date(year, viewDate.getMonth(), 1))
        setViewMode('days')
    }

    const renderDays = () => {
        const days = []
        const daysInMonth = getDaysInMonth(viewDate.getFullYear(), viewDate.getMonth())
        const firstDay = getFirstDayOfMonth(viewDate.getFullYear(), viewDate.getMonth())

        for (let i = 0; i < firstDay; i++) {
            days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>)
        }

        for (let i = 1; i <= daysInMonth; i++) {
            const dateStr = `${viewDate.getFullYear()}-${String(viewDate.getMonth() + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`
            const isActive = value === dateStr
            days.push(
                <div
                    key={i}
                    className={`calendar-day ${isActive ? 'active' : ''}`}
                    onClick={() => handleDateSelect(i)}
                >
                    {i}
                </div>
            )
        }
        return days
    }

    const formatDisplayDate = (val: string) => {
        if (!val) return ""
        const d = new Date(val)
        if (isNaN(d.getTime())) return ""
        return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
    }

    if (readOnly) {
        return (
            <div className="calendar-container read-only">
                {label && <label>{label}</label>}
                <input type="text" value={formatDisplayDate(value)} readOnly className="read-only-input" />
            </div>
        )
    }

    return (
        <div className="calendar-container" ref={dropdownRef}>
            {label && <label>{label}</label>}
            <div className={`dropdown-container ${isOpen ? 'is-open' : ''}`}>
                <div className="dropdown-trigger-wrapper" onClick={() => setIsOpen(!isOpen)}>
                    <input
                        type="text"
                        className="dropdown-trigger-input"
                        value={formatDisplayDate(value)}
                        placeholder={placeholder}
                        readOnly
                    />
                    <svg className={`calendar-icon ${isOpen ? 'active' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                        <line x1="16" y1="2" x2="16" y2="6"></line>
                        <line x1="8" y1="2" x2="8" y2="6"></line>
                        <line x1="3" y1="10" x2="21" y2="10"></line>
                    </svg>
                </div>

                {isOpen && (
                    <div className="calendar-menu">
                        <div className="calendar-header">
                            <div className="header-selection">
                                <span
                                    className={`select-trigger ${viewMode === 'months' ? 'active' : ''}`}
                                    onClick={(e) => { e.stopPropagation(); setViewMode(viewMode === 'months' ? 'days' : 'months'); }}
                                >
                                    {months[viewDate.getMonth()]}
                                </span>
                                <span
                                    className={`select-trigger ${viewMode === 'years' ? 'active' : ''}`}
                                    onClick={(e) => { e.stopPropagation(); setViewMode(viewMode === 'years' ? 'days' : 'years'); }}
                                >
                                    {viewDate.getFullYear()}
                                </span>
                            </div>
                        </div>

                        {viewMode === 'days' && (
                            <>
                                <div className="calendar-weekdays">
                                    {daysOfWeek.map(day => <div key={day}>{day}</div>)}
                                </div>
                                <div className="calendar-days">
                                    {renderDays()}
                                </div>
                            </>
                        )}

                        {viewMode === 'months' && (
                            <div className="picker-grid months-grid">
                                {months.map((month, index) => (
                                    <div
                                        key={month}
                                        className={`picker-item ${viewDate.getMonth() === index ? 'active' : ''}`}
                                        onClick={() => handleMonthSelect(index)}
                                    >
                                        {month.slice(0, 3)}
                                    </div>
                                ))}
                            </div>
                        )}

                        {viewMode === 'years' && (
                            <div className="picker-grid years-grid">
                                {years.map((year) => (
                                    <div
                                        key={year}
                                        className={`picker-item ${viewDate.getFullYear() === year ? 'active' : ''}`}
                                        onClick={() => handleYearSelect(year)}
                                    >
                                        {year}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>
            {required && <input type="hidden" value={value} required />}
        </div>
    )
}

export default Calendar
