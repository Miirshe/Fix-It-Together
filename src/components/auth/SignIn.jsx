import { ErrorMessage, Form, Formik } from 'formik'
import { AiOutlineCheck } from 'react-icons/ai'
import { Link } from 'react-router-dom';
import * as Yup from "yup";
const SignIn = () => {
    const initialValues = {
        email: '',
        password: ''
    }
    const ValiationShema = Yup.object({
        email: Yup.string().required("Please enter your email"),
        password: Yup.string().required("Please enter your password")
    })
    return (
        <div className="bg-white">
            <div className='bg-white mt-10 lg:mt-0 grid grid-cols-1 lg:grid-cols-2 p-4 space-y-5 lg:space-y-2'>
                <div className='lg:h-screen bg-[#474E68] text-white rounded flex flex-col lg:justify-center lg:items-center space-y-3 p-8 lg:p-3'>
                    <h1 className='text-3xl font-bold lg:text-4xl lg:tracking-wider'>Better Community</h1>
                    <div className=' space-y-3'>
                        <p className='text-base flex flex-row justify-start items-baseline space-y-2 space-x-3'><AiOutlineCheck size={18} /> <span>Help your community</span></p>
                        <p className='text-base flex flex-row justify-start items-baseline space-y-2 space-x-3'><AiOutlineCheck size={18} /> <span>Make the world better place</span></p>
                        <p className='text-base flex flex-row justify-start items-baseline space-y-2 space-x-3'><AiOutlineCheck size={18} /> <span>Make your Community save</span></p>
                    </div>
                </div>
                <div className=' mt-20 lg:mt-0'>
                    <div className='flex flex-row justify-end items-center mr-3 lg:mr-20 space-x-5'>
                        <h1>Not a member yet ? </h1>
                        <button><Link to='/SignUp/1'>Sign Up </Link></button>
                    </div>
                    <Formik initialValues={initialValues}
                        validationSchema={ValiationShema}>
                        <Form className='lg:h-screen text-[#474E68] flex flex-col lg:justify-center lg:items-center lg:space-x-5  space-y-5'>
                            <p className='lg:w-[80%] text-4xl lg:ml-5 text-start'>Login</p>
                            <input className='p-3 border-2 lg:w-[80%] outline-none rounded-md ' type="email" placeholder='Enter Email ' name='email' />
                            <ErrorMessage component="div" name='email' className='text-red-500'></ErrorMessage>
                            <input className='p-3 border-2 lg:w-[80%] outline-none rounded-md ' type="password" placeholder='Enter Password ' name='password' />
                            <ErrorMessage component="div" name='password' className='text-red-500'></ErrorMessage>
                            <button className='p-3 border-2 lg:w-[80%] bg-[#474E68] text-white outline-none rounded-md'><Link to='/Home'>Login</Link></button>
                        </Form>
                    </Formik>
                </div>
            </div>
        </div>
    )
}

export default SignIn