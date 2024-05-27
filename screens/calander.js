import React, { Component } from 'react';
import { View, Text, StyleSheet, Alert, Button, TextInput, KeyboardAvoidingView,Platform } from 'react-native';
import { Agenda } from 'react-native-calendars';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppTextInput from '../components/AppTextInput';

class App extends Component {
  state = {
    items: {},
    selectedDate: '',
    newEventName: '',
    isEditing: false,
    editingEventDate: '',
    editingEventIndex: null,
  };

  componentDidMount() {
    this.loadStoredEvents();
  }

  loadStoredEvents = async () => {
    try {
      const storedItems = await AsyncStorage.getItem('calendarItems');
      if (storedItems) {
        this.setState({ items: JSON.parse(storedItems) });
      }
    } catch (error) {
      console.error('Failed to load events from storage', error);
    }
  };

  saveItemsToStorage = async () => {
    try {
      await AsyncStorage.setItem('calendarItems', JSON.stringify(this.state.items));
    } catch (error) {
      console.error('Failed to save events to storage', error);
    }
  };

  loadItems(day) {
    setTimeout(() => {
      for (let i = -15; i < 85; i++) {
        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        const strTime = this.timeToString(time);
        if (!this.state.items[strTime]) {
          this.state.items[strTime] = [];
        }
      }
      const newItems = { ...this.state.items };
      this.setState({ items: newItems });
      this.saveItemsToStorage();
    }, 1000);
  }

  renderItem(item, firstItemInDay, dateString, index) {
    return (
      <View style={[styles.item, { height: item.height }]}>
        <Text>{item.name}</Text>
        <Button title="Edit" color="#5618db" onPress={() => this.editEvent(dateString, index)} />
      </View>
    );
  }

  renderEmptyDate() {
    return (
      <View style={styles.emptyDate}><Text>No Events</Text></View>
    );
  }

  rowHasChanged(r1, r2) {
    return r1.name !== r2.name;
  }

  timeToString(time) {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  }

  onDayPress(day) {
    this.setState({ selectedDate: day.dateString });
  }

  addEvent() {
    const { selectedDate, newEventName, items } = this.state;
    if (selectedDate && newEventName) {
      if (!items[selectedDate]) {
        items[selectedDate] = [];
      }
      items[selectedDate].push({
        name: newEventName,
        height: 100,
      });
      this.setState({
        items,
        newEventName: '',
      }, this.saveItemsToStorage);
    } else {
      Alert.alert('Please enter an event name');
    }
  }

  editEvent(dateString, index) {
    const event = this.state.items[dateString][index];
    this.setState({
      isEditing: true,
      newEventName: event.name,
      editingEventDate: dateString,
      editingEventIndex: index,
    });
  }

  updateEvent() {
    const { items, newEventName, editingEventDate, editingEventIndex } = this.state;
    if (editingEventDate && newEventName !== '' && editingEventIndex !== null) {
      items[editingEventDate][editingEventIndex].name = newEventName;
      this.setState({
        items,
        newEventName: '',
        isEditing: false,
        editingEventDate: '',
        editingEventIndex: null,
      }, this.saveItemsToStorage);
    } else {
      Alert.alert('Please enter an event name');
    }
  }

  render() {
    const { selectedDate, newEventName, isEditing } = this.state;
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
      >
      <View style={{ flex: 1 }}>
        <Agenda
          items={this.state.items}
          loadItemsForMonth={this.loadItems.bind(this)}
          selected={selectedDate || new Date().toISOString().split('T')[0]}
          renderItem={(item, firstItemInDay, dateString, index) => this.renderItem(item, firstItemInDay, dateString, index)}
          renderEmptyDate={this.renderEmptyDate.bind(this)}
          rowHasChanged={this.rowHasChanged.bind(this)}
          pastScrollRange={12}
          futureScrollRange={12}
          onDayPress={(day) => this.onDayPress(day)}
          theme={{
            selectedDayBackgroundColor: '#5618db',
            todayTextColor: '#5618db',
          }}
        />
        {selectedDate ? (
          <View style={styles.addEventContainer}>
            <Text style={styles.selectedDateText}>Selected Date: {selectedDate}</Text>
            <AppTextInput
              placeholder="Event Name"
              value={newEventName}
              onChangeText={(text) => this.setState({ newEventName: text })}
            />
            <Button
              title={isEditing ? "Update Event" : "Add Event"}
              color="#5618db"
              onPress={() => (isEditing ? this.updateEvent() : this.addEvent())}
            />
          </View>
        ) : (
          <View style={styles.selectDateContainer}>
            <Text style={styles.selectDateText}>Please select a date to add an event</Text>
          </View>
        )}
        
      </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17,
  },
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30,
  },
  addEventContainer: {
    padding: 10,
    backgroundColor: '#fff',
  },
  selectedDateText: {
    marginBottom: 10,
    fontSize: 16,
  },
  selectDateContainer: {
    padding: 10,
    backgroundColor: '#eee',
    alignItems: 'center',
  },
  selectDateText: {
    fontSize: 16,
  },
});

export default App;
