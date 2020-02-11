import firebase from 'firebase';

// laad de berichten in die de gebruiker heeft gemaakt.
export const loadMessages = async userId => {
  let messageData = [];
  await firebase
    .firestore()
    .collection('users')
    .doc(userId)
    .collection('messages')
    .get()
    .then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        messageData.push(doc.data());
      });
    })
    .catch(function(error) {
      console.log('Error getting documents: ', error);
    });
    // console.log(messageData);
  return messageData;
};

// laad de berichten in die de user heeft gerepost.
export const loadReposts = async userId => {
  let messageData = [];
  await firebase
    .firestore()
    .collection('users')
    .doc(userId)
    .collection('reposts')
    .get()
    .then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        messageData.push(doc);
      });
    })
    .catch(function(error) {
      console.log('Error getting documents: ', error);
    });
  return messageData;
};

// laad de berichten in die de user heeft gerepost.
export const getPostWithUserId = async (userId, postId) => {
  const postInfo = await firebase
    .firestore()
    .collection('users')
    .doc(userId)
    .collection('messages')
    .doc(postId)
    .get();
  // console.log(postInfo.data());
  return postInfo.data();
};

export const getUserWithId = async userId => {
  const userInfo = await firebase
    .firestore()
    .collection('users')
    .doc(userId)
    .get();
  // console.log(userInfo.data());
  return userInfo.data();
};
