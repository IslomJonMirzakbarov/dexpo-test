import React from 'react'
import { render, fireEvent, waitFor, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import AttachFiles from './index'
import AttachFileForm from './AttachFileForm'
import AttachFileRow from './AttachFileRow'

jest.mock('../../services/subtaskService')
jest.mock('../../services/fileService')
jest.mock('../../hooks/useDownloader')

describe('AttachFiles component', () => {
  const subtaskId = '1'
  const data = {
    files: [
      {
        id: 1,
        file_name: 'TestFile1',
        file_ext: 'txt',
        size: 1024,
        type: 'text'
      },
      {
        id: 2,
        file_name: 'TestFile2',
        file_ext: 'txt',
        size: 2048,
        type: 'text'
      }
    ]
  }

  test('renders AttachFiles and displays file rows', () => {
    const { getAllByText } = render(
      <AttachFiles subtaskId={subtaskId} data={data} />
    )

    expect(getAllByText(/TestFile[1-2].txt/i)).toHaveLength(2)
    expect(getAllByText(/(1|2) KB/i)).toHaveLength(2)
  })

  test('adds a new file', async () => {
    const { getByText, getAllByText } = render(
      <AttachFiles subtaskId={subtaskId} data={data} />
    )

    const newFile = {
      id: 3,
      file_name: 'TestFile3',
      file_ext: 'txt',
      size: 3072,
      type: 'text'
    }

    fireEvent.click(getByText(/ATTACHEMENTS/i), { target: { file: newFile } })

    await waitFor(() => {
      expect(getAllByText(/TestFile[1-3].txt/i)).toHaveLength(3)
      expect(getAllByText(/(1|2|3) KB/i)).toHaveLength(3)
    })
  })

})

describe('AttachFileForm component', () => {
  const subtaskId = '1'
  const addFile = jest.fn()

  test('renders AttachFileForm with the correct elements', () => {
    const { getByText, getByRole } = render(
      <AttachFileForm subtaskId={subtaskId} addFile={addFile} />
    )

    expect(getByText(/ATTACHEMENTS/i)).toBeInTheDocument()
    expect(getByRole('button', { name: /upload/i })).toBeInTheDocument()
  })

  test('triggers file upload on paste event', async () => {
    const mockPasteEvent = {
      clipboardData: {
        items: [
          {
            kind: 'file',
            getAsFile: () =>
              new File(['file content'], 'image.png', { type: 'image/png' })
          }
        ]
      },
      preventDefault: () => {}
    }

    render(<AttachFileForm subtaskId={subtaskId} addFile={addFile} />)

    fireEvent.paste(window, mockPasteEvent)

    await waitFor(() => expect(addFile).toHaveBeenCalled())
  })

  test('triggers file upload on file input change', async () => {
    const { getByTestId } = render(
      <AttachFileForm subtaskId={subtaskId} addFile={addFile} />
    )
    const fileInput = getByTestId('file-input')

    const file = new File(['file content'], 'file.txt', { type: 'text/plain' })
    userEvent.upload(fileInput, file)

    await waitFor(() => expect(addFile).toHaveBeenCalled())
  })
})

describe('AttachFileRow component', () => {
  const file = {
    id: 1,
    file_name: 'TestFile',
    file_ext: 'txt',
    size: 1024,
    type: 'text'
  }

  const subtaskId = '1'
  const removeFile = jest.fn()
  const openFile = jest.fn()

  test('renders AttachFileRow and displays file information', () => {
    const { getByText } = render(
      <AttachFileRow
        subtaskId={subtaskId}
        file={file}
        removeFile={removeFile}
        openFile={openFile}
      />
    )

    expect(getByText(/TestFile.txt/i)).toBeInTheDocument()
    expect(getByText(/1 KB/i)).toBeInTheDocument()
  })

  test('triggers open file action', () => {
    render(
      <AttachFileRow
        subtaskId={subtaskId}
        file={file}
        removeFile={removeFile}
        openFile={openFile}
      />
    )

    const openFileButton = screen.getByRole('button', { name: /visibility/i })
    userEvent.click(openFileButton)

    expect(openFile).toHaveBeenCalledWith(file)
  })

  test('triggers download file action', async () => {
    render(
      <AttachFileRow
        subtaskId={subtaskId}
        file={file}
        removeFile={removeFile}
        openFile={openFile}
      />
    )

    const downloadFileButton = screen.getByRole('button', { name: /download/i })
    userEvent.click(downloadFileButton)

  })

  test('triggers delete file action', async () => {
    render(
      <AttachFileRow
        subtaskId={subtaskId}
        file={file}
        removeFile={removeFile}
        openFile={openFile}
      />
    )

    const deleteFileButton = screen.getByRole('button', { name: /delete/i })
    userEvent.click(deleteFileButton)

    await waitFor(() => expect(removeFile).toHaveBeenCalledWith(file.id))
  })
})
