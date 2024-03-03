
import { useGetCourseDetailsQuery } from '@/redux/features/courses/coursesApi'
import React, { useState, useEffect } from 'react'
import Loader from '../components/Loader/Loader'
import Heading from '../utils/Heading'
import Header from '../components/Header'
import Footer from '../components/footer/Footer'
import CourseDetails from './CourseDetails'
import { useGetStripePublishableKeyQuery, useNewPaymentMutation } from '@/redux/features/orders/ordersApi'
import { loadStripe } from '@stripe/stripe-js'

type Props = {
    id: string
}

const CourseDetailsPage = ({ id }: Props) => {
    const [route, setRoute] = useState('Login')
    const [open, setOpen] = useState(false)

    const { data, isLoading, error } = useGetCourseDetailsQuery(id)

    const { data: config } = useGetStripePublishableKeyQuery({})
    const [newPayment, { data: paymentData, isLoading: paymentLoading }] = useNewPaymentMutation()
    const [stripePromise, setStripePromise] = useState<any>(null)
    const [clientSecret, setClientSecret] = useState('')
    useEffect(() => {
        if (config) {
            const publishablkey = config?.publishableKey
            setStripePromise(loadStripe(publishablkey))
        }
        if (data) {
            const amount = Math.round(data?.course?.price * 100)
            newPayment(amount)
        }

    }, [config, data])

    useEffect(() => {
        if (paymentData) {
            setClientSecret(paymentData?.client_secret)
        }
    }, [paymentData])


    return (
        <>
            {
                isLoading ? (<Loader />) : (
                    <div>
                        <Heading
                            title={data?.course.name + '- Elearning'}
                            description='Elearning is programming community which is developed by badhon for helping programmers'
                            keyword={data?.course?.tags}
                        />
                        <Header

                            route={route}
                            setRoute={setRoute}
                            open={open}
                            setOpen={setOpen}
                            activeItem={1} />
                        {
                            stripePromise && (<CourseDetails data={data?.course} stripePromise={stripePromise}
                                clientSecret={clientSecret}
                                setOpen={setOpen}
                                setRoute={setRoute}
                                paymentLoading={paymentLoading}
                            />

                            )
                        }

                        <Footer />
                    </div>
                )
            }
        </>
    )
}

export default CourseDetailsPage