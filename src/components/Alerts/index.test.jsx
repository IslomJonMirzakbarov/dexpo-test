import React from 'react'
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store'
import Alerts from './index'
import '@testing-library/jest-dom'

const mockStore = configureMockStore()

describe('Alerts component', () => {
  test('renders with no alerts', () => {
    const store = mockStore({
      alert: { alerts: [] }
    })

    render(
      <Provider store={store}>
        <Alerts />
      </Provider>
    )

    expect(screen.queryByRole('alert')).toBeNull()
  })

  test('renders with multiple alerts', () => {
    const store = mockStore({
      alert: {
        alerts: [
          { id: '1', type: 'error', title: 'Error message' },
          { id: '2', type: 'success', title: 'Success message' }
        ]
      }
    })

    render(
      <Provider store={store}>
        <Alerts />
      </Provider>
    )

    const alerts = screen.getAllByRole('alert')
    expect(alerts).toHaveLength(2)
    expect(alerts[0]).toHaveTextContent('Error message')
    expect(alerts[1]).toHaveTextContent('Success message')
  })
})
