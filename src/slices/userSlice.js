import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const userlogin = createAsyncThunk('userLogin',async(userObj,thunkApi)=>{
        const response = await axios.post('http://localhost:3000/user/login',userObj);
        const data=response.data;
        if(data.message==="Success")
        {
            localStorage.setItem("token",data.payload);
            return data;
        }
        if(data.message==="User does not exists" || data.message==='Wrong password'){
            console.log("details are wrong")
            return thunkApi.rejectWithValue(data);
        }
})

export const userslice = createSlice({
    name:"user",
    initialState:{
        userObj:{},
        isError:false,
        isPending:false,
        isSuccess:false,
        errMsg:""
    },
    reducers:{
        onLogoutclick:(state)=>{
            state.isPending=false;
            state.isSuccess=false;
            state.userObj={};
            state.isError=false;
            state.errMsg="";
            return state;
        }
    },
    extraReducers:{
        //track the lifecycle of the  promise returned by createAsyncThunk
        [userlogin.pending]:(state,action)=>{
            state.isPending=true;
            state.isSuccess=false;
            state.isError=false;
            state.errMsg="";
        },
        [userlogin.fulfilled]:(state,action)=>{
            state.isPending=false;
            state.isSuccess=true;
            state.userObj=action.payload;
            state.isError=false;
            state.errMsg=""
        },
        [userlogin.rejected]:(state,action)=>{
            state.isSuccess=false;
            state.isError=true;
            state.isPending=false;
            state.errMsg=action.payload.message;
        }
    }
    }
)

//exporting the actions 
export const {onLogoutclick}=userslice.actions

//Exproting the userslice
export default userslice.reducer;