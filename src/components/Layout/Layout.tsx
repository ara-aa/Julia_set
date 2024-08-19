type Props = {
  children: React.ReactNode
}

export const Layout = (props: Props) => {
  const { children } = props

  return <div className='h-full w-hull p-10'>{children}</div>
}
