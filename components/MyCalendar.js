import { useState } from 'react';
import { Text, SafeAreaView, StyleSheet, Button, View, TouchableOpacity,TextInput, FlatList } from 'react-native';
import {Calendar, CalendarList} from 'react-native-calendars';

const TaskInput = ({ date, tasks, setTasks }) => {
  const [task ,setTask] = useState('');

  const addTask = () => {
    setTasks((prevTasks) => {
      const currentTasks = prevTasks[date] || [];
      return { ...prevTasks, [date]: [...currentTasks, { id: Date.now(), title: task }] };
    });
    setTask('');
  };

  return (
    <View>
      <TextInput
        style = {styles.taskText}
        value={task}
        onChangeText={(text) => setTask(text)}
        placeholder="Enter task"
      />
      <TouchableOpacity style = {styles.buttonStyle} onPress = {addTask}>
        <Text style = {styles.dText}>
          Add Task
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const TaskList = ({tasks}) => {
  return (
    <FlatList data = {tasks} renderItem = {({item}) => (
      <View>
        <Text>
          {item.title}
        </Text>
      </View>
    )}
    keyExtractor = {(item) => item.id.toString()}
    />
  )
}

const MyCalendar =()=> {
  const [selectedDate, setSelectedDate] = useState(null);
  const [tasks, setTasks] = useState({
  });

  const onDayPress = (day) => {
    setSelectedDate(day.dateString);
  };
  return (
    <View> 
      <Calendar
      onDayPress={onDayPress}
      markedDates={{
        [selectedDate]: { selected: true },
      }}

      style={{
        borderWidth: 1,
        borderColor: 'gray',
        height: 350,
      }}
      theme={{
        backgroundColor: '#ffffff',
        calendarBackground: '#ffffff',
        textSectionTitleColor: '#b6c1cd',
        selectedDayBackgroundColor: '#00adf5',
        selectedDayTextColor: '#ffffff',
        todayTextColor: '#00adf5',
        dayTextColor: '#2d4150',
        textDisabledColor: '#dd99ee'
      }}>
      </Calendar>
       <TaskList tasks = {tasks[selectedDate]}/>
      {selectedDate && (
        <TaskInput
          date={selectedDate}
          tasks={tasks}
          setTasks={setTasks}
        />
      )}
     
    </View>
  )
}
const styles = StyleSheet.create({
  dText: {
    fontFamily: 'sans-serif',
    fontSize: 30,
    color: 'white',
    fontWeight: 300, // Changed from 'light' to numeric value
    alignSelf: 'center',

  },
  taskText: {
    fontFamily: 'sans-serif',
    fontSize: 20,
    color: '#0954A4',
    fontWeight: '300', // Correct numeric value
    borderStyle: 'solid',
    borderColor: '#000080',
    margin: 30,
    alignSelf: 'center',
    borderRadius: 100,
    // Removed alignSelf: 'center'
    width: '50%', // Adjust the width to add horizontal space with margins
  },
  textStyle: {
        fontFamily: 'sans-serif',
        alignSelf: 'center',
        color: 'white',
        fontSize: 16,
        fontWeight: '300',
        paddingTop: 10,
        paddingBottom: 10,
    },
  buttonStyle: {
        
        backgroundColor: 'blue',
        marginLeft: 100,
        marginRight: 100,
        borderRadius: 50,
        marginBottom: 10,
  },
});
export default MyCalendar;