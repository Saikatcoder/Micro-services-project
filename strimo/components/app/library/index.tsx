'use client'
import { fetcher } from "@/lib/fetcher"
import { Divider, Form, Input, Modal, Table, Tag, Button as Antdbutton, Skeleton, Empty, Pagination, Progress, message } from "antd"
import useSWR, { mutate } from "swr"
import moment from "moment"
import { Button } from "@/components/ui/button"
import { Upload } from "lucide-react"
import { ChangeEvent, useState } from "react"
// import '@ant-design/v5-patch-for-react-19'
import { catchError } from "@/lib/catch-error"
import httpRequest from "@/lib/http"
import axios from "axios"


const Library = () => {
  const [videoForm] = Form.useForm()
  const [page, setPage]= useState(1)
  const [limit, setLimit]= useState(12)
  const {data, error, isLoading} = useSWR(`/video?page=${page}&limit=${limit}`, fetcher)
  const [open, setOpen] = useState(false)
  const [file, setFile]= useState <File | null>(null)
  const [progress, setProgress] = useState(0)



    const getVideoDuration= (video: File)=>{
      return new Promise ((resolve ,reject)=>{
      const videoTag = document.createElement("video")
      const url = URL.createObjectURL(video)
      videoTag.src = url
      videoTag.preload ='metadata'
      videoTag.load()

      videoTag.onloadedmetadata =()=>{
         const duration = videoTag.duration
         resolve(duration)
      }
    })
  }
      


  const uploadVideo = async(value: any)=>{
    try {
      if(!file)
      return

      const options = {
        headers:{
          'Content-Type': file.type
        },
        onUploadProgress: (e:any)=>{
        const percent = Math.floor((e.loaded*100)/e.total)
        setProgress(percent)
        }
      }

    const duration = await getVideoDuration(file)
    value.duration = duration
    value.size = file.size
    delete value.file
    const {data} = await httpRequest.post('/video',value)
    const uploadUrl = data.uploadUrl
    await axios.put(uploadUrl,file,options)
    message.success("Video uploaded successfully")
    setProgress(0)
    handleClose()
    mutate(`/video?page=${page}&limit=${limit}`)
    } catch (error) {
      catchError(error)
    }
  }


  const onPaginate=(p:number, l:number)=>{
    setPage(p)
    setLimit(l)
  }


  const handleClose = ()=>{
    if(progress > 0)
      return message.info("please wait file is uploading")

    setOpen(false)
    videoForm.resetFields()
  }


  const handleFile = (e: ChangeEvent<HTMLInputElement>)=>{
    const input  = e.target
    if(input.files){
      setFile(input.files[0])
    }
  
  }

  if(isLoading)
    return <Skeleton active/>

  if(error)
    return <Empty/>


    const columns=[
      {
        title: "Title",
        dataIndex: "title",
        render:(item:any)=>(
          <label>{item.data.title}</label>
        ),
      },
      {
        title: "Size",
        dataIndex: "size",
        key: "size",
      },
      {
        title: "Duration",
        dataIndex: "duration",
        key: "duration",
      },
      {
        title: "Status",
        key: "status",
        render : (item :any)=>(
          <Tag>Draft</Tag>
        )
      },
      {
        title : 'Date',
        key: 'date',
        render : (item :any)=>(
          moment().format('DD MMM YYYY , HH:mm:ss')
        )
      }
    ]



  return (
 <div className="space-y-6">
  <Button onClick={()=>setOpen(true)} >
    <Upload className="w-4 h-4" />
    Upload Video</Button>
    <Table 
     columns={columns}
     dataSource={data.data}
     rowKey="_id"
     pagination={false}
    />
    <div className="flex justify-end">
      <Pagination total={data.total} onChange={onPaginate} pageSize={limit} current={page}/>
    </div>
    <Modal open={open} onCancel={handleClose} onOk={()=>setOpen(false)}>
      <h1 className="text-lg font-medium">Video Information</h1>
     <Divider/>
     <Form layout="vertical" form= {videoForm} onFinish={uploadVideo}>
      <Form.Item label="Title" name="title">
        <Input type="text" className="border border-gray-300 rounded-md p-2 w-full" />
      </Form.Item>
      <Form.Item label="Description" name="description">
        <textarea className="border border-gray-300 rounded-md p-2 w-full" />
      </Form.Item>
      <Form.Item label="file" name="file">
        <Input onChange={handleFile} type="file" className="border border-gray-300 rounded-md p-2 w-full" size="large" accept=".mp4" />
      </Form.Item>
      <Form.Item>
        <Antdbutton size="large" htmlType='submit' type="primary">Upload</Antdbutton>
      </Form.Item> 
     </Form>
     <Progress percent={progress}/>
    </Modal>
 </div>
  )
}

export default Library
