import { useState } from 'react'
import SearchableDropdown from '../../components/searchable-dropdown/SearchableDropdown'
import Calendar from '../../components/calendar/Calendar'
import ImageCropper from '../../components/image-cropper/ImageCropper'
import colleges from '../../data/colleges.json'
import { majors } from '../../data/majors'
import './user-signup.css'

function UserSignup() {
    const [isDragging, setIsDragging] = useState(false)
    const [imageToCrop, setImageToCrop] = useState<string | null>(null)

    // Simulating data fetched from Google social login
    const [formData, setFormData] = useState({
        firstName: 'Alex',
        lastName: 'Johnson',
        email: 'alex.johnson@gmail.com',
        phone: '+91 ',
        dob: '',
        sex: '',
        college: '',
        major: '',
        yearOfStudy: '',
        completionYear: '',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex'
    })

    const studyYears = ["1st Year", "2nd Year", "3rd Year", "4th Year", "5th Year", "Passed Out"]
    const currentYear = new Date().getFullYear()
    const completionYears = Array.from({ length: 10 }, (_, i) => (currentYear - 2 + i).toString())

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        if (!value.startsWith('+91 ')) {
            setFormData(prev => ({ ...prev, phone: '+91 ' }));
            return;
        }
        const digits = value.slice(4).replace(/\D/g, '').slice(0, 10);
        setFormData(prev => ({ ...prev, phone: `+91 ${digits}` }));
    };

    const handleDropdownChange = (name: string, value: string) => {
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleImageUpload = (file: File) => {
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader()
            reader.onload = (e) => {
                setImageToCrop(e.target?.result as string)
            }
            reader.readAsDataURL(file)
        }
    }

    const onCropComplete = (croppedImage: string) => {
        setFormData(prev => ({ ...prev, avatar: croppedImage }))
        setImageToCrop(null)
    }

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault()
        setIsDragging(true)
    }

    const handleDragLeave = () => {
        setIsDragging(false)
    }

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault()
        setIsDragging(false)
        const file = e.dataTransfer.files[0]
        handleImageUpload(file)
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // Handle final registration logic
        console.log('Final Profile Data:', formData)
    }

    return (
        <div className="signup-page">
            <div className="signup-container">
                <div className="signup-card">
                    <header className="signup-header">
                        <h1>Complete Your Profile</h1>
                        <p>We've fetched your basic details from Google. Just a few more steps!</p>
                    </header>

                    <form className="signup-form" onSubmit={handleSubmit}>
                        {/* Profile Picture Section */}
                        <div className="profile-upload-section">
                            <label>Profile Picture</label>
                            <div
                                className={`upload-dropzone ${isDragging ? 'dragging' : ''} ${formData.avatar ? 'has-image' : ''}`}
                                onDragOver={handleDragOver}
                                onDragLeave={handleDragLeave}
                                onDrop={handleDrop}
                                onClick={() => document.getElementById('avatar-input')?.click()}
                            >
                                {formData.avatar ? (
                                    <div className="upload-preview">
                                        <img src={formData.avatar} alt="Preview" />
                                    </div>
                                ) : (
                                    <div className="upload-icon">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M12 5v14M5 12h14" />
                                        </svg>
                                    </div>
                                )}
                                <div className="upload-text">
                                    <p><span>{formData.avatar ? 'Change photo' : 'Upload photo'}</span> or drag and drop</p>
                                    <p className="upload-hint">SVG, PNG, JPG (max. 1MB)</p>
                                </div>
                                <input
                                    type="file"
                                    id="avatar-input"
                                    hidden
                                    accept="image/*"
                                    onChange={(e) => {
                                        if (e.target.files && e.target.files[0]) {
                                            handleImageUpload(e.target.files[0])
                                            e.target.value = ''
                                        }
                                    }}
                                />
                            </div>
                        </div>

                        <div className="form-grid">
                            {/* Identity Section */}
                            <div className="form-group">
                                <label>First Name</label>
                                <input
                                    type="text"
                                    name="firstName"
                                    placeholder="e.g. Alex"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Last Name</label>
                                <input
                                    type="text"
                                    name="lastName"
                                    placeholder="e.g. Johnson"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            {/* Contact Section */}
                            <div className="form-group">
                                <label>Email Address</label>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="alex@example.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Mobile Number</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    placeholder="+91 00000 00000"
                                    value={formData.phone}
                                    onChange={handlePhoneChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <Calendar
                                    value={formData.dob}
                                    onChange={(val: string) => handleDropdownChange('dob', val)}
                                    label="Date of Birth"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <SearchableDropdown
                                    options={['Male', 'Female', 'Other']}
                                    value={formData.sex}
                                    onChange={(val) => handleDropdownChange('sex', val)}
                                    placeholder="Select Sex"
                                    label="Sex"
                                    required
                                    allowManual={false}
                                />
                            </div>

                            {/* Academic Section */}
                            <div className="form-group form-group--full">
                                <SearchableDropdown
                                    options={[...colleges]}
                                    value={formData.college}
                                    onChange={(val) => handleDropdownChange('college', val)}
                                    placeholder="Select or Search College"
                                    label="College"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <SearchableDropdown
                                    options={[...majors]}
                                    value={formData.major}
                                    onChange={(val) => handleDropdownChange('major', val)}
                                    placeholder="Select or Search Major"
                                    label="Major / Branch"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <SearchableDropdown
                                    options={studyYears}
                                    value={formData.yearOfStudy}
                                    onChange={(val) => handleDropdownChange('yearOfStudy', val)}
                                    placeholder="Select Year"
                                    label="Year of Study"
                                    required
                                    allowManual={false}
                                />
                            </div>
                            <div className="form-group">
                                <SearchableDropdown
                                    options={completionYears}
                                    value={formData.completionYear}
                                    onChange={(val) => handleDropdownChange('completionYear', val)}
                                    placeholder="Select Year"
                                    label="Completion Year"
                                    required
                                    allowManual={false}
                                />
                            </div>
                        </div>

                        <div className="signup-footer">
                            <button type="submit" className="signup-btn">Complete Registration</button>
                        </div>
                    </form>
                </div>
            </div>

            {imageToCrop && (
                <ImageCropper
                    imageSrc={imageToCrop}
                    onCropComplete={onCropComplete}
                    onCancel={() => setImageToCrop(null)}
                />
            )}
        </div>
    )
}

export default UserSignup
