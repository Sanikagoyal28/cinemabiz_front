import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import Baseurl from "./Baseurl";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const initialState = {
    loading: false,
    response: '',
    error: '',
    // toHome: false,
    // toOtp: false,
    // toReset: false,
    // toLogin: false,
    // toVerify: false,
    // toSign: false,
    toast:false,
    auth:false
}

// first create thunk to handle Apis 
// SignInThunk : dispatch action
const SignInThunk = createAsyncThunk("auth/signin", async (data) => {
    // const response = await axios.post("http://localhost:3000/login",{email:"sanikagoyal9@gmail.com"})
    // console.log(response)
    return await Baseurl.post("login", data)
        .then((res) => {
            return res
        })
        .catch((Err) => {
            return Err.response
        })
    // return response;
})

const ForgotPwdThunk = createAsyncThunk("auth/forgot", async (email) => {
    return await Baseurl.post("forgot_pwd", { email })
        .then((res) => {
            return res
        })
        .catch((Err) => {
            return Err.response
        })
})

const OtpVerifyThunk = createAsyncThunk("auth/otp", async (data) => {
    return await Baseurl.post("otp_verify", data)
        .then((res) => {
            return res
        })
        .catch((Err) => {
            return Err.response
        })
})

const ResetPasswordThunk = createAsyncThunk("auth/reset", async (data) => {

    const accessToken =localStorage.getItem("access token")
    console.log(accessToken)
    const config = {
        headers: {
            "Authorization": `Bearer ${accessToken}`
        }
    }
    return await Baseurl.post("reset_pwd", data, config)
        .then((res) => {
            return res
        })
        .catch((Err) => {
            return Err.response
        })
})
const SignupThunk = createAsyncThunk("auth/signup", async (email) => {
    return await Baseurl.post("signup", {email})
        .then((res) => {
            return res
        })
        .catch((Err) => {
            return Err.response
        })
})
const SignupVerifyThunk = createAsyncThunk("auth/signverify", async (data) => {
    return await Baseurl.post("signup_verify", data)
        .then((res) => {
            return res
        })
        .catch((Err) => {
            return Err.response
        })
})
const SignTwoThunk = createAsyncThunk("auth/signtwo", async (data) => {

    const accessToken =localStorage.getItem("access token")
    console.log(accessToken)
    const config = {
        headers: {
            "Authorization": `Bearer ${accessToken}`
        }
    }
    return await Baseurl.post("signup_two", data, config)
        .then((res) => {
            return res
        })
        .catch((Err) => {
            return Err.response
        })
})

const SigninSlice = createSlice({
    name: "user",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        //login
        builder.addCase(SignInThunk.pending, (state, action) => {
            console.log(action)
            state.loading = true;
            state.auth = false;
        })
        builder.addCase(SignInThunk.fulfilled, (state, action) => {
            state.toast = true;
            if (action.payload.data.success) {
                state.loading = false;
                state.response = action.payload.data.msg;
                state.error = '';
                // state.toHome = true
                state.auth = true;
                // toast.success(`${action.payload.data.msg}`, {
                //     position: "top-right",
                //     theme: "light",
                // });
            }
            else {
                state.loading = false;
                state.response = ''
                state.error = action.payload.data.msg;
                state.toHome = false;
                state.auth = false;
                // toast.error(`${action.payload.data.msg}`, {
                //     position: "top-right",
                //     theme: "light",
                // });
            }
        })
        builder.addCase(SignInThunk.rejected, (state, action) => {
            state.loading = false;
            state.auth = false;
        })

        // forgot password
        builder.addCase(ForgotPwdThunk.pending, (state, action) => {
            console.log(action)
            state.loading = true;
            state.auth = false;
        })
        builder.addCase(ForgotPwdThunk.fulfilled, (state, action) => {
            state.toast = true;
            if (action.payload.data.success) {
                state.loading = false;
                state.response = action.payload.data.msg
                state.error = ''
                state.toOtp = true;
                state.auth = true;
                // toast.success(`${action.payload.data.msg}`, {
                //     position: "top-right",
                //     theme: "light",
                // });
            }
            else {
                state.loading = false;
                state.response = ''
                state.error = action.payload.data.msg
                state.toOtp = false
                state.auth = false;
                // toast.error(`${action.payload.data.msg}`, {
                //     position: "top-right",
                //     theme: "light",
                // });
            }
        })
        builder.addCase(ForgotPwdThunk.rejected, (state, action) => {
            state.loading = false;
            state.auth = false;
        })

        // otp verify
        builder.addCase(OtpVerifyThunk.pending, (state) => {
            state.loading = true;
            state.auth = false;
        })
        builder.addCase(OtpVerifyThunk.fulfilled, (state, action) => {
            state.toast = true;
            if (action.payload.data.success) {
                state.loading = false;
                state.response = action.payload.data.msg
                state.error = ''
                state.toReset = true;
                state.auth = true;
                localStorage.setItem("access token", action.payload.data.token )
                toast.success(`${action.payload.data.msg}`, {
                    position: "top-right",
                    theme: "light",
                });
            }
            else {
                state.loading = false;
                state.response = ''
                state.error = action.payload.data.msg
                state.toReset = false
                state.auth = false;
                toast.error(`${action.payload.data.msg}`, {
                    position: "top-right",
                    theme: "light",
                });
            }
        })
        builder.addCase(OtpVerifyThunk.rejected, (state) => {
            state.loading = false;
            state.auth = false;
        })

        // reset password
        builder.addCase(ResetPasswordThunk.pending, (state) => {
            state.loading = true;
            state.auth = false;
        })
        builder.addCase(ResetPasswordThunk.fulfilled, (state, action) => {
            console.log(action)
            if (action.payload.data.success) {
                state.loading = false;
                state.response = action.payload.data.msg
                state.error = ''
                state.toLogin = true;
                state.auth = true;
                toast.success(`${action.payload.data.msg}`, {
                    position: "top-right",
                    theme: "light",
                });
            }
            else {
                state.loading = false;
                state.response = ''
                state.error = action.payload.data.msg
                state.toLogin = false
                state.auth = false;
                toast.error(`${action.payload.data.msg}`, {
                    position: "top-right",
                    theme: "light",
                });
            }
        })
        builder.addCase(ResetPasswordThunk.rejected, (state) => {
            state.loading = false;
            state.auth = false;
        })

        // signup
        builder.addCase(SignupThunk.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(SignupThunk.fulfilled, (state, action) => {
            console.log(action)
            if (action.payload.data.success) {
                state.loading = false;
                state.response = action.payload.data.msg
                state.error = ''
                state.toVerify = true;
                toast.success(`${action.payload.data.msg}`, {
                    position: "top-right",
                    theme: "light",
                });
            }
            else {
                state.loading = false;
                state.response = ''
                state.error = action.payload.data.msg
                state.toVerify = false
                toast.error(`${action.payload.data.msg}`, {
                    position: "top-right",
                    theme: "light",
                });
            }
        })
        builder.addCase(SignupThunk.rejected, (state) => {
            state.loading = false;
        })

        // signup verify
        builder.addCase(SignupVerifyThunk.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(SignupVerifyThunk.fulfilled, (state, action) => {
            console.log(action)
            if (action.payload.data.success) {
                state.loading = false;
                state.response = action.payload.data.msg
                state.error = ''
                state.toSign = true;
                localStorage.setItem("access token", action.payload.data.token )
                toast.success(`${action.payload.data.msg}`, {
                    position: "top-right",
                    theme: "light",
                });
            }
            else {
                state.loading = false;
                state.response = ''
                state.error = action.payload.data.msg
                state.toSign = false
                toast.error(`${action.payload.data.msg}`, {
                    position: "top-right",
                    theme: "light",
                });
            }
        })
        builder.addCase(SignupVerifyThunk.rejected, (state) => {
            state.loading = false;
        })

        // signup two
        builder.addCase(SignTwoThunk.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(SignTwoThunk.fulfilled, (state, action) => {
            console.log(action)
            if (action.payload.data.success) {
                state.loading = false;
                state.response = action.payload.data.msg
                state.error = ''
                state.toSign = true;
                toast.success(`${action.payload.data.msg}`, {
                    position: "top-right",
                    theme: "light",
                });
            }
            else {
                state.loading = false;
                state.response = ''
                state.error = action.payload.data.msg
                state.toSign = false
                toast.error(`${action.payload.data.msg}`, {
                    position: "top-right",
                    theme: "light",
                });
            }
        })
        builder.addCase(SignTwoThunk.rejected, (state) => {
            state.loading = false;
        })
    }
})

export default SignInThunk
export { ForgotPwdThunk, OtpVerifyThunk, ResetPasswordThunk, SignTwoThunk, SignupThunk, SignupVerifyThunk }
export { SigninSlice }

/*
1. dispatch action :createAsyncThunk 
2. returns a promise which is handled by slice
3. initialstate, extraReducer
4. configure store with Slice's reducers
5. calls dispatch to execute function
6. use useSelector to access the data
*/