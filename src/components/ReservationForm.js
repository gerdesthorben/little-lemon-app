import React, { useState, useEffect } from 'react';
import { useFormik } from "formik";
import * as Yup from 'yup';

export default function ReservationForm(props) {
    const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
    const handleFormChange = (e) => {
        if (props.handleFormChange) {
            props.handleFormChange(e);
        }
    }

    const formik = useFormik({
        initialValues: props.initialValues,

        // isValid: false,

        // initialTouched: {
        //     name: true
        // },
        // initialErrors: {
        //     name: 'Required'
        // },

        onSubmit: props.onSubmit,

        validationSchema: Yup.object({
            name: Yup.string()
                .min(3, "Must be at least 3 characters")
                .required("Required"),
            date: Yup.date()
                .min(new Date(), 'Date must be today or later')
                .required("Required"),
            time: Yup.string().required("Required"),
            numGuests: Yup.number()
                .min(1, "Must be at least 1 guest")
                .max(10, "Maximum number of guests is 10")
                .required("Required"),
            occasion: Yup.string().required("Required"),
        }),
    });

    useEffect(() => {
        // Check validation on initial load
        const isValid = formik.validateForm().then((errors) => {
            return Object.keys(errors).length === 0;
        });
        setIsSubmitDisabled(!isValid);
    }, []);

    useEffect(() => {
        // Update validation when form values change
        const isValid = formik.isValid;
        setIsSubmitDisabled(!isValid);
    }, [formik.isValid]);

    const handleFormSubmittion = (e) => {
        e.preventDefault();
        console.log(formik.getFieldProps('name').value);
        console.log(formik.getFieldProps('date').value);
        console.log(formik.getFieldProps('time').value);
        console.log(formik.getFieldProps('numGuests').value);
        console.log(formik.getFieldProps('occasion').value);
        console.log("Button clicked");
        props.onSubmit();
    }

    return (
        <>
            <form
                onSubmit={handleFormSubmittion}
                className='res-form'>

                <label htmlFor="res-name" className='res-name-label'>Last Name *</label>
                <input
                    type="text"
                    id="res-name"
                    className='res-name'
                    name='name'
                    {...formik.getFieldProps('name')}
                    onChange={(e) => {
                        handleFormChange(e);
                        formik.handleChange(e);
                    }} />
                {formik.touched.name && formik.errors.name ? (
                    <div className='res-error'>{formik.errors.name}</div>
                ) : null}

                <label htmlFor="res-date" className='res-date-label'>Choose date *</label>
                <input
                    type="date"
                    id="res-date"
                    className='res-date'
                    name='date'
                    placeholder="dd-mm-yyyy"
                    min="2023-01-01" max="2028-12-31"
                    {...formik.getFieldProps('date')}
                    onChange={(e) => {
                        handleFormChange(e);
                        formik.handleChange(e);
                    }} />
                {formik.touched.date && formik.errors.date ? (
                    <div className='res-error'>{formik.errors.date}</div>
                ) : null}

                <label htmlFor="res-time" className='res-time-label'>Choose time *</label>
                <select
                    id="res-time"
                    className='res-time'
                    name='time'
                    {...formik.getFieldProps('time')}
                    onChange={(e) => {
                        handleFormChange(e);
                        formik.handleChange(e);
                    }} >

                    <option value="">Select time</option>
                    {props.state.availableTimes.map((time) => (
                        <option key={time} value={time}>
                            {time}
                        </option>
                    ))}
                </select>
                {formik.touched.time && formik.errors.time ? (
                    <div className='res-error'>{formik.errors.time}</div>
                ) : null}

                <label htmlFor="guests" className='res-guests-label'>Number of guests *</label>
                <div className='res-guests-group'>
                    <button
                        className='res-guests-change'
                        name='numGuestsDecrease'
                        onClick={(e) => {
                            handleFormChange(e);
                            const newValue = parseInt(formik.values.numGuests) - 1;
                            formik.setFieldValue('numGuests', newValue > 0 ? newValue : 1);
                        }} >-</button>
                    <input
                        type="number"
                        className='res-guests'
                        placeholder="1"
                        min="1" max="10"
                        id="guests"
                        name='numGuests'
                        {...formik.getFieldProps('numGuests')}
                        onChange={(e) => {
                            handleFormChange(e);
                            formik.handleChange(e);
                        }} />
                    <button
                        className='res-guests-change'
                        name='numGuestsIncrease'
                        onClick={(e) => {
                            handleFormChange(e);
                            const newValue = parseInt(formik.values.numGuests) + 1;
                            formik.setFieldValue('numGuests', newValue < 11 ? newValue : 10);
                        }} >+</button>
                </div>
                {formik.touched.numGuests && formik.errors.numGuests ? (
                    <div className='res-error'>{formik.errors.numGuests}</div>
                ) : null}

                <label htmlFor="occasion" className='res-occasion-label'>Occasion *</label>
                <select
                    id="occasion"
                    className='res-occasion'
                    name='occasion'
                    {...formik.getFieldProps('occasion')}
                    onChange={(e) => {
                        handleFormChange(e);
                        formik.handleChange(e);
                    }} >

                    <option value="None">None</option>
                    <option value="Birthday">Birthday</option>
                    <option value="Anniversary">Anniversary</option>
                </select>
                {formik.touched.occasion && formik.errors.occasion ? (
                    <div className='res-error'>{formik.errors.occasion}</div>
                ) : null}

                <button
                    type="submit"
                    aria-label="On Click"
                    disabled={!formik.isValid}
                    value="Make Your Reservation"
                    className={!formik.isValid ? 'res-submit-button-disabled' : 'res-submit-button'} >
                    Make Your Reservation
                </button>
                {!formik.isValid && (
                    <div className='res-error'>Please fill in all required fields.</div>
                )}
            </form>
        </>
    );
}