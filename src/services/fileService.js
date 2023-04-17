const fileService = {
  createFile: (folderId, data) => {
    return Promise.resolve({
      id: 'exampleFileId',
      name: 'exampleFileName',
      type: 'exampleFileType',
      link: 'exampleFileLink'
    })
  }
}

export default fileService
