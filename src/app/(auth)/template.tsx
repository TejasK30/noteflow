interface TemplateProps {
  children: React.ReactNode
}

const Template: React.FC<TemplateProps> = ({ children }: TemplateProps) => {
  return <div className="h-screen p-6 flex justify-center">{children}</div>
}

export default Template
