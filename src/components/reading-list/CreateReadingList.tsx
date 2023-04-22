import { Button } from '@chakra-ui/react'
import type React from 'react'
import { api } from '~/utils/api'
import { useReadingListStore } from '~/zustand/ReadingListStore'

export const CreateReadingList: React.FC = () => {
  const { addReadingList } = useReadingListStore()

  const { mutate: createReadingList } = api.readingList.createReadingList.useMutation({
    onSuccess: (data) => {
      addReadingList(data)  
    }
  })
  return (
    <div>
      <Button onClick={() => createReadingList({ name: "Helo" })}>
        new reading list
      </Button>
    </div>
  )
}
