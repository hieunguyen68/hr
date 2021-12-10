import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';

import BeginNavigation from './beginToLogin';
import StackHomepage from './stackHomepage';
import StackIndividual from './stackIndividual';
import BottomTabNavigations from './bottomTabNavigation';
import StackPost from './stackPost';
import StackManageCV from './StackManageCV';
const Stack = createStackNavigator();

function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none">
        <Stack.Screen name="BeginNavigation" component={BeginNavigation} />
        <Stack.Screen
          name="BottomTabNavigations"
          component={BottomTabNavigations}
        />
        <Stack.Screen name="StackHomepage" component={StackHomepage} />
        <Stack.Screen name="StackPost" component={StackPost} />
        <Stack.Screen name="StackIndividual" component={StackIndividual} />
        <Stack.Screen name="StackManageCV" component={StackManageCV} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;
