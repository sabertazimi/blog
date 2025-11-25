'use client'

import { LanguagesIcon } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export const title = 'Language Selector'

function Example() {
  const [language, setLanguage] = useState('en')

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Select language" className="shrink-0">
          <LanguagesIcon className="size-6" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48">
        <DropdownMenuLabel>Select Language</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup onValueChange={setLanguage} value={language}>
          <DropdownMenuRadioItem value="en-US">
            <span className="flex items-center gap-2">
              <span>🇺🇸</span>
              <span>English</span>
            </span>
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="zh-CN">
            <span className="flex items-center gap-2">
              <span>🇨🇳</span>
              <span>中文</span>
            </span>
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default Example
