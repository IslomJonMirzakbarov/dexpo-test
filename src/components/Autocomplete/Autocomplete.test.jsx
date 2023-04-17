import React from 'react'
import { render, fireEvent, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import SearchField from './index'
import SearchFieldResponsive from './index.responsive'
import MaterialUIProvider from '../../providers/MaterialUIProvider'
import userEvent from '@testing-library/user-event'

describe('Autocomplete Component', () => {
  test('renders SearchField with a placeholder', () => {
    render(
      <MaterialUIProvider>
        <SearchField />
      </MaterialUIProvider>
    )
    const inputElement = screen.getByPlaceholderText('searchPlaceHolder')
    expect(inputElement).toBeInTheDocument()
  })

  test('renders SearchFieldResponsive and toggles it', () => {
    render(
      <MaterialUIProvider>
        <SearchFieldResponsive />
      </MaterialUIProvider>
    )
    const searchIcon = screen.getByTestId('SearchIcon')
    fireEvent.click(searchIcon)

    const backButton = screen.getByTestId('ArrowBackIosRoundedIcon')
    expect(backButton).toBeInTheDocument()

    fireEvent.click(backButton)
    const inputElement = screen.queryByPlaceholderText('searchPlaceHolder')
    expect(inputElement).not.toBeInTheDocument()
  })

  test('focus and blur events on SearchField', async () => {
    render(
      <MaterialUIProvider>
        <SearchField />
      </MaterialUIProvider>
    )
    const inputElement = await waitFor(() =>
      screen.getByPlaceholderText('searchPlaceHolder')
    )

    inputElement.focus()
    expect(inputElement).toHaveFocus()
  })

  test('focus and blur events on SearchFieldResponsive', async () => {
    render(
      <MaterialUIProvider>
        <SearchFieldResponsive />
      </MaterialUIProvider>
    )
    const searchIcon = screen.getByTestId('SearchIcon')
    userEvent.click(searchIcon)

    const inputElement = await waitFor(() =>
      screen.getByPlaceholderText('searchPlaceHolder')
    )

    inputElement.focus()
    expect(inputElement).toHaveFocus()
  })
})
