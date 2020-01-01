


## React Native Tab Bar View Animated

<img src="https://github.com/LucasBN/FearlessAthletes/blob/master/demo1.gif" width="360">

<br />

## Get Started

### Installation

```js
npm i react-native-tab-barview-animation
```

### Usage


```js
import { TabBar } from 'react-native-tab-barview-animation';

<TabBar
  views={[<ScreenOne/>, <ScreenTwo/>, <ScreenThree/>]}
  style={{backgroundColor: 'white', borderTopWidth: 0}}
  iconConfig={{
      icons: ['ios-home', 'ios-person', 'ios-home'],
      labels: ['Home', 'Profile', 'Test'],
      labelVisible: false,
      activeColor: '#4d97ff',
      inactiveColor: '#595959'
  }}
  transitionConfig={{
      transition: 'slide'
  }}
/>
```

## Props

| Property | Type | isRequired? | Default | Description |
| --- | :---: | :---: | :---: | --- |
| `views` | component | required | - | components to render |
| `style` | - | optional | - | tab bar style |
| `iconConfig[icons]` | string array | required | - | icons in tab |
| `iconConfig[labels]` | string array | optional | - | labels in tab |
| `iconConfig[labelVisible]` | bool | required | - | toggle labels on/off |
| `iconConfig[activeColor]` | string | required | - | icon active color |
| `iconConfig[inactiveColor]` | string | required | - | icon inactive color |
| `transitionConfig[transition]` | string | required | - | transition used |

### Transitions

Snap
<br />
Fade
<br />
Slide
