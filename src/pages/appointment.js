import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid';
import {
  add,
  eachDayOfInterval,
  endOfMonth,
  format,
  getDay,
  isEqual,
  isSameDay,
  isSameMonth,
  isToday,
  parse,
  startOfToday,
} from 'date-fns';
import { useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import axiosInstance from '../axios/interceptors';
import AddMeeting from './addMeeting';
import Meeting from './Meeting';
import LoadingSpinner from "../components/LoadingSpinner";


const fetchInfo = async () => {
  const { data } = await axiosInstance.get('/appointment');
  return data;
};


function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

function Appointment() {
  const today = startOfToday();
  const [selectedDay, setSelectedDay] = useState(today);
  const [currentMonth, setCurrentMonth] = useState(format(today, 'MMM-yyyy'));
  const [isAdding, setIsAdding] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const firstDayCurrentMonth = parse(currentMonth, 'MMM-yyyy', new Date());
  const queryClient = useQueryClient();


  const childToParent = (childdata) => {
    setIsAdding(childdata);
  };

  const handleOnRefresh = (data) => {
    setIsRefreshing(data);
  };

  if (isRefreshing) {
    queryClient.invalidateQueries({ queryKey: ['meetings'] });
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
  }

  const {
    data: meetings,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['meetings'],
    queryFn: fetchInfo,
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return (
      <p>Error loading meetings</p>
    );
  }

  if (!meetings) {
    return (
      <p >No meetings</p>

    );
  }

  const days = eachDayOfInterval({
    start: firstDayCurrentMonth,
    end: endOfMonth(firstDayCurrentMonth),
  });

  function previousMonth() {
    const firstDayNextMonth = add(firstDayCurrentMonth, { months: -1 });
    setCurrentMonth(format(firstDayNextMonth, 'MMM-yyyy'));
  }

  function nextMonth() {
    const firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 });
    setCurrentMonth(format(firstDayNextMonth, 'MMM-yyyy'));
  }

  const selectedDayMeetings = meetings.filter((meeting) =>
    isSameDay(meeting.startDate, format(selectedDay, 'yyyy-MM-dd')),
  );


  return (
    <div className="flex h-screen w-screen">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 pt-16">
        <div className='mb-6'>

        </div>
        <div className="max-w-md px-4 mx-auto sm:px-7 md:max-w-4xl md:px-6">
          <div className="md:grid md:grid-cols-2 md:divide-x md:divide-gray-200">
            <div className="md:pr-14">
              <div className="flex items-center">
                <h2 className="flex-auto font-semibold text-gray-900">
                  {format(firstDayCurrentMonth, 'MMMM yyyy')}
                </h2>
                <button
                  type="button"
                  onClick={previousMonth}
                  className="-my-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
                >
                  <span className="sr-only">Previous month</span>
                  <ChevronLeftIcon className="w-5 h-5" aria-hidden="true" />
                </button>
                <button
                  onClick={nextMonth}
                  type="button"
                  className="-my-1.5 -mr-1.5 ml-2 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
                >
                  <span className="sr-only">Next month</span>
                  <ChevronRightIcon className="w-5 h-5" aria-hidden="true" />
                </button>
              </div>
              <div className="grid grid-cols-7 mt-10 text-xs leading-6 text-center text-gray-500">
                <div>S</div>
                <div>M</div>
                <div>T</div>
                <div>W</div>
                <div>T</div>
                <div>F</div>
                <div>S</div>
              </div>
              <div className="grid grid-cols-7 mt-2 text-sm">
                {days.map((day, dayIdx) => (
                  <div
                    key={day.toString()}
                    className={classNames(
                      dayIdx === 0 && colStartClasses[getDay(day)],
                      'py-1.5 px-2',
                    )}
                  >
                    <button
                      type="button"
                      onClick={() => setSelectedDay(day)}
                      className={classNames(
                        isEqual(day, selectedDay) && 'text-white',
                        !isEqual(day, selectedDay) &&
                        isToday(day) &&
                        'text-red-500',
                        !isEqual(day, selectedDay) &&
                        !isToday(day) &&
                        isSameMonth(day, firstDayCurrentMonth) &&
                        'text-gray-900',
                        !isEqual(day, selectedDay) &&
                        !isToday(day) &&
                        !isSameMonth(day, firstDayCurrentMonth) &&
                        'text-gray-400',
                        isEqual(day, selectedDay) && isToday(day) && 'bg-red-500',
                        isEqual(day, selectedDay) &&
                        !isToday(day) &&
                        'bg-gray-900',
                        !isEqual(day, selectedDay) && 'hover:bg-gray-200',
                        (isEqual(day, selectedDay) || isToday(day)) &&
                        'font-semibold',
                        'mx-auto flex h-8 w-8 items-center justify-center rounded-full',
                      )}
                    >
                      <time dateTime={format(day, 'yyyy-MM-dd')}>
                        {format(day, 'd')}
                      </time>
                    </button>

                    <div className="w-1 h-1 mx-auto mt-1">
                      {meetings.some((meeting) =>
                        isSameDay(meeting.startDate, format(day, 'yyyy-MM-dd')),
                      ) && (
                          <div className="w-1 h-1 rounded-full bg-sky-500"></div>
                        )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <section className="mt-12 md:mt-0 md:pl-14">
              <h2 className="font-semibold text-gray-900">
                Schedule for{' '}
                <time dateTime={format(selectedDay, 'yyyy-MM-dd')}>
                  {format(selectedDay, 'MMM dd, yyy')}
                </time>
              </h2>
              <ol className="mt-4 space-y-1 text-sm leading-6 text-gray-500">
                {selectedDayMeetings.length > 0 && (
                  selectedDayMeetings.map((meeting) => (
                    <Meeting meeting={meeting} key={meeting.id} handleOnRefresh={handleOnRefresh} />
                  ))
                )}
                {!isAdding ? (
                  <button onClick={() => setIsAdding(true)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Add Meating</button>
                ) : <AddMeeting meetings={meetings} handleOnRefresh={handleOnRefresh} childToParent={childToParent} selectDay={selectedDay} selectMonth={currentMonth} />}
              </ol>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

const colStartClasses = [
  '',
  'col-start-2',
  'col-start-3',
  'col-start-4',
  'col-start-5',
  'col-start-6',
  'col-start-7',
];

export default Appointment;
