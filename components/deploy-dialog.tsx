import Logo from './logo'
import { CopyButton } from './ui/copy-button'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from './ui/select'
import { publish } from '@/app/actions/publish'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { Duration } from '@/lib/duration'
import { usePostHog } from 'posthog-js/react'
import { useEffect, useState } from 'react'

export function DeployDialog({
  url,
  sbxId,
  apiKey,
}: {
  url: string
  sbxId: string
  apiKey: string | undefined
}) {
  const posthog = usePostHog()

  const [publishedURL, setPublishedURL] = useState<string | null>(null)
  const [duration, setDuration] = useState<string | null>(null)

  useEffect(() => {
    setPublishedURL(null)
  }, [url])

  async function publishURL(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const { url: publishedURL } = await publish(
      url,
      sbxId,
      duration as Duration,
      apiKey,
    )
    setPublishedURL(publishedURL)
    posthog.capture('publish_url', {
      url: publishedURL,
    })
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="default">
          {/* <Logo style="e2b" width={16} height={16} className="mr-2" /> */}
          {/* Deploy to E2B */}
          Start coding
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-4 w-80 flex flex-col gap-2">
        <div className="text-sm font-semibold">Are you sure?</div>
        <div className="text-sm text-muted-foreground">
          Once you start coding, you can't come back to this page.
        </div>
        <div className="text-sm text-muted-foreground">
          Nova will help you break this app down and code it yourself.
          {/* The fragment will be available up until the expiration date you choose
          and you&apos;ll be billed based on our{' '}
          <a
            href="https://e2b.dev/docs/pricing"
            target="_blank"
            className="underline"
          >
            Compute pricing
          </a>
          . */}
        </div>
        {/* <div className="text-sm text-muted-foreground">
          All new accounts receive $100 worth of compute credits. Upgrade to{' '}
          <a
            href="https://e2b.dev/dashboard?tab=billing"
            target="_blank"
            className="underline"
          >
            Pro tier
          </a>{' '}
          for longer expiration.
        </div> */}
        <Button
            type="submit"
            variant="default"
            disabled={publishedURL !== null}
        >
          Start
        </Button>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
