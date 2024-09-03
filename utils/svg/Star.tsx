import * as React from "react"

interface Props {
  fill: string
}

export default function Star({ fill }: Props) {
  return (
    <svg
      width={16}
      height={16}
      fill={fill ?? "none"}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.486.8l2.23 4.42 4.294.425a.537.537 0 01.333.916l-3.533 3.502 1.31 4.758a.542.542 0 01-.767.624L8 13.289l-4.347 2.153a.542.542 0 01-.767-.623l1.31-4.759L.66 6.558a.537.537 0 01.333-.916l4.294-.425L7.514.8a.546.546 0 01.972 0z"
        stroke="black"
        strokeWidth={0.5}
      />
    </svg>
  );
}