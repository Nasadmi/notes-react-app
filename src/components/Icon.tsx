import { HugeiconsIcon, type IconSvgElement } from "@hugeicons/react"

export const Icon = ({ icon }: { icon: IconSvgElement }) => {
    return <HugeiconsIcon icon={icon} size={19} color='var(--text)'  strokeWidth={1.5}/>
}