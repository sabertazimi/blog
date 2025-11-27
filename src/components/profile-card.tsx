import type { Profile } from '@/types'
import { SiGithub } from '@icons-pack/react-simple-icons'
import { CalendarIcon, MapPinIcon } from 'lucide-react'
import { useTranslations } from 'next-intl'
import FormattedDate from '@/components/formatted-date'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Link } from '@/i18n/navigation'

interface ProfileCardProps {
  profile: Profile
}

function ProfileCard({ profile }: ProfileCardProps) {
  const t = useTranslations('about')

  return (
    <Card className="h-full rounded-none border-0 shadow-none">
      <CardHeader className="items-center pb-4">
        <Avatar className="border-primary/10 relative mb-4 size-32 overflow-hidden rounded-full border-4">
          <AvatarImage src={profile.avatar} alt={profile.username} />
          <AvatarFallback>{profile.username.charAt(0)}</AvatarFallback>
        </Avatar>
        <CardTitle className="text-2xl">{profile.name}</CardTitle>
        <CardDescription>{profile.bio ?? t('bio')}</CardDescription>
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
          <MapPinIcon className="text-muted-foreground size-4" />
          <span>{profile.location ?? t('location')}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <CalendarIcon className="text-muted-foreground size-4" />
          <FormattedDate date={profile.createDate} />
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
            <div className="text-muted-foreground text-xs">{t('followers')}</div>
          </Link>
          <Link
            href={profile.followingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition-colors"
          >
            <div className="text-2xl font-bold">{profile.following}</div>
            <div className="text-muted-foreground text-xs">{t('following')}</div>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}

export default ProfileCard
