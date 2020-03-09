export const ICON_TYPES = {
  AntDesign: 'AntDesign',
  IonIcons: 'Ionicons',
  FontAwesome: 'FontAwesome',
  FontAwesome5: 'FontAwesome5',
  SimpleLineIcons: 'SimpleLineIcons',
  MaterialIcons: 'MaterialIcons',
  MaterialCommunityIcons: 'MaterialCommunityIcons',
  Entypo: 'Entypo',
  EvilIcons: 'EvilIcons',
  Octicons: 'Octicons',
  Feather: 'Feather',
};

export const BATTERIES_DUMMY = [{id: 1}, {id: 2}, {id: 14}];

export const DUMMY_BARRELS = [
  {
    id: 22,
    wood_type: '1',
    vinegar_type: '1',
    date_posted: '2020-03-08T19:10:07.625417Z',
    capacity: 1,
    quantity: 1,
    author: 15,
    barrier_id: 1,
  },
  {
    id: 24,
    wood_type: '1',
    vinegar_type: '1',
    date_posted: '2020-03-08T19:11:27.535890Z',
    capacity: 1,
    quantity: 0,
    author: 15,
    barrier_id: 1,
  },
  {
    id: 25,
    wood_type: '1',
    vinegar_type: '1',
    date_posted: '2020-03-08T19:18:50.576901Z',
    capacity: 1,
    quantity: 0,
    author: 15,
    barrier_id: 2,
  },
];

export const BARREL_DETAIL_ITEM_KEYS = [
  {key: 'id', title: 'BarrelID', isDivider: true},
  {key: 'barrier_id', title: 'BarrierID', isDivider: true},
  {key: 'capacity', title: 'Capacity', isDivider: true},
  {key: 'wood_type', title: 'Wood type', isDivider: true},
  {key: 'vinegar_type', title: 'Vinegar type', isDivider: true},
  {key: 'quantity', title: 'Q.ty', isDivider: false},
];

// Type of Operation *
// Vinegar type *
// Barrel of Origin * dropdown barrel id
//Destination Barrel *
// Operator * (person id)
// Measurement Type *
// Measured value *
// Q.tà *
//Description
