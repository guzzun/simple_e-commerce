/* eslint-disable react/prop-types */
import { Button, Input } from "@material-tailwind/react";
import { Fragment, useState } from "react";
import axiosInstance from "../axios/interceptors";
import { useMutation } from "react-query";
import { Menu, Transition } from '@headlessui/react';
import { DotsVerticalIcon } from '@heroicons/react/outline';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

function Meeting({ meeting, handleOnRefresh }) {
  const [startDate, setStartDate] = useState(meeting.startDate);
  const [name, setName] = useState(meeting.name);
  const [endDate, setEndDate] = useState(meeting.endDate);
  const [isEditing, setIsEditing] = useState(false);
  const datas = true;

  const handleOnEditInfo = () => {
    setIsEditing(true);
  };

  const cancelEditing = () => {
    setIsEditing(false);
  };


  const editInfo = async (body) => {
    await axiosInstance.patch(`/appointment/${meeting.id}`, body);
  };


  const mutation = useMutation(editInfo, {
    onSuccess: () => {
      // QueryClient.invalidateQueries();
    },
    onError: (error) => {
      console.error("Operation faild", error);
    },
  });

  const handleOnEdit = async (e) => {
    setIsEditing(false);
    e.preventDefault();
    handleOnRefresh(datas);
    const payload = {
      endDate: endDate,
      name: name,
      startDate: startDate,
    };

    try {
      mutation.mutate(payload);
    } catch (error) {
      console.error("Error", error);
    }
  };

  const handleOnDelete = async (id) => {
    await axiosInstance.delete(`/appointment/${id}`);
    handleOnRefresh(datas);
  };

  const html = <>
    <div className="flex-auto">
      <p className="text-gray-900">Meeting name: <span style={{ fontWeight: 'bold' }}>{meeting.name}</span></p>
      {/* <p className="text-gray-900">{meeting.name}</p> */}
      <p className="mt-0.5">
        <time dateTime={meeting.startDate}>
          Start Date: <span style={{ color: 'blue' }}>{startDate}</span>
        </time>{' '}
        <br />{' '}
        <time dateTime={meeting.endDate}>
          End Date: <span style={{ color: 'red' }}>{endDate}</span>
        </time>
      </p>
    </div>
    <Menu
      as="div"
      className="relative opacity-0 focus-within:opacity-100 group-hover:opacity-100"
    >

      <div>
        <Menu.Button className="-m-2 flex items-center rounded-full p-1.5 text-gray-500 hover:text-gray-600">
          <span className="sr-only">Open options</span>
          <DotsVerticalIcon className="w-6 h-6" aria-hidden="true" />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 origin-top-right bg-white rounded-md shadow-lg w-36 ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <a onClick={handleOnEditInfo}
                  href="#"
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-sm',
                  )}
                >
                  Edit
                </a>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <a onClick={() => handleOnDelete(meeting.id)}
                  href="#"
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-sm',
                  )}
                >
                  Delete
                </a>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  </>;

  return (
    <>
      <li className="flex items-center px-1 py-2 space-x-1 group rounded-xl">
        {!isEditing ?
          html : <form>
            <div className="w-72 mt-5">
              <label className="text-gray-900" htmlFor='Name'>Name</label>
              <Input className='mb-4' type="text" name='Name' color="white" value={name} onChange={(e) => setName(e.target.value)} />
              <label className="text-gray-900" htmlFor='Start Date'>Start Date</label>
              <Input className='mb-4' type="date" name='Start Date' color="white" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
              <label className="text-gray-900" htmlFor='End Date'>End Date</label>
              <Input className='mb-4' type="date" name='End Date' color="white" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
              <br />
              <div className="flex w-max items-end gap-4">
                <Button className='bg-indigo-500 hover:bg-indigo-700' onClick={handleOnEdit} size="sm">Done</Button>
                <Button className='bg-red-500 hover:bg-red-700' onClick={cancelEditing} size="sm">Cancel</Button>
              </div>
            </div>
          </form>
        }
      </li>
      <br />
    </>
  );
}

export default Meeting;
