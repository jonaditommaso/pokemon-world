import * as React from "react"

interface Props {
  fill?: string
}

export default function ChevronUp({ fill }: Props) {
    return (
        <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1em"
        height="1em"
        fill={fill ?? "none"}
        stroke="currentColor"
        strokeWidth={0}
        aria-hidden="true"
        viewBox="0 0 20 20"
    >
        <path
        fillRule="evenodd"
        stroke="none"
        d="M4.293 15.707a1 1 0 0 1 0-1.414l5-5a1 1 0 0 1 1.414 0l5 5a1 1 0 0 1-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 0 1-1.414 0zm0-6a1 1 0 0 1 0-1.414l5-5a1 1 0 0 1 1.414 0l5 5a1 1 0 0 1-1.414 1.414L10 5.414 5.707 9.707a1 1 0 0 1-1.414 0z"
        clipRule="evenodd"
        />
    </svg>
  )
}