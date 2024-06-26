import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { PatientTable } from './patient-table.component';
import '@testing-library/jest-dom';

describe('PatientTable', () => {
  const mockPatients = [{ name: 'John Doe', age: 35 }];

  const mockColumns = [
    { key: 'name', header: 'Name', getValue: (patient) => patient.name },
    { key: 'age', header: 'Age', getValue: (patient) => patient.age },
  ];

  it('renders patient table correctly with specific columns and patient', () => {
    const { getByText } = render(
      <PatientTable
        columns={mockColumns}
        isFetching={false}
        isLoading={false}
        patients={mockPatients}
      />,
    );

    // Test whether the specific patient 'John Doe' and age (35) is rendered in the table
    const johnDoeName = getByText('John Doe');
    expect(johnDoeName).toBeInTheDocument();
    const age35 = getByText('35');
    expect(age35).toBeInTheDocument();
  });

  it('renders loading skeleton when isLoading is true', () => {
    const { getByTestId } = render(
      <PatientTable
        columns={mockColumns}
        isFetching={false}
        isLoading={true}
        patients={[]}
      />,
    );

    // Test whether the loading skeleton is rendered
    const skeleton = getByTestId('data-table-skeleton');
    expect(skeleton).toBeInTheDocument();
  });

  it('renders empty state when no patients are present', () => {
    const { getByText } = render(
      <PatientTable
        columns={mockColumns}
        isFetching={false}
        isLoading={false}
        patients={[]}
      />,
    );

    // Test whether the empty state message is rendered
    const emptyStateMessage = getByText('There are no patients in this list');
    expect(emptyStateMessage).toBeInTheDocument();
  });

  it('filters patients based on search term', () => {
    const { getByText, getByPlaceholderText } = render(
      <PatientTable
        columns={mockColumns}
        isFetching={false}
        isLoading={false}
        patients={mockPatients}
      />,
    );

    // Search for a specific patient
    const searchInput = getByPlaceholderText('Search this list');
    fireEvent.change(searchInput, { target: { value: 'John' } });

    // Check if the filtered patient is displayed
    const johnDoeName = getByText('John Doe');
    expect(johnDoeName).toBeInTheDocument();
  });
});
