import React, {Component} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {Text} from 'galio-framework';
import {
  deleteBatteryHandler,
  fetchBarrelsHandler,
  fetchBatteriesHandler,
  logoutHandler,
} from '../Services/ApiCaller';
import {BatteryItem, CustomButton, EmptyComponent} from '../Components';
import {moderateScale, scale} from 'react-native-size-matters';
import * as _ from 'lodash';
import {filterByKey} from '../Utils/Transform';
import {Colors} from '../Theme';
import {getAsyncStorageItem, STORAGE_KEYS} from '../Utils/storage';

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      batteriesList: [],
      barrelsList: [],
      currentUserId: '',
    };
  }

  componentDidMount() {
    this.props.navigation.addListener('focus', this.onPageFocus);
  }

  onPageFocus = async () => {
    try {
      const batteriesList = await fetchBatteriesHandler();
      const barrelsList = await fetchBarrelsHandler();
      const currentUserId = await getAsyncStorageItem(STORAGE_KEYS.USER_ID);
      this.setState({
        batteriesList,
        barrelsList: _.groupBy(barrelsList, 'battery_id') || [],
        currentUserId,
      });
    } catch (e) {}
  };

  deleteHandler = deleteItem => {
    const {id} = deleteItem || {};
    try {
      deleteBatteryHandler(deleteItem);
      this.setState({
        batteriesList: filterByKey(this.state.batteriesList, 'id', id),
      });
    } catch (e) {}
  };

  render() {
    const {batteriesList = [], barrelsList = []} = this.state;
    return (
      <ScrollView style={styles.container}>
        <CustomButton
          title={'Logout'}
          onPress={logoutHandler}
          container={styles.logoutButton}
        />
        <Text h5 style={styles.titleStyle}>
          Elenco Batterie
        </Text>
        {_.isEmpty(batteriesList) && (
          <EmptyComponent title={'No battery is found'} />
        )}
        {_.map(batteriesList, item => (
          <BatteryItem
            {...item}
            key={item.id}
            barrelsList={barrelsList[item.id]}
            deleteHandler={this.deleteHandler}
            currentUserId={this.state.currentUserId}
          />
        ))}
      </ScrollView>
    );
  }
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: scale(10),
  },
  logoutButton: {
    marginTop: moderateScale(10),
  },
  titleStyle: {
    marginTop: moderateScale(10),
    color: Colors.primary,
    fontWeight: 'bold',
  },
});
