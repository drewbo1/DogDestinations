export const snapshotToArray = snapshot => {
  let returnArr = [];

  snapshot.forEach(childSnapshot => {
    let item = childSnapshot.val();
    item.key = childSnapshot.key;
    returnArr.push(item);
  });

  return returnArr;
};

export const typeIcon = {
  walk: 'ios-walk',
  vet: 'ios-medkit',
  groomer: 'ios-cut',
  cafe: 'ios-cafe'
};


