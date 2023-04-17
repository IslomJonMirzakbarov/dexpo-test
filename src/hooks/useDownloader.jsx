import { useQuery } from 'react-query'

async function downloadFile(fileId) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ data: `Downloaded data for file with id: ${fileId}` })
    }, 1000)
  })
}

export default function useDownloader(fileId) {
  return useQuery(['downloadFile', fileId], () => downloadFile(fileId))
}
