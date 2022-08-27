import Link from "next/link"
import React from "react"

interface MenuLinkPropTypes {
  className: string
  href: string
  children: React.ReactNode
}

export default function MenuLink(props: MenuLinkPropTypes) {
  let { className, href, children, ...rest } = props
  return (
    <Link href={href}>
      <a {...rest}>{children}</a>
    </Link>
  )
}
