import { describe, expect, it } from 'vitest'
import ProfileCard from '@/components/profile-card'
import { mockProfile } from '@/tests/fixtures/test-data'
import { render, screen } from '@/tests/test-utils'

describe('ProfileCard', () => {
  it('should render user profile information', () => {
    render(<ProfileCard profile={mockProfile} />)

    expect(screen.getByText(mockProfile.username)).toBeInTheDocument()
    expect(screen.getByText(mockProfile.bio ?? '')).toBeInTheDocument()
    expect(screen.getByText(mockProfile.location ?? '')).toBeInTheDocument()
  })

  it('should render avatar with fallback', () => {
    render(<ProfileCard profile={mockProfile} />)

    const avatarFallback = screen.getByText(mockProfile.username.charAt(0))
    expect(avatarFallback).toBeInTheDocument()
  })

  it('should render GitHub link', () => {
    render(<ProfileCard profile={mockProfile} />)

    const githubLink = screen.getByRole('link', { name: new RegExp(mockProfile.username, 'i') })
    expect(githubLink).toHaveAttribute('href', mockProfile.url)
    expect(githubLink).toHaveAttribute('target', '_blank')
    expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('should render followers and following counts', () => {
    render(<ProfileCard profile={mockProfile} />)

    expect(screen.getByText(mockProfile.followers.toString())).toBeInTheDocument()
    expect(screen.getByText(mockProfile.following.toString())).toBeInTheDocument()
    expect(screen.getByText('Followers')).toBeInTheDocument()
    expect(screen.getByText('Following')).toBeInTheDocument()
  })

  it('should render followers and following as links', () => {
    render(<ProfileCard profile={mockProfile} />)

    const links = screen.getAllByRole('link')
    const followersLink = links.find(link => link.getAttribute('href') === mockProfile.followersUrl)
    const followingLink = links.find(link => link.getAttribute('href') === mockProfile.followingUrl)

    expect(followersLink).toBeDefined()
    expect(followingLink).toBeDefined()
  })

  it('should render create date', () => {
    render(<ProfileCard profile={mockProfile} />)

    const timeElement = screen.getByRole('time')
    expect(timeElement).toBeInTheDocument()
    expect(timeElement).toHaveAttribute('dateTime', new Date(mockProfile.createDate).toISOString())
  })

  it('should use fallback bio when bio is not provided', () => {
    const profileWithoutBio = { ...mockProfile, bio: undefined }
    render(<ProfileCard profile={profileWithoutBio} />)

    expect(screen.getByText('Web Developer')).toBeInTheDocument()
  })

  it('should use fallback location when location is not provided', () => {
    const profileWithoutLocation = { ...mockProfile, location: undefined }
    render(<ProfileCard profile={profileWithoutLocation} />)

    expect(screen.getByText('Undefined')).toBeInTheDocument()
  })

  it('should render username in avatar fallback', () => {
    const profile = { ...mockProfile, username: 'JohnDoe' }
    render(<ProfileCard profile={profile} />)

    const avatarFallback = screen.getByText('J')
    expect(avatarFallback).toBeInTheDocument()
  })
})
