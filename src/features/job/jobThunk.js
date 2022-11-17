import customFetch from '../../utils/axios';
import { showLoading,hideLoading,getAllJobs } from '../allJobs/allJobsSlice';
import { clearValues } from './jobSlice';
import { logoutUser } from '../user/userSlice';
export const createJobThunk=async(job,thunkAPI)=>{
    try {
        const res=await customFetch.post('/jobs',job,{
            headers:{
                authorization:`Bearer ${thunkAPI.getState().user.user.token}`
            }
        })
        thunkAPI.dispatch(clearValues())
        return res.data
    } catch (error) {
        if(error.response.status===401){
            thunkAPI.dispatch(logoutUser)
            return thunkAPI.rejectWithValue('Unauthorized! logging out...')
        }
   return thunkAPI.rejectWithValue(error.response.data.msg)
    }
}
export const deleteJobThunk=async(jobId,thunkAPI)=>{
    thunkAPI.dispatch(showLoading())
    try {
        const res=await customFetch.delete(`/jobs/${jobId}`,{
            headers:{
                authorization:`Bearer ${thunkAPI.getState().user.user.token}`
            }
        })
        thunkAPI.dispatch(getAllJobs())
        return res.data.msg
    } catch (error) {
        thunkAPI.dispatch(hideLoading())
        return thunkAPI.rejectWithValue(error.response.data.msg)
    }
}
export const editJobThunk=async({jobId,job},thunkAPI)=>{
    try {
        const res=await customFetch.patch(`/jobs/${jobId}`,job,{
            headers:{
                authorization:`Bearer ${thunkAPI.getState().user.user.token}`
            }
        })
        thunkAPI.dispatch(clearValues())
        return res.data
    } catch (error) {
        thunkAPI.dispatch(hideLoading())
        return thunkAPI.rejectWithValue(error.response.data.msg)
    }
}