import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default ({ href, children, disabled }) => {
  const router = useRouter()

  let className = children.props.className || ''
  if (router.pathname === href) {
    className = `${className} active`
  }

  if (disabled) {
    return (
      <div className="disabled">
        {React.cloneElement(children, { className })}
      </div>
    )
  }
  return <Link href={href}>{React.cloneElement(children, { className })}</Link>
}
