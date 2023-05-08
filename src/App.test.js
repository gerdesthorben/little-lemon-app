import { render, screen, fireEvent } from "@testing-library/react";
import Reservation from './components/pages/Reservation';
import ReservationForm from './components/ReservationForm';

test('Renders the Reservation heading', () => {
    render(<Reservation />);
    const headingElement = screen.getByText("Reservation");
    expect(headingElement).toBeTruthy();
})

describe('ReservationForm', () => {
    const defaultProps = {
        initialValues: {
            name: '',
            date: '',
            time: '',
            availableTimes: [
                '17:00',
                '18:00',
                '19:00',
                '20:00',
                '21:00',
                '22:00',
            ],
            numGuests: 2,
            occasion: 'None',
        },
        onSubmit: jest.fn(),
        handleFormChange: jest.fn(),
        state: {
            availableTimes: ['18:30', '19:00', '21:00'],
        },
    };
    test('renders the form with the correct attributes', () => {
        render(<ReservationForm {...defaultProps} />);
        const nameInput = screen.getByLabelText('Last Name *');
        const dateInput = screen.getByLabelText('Choose date *');
        const timeSelect = screen.getByLabelText('Choose time *');
        const guestsInput = screen.getByLabelText('Number of guests *');
        const occasionSelect = screen.getByLabelText('Occasion *');
        const submitButton = screen.getByRole('button', { name: /make your reservation/i });

        expect(nameInput.getAttribute('type')).toBe('text');
        expect(nameInput.getAttribute('id')).toBe('res-name');
        expect(nameInput.getAttribute('class')).toBe('res-name');
        expect(nameInput.getAttribute('name')).toBe('name');

        expect(dateInput.getAttribute('type')).toBe('date');
        expect(dateInput.getAttribute('id')).toBe('res-date');
        expect(dateInput.getAttribute('class')).toBe('res-date');
        expect(dateInput.getAttribute('name')).toBe('date');
        expect(dateInput.getAttribute('placeholder')).toBe('dd-mm-yyyy');
        expect(dateInput.getAttribute('min')).toBe('2023-01-01');
        expect(dateInput.getAttribute('max')).toBe('2028-12-31');

        expect(timeSelect.getAttribute('id')).toBe('res-time');
        expect(timeSelect.getAttribute('class')).toBe('res-time');
        expect(timeSelect.getAttribute('name')).toBe('time');

        expect(guestsInput.getAttribute('type')).toBe('number');
        expect(guestsInput.getAttribute('id')).toBe('guests');
        expect(guestsInput.getAttribute('class')).toBe('res-guests');
        expect(guestsInput.getAttribute('name')).toBe('numGuests');
        expect(guestsInput.getAttribute('placeholder')).toBe('1');
        expect(guestsInput.getAttribute('min')).toBe('1');
        expect(guestsInput.getAttribute('max')).toBe('10');

        expect(occasionSelect.getAttribute('id')).toBe('occasion');
        expect(occasionSelect.getAttribute('class')).toBe('res-occasion');
        expect(occasionSelect.getAttribute('name')).toBe('occasion');

        expect(submitButton.getAttribute('type')).toBe('submit');
        expect(submitButton.getAttribute('class')).toBe('res-submit-button');
        expect(submitButton.disabled).toBe(false);
        expect(submitButton.value).toBe('Make Your Reservation');
    });

    test('should display error messages when fields are touched and invalid', async () => {
        render(<ReservationForm {...defaultProps} />);
        const nameInput = screen.getByLabelText('Last Name *');
        fireEvent.change(nameInput, { target: { value: 'a' } });
        fireEvent.blur(nameInput);
        expect(await screen.findByText('Must be at least 3 characters')).toBeTruthy();

        const dateInput = screen.getByLabelText('Choose date *');
        fireEvent.change(dateInput, { target: { value: '2022-12-31' } });
        fireEvent.blur(dateInput);
        expect(await screen.findByText('Date must be today or later')).toBeTruthy();

        const timeInput = screen.getByLabelText('Choose time *');
        fireEvent.change(timeInput, { target: { value: '' } });
        fireEvent.blur(timeInput);
        expect(await screen.findByText('Required')).toBeTruthy();

        const numGuestsInput = screen.getByLabelText('Number of guests *');
        fireEvent.change(numGuestsInput, { target: { value: '0' } });
        fireEvent.blur(numGuestsInput);
        expect(await screen.findByText('Must be at least 1 guest')).toBeTruthy();

        const occasionInput = screen.getByLabelText('Occasion *');
        fireEvent.change(occasionInput, { target: { value: '' } });
        fireEvent.blur(occasionInput);
        expect(await screen.findByText('Required')).toBeTruthy();
    });

    test('should not display error messages when fields are not touched or valid', async () => {
        render(<ReservationForm {...defaultProps} />);
        const nameInput = screen.getByLabelText('Last Name *');
        const dateInput = screen.getByLabelText('Choose date *');
        const timeInput = screen.getByLabelText('Choose time *');
        const numGuestsInput = screen.getByLabelText('Number of guests *');
        const occasionInput = screen.getByLabelText('Occasion *');

        fireEvent.change(nameInput, { target: { value: 'Obama' } });
        fireEvent.change(dateInput, { target: { value: '2023-05-10' } });
        fireEvent.change(timeInput, { target: { value: '21:00' } });
        fireEvent.change(numGuestsInput, { target: { value: '5' } });
        fireEvent.change(occasionInput, { target: { value: 'Birthday' } });

        expect(screen.queryByText('Must be at least 3 characters')).not.toBeTruthy();
        expect(screen.queryByText('Date must be today or later')).not.toBeTruthy();
        expect(screen.queryByText('Required')).not.toBeTruthy();
        expect(screen.queryByText('Must be at least 1 guest')).not.toBeTruthy();
        expect(screen.queryByText('Required')).not.toBeTruthy();
    });

    test('should submit form with valid inputs', async () => {
        // const mockState = {
        //     availableTimes: [
        //         '17:00',
        //         '18:00',
        //         '19:00',
        //         '20:00',
        //         '21:00',
        //         '22:00',
        //     ],
        // };
        // render(<ReservationForm
        //     initialValues={{
        //         name: '',
        //         date: '',
        //         time: '',
        //         availableTimes: mockState.availableTimes,
        //         numGuests: 2,
        //         occasion: 'None',
        //     }}
        //     state={mockState}
        //     onSubmit={onSubmit} />);
        render(<ReservationForm {...defaultProps} />);
        const nameInput = screen.getByLabelText('Last Name *');
        const dateInput = screen.getByLabelText('Choose date *');
        const timeSelect = screen.getByLabelText('Choose time *');
        const guestsInput = screen.getByLabelText('Number of guests *');
        const occasionSelect = screen.getByLabelText('Occasion *');
        const submitButton = screen.getByText('Make Your Reservation');

        fireEvent.change(nameInput, { target: { value: 'Obama' } });
        fireEvent.change(dateInput, { target: { value: '2023-05-31' } });
        fireEvent.change(timeSelect, { target: { value: '19:00' } });
        fireEvent.change(guestsInput, { target: { value: '5' } });
        fireEvent.change(occasionSelect, { target: { value: 'Birthday' } });

        fireEvent.click(submitButton);

        expect(defaultProps.onSubmit).toHaveBeenCalledTimes(1);
    });
});