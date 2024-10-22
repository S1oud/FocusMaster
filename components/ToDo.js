import { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Image, TextInput, Button, Switch, TouchableOpacity } from 'react-native';

export default function ToDo() {
  const [tasks, setTask] = useState([]);
  const [text, setText] = useState('');

  function addTask() {
    const newTask = { id: Date.now(), text, completed: false };
    setTask([...tasks, newTask]);
    setText('');
  }

  function deleteTask(id) {
    setTask(tasks.filter((task) => task.id !== id));
  }

  function toggleCompleted(id) {
    setTask(tasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)));
  }

  function resetTask() {
    setTask(tasks.map((work) => ({ ...work, completed: false })));
  }

  return (
    <View>
      {tasks.map((task) => (
        <ToDoItem key={task.id} task={task} deleteTask={deleteTask} toggleCompleted={toggleCompleted} />
      ))}
      <TextInput value={text} onChangeText={(newText) => setText(newText)} style={styles.taskText} placeholder="Enter task" />
      <TouchableOpacity style={styles.buttonStyle} onPress={addTask}>
        <Text style={styles.textStyle}>Add</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonStyle} onPress={resetTask}>
        <Text style={styles.textStyle}>Restart</Text>
      </TouchableOpacity>
    </View>
  );
}

function ToDoItem({ task, deleteTask, toggleCompleted }) {
  return (
    <View>
      {/* Use Switch instead of CheckBox */}
      <Switch value={task.completed} onValueChange={() => toggleCompleted(task.id)} />
      <Text style={styles.dText}>{task.text}</Text>
      <TouchableOpacity style={styles.buttonStyle} onPress={() => deleteTask(task.id)}>
        <Text style={styles.textStyle}>Del</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  dText: {
    fontFamily: 'sans-serif',
    fontSize: 30,
    color: '#0954A4',
    fontWeight: '300',
    alignSelf: 'center',
  },
  taskText: {
    fontFamily: 'sans-serif',
    fontSize: 20,
    color: '#0954A4',
    fontWeight: '300',
    borderStyle: 'solid',
    borderColor: '#000080',
    marginTop: 30,
    borderRadius: 100,
    marginLeft: 140,
    marginRight: 100,
    width: '25%',
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
