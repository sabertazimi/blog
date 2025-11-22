import type { Profile } from '@/types'
import { SiGithub } from '@icons-pack/react-simple-icons'
import { Calendar, MapPin } from 'lucide-react'
import Link from 'next/link'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { formatDate } from '@/lib/utils'

interface ProfileCardProps {
  profile: Profile
}

function ProfileCard({ profile }: ProfileCardProps) {
  return (
    <Card className="h-full rounded-none border-0 shadow-none">
      <CardHeader className="items-center pb-4">
        <Avatar className="border-primary/10 relative mb-4 size-32 overflow-hidden rounded-full border-4">
          <AvatarImage src={profile.avatar} alt={profile.username} />
          <AvatarFallback>{profile.username.charAt(0)}</AvatarFallback>
        </Avatar>
        <CardTitle className="text-2xl">{profile.username}</CardTitle>
        <CardDescription>{profile.bio ?? 'Web Developer'}</CardDescription>
        <Link
          href={profile.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground hover:text-primary mt-2 flex items-center gap-2 text-sm transition-colors"
        >
          <SiGithub className="size-4" />
          <span>
            @
            {profile.username}
          </span>
        </Link>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-2 text-sm">
          <MapPin className="text-muted-foreground size-4" />
          <span>{profile.location ?? 'Earth'}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Calendar className="text-muted-foreground size-4" />
          <time dateTime={profile.createDate}>{formatDate(profile.createDate)}</time>
        </div>
        <Separator />
        <div className="flex justify-around text-center">
          <Link
            href={profile.followersUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition-colors"
          >
            <div className="text-2xl font-bold">{profile.followers}</div>
            <div className="text-muted-foreground text-xs">Followers</div>
          </Link>
          <Link
            href={profile.followingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition-colors"
          >
            <div className="text-2xl font-bold">{profile.following}</div>
            <div className="text-muted-foreground text-xs">Following</div>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}

export default ProfileCard
