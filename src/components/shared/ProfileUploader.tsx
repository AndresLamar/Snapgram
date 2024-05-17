import {useCallback, useState} from 'react'
import { FileWithPath ,useDropzone} from 'react-dropzone'

type ProfileUploaderProps = {
  fieldChange: (FILES: File[]) => void
  mediaUrl: string
}

function ProfileUploader({ fieldChange, mediaUrl }: ProfileUploaderProps) {
  
  const [file, setFile] = useState<File[]>([])
  const [fileUrl, setFileUrl] = useState(mediaUrl)


  const onDrop = useCallback((acceptedFiles: FileWithPath[]) => {
    setFile(acceptedFiles)
    fieldChange(acceptedFiles)
    setFileUrl(URL.createObjectURL(acceptedFiles[0]))
    // uploadFile(acceptedFiles[0])
  }, [file, fieldChange])

  const {getRootProps, getInputProps} = useDropzone({
    onDrop,
    accept: {
      'image/png': ['.png'], 
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/svg': ['.svg']
    },
    // accept: {
    //   'images/*': ['.jpeg', '.jpg', '.png', '.svg']
    // }
  })

  return (
    <div {...getRootProps()} className='flex flex-1 w-fulls  cursor-pointer'>
      <input {...getInputProps()} className='cursor-pointer' />
        <div className='flex gap-6 items-center'>
            <img 
                src={fileUrl ||'/assets/icons/profile-placeholder.svg'} 
                alt="image"
                className='rounded-full w-24 lg:h-24 object-cover '
            />
            <p className='text-[#0095F6] body-medium hover:underline'>Change profile photo</p>
        </div>
    </div>
  )
}

export default ProfileUploader