import ChildrenInterface from "@/interface/children.interface"
import { AntdRegistry } from "@ant-design/nextjs-registry"
import { FC } from "react"
import 'remixicon/fonts/remixicon.css'

const MainLayout: FC <ChildrenInterface> = ({children}) => {
  return (
    <AntdRegistry>
    <div>
      {children}
    </div>
    </AntdRegistry>
   
  )
}

export default MainLayout
