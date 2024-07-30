/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import axiosInstance from '../axios/interceptors';
import { Input, Button } from "@material-tailwind/react";

const accessToken = localStorage.getItem("accessToken");

const addInfo = async (body) => {
  const response = await axiosInstance.post('/appointment', body, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response;
};

// eslint-disable-next-line react/prop-types
function AddMeeting({ childToParent, selectDay, selectMonth, handleOnRefresh }) {
  const [startDate, setStartDate] = useState();
  const [name, setName] = useState();
  const [endDate, setEndDate] = useState();
  const [userId, setUserId] = useState();
  const datas = false;
  const dataRefresh = true;
  const [selectedDay, setSelectedDay] = useState(selectDay);
  const [selectedMonth, setSelectedMonth] = useState(selectMonth);

  if (selectedDay !== selectDay || selectMonth !== selectedMonth) {
    childToParent(datas);
  }

  useEffect(() => {
    axiosInstance.get('/user/profile')
      .then((res) => setUserId(res.data.id));
  }, []);

  const mutation = useMutation(addInfo, {
    onSuccess: () => {
      // QueryClient.invalidateQueries();
    },
    onError: (error) => {
      console.error("Operation failed", error);
    },
  });


  // console.log(meetings.user.userId)
  const handleAddInfo = async (e) => {
    childToParent(datas);
    e.preventDefault();
    handleOnRefresh(dataRefresh);
    const payload = {
      endDate: endDate,
      name: name,
      startDate: startDate,
      userId: userId,
    };

    try {
      mutation.mutate(payload);
    } catch (error) {
      console.error("Error", error);
    }
  };


  return (
    <form>
      <div className="w-72 mt-5">
        <label className="text-gray-900" htmlFor='Name'>Name</label>
        <Input className='mb-4' type="text" name='Name' color="white" value={name} onChange={(e) => setName(e.target.value)} />
        <label className="text-gray-900" htmlFor='Start Date'>Start Date</label>
        <Input className='mb-4' type="date" name='Start Date' color="white" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
        <label className="text-gray-900" htmlFor='End Date'>End Date</label>
        <Input className='mb-4' type="date" name='End Date' color="white" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
        <br />
        <div className="flex w-max items-end gap-4">
          <Button className='bg-indigo-500 hover:bg-indigo-700' onClick={handleAddInfo} size="sm">Add</Button>
          <Button className='bg-red-500 hover:bg-red-700' onClick={() => childToParent(datas)} size="sm">Cancel</Button>
        </div>
      </div>
    </form>
  );
}

export default AddMeeting;
