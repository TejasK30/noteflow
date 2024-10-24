interface LayoutProps {
  children: React.ReactNode
  params: any
}

const DashBoardLayout: React.FC<LayoutProps> = ({ children, params }) => {
  return (
    <>
      <div className="flex overflow-hidden h-screen">{children}</div>
    </>
  )
}

export default DashBoardLayout
