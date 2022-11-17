import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import customFetch from '../../utils/axios';
import { addUserToLocalStorage, getUserFromLocalStorage, removeUserFromLocalStorage } from '../../utils/localStorage';
const initialState={
    isLoading:false,
    isSideBarOpen:false,
    user:getUserFromLocalStorage()
};

export const registerUser=createAsyncThunk('user/registerUser',async(user,thunkAPI)=>{
    try {
        const res=await customFetch.post('/auth/register',user,)
        return res.data
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.msg)
        // toast.error(error.response.data.msg)
    }
})

export const loginUser=createAsyncThunk('user/loginUser',async(user,thunkAPI)=>{
    try {
        const res=await customFetch.post('/auth/login',user)
        return res.data
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.msg)
        // toast.error(error.response.data.msg)
    }
})


export const updateUser=createAsyncThunk('',async(user,thunkAPI)=>{
    try {
        const res=await customFetch.patch('/auth/updateUser',user,{
            headers:{
                authorization:`Bearer ${thunkAPI.getState().user.user.token}`
            }
        })
        return res.data
    } catch (error) {
        if(error.response.status===401){
            thunkAPI.dispatch(logoutUser())
            return thunkAPI.rejectWithValue('unauthorized ....loging out')
        }
        console.log(error.response)
        return thunkAPI.rejectWithValue(error.response.data.msg)
        // toast.error(error.response.data.msg)
    }
})

const userSlice=createSlice({
    name:'user',
    initialState,
    reducers:{
        toggleSideBar:(state)=>{
            state.isSideBarOpen=!state.isSideBarOpen
        },
        logoutUser:(state,{payload})=>{
            state.user=null
            state.isSideBarOpen=false
            removeUserFromLocalStorage()
            if(payload){
                toast.success(payload)
            }
        }
    },
    extraReducers:{
        [registerUser.pending]:(state)=>{
            state.isLoading=true
        },
        [registerUser.fulfilled]:(state,{payload})=>{
            const {user}=payload
            state.isLoading=false
            state.user=user
            addUserToLocalStorage(user)
            toast.success(`hello ${user.name}`)
        },
        [registerUser.rejected]:(state,{payload})=>{
            state.isLoading=false
            toast.error(payload)
        },

        [loginUser.pending]:(state)=>{
            state.isLoading=true
        },
        [loginUser.fulfilled]:(state,{payload})=>{
            const {user}=payload
            state.isLoading=false
            state.user=user
            addUserToLocalStorage(user)
            toast.success(`welcome back ${user.name}`)
        },
        [loginUser.rejected]:(state,{payload})=>{
            state.isLoading=false
            toast.error(payload)
        },

        [updateUser.pending]:(state)=>{
            state.isLoading=true
        },
        [updateUser.fulfilled]:(state,{payload})=>{
            const {user}=payload
            state.isLoading=false
            state.user=user
            addUserToLocalStorage(user)
            toast.success(`User update`)
        },
        [updateUser.rejected]:(state,{payload})=>{
            state.isLoading=false
            toast.error(payload)
        },

    }
})
export const{toggleSideBar,logoutUser,}=userSlice.actions
export default userSlice.reducer