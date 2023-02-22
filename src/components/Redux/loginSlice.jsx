import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import Baseurl from "./Baseurl";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const initialState = {
    loading: false,
    response: '',
    error: '',
    toast:false,
    auth:false
}

const SignInThunk = createAsyncThunk("auth/signin", async (data) => {
    return await Baseurl.post("login", data)
        .then((res) => {
            return res
        })
        .catch((Err) => {
            return Err.response
        })
})

const ForgotPwdThunk = createAsyncThunk("auth/forgot", async (email, navigate) => {
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
            state.loading = true;
            state.auth = false;
        })
        builder.addCase(SignInThunk.fulfilled, (state, action) => {
            state.toast = true;
            state.loading = false;
            if (action.payload.data.success) {
                state.response = action.payload.data.msg;
                state.error = '';
                state.auth = true;
            }
            else {
                state.response = ''
                state.error = action.payload.data.msg;
                state.auth = false;
            }
        })
        builder.addCase(SignInThunk.rejected, (state, action) => {
            state.loading = false;
            state.auth = false;
        })

        // forgot password
        builder.addCase(ForgotPwdThunk.pending, (state, action) => {
            state.loading = true;
            state.auth = false;
            state.toast = false;
        })
        builder.addCase(ForgotPwdThunk.fulfilled, (state, action) => {
            state.toast = true;
            state.loading = false;
            if (action.payload.data.success) {
                state.auth = true;
                state.response = action.payload.data.msg
                state.error = ''
            }
            else {
                state.response = ''
                state.error = action.payload.data.msg
                state.auth = false;
            }
        })
        builder.addCase(ForgotPwdThunk.rejected, (state, action) => {
            state.loading = false;
            state.auth = false;
            state.toast = false;
        })

        // otp verify
        builder.addCase(OtpVerifyThunk.pending, (state) => {
            state.loading = true;
            state.auth = false;
        })
        builder.addCase(OtpVerifyThunk.fulfilled, (state, action) => {
            state.toast = true;
            state.loading = false;
            if (action.payload.data.success) {
                state.response = action.payload.data.msg
                state.error = ''
                state.auth = true;
                localStorage.setItem("access token", action.payload.data.token )
            }
            else {
                state.response = ''
                state.error = action.payload.data.msg
                state.auth = false;
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
            state.loading = false;
            if (action.payload.data.success) {
                state.response = action.payload.data.msg
                state.error = ''
                state.auth = true;
            }
            else {
                state.response = ''
                state.error = action.payload.data.msg
                state.auth = false;
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
            state.loading = false;
            if (action.payload.data.success) {
                state.response = action.payload.data.msg
                state.error = ''
            }
            else {
                state.response = ''
                state.error = action.payload.data.msg
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
            state.loading = false;
            if (action.payload.data.success) {
                state.response = action.payload.data.msg
                state.error = ''
                localStorage.setItem("access token", action.payload.data.token )
            }
            else {
                state.response = ''
                state.error = action.payload.data.msg
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
            state.loading = false;
            if (action.payload.data.success) {
                state.response = action.payload.data.msg
                state.error = ''
            }
            else {
                state.response = ''
                state.error = action.payload.data.msg
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